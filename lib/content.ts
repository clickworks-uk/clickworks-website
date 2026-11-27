/**
 * Copy and listings shared across the inner pages. Everything here is content
 * rather than layout, so the pages stay about structure and this is the one
 * file to edit when the real material lands.
 */

export type Project = {
  client: string;
  /**
   * What the work was — "Website", "Branding", "Social Media". Optional
   * because the client names landed before the detail did; the card leaves
   * the line out rather than guessing at it.
   */
  discipline?: string;
  /** One line on what was built and what it was for. Optional, as above. */
  summary?: string;
  /** Cover photo. Drop the file in /public and reference it here. */
  photo?: string;
};

/*
  Real clients. Each needs a discipline and a one-line summary before the
  cards read as finished — the card renders the name alone until they are
  filled in, which is deliberate: an invented summary on a real client's
  name is worse than a sparse card.
*/
export const PROJECTS: Project[] = [
  { client: "URprint" },
  { client: "Jatt Life" },
  { client: "Affitto Properties" },
  { client: "BBC Asian Network" },
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
    label: "Cyber Security",
    slug: "cyber-security",
    description:
      "Finding the holes in your systems before somebody else does.",
    image: "/services/cyber-security.png",
  },
  {
    label: "Software Development",
    slug: "software-development",
    description:
      "Internal tools, integrations and systems built to fit how you work.",
    image: "/services/software-development.png",
  },
];
