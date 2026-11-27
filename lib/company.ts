/**
 * Business identity and external profiles.
 *
 * FILL THESE IN. Everything here is rendered verbatim on a public page, and
 * several fields are legally operative (a company number and registered
 * office are statutory disclosures in the UK; the contact address is how data
 * subjects exercise GDPR/CCPA rights). Nothing is invented here — each field
 * is empty until someone supplies the real value, and every component treats
 * an empty value as "omit this", so an unfilled field is left off the page
 * rather than shipped as a placeholder that reads as fact.
 */
export const COMPANY = {
  /** Registered legal name, as it appears on the register. */
  legalName: "CLICKWORKS LTD",
  /** Companies House (or equivalent) registration number. */
  registrationNumber: "17597304",
  /** Registered office, one line. */
  registeredAddress: "",
  /** VAT number, if registered. */
  vatNumber: "",
  /** General enquiries. Also the address for privacy requests below. */
  contactEmail: "info@getclickworks.com",
  /** Where GDPR/CCPA requests should go, if different from contactEmail. */
  privacyEmail: "",
  /**
   * The public register entry. Shown as a link on the company number, so the
   * disclosure can be checked rather than just asserted.
   */
  companiesHouseUrl:
    "https://find-and-update.company-information.service.gov.uk/company/17597304",
} as const;

/** Trading name, shown in the UI. Safe to display before the rest is filled. */
export const TRADING_NAME = "Clickworks";

/**
 * Social profiles. Leave an href empty and that icon is not rendered — a
 * missing link is better than one that goes nowhere.
 */
export const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/getclickworks",
  },
  { label: "TikTok", href: "https://www.tiktok.com/@getclickworks" },
  { label: "X", href: "https://x.com/getclickworks" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/getclickworks",
  },
  // No YouTube channel yet. Add an entry here when there is one and the icon
  // appears; SOCIAL_ICONS in Footer.tsx already maps the label.
] as const;

export const SOCIAL_HANDLE = "@getclickworks";

/**
 * Flip to true only once something is actually set that needs consent —
 * analytics, embedded media that sets cookies, a pixel. While it is false the
 * site sets no cookies and stores nothing, so the consent banner stays out of
 * the way: showing a cookie notice on a site that sets no cookies is itself a
 * misleading statement.
 */
export const TRACKING_ENABLED = false;

/**
 * True once any field that must be shown publicly has been supplied.
 *
 * NOTE: the footer no longer renders this block — it was removed on request.
 * These values are still here and still correct. Before launch the block
 * needs restoring: the Companies (Trading Disclosures) Regulations 2015
 * require a limited company's website to show its registered name, company
 * number, place of registration and registered office address.
 */
export const HAS_LEGAL_DETAILS = Boolean(
  COMPANY.legalName ||
    COMPANY.registrationNumber ||
    COMPANY.registeredAddress ||
    COMPANY.contactEmail,
);

/** Where privacy requests go, falling back to the general address. */
export const PRIVACY_CONTACT = COMPANY.privacyEmail || COMPANY.contactEmail;

/**
 * Where the enquiry form posts: our own route, which emails the submission to
 * COMPANY.contactEmail through Resend. See app/api/enquiry/route.ts for the
 * environment variables it needs.
 *
 * This collects personal data, so the privacy policy covers it — "What we
 * collect" and "How long we keep it". Change one and change the other.
 */
export const FORM_ENDPOINT = "/api/enquiry";

/** Review date shown on the policy pages. */
export const POLICY_UPDATED = "2 November 2026";
