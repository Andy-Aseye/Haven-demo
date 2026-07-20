"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const navSections = [
  {
    title: "Categories",
    links: [
      { label: "Experience", href: "#experience" },
      { label: "Residences", href: "#residences" },
    ],
  },
  {
    title: "Collections",
    links: [
      { label: "Amenities", href: "#amenities" },
      { label: "Location", href: "#location" },
    ],
  },
  {
    title: "Information",
    links: [
      { label: "Testimonials", href: "#testimonials" },
      { label: "Contact", href: "#contact" },
    ],
  },
];

const TimeDisplay = () => {
  const [timeStr, setTimeStr] = useState("");
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeOpts: Intl.DateTimeFormatOptions = { 
        timeZone: 'Africa/Accra',
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      };
      const dateOpts: Intl.DateTimeFormatOptions = { 
        timeZone: 'Africa/Accra',
        month: 'short',
        day: 'numeric'
      };
      setTimeStr(new Intl.DateTimeFormat('en-US', timeOpts).format(now));
      setDateStr(new Intl.DateTimeFormat('en-US', dateOpts).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", minWidth: "90px" }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
      <span style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 600 }}>
        {dateStr ? `${dateStr}, ${timeStr} GMT` : "..."}
      </span>
    </div>
  );
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "1rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "background 500ms ease, backdrop-filter 500ms ease",
          background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            mixBlendMode: "multiply", // Makes the solid white background of the logo transparent
            flex: 1,
          }}
        >
          <Image
            src="/logo.png"
            alt="Haven Logo"
            width={74}
            height={74}
            style={{ objectFit: "contain" }}
          />
        </Link>

        {/* Sense of Place Widget (Center) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
            background: scrolled ? "rgba(255,255,255,0.7)" : "rgba(255, 255, 255, 0.4)",
            border: "1px solid rgba(50, 60, 45, 0.1)",
            padding: "0.5rem 1.25rem",
            borderRadius: "2rem",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            transition: "all 500ms ease",
            color: "#323C2D",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Accra, GH</span>
          </div>
          
          <div style={{ width: "1px", height: "12px", background: "rgba(50, 60, 45, 0.2)" }} />
          
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 600 }}>28°C</span>
          </div>

          <div style={{ width: "1px", height: "12px", background: "rgba(50, 60, 45, 0.2)" }} />

          <TimeDisplay />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flex: 1, justifyContent: "flex-end" }}>
          
          {/* Menu button */}
          <button
            onClick={() => setMenuOpen(true)}
            style={{
              display: "flex",
              alignItems: "center",
              height: "40px",
              gap: "0.5rem",
              background: "rgba(50, 60, 45, 0.95)", // dark green pill
              border: "none",
              borderRadius: "2rem",
              padding: "0 0.375rem 0 1.25rem",
              color: "#fff",
              fontFamily: "var(--font-body)",
              fontSize: "0.875rem",
              cursor: "pointer",
              backdropFilter: "blur(8px)",
            }}
          >
            <span style={{ fontWeight: 500 }}>Menu</span>
            <span
              style={{
                background: "#fff",
                color: "#323C2D",
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "0.25rem",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="5" x2="19" y2="19"></line>
                <polyline points="5 19 19 19 19 5"></polyline>
              </svg>
            </span>
          </button>
        </div>
      </nav>

      {/* Full-screen Menu Overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "#364132", // dark green background
          zIndex: 200,
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "opacity 400ms ease",
          display: "flex",
          flexDirection: "column",
          padding: "2.5rem 4rem",
          color: "#E8EAE6",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "3rem", fontWeight: 300, maxWidth: "500px" }}>
            Our retreats, made to last
          </h2>
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "transparent",
              border: "none",
              color: "#fff",
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            <span style={{ fontWeight: 500 }}>Close</span>
            <span
              style={{
                background: "#E8EAE6",
                color: "#364132",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "0.5rem",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </span>
          </button>
        </div>

        <div style={{ display: "flex", gap: "6rem", flex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Link href="#about" onClick={() => setMenuOpen(false)} style={{ color: "#fff", textDecoration: "none", fontSize: "2rem", fontFamily: "var(--font-display)" }}>About us</Link>
            <Link href="#news" onClick={() => setMenuOpen(false)} style={{ color: "#fff", textDecoration: "none", fontSize: "2rem", fontFamily: "var(--font-display)" }}>News</Link>
            <Link href="#faq" onClick={() => setMenuOpen(false)} style={{ color: "#fff", textDecoration: "none", fontSize: "2rem", fontFamily: "var(--font-display)" }}>FAQ</Link>
            <Link href="#contact" onClick={() => setMenuOpen(false)} style={{ color: "#fff", textDecoration: "none", fontSize: "2rem", fontFamily: "var(--font-display)" }}>Contact</Link>

            <Link href="#what-is-haven" onClick={() => setMenuOpen(false)} style={{ color: "#fff", textDecoration: "none", fontSize: "1.25rem", fontFamily: "var(--font-body)", marginTop: "auto", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              What is Haven? <span style={{ fontSize: "0.8em" }}>↗</span>
            </Link>
          </div>

          <div style={{ display: "flex", gap: "4rem" }}>
            {navSections.map((section, idx) => (
              <div key={idx}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", marginBottom: "1.5rem", fontWeight: 300, borderBottom: "1px solid rgba(255,255,255,0.2)", paddingBottom: "1rem" }}>
                  {section.title}
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {section.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.875rem",
                        color: "rgba(255,255,255,0.7)",
                        textDecoration: "none",
                        transition: "color 200ms",
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ flex: 1, position: "relative", borderRadius: "16rem 16rem 0 0", overflow: "hidden", marginLeft: "4rem" }}>
            <img src="/hero-bg.jpg" alt="Menu backdrop" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.8 }} />
          </div>
        </div>
      </div>
    </>
  );
}
