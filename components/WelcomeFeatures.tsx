import { Container } from "@/components/Container";
import { Wordmark } from "@/components/Wordmark";

/**
 * Three-up feature row: a panel holding a stylised composition, then a title
 * and a line of copy beneath it.
 *
 * The compositions are abstract on purpose — bars and shapes rather than
 * mocked-up screens with readable copy. A convincing fake interface would
 * imply a product you can use today, which is exactly the claim the rest of
 * the site was cleared of.
 */
const FEATURES = [
  {
    title: "Marketing that moves you forward",
    body: "From social media management and SEO to digital campaigns, we help businesses reach more people, build their presence and turn attention into customers.",
    art: <InsightArt />,
  },
  {
    title: "Your whole digital presence",
    body: "Websites, branding and graphic design, all working together. We create a consistent online presence that reflects your business and gives people a reason to choose you.",
    art: <ExecutionArt />,
  },
  {
    title: "A better way to work together",
    body: "No unnecessary layers or complicated processes. Work directly with us, share your ideas and we’ll work alongside you to bring them to life.",
    art: <PeopleArt />,
  },
];

export function WelcomeFeatures() {
  return (
    <section id="about" className="scroll-mt-20 py-16 sm:py-24">
      <Container>
        <h2 className="flex flex-wrap items-center gap-x-2.5 text-2xl font-normal tracking-tight text-ink sm:text-3xl lg:text-4xl">
          Welcome to <Wordmark className="h-[0.85em]" />
        </h2>

        <ul className="mt-10 grid gap-x-8 gap-y-12 sm:mt-14 sm:grid-cols-3">
          {FEATURES.map((feature) => (
            <li key={feature.title}>
              <div
                aria-hidden="true"
                className="relative aspect-4/3 overflow-hidden rounded-2xl bg-paper-soft ring-1 ring-line"
              >
                {feature.art}
              </div>

              <h3 className="mt-5 text-lg font-normal tracking-tight text-ink sm:text-xl">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted sm:text-base">
                {feature.body}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/** Row of bars standing in for a line of text. */
function Bars({ widths }: { widths: string[] }) {
  return (
    <div className="space-y-1.5">
      {widths.map((w, i) => (
        <span
          key={i}
          className="block h-1.5 rounded-full bg-white/35"
          style={{ width: w }}
        />
      ))}
    </div>
  );
}

function InsightArt() {
  return (
    <>
      <div className="absolute left-[10%] top-[12%] w-[62%] rounded-xl bg-linear-to-br from-[#6d2544] to-[#2a1030] p-3 shadow-soft-lg">
        <Bars widths={["88%", "64%"]} />
        <span className="mt-3 block h-3 w-14 rounded-full bg-white/20" />
      </div>

      <div className="absolute bottom-[10%] right-[8%] w-[62%] rounded-xl bg-linear-to-br from-[#1c2f7a] to-[#0a1130] p-3 shadow-soft-lg">
        <span className="block h-1.5 w-10 rounded-full bg-white/50" />
        <div className="mt-2.5 space-y-2">
          {["92%", "78%", "85%"].map((w, i) => (
            <div key={i} className="flex items-start gap-1.5">
              <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-white/60" />
              <span
                className="block h-1.5 rounded-full bg-white/30"
                style={{ width: w }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function ExecutionArt() {
  return (
    <>
      <div className="absolute left-[12%] top-[10%] w-[58%] rounded-xl bg-linear-to-br from-[#28323c] to-[#0e1419] p-3 shadow-soft-lg">
        <span className="block h-1.5 w-12 rounded-full bg-white/50" />
        <div className="mt-2.5">
          <Bars widths={["80%", "56%"]} />
        </div>
      </div>

      <div className="absolute bottom-[8%] right-[7%] w-[64%] rounded-xl bg-linear-to-br from-[#7a3a1c] to-[#2a1208] p-3 shadow-soft-lg">
        <span className="block h-1.5 w-9 rounded-full bg-white/50" />
        <div className="mt-2.5 space-y-2">
          {["86%", "70%"].map((w, i) => (
            <div key={i} className="flex items-center justify-between gap-2">
              <span
                className="block h-1.5 rounded-full bg-white/30"
                style={{ width: w }}
              />
              <span className="size-1.5 shrink-0 rotate-45 border-r border-t border-white/40" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function PeopleArt() {
  return (
    <div className="absolute inset-x-[10%] top-1/2 -translate-y-1/2 space-y-2">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="flex items-center gap-2.5 rounded-xl bg-linear-to-r from-[#2a3550] to-[#121a2c] p-2.5 shadow-soft"
        >
          <span className="size-6 shrink-0 rounded-full bg-white/25" />
          <div className="min-w-0 flex-1 space-y-1.5">
            <span
              className="block h-1.5 rounded-full bg-white/45"
              style={{ width: ["62%", "54%", "68%"][i] }}
            />
            <span
              className="block h-1.5 rounded-full bg-white/20"
              style={{ width: ["38%", "44%", "33%"][i] }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
