interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "ghost" | "filled";
  style?: React.CSSProperties;
  onClick?: () => void;
}

export default function Button({
  children,
  href,
  variant = "ghost",
  style: extraStyle,
  onClick,
}: ButtonProps) {
  const baseStyle: React.CSSProperties = {
    display: "inline-block",
    fontFamily: "var(--font-body)",
    fontSize: "0.8125rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    textDecoration: "none",
    padding: "0.75rem 2rem",
    cursor: "pointer",
    border: "none",
    transition: "background 200ms, color 200ms, border-color 200ms",
    ...extraStyle,
  };

  const variantStyle: React.CSSProperties =
    variant === "ghost"
      ? {
          background: "transparent",
          border: "1px solid rgba(250,250,248,0.6)",
          color: "var(--color-text-primary)",
        }
      : {
          background: "var(--color-accent)",
          border: "1px solid var(--color-accent)",
          color: "var(--color-text-dark)",
        };

  const combined = { ...baseStyle, ...variantStyle };

  if (href) {
    return (
      <a href={href} style={combined}>
        {children}
      </a>
    );
  }

  return (
    <button style={combined} onClick={onClick}>
      {children}
    </button>
  );
}
