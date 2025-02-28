import Navbar from "@/components/global/Navbar";
import dynamic from "next/dynamic";

const ScrollToTop = dynamic(() => import("@/components/ui/ScrollToTop"));
const GetTouchSection = dynamic(
  () => import("@/components/ui/GetTouchSection")
);
const Footer = dynamic(() => import("@/components/global/Footer"));
import "./globals.css";
import type { Metadata } from "next";
import { Mulish, Oswald } from "next/font/google";

const muli = Mulish({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Altıneller Spor Kulübü | Voleybol ve Basketbol",
  description:
    "Altıneller Spor Kulübü, İstanbul'da çocuklara voleybol ve basketbol eğitimi sunan profesyonel bir kulüptür. Bizimle spora adım atın!",
  keywords:
    "Altıneller, voleybol, basketbol, çocuk spor eğitimleri, çocuk basketbol, çocuk voleybol, spor kursları, yaz spor kampları",
  metadataBase: new URL("https://altinellersk.com"),
  alternates: {
    canonical: "https://altinellersk.com",
  },
  openGraph: {
    title: "Altıneller Spor Kulübü | Voleybol ve Basketbol",
    description:
      "Altıneller Spor Kulübü, İstanbul'da çocuklara voleybol ve basketbol eğitimi sunan profesyonel bir kulüptür. Bizimle spora adım atın!",
    url: "https://altinellersk.com",
    siteName: "Altıneller Spor Kulübü",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "https://altinellersk.com/assets/images/altineller-logo.webp",
        width: 1200,
        height: 630,
        alt: "Altıneller Spor Kulübü Logosu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Altıneller Spor Kulübü | Voleybol ve Basketbol",
    description:
      "Altıneller Spor Kulübü, İstanbul'da çocuklara voleybol ve basketbol eğitimi sunan profesyonel bir kulüptür. Bizimle spora adım atın!",
    images: ["https://altinellersk.com/assets/images/altineller-logo.webp"],
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0f3d76" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "96x96", type: "image/x-icon" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png", // Change this to point to the specific apple-touch icon
    shortcut: "/favicon.ico", // Correct usage of favicon.ico
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-192x192.png"
          sizes="192x192"
        />
        <link
          rel="apple-touch-icon"
          href="/favicon-192x192.png"
          sizes="192x192"
        />
        {/* <link
          rel="preload"
          as="image"
          href="https://ik.imagekit.io/dyw3rzban/M%C4%B0N%C4%B0K%20TAKIM/_IGP5496.JPG?updatedAt=1739119318202"
        />
        <link
          rel="preload"
          as="image"
          href="https://ik.imagekit.io/dyw3rzban/K%C3%9C%C3%87%C3%9CK%20A/_IGP5091.JPG?updatedAt=1739119466655"
        /> */}
        {/* Preconnect for faster font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${muli.className} ${oswald.className} antialiased`}>
        <Navbar />
        {children}
        <ScrollToTop />
        <GetTouchSection />
        <Footer />
      </body>
    </html>
  );
}
