import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Charterwell — The AI Claims Intelligence Workspace",
    template: "%s | Charterwell",
  },
  description:
    "The AI-native claims intelligence workspace. Every document understood. Every decision informed. Every claim connected.",
  metadataBase: new URL("https://charterwell.io"),
  keywords: [
    "Charterwell",
    "AI claims processing",
    "claims intelligence workspace",
    "insurance document intelligence",
    "claims automation",
    "insurance AI",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Charterwell",
    title: "Charterwell — The AI Claims Intelligence Workspace",
    description:
      "The AI-native claims intelligence workspace. Every document understood. Every decision informed. Every claim connected.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Charterwell — The AI Claims Intelligence Workspace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Charterwell — The AI Claims Intelligence Workspace",
    description:
      "The AI-native claims intelligence workspace. Every document understood. Every decision informed.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Charterwell",
    url: "https://charterwell.io",
    logo: "https://charterwell.io/logo-horizontal.svg",
    description:
      "The AI-native claims intelligence workspace for P&C insurance carriers.",
    foundingDate: "2026",
    sameAs: [],
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Charterwell",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "AI Claims Intelligence Workspace — document understanding, claims routing, compliance checking, and adjuster workflows in one platform.",
    offers: {
      "@type": "Offer",
      description: "Contact for pricing",
      url: "https://charterwell.io/contact",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
    </>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <JsonLd />
      </head>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-teal-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
