import Image from "next/image";
import { clsx } from "@/lib/clsx";
import { Container } from "@/components/Container";
import { TEAM } from "@/lib/content";

/**
 * A rank of portraits with the name under each and the role beneath that in
 * small tracked caps, as in the reference.
 *
 * Portraits are neutral slots at the final aspect until real photographs
 * exist — set `photo` on a member in lib/content.ts and it fills the frame.
 */
export function TeamRow() {
  return (
    <section id="team" className="scroll-mt-20 bg-paper py-16 sm:py-24">
      <Container>
        <h2 className="sr-only">Core team</h2>

        <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-4 lg:grid-cols-8 lg:gap-x-5">
          {TEAM.map((member) => (
            <li key={member.name}>
              <div className="relative aspect-3/4 w-full overflow-hidden bg-paper-soft ring-1 ring-line">
                {member.photo && (
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 23vw, 130px"
                    className="object-cover"
                  />
                )}
              </div>

              {/* An unfilled seat is set like a role rather than a name, so
                  the four real people stay the loudest thing in the row. */}
              <h3
                className={clsx(
                  "mt-3 text-sm leading-snug tracking-tight sm:text-base",
                  member.role
                    ? "font-semibold text-ink"
                    : "font-light text-ink-muted",
                )}
              >
                {member.name}
              </h3>
              {/* Same face, light weight — the contrast carries the hierarchy
                  rather than a separate tracked-caps treatment. */}
              {member.role && (
                <p className="mt-1 text-sm font-light leading-snug tracking-tight text-ink-muted sm:text-base">
                  {member.role}
                </p>
              )}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
