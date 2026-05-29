"use client";

import { useEffect, useRef, useState } from "react";

interface ProductSectionProps {
  title: string;
  buttonText: string;
  strikePrice?: string;
  details: string[];
  reverse?: boolean;
  progressData?: { current: number; total: number };
}

export const ProductSection = ({
  title,
  buttonText,
  strikePrice,
  details,
  reverse = false,
  progressData,
}: ProductSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  const seatsLeft = progressData?.current ?? 0;
  const total = progressData?.total ?? 1;
  const enrolled = total - seatsLeft;
  const blocks = 20;
  const targetBlocks = progressData
    ? Math.round((enrolled / total) * blocks)
    : 0;
  const targetPercent = progressData ? Math.round((enrolled / total) * 100) : 0;

  const [filledBlocks, setFilledBlocks] = useState(0);
  const [displayPercent, setDisplayPercent] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setInView(true)),
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || !progressData) return;

    let cleanup: (() => void) | undefined;
    const rafId = window.requestAnimationFrame(() => {
      setFilledBlocks(0);
      setDisplayPercent(0);
      const step = 80;
      let i = 0;
      const blockTimer = setInterval(() => {
        i += 1;
        setFilledBlocks(i);
        if (i >= targetBlocks) clearInterval(blockTimer);
      }, step);

      let p = 0;
      const pctTimer = setInterval(() => {
        p += 2;
        if (p >= targetPercent) {
          setDisplayPercent(targetPercent);
          clearInterval(pctTimer);
        } else {
          setDisplayPercent(p);
        }
      }, 30);

      cleanup = () => {
        clearInterval(blockTimer);
        clearInterval(pctTimer);
      };
    });

    return () => {
      window.cancelAnimationFrame(rafId);
      cleanup?.();
    };
  }, [inView, targetBlocks, targetPercent, progressData]);

  return (
    <div
      ref={ref}
      className={`py-20 px-6 md:px-12 lg:px-24 pixel-grid-light border-b-2 border-[#030213] ${inView ? "anim-fade-up" : "opacity-0"}`}
    >
      <div
        className={`max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center relative z-2 ${
          reverse ? "lg:grid-flow-dense" : ""
        }`}
      >
        <div className={`${reverse ? "lg:col-start-2" : ""}`}>
          <h2 className="font-pixel text-lg md:text-2xl lg:text-3xl mb-10 silver-text-dark leading-relaxed">
            {title.toUpperCase()}
          </h2>

          {strikePrice && (
            <div className="mb-3">
              <span className="font-pixel-readable text-[#8a8d96] line-through text-2xl">
                {strikePrice}
              </span>
            </div>
          )}
          <button className="pixel-btn text-sm">{buttonText}</button>

          {progressData && (
            <div className="mt-8 max-w-md">
              <div
                className="flex gap-0.75 p-2 border-2 border-[#030213] bg-[#ffffff]"
                style={{
                  boxShadow:
                    "inset 2px 2px 0 0 #b9bbc2, inset -2px -2px 0 0 #ffffff",
                }}
              >
                {Array.from({ length: blocks }).map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-6 ${i < filledBlocks ? "pixel-block-filled anim-block-flip" : "pixel-block-empty"}`}
                    style={{ animationDelay: `${i * 60}ms` }}
                  />
                ))}
              </div>
              <p className="font-pixel-readable text-xl mt-3 text-[#030213]">
                &gt;{" "}
                <span className="font-pixel text-[10px]">
                  {displayPercent}
                </span>{" "}
                enrolled · {seatsLeft}/{total} seats left at this price
              </p>
            </div>
          )}
        </div>

        <div className={`${reverse ? "lg:col-start-1 lg:row-start-1" : ""}`}>
          <div className="pixel-card-light p-8">
            <ul className="space-y-5">
              {details.map((detail, index) => (
                <li
                  key={index}
                  className={`flex items-start gap-4 ${inView ? "anim-fade-up" : "opacity-0"}`}
                  style={{ animationDelay: `${200 + index * 100}ms` }}
                >
                  <span
                    className="w-3 h-3 mt-2 shrink-0"
                    style={{
                      background:
                        "linear-gradient(180deg, #030213 0%, #5a5d66 100%)",
                      boxShadow:
                        "inset -1px -1px 0 0 #000, inset 1px 1px 0 0 #b9bbc2",
                    }}
                  />
                  <span className="font-pixel-readable text-xl text-[#030213] leading-snug">
                    {detail}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
