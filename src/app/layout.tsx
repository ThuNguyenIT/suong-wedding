import type { Metadata } from 'next'
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google'
import './globals.css'
import RightSocial from '@/components/right-social'
import StructuredData from '@/components/seo/structured-data'
import Analytics from '@/components/seo/analytics'
import { Toaster } from '@/components/ui/sonner'
import { SpeedInsights } from '@vercel/speed-insights/next'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: {
    default: `${process.env.NEXT_PUBLIC_APP_NAME} - Dịch Vụ Cưới Hỏi Chuyên Nghiệp`,
    template: `%s | ${process.env.NEXT_PUBLIC_APP_NAME}`,
  },
  description:
    'Sương Wedding cung cấp dịch vụ cưới hỏi chuyên nghiệp với thiết kế đẹp mắt, trang trí cưới hỏi độc đáo và dịch vụ hoàn hảo. Liên hệ ngay để có ngày cưới mơ ước!',
  keywords: [
    'dịch vụ cưới hỏi',
    'trang trí cưới hỏi',
    'wedding planner',
    'thiết kế cưới hỏi',
    'dịch vụ cưới',
    'wedding decoration',
    'cưới hỏi chuyên nghiệp',
    `${process.env.NEXT_PUBLIC_APP_NAME}`,
  ],
  authors: [{ name: `${process.env.NEXT_PUBLIC_APP_NAME}` }],
  creator: `${process.env.NEXT_PUBLIC_APP_NAME}`,
  publisher: `${process.env.NEXT_PUBLIC_APP_NAME}`,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || '/'),
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: '/',
    title: `${process.env.NEXT_PUBLIC_APP_NAME} - Dịch Vụ Cưới Hỏi Chuyên Nghiệp`,
    description:
      'Sương Wedding cung cấp dịch vụ cưới hỏi chuyên nghiệp với thiết kế đẹp mắt, trang trí cưới hỏi độc đáo và dịch vụ hoàn hảo.',
    siteName: `${process.env.NEXT_PUBLIC_APP_NAME}`,
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: `${process.env.NEXT_PUBLIC_APP_NAME} - Dịch vụ cưới hỏi chuyên nghiệp`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@suongwedding',
    creator: '@suongwedding',
    title: `${process.env.NEXT_PUBLIC_APP_NAME} - Dịch Vụ Cưới Hỏi Chuyên Nghiệp`,
    description:
      'Sương Wedding cung cấp dịch vụ cưới hỏi chuyên nghiệp với thiết kế đẹp mắt, trang trí cưới hỏi độc đáo và dịch vụ hoàn hảo.',
    images: ['/logo.png'],
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL || '/',
    languages: {
      'vi-VN': process.env.NEXT_PUBLIC_APP_URL || '/',
      'en-US': process.env.NEXT_PUBLIC_APP_URL || '/',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.ico', type: 'image/png' },
    ],
    apple: [{ url: '/favicon.ico', sizes: '180x180', type: 'image/png' }],
    shortcut: '/favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || '',
    yandex: process.env.YANDEX_SITE_VERIFICATION || '',
  },
  manifest: '/manifest.json',
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': process.env.NEXT_PUBLIC_APP_NAME || '',
    'application-name': process.env.NEXT_PUBLIC_APP_NAME || '',
    'msapplication-TileColor': '#ffffff',
    'theme-color': '#ffffff',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='vi' className='system-ui'>
      <head>
        <StructuredData type='LocalBusiness' />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased overflow-x-hidden`}
        suppressHydrationWarning={true}
      >
        <Analytics />
        <Toaster position='top-right' />
        {children}
        <SpeedInsights />
        <RightSocial />
      </body>
    </html>
  )
}
