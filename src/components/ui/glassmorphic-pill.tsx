interface GlassmorphicPillProps {
  label: string;
}

export default function GlassmorphicPill({ label }: GlassmorphicPillProps) {
  return (
    <span
      className="backdrop-blur-sm bg-white/75 rounded-full text-black underline"
      style={{
        fontFamily: 'var(--font-dm-sans), "DM Sans", sans-serif',
        fontWeight: 500,
        fontSize: '13px',
        lineHeight: '20px',
        letterSpacing: '-0.18px',
        padding: '5px 16px',
      }}
    >
      {label}
    </span>
  );
}
