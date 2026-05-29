"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";
import { MenuIcon, XIcon } from "lucide-react";
import { usePathname } from "next/navigation";

export type Page = "home" | "courses" | "forums" | "tier2" | "recruitment";

const tabs: { key: string; label: string }[] = [
  { key: "/courses", label: "My Courses" },
  { key: "/forums", label: "IIM Forums" },
  { key: "/tier2", label: "Tier 2 College Prep" },
  { key: "/recruitment", label: "Recruitment" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-[#f4f4f6] border-b-2 border-[#030213]">
      <div className="pixel-divider-light" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
        <Link href={"/"}>
          <Logo variant="light" />
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-2">
          {tabs.map((t) => {
            const isActive = pathname === t.key;

            return (
              <Link
                key={t.key}
                href={t.key}
                className={cn(
                  "nav-tab font-pixel text-[10px] px-4 py-3 border-2 transition-all",
                  isActive
                    ? "bg-[#030213] text-[#f4f4f6] border-[#030213]"
                    : "bg-transparent text-[#030213] border-[#b9bbc2] hover:border-[#030213]",
                )}
              >
                {t.label.toUpperCase()}
              </Link>
            );
          })}
        </div>

        {/* Mobile button */}
        <button
          className="lg:hidden text-[#030213] p-2 border-2 border-[#030213]"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <XIcon className="size-5" />
          ) : (
            <MenuIcon className="size-5" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t-2 border-[#030213] bg-[#f4f4f6] px-6 py-4 flex flex-col gap-2 anim-fade-up">
          {tabs.map((t) => {
            const isActive = pathname === t.key;

            return (
              <Link
                key={t.key}
                href={t.key}
                className={cn(
                  "font-pixel text-[10px] px-4 py-3 border-2 text-left",
                  isActive
                    ? "bg-[#030213] text-[#f4f4f6] border-[#030213]"
                    : "bg-transparent text-[#030213] border-[#b9bbc2] hover:border-[#030213]",
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
