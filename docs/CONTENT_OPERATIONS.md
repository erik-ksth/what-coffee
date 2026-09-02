# Content and Operations Guide

This guide explains where recurring What Coffee website updates are made and how to release them
safely.

## Common content updates

### Menu

Edit `src/app/menu/menu-data.ts` to change item names, categories, descriptions, or images. Keep
image paths under `public/images/menu`. After adding or renaming an image, run `npm test` to catch
missing references.

The website intentionally does not present prices. If prices are added later, the client must
approve a process for keeping website, Clover, DoorDash, printed, and in-store prices synchronized.

### Opening hours

Update all three locations together:

- `src/components/Footer.tsx` for the site-wide footer
- `src/app/contact/components/ContactForm.tsx` for visible contact-page hours
- `src/app/layout.tsx` for search-engine structured data

Confirm the same hours in Google Business Profile, Clover, DoorDash, and any other public listing.

### Address, phone, and email

Visible address, phone, and email details appear in the footer and contact page. Search-engine
business details also appear in `src/app/layout.tsx`. Keep formatting and actual values consistent
across the website and Google Business Profile.

### Online ordering

The Clover URL appears in:

- `src/components/Header.tsx`
- `src/app/menu/page.tsx`
- `src/app/menu/components/FloatingOrderButton.tsx`

The DoorDash URL appears in `src/app/menu/page.tsx`. Test links on both desktop and mobile after any
change.

### Domain and search metadata

If the production domain changes, update:

- `src/app/layout.tsx`
- `src/app/sitemap.ts`
- `src/app/robots.ts`

Then update Search Console, Google Business Profile, ordering profiles, social profiles, and any
external links. Preserve redirects from an old domain or URL where applicable.

### Images

- Store deployable images in `public/images`.
- Store high-resolution working files in `assets/image-sources`.
- Prefer WebP for photographic runtime assets.
- Size full-width images to no more than approximately 2400 pixels on the longest edge unless a
  specific use requires more.
- Run `npm test` after changing paths and visually inspect desktop and mobile crops.

Do not publish images without confirming the client's ownership or license and permission from
identifiable people where required.

## Release workflow

1. Create a working branch.
2. Make and review the content changes.
3. Run `npm run check`.
4. Preview the deployment and test affected journeys.
5. Obtain client approval for business information and visual changes.
6. Merge the approved commit to `main`.
7. Verify the production deployment and its contact form, links, and analytics events.
8. Tag significant releases, such as `v1.0.0`.

## Production smoke test

- Home, menu, catering, about, gallery, contact, and 404 pages load.
- Navigation and mobile menu work.
- Every menu category and allergen dialog works.
- Clover and DoorDash links open the correct store.
- Phone, email, directions, social, and review links work.
- Contact-form success and failure states work.
- Images render without broken paths or unintended crops.
- Page titles, descriptions, canonical URLs, sitemap, and robots file use the production domain.
- No unexpected errors appear in production monitoring.

## Rollback

For a failed release, use the hosting provider to promote the last known-good deployment. Do not
rewrite Git history. Record the failure, repair it on a new branch, rerun `npm run check`, and deploy
a reviewed fix.
