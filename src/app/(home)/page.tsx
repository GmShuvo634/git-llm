import type { Metadata } from "next";

import { Hero } from "@/app/(home)/_components/hero";
import { ProductSection } from "@/app/(home)/_components/product-section";
import { absoluteUrl, siteConfig } from "@/lib/seo";

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
    title: "GII Structure CAT Coaching",
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
    <main className="min-h-screen bg-[#f4f4f6] text-[#050505]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      {featureBlocks.map((block, index) => (
        <div key={index}>
          <section
            key={block.title}
            className="py-20 px-6 md:px-12 lg:px-24 pixel-grid-light border-b-2 border-[#030213] relative z-2"
          >
            <div
              className={`max-w-7xl mx-auto flex justify-between items-center `}
            >
              <div className="text-center md:text-left max-w-3xl">
                <span className="font-pixel text-[9px] px-2 py-1 bg-[#030213] text-[#f4f4f6] uppercase tracking-wider">
                  {block.tag}
                </span>
                <h3 className="font-pixel text-base md:text-xl lg:text-2xl silver-text-dark mt-4 mb-3 leading-relaxed">
                  {block.title}
                </h3>
                <p className="font-grotesque text-lg md:text-xl text-[#5a5d66] leading-snug mb-6">
                  {block.body}
                </p>
                <a className="pixel-btn text-[11px]" href={block.href}>
                  {block.cta}
                </a>
              </div>
              <div className="w-14 h-14 bg-transparent border-2 border-[#030213] flex items-center justify-center shrink-0">
                <span className="font-pixel text-[12px] text-[#030213]">◆</span>
              </div>
            </div>
          </section>
          <div className="pixel-divider-light" />
        </div>
      ))}

      {/* GII System section (placed before product sections) */}
      <section className="py-20 px-6 md:px-12 lg:px-24 pixel-grid-light ">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex-1 text-center md:text-left">
          <h3 className="font-pixel text-base md:text-xl lg:text-2xl silver-text-dark mt-4 mb-3 leading-relaxed">
            The GII System
          </h3>
          <p className="mt-4 text-lg md:text-xl text-[#5a5d66] max-w-2xl">
            A structured path from CAT preparation to IIM conversion.
          </p>
          <a
            href="/courses"
            className="inline-block mt-6 pixel-btn bg-[#1466ff] text-white px-4 py-2 text-[13px]"
            aria-label="Start with 3 free mocks"
          >
            Start with 3 free mocks &nbsp;›
          </a>
        </div>

        <div className="flex flex-col gap-6 items-center justify-center mt-10 md:mt-0">
          {/* dark card behind */}
          <div className="w-82 p-6 bg-[#0b0b0b] shadow-inner">
            <div className="flex justify-between items-start">
              <div />
              <div className="text-sm text-[#ffffff]">01</div>
            </div>
            <h4 className="font-pixel text-2xl text-accent mt-2 mb-3">
              Assess
            </h4>
            <p className="text-accent leading-snug">
              Start with free CAT mocks to evaluate your current readiness,
              identify strengths and weaknesses, and understand your
              section-wise performance.
            </p>
          </div>

          {/* main white card */}
          <div className="relative z-20 w-96 pixel-card-light p-6 shadow-2xl ">
            <div className="flex justify-between items-start">
              <div />
              <div className="text-sm text-[#5a5d66]">02</div>
            </div>
            <h4 className="font-pixel text-2xl text-[#030213] mt-2 mb-3">
              Prepare
            </h4>
            <p className="text-[#5a5d66] leading-snug">
              Build concepts through structured CAT classes led by IIM-graduate
              trainers.
            </p>
          </div>

          {/* dark card below/right */}
          <div className="w-82 p-6 bg-[#0b0b0b] shadow-inner ">
            <div className="flex justify-between items-start">
              <div />
              <div className="text-sm text-[#ffffff]">03</div>
            </div>
            <h4 className="font-pixel text-2xl text-accent mt-2 mb-3">
              pratice
            </h4>
            <p className="text-accent leading-snug">
              Sharpen your skills with regular mocks, detailed performance
              analysis, targeted revision, and personalized improvement
              strategies.
            </p>
          </div>
        </div>
        </div>
        
      </section>
      <div className="pixel-divider-light" />

      {products.map((product) => (
        <ProductSection key={product.title} {...product} />
      ))}
    </main>
  );
}
