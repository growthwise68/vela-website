# Design System — Vela Website (Narrative Home Page)

## Product Context
- **What this is:** Marketing and compliance hub for Vela, a lifestyle and readiness planning tool for long-haul cabin crew
- **Who it's for:** Long-haul pilots and flight attendants seeking to understand their fatigue and optimize rest around unpredictable rosters
- **Space/industry:** Aviation wellness, crew fatigue management, SaaS B2C
- **Project type:** Marketing website with compliance/legal content hub
- **Redesign focus:** Home page moved from compliance-minimal to narrative-driven; tells the crew story, builds trust, educates on product value

## Aesthetic Direction
- **Direction:** Editorial Warmth with Narrative Density
- **Decoration level:** Intentional (generous whitespace + strategic texture, not cluttered)
- **Mood:** Human, transparent, crew-first. This is a product built WITH people, not sold AT them.
- **Rationale:** Long-haul crew face a real, human problem. The design should feel empathetic and editorial, not corporate or over-engineered. Crew wisdom should be visible and valued. Cormorant Garamond (serif) + generous spacing signal this is thoughtful content, not a quick pitch.

## Typography
- **Display/Hero:** Cormorant Garamond (Google Fonts: Cormorant Garamond, 700 weight)
  - Role: Section headlines, hero title
  - Sizes: Hero h1 (48px–56px), section h2 (36px–40px)
  - Rationale: Serif typeface feels literary, trustworthy, not tech-bro. Paired with Editorial Warmth aesthetic.
- **Body/Narrative:** Outfit (Google Fonts: Outfit, 400/500 weight)
  - Role: Body copy, button labels, UI labels
  - Sizes: Body p (16px), lead paragraph (18px), button (14px–16px)
  - Line-height: 1.7–1.8 for body copy (readability on longer narratives); 1.5 for UI
  - Rationale: Clean, modern, accessible. Pair with serif for hierarchy.
- **Pull Quotes/Testimonials:** Cormorant Garamond, italic, 18px–24px, gold color
  - Role: Crew quotes, key insights, testimonial callouts
  - Rationale: Italic serif signals "this is real voice, not product copy." Gold color signals "this is crew wisdom."
- **Data/Code:** DM Mono (Google Fonts: DM Mono, 400 weight)
  - Role: Chart labels, readiness numbers, code examples
  - Usage: Sparingly. Reserve for technical/data contexts, not general UI.
- **Font loading:** Google Fonts via `<link>` in `<head>`. Cache via Vercel CDN.

## Color
- **Approach:** Restrained with expressive accent usage
- **Primary (Gold):** `#C9A961`
  - Usage: Section subheadings, pull quotes (text color), carousel active dots, left borders on suggestion cards, button background, accent highlights
  - Rationale: Gold signals warmth, trust, crew wisdom. Using it for more than just buttons (e.g., quote text) is the design risk—most SaaS products only use accent color for CTAs. We use it for editorial emphasis.
- **Ink (Dark text):** `#2D2620`
  - Usage: Headlines, body text, primary UI text
  - Rationale: Slightly warm (not pure black), fits Editorial Warmth
- **Parchment (Light background):** `#FFF8F3`
  - Usage: Card backgrounds, section accent backgrounds, callout boxes
  - Rationale: Warm white, off-white feel
- **Cream (Lightest background):** `#FFFBF8`
  - Usage: Body background, safe fallback
  - Rationale: Warmth, not clinical
- **Warm neutrals (grays):** 
  - inkMid: `#7A6F66` (secondary text, labels)
  - inkFaint: `#B8AFA3` (tertiary text, timestamps, helper text)
- **Semantic colors:**
  - Success: `#4CAF50` (if needed for status indicators)
  - Warning: `#FF9800` (if needed)
  - Error: `#F44336` (if needed)
- **Dark mode strategy:** TBD. For MVP, light-only. If dark mode added: reverse text/background, reduce saturation of gold by 15–20%, use `#E8DCC8` as dark-mode parchment.

## Spacing
- **Base unit:** 8px
- **Density:** Comfortable to spacious (generous breathing room, supports narrative flow)
- **Scale:**
  - 2xs: 4px (small gaps, inline spacing)
  - xs: 8px (tight spacing)
  - sm: 16px (standard spacing)
  - md: 24px (section internal padding)
  - lg: 32px (large gaps)
  - xl: 48px (section gap vertical — breathing room between sections)
  - 2xl: 64px (hero to next section)
  - 3xl: 80px (hero internal padding)
- **Padding scale:** 
  - Mobile: 24px left/right (section horizontal padding)
  - Tablet: 32px left/right
  - Desktop: 40px left/right
