"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export function MyCoursesPage() {
  const [loading, setLoading] = useState<"login" | "signup" | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = useCallback((e: React.MouseEvent, type: "login" | "signup") => {
    e.preventDefault();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setLoading(type);

    timeoutRef.current = setTimeout(() => {
      setLoading(null);
    }, 10000);
  }, []);

  useEffect(() => {
    const iframe = document.getElementById("iframe");
    if (!iframe) return;

    const observer = new MutationObserver(() => {
      if (iframe.style.display !== "none" && iframe.style.display !== "") {
        setLoading(null);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      }
    });

    observer.observe(iframe, { attributes: true, attributeFilter: ["style"] });

    return () => {
      observer.disconnect();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="min-h-[80vh] pixel-grid-light flex items-center justify-center px-6 py-20">
      <div className="pixel-card-light p-8 md:p-10 max-w-2xl w-full relative z-2 anim-pop">
        <div className="text-center mb-8">
          <h1 className="font-heading text-lg silver-text-dark mb-3 leading-relaxed">
            MY COURSES
          </h1>
          <p className="font-body text-xl text-[#5a5d66]">
            &gt; Access your LMS account or create a new one
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <a
            href="#"
            className={`pixel-btn text-center loginButton login ${loading ? "pointer-events-none opacity-60" : ""}`}
            onClick={(e) => handleClick(e, "login")}
          >
            {loading === "login" ? (
              <span className="inline-flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Loading...
              </span>
            ) : (
              "Log In"
            )}
          </a>
          <a
            href="#"
            className={`pixel-btn text-center loginButton signup ${loading ? "pointer-events-none opacity-60" : ""}`}
            onClick={(e) => handleClick(e, "signup")}
          >
            {loading === "signup" ? (
              <span className="inline-flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Loading...
              </span>
            ) : (
              "Sign Up"
            )}
          </a>
          <a href="#" className="pixel-btn postLogin goToAccountButton" style={{ display: "none" }}>
            Go To My Account
          </a>
          <a href="#" className="pixel-btn postLogin logout" style={{ display: "none" }}>
            Log Out
          </a>
        </div>
      </div>
    </div>
  );
}
