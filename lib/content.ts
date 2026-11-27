/**
 * Copy and listings shared across the inner pages. Everything here is content
 * rather than layout, so the pages stay about structure and this is the one
 * file to edit when the real material lands.
 */

export type Project = {
  client: string;
  discipline: string;
  summary: string;
  /** Cover photo. Drop the file in /public and reference it here. */
  photo?: string;
};

export const PROJECTS: Project[] = [
  {
    client: "Northwind Coffee",
    discipline: "Website",
    summary: "A new ordering flow built around repeat customers.",
  },
  {
    client: "Halo Fitness",
    discipline: "Social Media",
    summary: "A class-led content engine running across three channels.",
  },
  {
    client: "Meridian Dental",
    discipline: "Branding",
    summary: "An identity that reads as care rather than clinic.",
  },
  {
    client: "Fern & Oak",
    discipline: "Website",
    summary: "A storefront rebuilt for the way the range actually sells.",
  },
  {
    client: "Studio Verve",
    discipline: "Branding",
    summary: "A studio mark and system that scales past the founder.",
  },
  {
    client: "Harbour & Co",
    discipline: "Social Media",
    summary: "A local audience grown from the harbour out.",
  },
];



export type ServiceSlide = {
  /** Caption under the artwork. */
  label: string;
  /** Used in the enquiry link, e.g. "web-development". */
  slug: string;
  /**
   * One line on what the service actually is. Shown in the Services nav
   * dropdown when the item is hovered, so keep it to a single sentence —
   * roughly ten to fourteen words reads best in that panel.
   *
   * DRAFT COPY: written to get the menu working, not signed off. Edit these
   * to say what Clickworks actually sells.
   */
  description: string;
  /**
   * Artwork for the cell. Drop the file in /public and reference it here,
   * e.g. "/services/websites.png". Until one is set the cell shows a neutral
   * slot at the right size, so the row is already laid out correctly.
   */
  image?: string;
  /**
   * What the artwork shows, for anyone who cannot see it. Leave unset for a
   * purely decorative icon: the label underneath already names the service,
   * so repeating it would just be read out twice.
   */
  alt?: string;
};

/**
 * The services rail. Add a line per service — order here is the order shown.
 */
export const SERVICE_SLIDES: ServiceSlide[] = [
  {
    label: "Web Development",
    slug: "web-development",
    description:
      "Fast, accessible sites built to convert, not just to look good.",
    image: "/services/websites.png",
  },
  {
    label: "Social Media",
    slug: "social-media",
    description:
      "Content and community management that keeps you in the feed.",
    image: "/services/social-media.png",
  },
  {
    label: "Branding",
    slug: "branding",
    description:
      "Identity, tone of voice, and the system that keeps both consistent.",
    image: "/services/branding.png",
  },
  {
    label: "Search Engine Optimisation",
    slug: "seo",
    description:
      "Technical fixes and content that earn the rankings you are missing.",
    image: "/services/seo.png",
  },
  {
    label: "Digital Marketing",
    slug: "digital-marketing",
    description:
      "Paid and organic campaigns measured on what they actually return.",
    image: "/services/digital-marketing.png",
  },
  {
    // "Optimisation" to match Search Engine Optimisation above and the rest
    // of the site's British spelling.
    label: "Generative Engine Optimisation",
    slug: "generative-engine-optimisation",
    description:
      "Getting your brand named and quoted by AI search and chat assistants.",
    image: "/services/geo.png",
  },
  {
    label: "Consultation",
    slug: "consultation",
    description:
      "A clear read on what to fix first, and what to leave alone.",
    image: "/services/consultation.png",
  },
  {
    label: "Graphic Design",
    slug: "graphic-design",
    description:
      "Artwork, assets and print that carry the brand everywhere it appears.",
    image: "/services/tag.png",
  },
  {
    label: "Software Development",
    slug: "software-development",
    description:
      "Internal tools, integrations and systems built to fit how you work.",
    image: "/services/software-development.png",
  },
];
