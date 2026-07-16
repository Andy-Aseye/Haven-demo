import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import LivingSection from "@/components/sections/LivingSection";
import SnapshotSection from "@/components/sections/SnapshotSection";
import PhilosophySection from "@/components/sections/PhilosophySection";
import FeaturesSection from "@/components/sections/FeaturesSection";

export const metadata: Metadata = {
  title: "Haven — Luxury Coastal Retreat, Accra",
  description:
    "An intimate luxury retreat on the Ghanaian coast. Twelve private residences, curated calm, and the unhurried rhythm of coastal living.",
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: "Haven",
  description:
    "An intimate luxury retreat on the Ghanaian coast. Twelve private residences, curated calm.",
  url: siteUrl,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Labadi Beach",
    addressLocality: "Accra",
    addressCountry: "GH",
  },
  telephone: "+233-30-000-0000",
  email: "info@havenresort.com",
  starRating: {
    "@type": "Rating",
    ratingValue: "5",
  },
  priceRange: "$$$",
  image: `${siteUrl}/hero-bg.jpg`,
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main style={{ display: "flex", flexDirection: "column", gap: "8vh" }}>
        <Hero />
        <LivingSection />
        <SnapshotSection />
        <PhilosophySection />
        <FeaturesSection />
      </main>
    </>
  );
}
