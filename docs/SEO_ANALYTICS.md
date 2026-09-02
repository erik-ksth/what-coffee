# SEO and Analytics Plan

## Existing technical SEO

The application already provides:

- Unique titles and descriptions for every public page
- Canonical URLs and social-sharing metadata
- `CafeOrCoffeeShop` structured data
- A generated XML sitemap at `/sitemap.xml`
- Crawl rules at `/robots.txt`
- Semantic page content and descriptive image alternatives

These features support discovery but do not replace launch registration, accurate business data,
useful content, good performance, or ongoing measurement.

## SEO launch checklist

1. Deploy and verify `https://www.whatcoffeeandbakery.com` as the single production origin.
   Permanently redirect the non-`www` domain to it.
2. Verify that every public page has its own self-referencing canonical and Open Graph URL.
3. Confirm the visible phone numbers and hours with the client, then match them in structured data,
   Google Business Profile, and ordering services.
4. Verify a domain property in client-owned Google Search Console, preferably through DNS.
5. Submit `https://www.whatcoffeeandbakery.com/sitemap.xml` in Search Console and monitor indexing
   errors.
6. Make the client the verified Search Console owner and give the studio Full-user access.
7. Claim or confirm the client-owned Google Business Profile. Match business name, address, phone,
   category, hours, website, menu, and order links exactly.
8. Test structured data, social previews, mobile usability, Core Web Vitals, and the production 404
   response.
9. Publish and link a Privacy Policy before enabling analytics or accepting production contact-form
   submissions.
10. Review Search Console monthly for indexing, queries, pages, countries, devices, and Core Web
   Vitals. Record material site changes so performance shifts have context.

## Recommended analytics ownership

Create Google Analytics 4 under a client-controlled Google account:

- Client: Administrator at the account and property levels
- Studio: Analyst for reporting, or Editor only while configuring events
- Billing and recovery: client-controlled
- Raw exports and user access: limited to people with a business need

Do not create the permanent property under a studio employee's personal Google account. If a
temporary property already exists, add the client as Administrator and verify that the client can
remove the studio.

## Measurement plan

Measure outcomes tied to the café rather than page-view volume alone.

| Event | Suggested parameters | Business question |
| --- | --- | --- |
| `online_order_click` | `provider`, `page`, `placement` | Does the site send people to Clover or DoorDash? |
| `directions_click` | `page`, `placement` | Does the site help people visit the café? |
| `phone_click` | `page`, `placement` | Do mobile visitors call? |
| `email_click` | `page`, `placement` | Do visitors start direct enquiries? |
| `contact_form_start` | `page` | How many visitors begin an enquiry? |
| `contact_form_submit` | `status` | How many enquiries succeed or fail? |
| `menu_category_view` | `category` | Which menu sections attract interest? |
| `social_click` | `network`, `page` | Does the site connect visitors to social channels? |

Mark successful order-link clicks, directions clicks, phone clicks, and contact submissions as key
events only if the client agrees they represent meaningful outcomes. Never send message contents,
names, email addresses, phone numbers, or other personal information to analytics.

## Privacy and consent

Google Analytics uses identifiers and collects device, session, and approximate-location data. The
site must disclose its analytics use and data handling in its Privacy Policy. Consent requirements
depend on visitor location and the client's legal obligations; obtain appropriate legal guidance.

A conservative implementation is basic consent mode: do not load Analytics until the visitor has
granted analytics consent. Consent mode is not itself a consent banner, so it must be connected to
the site's consent interface.

Do not enable advertising features, Google Signals, user IDs, cross-site tracking, or Google Ads
linking unless the client has a defined business need and explicitly approves the privacy impact.

## Portfolio and case-study reporting

Analytics belongs to the client even when the studio implemented it. To use results professionally:

1. Obtain written permission covering portfolio, interview, and case-study use.
2. Use aggregate percentages and rounded totals, not raw exports or visitor-level data.
3. Remove customer personal information and commercially sensitive figures.
4. Agree whether the client may be named or must remain anonymous.
5. Distinguish correlation from causation. Describe the change, timeframe, traffic sources, and
   other campaigns that may have affected the result.
6. Give the client a chance to approve the final public case study.

Capture a baseline before launch and compare 30-, 60-, and 90-day periods. Useful evidence includes
Search Console impressions and clicks, order-link clicks, directions clicks, calls, contact-form
submissions, Core Web Vitals, and client-reported order or enquiry quality.
