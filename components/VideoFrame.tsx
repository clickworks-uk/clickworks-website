import { clsx } from "@/lib/clsx";

/**
 * Square-cornered 16:9 frame sized for an embedded video rather than the full
 * page width. Used on the home page and on About so the two match.
 *
 * Drop a file in `public/` and pass its path as `src` to fill the frame;
 * without one it stays an empty slot.
 */
export function VideoFrame({
  src,
  poster,
  className,
}: {
  /** e.g. "/video/founder.mp4". */
  src?: string;
  /** Still frame shown before playback. */
  poster?: string;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "relative mx-auto aspect-video w-full max-w-3xl overflow-hidden bg-paper-soft ring-1 ring-line",
        className,
      )}
      // Empty, the frame is decoration; with a video it holds a real control.
      aria-hidden={src ? undefined : "true"}
    >
      {src ? (
        <video
          className="absolute inset-0 size-full object-cover"
          src={src}
          poster={poster}
          controls
          playsInline
          preload="metadata"
        />
      ) : null}
    </div>
  );
}
