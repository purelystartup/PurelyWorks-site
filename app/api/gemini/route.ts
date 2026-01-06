import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Gemini API key not configured' }, { status: 503 });
  }

  let payload: { prompt?: string; aspectRatio?: string } = {};
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
  }

  const prompt = typeof payload.prompt === 'string' ? payload.prompt.trim() : '';
  if (!prompt) {
    return NextResponse.json({ error: 'Missing prompt' }, { status: 400 });
  }

  const aspectRatio =
    typeof payload.aspectRatio === 'string' && payload.aspectRatio.trim()
      ? payload.aspectRatio.trim()
      : '16:9';

  try {
    const client = new GoogleGenAI({ apiKey });
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio,
        },
      },
    });

    if (response.candidates && response.candidates[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData?.data) {
          return NextResponse.json({
            image: `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`,
          });
        }
      }
    }

    return NextResponse.json({ error: 'No image returned' }, { status: 502 });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Gemini image generation error:', error);
    return NextResponse.json({ error: message || 'Gemini request failed' }, { status: 502 });
  }
}
