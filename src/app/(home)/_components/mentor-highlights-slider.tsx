"use client";

import { useEffect, useMemo, useState } from "react";

type HighlightSlide = {
  id: string;
  title: string;
  description: string;
};

const HIGHLIGHTS: HighlightSlide[] = [
  {
    id: "cat-experience",
    title: "CAT experience",
    description:
      "Trainers understand the exam beyond theory and can teach strategy, pressure handling, and section balance.",
  },
  {
    id: "wat-gdpi-experience",
    title: "WAT & GDPI experience",
    description:
      "Trainers know how the journey changes after CAT, when communication, clarity, profile, and current affairs matter.",
  },
  {
    id: "path-clarity",
    title: "Path clarity",
    description:
      "Students learn from people who have already navigated the same admissions path.",
  },
];

function wrap(index: number, length: number) {
  return ((index % length) + length) % length;
}

export function MentorHighlightsSlider({ intervalMs = 2600 }: { intervalMs?: number }) {
  const [activeIndex, setActiveIndex] = useState(1);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => wrap(current + 1, HIGHLIGHTS.length));
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [intervalMs]);

  const positionedSlides = useMemo(
    () =>
      HIGHLIGHTS.map((slide, index) => {
        let normalized = index - activeIndex;
        if (normalized > HIGHLIGHTS.length / 2) {
          normalized -= HIGHLIGHTS.length;
        }
        if (normalized < -HIGHLIGHTS.length / 2) {
          normalized += HIGHLIGHTS.length;
        }
        return { slide, normalized };
      }),
    [activeIndex],
  );

  return (
    <div className="mt-22 relative mb-14">
      <div className="px-4 py-10 md:px-10 md:py-12">
        <div className="relative mx-auto max-w-7xl">
          <div className="md:hidden">
            <article className="pixel-card-light p-7">
              <h3 className="font-pixel font-semibold text-2xl leading-tight text-[#050505]">
                {HIGHLIGHTS[activeIndex].title}
              </h3>
              <p className="mt-5 font-body text-xl leading-snug text-[#5a5d66]">
                {HIGHLIGHTS[activeIndex].description}
              </p>
            </article>
          </div>

          <div className="relative hidden md:block h-80 lg:h-84">
            {positionedSlides.map(({ slide, normalized }) => {
              const isActive = normalized === 0;
              const distance = Math.abs(normalized);
              const translateX = normalized * 455;

              const scale =
                normalized === 0
                  ? 1
                  : distance === 1
                    ? 0.85
                    : 0.7;

              const opacity =
                normalized === 0
                  ? 1
                  : distance === 1
                    ? 0.45
                    : 0;

              const zIndex = isActive ? 20 : 10;

              return (
                <div
                  key={slide.id}
                  className={`absolute left-1/2 top-1/2 w-[46%] lg:w-[37%] p-8 lg:p-10 transition-all duration-700 ease-out ${isActive ? "pixel-card-light text-[#030213]" : "bg-black text-accent"}`}
                  style={{
                    transform: `translate(-50%, -50%) translateX(${translateX}px) scale(${scale})`,
                    opacity,
                    zIndex,
                  }}
                  aria-hidden={!isActive}
                >
                  <h3
                    className={`font-pixel font-semibold text-2xl leading-tight ${isActive ? "text-[#030213]" : "text-accent"}`}
                  >
                    {slide.title}
                  </h3>
                  <p
                    className={`mt-5 font-body text-xl leading-snug ${isActive ? "text-[#5a5d66]" : "text-accent"}`}
                  >
                    {slide.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
