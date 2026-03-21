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
  metadataBase: new URL("https://charterwell.ai"),
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
  },
  twitter: {
    card: "summary_large_image",
    title: "Charterwell — The AI Claims Intelligence Workspace",
    description:
      "The AI-native claims intelligence workspace. Every document understood. Every decision informed.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Charterwell",
    url: "https://charterwell.ai",
    logo: "https://charterwell.ai/logo-horizontal.svg",
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
      url: "https://charterwell.ai/contact",
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
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
