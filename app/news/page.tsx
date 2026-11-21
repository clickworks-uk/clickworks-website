import type { Metadata } from "next";
import { Carousel } from "@/components/Carousel";
import { PageIntro, PhotoSlot } from "@/components/PageIntro";
import { NEWS, type NewsPost } from "@/lib/content";

export const metadata: Metadata = {
  title: "News — Clickworks",
  description: "What the Clickworks team has been up to.",
};

export default function NewsPage() {
  return (
    <>
      <PageIntro
        title="News"
        lede="What the team has been working on, and where we have been."
      />

      <Carousel label="News stories" arrows={false} className="pb-20 sm:pb-28">
        {NEWS.map((post, i) => (
          <NewsCard key={`${post.title}-${i}`} post={post} />
        ))}
      </Carousel>
    </>
  );
}

function NewsCard({ post }: { post: NewsPost }) {
  return (
    <article className="w-[clamp(260px,78vw,360px)] shrink-0 snap-start">
      <PhotoSlot className="aspect-video w-full" label="Photo" />

      <h2 className="mt-5 text-balance text-base font-semibold leading-snug tracking-tight text-ink sm:text-lg">
        {post.title}
      </h2>

      {/*
        Only a link once there is somewhere to go. Until then the label is
        plain text, rather than an anchor onto a page that does not exist.
      */}
      {post.href ? (
        <a
          href={post.href}
          className="mt-3 inline-block text-sm text-ink underline underline-offset-4 hover:text-ink-muted sm:text-base"
        >
          For more
        </a>
      ) : (
        <span className="mt-3 inline-block text-sm text-ink-muted underline underline-offset-4 sm:text-base">
          For more
        </span>
      )}
    </article>
  );
}
