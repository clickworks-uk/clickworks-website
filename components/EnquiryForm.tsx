"use client";

import { useEffect, useState } from "react";
import { FORM_ENDPOINT } from "@/lib/company";
import { SERVICE_SLIDES } from "@/lib/content";

const FIELD =
  "mt-2 block w-full border border-line bg-paper px-4 py-3 text-base text-ink " +
  "placeholder:text-ink-muted focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-accent focus-visible:ring-offset-2";

const LABEL = "block text-sm font-medium text-ink";

export function EnquiryForm() {
  const [service, setService] = useState("");

  /*
   * The service arrives as ?service=branding from whichever tile was
   * clicked. Read from the URL after mount rather than through
   * useSearchParams, so the page stays statically renderable.
   */
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("service");
    if (slug && SERVICE_SLIDES.some((s) => s.slug === slug)) setService(slug);
  }, []);

  const live = Boolean(FORM_ENDPOINT);

  return (
    <form
      action={FORM_ENDPOINT || undefined}
      method="post"
      // No destination means no submission: an enquiry that goes nowhere is
      // worse than a form that says it is not ready.
      onSubmit={live ? undefined : (e) => e.preventDefault()}
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

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <button
          type="submit"
          disabled={!live}
          className="bg-ink px-7 py-3 text-base font-semibold text-white transition-colors hover:bg-ink-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-ink-muted"
        >
          Send enquiry
        </button>

        {!live && (
          <p role="status" className="text-sm text-ink-muted">
            This form is not accepting enquiries yet.
          </p>
        )}
      </div>

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
