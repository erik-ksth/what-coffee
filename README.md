# What Coffee

Marketing and menu website for What Coffee & Bakery in Santa Clara, California. The site is built
with Next.js and includes the café menu, online-order links, catering information, a gallery, store
details, and a Resend-powered contact form.

## Requirements

- Node.js 20.9 or newer
- npm 10 or newer

## Local development

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Contact form configuration

The contact form uses a Google reCAPTCHA v2 checkbox. Create keys for the site domain in the
[reCAPTCHA admin console](https://www.google.com/recaptcha/admin), then copy `.env.example` to
`.env.local` and set `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` and `RECAPTCHA_SECRET_KEY`. The public key
is safe for the browser; keep the secret key server-side. Configure the Resend variables there as
well.

The site can run locally without these credentials, but contact-form submissions will be
unavailable until both Resend and reCAPTCHA are configured.

## Environment variables

| Variable | Required in production | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Yes | Public key used to display the reCAPTCHA checkbox. |
| `RECAPTCHA_SECRET_KEY` | Yes | Server-only key used to verify reCAPTCHA responses. |
| `RESEND_API_KEY` | Yes | Authorizes contact-form email delivery through Resend. |
| `CONTACT_TO_EMAIL` | Yes | Inbox that receives website enquiries. |
| `CONTACT_FROM_EMAIL` | Yes | Verified sender used for contact-form messages. |
| `CONTACT_RATE_LIMIT_MAX` | No | Maximum requests per client during the rate-limit window; defaults to 3. |
| `CONTACT_RATE_LIMIT_WINDOW_SECONDS` | No | Rate-limit window in seconds; defaults to 900. |
| `CONTACT_MAX_BODY_BYTES` | No | Maximum contact request size; defaults to 16384. |

Copy `.env.example` to `.env.local` for development. Never commit real API keys or production
credentials.

## Verification

```bash
npm run lint
npm test
npm run build
npm run test:seo
npm run check
```

`npm test` verifies that every image referenced by the application exists in `public`. After a
build, `npm run test:seo` verifies self-referencing canonicals, Open Graph URLs, sitemap coverage,
the robots sitemap reference, and the absence of the old domain. `npm run check` runs all release
checks. GitHub Actions runs the same command for pull requests and pushes to `main`.

## Content locations

- Menu items, descriptions, and images: `src/app/menu/menu-data.ts`
- Store hours and contact information: `src/components/Footer.tsx` and
  `src/app/contact/components/ContactForm.tsx`
- Search metadata and structured business data: `src/app/layout.tsx`
- Online-order links: `src/components/Header.tsx`, `src/app/menu/page.tsx`, and
  `src/app/menu/components/FloatingOrderButton.tsx`
- Page and menu imagery: `public/images`
- High-resolution source imagery not shipped by the site: `assets/image-sources`

When store hours, contact information, or the domain changes, update every relevant location and
verify that visible content, structured data, the sitemap, and canonical URLs remain consistent.

## Contact form

The `/api/contact` route validates submissions and sends them through Resend. Before production:

1. Use a Resend account owned by the client.
2. Verify the production sending domain in Resend.
3. Configure all three environment variables in the hosting project.
4. Submit a test enquiry and verify delivery and reply behavior.

## Deployment

The application is compatible with Vercel's standard Next.js deployment flow:

1. Import the repository into the client-owned Vercel account.
2. Configure the production environment variables.
3. Deploy an approved commit from `main`.
4. Connect the production domain and verify DNS and HTTPS.
5. Run the acceptance checks below against the production URL.

For another Node.js host, run `npm ci`, `npm run build`, and `npm run start` using Node.js 20.9+
and provide the same environment variables.

## Release checklist

- `npm run check` passes from a clean checkout.
- Menu content, prices, photos, allergens, contact details, and opening hours are client-approved.
- Clover, DoorDash, map, telephone, email, and social links work.
- Contact-form delivery is verified using the client inbox.
- Desktop and mobile layouts are smoke-tested on every route.
- `/robots.txt`, `/sitemap.xml`, canonical URLs, and social-sharing previews use the production
  domain.
- The approved commit is merged to `main` and tagged with a release version such as `v1.0.0`.

## Third-party services

- Resend: contact-form email delivery
- Clover and DoorDash: online ordering
- Google Maps: location embed and directions
- Fouita: Instagram gallery widget
- Google Fonts: fonts fetched by Next.js during the production build

Keep these accounts under client ownership and grant the studio collaborator access only where
ongoing support requires it.

## Handoff documentation

- `docs/CLIENT_HANDOFF.md`: account ownership, access transfer, acceptance, and support record
- `docs/CONTENT_OPERATIONS.md`: recurring content changes, releases, smoke tests, and rollback
- `docs/SEO_ANALYTICS.md`: SEO launch setup, analytics ownership, events, privacy, and case studies