- **Rationale:** Intentional space creates rhythm. Supports Editorial Warmth aesthetic (generous layouts, not cramped). Helps narrative sections feel like distinct moments, not rapid-fire pitches.

## Layout
- **Approach:** Vertical stack, full-width sections (mobile-first, scales beautifully)
- **Grid:** Single-column on mobile, multi-column on desktop (no fixed column count — each section adapts)
- **Max content width:** 1200px (prose-friendly width, not stretched to edges)
- **Border radius hierarchy:**
  - Buttons: 4px
  - Suggestion cards: 12px
  - Images (square): 8px
  - Photo (testimonial): circular (border-radius: 50%)
- **Specific section layouts:**
  - Hero: full-width background, centered text (max 720px width for prose)
  - Problem/Knowledge/Suggestions: full-width section, carousel or grid of cards
  - Testimonial: 2-column (photo left, quote right) on desktop, stack on mobile
  - CTA: centered, hero-style

## Motion & Carousels
- **Auto-play carousels:** 5-second interval between slides
- **Transition:** Fade, 300ms, ease-in-out
- **Behavior:**
  - On hover/focus: pause auto-play, show next/prev arrows (gold color, appear on hover)
  - On touch/swipe: manual interaction works, auto-play resumes after 5 seconds of inactivity
  - Mobile: touch swipe enabled, auto-play continues (respectful, not intrusive)
- **Carousel indicators:**
  - Style: dots on dark background or light, 4px diameter
  - Active dot: gold circle
  - Inactive dot: cream or ink-faint
  - Spacing: 8px between dots
- **Motion easing:**
  - Enter animations: ease-out (150ms)
  - Exit animations: ease-in (150ms)
  - State transitions: ease-in-out (250ms)

## Component Styles
- **Buttons:**
  - Primary (CTA): gold background, ink text, 16px Outfit bold, 4px border-radius, 12px vertical padding, 24px horizontal
  - Secondary (link): gold text with underline on hover, no background
  - Hover state: gold background slightly darker (`#B8956B`), slight scale (1.02x)
- **Cards:**
  - Suggestion cards: cream background, 2px gold left border, 12px border-radius, 24px padding, subtle shadow (0 2px 8px rgba(0,0,0,0.05))
  - Carousel cards: transparent background (or parchment), image or content fills card
- **Forms (if added later):**
  - Input border: ink-faint color, 1px
  - Input focus: gold border, subtle box-shadow (0 0 0 3px rgba(201,169,97,0.1))
  - Label: Outfit, 14px, ink color
- **Disclaimer box (home page):**
  - Background: parchment
  - Border: 1px warm-line color (`#D4C9BC`)
  - Border-radius: 8px
  - Padding: 24px
  - Text: Outfit 14px, ink-mid color

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 23 April 2026 | Initial design system created for narrative home page redesign | Created by /design-consultation. Narrative-driven home page with 6 sections (hero, problem, knowledge, suggestions, by-crew-for-crew, CTA). Goal: move from compliance-minimal to human, story-driven, crew-first positioning. |
| 23 April 2026 | Gold used as narrative accent, not just button color | Risk taken: most SaaS products use accent color only for CTAs. Vela uses gold for pull quotes, section emphasis, carousel indicators. Signals "this is crew wisdom." |
| 23 April 2026 | Cormorant Garamond italic for pull quotes/testimonials | Risk taken: serif italic unusual in modern B2B SaaS. Feels editorial and vulnerable. Signals crew voice is real, not product copy. |
| 23 April 2026 | Generous section spacing (48px gaps) and section breathing room | Risk taken: most SaaS compresses sections to fit the fold. We prioritize narrative flow and moment-to-moment pacing over scrolling economy. |
| 23 April 2026 | 5-second auto-play carousels with manual interaction override | Chosen for education sections (problem, knowledge, suggestions). Helps users absorb multiple scenarios without friction. Manual arrows available if users want to step through at own pace. |

## Implementation Notes
- Hero section: keep current structure, enhance CTA text ("Get Early Access")
- Carousel library: Swiper.js (lightweight, responsive, accessible)
- Image optimization: Vercel Image API (next/image component with priority/lazy loading)
- Fonts: Load Cormorant Garamond + Outfit from Google Fonts, DM Mono optional (load on-demand for data sections)
- Responsive: Mobile-first approach, test at 375px (iPhone SE), 768px (tablet), 1280px (desktop)

---

**Created by:** /design-consultation  
**Date:** 23 April 2026  
**Status:** Approved, ready for implementation  
**Next step:** Run `/design-html` to build HTML/CSS implementation, or proceed to Next.js component build
