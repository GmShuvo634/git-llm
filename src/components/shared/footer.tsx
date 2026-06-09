import Link from "next/link";
import { Logo } from "./logo";

export const Footer = () => {
  return (
    <footer className="bg-[#f4f4f6] text-[#050505] border-t-2 border-[#050505]">
      <div className="pixel-divider-light" />
      <div className="px-6 md:px-12 lg:px-24 py-16 pixel-grid-light">
        <div className="max-w-7xl mx-auto relative z-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <Logo size={48} variant="light" />
              <p className="font-body text-xl text-[#5a5d66] mt-6 leading-snug">
                &gt; GII helps serious aspirants prepare for the complete IIM-entry
                journey. CAT, mocks, GDPI, and final conversion, through
                IIM-graduate mentorship and structured preparation.
              </p>
            </div>

            <div>
              <h4 className="font-heading text-[11px] silver-text-dark mb-5">
                QUICK LINKS
              </h4>
              <ul className="space-y-3 font-body text-xl">
                <li>
                  <Link
                    href="/courses"
                    className="text-[#5a5d66] hover:text-[#050505] bg-transparent border-0 p-0 cursor-pointer text-left transition-colors"
                  >
                    &gt; My Courses
                  </Link>
                </li>
                <li>
                  <Link
                    href="/forums"
                    className="text-[#5a5d66] hover:text-[#050505] bg-transparent border-0 p-0 cursor-pointer text-left transition-colors"
                  >
                    &gt; IIM Forums
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tier2"
                    className="text-[#5a5d66] hover:text-[#050505] bg-transparent border-0 p-0 cursor-pointer text-left transition-colors"
                  >
                    &gt; Tier 2 College Prep
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading text-[11px] silver-text-dark mb-5">
                LEGAL
              </h4>
              <ul className="space-y-3 font-body text-xl">
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-[#5a5d66] hover:text-[#050505] transition-colors"
                  >
                    &gt; Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="text-[#5a5d66] hover:text-[#050505] transition-colors"
                  >
                    &gt; Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/refund-policy"
                    className="text-[#5a5d66] hover:text-[#050505] transition-colors"
                  >
                    &gt; Refund Policy
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[#5a5d66] hover:text-[#050505] transition-colors"
                  >
                    &gt; Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t-2 border-[#050505] pt-12 text-center">
            <Link href="/recruitment" className="pixel-btn text-sm">
              ◆ WE ARE RECRUITING ◆
            </Link>
          </div>

          <div className="text-center font-body text-lg text-[#8a8d96] mt-10">
            <p>
              © {new Date().getFullYear()} GET INTO IIMS - ALL RIGHTS RESERVED
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

