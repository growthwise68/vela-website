# Vela public website

Marketing and compliance pages for the Vela app: Next.js 15 (App Router), Tailwind, Vercel. Design tokens align with `docs/UIUX/Vela_FlutterFlow_Spec.md` in the app repo.

**Repository:** [github.com/growthwise68/vela-website](https://github.com/growthwise68/vela-website)

**Master plan:** [vela_website_planning.md](./vela_website_planning.md) (stages, pass/fail, tests, human gates).

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Routes: `/`, `/privacy`, `/terms`, `/support`.

## Environment

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for `sitemap.xml` and `robots.txt`. Set in Vercel to your `*.vercel.app` or custom domain. |
| `NEXT_PUBLIC_SUPPORT_EMAIL` | Public support inbox (e.g. `support@...`). Shown on `/support`; use the same address in App Store Connect / Play where required. |

## Deploy (Vercel — free Hobby plan)

Vercel’s **Hobby** plan is free for personal and small projects (fair-use limits on build minutes and team size; see [vercel.com/pricing](https://vercel.com/pricing)). You get **HTTPS**, **preview URLs** on every git push, and a **production** URL like `https://<project-name>.vercel.app` with no paid domain required.

### Prerequisites

- This folder is a **Next.js** app (already configured).
- Code must live in a **Git** repo on **GitHub**, **GitLab**, or **Bitbucket** (Vercel deploys from git).

**If you are setting up GitHub for the first time** (this folder is already committed locally):

1. On [github.com/new](https://github.com/new), create a **new repository**:
   - Choose a name (e.g. `vela-website`).
   - Leave it **empty**: do **not** add a README, `.gitignore`, or license (avoids merge conflicts).
2. In a terminal, from **this** `website` folder, run (replace `USER` and `REPO` with yours):

```bash
git remote add origin https://github.com/USER/REPO.git
git push -u origin main
```

Use **SSH** if you use SSH keys: `git remote add origin git@github.com:USER/REPO.git`

If you need to fix the author on the first commit (name/email for GitHub), run `git config user.name` / `user.email` in this repo, then `git commit --amend --reset-author --no-edit`.

---

If this folder had **no** git history yet, you would run:

```bash
git init
git add .
git commit -m "Initial Vela website"
```

…then add `origin` and `git push` as above.

### Step-by-step: first deploy

1. **Sign up** at [vercel.com](https://vercel.com) (click **Sign Up** and use **Continue with GitHub** so your repos connect easily).
2. In the Vercel dashboard, click **Add New…** → **Project** (or **Import**).
3. **Import** the GitHub repository that contains this `website` code.
4. Vercel usually **detects Next.js** automatically. Defaults should be:
   - **Framework Preset:** Next.js  
   - **Root Directory:**  
     - If the repo’s root *is* this `website` folder, leave **empty** (`.`) or the default.  
     - If the site lives in a subfolder of a monorepo, set **Root Directory** to that folder (e.g. `website`).
   - **Build Command:** `next build` (default)  
   - **Output:** handled by Next.js (no change needed)
5. **Environment variables** (before the first *Production* deploy, or add right after in **Settings → Environment Variables**):
   - `NEXT_PUBLIC_SITE_URL` = `https://<your-project-name>.vercel.app` (use the real URL Vercel will show; you can redeploy after the first deploy to fix the exact name).
   - `NEXT_PUBLIC_SUPPORT_EMAIL` = your public support email (optional but needed for a visible address on `/support`).
   - Apply to **Production** (and **Preview** if you want previews to match).
6. Click **Deploy**. Wait for the build to finish.
7. Open the **Visit** / production URL. Test `/`, `/privacy`, `/terms`, `/support`.

**After the first successful deploy:** copy the **exact** production URL from the project (e.g. **Settings → Domains** or the top of the **Deployments** page). If your `NEXT_PUBLIC_SITE_URL` was a guess, set it to that exact `https://...` value and run **Redeploy** (Deployments → … on latest → Redeploy) so `sitemap.xml` and `robots.txt` use the right base.

### Later: custom domain (optional, usually paid)

Buy a domain from a registrar (Namecheap, Cloudflare, Google Domains, etc.), then in Vercel: **Project → Settings → Domains** → add the domain and follow the DNS records Vercel shows. Update `NEXT_PUBLIC_SITE_URL` to `https://yourdomain.com` and update App Store / Play / Facebook to the new URLs.

### If something fails

- **Build error:** run `npm run build` locally in this folder; fix any errors, commit, push — Vercel will rebuild.  
- **Wrong site / empty project:** check **Root Directory** matches where `package.json` lives.  
- **Env not applied:** variable names must be exact; redeploy after changing env.

**Stage 4–5:** Paste production URLs into App Store Connect, Google Play, and the Facebook Page; add custom domain in Vercel when you have one, then update env + consoles (see [vela_website_planning.md](./vela_website_planning.md)).

## Status vs master plan

| Stage | State |
|-------|--------|
| 0 Planning | `vela_website_planning.md` |
| 1 IA / design | Sitemap: home, privacy, terms, support; Vela theme applied |
| 2 Build MVP | This codebase on Vercel-ready Next.js |
| 3 Legal | Draft pages — **counsel review** before calling production-ready |
| 4 Stores / Meta | Manual — set URLs in consoles |
| 5 Custom domain | After `*.vercel.app` is live |

---

App source and detailed docs: `../Downloaded FF Files/crew-bid-zh19l5` (or your canonical Vela app path).
