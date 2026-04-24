# Vela Website — Counsel Review Summary
**Date:** 23 April 2026  
**Status:** Stage 3 (Legal Content) — Ready for Counsel Review  
**Reviewed by:** Claude Code + Iain Giffen  

---

## Executive Summary

The Vela website is a Next.js 15 marketing and compliance hub deployed on Vercel. It serves as the canonical host for public-facing legal documents, support contact, and product positioning. The site is currently in **private beta** and aligns with the regulatory positioning framework you provided (REGULATORY_POSITIONING.md, March 2026).

**Current state:** All content has been reviewed against your regulatory positioning doc. One enhancement has been made to strengthen airline-defensive language on the home page per your feedback.

---

## What Exists

### Infrastructure
- **Framework:** Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Hosting:** Vercel (free Hobby plan)
- **Production URL:** https://vela-website-lilac.vercel.app
- **Repository:** private GitHub repo (growthwise68/vela-website)
- **Auto-deploy:** Every git push to main triggers a new Vercel deployment

### Pages (all live, public-facing)
1. **Home (`/`)** — Product overview, positioning, disclaimer
2. **Privacy Policy (`/privacy`)** — Draft v1.0, dated 23 April 2026
3. **Terms of Service (`/terms`)** — Draft v1.0, dated 23 April 2026
4. **Support (`/support`)** — Contact page (email configurable via env var)
5. **Auto-generated:** `/robots.txt` (search engine rules), `/sitemap.xml` (SEO)

### Design & Branding
- **Design system:** Editorial Warmth (serif headlines, warm neutrals, gold accent)
- **Fonts:** Cormorant Garamond (display), Outfit (body), DM Mono (code/data)
- **Color palette:** Cream, parchment, gold, ink (matches app design tokens)
- **Status:** Design finalized, no placeholder lorem ipsum

---

## Content Alignment with REGULATORY_POSITIONING.md

### Terminology Review
**SAFE terms used correctly throughout:**
- ✅ "lifestyle planning" (product type) — home, privacy, terms
- ✅ "readiness score" / "readiness estimate" (outputs) — home, privacy, terms
- ✅ "personal planning" (user benefit) — now emphasized on home page
- ✅ "informational estimates" (outputs) — privacy, terms
- ✅ "planning companion" (product type) — design system, consistent with doc

**Banned terms avoided:**
- ✅ No "health app", "medical device" (used negatively: "is not a medical device")
- ✅ No "diagnose", "detect", "clinical"
- ✅ No "safety system" (used negatively: "is not a safety system")
- ✅ No "guarantees", "ensures", "certifies"

**Contextual terms used with qualifiers (per your doc):**
- ✅ "Fatigue estimate" — terms page (acceptable usage)
- ✅ "Sleep timing suggestion" — home page, privacy, terms (acceptable usage)
- ✅ "Readiness and fatigue" — terms page (acceptable usage)

---

## Changes Made Today

### 1. Home Page Disclaimer — Enhanced for Airline Defensibility

**Location:** `/src/app/page.tsx`, lines 21–31

**Why this change:** Your counsel feedback flagged that the original disclaimer did not include the full "airline-defensive language" necessary to establish that Vela is a personal tool and does not substitute for operator fitness-for-duty checks. This is the contractual firewall that protects both Vela and airlines using it.

**Before:**
```
Vela is a lifestyle planning tool. It is not a medical device and does not provide 
medical or safety advice. Readiness figures are estimates for personal planning, not 
for safety-critical or fitness-for-duty decisions. Vela is not part of an airline 
Fatigue Risk Management System (FRMS).
```

**After:**
```
Vela is a personal lifestyle planning tool. It is not a medical device and does not 
provide medical, health, or safety advice. Readiness scores are estimates for personal 
planning only—not for safety-critical or fitness-for-duty decisions. Vela is not part 
of any airline Fatigue Risk Management System (FRMS) and does not replace your 
operator's fitness-for-duty requirements or professional medical advice.
```

