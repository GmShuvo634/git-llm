import { Hero } from "@/app/(home)/_components/hero";
import { ProductSection } from "@/app/(home)/_components/product-section";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f4f4f6] text-[#030213]">
      <Hero />
      <ProductSection
        title="Mock Test Series"
        buttonText="Take the first 3 tests for free"
        details={[
          "100 Mock tests",
          "Three difficulty levels",
          "Dynamic Percentile Scores through PAN India participants",
          "Detailed analysis and answer keys",
        ]}
      />
      <ProductSection
        title="Short term Course (CAT - 2026)"
        buttonText="49900 INR"
        strikePrice="79900 INR"
        progressData={{ current: 60, total: 100 }}
        details={[
          "All classes taken by graduates from IIMs",
          "Mock test series complementary with this course",
          "GDPI preparation complementary with this course",
          "Weekly 3 classes (Monday, Wednesday & Friday)",
          "Batches start from August 1st",
        ]}
        reverse
      />
      <ProductSection
        title="Long term Course (CAT - 2027)"
        buttonText="79900 INR"
        strikePrice="99900 INR"
        progressData={{ current: 88, total: 100 }}
        details={[
          "All classes taken by graduates from IIMs",
          "Mock test series complementary with this course",
          "GDPI preparation complementary with this course",
          "Weekly 3 classes (Tuesday, Thursday & Saturday)",
          "Batches start from August 1st",
        ]}
      />
      <ProductSection
        title="The Final Lap - GDPI Preparation"
        buttonText="9900 INR"
        strikePrice="14999 INR"
        details={[
          "10 Mock Interviews by IIM Graduates with feedback",
          "10 Mock GDs with feedback by IIM Graduates",
          "Interview preparation material",
          "Daily current affairs update journal",
        ]}
        reverse
      />
    </div>
  );
}
