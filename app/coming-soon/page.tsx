import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Wordmark } from "@/components/Wordmark";
import { TikTokIcon, XIcon } from "@/components/BrandIcons";
import { Instagram, Linkedin, Youtube } from "lucide-react";
import { COMPANY, SOCIALS, SOCIAL_HANDLE, TRADING_NAME } from "@/lib/company";

export const metadata: Metadata = {
  title: "Coming soon — Clickworks",
  description: "Clickworks is on its way.",
};

const SOCIAL_ICONS = {
  Instagram,
  TikTok: TikTokIcon,
  X: XIcon,
  LinkedIn: Linkedin,
  YouTube: Youtube,
} as const;

export default function ComingSoonPage() {
  const profiles = SOCIALS.filter((s) => s.href);

  return (
    // The same aurora the home page opens on, so the holding page is
    // recognisably the site rather than a stock placeholder.
    <div className="hero-sky">
      <Container className="flex min-h-svh flex-col items-center justify-center py-20 text-center">
        <h1 className="flex justify-center text-5xl sm:text-7xl lg:text-8xl">
          <Wordmark onDark priority alt="Clickworks" sizes="(max-width: 640px) 70vw, 560px" />
        </h1>

        <p className="mt-10 text-2xl font-light tracking-tight text-white sm:mt-12 sm:text-3xl">
          Coming soon
        </p>

        <p className="mt-4 max-w-[46ch] text-balance text-base font-light leading-relaxed text-white/70 sm:text-lg">
          We are putting the finishing touches to the new site. In the
          meantime, you can find us on social.
        </p>

        {COMPANY.contactEmail && (
          <a
            href={`mailto:${COMPANY.contactEmail}`}
            className="mt-8 inline-block text-base text-white underline underline-offset-4 transition-colors hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {COMPANY.contactEmail}
          </a>
        )}

        {profiles.length > 0 && (
          <div className="mt-10 flex items-center gap-6 sm:mt-12">
            <span className="text-sm font-light text-white/60">
              {SOCIAL_HANDLE}
            </span>
            {profiles.map(({ label, href }) => {
              const Icon = SOCIAL_ICONS[label as keyof typeof SOCIAL_ICONS];
              return (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${TRADING_NAME} on ${label} (opens in a new tab)`}
                  className="text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <Icon className="size-5" />
                </a>
              );
            })}
          </div>
        )}
      </Container>
    </div>
  );
}
