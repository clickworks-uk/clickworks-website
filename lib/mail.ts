import { COMPANY } from "@/lib/company";

/*
  Sending mail from the site's form routes.

  Resend's HTTP API rather than SMTP: these handlers are short-lived, so
  opening an SMTP connection per cold start is slow and prone to timing out,
  and the credential is then a send-only API key rather than the mailbox
  password — a leaked key cannot read mail.

  Needs two environment variables on Vercel:
    RESEND_API_KEY   — from resend.com, send-only
    ENQUIRY_FROM     — e.g. "Clickworks <enquiries@getclickworks.com>", on a
                       domain verified in Resend. Falls back to the Resend
                       onboarding sender, which only delivers to the address
                       that owns the Resend account.
*/

/** Overridable so the success path can be exercised against a local stub. */
const RESEND_API = process.env.RESEND_API_BASE ?? "https://api.resend.com";

const FROM = process.env.ENQUIRY_FROM ?? "onboarding@resend.dev";

export type SendOutcome =
  /** Sent. */
  | { ok: true }
  /** No API key configured: the site is not wired up yet. */
  | { ok: false; reason: "unconfigured" }
  /** The provider refused it, or the request never got there. */
  | { ok: false; reason: "failed" };

/**
 * Email one of the site's forms to the business.
 *
 * Never reports success for mail it did not send, and never puts the
 * provider's own message in front of a visitor: that text can name the
 * sending domain and the state of the key, which is nobody else's business.
 * It goes to the server log instead.
 */
export async function sendToInbox({
  subject,
  text,
  replyTo,
  label,
}: {
  subject: string;
  text: string;
  /** So hitting reply in the inbox answers the person, not the robot. */
  replyTo?: string;
  /** What to call this in the server log. */
  label: string;
}): Promise<SendOutcome> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error(`${label} not sent: RESEND_API_KEY is not set.`);
    return { ok: false, reason: "unconfigured" };
  }

  try {
    const response = await fetch(`${RESEND_API}/emails`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [COMPANY.contactEmail],
        ...(replyTo ? { reply_to: replyTo } : {}),
        subject,
        text,
      }),
    });

    if (!response.ok) {
      console.error(
        `Resend rejected the ${label}: ${response.status} ${await response.text()}`,
      );
      return { ok: false, reason: "failed" };
    }
  } catch (cause) {
    console.error(`${label} send failed`, cause);
    return { ok: false, reason: "failed" };
  }

  return { ok: true };
}

/**
 * Deliberately loose: one @, something either side, a dot in the domain. The
 * only authoritative test of an address is sending to it, and a stricter
 * pattern mostly succeeds at rejecting real addresses.
 */
export function looksLikeEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/** Read a trimmed string field from a submitted form. */
export function readField(form: FormData, key: string): string {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
}
