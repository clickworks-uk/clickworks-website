# Connect getclickworks.com to the holding page

Paste the section below into Claude Cowork with Vercel and IONOS open.

Everything else is already done: both Vercel projects exist and both have a
READY production deployment. This is DNS and Vercel settings only.

---

I want to point my domain **getclickworks.com** at a Vercel project. Work
through this with me and pause whenever you need me to click something or
read a value back to you.

## What already exists — do not recreate any of it

- **Vercel team:** the only team on my account. The API reports it as
  *"Whitehawk Agency's projects"*; the dashboard may show it as
  **clickworks-uk** after a rename. Same team either way. Its ID, which does
  not change on rename, is `team_A9qQ1aNWCkCvt37S28lOx60i`.
- **Target project:** **`comingsoon`** — id `prj_4KPjCJ4RQv2V7meJhMVN0DZp5xNA`,
  repo `clickworks-uk/comingsoon`, branch `main`. Latest production
  deployment is READY. It is a static `index.html`; the framework preset is
  correctly **Other** with no build command. Leave all of that alone.
- **Not the target, for now:** `clickworks-website` is the full site. It is
  deployed and working, but I want the domain on the holding page first.
- **Environment variables:** none on either project, and none are needed.

## The one setting that will look like a fault and is not

`comingsoon` has **Vercel Authentication** on, set to
*"all except custom domains"*. That is why `comingsoon-virid-zeta.vercel.app`
asks for a Vercel login.

Leave it exactly as it is. Once `getclickworks.com` is attached, that domain
serves the page publicly while the `.vercel.app` URLs stay behind the login —
which is what I want. **Do not turn Vercel Authentication off.** If the custom
domain still shows a login screen *after* it verifies, tell me and we will
look at it together.

## The job

1. Vercel, project **`comingsoon`**, **Settings → Domains**.
2. Add **`getclickworks.com`** and **`www.getclickworks.com`**.
3. Vercel will then show the exact DNS records it wants. **Read them off the
   screen and tell me the actual values before touching IONOS.** Do not use
   an IP address or CNAME target from memory or from a blog post — Vercel's
   published targets change, and a stale value fails silently: the domain
   looks configured and simply never verifies.
   - Expect an **A record** for the apex and a **CNAME** for `www`. If Vercel
     shows something different, follow Vercel, not this note.
4. IONOS, **Domains & SSL → getclickworks.com → DNS**.
   - First, show me every record already there. IONOS ships domains with
     parking-page records, and a leftover `A` or `CNAME` on the same host
     will conflict with Vercel's. List anything you plan to delete before
     you delete it.
   - IONOS does not allow a CNAME on the apex, so the apex must use the A
     record Vercel specified.
   - Leave MX records alone. Deleting those kills email on the domain.
5. Back in Vercel, wait for both entries to read **Valid Configuration**.
   This can take minutes or hours. If it has not verified within about 30
   minutes, tell me rather than editing records again — re-editing
   mid-propagation makes it much harder to diagnose.
6. Confirm Vercel has issued the **SSL certificate** for both names.
7. Ask me which address I want canonical — `getclickworks.com` or
   `www.getclickworks.com` — and set the other to redirect to it in Vercel's
   Domains panel.

## Verify rather than assume

Report what you actually saw for each:

- `https://getclickworks.com` loads over HTTPS, no certificate warning, and
  **no Vercel login screen**
- `https://www.getclickworks.com` redirects to the canonical one, or the
  other way round
- `http://getclickworks.com` redirects to `https://`
- The page shows the Clickworks logo in white on a dark blue-and-magenta
  gradient, the words "Coming soon", one sentence, and four social icons
  beside `@getclickworks`
- It fills one screen with nothing to scroll, and nothing is cut off in a
  phone-width window

Do not edit any code. If you think a code change is needed, stop and tell me
why.

---

# Later: switching the domain to the full site

When the real site is ready this is the whole job, and it needs **no DNS
changes**, because the records already point at Vercel:

1. Vercel, `comingsoon`, Settings → Domains → **remove** `getclickworks.com`
   and `www.getclickworks.com`.
2. Vercel, `clickworks-website`, Settings → Domains → **add** the same two.
3. Re-set the apex/www redirect and wait for the certificate to reissue.

Order matters: a domain can sit on only one project at a time, so it has to
come off `comingsoon` first. The domain will 404 for a minute or two between
the two steps.

Two things to do on `clickworks-website` before that switch:

- Set `FORM_ENDPOINT` in `lib/company.ts`, or the enquiry form stays
  disabled. Turning it on starts collecting personal data, so the privacy
  policy needs a line covering what is collected, why, and for how long.
- Fill in the company registration number, registered address and contact
  email in `lib/company.ts`. They are intentionally empty, so the footer's
  business-details block stays hidden until they are set.
