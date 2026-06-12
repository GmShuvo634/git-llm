"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";

function calc() {
  const target = new Date();
  target.setDate(target.getDate() + 90);
  const diff = target.getTime() - Date.now();
  return {
    d: Math.max(0, Math.floor(diff / 86400000)),
    h: Math.max(0, Math.floor((diff / 3600000) % 24)),
    m: Math.max(0, Math.floor((diff / 60000) % 60)),
    s: Math.max(0, Math.floor((diff / 1000) % 60)),
  };
}

export function Tier2({ initialDays }: { initialDays?: number }) {
  const [t, setT] = useState(calc());
  const [email, setEmail] = useState("");
  const [subbed, setSubbed] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  const Block = ({ value, label }: { value: number; label: string }) => (
    <div className="pixel-card-light p-5 min-w-20 md:min-w-30 text-center">
      <div className="font-pixel text-2xl md:text-4xl silver-text-dark mb-2 anim-pop">
        {value.toString().padStart(2, "0")}
      </div>
      <div className="font-heading text-[9px] text-[#5a5d66]">{label}</div>
    </div>
  );

  return (
    <div className="min-h-[80vh] pixel-grid-light px-6 py-20 relative">
      <div className="max-w-3xl mx-auto text-center relative z-2">
        <div className="inline-block pixel-border-silver px-6 py-3 mb-8 bg-[#030213] anim-pop">
          <span className="font-pixel text-[10px] silver-text">
            [ LOADING<span className="anim-blink">...</span> ]
          </span>
        </div>

        <h1 className="font-heading text-xl md:text-3xl lg:text-4xl silver-text-dark leading-relaxed mb-6 anim-fade-up">
          TIER 2 COLLEGE PREP
        </h1>
        <p className="font-heading text-sm md:text-base text-[#050505] mb-4 anim-fade-up tier2-delay-100">
          COMING SOON
        </p>
        <p className="font-body text-2xl text-[#5a5d66] leading-snug mb-12 max-w-2xl mx-auto anim-fade-up tier2-delay-200">
          &gt; We are crafting a premium preparation track for top Tier 2 B-Schools — MDI, SPJIMR, IIFT, NMIMS, IMT, and more.
        </p>

        <div className="flex flex-wrap justify-center gap-3 md:gap-5 mb-14">
          <Block value={t.d} label="DAYS" />
          <Block value={t.h} label="HOURS" />
          <Block value={t.m} label="MINUTES" />
          <Block value={t.s} label="SECONDS" />
        </div>

        <div className="pixel-card-light p-8 max-w-xl mx-auto anim-fade-up tier2-delay-300">
          <Bell className="w-6 h-6 mx-auto mb-4 text-[#050505]" aria-hidden="true" />
          <h3 className="font-heading text-[12px] silver-text-dark mb-3">NOTIFY ME</h3>
          <p className="font-body text-xl text-[#5a5d66] mb-6">
            &gt; Be the first to know when we launch_
          </p>
          {subbed ? (
            <p className="font-body text-2xl text-[#050505] anim-pop">✓ You're on the list!</p>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubbed(true); }} className="flex flex-col sm:flex-row gap-3" aria-label="Notify me form">
              <label htmlFor="tier2-email" className="sr-only">Email address</label>
              <input id="tier2-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com" className="pixel-input-light flex-1" aria-label="Email address for notification" />
              <button type="submit" className="pixel-btn" aria-label="Notify me">NOTIFY</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Tier2;
