import type { Metadata } from "next";

import { Hero } from "@/app/(home)/_components/hero";
import { ForumsHighlightSection } from "@/app/(home)/_components/forums-highlight-section";
import { MentorHighlightsSection } from "@/app/(home)/_components/mentor-highlights-section";
import { ProductSection } from "@/app/(home)/_components/product-section";
import { VerticalJourneySlider } from "@/app/(home)/_components/vertical-journey-slider";
import { absoluteUrl, siteConfig } from "@/lib/seo";
import { Linked } from "@/components/shared/linked";
import Script from "next/script";

const products = [
  {
    title: "GII Mocks",
    buttonText: "Start with 3 Free Mocks",
    isPrimary: true,
    details: [
      "100 mocks built for progressive CAT readiness",
      "Three difficulty bands to train across comfort, pressure, and stretch zones",
      "Live percentile benchmarking across a national aspirant pool",
      "Section-wise analysis, accuracy insights, and answer explanations",
    ],
    description:
      "Start with your CAT baseline. Before you choose a course, understand where you stand. Take 3 free mocks to diagnose your accuracy, speed, section balance, and attempt strategy.",
  },
  {
    title: "GII Structured CAT Coaching",
    buttonText: "View Program Details",
    details: [
      "Online Live Classes led by IIM-graduate trainers",
      "GII Mocks complementary with this course",
      "GII WAT & GDPI conversion program complementary with this course",
      "Weekly 3 live classes (Monday, Wednesday & Friday - 6PM to 8PM)",
      "30,000 Rs discount for first 100 students",
      "Batches start from August 1st",
    ],
    reverse: true,
    description:
      "A structured preparation for aspirants preparing to convert CAT 2026 and CAT 2027 into IIM calls.",
  },
  {
    title: "GII WAT & GDPI Conversion Program",
    buttonText: "View Program Details",
    details: [
      "10 mock interviews with IIM-graduate feedback",
      "10 moderated group discussions with structured feedback",
      "Interview frameworks, profile prep, HR questions, and B-school-specific preparation material",
      "Daily current-affairs journal for GD, WAT, and interview readiness",
    ],
    description:
      "The shortlist is not the finish line. CAT can get your name into the room. WAT & GDPI decides how you hold that room. GII WAT & GDPI prepares aspirants for interviews, group discussions, written ability, current affairs, and final conversion.",
  },
];

const featureBlocks = [
  {
    tag: "FRAME 4",
    title: "Complete IIM Journey. One Path.",
    body: "Prepare in sequence instead of fragments: CAT mocks, concept coaching, GDPI conversion, and forums to stay accountable.",
    cta: "See My Courses",
    href: "/courses",
  },
  {
    tag: "FRAME 6",
    title: "Mentor-Led, Not Content-Led",
    body: "Every track is guided by IIM graduates, with structured milestones so you always know what to do next and where to improve.",
    cta: "Meet The Tracks",
    href: "/courses",
  },
  {
    tag: "FRAME 10",
    title: "Conversion-Focused Outcomes",
    body: "From baseline to final shortlist performance, the system is built to improve decision quality, consistency, and conversion confidence.",
    cta: "Start With Signup",
    href: "/courses?intent=signup",
  },
];

const journeySlides = [
  {
    id: "diagnose",
    number: "01",
    title: "Diagnose",
    description:
      "Start with mocks to understand your current readiness, section balance, speed, and accuracy.",
  },
  {
    id: "prepare",
    number: "02",
    title: "Prepare",
    description:
      "Build concepts through structured CAT classes led by IIM-graduate trainers.",
  },
  {
    id: "practice",
    number: "03",
    title: "Practice",
    description:
      "Use mocks, analysis, and revision cycles to turn preparation into performance.",
  },
  {
    id: "convert",
    number: "04",
    title: "Convert",
    description:
      "Move beyond CAT with GDPI preparation, interview practice, current affairs, and communication readiness.",
  },
];

export const metadata: Metadata = {
  title: {
    absolute: siteConfig.title,
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: "/",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} CAT coaching and IIM preparation`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: absoluteUrl(siteConfig.logo),
        description: siteConfig.description,
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
      },
      {
        "@type": "ItemList",
        "@id": `${siteConfig.url}/#courses`,
        name: "CAT preparation courses and tests",
        itemListElement: products.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Course",
            name: product.title,
            description: product.details.join(". "),
            provider: {
              "@id": `${siteConfig.url}/#organization`,
            },
            offers: {
              "@type": "Offer",
              url: siteConfig.url,
              category: "Education",
              availability: "https://schema.org/InStock",
            },
          },
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#f4f4f6] text-[#050505] overflow-hidden">
      <Script
        id="home-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />

      {/* GII System section (placed before product sections) */}
      <section className="py-16 px-6 md:px-12 lg:px-24 pixel-grid-light border-b-2 border-[#030213]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center overflow-hidden">
          <div className="flex-1 text-center md:text-left">
            <h3 className="font-pixel text-base md:text-xl lg:text-3xl silver-text-dark mt-4 mb-3 leading-relaxed">
              The GII System
            </h3>
            <p className="mt-4 mb-4 md:text-xl text-base max-w-2xl">
              A structured path from CAT preparation to IIM conversion.
            </p>
            {/* <Link
            href="/courses?intent=signup"
            className="inline-block mt-6 bg-[#1466ff] text-white px-6 py-3 rounded text-[16px]"
            aria-label="Start with 3 free mocks"
          >
            Start with 3 free mocks &nbsp;›
          </Link> */}
            <Linked href="/courses?intent=signup">
              Start with 3 free mocks &nbsp;›
            </Linked>
          </div>

          <VerticalJourneySlider slides={journeySlides} />
        </div>

      </section>

      <MentorHighlightsSection />
      <ForumsHighlightSection />

      {products.map((product) => (
        <ProductSection key={product.title} {...product} />
      ))}
    </main>
  );
}
