/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_APP_URL || '/',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/_next/', '/static/', '/private/'],
      },
    ],
    additionalSitemaps: [`${process.env.NEXT_PUBLIC_APP_URL || ''}/sitemap.xml`],
  },
  exclude: ['/_next/*', '/static/*', '/private/*'],
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
}
