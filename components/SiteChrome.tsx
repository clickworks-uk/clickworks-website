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
  return BARE_ROUTES.some(
    (route) => pathname === route || pathname?.startsWith(`${route}/`),
  );
}

export function SiteHeader() {
  return isBare(usePathname()) ? null : <Navbar />;
}

export function SiteFooter() {
  return isBare(usePathname()) ? null : <Footer />;
}
