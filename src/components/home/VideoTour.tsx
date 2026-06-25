"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { asset } from "@/lib/asset";

/** Video prohlídka — poster + tlačítko přehrát. Video se stáhne až na kliknutí (preload none). */
export function VideoTour({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function play() {
    setPlaying(true);
    ref.current?.play();
  }

  return (
    <div className="relative overflow-hidden border border-line bg-ink">
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={ref}
        src={asset(src)}
        poster={asset(poster)}
        controls={playing}
        playsInline
        preload="none"
        className="aspect-video w-full object-cover"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      {!playing && (
        <button
          onClick={play}
          aria-label="Přehrát video prohlídku"
          className="group absolute inset-0 flex items-center justify-center"
        >
          <span className="media-scrim-full absolute inset-0" />
          <span className="relative flex h-20 w-20 items-center justify-center rounded-full border border-paper/50 bg-ink/40 text-paper backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
            <Play size={28} className="ml-1" fill="currentColor" strokeWidth={1} />
          </span>
          <span className="absolute bottom-5 left-6 mono text-xs uppercase tracking-[0.18em] text-paper/80">
            Přehrát video prohlídku
          </span>
        </button>
      )}
    </div>
  );
}
