import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "Refund Policy for GII - Get Into IIMs by Sirken Education Pvt. Ltd.",
  alternates: {
    canonical: "/refund-policy",
  },
};

const refundPolicyPartOne = `Refunds, Cancellations, Transfers and Access Changes
Refund eligibility depends on the type of GII product purchased and the stage at which the refund request is received by GII. Users should review the applicable product details, batch schedule, access terms and refund rules before completing a purchase.

Mock Series Purchases
All purchases of the GII Mock Series, mock test packages, standalone test series, test bundles, diagnostic mocks, reports, analysis access or similar mock-related products are non-refundable. Once a mock series or mock-related product is purchased, no refund will be provided, whether or not the user has attempted the mocks, accessed the analysis, downloaded reports or used the related platform features.

Live CAT Coaching and WAT & GDPI Preparation
For Live CAT Coaching courses and WAT & GDPI Preparation programmes, the refund window is determined with reference to the scheduled start time of the first session of the relevant course, batch or programme. The following refund rules apply unless a different written refund term is expressly communicated by GII for a specific product at the time of purchase.`;

const refundPolicyPartTwo = `For clarity, the refund percentage applies to the amount paid by the user for the relevant eligible course or programme, subject to any non-refundable taxes, gateway charges, bank charges, convenience fees, administrative deductions or other deductions that may be applicable under the payment provider's rules or applicable law. If a user receives access to bundled products that include non-refundable mock series, digital resources, LMS access, recorded content or other non-refundable components, GII may deduct the value of such components while processing an approved refund, unless otherwise communicated in writing.

Refund Request Process
Refund requests must be submitted by email to hi@getintoiims.com from the user's registered email ID or with sufficient details to verify the purchase. The request should include the user's full name, registered phone number, registered email ID, programme purchased, payment reference or transaction ID, batch details and reason for the refund request.
GII will review refund requests based on the applicable product category, batch schedule, session attendance/access records, payment confirmation and the timing of the request. Approved refunds may be processed through the original payment method or another method permitted by GII and the payment provider, subject to applicable deductions and processing timelines. Processing time may depend on banks, payment gateways, payment aggregators or other third-party payment service providers.

Cancellations, Transfers and Access Changes
Batch transfers, course deferrals, access extensions, programme changes, seat transfers and substitutions are not guaranteed and may be approved or rejected at GII's discretion. Any exception, goodwill refund, transfer, credit, access extension or special approval granted in one case does not create an obligation to provide the same treatment in any other case.
GII may separately publish or communicate additional refund, cancellation or access rules for specific cohorts, limited-seat programmes, promotional offers, scholarships, discounted purchases or bundled products. Where such specific terms are communicated, they will apply in addition to these Terms, and in case of conflict, the specific written terms communicated for that product will prevail to the extent of the conflict.`;

const refundRows = [
  {
    timing:
      "Request received more than 7 days before the scheduled start of the first session",
    eligibility: "100% refund",
  },
  {
    timing:
      "Request received before the first session, but within 7 days of the scheduled start of the first session",
    eligibility: "80% refund",
  },
  {
    timing:
      "Request received after the first session but before the second session",
    eligibility: "50% refund",
  },
  {
    timing:
      "Request received after the second session has started or after the second session has been completed",
    eligibility: "No refund",
  },
];

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-[#f4f4f6] text-[#050505] px-6 md:px-12 lg:px-24 py-16">
      <article className="max-w-5xl mx-auto pixel-card-light p-6 md:p-10">
        <h1 className="font-heading text-lg md:text-2xl silver-text-dark mb-6">
          Refund Policy
        </h1>

        <pre className="font-body text-base md:text-lg whitespace-pre-wrap leading-relaxed text-[#050505]">
          {refundPolicyPartOne}
        </pre>

        <div className="overflow-x-auto my-8">
          <table className="w-full border-2 border-[#050505] border-collapse font-body text-base md:text-lg">
            <thead>
              <tr className="bg-[#e8e8eb]">
                <th className="border-2 border-[#050505] p-3 text-left">
                  Refund Request Timing
                </th>
                <th className="border-2 border-[#050505] p-3 text-left">
                  Refund Eligibility
                </th>
              </tr>
            </thead>
            <tbody>
              {refundRows.map((row) => (
                <tr key={row.timing}>
                  <td className="border-2 border-[#050505] p-3 align-top">
                    {row.timing}
                  </td>
                  <td className="border-2 border-[#050505] p-3 align-top">
                    {row.eligibility}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <pre className="font-body text-base md:text-lg whitespace-pre-wrap leading-relaxed text-[#050505]">
          {refundPolicyPartTwo}
        </pre>
      </article>
    </main>
  );
}
