import { NextResponse } from "next/server";
import { COMPANY, TRADING_NAME } from "@/lib/company";
import { looksLikeEmail, readField, sendToInbox } from "@/lib/mail";

/*
  Newsletter signups.

  Each signup is emailed to the business rather than written to a list: there
  is no mailing list yet, and a signup box that quietly drops addresses is
  worse than one that does not exist. When an email platform is chosen, this
  route is where it gets wired in.

  Submitting the form is the consent — a clear affirmative act, with the form
  saying plainly what it signs you up for. If this ever becomes a pre-ticked
  box or a by-the-way checkbox on the enquiry form, that stops being true
  under PECR and the privacy policy needs revisiting with it.
*/

function wantsJson(request: Request): boolean {
  return (request.headers.get("accept") ?? "").includes("application/json");
}

function reply(request: Request, status: number, body: { error?: string }) {
  if (wantsJson(request)) return NextResponse.json(body, { status });

  // No JavaScript: send them back to the page they came from, since the
  // form sits in the footer of every page rather than on one of its own.
  const referer = request.headers.get("referer");
  const target = new URL(referer ?? "/", request.url);
  target.searchParams.delete("subscribed");
  target.searchParams.delete("subscribe_error");
  target.searchParams.set(body.error ? "subscribe_error" : "subscribed", "1");
  target.hash = "newsletter";
  return NextResponse.redirect(target, 303);
}

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return reply(request, 400, { error: "We could not read that." });
  }

  // Same trap as the enquiry form: hidden, aria-hidden, out of the tab order.
  if (readField(form, "website")) {
    return reply(request, 200, {});
  }

  const email = readField(form, "email");
  if (!email) return reply(request, 400, { error: "Please add your email." });
  if (email.length > 254 || !looksLikeEmail(email)) {
    return reply(request, 400, {
      error: "That email address does not look right.",
    });
  }

  const sent = await sendToInbox({
    label: "newsletter signup",
    subject: `${TRADING_NAME} newsletter signup`,
    text: [
      `${email} asked to join the newsletter.`,
      "",
      "They consented by submitting the footer signup form, which states",
      "what it signs them up for and links the privacy policy. Add them to",
      "the mailing list, and keep this message as the record of consent.",
    ].join("\n"),
    replyTo: email,
  });

  if (!sent.ok) {
    return sent.reason === "unconfigured"
      ? reply(request, 503, {
          error: `Signups are not connected yet. Please email ${COMPANY.contactEmail}.`,
        })
      : reply(request, 502, {
          error: `That did not go through. Please email ${COMPANY.contactEmail}.`,
        });
  }

  return reply(request, 200, {});
}
