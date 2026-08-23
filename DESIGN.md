---
name: What Coffee
description: A warm, photography-led neighborhood café with a simple and confident orange identity.
colors:
    orange: "#EC814E"
    orange-deep: "#BA4100"
    mobile-menu-orange: "oklch(62.779% 0.15774 42.873)"
    cafe-cream: "#F0ECE7"
    clean-paper: "#FAF6F1"
    ink: "#111111"
    coffee-ink: "#301C14"
    body-ink: "#3C2C26"
    muted: "#F4F4F5"
    success-surface: "#E8F3EA"
    success-ink: "#1D5B2B"
    error-surface: "#F9E7E5"
    error-ink: "#8C2922"
typography:
    brand:
        fontFamily: "Poppins, sans-serif"
        fontSize: "clamp(2.75rem, 7vw, 5.5rem)"
        fontWeight: 700
        lineHeight: 0.95
        letterSpacing: "-0.035em"
    display:
        fontFamily: "Poppins, sans-serif"
        fontSize: "clamp(2.5rem, 4.2vw, 3.75rem)"
        fontWeight: 500
        lineHeight: 1.08
        letterSpacing: "-0.03em"
    accent:
        fontFamily: "Crafty Girls, cursive"
        fontSize: "clamp(1.35rem, 2.2vw, 1.75rem)"
        fontWeight: 400
        lineHeight: 1
        letterSpacing: "normal"
    homeSectionTitle:
        fontFamily: "Crafty Girls, cursive"
        fontSize: "clamp(2.25rem, 4.2vw, 3.4rem)"
        fontWeight: 400
        lineHeight: 1.1
        letterSpacing: "normal"
    section:
        fontFamily: "Poppins, sans-serif"
        fontSize: "clamp(2rem, 3vw, 2.75rem)"
        fontWeight: 500
        lineHeight: 1.1
        letterSpacing: "-0.03em"
    title:
        fontFamily: "Poppins, sans-serif"
        fontSize: "1.25rem"
        fontWeight: 500
        lineHeight: 1.3
        letterSpacing: "-0.015em"
    body:
        fontFamily: "Poppins, sans-serif"
        fontSize: "1rem"
        fontWeight: 400
        lineHeight: 1.6
        letterSpacing: "normal"
    lead:
        fontFamily: "Poppins, sans-serif"
        fontSize: "1.16rem"
        fontWeight: 500
        lineHeight: 1.55
        letterSpacing: "normal"
    small:
        fontFamily: "Poppins, sans-serif"
        fontSize: "0.92rem"
        fontWeight: 400
        lineHeight: 1.55
        letterSpacing: "normal"
    eyebrow:
        fontFamily: "Poppins, sans-serif"
        fontSize: "0.75rem"
        fontWeight: 600
        lineHeight: 1.4
        letterSpacing: "0.12em"
    label:
        fontFamily: "Poppins, sans-serif"
        fontSize: "0.86rem"
        fontWeight: 600
        lineHeight: 1.4
        letterSpacing: "normal"
rounded:
    field: "12px"
    image: "18px"
    section: "24px"
    shell: "36px"
    pill: "999px"
spacing:
    xs: "8px"
    sm: "12px"
    md: "16px"
    lg: "24px"
    xl: "48px"
    section: "96px"
components:
    button-primary:
        backgroundColor: "{colors.orange}"
        textColor: "#FFFFFF"
        typography: "{typography.label}"
        rounded: "{rounded.pill}"
        padding: "14px 20px"
        height: "50px"
    button-dark:
        backgroundColor: "{colors.ink}"
        textColor: "{colors.cafe-cream}"
        typography: "{typography.label}"
        rounded: "{rounded.pill}"
        padding: "14px 20px"
        height: "50px"
    image-label:
        textColor: "{colors.ink}"
        typography: "{typography.body}"
        rounded: "{rounded.image}"
    footer-shell:
        backgroundColor: "{colors.orange-deep}"
        textColor: "{colors.cafe-cream}"
        rounded: "{rounded.section}"
