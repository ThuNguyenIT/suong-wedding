'use client'

import Head from 'next/head'

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article'
  noindex?: boolean
  canonical?: string
}

export default function SEOHead({
  title = 'Sương Wedding - Dịch Vụ Cưới Hỏi Chuyên Nghiệp',
  description = 'Sương Wedding cung cấp dịch vụ cưới hỏi chuyên nghiệp với thiết kế đẹp mắt, trang trí cưới hỏi độc đáo và dịch vụ hoàn hảo. Liên hệ ngay để có ngày cưới mơ ước!',
  keywords = [
    'dịch vụ cưới hỏi',
    'trang trí cưới hỏi',
    'wedding planner',
    'thiết kế cưới hỏi',
    'dịch vụ cưới',
    'wedding decoration',
    'cưới hỏi chuyên nghiệp',
    'Sương Wedding',
  ],
  image = '/images/backgrounds/wedding-1.jpg',
  url = '/',
  type = 'website',
  noindex = false,
  canonical,
}: SEOHeadProps) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || '/'
  const fullUrl = `${baseUrl}${url}`
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`
  const canonicalUrl = canonical ? `${baseUrl}${canonical}` : fullUrl

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords.join(', ')} />
      <meta name='author' content='Sương Wedding' />
      <meta name='robots' content={noindex ? 'noindex,nofollow' : 'index,follow'} />
      <link rel='canonical' href={canonicalUrl} />

      {/* Open Graph Meta Tags */}
      <meta property='og:type' content={type} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:url' content={fullUrl} />
      <meta property='og:image' content={fullImageUrl} />
      <meta property='og:image:width' content='1200' />
      <meta property='og:image:height' content='630' />
      <meta property='og:image:alt' content={title} />
      <meta property='og:site_name' content='Sương Wedding' />
      <meta property='og:locale' content='vi_VN' />

      {/* Twitter Card Meta Tags */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={fullImageUrl} />
      <meta name='twitter:image:alt' content={title} />

      {/* Additional Meta Tags */}
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <meta name='theme-color' content='#847445' />
      <meta name='msapplication-TileColor' content='#847445' />
      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name='apple-mobile-web-app-status-bar-style' content='black-translucent' />
      <meta name='apple-mobile-web-app-title' content='Sương Wedding' />

      {/* Language and Geo Tags */}
      <meta name='language' content='Vietnamese' />
      <meta name='geo.region' content='VN' />
      <meta name='geo.country' content='Vietnam' />

      {/* Business/Contact Info */}
      <meta name='contact' content='0359998753' />
      <meta name='reply-to' content='info@suongwedding.com' />
      <meta name='owner' content='Sương Wedding' />
      <meta name='url' content={baseUrl} />
      <meta name='identifier-URL' content={baseUrl} />
      <meta name='category' content='Wedding Services' />
      <meta name='coverage' content='Vietnam' />
      <meta name='distribution' content='global' />
      <meta name='rating' content='general' />
      <meta name='revisit-after' content='7 days' />

      {/* Preconnect to external domains for performance */}
      <link rel='preconnect' href='https://fonts.googleapis.com' />
      <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
      <link rel='dns-prefetch' href='https://www.facebook.com' />
    </Head>
  )
}
