"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MenuIcon, XIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { Logo } from "./logo";

const tabs: { key: string; label: string }[] = [
  { key: "/mock-tests", label: "GII Mocks" },
  { key: "/courses", label: "My Courses" },
  { key: "/forums", label: "IIM Forums" },
  { key: "/gdpi-prep", label: "WAT & GDPI Preparation" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();
  const lastY = useRef(0);
  // // useEffect(() => {
  // //   const onScroll = () => {
  // //     const currentY = window.scrollY;
  // //     const scrollingDown = currentY > lastY.current;
  // //     const scrollingUp = currentY < lastY.current;
  // //     const hasMovedEnough = Math.abs(currentY - lastY.current) > 8;

  // //     if (window.innerWidth < 1024 && hasMovedEnough) {
  // //       if (currentY <= 80) {
  // //         setHidden(false);
  // //       } else {
  // //         setHidden(scrollingDown);
  // //       }

  // //       if (scrollingDown || scrollingUp) {
  // //         setOpen(false);
  // //       }
  // //     }

  // //     lastY.current = currentY;
  // //   };

  //   window.addEventListener("scroll", onScroll, { passive: true });
  //   return () => window.removeEventListener("scroll", onScroll);
  // }, []);

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 bg-[#f4f4f6] border-b-2 border-[#050505] transition-transform duration-200 will-change-transform",
        hidden ? "translate-y-[-110%]" : "translate-y-0",
      )}
    >
      <div className="pixel-divider-light" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
        <Link href="/" aria-label="Get Into IIMs home">
          <Logo variant="light" />
        </Link>

        <div className="hidden lg:flex items-center gap-2">
          {tabs.map((t) => {
            const isActive = pathname === t.key;

            return (
                <Link
                  key={t.key}
                  href={t.key}
                  className={cn(
                  "nav-tab font-pixel text-[9px] px-4 py-3 border-2 transition-all",
                  isActive
                    ? "bg-[#050505] text-[#f4f4f6] border-[#050505]"
                    : "bg-transparent text-[#050505] border-[#b9bbc2] hover:border-[#050505]",
                )}
              >
                {t.label.toUpperCase()}
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          className="lg:hidden text-[#050505] p-2 border-2 border-[#050505]"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        >
          {open ? <XIcon className="size-5" /> : <MenuIcon className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t-2 border-[#050505] bg-[#f4f4f6] px-6 py-4 flex flex-col gap-2 anim-fade-up">
          {tabs.map((t) => {
            const isActive = pathname === t.key;

            return (
                <Link
                  key={t.key}
                  href={t.key}
                  onClick={() => setOpen(false)}
                  className={cn(
                  "font-pixel text-[9px] px-4 py-3 border-2 text-left",
                  isActive
                    ? "bg-[#050505] text-[#f4f4f6] border-[#050505]"
                    : "bg-transparent text-[#050505] border-[#b9bbc2] hover:border-[#050505]",
                )}
              >
                {t.label.toUpperCase()}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
};
