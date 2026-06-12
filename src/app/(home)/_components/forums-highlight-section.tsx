import Image from "next/image";
import Link from "next/link";

export function ForumsHighlightSection() {
  return (
    <section className="px-6 py-14 md:px-12 md:py-16 lg:px-24 pixel-grid-light-2 border-b-2 border-[#030213]">
      <div className="max-w-7xl mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-8 lg:gap-12 items-center">
          <div>
            <h2 className="font-heading text-lg md:text-2xl lg:text-3xl mb-4 silver-text-dark leading-relaxed">
              GII FORUMS
            </h2>
            <h3 className="mt-4 font-body text-xl leading-[1.05] tracking-[-0.02em] text-[#050505] md:text-3xl md:leading-none">
              A serious forum for serious aspirants.
            </h3>

            <p className="mt-6 mb-8 max-w-2xl font-body text-xl leading-relaxed text-[#050505]">
              GII Forums are built for moderated conversations around CAT, GDPI,
              current affairs, strategy, mock analysis, and IIM admissions. Read
              discussions freely. Register to participate.
            </p>

            <Link
              href="/forums"
              className="pixel-btn text-base px-10 "
            >
              Enter GII Forums
              <span aria-hidden>&rsaquo;</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-5 items-end mt-6 lg:mt-0">
            <div className="w-full h-72.5 md:h-122.5 rounded-[12px]  flex items-center justify-center">
              <Image
                src="/person1.png"
                alt="Forum highlight 1"
                width={400}
                height={490}
                sizes="( min-width: 1024px ) 400px, ( min-width: 768px ) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="w-full h-57.5 md:h-100 rounded-[12px]  flex items-center justify-center">
              <Image
                src="/person2.png"
                alt="Forum highlight 2"
                width={400}
                height={400}
                sizes="( min-width: 1024px ) 400px, ( min-width: 768px ) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
