"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

/**
 * The site's nav and footer, except on the holding page.
 *
 * A "coming soon" page that carries a full navigation into the site it is
 * holding back defeats itself, so the chrome is suppressed there rather than
 * hidden with CSS — nothing is left in the DOM for a screen reader or a
 * crawler to follow.
 */
const BARE_ROUTES = ["/coming-soon"];

function isBare(pathname: string | null) {
  if (!pathname) return false;
  // A static export serves "/coming-soon.html", so compare without the
  // extension and without a trailing slash.
  const path = pathname.replace(/\.html$/, "").replace(/\/$/, "") || "/";
  return BARE_ROUTES.some(
    (route) => path === route || path.startsWith(`${route}/`),
  );
}

export function SiteHeader() {
  return isBare(usePathname()) ? null : <Navbar />;
}

export function SiteFooter() {
  return isBare(usePathname()) ? null : <Footer />;
}
