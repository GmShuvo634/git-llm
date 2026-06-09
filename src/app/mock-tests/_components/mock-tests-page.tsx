"use client";

import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
export function MockTestsPage() {

  const features = [
    "100 mocks built for progressive CAT readiness",
    "Three difficulty bands to train across comfort, pressure, and stretch zones",
    "Live percentile benchmarking across a national aspirant pool",
    "Section-wise analysis, accuracy insights, and answer explanations"
  ];

  return (
    <div className="min-h-screen bg-[#f4f4f6] text-[#050505] pb-20">
      {/* Header Section */}
      <div className="px-6 md:px-12 lg:px-24 pt-20 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading text-xl md:text-3xl lg:text-4xl silver-text-dark mb-6">
            GII Mocks
          </h1>
          <p className="font-body text-xl md:text-2xl mb-12 text-[#050505] leading-snug">
            Start with your CAT baseline. Before you choose a course, understand where you stand. Take 3 free mocks to diagnose your accuracy, speed, section balance, and attempt strategy.
          </p>
          <div className="flex flex-col items-center gap-6">
            <Link href="/courses?intent=signup" className="pixel-btn-dark text-base px-10">
              Start with 3 Free Mocks
            </Link>
            <p className="font-heading text-sm text-[#5a5d66]">
              <ArrowRightIcon className="w-4 h-4 inline-block mr-2" /> 
              Free access to all features for 7 days
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto text-center pb-20">
          <h2 className="font-pixel text-lg md:text-2xl lg:text-3xl silver-text-dark mb-10">
            What You Get
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="shrink-0 w-3 h-3 mt-2">
                  <div className="bg-[#030213] w-3 h-3">
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
      <div className="px-6 md:px-12 lg:px-24 py-20 bg-[#ffffff]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-lg md:text-2xl lg:text-3xl silver-text-dark mb-8">
            Ready to Begin Your CAT Journey?
          </h2>
          <p className="font-body text-xl md:text-2xl mb-12 text-[#050505] leading-snug">
            Join thousands of successful IIM aspirants who started with our free mock tests
          </p>
          <Link href="/courses?intent=signup" className="pixel-btn-dark text-base px-10">
            Start with 3 Free Mocks
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MockTestsPage;