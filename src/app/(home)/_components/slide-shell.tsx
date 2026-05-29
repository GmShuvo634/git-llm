export const SlideShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative scanlines">
      <div
        className="min-h-150 flex items-center justify-center px-8 md:px-16 lg:px-32 py-16"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at top, rgba(184,187,194,0.08), transparent 60%), repeating-linear-gradient(0deg, rgba(184,187,194,0.04) 0px, rgba(184,187,194,0.04) 2px, transparent 2px, transparent 32px), repeating-linear-gradient(90deg, rgba(184,187,194,0.04) 0px, rgba(184,187,194,0.04) 2px, transparent 2px, transparent 32px)",
        }}
      >
        {children}
      </div>
    </div>
  );
};
