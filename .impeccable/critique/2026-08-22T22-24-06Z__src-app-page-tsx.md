---
target: What Coffee homepage UI
total_score: 24
p0_count: 0
p1_count: 2
timestamp: 2026-08-22T22-24-06Z
slug: src-app-page-tsx
---
⚠️ DEGRADED: single-context (two Assessment A sub-agents stalled and were interrupted; Assessment B remained isolated and completed)

## Design Health Score

| # | Heuristic | Score | Key issue |
|---|---|---:|---|
| 1 | Visibility of System Status | 2 | Carousel dots and header state help, but auto-rotation has no pause and navigation has no current-page state. |
| 2 | Match System / Real World | 3 | The language, food imagery, address, and hours are familiar; “Shop Coffee Beans” does not lead to a distinct shopping flow. |
| 3 | User Control and Freedom | 2 | Visitors can navigate freely, but the carousel cannot be paused and custom dialogs/mobile navigation lack complete escape and focus behavior. |
| 4 | Consistency and Standards | 3 | Palette, type, imagery, and CTA styling are cohesive; interaction patterns and button treatments vary in smaller details. |
| 5 | Error Prevention | 2 | This static surface has few risky actions, but controls do not guard against focus loss or accidental context changes. |
| 6 | Recognition Rather Than Recall | 3 | Main destinations are labeled and visible; item descriptions are hidden behind hover/modal interaction. |
| 7 | Flexibility and Efficiency | 2 | Direct navigation is available, but high-intent tasks lack shortcuts to directions, phone, ordering, or a clear bean-purchase flow. |
| 8 | Aesthetic and Minimalist Design | 3 | Strong photography and clean sections work, but repeated kickers, rounded panels, pill CTAs, and generic copy make the page feel templated. |
| 9 | Error Recovery | 2 | There are few error-producing tasks here; custom overlays offer only partial keyboard recovery and no robust focus restoration contract. |
| 10 | Help and Documentation | 2 | Hours, address, and email exist in the footer, but visit/order guidance is not surfaced where intent peaks. |
| **Total** |  | **24/40** | **Acceptable — a solid visual foundation with significant conversion and accessibility work remaining.** |

## Anti-Patterns Verdict

**LLM assessment:** The site does not look wholly AI-generated: the real cafe photography, orange logo, and food specificity give it genuine local character. However, it uses a recognizable landing-page template grammar: generic “every cup tells a story” copy, repeated tiny tracked uppercase section labels, alternating two-column image/text blocks, rounded photo panels, pill buttons, oversized muted background text, testimonial cards, and a stock-photo carousel hero. The result is attractive but not yet unmistakably *What Coffee*.

**Deterministic scan:** The required scan of `src/app/page.tsx` returned zero findings because that file only composes imported components. A scoped scan of the homepage component directory returned one exact finding: `gradient-text` in `src/app/home/components/Catering.tsx:22` (`text-transparent bg-clip-text bg-gradient-to-r`). No false positives were identified.

**Visual overlays:** No reliable user-visible overlay is available. Assessment B reached the wrong app on port 3000 and mutable injection failed because the browser evaluation surface was read-only. A later parent inspection found the correct What Coffee server on port 3001 and reviewed the desktop and 390×844 mobile layouts without an injected overlay.

## Overall Impression

The homepage is appetizing, legible at a glance, and structurally easy to follow. Its single biggest opportunity is to turn visual appetite into local action: show practical visit/order information and meaningful product detail at the moments when the photography has already convinced the visitor.

## What’s Working

- The opening fold is decisive: full-bleed coffee imagery, one strong heading, and two clear CTAs establish the category and the brand quickly.
- The orange/black/white palette and bold Outfit headings form a coherent visual system, while real pastry and cafe photography adds credibility that the stock hero alone would not.
- Responsive stacking is generally successful. At 390 px the hero copy remains readable, CTAs become full width, and the navigation becomes a simple full-screen menu with comfortably sized targets.

## Priority Issues

### [P1] Accessibility is visually present but behaviorally incomplete

**Why it matters:** `#ec814e` against white has only about **2.69:1** contrast, failing WCAG AA for normal text and button labels. The closed mobile menu remains in the accessibility tree/focus order because it is only translated off-screen. The menu toggle lacks `aria-expanded` and `aria-controls`. Menu-item dialogs do not move or trap focus, hide the background from assistive technology, close on Escape, or guarantee focus restoration. The auto-playing marquee/carousel and scroll-driven gallery have no reduced-motion alternative.

**Fix:** Darken the orange where it carries small white text or use dark text on orange; reserve the current orange for large/decorative use. Use a native `dialog` or robust accessible dialog primitive. Make the mobile menu inert/hidden when closed, expose expanded state, lock background scroll, and implement Escape/focus restoration. Add `prefers-reduced-motion` behavior and a carousel pause control.

**Suggested command:** `$impeccable audit`

### [P1] The page delays the information that converts local intent

