import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import RightSocial from "@/components/right-social";
import StructuredData from "@/components/seo/structured-data";
import Analytics from "@/components/seo/analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Sương Wedding - Dịch Vụ Cưới Hỏi Chuyên Nghiệp",
    template: "%s | Sương Wedding",
  },
  description:
    "Sương Wedding cung cấp dịch vụ cưới hỏi chuyên nghiệp với thiết kế đẹp mắt, trang trí cưới hỏi độc đáo và dịch vụ hoàn hảo. Liên hệ ngay để có ngày cưới mơ ước!",
  keywords: [
    "dịch vụ cưới hỏi",
    "trang trí cưới hỏi",
    "wedding planner",
    "thiết kế cưới hỏi",
    "dịch vụ cưới",
    "wedding decoration",
    "cưới hỏi chuyên nghiệp",
    "Sương Wedding",
  ],
  authors: [{ name: "Sương Wedding" }],
  creator: "Sương Wedding",
  publisher: "Sương Wedding",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://suongwedding.com",
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "/",
    title: "Sương Wedding - Dịch Vụ Cưới Hỏi Chuyên Nghiệp",
    description:
      "Sương Wedding cung cấp dịch vụ cưới hỏi chuyên nghiệp với thiết kế đẹp mắt, trang trí cưới hỏi độc đáo và dịch vụ hoàn hảo.",
    siteName: "Sương Wedding",
    images: [
      {
        url: "/images/backgrounds/wedding-1.jpg",
        width: 1200,
        height: 630,
        alt: "Sương Wedding - Dịch vụ cưới hỏi chuyên nghiệp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sương Wedding - Dịch Vụ Cưới Hỏi Chuyên Nghiệp",
    description:
      "Sương Wedding cung cấp dịch vụ cưới hỏi chuyên nghiệp với thiết kế đẹp mắt, trang trí cưới hỏi độc đáo và dịch vụ hoàn hảo.",
    images: ["/images/backgrounds/wedding-1.jpg"],
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
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="system-ui">
      <head>
        <StructuredData type="LocalBusiness" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased overflow-x-hidden`}
        suppressHydrationWarning={true}
      >
        <Analytics />
        {children}
        <RightSocial />
      </body>
    </html>
  );
}
