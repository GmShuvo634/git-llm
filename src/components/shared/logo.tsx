import Image from "next/image";

interface LogoProps {
  size?: number;
  variant?: "light" | "dark";
}

export function Logo({ size = 40, variant = "light" }: LogoProps) {
  const dark = variant === "dark";
  return (
    <div className="flex items-center gap-3 group">
      <div
        style={{ width: size, height: size }}
        className={`shrink-0 p-1 border-2 transition-transform duration-200 group-hover:rotate-3 ${
          dark ? "bg-black border-[#b9bbc2]" : "bg-[#050505] border-[#050505]"
        }`}
      >
        <Image
          src="/logo.png"
          alt="Get Into IIMs Logo"
          className="w-full h-full object-contain"
          width={size}
          height={size}
          unoptimized
          style={
            {
              imageRendering: "pixelated",
            } as React.CSSProperties
          }
        />
      </div>
    </div>
  );
}
