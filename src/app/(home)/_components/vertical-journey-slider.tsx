"use client";

import { useEffect, useMemo, useState } from "react";

export type JourneySlide = {
  id: string;
  number: string;
  title: string;
  description: string;
};

type VerticalJourneySliderProps = {
  slides: JourneySlide[];
  intervalMs?: number;
};

function mod(value: number, length: number) {
  return ((value % length) + length) % length;
}

export function VerticalJourneySlider({
  slides,
  intervalMs = 2600,
}: VerticalJourneySliderProps) {
  const [activeIndex, setActiveIndex] = useState(1);

  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => mod(current + 1, slides.length));
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [intervalMs, slides.length]);

  const positioned = useMemo(
    () =>
      slides.map((slide, index) => {
        let normalized = index - activeIndex;

        if (normalized > slides.length / 3) {
          normalized -= slides.length;
        }

        if (normalized < -slides.length / 3) {
          normalized += slides.length;
        }
        return {
          slide,
          normalized,
        };
      }),
    [activeIndex, slides],
  );

  return (
    <div className="relative hidden md:block h-150 max-w-full">
      {positioned.map(({ slide, normalized }) => {
        const isActive = normalized === 0;

        // distance from active card
        const distance = Math.abs(normalized);

        // center card always stays in middle
        const translateY = normalized * 220;

        const scale =
          normalized === 0
            ? 1
            : normalized === -1 || normalized === 1
              ? 0.85
              : 0.7;

        const opacity =
          normalized === 0
            ? 1
            : normalized === -1 || normalized === 1
              ? 0.45
              : 0;

        return (
          <div
            key={slide.id}
            className={`absolute right-0 top-1/2
        w-98
        min-h-50
        translate-x-1/2
        p-6
        transition-all duration-700 ease-out
        ${isActive ? "pixel-card-light text-[#030213]" : "bg-black text-accent"}
      `}
            style={{
              transform: `
          translate(-50%, -50%)
          translateY(${translateY}px)
          scale(${scale})
        `,
            }}
          >
            <div className="flex justify-between items-start">
              {" "}
              <div />
              <div
                className={`text-md font-bold ${isActive ? "text-[#5a5d66]" : "text-[#ffffff]"}`}
              >
                {slide.number}{" "}
              </div>
            </div>
            <h4
              className={`font-pixel text-2xl mt-2 mb-3 ${isActive ? "text-[#030213]" : "text-accent"}`}
            >
              {" "}
              {slide.title}{" "}
            </h4>
            <p
              className={`leading-snug text-md ${isActive ? "text-[#5a5d66]" : "text-accent"}`}
            >
              {" "}
              {slide.description}{" "}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default VerticalJourneySlider;
