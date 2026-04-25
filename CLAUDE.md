# CLAUDE.md — Vela Website

> Project context and guidelines for Claude Code working on the Vela website.

## Design System
**Always read DESIGN.md before making any visual or UI decisions.**

All font choices, colors, spacing, and aesthetic direction are defined in DESIGN.md.
Do not deviate without explicit user approval. Key decisions:
- **Typography:** Cormorant Garamond (display), Outfit (body), DM Mono (data)
- **Color:** Gold (#C9A961) used expressively for narrative accent (not just buttons)
- **Spacing:** Comfortable to spacious (generous section breathing room, 48px gaps)
- **Layout:** Vertical stack, full-width sections, Editorial Warmth aesthetic
- **Carousels:** 5-second auto-play with manual override (Swiper.js)

In QA mode, flag any code that doesn't match DESIGN.md (e.g., wrong color hex, unexpected spacing, missing carousel behavior).

## Compliance & Legal Content
- **Required disclaimer:** On home page, present and fully visible (see src/app/page.tsx lines 21–31)
- **Legal pages:** Privacy Policy and Terms of Service marked "Final – Preliminary Review"
- **Status:** Website approved by counsel as of 23 April 2026
- **Regulatory positioning:** All copy must align with REGULATORY_POSITIONING.md (use SAFE terms: "lifestyle planning", "readiness estimate", "personal planning")

## Content Updates
- App store links (TestFlight, App Store, Play Store): TBD, add when available
- Crew testimonials and quotes: Currently stock/placeholder; will upgrade with real crew feedback during beta
- Images and videos: Currently stock placeholders (Unsplash); will upgrade with real crew photos and app walkthrough videos

## Implementation Notes
- **Framework:** Next.js 15, App Router, TypeScript, Tailwind CSS
- **Fonts:** Load Cormorant Garamond + Outfit from Google Fonts; DM Mono optional
- **Images:** Use Vercel Image API (next/image) with priority/lazy loading
- **Carousels:** Swiper.js for responsive, accessible carousel behavior
- **Responsive:** Mobile-first, test at 375px, 768px, 1280px breakpoints

## Git & Deployment
- **Branch:** main (all changes on main auto-deploy to Vercel)
- **Vercel:** https://vela-website-lilac.vercel.app (production URL)
- **Deployment:** Auto-triggers on every git push to main
- **Build:** Next.js build with ESLint validation (must pass before deploy)

## Standards
- **Apostrophes and quotes:** In **JavaScript string literals** (e.g. survey `questions` arrays), use Unicode escapes (`\u2019` for ’) or type the character directly — do **not** use HTML entities like `&rsquo;` (they show up literally). In JSX text nodes, `{"..."}` with `\u2019` is the safest pattern.
- Commit message format: `type: description` (e.g., `feat: add narrative home page sections`, `fix: correct color hex in design tokens`)
- No secrets in commits (.env files are git-ignored)

---

**Created:** 23 April 2026  
**Last updated:** 23 April 2026
