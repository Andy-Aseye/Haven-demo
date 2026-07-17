interface SectionLabelProps {
  children: React.ReactNode;
  light?: boolean;
}

export default function SectionLabel({ children, light }: SectionLabelProps) {
  return (
    <p
      style={{
        fontFamily: "var(--font-body)",
        fontSize: "0.7rem",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: light ? "rgba(250,250,248,0.5)" : "var(--color-text-muted)",
        marginBottom: "1.25rem",
      }}
    >
      {children}
    </p>
  );
}
