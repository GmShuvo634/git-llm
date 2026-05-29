"use client";

import { useRef } from "react";
import Slider from "react-slick";
import { SlideShell } from "@/app/(home)/_components/slide-shell";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Hero = () => {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 400,
    cssEase: "steps(8, end)",
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  return (
    <div className="relative bg-[#030213] text-[#f4f4f6]">
      <Slider ref={sliderRef} {...settings}>
        {/* Slide 1 */}
        <div>
          <SlideShell>
            <div className="max-w-6xl w-full text-center">
              <h1 className="font-pixel text-2xl md:text-4xl lg:text-5xl mb-6 silver-text leading-relaxed">
                GET INTO IIMs
              </h1>
              <p className="font-pixel-readable text-2xl md:text-3xl mb-12 text-[#d8d9de]">
                &gt; Classes by IIM Graduates only_
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                <div className="flex flex-col items-center gap-3">
                  <Link className="pixel-btn w-full" href="/mock-tests">
                    Mock Test Series
                  </Link>
                  <span className="font-pixel-readable text-lg text-[#b9bbc2]">
                    3 mocks free
                  </span>
                </div>
                <Link className="pixel-btn" href="/short-term">
                  Short Term
                </Link>
                <Link className="pixel-btn" href="/long-term">
                  Long Term
                </Link>
                <Link className="pixel-btn" href="/gdpi-prep">
                  GDPI Prep
                </Link>
              </div>
            </div>
          </SlideShell>
        </div>

        {/* Slide 2 */}
        <div>
          <SlideShell>
            <div className="max-w-4xl w-full text-center">
              <h1 className="font-pixel text-xl md:text-3xl lg:text-4xl mb-8 silver-text leading-relaxed">
                ARE YOU CUT OUT FOR IIMs?
              </h1>
              <p className="font-pixel-readable text-2xl md:text-3xl mb-12 text-[#d8d9de]">
                &gt; Let&apos;s find out_
              </p>
              <Link className="pixel-btn text-base" href="/mock-tests">
                Mock Test Series (3 free)
              </Link>
            </div>
          </SlideShell>
        </div>

        {/* Slide 3 */}
        <div>
          <SlideShell>
            <div className="max-w-4xl w-full text-center">
              <h1 className="font-pixel text-xl md:text-3xl lg:text-4xl mb-8 silver-text leading-relaxed">
                CAT - 2026 IN YOUR MIND?
              </h1>
              <p className="font-pixel-readable text-2xl md:text-3xl mb-12 text-[#d8d9de]">
                &gt; Classes by IIM Graduates only_
              </p>
              <Link className="pixel-btn" href="/short-term">
                Short Term Course
              </Link>
            </div>
          </SlideShell>
        </div>

        {/* Slide 4 */}
        <div>
          <SlideShell>
            <div className="max-w-4xl w-full text-center">
              <h1 className="font-pixel text-xl md:text-3xl lg:text-4xl mb-8 silver-text leading-relaxed">
                CAT - 2027 IN YOUR MIND?
              </h1>
              <p className="font-pixel-readable text-2xl md:text-3xl mb-12 text-[#d8d9de]">
                &gt; Classes by IIM Graduates only_
              </p>
              <Link className="pixel-btn" href="/long-term">
                Long Term Course
              </Link>
            </div>
          </SlideShell>
        </div>

        {/* Slide 5 */}
        <div>
          <SlideShell>
            <div className="max-w-4xl w-full text-center">
              <h1 className="font-pixel text-lg md:text-2xl lg:text-3xl mb-8 silver-text leading-relaxed">
                CAT IS ONLY HALF THE GAME — CROSS THE FINISH LINE
              </h1>
              <p className="font-pixel-readable text-2xl md:text-3xl mb-12 text-[#d8d9de]">
                &gt; Let&apos;s give our best to &quot;Get Into IIMs&quot;_
              </p>
              <Link className="pixel-btn" href="/gdpi-prep">
                GDPI Preparation
              </Link>
            </div>
          </SlideShell>
        </div>
      </Slider>

      <button
        onClick={() => sliderRef.current?.slickPrev()}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-[#0a0a1a] border-2 border-[#b9bbc2] p-3 hover:bg-[#1a1a2a] transition-colors z-10"
      >
        <ChevronLeftIcon className="w-6 h-6 text-[#d8d9de]" />
      </button>
      <button
        onClick={() => sliderRef.current?.slickNext()}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-[#0a0a1a] border-2 border-[#b9bbc2] p-3 hover:bg-[#1a1a2a] transition-colors z-10"
      >
        <ChevronRightIcon className="w-6 h-6 text-[#d8d9de]" />
      </button>
      <div className="pixel-divider" />
    </div>
  );
};