---

# Design System: What Coffee

## Overview

**Creative North Star: "The Neighborhood Counter"**

What Coffee should feel like walking up to a bright, friendly café counter: appetizing, direct, warm, and easy to understand. Real drinks, pastries, people, and the Santa Clara space carry the personality. The interface gives those photographs room to work through generous cream space, confident orange, plain language, and a small amount of handwritten type.

The system is minimalist without becoming sterile. Every visible element must help someone choose a drink, understand the café, visit, order, or get in touch. It explicitly rejects feature creep, marketing filler, excessive containers, oversized display type, and decoration that obstructs content.

**Key Characteristics:**

- Photography-led, with real café and product imagery.
- Warm cream surfaces, confident orange, and strong ink contrast.
- Poppins for clarity; Crafty Girls for the three core homepage content headings and short expressive phrases.
- Simple compositions with generous space and restrained rounded corners.
- Useful information stays visible, readable, and unobstructed.

## Colors

The palette feels like orange packaging, espresso, pastry paper, and a clean café wall.

### Primary

- **Counter Orange:** The recognizable brand accent for primary actions and small committed color moments.
- **Roasted Orange:** The darker orange reserved for large color fields such as the footer, where cream text needs strong contrast.
- **Mobile Menu Orange:** The focused orange used for the mobile navigation links.

### Neutral

- **Café Cream:** The primary page background and the text color on Roasted Orange.
- **Clean Paper:** A slightly lighter surface for occasional grouped content.
- **True Ink:** Headlines, navigation, and high-priority text.
- **Coffee Ink:** Dark tonal surfaces and secondary high-contrast moments.
- **Body Ink:** Long-form copy and supporting information.
- **Muted:** Quiet functional surfaces only; never a substitute for real imagery.

### Named Rules

**The Orange Commitment Rule.** Orange should occupy a decisive surface or action, not appear as scattered decorative specks.

**The Contrast Rule.** Small text must reach WCAG AA. Use Roasted Orange—not Counter Orange—behind cream body text.

## Typography

**Display Font:** Poppins (sans-serif fallback)
**Body Font:** Poppins (sans-serif fallback)
**Accent Font:** Crafty Girls (cursive fallback)

**Character:** Poppins keeps the café practical and easy to scan. Crafty Girls adds a human note that resembles a quick counter-board inscription, but it never carries body copy or navigation.

### Hierarchy

- **Brand** (700, fluid 2.75–5.5rem, 0.95): The large “What Coffee” footer signature and rare brand moments only.
- **Display** (500, fluid 2.5–3.75rem, 1.08): Page and section headlines; balanced and never shouting.
- **Accent** (400, fluid 1.35–1.75rem, 1): A short handwritten page label or phrase.
- **Homepage Section Title** (400, fluid 2.25–3.4rem, 1.1): The favorites, offerings, and reviews headings; one consistent handwritten treatment.
- **Section** (500, fluid 2–2.75rem, 1.1): Compact section headings.
- **Title** (500, 1.25rem, 1.3): Menu-item and content titles.
- **Body** (400, 1rem, 1.6): Paragraphs capped around 65–70 characters.
- **Lead** (500, 1.16rem, 1.55): A single introductory sentence.
- **Small** (400, 0.92rem, 1.55): Supporting metadata and descriptions.
- **Eyebrow** (600, 0.75rem, 1.4): Rare uppercase section context.
- **Label** (600, 0.86rem, 1.4): Navigation, compact buttons, and practical metadata.

### Named Rules

**The Homepage Section Title Rule.** The favorites, offerings, and reviews headings use Crafty Girls at the shared homepage title scale. The closing “A few moments from the café” title keeps its Poppins structure with a handwritten emphasis. Poppins remains the font for body copy, navigation, buttons, and content titles.

