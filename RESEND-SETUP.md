# Turning the enquiry form on

The form at `/enquiry` is built and tested. It will not send anything until
two environment variables exist on Vercel and the sending domain is verified
in Resend. Until then it answers "The form is not connected yet. Please email
info@getclickworks.com." — it never pretends an enquiry went through.

Three steps, in order. Steps 1 and 2 are a Cowork job; step 3 is one minute.

---

## What has to be true at the end

| Thing | Value |
|---|---|
| Enquiries arrive at | `info@getclickworks.com` |
| Sent from | `enquiries@getclickworks.com` |
| Vercel env var | `RESEND_API_KEY` |
| Vercel env var | `ENQUIRY_FROM` = `Clickworks <enquiries@getclickworks.com>` |

`enquiries@getclickworks.com` does **not** need to be a real mailbox. It is
only the From address; replies go to whoever sent the enquiry, because the
route sets `Reply-To` to their address.

---

## Step 1 and 2 — paste the block below into Claude Cowork

Have Resend, IONOS and Vercel open in tabs first.

---

I need to connect a website enquiry form to email. Three accounts are
involved: **Resend** (sends the mail), **IONOS** (holds the DNS for
`getclickworks.com`), and **Vercel** (hosts the site).

Do these in order and tell me what you did at each step.

### 1. Resend

1. Sign in at resend.com, or create an account using **info@getclickworks.com**.
2. Go to **Domains** and add the domain **getclickworks.com**. Pick the EU
   region if it offers a choice — the business is UK-based.
3. Resend will show a set of DNS records to add (normally a TXT record for
   DKIM, an MX and a TXT record for the return path, and sometimes a DMARC
   record). **Show me that list exactly as Resend gives it, before changing
   anything at IONOS.** I want to see it.
4. Then go to **API Keys**, create a key named `clickworks-website`, and set
   its permission to **Sending access** only — not full access. Copy the key
   somewhere safe. It is shown once and never again.
   **Do not paste the key into this chat.** I will put it into Vercel myself.

### 2. IONOS

Go to IONOS → **Domains & SSL → getclickworks.com → DNS**.

1. **Show me every record on the domain before changing anything.**
2. Add the records Resend asked for, exactly as Resend gave them.
3. **Do not touch the existing records.** In particular:
   - Leave the `A` record on the apex alone — it points the site at Vercel.
   - Leave the `www` CNAME alone, for the same reason.
   - Leave any existing `MX` records alone unless Resend's instructions
     explicitly say to replace them. Deleting those stops mail arriving at
     `info@getclickworks.com`. If Resend asks for an MX record on a
     subdomain such as `send.getclickworks.com`, that is a different host
     from the apex and does not affect the mailbox — add it.
   - If IONOS rejects a value, tell me what the error says rather than
     substituting something that looks close.
4. Tell me exactly what you added, and what the final record list looks like.

### 3. Back in Resend

Wait a few minutes, then press **Verify** on the domain. DNS can take up to
an hour or two at IONOS. If it does not verify after about 30 minutes, tell
me — do not keep re-editing the records while waiting, as that makes it much
harder to work out what is wrong.

Tell me when the domain shows as **Verified**.

---

## Step 3 — add the key to Vercel (do this yourself)

Don't let anything paste the API key into a chat window. In Vercel:

1. Open the **clickworks-website** project → **Settings** → **Environment
   Variables**.
2. Add `RESEND_API_KEY` = the key you copied. Tick **Production**,
   **Preview** and **Development**.
3. Add `ENQUIRY_FROM` = `Clickworks <enquiries@getclickworks.com>`. Same
   three environments.
4. Go to **Deployments** and redeploy the latest one. Environment variables
   are read at runtime, but a redeploy is the reliable way to be sure the
   running deployment picks them up.

---

## Then test it

Go to `/enquiry` on the live site, send yourself a real enquiry, and check
`info@getclickworks.com`. You should get an email:

- **Subject:** `Clickworks enquiry — <the service picked>`
- **From:** `Clickworks <enquiries@getclickworks.com>`
- **Reply-To:** the enquirer's address, so hitting Reply in your inbox
  answers them directly

If the form says *"The form is not connected yet"*, `RESEND_API_KEY` is not
reaching the deployment — recheck step 3 and redeploy.

If it says *"We could not send that"*, the key is there but Resend refused
the send. That is almost always the domain not being verified yet, or
`ENQUIRY_FROM` using a domain that is not the verified one. The exact reason
is in the Vercel function logs: **Deployments → the deployment → Logs**,
filtered to `/api/enquiry`.

---

## Notes

- **Free tier.** Resend's free plan covers 3,000 emails a month and 100 a
  day, which is far more than an enquiry form will use.
- **Spam.** The form has a honeypot field that silently drops bots. If real
  spam starts getting through, the next step is a rate limit or a captcha —
  tell me and I will add one.
- **Nothing is stored.** The route emails the submission and keeps no copy.
  The privacy policy says so. If you ever want enquiries in a spreadsheet or
  a CRM, that is a change to the policy as well as to the code.
