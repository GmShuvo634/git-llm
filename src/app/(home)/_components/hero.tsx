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
    autoplay: false,
    arrows: true,
  };

  return (
    <div className="relative bg-[#050505] text-[#f4f4f6]">
      <h1 className="sr-only">
        Get Into IIMs CAT coaching, mock tests, and GDPI preparation
      </h1>
      <Slider ref={sliderRef} {...settings}>
        <div>
          <SlideShell>
            <div className="max-w-4xl w-full text-center px-10 md:px-14">
              <h2 className="font-heading text-xl md:text-3xl lg:text-4xl mb-8 silver-text leading-relaxed">
                Get Into IIMs with IIM-Graduate Mentors
              </h2>
              <p className="font-body text-xl md:text-3xl mb-12 text-[#d8d9de]">
                Learn from People who have cleared the exact path. Classes by
                IIM Graduates only
              </p>
              <Link
                className="pixel-btn pixel-btn-primary text-[11px] md:text-sm px-8 md:px-10"
                href="/courses?intent=signup"
              >
                Start with 3 Free Mocks
              </Link>
            </div>
          </SlideShell>
        </div>

        <div>
          <SlideShell>
            <div className="max-w-4xl w-full text-center px-10 md:px-14">
              <h2 className="font-heading text-xl md:text-3xl lg:text-4xl mb-8 silver-text leading-relaxed">
                Mock test Series
              </h2>
              <p className="font-body text-xl md:text-3xl mb-12 text-[#d8d9de]">
                Diagnose your IIM Readiness in 3 mocks and practice with 100
                Mocks
              </p>
              <Link
                className="pixel-btn pixel-btn-primary text-[11px] md:text-sm"
                href="/courses?intent=signup"
              >
                Start with 3 Free Mocks
              </Link>
            </div>
          </SlideShell>
        </div>

        <div>
          <SlideShell>
            <div className="max-w-4xl w-full text-center px-10 md:px-14">
              <h2 className="font-heading text-xl md:text-3xl lg:text-4xl mb-8 silver-text leading-relaxed">
                CAT 2026 or 2027 in your mind?
              </h2>
              <p className="font-body text-xl md:text-3xl mb-12 text-[#d8d9de]">
                Structured CAT coaching, GDPI preparation, and a serious peer
                community for aspirants aiming at India&apos;s top B-schools.
              </p>
              <Link className="pixel-btn text-[11px] md:text-sm" href="/courses?intent=signup">
                Explore Courses
              </Link>
            </div>
          </SlideShell>
        </div>

        <div>
          <SlideShell>
            <div className="max-w-4xl w-full text-center px-10 md:px-14">
              <h2 className="font-heading text-xl md:text-3xl lg:text-4xl mb-8 silver-text leading-relaxed">
                CAT Shortlist is not the finish line. WAT &amp; GDPI Gets You
                Into IIMs.
              </h2>
              <p className="font-body text-xl md:text-3xl mb-12 text-[#d8d9de]">
                GII helps serious aspirants crack both - with IIM-graduate
                trainers, structured courses, mocks, WAT Practice and interview
                preparation.
              </p>
              <Link className="pixel-btn text-[11px] md:text-sm" href="/gdpi-prep">
                WAT &amp; GDPI Preparation
              </Link>
            </div>
          </SlideShell>
        </div>
      </Slider>

      <button
        onClick={() => sliderRef.current?.slickPrev()}
        aria-label="Show previous hero slide"
        className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 bg-[#0a0a1a] border-2 border-[#b9bbc2] p-2 md:p-3 hover:bg-[#1a1a2a] transition-colors z-10 cursor-pointer"
      >
        <ChevronLeftIcon className="w-4 h-4 md:w-6 md:h-6 text-[#d8d9de]" />
      </button>
      <button
        onClick={() => sliderRef.current?.slickNext()}
        aria-label="Show next hero slide"
        className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 bg-[#0a0a1a] border-2 border-[#b9bbc2] p-2 md:p-3 hover:bg-[#1a1a2a] transition-colors z-10 cursor-pointer"
      >
        <ChevronRightIcon className="w-4 h-4 md:w-6 md:h-6 text-[#d8d9de]" />
      </button>
      <div className="pixel-divider" />
    </div>
  );
};
