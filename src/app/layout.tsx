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
    default: `${process.env.NEXT_PUBLIC_APP_NAME} - Luxury Bridal & Makeup Studio in Tam Kỳ`,
    template: `%s | ${process.env.NEXT_PUBLIC_APP_NAME}`,
  },
  description: `Tại ${process.env.NEXT_PUBLIC_APP_NAME}, chúng tôi tin rằng mỗi câu chuyện tình yêu đều xứng đáng có những kỷ niệm vĩnh cửu. Studio của chúng tôi chuyên về áo cưới cao cấp, trang điểm chuyên nghiệp và chụp ảnh nghệ thuật, giúp cô dâu tỏa sáng trong ngày trọng đại.`,
  keywords: [
    'áo cưới Tam Kỳ',
    'studio áo cưới Tam Kỳ',
    'váy cưới đẹp Tam Kỳ',
    'chụp ảnh cưới Tam Kỳ',
    'trang điểm cô dâu Tam Kỳ',
    'áo cưới cao cấp',
    'váy cưới sang trọng',
    'studio áo cưới đẹp',
    'dịch vụ chụp ảnh cưới',
    'makeup cô dâu chuyên nghiệp',
    'chụp ảnh cưới nghệ thuật',
    'váy cưới phong cách Hàn Quốc',
    'thuê áo cưới cao cấp',
    'váy cưới hiện đại',
    'áo cưới đẹp Đà Nẵng',
    'studio ảnh cưới Đà Nẵng',
    'chụp ảnh cưới ngoại cảnh Tam Kỳ',
    'váy cưới lộng lẫy',
    'studio ảnh cưới sang trọng',
    'ảnh cưới đẹp lung linh',
    'luxury bridal studio',
    'wedding makeup artist',
    'bridal photography',
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
    title: `${process.env.NEXT_PUBLIC_APP_NAME} - Luxury Bridal & Makeup Studio in Tam Kỳ`,
    description: `Tại ${process.env.NEXT_PUBLIC_APP_NAME}, chúng tôi tin rằng mỗi câu chuyện tình yêu đều xứng đáng có những kỷ niệm vĩnh cửu. Studio của chúng tôi chuyên về áo cưới cao cấp, trang điểm chuyên nghiệp và chụp ảnh nghệ thuật.`,
    siteName: `${process.env.NEXT_PUBLIC_APP_NAME}`,
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: `${process.env.NEXT_PUBLIC_APP_NAME} - Luxury Bridal & Makeup Studio in Tam Kỳ`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@suongwedding',
    creator: '@suongwedding',
    title: `${process.env.NEXT_PUBLIC_APP_NAME} - Luxury Bridal & Makeup Studio in Tam Kỳ`,
    description: `Tại ${process.env.NEXT_PUBLIC_APP_NAME}, chúng tôi tin rằng mỗi câu chuyện tình yêu đều xứng đáng có những kỷ niệm vĩnh cửu. Studio của chúng tôi chuyên về áo cưới cao cấp, trang điểm chuyên nghiệp và chụp ảnh nghệ thuật.`,
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
      { url: '/fav.ico', sizes: 'any' },
      { url: '/fav.ico', type: 'image/png' },
    ],
    apple: [{ url: '/fav.ico', sizes: '180x180', type: 'image/png' }],
    shortcut: '/fav.ico',
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
