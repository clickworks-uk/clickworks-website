# Prompt for Claude Cowork — point the IONOS domain at Vercel

Copy everything below the line into Cowork, with Vercel and IONOS open in tabs.
Replace `YOURDOMAIN.com` with the actual domain first.

---

I have two tabs open: my Vercel dashboard and my IONOS account. I want my
domain pointed at an existing Vercel project. Work through this with me,
pausing whenever you need me to click something or read a value back to you.

## What already exists — do not recreate any of it

- **Vercel project:** `clickworks-website`, under the team **whitehawk-agency**
- **Project ID:** `prj_hC8tWpyHmeAZIOI5BMUsr27lNM8o`
- **Connected repo:** `whitehawk-agency/clickworks-website` (GitHub)
- **Production branch:** `claude/ecstatic-mayer-4c4j69` — this is the repo's
  default branch, so every push to it deploys to production automatically
- **Framework preset:** Next.js · **Node:** 24.x · **Build command:** default
  (`next build`) · **Output:** default — do not set a custom output directory
- **Latest production deployment:** READY
- **Environment variables:** none, and none are needed. The codebase reads no
  `process.env` values at all. Do not add any.

The project is already building and deploying correctly. The only thing
missing is the custom domain.

## The one thing to know before you start

The project has **Vercel Authentication turned on**, set to
*"all except custom domains"*. That is why `clickworks-website.vercel.app`
asks for a Vercel login.

This is the setting I want. Once the custom domain is attached, that domain
serves the site publicly while the `.vercel.app` previews stay behind the
login. **Do not turn Vercel Authentication off** to "fix" the login prompt —
if the custom domain shows a login screen after it is verified, tell me, and
we will look at it together rather than disabling protection.

## The job

1. In Vercel, open the `clickworks-website` project → **Settings → Domains**.
2. Add both `YOURDOMAIN.com` and `www.YOURDOMAIN.com`.
3. Vercel will then display the exact DNS records it wants. **Read the actual
   values off the screen and tell me what they are.** Do not use IP addresses
   or CNAME targets from memory or from a blog post — Vercel's published
   targets change, and a stale value fails silently with a domain that looks
   configured but never verifies.
4. In IONOS: **Domains & SSL → the domain → DNS**. Add the records Vercel gave
   you.
   - Before adding anything, check what is already there. IONOS ships new
     domains with parking-page records, and a leftover `A` or `CNAME` on the
     same host will conflict with Vercel's. Show me anything you are about to
     delete before you delete it.
   - IONOS does not allow a `CNAME` on the apex (root) — the apex needs the
     `A` record Vercel specifies.
5. Back in Vercel, wait for both entries to show **Valid Configuration**.
   DNS can take anywhere from a few minutes to a few hours. If it has not
   verified within about 30 minutes, tell me rather than changing records
   again — re-editing mid-propagation makes it harder to diagnose.
6. Once verified, confirm Vercel has issued the **SSL certificate** for both
   the apex and `www`.
7. Ask me which I want as the canonical address — `YOURDOMAIN.com` or
   `www.YOURDOMAIN.com` — and set the other to redirect to it in Vercel's
   Domains panel.

## When you think it is done, verify rather than assume

Check each of these and report what you actually saw:

- `https://YOURDOMAIN.com` loads the site over HTTPS with no certificate
  warning, and no Vercel login screen
- `https://www.YOURDOMAIN.com` redirects to the canonical one (or vice versa)
- `http://` redirects to `https://`
- These pages load: `/`, `/about`, `/services`, `/projects`, `/our-team`,
  `/news`, `/community`, `/contact`, `/enquiry`, `/coming-soon`
- Clicking a service tile on `/services` lands on `/enquiry` with that service
  already chosen in the dropdown
- The site looks styled — if it renders as unstyled text, the CSS 404'd and
  something is wrong with the deployment, not the DNS

## Two things I already know about, so do not "fix" them

- **The enquiry form's submit button is disabled.** That is deliberate. There
  is no form backend yet, and `FORM_ENDPOINT` in `lib/company.ts` is empty, so
  the form says so rather than silently dropping enquiries. Leave it.
- **The footer has no company registration number or address.** Those fields
  in `lib/company.ts` are intentionally empty rather than filled with
  placeholders. Leave them.

Do not edit any code to get the domain working. This task is DNS and Vercel
settings only. If you think a code change is needed, stop and tell me why.
