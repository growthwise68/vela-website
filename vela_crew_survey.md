# Véla — Crew fatigue & wellbeing survey

**Help us build the tool you’ve never had.**

This document is the **question bank** for the public crew survey. The **live** experience is a shorter flow (about **3 minutes**); the version and field names are defined in `src/app/survey/questions.ts` and submitted with `survey_version: "15q_v1"`.

---

## What is live now (`15q_v1`)

- **15 answered questions** after the intro screen (plus one **intro** screen—no answer stored as a question row).
- **Order:** engaging / emotional questions first; **role** and **flying experience** last.
- **Branding:** **Véla**; product described as a **lifestyle and wellness companion** (not a “readiness planning app” in survey copy).
- **Thank-you page:** optional email for launch notice; survey answers described as **anonymised** and only for improving Véla for cabin crew.

### Included in production — 15 questions

| # | `id` (code) | Short label |
|---|-------------|-------------|
| 01 | `energy` | How are you feeling right now? (emoji scale; sub frames “this week in your flying life”) |
| 02 | `recovery` | After a long-haul rotation, how long until you feel like yourself again? |
| 03 | `personal_life` | How often does fatigue from your roster affect your personal life on days off? |
| 04 | `utility` | “Something that can make roster and time off a little better” — interest 1–5; sub frames idea + circadian/sleep science (incl. space/military field) |
| 05 | `helpful_features` | What would help you most before a difficult trip? (up to 3) |
| 06 | `bodyclock` | Do you know where your body clock actually is… |
| 07 | `route` | What best describes your typical flying pattern? |
| 08 | `zones` | How many time zones do you cross in a typical month? |
| 09 | `roster_planning` | When you receive your roster, do you plan sleep and recovery… |
| 10 | `coping` | What do you currently use to support sleep and recovery? (multi) |
| 11 | `rested` | How often do you report for duty feeling genuinely well-rested? |
| 12 | `crew_trust` | Trust if designed with input from **former** crew members |
| 13 | `pay` | What would you pay per month if it genuinely helped… |
| 14 | `role` | What is your current role? (sub: aggregate patterns across cabin; built for whole community) |
| 15 | `experience` | How many years have you been flying? |

---

## Full historical list (original long form) — included vs not in `15q_v1`

Below is the **earlier 6-section / 23-question** design. Use this table to see what was **dropped**, **merged**, or **replaced** by the live 15-question set.

| Orig. # | Topic (summary) | Status in `15q_v1` |
|--------:|-----------------|-------------------|
| 1 | Current role (Economy… Purser) | **Included** → `role` (Q14); options text updated |
| 2 | Years of flying experience | **Included** → `experience` (Q15) |
| 3 | Age range | **Not included** |
| 4 | Where you are based | **Not included** |
| 5 | How often well-rested reporting for duty | **Included** → `rested` (Q11) |
| 6 | Involuntary microsleep in critical phases | **Not included** |
| 7 | Struggle to stay awake on red-eye / ultra-long-haul | **Not included** |
| 8 | Times in past month performance felt impaired by fatigue | **Not included** |
| 9 | Concern about safety implications of fatigue (1–5) | **Not included** |
| 10 | Days to feel “normal” after medium/long-haul | **Replaced** → `recovery` (Q02) uses long-haul *rotation* wording and different buckets |
| 11 | Know where body clock is | **Included** → `bodyclock` (Q06) |
| 12 | What you use to manage fatigue/sleep (multi) | **Replaced** → `coping` (Q10) with a different option list |
| 13 | Fatigue affecting personal life on days off | **Included** → `personal_life` (Q03) |
| 14 | Plan sleep/recovery around roster | **Included** → `roster_planning` (Q09) |
| 15 | Dreaded routes or patterns | **Not included** |
| 16 | Value of personalised alertness forecast (1–5) | **Not included** (related ground covered by `utility` + `helpful_features`) |
| 17 | What would help most before a difficult trip (up to 3) | **Included** → `helpful_features` (Q05); option wording slightly adjusted |
| 18 | Would you use an app with personalised fatigue plan | **Not included** |
| 19 | Monthly price for a tool that helps fatigue / days off | **Included** → `pay` (Q13); price bands adjusted |
| 20 | Rank features in order | **Not included** |
| 21 | Trust if built by fellow crew | **Included** → `crew_trust` (Q12); rephrased to **former** crew input |
| 22 | Open text: moment fatigue scared you | **Not included** |
| 23 | Open text: one thing you wish existed | **Not included** |

### New questions only in `15q_v1` (no direct “orig. #” match)

- **`energy`** — mood / energy check-in (engaging first screen).
- **`utility`** — interest in “something that could make life a little better” (1–5), framed as idea not finished app, with science context.
- **`route`** — typical flying pattern (short vs long-haul mix).
- **`zones`** — time zones crossed per month.

---

## Copy reference (intro screen, live site, home)

- Duration: **About 3 minutes** · **Anonymous**
- **By crew, for crew** + **former crew** + **ongoing feedback** drive the roadmap; **published circadian and sleep science** (same research field as high-performance **space and military** sleep/alertness work) — as on the home page.
- Product = **Véla** as a **lifestyle and wellness companion**
- Thank-you: answers **anonymised**; used **only** to improve Véla for cabin crew; waitlist copy explains email is separate from survey identity.

---

*Responses are treated as confidential research input. The full legal treatment of data is described on the site’s Privacy page.*
