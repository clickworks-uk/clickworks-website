"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { COMPANY } from "@/lib/company";
import { clsx } from "@/lib/clsx";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Newsletter signup, in the footer of every page.
 *
 * Submitting is the consent, so the copy says plainly what it signs you up
 * for and links the privacy policy. Nothing is pre-ticked and nothing is
 * bundled onto another form.
 */
export function NewsletterForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  // Set by the no-JavaScript path, which posts the form and is redirected
  // back to the page it came from.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("subscribed")) setStatus("sent");
    if (params.get("subscribe_error")) {
      setStatus("error");
      setError(`That did not go through. Please email ${COMPANY.contactEmail}.`);
    }
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        setError(
          body.error ??
            `That did not go through. Please email ${COMPANY.contactEmail}.`,
        );
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
      setError(
        `We could not reach the server. Please email ${COMPANY.contactEmail}.`,
      );
    }
  }

  return (
    <div id="newsletter" className="scroll-mt-24">
      <h2 className="text-sm font-medium text-ink-muted">Newsletter</h2>

      {status === "sent" ? (
        <p role="status" className="mt-4 text-sm leading-relaxed text-ink">
          Thanks — you&rsquo;re on the list. We&rsquo;ll be in touch.
        </p>
      ) : (
        <>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">
            What is actually working in search, social and AI — now and then,
            not every week.
          </p>

          <form
            action="/api/newsletter"
            method="post"
            onSubmit={handleSubmit}
            className="mt-4"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Your email address
            </label>
            <div className="flex items-stretch border border-line bg-paper focus-within:ring-2 focus-within:ring-accent">
              <input
                id="newsletter-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@company.com"
                className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-ink placeholder:text-ink-muted focus-visible:outline-none"
              />
              <button
                type="submit"
                disabled={status === "sending"}
                aria-label="Sign up to the newsletter"
                className={clsx(
                  "flex shrink-0 items-center justify-center bg-ink px-3",
                  "text-white transition-colors hover:bg-ink-soft",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                  "disabled:cursor-not-allowed disabled:bg-ink-muted",
                )}
              >
                <ArrowRight aria-hidden="true" className="size-4" />
              </button>
            </div>

            {/* Same trap as the enquiry form. */}
            <div aria-hidden="true" className="hidden">
              <label htmlFor="newsletter-website">Leave this field empty</label>
              <input
                id="newsletter-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <p role="status" className="sr-only">
              {status === "sending" ? "Signing you up…" : ""}
            </p>

            {status === "error" && (
              <p role="alert" className="mt-2 text-sm leading-snug text-[#b3261e]">
                {error}
              </p>
            )}

            <p className="mt-3 text-xs leading-relaxed text-ink-muted">
              Unsubscribe any time. See our{" "}
              <a
                href="/privacy"
                className="underline underline-offset-4 hover:text-ink"
              >
                Privacy Policy
              </a>
              .
            </p>
          </form>
        </>
      )}
    </div>
  );
}
