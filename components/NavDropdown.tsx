"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { clsx } from "@/lib/clsx";
import type { NavMenuItem } from "@/lib/nav";

type Props = {
  items: NavMenuItem[];
  /** Whether the parent nav item is currently showing its menu. */
  open: boolean;
  /** Where the foot of the panel links to, and what it says. */
  allHref: string;
  allLabel: string;
  onNavigate: () => void;
};

/**
 * The desktop nav dropdown: one compact column of titles. Hovering a row
 * slides an arrow in on the right and expands that row's description
 * underneath it, pushing the rows below down.
 *
 * The expansion is a grid-template-rows 0fr → 1fr transition rather than a
 * max-height one. max-height has to guess a height large enough for the
 * longest description, and every row shorter than that guess then animates at
 * a different apparent speed; 0fr → 1fr animates to the content's own height,
 * so every row opens at the same rate.
 *
 * The description sits inside the link, so a screen reader reads it as part
 * of the link rather than needing it duplicated somewhere hidden.
 */
export function NavDropdown({
  items,
  open,
  allHref,
  allLabel,
  onNavigate,
}: Props) {
  return (
    <div
      className={clsx(
        // Centred under its own nav link. Left-aligning would run the panel
        // off the right of the window for the rightmost links at narrower
        // desktop widths; centred, it stays on screen at every size the
        // dropdown exists at.
        "absolute left-1/2 top-full w-[21rem] -translate-x-1/2 pt-2",
        "transition-[opacity,visibility] duration-200 ease-(--ease-out-soft)",
        "motion-reduce:transition-none",
        open ? "visible opacity-100" : "invisible pointer-events-none opacity-0",
      )}
    >
      <div className="border border-white/10 bg-[#0a0a0a]/95 shadow-soft backdrop-blur-2xl">
        <ul className="py-1.5">
          {items.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                tabIndex={open ? undefined : -1}
                onClick={onNavigate}
                className="group block px-5 py-2.5 transition-colors hover:bg-white/[0.06] focus-visible:bg-white/[0.06]"
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="min-w-0 text-sm text-white/80 transition-colors group-hover:text-white group-focus-visible:text-white">
                    {item.label}
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className={clsx(
                      "size-4 shrink-0 text-white",
                      "-translate-x-1 opacity-0",
                      "transition-[opacity,translate] duration-200 ease-(--ease-out-soft)",
                      "motion-reduce:transition-none",
                      "group-hover:translate-x-0 group-hover:opacity-100",
                      "group-focus-visible:translate-x-0 group-focus-visible:opacity-100",
                    )}
                  />
                </span>

                <span
                  className={clsx(
                    "grid grid-rows-[0fr]",
                    "transition-[grid-template-rows] duration-300 ease-(--ease-out-soft)",
                    "motion-reduce:transition-none",
                    "group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr]",
                  )}
                >
                  <span className="overflow-hidden">
                    <span
                      className={clsx(
                        "block pr-7 pt-1 text-[0.8125rem] leading-snug text-white/55",
                        "opacity-0 transition-opacity duration-200 ease-(--ease-out-soft)",
                        "motion-reduce:transition-none",
                        "group-hover:opacity-100 group-focus-visible:opacity-100",
                      )}
                    >
                      {item.description}
                    </span>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="border-t border-white/10 px-5 py-3.5">
          <Link
            href={allHref}
            tabIndex={open ? undefined : -1}
            onClick={onNavigate}
            className="group inline-flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white focus-visible:text-white"
          >
            {allLabel}
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-[translate] duration-200 ease-(--ease-out-soft) group-hover:translate-x-1 motion-reduce:transition-none"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
