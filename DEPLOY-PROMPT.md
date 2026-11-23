# Fix the DNS for getclickworks.com at IONOS

Paste everything below the line into Claude Cowork, with IONOS open.

---

My domain **getclickworks.com** is attached to a Vercel project and Vercel has
verified ownership, but the DNS at IONOS was never pointed at Vercel, so the
domain does not serve my site. Vercel reports `misconfigured: true` for both
`getclickworks.com` and `www.getclickworks.com`.

This is a DNS job at IONOS only. **Nothing needs changing in Vercel** — the
domains are already added there and set up the way I want.

## What Vercel currently sees

| Host | What is there now | What it should be |
|---|---|---|
| `getclickworks.com` (apex) | `A` → `217.160.0.129` — an **IONOS** IP, wrong | `A` → `216.198.79.1` |
| `www.getclickworks.com` | **nothing at all** | `CNAME` → `6957331ae5058a2f.vercel-dns-017.com.` |

Nameservers are already IONOS (`ns1089.ui-dns.org`, `ns1103.ui-dns.biz`,
`ns1109.ui-dns.com`, `ns1080.ui-dns.de`). Those are correct — do not change
them, and do not switch the domain to Vercel's nameservers.

## What to do

Go to IONOS → **Domains & SSL → getclickworks.com → DNS**.

1. **Show me every record currently on the domain before changing anything.**
   I want to see the list first.
2. **Replace** the apex `A` record. Delete the one pointing at
   `217.160.0.129` and add `A` with host `@` (or blank, as IONOS labels the
   root) pointing at **`216.198.79.1`**.
   - Replace it, do not add a second A record alongside. Two A records on the
     apex means traffic goes to whichever answers, and the site will work
     only some of the time.
3. **Add** a `CNAME` for host `www` pointing at
   **`6957331ae5058a2f.vercel-dns-017.com.`** (keep the trailing dot if IONOS
   accepts one; drop it if IONOS rejects it).
   - If a `www` record already exists in any form, replace it.
4. **Do not touch the MX records.** Deleting those kills email on the domain.
   Same for any `TXT` records — leave them alone unless I say otherwise.
5. Tell me exactly what you changed: what you deleted, what you added.

## If IONOS will not accept those values

Some IONOS panels only offer a short preset list, or reject a CNAME target
with a trailing dot. If either value is refused, tell me what the error says
rather than substituting something that looks close. Vercel also accepts
these older fallbacks, which still work:

- apex `A` → `76.76.21.21`
- `www` `CNAME` → `cname.vercel-dns.com.`

Use a fallback only if the first value is genuinely rejected, and tell me
which one you used.

## Then

DNS changes take anywhere from a few minutes to a couple of hours to
propagate. Once you have saved the records:

1. Tell me they are saved and what the final record list looks like.
2. Do not keep re-editing while waiting — if it has not come good after about
   30 minutes, tell me, and we will look at it together. Re-editing
   mid-propagation makes it much harder to work out what is wrong.
3. If you can, check `https://www.getclickworks.com` after 10 minutes or so
   and tell me what it shows. I am expecting: a white "clickworks" logo on a
   dark blue and magenta gradient, the words "Coming soon", a sentence under
   it, and four social icons. If you see an IONOS parking page instead, DNS
   has not propagated yet — that is expected early on, not a failure.
4. `getclickworks.com` without the `www` should end up redirecting to
   `www.getclickworks.com`. That redirect happens at Vercel, not IONOS, so do
   not add a redirect or forwarding rule at IONOS — IONOS forwarding would
   conflict with the A record and break it.
