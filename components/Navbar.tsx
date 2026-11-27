"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { Container } from "@/components/Container";
import { Wordmark } from "@/components/Wordmark";
import { NavDropdown } from "@/components/NavDropdown";
import { ENQUIRY_HREF } from "@/lib/links";
import { NAV_LINKS } from "@/lib/nav";
import { clsx } from "@/lib/clsx";


export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [retracted, setRetracted] = useState(false);
  /** Which desktop nav item is showing its dropdown, by label. */
  const [menu, setMenu] = useState<string | null>(null);
  /** Which mobile nav item is expanded, by label. */
  const [expanded, setExpanded] = useState<string | null>(null);
  const lastY = useRef(0);
  const idle = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);


  /*
    On phones the bar pulls up out of the way on its own: it retracts when the
    page is scrolled down, and again after a couple of seconds of stillness.
    Scrolling up, returning to the top, opening the menu or focusing anything
    inside it brings it straight back. Desktop never retracts.
  */
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)");

    const settle = () => {
      clearTimeout(idle.current);
      idle.current = setTimeout(() => {
        if (!wide.matches && window.scrollY > 80) setRetracted(true);
      }, 2000);
    };

    const onScroll = () => {
      if (wide.matches) {
        setRetracted(false);
        return;
      }
      const y = window.scrollY;
      setRetracted(y > 80 && y > lastY.current);
      lastY.current = y;
      settle();
    };

    lastY.current = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });
    wide.addEventListener("change", onScroll);
    settle();
    return () => {
      window.removeEventListener("scroll", onScroll);
      wide.removeEventListener("change", onScroll);
      clearTimeout(idle.current);
    };
  }, []);

  // A route change closes the sheet, and any menu, behind it.
  useEffect(() => {
    setOpen(false);
    setMenu(null);
  }, [pathname]);

  // The mobile sheet reopens with its sections collapsed.
  useEffect(() => {
    if (!open) setExpanded(null);
  }, [open]);

  // The menu cannot be open behind a retracted bar.
  useEffect(() => {
    if (open) setRetracted(false);
  }, [open]);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Running index across the groups, so the links trail in one after another.
  let order = -1;

  return (
    <>
      <header
        onFocusCapture={() => setRetracted(false)}
        className={clsx(
          "sticky top-0 z-50 border-b transition-colors duration-300",
          // Tailwind v4 drives these from the `translate` property, so that is
          // what the transition has to watch.
          "transition-[translate,background-color,border-color] duration-300 ease-(--ease-out-soft)",
          "motion-reduce:transition-none",
          retracted && !open ? "-translate-y-full md:translate-y-0" : "translate-y-0",
          // While the sheet is open the bar goes transparent and the sheet
          // runs behind it, so the two read as one unbroken dark surface.
          open
            ? "border-transparent bg-transparent backdrop-blur-none md:border-white/10 md:bg-black/85 md:backdrop-blur-md"
            : "border-white/10 bg-black/85 backdrop-blur-md",
        )}
      >
        {/*
          Full-bleed rather than inside the page container, so the wordmark
          sits against the left edge of the window and the CTA against the
          right, instead of both pulling in to the 72rem content column.
        */}
        <div className="w-full px-5 sm:px-8">
          <nav
            aria-label="Main"
            className="relative flex h-16 items-center justify-start gap-4 md:justify-between"
          >
            {/* Wordmark alone on the left; links and the CTA sit opposite. */}
              <Link
                href="/"
                className="shrink-0 text-2xl text-white md:text-xl"
              >
                <Wordmark
                  onDark
                  alt="Clickworks home"
                  priority
                  sizes="(max-width: 768px) 140px, 130px"
                />
              </Link>

            <div className="hidden min-w-0 items-center gap-7 md:flex">
              <ul className="flex items-center gap-7">
                {NAV_LINKS.map((link) => (
                  /*
                    Each item is the full height of the bar so that its
                    dropdown starts flush against the bar's bottom edge. With
                    no gap between trigger and panel the pointer never leaves
                    the item on the way down, so the menu cannot flicker shut
                    mid-travel.

                    Focus opens it too: onFocus/onBlur here are React's
                    focusin/focusout, so they fire for anything inside the
                    item, including the panel's own links. That is what lets
                    the menu be reached by keyboard without a second control
                    beside the link.
                  */
                  <li
                    key={link.label}
                    className="relative flex h-16 items-center"
                    onMouseEnter={
                      link.menu ? () => setMenu(link.label) : undefined
                    }
                    onMouseLeave={link.menu ? () => setMenu(null) : undefined}
                    onFocus={link.menu ? () => setMenu(link.label) : undefined}
                    onBlur={
                      link.menu
                        ? (event) => {
                            if (
                              !event.currentTarget.contains(
                                event.relatedTarget as Node | null,
                              )
                            ) {
                              setMenu(null);
                            }
                          }
                        : undefined
                    }
                    onKeyDown={
                      link.menu
                        ? (event) => {
                            if (event.key === "Escape") setMenu(null);
                          }
                        : undefined
                    }
                  >
                    <Link
                      href={link.href}
                      aria-current={
                        pathname === link.href ? "page" : undefined
                      }
                      className={clsx(
                        "flex items-center gap-1.5 whitespace-nowrap text-sm font-medium transition-colors",
                        pathname === link.href
                          ? "text-white underline decoration-white/40 underline-offset-8"
                          : "text-white hover:text-white/70",
                      )}
                    >
                      {link.label}
                      {link.menu && (
                        <ChevronDown
                          aria-hidden="true"
                          className={clsx(
                            "size-3.5",
                            "transition-transform duration-200 ease-(--ease-out-soft)",
                            "motion-reduce:transition-none",
                            menu === link.label && "rotate-180",
                          )}
                        />
                      )}
                    </Link>

                    {link.menu && (
                      <NavDropdown
                        items={link.menu}
                        open={menu === link.label}
                        allHref={link.href}
                        allLabel={link.menuAll ?? `See all ${link.label}`}
                        onNavigate={() => setMenu(null)}
                      />
                    )}
                  </li>
                ))}
              </ul>

              <a
                href={ENQUIRY_HREF}
                className="inline-flex shrink-0 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-accent-strong"
              >
                Get Started
              </a>
            </div>

            {/*
              While the sheet is open the phone bar swaps to the close control
              on the left, where the wordmark was, and the CTA on the right.
            */}
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className={clsx(
                "inline-flex size-10 items-center justify-center rounded-full md:hidden",
                "absolute right-0 text-white transition-colors hover:bg-white/10",
              )}
            >
              {open ? <X className="size-6" /> : <Menu className="size-5" />}
            </button>

          </nav>
        </div>
      </header>

      {/*
        The sheet sits out of flow so it can fade rather than snap: a `hidden`
        toggle cannot transition. Visibility is in the transition list so it
        flips only once the fade has finished, keeping the links out of the
        tab order while closed.
      */}
      <div
        id="mobile-nav"
        aria-hidden={!open}
        className={clsx(
          "fixed inset-0 z-40 overflow-y-auto md:hidden",
          "bg-black/75 backdrop-blur-2xl",
          "transition-[opacity,translate,visibility] duration-[400ms] ease-(--ease-out-soft)",
          "motion-reduce:transition-none",
          // The panel travels its own full height rather than nudging, so it
          // reads as dropping down from behind the bar and retracting back up
          // into it. Opacity stays at full through the slide: fading it out
          // would hide the very movement that carries the gesture.
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible pointer-events-none -translate-y-full opacity-0",
        )}
      >
        <Container className="pb-12 pt-[4.5rem]">
          <a
            href={ENQUIRY_HREF}
            onClick={() => setOpen(false)}
            tabIndex={open ? undefined : -1}
            style={{ transitionDelay: open ? "200ms" : "0ms" }}
            className={clsx(
              "mb-6 flex w-full items-center justify-center rounded-full bg-white",
              "px-5 py-3.5 text-base font-semibold text-ink shadow-soft",
              "transition-[opacity,translate,background-color] duration-300 ease-(--ease-out-soft)",
              "motion-reduce:transition-none hover:bg-white/90",
              open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
            )}
          >
            Get Started
          </a>

          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li
                key={link.label}
                style={{
                  transitionDelay: open ? `${200 + ++order * 45}ms` : "0ms",
                }}
                className={clsx(
                  "transition-[opacity,translate] duration-300 ease-(--ease-out-soft)",
                  "motion-reduce:transition-none",
                  open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                )}
              >
                {link.menu ? (
                  /*
                    No hover on a touch screen, so the phone version is a
                    disclosure instead: tapping the row opens the list with
                    every description already showing.
                  */
                  <>
                    <button
                      type="button"
                      tabIndex={open ? undefined : -1}
                      aria-expanded={expanded === link.label}
                      aria-controls={`nav-section-${link.href.slice(1)}`}
                      onClick={() =>
                        setExpanded((value) =>
                          value === link.label ? null : link.label,
                        )
                      }
                      className={clsx(
                        "flex w-full items-center justify-between rounded-xl px-2 py-4",
                        "text-2xl font-medium text-white transition-colors hover:bg-white/10",
                      )}
                    >
                      {link.label}
                      <ChevronDown
                        aria-hidden="true"
                        className={clsx(
                          "size-5 shrink-0",
                          "transition-transform duration-200 ease-(--ease-out-soft)",
                          "motion-reduce:transition-none",
                          expanded === link.label && "rotate-180",
                        )}
                      />
                    </button>

                    {expanded === link.label && (
                      <ul
                        id={`nav-section-${link.href.slice(1)}`}
                        className="mb-3 flex flex-col border-l border-white/15 pl-4"
                      >
                        {link.menu.map((item) => (
                          <li key={item.label}>
                            <Link
                              href={item.href}
                              onClick={() => setOpen(false)}
                              tabIndex={open ? undefined : -1}
                              className="flex items-start gap-4 px-2 py-3 transition-colors hover:bg-white/10"
                            >
                              <span className="min-w-0">
                                <span className="block text-base font-medium text-white">
                                  {item.label}
                                </span>
                                <span className="mt-1 block text-sm leading-snug text-white/60">
                                  {item.description}
                                </span>
                              </span>
                              <ArrowRight
                                aria-hidden="true"
                                className="mt-1 size-4 shrink-0 text-white/50"
                              />
                            </Link>
                          </li>
                        ))}

                        <li>
                          <Link
                            href={link.href}
                            onClick={() => setOpen(false)}
                            tabIndex={open ? undefined : -1}
                            aria-current={
                              pathname === link.href ? "page" : undefined
                            }
                            className="inline-flex items-center gap-2 px-2 py-3 text-base font-medium text-white underline decoration-white/30 underline-offset-8"
                          >
                            {link.menuAll ?? `See all ${link.label}`}
                            <ArrowRight aria-hidden="true" className="size-4" />
                          </Link>
                        </li>
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    tabIndex={open ? undefined : -1}
                    aria-current={pathname === link.href ? "page" : undefined}
                    className={clsx(
                      "block rounded-xl px-2 py-4 text-2xl font-medium text-white",
                      "transition-colors hover:bg-white/10",
                      pathname === link.href &&
                        "underline decoration-white/40 underline-offset-8",
                    )}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </>
  );
}
