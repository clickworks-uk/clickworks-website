import Image from "next/image";
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

        <ul className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-4 sm:gap-x-7">
          {TEAM.map((member) => (
            <li key={member.name}>
              <div className="relative aspect-3/4 w-full overflow-hidden bg-paper-soft ring-1 ring-line">
                {member.photo && (
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 45vw, 260px"
                    className="object-cover"
                  />
                )}
              </div>

              <h3 className="mt-4 text-base font-semibold tracking-tight text-ink sm:text-lg">
                {member.name}
              </h3>
              {/* Same face, light weight — the contrast carries the hierarchy
                  rather than a separate tracked-caps treatment. */}
              <p className="mt-1 text-base font-light tracking-tight text-ink-muted sm:text-lg">
                {member.role}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
