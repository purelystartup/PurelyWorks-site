<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your Next.js app

This contains everything you need to run the Purely Works site locally.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) and toggle `NEXT_PUBLIC_GEMINI_ENABLED=true` if you want AI visuals.
3. Ensure `NEXT_PUBLIC_HUBSPOT_PORTAL_ID` (and `NEXT_PUBLIC_HUBSPOT_FORM_ID` if using forms) are set.
4. Run the app:
   `npm run dev`

## Payload-ready theme and routes

- Core marketing pages: `/`, `/purely-flex`, `/focused-development`, `/focused-recruiting`, `/focused-proposals`
- Blog index: `/blog`
- Admin login handoff for your Payload instance: `/admin`

Default admin credentials for local handoff and staging:

```
Email: admin@purely.works
Password: purely!123
```

Replace these with environment-specific secrets when connecting to a live Payload backend.

## How to log in to the admin handoff

1. Start the site locally with `npm run dev` (or deploy it and visit the hosted URL).
2. Open `/admin` in your browser (e.g., `http://localhost:3000/admin` when running locally).
3. Use the default credentials above to sign in and manage pages or blog posts via your Payload instance.

Once your Payload backend is wired up, swap in your real admin email/password (or SSO) so the handoff screen reflects the production credentials.