**Specific additions/fixes:**
1. **"Personal lifestyle planning"** — adds the "personal" qualifier as a contractual firewall (counsel's emphasis)
2. **"Medical, health, or safety"** — explicit trilogy matching REGULATORY_POSITIONING.md approved language
3. **"Readiness scores"** — corrects "figures" to match SAFE terminology list (consistency fix)
4. **"...and does not replace your operator's fitness-for-duty requirements or professional medical advice"** — the airline-defensive clause. This ensures crew cannot reasonably claim Vela is their airline's FRMS or replaces medical/operational checks.

**Regulatory basis:** Lines 90–98 of REGULATORY_POSITIONING.md (Required Disclaimers → Terms of Service Key Clauses #2 and #4).

---

## Legal Pages — Status

### Privacy Policy (`/privacy`)
- **Version:** Draft v1.0 (dated 23 April 2026)
- **Status:** Marked as draft pending counsel review
- **Key sections:**
  - Who we are (lifestyle positioning upfront)
  - What we collect: account info, schedule/roster data, analytics, crash reports
  - Explicit: "We do not collect biometric data, vital signs, or clinical health measurements"
  - Data sharing: Firebase named explicitly
  - Data retention, account deletion, regional rights (GDPR, UK GDPR)
  - Security, changes policy, contact (links to support page)
- **Alignment:** All data handling claims reflect Firebase + app architecture; no health-data claims; no medical advice language

### Terms of Service (`/terms`)
- **Version:** Draft v1.0 (dated 23 April 2026)
- **Status:** Marked as draft pending counsel review
- **Key sections:**
  - Agreement framing
  - **"What Vela is"** — explicitly: lifestyle tool, estimates, NOT medical, NOT diagnostic
  - **"No medical advice"** — clear clause
  - **"No safety or operational guarantee"** — defines as personal tool, not airline FRMS
  - **"Accuracy of estimates"** — population-level models, not physiological data, individual variance
  - Account security, acceptable use, IP, third-party services (Firebase named)
  - **Limitation of liability** — comprehensive, per counsel's required clause
  - Governing law: State of Delaware (per your instruction)
- **Alignment:** Every required clause from REGULATORY_POSITIONING.md §90–102 is present and substantive

---

## What Has NOT Been Done (App-Side, Out of Scope for Website)

Your counsel flagged three app-side gaps in Vela_Apple_Guidelines.md §5.1–5.2:
1. **Account deletion UI** — FirebaseAuthManager.deleteUser exists but is not wired to a Settings UI button
2. **In-app legal links** — Privacy/Terms URLs not confirmed on Settings screen
3. **App Store metadata** — title, subtitle, description, screenshots, Age Rating questionnaire not yet submitted

**These are Flutter app issues, not website issues.** The website is ready; the app needs the three fixes counsel specified (deletion button, legal links in Settings, App Store submission checklist).

---

## Deployment & Visibility

- **Live now:** https://vela-website-lilac.vercel.app (production)
- **Update cadence:** Every git push to main auto-deploys within 60 seconds
- **SSL/HTTPS:** Yes (Vercel + free)
- **Sitemaps & robots.txt:** Auto-generated, reference the canonical domain

---

## For Counsel: Next Steps

1. **Review this summary** and the home page disclaimer change (lines 21–31 of `/src/app/page.tsx`)
2. **Confirm:** Does the new airline-defensive language meet your requirement?
3. **Privacy & Terms:** Are the draft legal pages substantive enough for private beta, or do they need revision before counsel sign-off?
4. **App side:** Confirm the three FlutterFlow/Firebase fixes needed (deletion button, legal links, App Store metadata)

---

## Questions Counsel Can Answer

1. **Should the airline-defensive disclaimer also appear on the Privacy or Terms pages, or is home-page prominence sufficient?**  
   (Current state: Full disclaimer on home. Terms have partial language. Privacy is silent.)

2. **For private beta, should legal pages remain marked "Draft" or move to "Final - Preliminary Review"?**  
   (Current state: Both marked "Draft v1.0 — pending counsel review")

3. **Does the site need an "Acceptable Use" or "Community Guidelines" page, or are Terms sufficient?**  
   (Current state: Terms cover acceptable use, no separate page)

---

**Prepared by:** Claude Code  
**Date:** 23 April 2026  
**Status:** Ready for counsel review
