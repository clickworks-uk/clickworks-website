import { PROJECTS, SERVICE_SLIDES } from "@/lib/content";

/** One row in a nav dropdown: a title, a line about it, and where it goes. */
export type NavMenuItem = {
  label: string;
  description: string;
  href: string;
};

export type NavLink = {
  label: string;
  href: string;
  /** Present on the links that open a dropdown. */
  menu?: NavMenuItem[];
  /** Label for the "see everything" link at the foot of the dropdown. */
  menuAll?: string;
};

/*
  The dropdowns are derived from the same data the pages use, so a service
  added to SERVICE_SLIDES appears in the nav without a second edit. Services
  point at the enquiry form pre-filled with the service, which is where every
  other service link on the site already goes.

  Projects have no pages of their own yet, so each row points at the projects
  index. Once individual case studies exist, give Project a `slug` and build
  the href from it here.
*/
export const NAV_LINKS: NavLink[] = [
  { label: "About Us", href: "/about" },
  {
    label: "Projects",
    href: "/projects",
    menuAll: "See all projects",
    menu: PROJECTS.map((project) => ({
      label: project.client,
      description: project.summary,
      href: "/projects",
    })),
  },
  {
    label: "Services",
    href: "/services",
    menuAll: "See all services",
    menu: SERVICE_SLIDES.map((service) => ({
      label: service.label,
      description: service.description,
      href: `/enquiry?service=${service.slug}`,
    })),
  },
  { label: "Community", href: "/community" },
];
