import { NextResponse } from "next/server";
import { COMPANY, TRADING_NAME } from "@/lib/company";
import { SERVICE_SLIDES } from "@/lib/content";

/*
  Where the enquiry form posts.

  Mail goes out through Resend's HTTP API rather than SMTP: these handlers are
  short-lived, and opening an SMTP connection per cold start is both slow and
  prone to timing out. It also means the credential is a send-only API key
  instead of the mailbox password, so a leak cannot be used to read mail.

  Needs two environment variables on Vercel:
    RESEND_API_KEY   — from resend.com, send-only
    ENQUIRY_FROM     — e.g. "Clickworks <enquiries@getclickworks.com>", on a
                       domain verified in Resend. Falls back to the Resend
                       onboarding sender, which only delivers to the address
                       that owns the Resend account.

  Without RESEND_API_KEY the route answers 503 and the form tells the visitor
  to email instead. It never reports success for mail it did not send.
*/

/** Overridable so the success path can be exercised against a local stub. */
const RESEND_API = process.env.RESEND_API_BASE ?? "https://api.resend.com";

const FROM = process.env.ENQUIRY_FROM ?? "onboarding@resend.dev";

const LIMITS = { name: 100, email: 254, company: 100, message: 5000 } as const;

type Fields = {
  name: string;
  email: string;
  company: string;
  message: string;
  service: string;
};

function readField(form: FormData, key: string): string {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Deliberately loose: one @, something either side, a dot in the domain. The
 * only authoritative test of an address is sending to it, and a stricter
 * pattern mostly succeeds at rejecting real addresses.
 */
function looksLikeEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validate(form: FormData): { fields: Fields } | { error: string } {
  const fields: Fields = {
    name: readField(form, "name"),
    email: readField(form, "email"),
    company: readField(form, "company"),
    message: readField(form, "message"),
    service: readField(form, "service"),
  };

  if (!fields.name) return { error: "Please tell us your name." };
  if (!fields.email) return { error: "Please give us an email address." };
  if (!looksLikeEmail(fields.email)) {
    return { error: "That email address does not look right." };
  }
  if (!fields.message) return { error: "Please tell us what you need." };

  for (const [key, max] of Object.entries(LIMITS)) {
    if (fields[key as keyof typeof LIMITS].length > max) {
      return { error: `That ${key} is too long.` };
    }
  }

  // An unknown slug means a tampered or stale form, not a real choice.
  if (fields.service && !SERVICE_SLIDES.some((s) => s.slug === fields.service)) {
    return { error: "Please choose a service from the list." };
  }

  return { fields };
}

function serviceLabel(slug: string): string {
  return (
    SERVICE_SLIDES.find((s) => s.slug === slug)?.label ?? "General enquiry"
  );
}

/**
 * Whether to answer with JSON or a redirect. The form submits with fetch and
 * asks for JSON; a browser posting the form without JavaScript does not, and
 * gets sent back to a page rather than shown a wall of JSON.
 */
function wantsJson(request: Request): boolean {
  return (request.headers.get("accept") ?? "").includes("application/json");
}

function reply(request: Request, status: number, body: { error?: string }) {
  if (wantsJson(request)) return NextResponse.json(body, { status });

  const target = new URL(
    body.error ? "/enquiry?error=1" : "/enquiry?sent=1",
    request.url,
  );
  // 303 so the browser follows with GET and a refresh cannot resubmit.
  return NextResponse.redirect(target, 303);
}

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return reply(request, 400, { error: "We could not read that submission." });
  }

  /*
    Honeypot. The field is hidden from people and from screen readers, so only
    a bot filling every input reaches this. Answer as though it worked: telling
    a bot it was caught just teaches whoever wrote it to stop filling the trap.
  */
  if (readField(form, "website")) {
    return reply(request, 200, {});
  }

  const checked = validate(form);
  if ("error" in checked) return reply(request, 400, { error: checked.error });
  const { fields } = checked;

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("Enquiry not sent: RESEND_API_KEY is not set.");
    return reply(request, 503, {
      error: `The form is not connected yet. Please email ${COMPANY.contactEmail}.`,
    });
  }

  const lines = [
    `Service:  ${serviceLabel(fields.service)}`,
    `Name:     ${fields.name}`,
    `Email:    ${fields.email}`,
    fields.company ? `Company:  ${fields.company}` : null,
    "",
    fields.message,
  ].filter((line) => line !== null);

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
        // So hitting reply in the inbox answers the enquirer, not the robot.
        reply_to: fields.email,
        subject: `${TRADING_NAME} enquiry — ${serviceLabel(fields.service)}`,
        text: lines.join("\n"),
      }),
    });

    if (!response.ok) {
      // Logged for us, not shown: the provider's message can name the sending
      // domain and the key's state, which is not the visitor's business.
      console.error(
        `Resend rejected the enquiry: ${response.status} ${await response.text()}`,
      );
      return reply(request, 502, {
        error: `We could not send that. Please email ${COMPANY.contactEmail}.`,
      });
    }
  } catch (cause) {
    console.error("Enquiry send failed", cause);
    return reply(request, 502, {
      error: `We could not send that. Please email ${COMPANY.contactEmail}.`,
    });
  }

  return reply(request, 200, {});
}
