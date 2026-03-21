import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Charterwell — The AI Claims Intelligence Workspace",
    template: "%s | Charterwell",
  },
  description:
    "The AI-native claims intelligence workspace. Every document understood. Every decision informed. Every claim connected.",
  metadataBase: new URL("https://charterwell.ai"),
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
