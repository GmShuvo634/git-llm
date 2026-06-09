"use client";

import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
export default function GDPIPrepPage() {

  const features = [
    "10 mock interviews with IIM-graduate feedback",
    "10 moderated group discussions with structured feedback",
    "Interview frameworks, profile prep, HR questions, and B-school-specific preparation material",
    "Daily current-affairs journal for GD, WAT, and interview readiness"
  ];

  return (
    <main className="min-h-screen bg-[#f4f4f6] text-[#050505] pb-20">
      {/* Header Section */}
      <div className="px-6 md:px-12 lg:px-24 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading text-xl md:text-3xl lg:text-4xl silver-text-dark mb-6">
            GII WAT & GDPI Conversion Program
          </h1>
          <p className="font-body text-xl md:text-2xl mb-12 text-[#050505] leading-snug">
            The shortlist is not the finish line. CAT can get your name into the room. WAT & GDPI decides how you hold that room. GII WAT & GDPI prepares aspirants for interviews, group discussions, written ability, current affairs, and final conversion.
          </p>
          <div className="flex flex-col items-center gap-6">
            <Link href="/courses?intent=signup" className="pixel-btn pixel-btn-primary text-base px-10">
              Start with 3 Free Mocks
            </Link>
            <p className="font-heading text-sm text-[#5a5d66]">
              <ArrowRightIcon className="w-4 h-4 inline-block mr-2" /> 
              Prepare with IIM Graduates only
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-6 md:px-12 lg:px-24 mt-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-lg md:text-2xl lg:text-3xl silver-text-dark mb-10">
            Program Features
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-3 h-3 mt-2">
                  <div className="bg-[#050505] w-3 h-3">
                    <div className="bg-[#5a5d66] w-2 h-2 rounded" />
                  </div>
                </div>
                <span className="font-body text-xl text-[#050505] leading-snug">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="px-6 md:px-12 lg:px-24 py-20 bg-[#ffffff] mt-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-lg md:text-2xl lg:text-3xl silver-text-dark mb-8">
            Hold the Room with Confidence
          </h2>
          <p className="font-body text-xl md:text-2xl mb-12 text-[#050505] leading-snug">
            Get mentored by IIM Graduates who have successfully navigated the exact interview boards.
          </p>
          <Link href="/courses?intent=signup" className="pixel-btn pixel-btn-primary text-base px-10">
            View Program Details
          </Link>
        </div>
      </div>
    </main>
  );
}
