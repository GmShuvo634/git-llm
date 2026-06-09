export const siteConfig = {
  name: "Get Into IIMs",
  title: "Get Into IIMs | CAT Coaching by IIM Graduates",
  description:
    "Prepare for CAT 2026, CAT 2027, mock tests, and GDPI with courses taught by IIM graduates.",
  url: getSiteUrl(),
  logo: "/logo.png",
  keywords: [
    "CAT coaching",
    "IIM preparation",
    "CAT mock tests",
    "CAT 2026 course",
    "CAT 2027 course",
    "GDPI preparation",
    "IIM graduates",
  ],
};

function getSiteUrl() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const vercelUrl = process.env.VERCEL_URL;

  if (siteUrl) {
    return normalizeUrl(siteUrl);
  }

  if (vercelUrl) {
    return normalizeUrl(`https://${vercelUrl}`);
  }

  return "http://localhost:3000";
}

function normalizeUrl(url: string) {
  return url.replace(/\/+$/, "");
}

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
