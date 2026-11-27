"use client";

import { useEffect, useState } from "react";
import { COMPANY, FORM_ENDPOINT } from "@/lib/company";
import { SERVICE_SLIDES } from "@/lib/content";

const FIELD =
  "mt-2 block w-full border border-line bg-paper px-4 py-3 text-base text-ink " +
  "placeholder:text-ink-muted focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-accent focus-visible:ring-offset-2";

const LABEL = "block text-sm font-medium text-ink";

type Status = "idle" | "sending" | "sent" | "error";

export function EnquiryForm() {
  const [service, setService] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  /*
   * The service arrives as ?service=branding from whichever tile was
   * clicked. Read from the URL after mount rather than through
   * useSearchParams, so the page stays statically renderable.
   */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("service");
    if (slug && SERVICE_SLIDES.some((s) => s.slug === slug)) setService(slug);

    // Set by the no-JavaScript path, which posts the form and is redirected
    // back here. Without this the visitor would land on a form that looks
    // untouched and have no idea whether it went.
    if (params.get("sent")) setStatus("sent");
    if (params.get("error")) {
      setStatus("error");
      setError(`Something went wrong. Please email ${COMPANY.contactEmail}.`);
    }
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    setStatus("sending");
    setError("");

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        setError(
          body.error ??
            `Something went wrong. Please email ${COMPANY.contactEmail}.`,
        );
        setStatus("error");
        return;
      }

      form.reset();
      setService("");
      setStatus("sent");
    } catch {
      // A network failure, not a rejection: the enquiry never left.
      setStatus("error");
      setError(
        `We could not reach the server. Please email ${COMPANY.contactEmail}.`,
      );
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="mt-10 border border-line bg-paper-soft p-8 sm:p-10"
      >
        <h2 className="text-2xl font-semibold text-ink">Thanks — that is in.</h2>
        <p className="mt-3 text-base leading-relaxed text-ink-muted">
          We read every enquiry and will come back to you by email. If it is
          urgent, reach us directly at{" "}
          <a
            href={`mailto:${COMPANY.contactEmail}`}
            className="underline underline-offset-4 hover:text-ink"
          >
            {COMPANY.contactEmail}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium text-ink underline underline-offset-4 hover:text-ink-muted"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    /*
      action and method are kept so the form still posts without JavaScript;
      the route redirects that case back here with ?sent=1. handleSubmit takes
      over whenever JavaScript is running, which is what gives the inline
      states below.
    */
    <form
      action={FORM_ENDPOINT}
      method="post"
      onSubmit={handleSubmit}
      className="mt-10 flex flex-col gap-6"
    >
      <div>
        <label className={LABEL} htmlFor="service">
          What can we help with?
        </label>
        <select
          id="service"
          name="service"
          value={service}
          onChange={(e) => setService(e.target.value)}
          className={FIELD}
        >
          <option value="">Choose a service</option>
          {SERVICE_SLIDES.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={LABEL} htmlFor="name">
            Your name
          </label>
          <input id="name" name="name" type="text" required autoComplete="name" className={FIELD} />
        </div>
        <div>
          <label className={LABEL} htmlFor="email">
            Email
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className={FIELD} />
        </div>
      </div>

      <div>
        <label className={LABEL} htmlFor="company">
          Company <span className="font-normal text-ink-muted">(optional)</span>
        </label>
        <input id="company" name="company" type="text" autoComplete="organization" className={FIELD} />
      </div>

      <div>
        <label className={LABEL} htmlFor="message">
          What are you trying to grow?
        </label>
        <textarea id="message" name="message" rows={6} required className={FIELD} />
      </div>

      {/*
        Spam trap. Hidden from sight and from assistive technology, and taken
        out of the tab order, so nobody using the page can fill it in — only a
        bot filling every field will. The server drops anything that has it.
      */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <button
          type="submit"
          disabled={sending}
          className="bg-ink px-7 py-3 text-base font-semibold text-white transition-colors hover:bg-ink-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-ink-muted"
        >
          {sending ? "Sending…" : "Send enquiry"}
        </button>

        <p role="status" className="text-sm text-ink-muted">
          {sending ? "Sending your enquiry…" : ""}
        </p>
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm leading-relaxed text-[#b3261e]">
          {error}
        </p>
      )}

      <p className="text-sm leading-relaxed text-ink-muted">
        We use what you send only to reply to your enquiry. See our{" "}
        <a href="/privacy" className="underline underline-offset-4 hover:text-ink">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
