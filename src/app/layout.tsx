import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import PageTransition from "@/components/layout/PageTransition";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AvailabilityFloater from "@/components/ui/AvailabilityFloater";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const viewport: Viewport = {
  themeColor: "#0E0D0C",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Haven — Luxury Coastal Retreat, Accra",
    template: "%s | Haven",
  },
  description:
    "An intimate luxury retreat on the Ghanaian coast. Twelve private residences, curated calm, and the unhurried rhythm of coastal living.",
  keywords: ["luxury hotel", "Ghana", "Accra", "boutique resort", "beach retreat", "Haven"],
  authors: [{ name: "Rubicx", url: "https://rubicx.io" }],
  creator: "Rubicx",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Haven",
    title: "Haven — Luxury Coastal Retreat, Accra",
    description:
      "An intimate luxury retreat on the Ghanaian coast. Twelve private residences, curated calm.",
    images: [
      {
        url: "/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Haven Resort — Accra, Ghana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Haven — Luxury Coastal Retreat, Accra",
    description:
      "An intimate luxury retreat on the Ghanaian coast. Twelve private residences, curated calm.",
    images: ["/hero-bg.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SmoothScrollProvider>
          <PageTransition />
          <Navbar />
          {children}
          <Footer />
        </SmoothScrollProvider>
        <AvailabilityFloater />
      </body>
    </html>
  );
}
