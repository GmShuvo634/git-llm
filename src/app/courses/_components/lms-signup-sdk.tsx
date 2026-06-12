"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const LMS_SIGNUP_SDK_SRC =
  "https://lms.getintoiims.com/js-sdks/signup-sdk/signup-sdk.js?v=2.8";
const LMS_SIGNUP_SDK_SELECTOR = 'script[data-lms-signup-sdk="true"]';

export function LmsSignupSdk() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const existingScript = document.querySelector(LMS_SIGNUP_SDK_SELECTOR);
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement("script");
      script.src = LMS_SIGNUP_SDK_SRC;
      script.async = true;
      script.setAttribute("data-lms-signup-sdk", "true");
      document.body.appendChild(script);
    }, 0);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [pathname]);

  return (
    <>
      <iframe
        ref={iframeRef}
        className="iframe"
        id="iframe"
        style={{
          width: "100vw",
          height: "100vh",
          border: "none",
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          zIndex: 10000,
          display: "none",
        }}
        src="https://lms.getintoiims.com/js-sdks/signup-sdk/iframe.php?subdomain=getintoiims"
      />
    </>
  );
}
