<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1h-FHIUVPdqF8Y0aBHTRuI_6qOP-i9hz0

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

If you're deploying on Vercel, include the provided `vercel.json` so routes like `/admin` and `/blog` resolve to the SPA entrypoint instead of returning a 404.

Set `VITE_PAYLOAD_ADMIN_URL` to the URL of your Payload admin dashboard (for example, `https://www.purelyworks.com/admin`) so the `/admin` handoff redirects to the live CMS instead of stopping at the local success message. When running the built-in Payload backend locally, the admin lives at `/admin` on the same origin as the marketing site.

## Payload-ready theme and routes

- Core marketing pages: `/`, `/purely-flex`, `/focused-development`, `/focused-recruiting`, `/focused-proposals`
- Blog index: `/blog`
- Admin login handoff for your Payload instance: `/admin`

Default admin credentials (created by the seed script):

```
Email: farid@purelyworks.com
Password: PurelySecure!123 (override via PURELY_ADMIN_PASSWORD)
```

Replace these with environment-specific secrets when connecting to a live Payload backend or enabling SSO.

## Run the Payload backend on the root domain

The repo now ships with a Payload CMS instance that lives alongside the marketing site so `/admin`, `/api`, and the marketing pages all share the same origin.

### Configure

- Copy `.env.example` to `.env` and set values for `PAYLOAD_SECRET`, `DATABASE_URL` (defaults to SQLite at `file:./cms/payload.db`), and `PURELY_ADMIN_PASSWORD` if you want a custom password for `farid@purelyworks.com`.
- Set `VITE_PAYLOAD_PUBLIC_URL` to your public origin (e.g., `https://www.purelyworks.com`) so the SPA fetches blog posts from `/api`.

### Develop locally

1. Build the frontend assets so the CMS server can serve them from `/`:
   ```
   npm run build
   ```
2. Start Payload and the unified server at `http://localhost:4000`:
   ```
   npm run cms:dev
   ```
3. Seed the admin user if this is the first run (creates `farid@purelyworks.com` with the password from `PURELY_ADMIN_PASSWORD` or `PurelySecure!123`):
   ```
   npm run cms:seed
   ```

You can now log in at `http://localhost:4000/admin` using the seeded credentials. Blog posts created in Payload appear on `/blog` and individual posts render at `/blog/:slug`.

## How to log in to the admin handoff

Local development (uses the bundled Payload instance on the root domain):

1. Build once with `npm run build`, then start the CMS server with `npm run cms:dev`.
2. If you haven't seeded an account yet, run `npm run cms:seed` in another terminal.
3. Visit `http://localhost:4000/admin` and sign in with `farid@purelyworks.com` and your `PURELY_ADMIN_PASSWORD` value (defaults to `PurelySecure!123`).

When deployed, point DNS and your reverse proxy to your Payload host so `/admin` resolves on `https://www.purelyworks.com`. Keep `VITE_PAYLOAD_PUBLIC_URL` and `VITE_PAYLOAD_ADMIN_URL` aligned with your production origin so the blog and admin UI stay on the same domain.
