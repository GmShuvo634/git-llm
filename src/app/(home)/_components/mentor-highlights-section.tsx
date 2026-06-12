import { Linked } from "@/components/shared/linked";
import Image from "next/image";
import { MentorHighlightsSlider } from "@/app/(home)/_components/mentor-highlights-slider";

export function MentorHighlightsSection() {
  return (
    <section className="px-6 pt-14 pb-0 md:pb-0 md:px-12 md:pt-16 lg:px-24 pixel-grid-light border-b-2 border-[#030213]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10 lg:gap-14 items-center">
          <div className="w-full max-w-70 mx-auto lg:mx-0 border-2 border-[#e8e9ee] bg-[#efeff1] p-3 shadow-[0_0_0_2px_#d8d9de]">
            <div className="aspect-3/4 w-full bg-linear-to-b from-[#f6f7f8] to-[#d8d9de] border-2 border-[#d8d9de] flex items-center justify-center">
              <Image src="/mentor.png" alt="Mentor highlights" width={500} height={600} className="object-cover" />
            </div>
          </div>

          <div className="max-w-3xl">
            <h2 className="font-pixel text-2xl md:text-4xl lg:text-4xl silver-text-dark leading-relaxed">
              Get trained by people who have cleared the path.
            </h2>
            <p className="mt-6 font-body text-xl leading-relaxed text-[#1f2330] max-w-2xl">
              GII classes are led by IIM-graduate trainers who understand the
              journey from CAT preparation to shortlist pressure, WAT &amp; GDPI
              performance, and final admit conversion.
            </p>
            <div className="mt-6">
              <Linked href="/courses?intent=signup">
                Start with 3 free mocks &nbsp;&rsaquo;
              </Linked>
            </div>
          </div>
        </div>

        <MentorHighlightsSlider />
      </div>
    </section>
  );
}
