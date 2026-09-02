# What Coffee Client Handoff

This document records ownership, access, launch acceptance, and ongoing responsibilities for the
What Coffee website. Fill every `TBD` field before production handoff.

## Project record

| Item | Value |
| --- | --- |
| Production URL | `https://www.whatcoffeeandbakery.com` |
| Source repository | `https://github.com/erik-ksth/what-coffee` — transfer or move to a client-owned organization |
| Production release | TBD |
| Launch date | TBD |
| Client product owner | TBD |
| Client technical owner | TBD |
| Studio support contact | TBD |
| Warranty period | TBD |

## Account ownership standard

The client should be the primary owner, administrator, and billing party for every
business-critical service. The studio should receive only the role needed to configure and support
the service.

| Service | Primary owner | Studio access | Handoff requirement |
| --- | --- | --- | --- |
| Domain registrar and DNS | Client | DNS editor or delegated access | Client controls registrant email, recovery, billing, and 2FA. |
| GitHub repository or organization | Client | Maintainer | Transfer the repository or add it to a client-owned organization. |
| Vercel or production hosting | Client | Developer | Client owns the project, billing, domains, and production environment. |
| Resend | Client | Developer | Client owns the verified sending domain and billing. |
| Google Search Console | Client | Full user after verification | Client remains a verified owner. |
| Google Analytics 4 | Client | Analyst or Editor | Client remains account/property administrator. |
| Google Business Profile | Client | Manager | Client remains primary owner. |
| Google Maps listing | Client | Manager through Business Profile | Address, phone, URL, and hours match the site. |
| Clover and DoorDash | Client | None unless support requires it | Client owns store, order, payout, and billing settings. |
| Fouita widget | Client | Editor if maintenance requires it | Client controls the subscription and connected Instagram account. |
| Instagram and TikTok | Client | None unless content support is contracted | Client controls recovery details and 2FA. |

### Recommended setup session

Use a screen-sharing session for account creation and transfer:

1. The client signs up using a company-controlled email address and their payment method.
2. The client enables two-factor authentication and securely records recovery codes.
3. The client invites the studio using the least-privileged suitable role.
4. The studio configures the service and records its purpose in the table above.
5. Both parties verify that the client can sign in, manage billing, and remove the studio.

Avoid creating client infrastructure under a studio employee's personal email, phone number, or
payment card. If the studio temporarily provisions an account, record that exception in writing and
transfer ownership before launch.

The studio should remain the owner only when the client has explicitly purchased a managed-hosting
service whose agreement defines fees, service levels, backups, data export, termination, and an
exit-transfer procedure.

## Secrets and environment variables

Production values belong in the hosting provider's encrypted environment settings, not in Git,
email, chat, or this document.

| Variable | Owner | Production configured | Delivery tested |
| --- | --- | --- | --- |
| `RESEND_API_KEY` | Client Resend account | TBD | TBD |
| `CONTACT_TO_EMAIL` | Client | TBD | TBD |
| `CONTACT_FROM_EMAIL` | Client verified domain | TBD | TBD |

Use the repository's `.env.example` only as a list of required variable names.

## Deliverables

- Production website and approved release tag
- Source repository and complete Git history
- Hosting, domain, email-delivery, search, and analytics access
- High-resolution image sources under `assets/image-sources`
- Runtime-optimized site images under `public/images`
- Technical setup and deployment instructions in `README.md`
- Content maintenance guide in `docs/CONTENT_OPERATIONS.md`
- SEO and analytics plan in `docs/SEO_ANALYTICS.md`
- Known issues, warranty terms, and support contact

## Production acceptance

- [ ] Client approves menu content, prices, photos, testimonials, and allergen notice.
- [ ] Client confirms store name, address, phone, email, and opening hours.
- [ ] Production domain, DNS, HTTPS, and canonical URL are correct.
- [ ] Clover, DoorDash, directions, phone, email, and social links work.
- [ ] Contact-form message and reply flow work with client-owned Resend credentials.
- [ ] Every public route passes desktop and mobile smoke testing.
- [ ] Privacy Policy is published and linked from the contact form and footer.
- [ ] Search Console is verified and the production sitemap is submitted.
- [ ] Analytics and consent behavior match the approved measurement plan.
- [ ] `npm run check` passes on the approved release commit.
- [ ] Rollback to the previous production deployment has been demonstrated.
- [ ] Client can access every account and securely remove studio access.

## Support and closure

| Term | Agreement |
| --- | --- |
| Warranty start and end | TBD |
| Included defect support | TBD |
| Response time | TBD |
| Support channel | TBD |
| Maintenance outside warranty | TBD |
| Studio access-removal date | TBD |

At the end of the warranty or maintenance agreement, remove unnecessary studio access and confirm
that no client secrets or personal data remain in studio-controlled systems.
