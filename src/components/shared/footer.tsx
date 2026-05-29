import Link from "next/link";
import { Logo } from "./logo";

export const Footer = () => {
  return (
    <footer className="bg-[#f4f4f6] text-[#030213] border-t-2 border-[#030213]">
      <div className="pixel-divider-light" />
      <div className="px-6 md:px-12 lg:px-24 py-16 pixel-grid-light">
        <div className="max-w-7xl mx-auto relative z-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <Logo size={48} variant="light" />
              <p className="font-pixel-readable text-xl text-[#5a5d66] mt-6 leading-snug">
                &gt; Empowering aspirants to achieve their IIM dreams through
                excellence in education.
              </p>
            </div>

            <div>
              <h4 className="font-pixel text-[11px] silver-text-dark mb-5">
                QUICK LINKS
              </h4>
              <ul className="space-y-3 font-pixel-readable text-xl">
                <li>
                  <a
                    href="#"
                    className="text-[#5a5d66] hover:text-[#030213] transition-colors"
                  >
                    &gt; About Us
                  </a>
                </li>
                <li>
                  <Link
                    href="/courses"
                    className="text-[#5a5d66] hover:text-[#030213] bg-transparent border-0 p-0 cursor-pointer text-left transition-colors"
                  >
                    &gt; My Courses
                  </Link>
                </li>
                <li>
                  <Link
                    href="/forums"
                    className="text-[#5a5d66] hover:text-[#030213] bg-transparent border-0 p-0 cursor-pointer text-left transition-colors"
                  >
                    &gt; IIM Forums
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[#5a5d66] hover:text-[#030213] transition-colors"
                  >
                    &gt; Success Stories
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-pixel text-[11px] silver-text-dark mb-5">
                LEGAL
              </h4>
              <ul className="space-y-3 font-pixel-readable text-xl">
                <li>
                  <a
                    href="#"
                    className="text-[#5a5d66] hover:text-[#030213] transition-colors"
                  >
                    &gt; Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[#5a5d66] hover:text-[#030213] transition-colors"
                  >
                    &gt; Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[#5a5d66] hover:text-[#030213] transition-colors"
                  >
                    &gt; Refund Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[#5a5d66] hover:text-[#030213] transition-colors"
                  >
                    &gt; Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t-2 border-[#030213] pt-12 text-center">
            <Link href="/recruitment" className="pixel-btn text-sm">
              ◆ WE ARE RECRUITING ◆
            </Link>
          </div>

          <div className="text-center font-pixel-readable text-lg text-[#8a8d96] mt-10">
            <p>
              © {new Date().getFullYear()} GET INTO IIMs — ALL RIGHTS RESERVED
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
