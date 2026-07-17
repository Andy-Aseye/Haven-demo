"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  Mountains,
  Shower,
  Drop,
  CarProfile,
  WifiHigh,
  Door,
  Bed,
  Leaf,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react/dist/ssr";
import { gsap, useGSAP } from "@/lib/gsap";
import residences from "@/data/residences";

type Tab = "Rooms" | "Amenities" | "Sustainability";

export default function LivingSection() {
  const [activeTab, setActiveTab] = useState<Tab>("Rooms");
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const culinaryRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Header reveal
    if (headerRef.current) {
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }

    // Cards stagger inside the interactive area
    if (carouselRef.current) {
      const cards = carouselRef.current.children;
      gsap.from(cards, {
        scrollTrigger: {
          trigger: carouselRef.current,
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    }

    // Culinary footer reveal
    if (culinaryRef.current) {
      gsap.from(culinaryRef.current.children, {
        scrollTrigger: {
          trigger: culinaryRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      });
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollAmount = clientWidth * 0.5; // Scroll by half a visible width
      carouselRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section ref={sectionRef} style={{ backgroundColor: "#fff", padding: "6rem 2.5rem" }}>
      {/* Top Header */}
      <div
        ref={headerRef}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          width: "100%",
          margin: "0 auto",
          marginBottom: "3rem",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 3vw, 2.5rem)",
            fontWeight: 400,
            color: "#2C2C2C",
            margin: 0,
          }}
        >
          Stylish and Comfortable Living
        </h2>
        <div style={{ maxWidth: "450px" }}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
              color: "#666",
              lineHeight: 1.6,
              marginBottom: "1.5rem",
              marginTop: 0,
            }}
          >
            Enjoy stunning ocean views, warm colors, and thoughtful details that
            make you feel right at home.
          </p>
          <button
            style={{
              border: "1px solid #ccc",
              borderRadius: "2rem",
              padding: "0.75rem 1.5rem",
              background: "transparent",
              color: "#333",
              fontSize: "0.875rem",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            Discover Rooms →
          </button>
        </div>
      </div>

      {/* Main Interactive Area */}
      <div
        style={{
          position: "relative",
          width: "100%",
          margin: "0 auto",
          height: "85vh",
          borderRadius: "24px",
          overflow: "hidden",
          backgroundColor: "#d9d9d9", // fallback
        }}
      >
        {/* Background Image */}
        <Image
          src="/living-bg.png"
          alt="Living Background"
          fill
          style={{
            objectFit: "cover",
            filter: activeTab !== "Rooms" ? "brightness(0.7)" : "brightness(0.9)",
            transition: "filter 0.5s ease",
          }}
        />

        {/* Tab Navigation */}
        <div
          style={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            zIndex: 10,
            display: "flex",
            background: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderRadius: "2rem",
            padding: "0.25rem",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }}
        >
          {[
            { id: "Rooms", icon: <Door size={18} /> },
            { id: "Amenities", icon: <Bed size={18} /> },
            { id: "Sustainability", icon: <Leaf size={18} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              style={{
                background: activeTab === tab.id ? "#fff" : "transparent",
                color: activeTab === tab.id ? "#333" : "#fff",
                border: "none",
                borderRadius: "2rem",
                padding: "0.6rem 1.25rem",
                fontSize: "0.875rem",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              {tab.icon}
              {tab.id}
            </button>
          ))}
        </div>

        {/* Tab Content: Rooms */}
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            width: "100%",
            height: "100%",
            pointerEvents: activeTab === "Rooms" ? "auto" : "none",
            opacity: activeTab === "Rooms" ? 1 : 0,
            transition: "opacity 0.4s ease",
            display: "flex",
            alignItems: "flex-end",
            padding: "0 2rem",
          }}
        >
          {/* Rooms Content */}
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
              padding: "4rem 0",
              alignItems: "center",
            }}
          >
            {/* Intro Text over Rooms */}
            <div
              style={{
                flex: "0 0 35%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                color: "#fff",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 3vw, 2.5rem)",
                  fontWeight: 400,
                  margin: 0,
                  lineHeight: 1.3,
                  textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                }}
              >
                Cozy comfort rooms<br />and spacious<br />apartments
              </h3>
            </div>

            {/* Room Cards Carousel */}
            <div
              ref={carouselRef}
              style={{
                flex: "1",
                display: "flex",
                gap: "1.5rem",
                overflowX: "auto",
                scrollbarWidth: "none",
                paddingBottom: "1rem",
                scrollBehavior: "smooth",
              }}
            >
                {residences.map((r) => (
                  <Link
                  key={r.id}
                  href={`/residences/${r.id}`}
                  style={{ textDecoration: "none", flexShrink: 0, width: "26vw", minWidth: "300px", display: "block" }}
                >
                  <div
                    style={{
                      background: "#fff",
                      borderRadius: "2rem",
                      overflow: "hidden",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                      cursor: "pointer",
                      transition: "transform 300ms ease, box-shadow 300ms ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "0 20px 40px rgba(0,0,0,0.2)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "0 10px 30px rgba(0,0,0,0.15)";
                    }}
                  >
                    <div style={{ position: "relative", height: "260px", width: "100%" }}>
                      <Image
                        src={r.image}
                        alt={r.name}
                        fill
                        style={{ objectFit: "cover", borderTopLeftRadius: "2rem", borderTopRightRadius: "2rem" }}
                        sizes="26vw"
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: "1.25rem",
                          left: "1.25rem",
                          background: "rgba(255,255,255,0.2)",
                          border: "1px solid #fff",
                          backdropFilter: "blur(8px)",
                          padding: "0.25rem 0.875rem",
                          borderRadius: "2rem",
                          fontSize: "0.875rem",
                          fontWeight: 400,
                          color: "#fff",
                        }}
                      >
                        From ${r.pricePerNight.toLocaleString()}
                      </div>
                      <div
                        style={{
                          position: "absolute",
                          bottom: "1rem",
                          right: "1rem",
                          background: "rgba(0,0,0,0.5)",
                          backdropFilter: "blur(8px)",
                          border: "1px solid rgba(255,255,255,0.2)",
                          borderRadius: "2rem",
                          padding: "0.2rem 0.6rem",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.3rem",
                        }}
                      >
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" />
                        </svg>
                        <span style={{ fontFamily: "var(--font-body)", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.06em", color: "rgba(255,255,255,0.8)", textTransform: "uppercase" }}>360°</span>
                      </div>
                    </div>
                    <div style={{ padding: "1.5rem 1.5rem 2rem" }}>
                      <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "1.5rem", color: "#544E45", fontWeight: 400, fontFamily: "var(--font-display)" }}>
                        {r.name}
                      </h4>
                      <p style={{ margin: "0 0 1rem 0", fontSize: "0.8rem", color: "#C9A96E", fontFamily: "var(--font-body)", fontStyle: "italic" }}>
                        {r.tagline}
                      </p>
                      <p style={{ margin: 0, fontSize: "0.9375rem", color: "#544E45", lineHeight: 1.6, opacity: 0.9, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {r.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Arrow Buttons Overlay */}
          <div style={{ position: "absolute", bottom: "2rem", left: "35%", display: "flex", gap: "1rem" }}>
            <button 
              onClick={() => scroll("left")}
              style={{ width: "40px", height: "40px", borderRadius: "50%", background: "transparent", border: "1px solid rgba(255,255,255,0.5)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s" }}
              onMouseOver={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#333"; }}
              onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#fff"; }}
            >
              <CaretLeft size={20} />
            </button>
            <button 
              onClick={() => scroll("right")}
              style={{ width: "40px", height: "40px", borderRadius: "50%", background: "transparent", border: "1px solid rgba(255,255,255,0.5)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s" }}
              onMouseOver={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#333"; }}
              onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#fff"; }}
            >
              <CaretRight size={20} />
            </button>
          </div>
        </div>

        {/* Tab Content: Amenities */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: activeTab === "Amenities" ? "auto" : "none",
            opacity: activeTab === "Amenities" ? 1 : 0,
            transition: "opacity 0.4s ease",
            display: "flex",
            padding: "2rem",
            alignItems: "center",
          }}
        >
          <div style={{ flex: 1, paddingRight: "4rem" }}>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2.5rem",
                fontWeight: 400,
                color: "#fff",
                margin: 0,
                lineHeight: 1.3,
                textShadow: "0 2px 10px rgba(0,0,0,0.3)",
              }}
            >
              All rooms offer comfy beds, modern baths, Wi-Fi, and scenic views.
            </h3>
          </div>
          <div
            style={{
              flex: 1,
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1rem",
            }}
          >
            {[
              { icon: <Users size={32} />, label: "Family Friendly" },
              { icon: <Mountains size={32} />, label: "Ocean View" },
              { icon: <Shower size={32} />, label: "Rain shower" },
              { icon: <Drop size={32} />, label: "Spa Access" },
              { icon: <CarProfile size={32} />, label: "Valet Parking" },
              { icon: <WifiHigh size={32} />, label: "WiFi Access" },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "1rem",
                  padding: "1.5rem 1rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1rem",
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                {item.icon}
                <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tab Content: Sustainability */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: activeTab === "Sustainability" ? "auto" : "none",
            opacity: activeTab === "Sustainability" ? 1 : 0,
            transition: "opacity 0.4s ease",
            display: "flex",
            padding: "2rem",
            alignItems: "center",
          }}
        >
          <div style={{ flex: 1, paddingRight: "4rem" }}>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2.5rem",
                fontWeight: 400,
                color: "#fff",
                margin: 0,
                lineHeight: 1.3,
                textShadow: "0 2px 10px rgba(0,0,0,0.3)",
              }}
            >
              We prioritize natural materials and local products in our interior design.
            </h3>
          </div>
          <div
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "1rem",
              padding: "3rem",
              color: "#fff",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "3rem",
            }}
          >
            <div>
              <div style={{ fontSize: "2rem", fontWeight: 400, marginBottom: "0.5rem" }}>100%</div>
              <div style={{ fontSize: "0.875rem", opacity: 0.9 }}>Renewable energy</div>
            </div>
            <div>
              <div style={{ fontSize: "2rem", fontWeight: 400, marginBottom: "0.5rem" }}>0 km</div>
              <div style={{ fontSize: "0.875rem", opacity: 0.9 }}>Local produce</div>
            </div>
            <div>
              <div style={{ fontSize: "2rem", fontWeight: 400, marginBottom: "0.5rem" }}>80%+</div>
              <div style={{ fontSize: "0.875rem", opacity: 0.9 }}>Guests choose eco housekeeping</div>
            </div>
            <div>
              <div style={{ fontSize: "2rem", fontWeight: 400, marginBottom: "0.5rem" }}>200+</div>
              <div style={{ fontSize: "0.875rem", opacity: 0.9 }}>Native plants in our garden</div>
            </div>
          </div>
        </div>
      </div>

      {/* Culinary Footer */}
      <div
        ref={culinaryRef}
        style={{
          maxWidth: "1000px",
          margin: "6rem auto 0",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ marginBottom: "1rem", color: "#D2BCA0" }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4.5 15L3 7l5.5 3L12 4l3.5 6L21 7l-1.5 8H4.5z" />
            <path d="M4.5 15v2a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-2" />
          </svg>
        </div>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.9rem, 3.0rem, 3.4rem)",
            fontWeight: 400,
            color: "#544E45",
            marginBottom: "1.5rem",
          }}
        >
          Culinary Highlights at Haven
        </h3>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1.5rem",
            color: "#544E45",
            lineHeight: 1.8,
            marginBottom: "2.5rem",
            opacity: 0.9,
            width: "90vw",
          }}
        >
          At Haven, a feast for the senses awaits. Our chefs delight you with a selection of regional 
          specialties and fine wines. Start your day with our rich breakfast, featuring homemade jams, 
          fresh bread, and local delicacies. In the evening, enjoy creative dishes that blend 
          traditional West African cuisine with modern flair.
        </p>
        <button
          style={{
            border: "1px solid #B0A597",
            borderRadius: "3rem",
            padding: "0.875rem 2rem",
            background: "transparent",
            color: "#544E45",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "all 0.2s",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          Our Culinary Delight <span style={{ fontWeight: 300 }}>→</span>
        </button>
      </div>
    </section>
  );
}
