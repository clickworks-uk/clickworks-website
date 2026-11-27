import { SERVICE_SLIDES } from "@/lib/content";

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
  The Services dropdown is derived from the same data the pages use, so a
  service added to SERVICE_SLIDES appears in the nav without a second edit.
  Each row points at the enquiry form pre-filled with that service, which is
  where every other service link on the site already goes.

  Projects is a plain link. It had a dropdown listing each project, removed
  on request. If it comes back once there are real case studies, build it the
  same way from PROJECTS — and by then each project should have a slug and a
  page of its own to point at, rather than every row going to the index.
*/
export const NAV_LINKS: NavLink[] = [
  { label: "About Us", href: "/about" },
  { label: "Projects", href: "/projects" },
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