**The One Handwritten Phrase Rule.** Outside homepage section titles, use Crafty Girls for one short expressive phrase per major composition; never for paragraphs, menus, forms, or multiple competing labels.

**The Quiet Heading Rule.** Secondary-page headings cap around 3.75rem desktop and 2.75rem mobile. Only the What Coffee brand signature may be larger.

## Elevation

The system is flat by default. Depth comes from photography, tonal contrast, and spatial overlap. Shadows are reserved for the fixed navigation and primary pill buttons, where elevation communicates floating or pressable behavior.

### Shadow Vocabulary

- **Floating Navigation:** A soft ambient shadow under the fixed header after scrolling.
- **Tactile Action:** Primary pill buttons use a bright inner top edge, a darker inset lower edge, and a compact outer shadow with no more than 15px blur.

### Named Rules

**The Flat-By-Default Rule.** Content images, item labels, informational sections, and forms stay shadow-free. If a basic content block needs a shadow to read, simplify its layout.

## Components

### Buttons

- **Shape:** Full pill for primary actions only.
- **Primary:** Counter Orange with white text; compact 50px height, sentence-case label, and the shared inset tactile treatment.
- **Hover / Focus:** A small tactile lift or arrow shift, plus a clear 3px ink focus outline.
- **Secondary:** Plain underline or dark pill. Do not create a second decorated orange variant.

### Cards / Containers

- **Corner Style:** Images use an 18px radius; major shells use 24px. Avoid larger rounding on ordinary content.
- **Background:** Basic image-and-name content has no card background at all.
- **Shadow Strategy:** Flat at rest.
- **Border:** Dividers may use one low-contrast horizontal line. Decorative side stripes are forbidden.
- **Internal Padding:** Only when content genuinely forms a distinct group; never wrap a single image and label in a container.

### Inputs / Fields

- **Style:** Cream or clean-paper field, 12px radius, 1px coffee-ink border, and at least 48px height.
- **Focus:** Strong orange border plus a visible outline; no glow-heavy treatment.
- **Error / Disabled:** Clear text and border state without animation.

### Navigation

- Fixed desktop navigation is a clean horizontal pill only after scrolling; it remains visually light at the top of the page.
- Labels use Poppins semibold at compact scale. Mobile uses the existing bubble menu with large touch targets.
- Footer navigation is plain cream text on Roasted Orange.

### Photography

- Use real café, food, roasting, staff, and community images.
- Images may float beyond a section for energy, but layout space must be reserved so they never cover navigation, footer text, or other useful content.
- Product features are image plus centered name—no surrounding card container.

### Footer

- Roasted Orange rounded shell, Café Cream text, one large What Coffee signature.
- Only navigation, address, phone, opening hours, and social links belong here.

## Do's and Don'ts

### Do:

- **Do** keep pages simple, minimalist, and content-first.
- **Do** use real images as the primary visual material.
- **Do** center product names directly beneath their images without a surrounding card.
- **Do** use Poppins medium (500) for menu-item names and keep featured names smaller than the full menu.
- **Do** reserve generous neutral space between floating imagery and functional content.
- **Do** keep the orange footer visually separate with rounded top corners.
- **Do** make the What Coffee name the footer’s one large typographic moment.
- **Do** keep address, phone, opening hours, navigation, and social links easy to find.

### Don't:

- **Don't** add extra features, sections, CTAs, badges, or copy without a clear user need.
- **Don't** wrap a simple image and name in a card or container.
- **Don't** use oversized page or section headings; only the What Coffee brand signature may be large.
- **Don't** let decorative or overflow imagery cover the footer or any functional content.
- **Don't** add marketing filler when plain, specific café information will do.
- **Don't** repeat tiny uppercase tracked eyebrow labels across every section.
- **Don't** use gradient text, glassmorphism, decorative grids, stripe backgrounds, or sketchy illustrations.
- **Don't** pair a wide soft shadow with a decorative 1px card border.
- **Don't** over-round cards, sections, or fields beyond the established 18–24px range.
