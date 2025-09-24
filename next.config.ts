import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: true, // Add trailing slash to URLs (SEO friendly)
  poweredByHeader: false, // Hide 'X-Powered-By: Next.js' header (Security)
  ...(process.env.NODE_ENV === 'development' && {
    onDemandEntries: {
      maxInactiveAge: 25 * 1000,
      pagesBufferLength: 2,
    },
  }),
  experimental: {
    serverActions: {
      bodySizeLimit: '20mb',
    },
    optimizeCss: true,
    optimizePackageImports: ['@next/image'],
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    loader: 'default',
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; img-src * blob: data:; font-src 'self' https: data:; connect-src *;",
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value:
              process.env.NODE_ENV === 'development'
                ? 'no-cache, no-store, must-revalidate'
                : 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value:
              process.env.NODE_ENV === 'development'
                ? 'no-cache, no-store, must-revalidate'
                : 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  webpack(config, { dev, isServer }) {
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            images: {
              test: /\.(png|jpe?g|gif|svg|webp|avif)$/i,
              name: 'images',
              chunks: 'all',
              priority: 10,
            },
          },
        },
      }
    }
    if (!dev && !isServer) {
      config.module.rules.push({
        test: /\.(png|jpe?g|gif|svg|webp|avif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'static/images/',
              publicPath: '/_next/static/images/',
              limit: 10 * 1024 * 1024, // 10MB
            },
          },
        ],
      })
    }
    return config
  },
  turbopack: {
    rules: {
      '*.{png,jpg,jpeg,gif,svg,webp,avif}': {
        loaders: ['file-loader'],
        as: '*.js',
      },
    },
  },
}

export default nextConfig
