import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/seo";

export const runtime = "edge";
export const alt = `${siteConfig.name} CAT coaching by IIM graduates`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#f4f4f6",
          color: "#050505",
          padding: 72,
          border: "24px solid #050505",
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 38,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#5a5d66",
            marginBottom: 36,
          }}
        >
          CAT 2026 + CAT 2027 + GDPI
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 86,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: -2,
            maxWidth: 980,
          }}
        >
          Get Into IIMs
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 42,
            lineHeight: 1.3,
            color: "#5a5d66",
            marginTop: 34,
            maxWidth: 900,
          }}
        >
          Classes, mock tests, and GDPI preparation by IIM graduates.
        </div>
      </div>
    ),
    size,
  );
}
