import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;
const HUBSPOT_REFRESH_TOKEN = process.env.HUBSPOT_REFRESH_TOKEN;
const HUBSPOT_CLIENT_ID = process.env.HUBSPOT_CLIENT_ID;
const HUBSPOT_CLIENT_SECRET = process.env.HUBSPOT_CLIENT_SECRET;

const hasOAuthConfig = Boolean(
  HUBSPOT_REFRESH_TOKEN && HUBSPOT_CLIENT_ID && HUBSPOT_CLIENT_SECRET
);
const hasAuthConfig = Boolean(HUBSPOT_ACCESS_TOKEN || hasOAuthConfig);

let cachedToken: { value: string; expiresAt: number } | null = null;

const getAccessToken = async (forceRefresh = false): Promise<string | null> => {
  if (!hasOAuthConfig) {
    return HUBSPOT_ACCESS_TOKEN || null;
  }

  if (!forceRefresh && cachedToken && cachedToken.expiresAt - Date.now() > 60_000) {
    return cachedToken.value;
  }

  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    client_id: HUBSPOT_CLIENT_ID as string,
    client_secret: HUBSPOT_CLIENT_SECRET as string,
    refresh_token: HUBSPOT_REFRESH_TOKEN as string,
  });

  const response = await fetch('https://api.hubapi.com/oauth/v1/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });

  const result = await response.json();
  if (!response.ok) {
    console.error('HubSpot token refresh error:', result);
    return null;
  }

  const expiresIn = typeof result.expires_in === 'number' ? result.expires_in : 1800;
  cachedToken = {
    value: result.access_token,
    expiresAt: Date.now() + expiresIn * 1000,
  };
  return cachedToken.value;
};

const hubspotRequest = async (url: string, options: RequestInit, retry = true) => {
  const token = await getAccessToken();
  if (!token) {
    return { ok: false, result: { error: 'HubSpot authentication not configured' } };
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });

  let result: any = null;
  try {
    result = await response.json();
  } catch {
    result = null;
  }

  if (response.ok) {
    return { ok: true, result };
  }

  const expired = response.status === 401 || result?.category === 'EXPIRED_AUTHENTICATION';
  if (expired && retry && hasOAuthConfig) {
    const refreshed = await getAccessToken(true);
    if (refreshed) {
      return hubspotRequest(url, options, false);
    }
  }

  return { ok: false, result };
};

export async function GET(request: Request) {
  if (!hasAuthConfig) {
    return NextResponse.json({ error: 'HubSpot OAuth not configured' }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const email = (searchParams.get('email') || '').trim();
  if (!email) {
    return NextResponse.json({ error: 'Missing email' }, { status: 400 });
  }

  try {
    const response = await hubspotRequest(
      'https://api.hubapi.com/crm/v3/objects/contacts/search',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filterGroups: [
            {
              filters: [{ propertyName: 'email', operator: 'EQ', value: email }],
            },
          ],
          properties: ['email', 'firstname', 'lastname'],
          limit: 1,
        }),
      }
    );

    if (!response.ok) {
      console.error('HubSpot lookup error:', response.result);
      return NextResponse.json({ error: 'HubSpot lookup failed' }, { status: 502 });
    }

    const contact = response.result?.results?.[0];
    if (!contact) {
      return NextResponse.json({ found: false });
    }

    return NextResponse.json({
      found: true,
      contact: {
        id: contact.id,
        email: contact.properties?.email || email,
        firstname: contact.properties?.firstname || '',
        lastname: contact.properties?.lastname || '',
      },
    });
  } catch (error) {
    console.error('HubSpot lookup exception:', error);
    return NextResponse.json({ error: 'HubSpot lookup failed' }, { status: 500 });
  }
}
