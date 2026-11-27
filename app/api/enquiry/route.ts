import { NextResponse } from "next/server";
import { COMPANY, TRADING_NAME } from "@/lib/company";
import { SERVICE_SLIDES } from "@/lib/content";
import { looksLikeEmail, readField, sendToInbox } from "@/lib/mail";

/*
  Where the enquiry form posts. The Resend plumbing and its environment
  variables live in lib/mail.ts, shared with the newsletter route.
*/

const LIMITS = { name: 100, email: 254, company: 100, message: 5000 } as const;

type Fields = {
  name: string;
  email: string;
  company: string;
  message: string;
  service: string;
};

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

  const lines = [
    `Service:  ${serviceLabel(fields.service)}`,
    `Name:     ${fields.name}`,
    `Email:    ${fields.email}`,
    fields.company ? `Company:  ${fields.company}` : null,
    "",
    fields.message,
  ].filter((line) => line !== null);

  const sent = await sendToInbox({
    label: "enquiry",
    subject: `${TRADING_NAME} enquiry — ${serviceLabel(fields.service)}`,
    text: lines.join("\n"),
    replyTo: fields.email,
  });

  if (!sent.ok) {
    return sent.reason === "unconfigured"
      ? reply(request, 503, {
          error: `The form is not connected yet. Please email ${COMPANY.contactEmail}.`,
        })
      : reply(request, 502, {
          error: `We could not send that. Please email ${COMPANY.contactEmail}.`,
        });
  }

  return reply(request, 200, {});
}