**Why it matters:** A cafe visitor usually wants menu/prices, hours, directions, phone, and possibly online ordering. The hero offers Menu and Story, but hours and address appear only in the footer, no phone/actionable “Get Directions” control is visible, the top products show no prices, and “Shop Coffee Beans” routes to the general menu rather than a distinct purchase flow. Visitors can be impressed without knowing the next practical step.

**Fix:** Add a compact visit strip near the hero or immediately after Top Hits: open/closed status, today’s hours, address, directions, and phone. Put prices and short descriptors directly under featured items. Rename or reroute “Shop Coffee Beans” to match the actual destination, and promote the true highest-value action.

**Suggested command:** `$impeccable clarify`

### [P2] Featured products hide useful information behind unnecessary modals

**Why it matters:** Desktop users discover “See Description” only on hover, mobile users must tap a photo, and the resulting modal repeats a small amount of text that could have been visible in the card. This adds interaction cost without adding depth and creates the site’s most fragile accessibility component.

**Fix:** Show the description and price inline. If an item truly needs expansion, open a richer product detail with ingredients, size/options, allergens, and an order/menu action; otherwise remove the modal.

**Suggested command:** `$impeccable distill`

### [P2] The brand voice slips into generic landing-page grammar

**Why it matters:** Repeated tracked-uppercase kickers, pill CTAs, rounded image panels, the gradient-text catering headline, and copy such as “every cup tells a story of passion and precision” make the page interchangeable with many cafe templates. The real photography is specific; the layout and language often are not.

**Fix:** Remove the gradient text and reduce the repeated kicker pattern. Replace generic claims with concrete details only this cafe can own—the Monroe Street setting, roasting practice, pastry specialties, staff, mural, or serving rituals. Use fewer but more distinctive section compositions, and lead the hero with an excellent local image rather than a rotating stock set.

**Suggested command:** `$impeccable bolder`

### [P2] Motion lacks restraint and performance safeguards

**Why it matters:** The marquee runs continuously, the hero rotates every five seconds, and gallery parallax updates React state on every scroll. None respects reduced-motion preferences. This can distract, create nausea, and cause unnecessary main-thread work, especially on mobile or lower-powered devices.

**Fix:** Pause marquee and carousel motion for reduced-motion users, add explicit carousel controls, and replace scroll-state rerenders with CSS scroll-driven animation or `requestAnimationFrame`/motion values. Let one motion idea carry the page instead of layering three.

**Suggested command:** `$impeccable optimize`

## Persona Red Flags

**Jordan (First-Timer):** Jordan understands “coffee and bakery” immediately, but cannot see prices or practical visit details near the first decision point. “Shop Coffee Beans” suggests commerce but lands on a general menu. The top-hit descriptions require discovery of a hover/tap behavior. Jordan may browse happily, then leave to Google Maps for the information the page should surface.

**Riley (Stress Tester):** Riley finds the custom dialog leaves the rest of the page exposed to assistive technology and lacks Escape/focus-trap behavior. Riley also finds the closed mobile menu still represented in the DOM, carousel autoplay without a pause contract, and duplicated nested `<main>` landmarks from `layout.tsx` plus `page.tsx`.

**Casey (Distracted Mobile User):** Casey gets strong full-width hero CTAs and a readable mobile layout, but the most useful on-the-go actions—directions, call, today’s hours, order—are far below the fold. Continuous motion consumes attention, and tapping a featured drink opens a modal instead of revealing the decision-ready details inline.

## Cognitive Load

**2 of 8 checks fail: moderate cognitive load.** Single focus, grouping, hierarchy, one-thing-at-a-time flow, working-memory support, and progressive disclosure are generally sound. Chunking/minimal choice weaken at the six-item top navigation, and the page makes visitors scan several narrative sections before reaching practical visit information. The main decision point above the fold has two CTAs, which is manageable; the navigation is the only visible option set above four.

## Emotional Journey

The page opens with energy and appetite, reaches a strong middle peak through product and pastry imagery, then softens into testimonials and gallery content. The ending is informational rather than conclusive: the footer supplies the address and hours, but there is no strong final “visit us / get directions / order” payoff. The current peak sells desire; the end should convert that desire into an easy local action.

## Minor Observations

- The page renders nested `<main>` landmarks because both `layout.tsx` and `page.tsx` provide one.
- Social icon links have no accessible names; the DOM snapshot exposes unnamed links.
- “Cafe Logo” is functional but generic alt text; “What Coffee home” would communicate purpose better.
- The hero renders all three slide images in the DOM; only the first is prioritized, but the rotating composition still carries avoidable asset cost.
- The giant `COFFEE` background word and footer `WHAT.` heading add scale but do not contribute new meaning.
- Testimonial copy includes raw punctuation/spacing errors, which slightly reduces polish and trust.

## Questions to Consider

- Is the homepage’s primary job to drive in-person visits, menu exploration, catering leads, or online ordering?
- Should What Coffee feel like a polished specialty-roaster brand, a lively neighborhood cafe, or a pastry-first destination?
- Is the rotating stock hero intentional, or should one locally owned image become the brand’s defining first impression?
