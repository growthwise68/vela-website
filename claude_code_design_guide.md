# Building a beautiful website with Claude Code

## 1. Lead with design inputs, not vague requests

**Don't:** "make it look premium"
**Do:** Give Claude concrete material to work from:
- Your actual design tokens (cream/ink/gold palette, Cormorant/Outfit fonts)
- A reference site ("match the editorial density of this page")
- A screenshot of something you like
- Specific constraints ("16px body, 48px section gaps, max-width 720px prose")

Claude will match what you give it. Vague briefs produce generic output.

---

## 2. Use the design skills in sequence

| Skill | When |
|---|---|
| `/design-consultation` | Start here — builds a shared design language before any code |
| `/design-shotgun` | Generates 3–5 distinct visual directions as HTML files so you can pick |
| `/design-html` | Finalises one direction into production-quality HTML/CSS |
| `/design-review` | After implementation — flags visual inconsistencies, spacing issues, generic patterns |

The key is **`/design-shotgun` before `/design-html`**. Picking from real variants is far more efficient than describing what you want from scratch.

---

## 3. Feed it screenshots, not just words

Once something is rendered (locally or on Vercel preview), screenshot it and paste it in. Say "the hero feels corporate — the spacing between headline and subhead is too tight and the button looks like Bootstrap." Claude will fix the specific thing, not guess.

The `/design-review` skill is particularly useful here — it looks at the rendered output the way a designer would and flags problems you may not have words for yet.

---

## 4. What makes a site look human vs AI

AI-generated sites fail on:
- **Spacing rhythm** — everything is `mb-4` / `mb-8`, no considered variation
- **Typography personality** — system fonts or generic pairings, no hierarchy in weight/size
- **Colour relationships** — backgrounds are white or `gray-50`, no warmth or texture
- **Copywriting** — generic headings ("Trusted by teams worldwide"), no voice
- **Micro-decisions** — border radii, subtle shadows, line-height — AI picks defaults

To avoid this:
- Specify your spacing scale explicitly (use your existing design tokens)
- Write the copy yourself or brief it tightly; never let the AI write headlines unprompted
- Use `/design-review` to hunt for generic patterns after each iteration
- Ask Claude specifically: *"flag anything that looks like a Tailwind default"*

---

## 5. Practical loop for the Vela site

```
1. /design-consultation  → agree visual language (tone, hierarchy, density)
2. /design-shotgun       → 3 variants of the home page hero section
3. Pick one + annotate screenshot ("keep the spacing, change the CTA colour")
4. /design-html          → production implementation
5. Deploy to Vercel preview
6. Screenshot → /design-review → fix flagged items
7. Repeat from step 5 for each section
```

The Vela site already has good bones — real design tokens, the right fonts, a clear brand colour. The next visual step is making the home page hero more compelling.
