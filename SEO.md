# SEO Configuration Guide - Sương Wedding

## 🎯 Tổng quan SEO

Website Sương Wedding đã được tối ưu hóa SEO toàn diện với các tính năng sau:

### ✅ Đã hoàn thành:

1. **Meta Tags & Open Graph**
   - Title và description tối ưu
   - Open Graph cho Facebook
   - Twitter Cards
   - Keywords và author tags

2. **Structured Data (JSON-LD)**
   - LocalBusiness schema
   - Organization schema
   - Service schema
   - Breadcrumb schema

3. **Technical SEO**
   - Sitemap.xml tự động
   - Robots.txt tối ưu
   - Canonical URLs
   - Mobile-friendly

4. **Performance**
   - Image optimization
   - Font optimization
   - CSS optimization

## 🚀 Cấu hình cần thiết

### 1. Environment Variables

Tạo file `.env.local` với các biến sau:

```env
# SEO Configuration
NEXT_PUBLIC_APP_URL=https://suongwedding.com
GOOGLE_SITE_VERIFICATION=your_google_verification_code_here

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Social Media
NEXT_PUBLIC_FACEBOOK_APP_ID=your_facebook_app_id
NEXT_PUBLIC_TWITTER_HANDLE=@suongwedding
```

### 2. Google Search Console

1. Đăng ký website tại [Google Search Console](https://search.google.com/search-console)
2. Thêm verification code vào `GOOGLE_SITE_VERIFICATION`
3. Submit sitemap: `https://suongwedding.com/sitemap.xml`

### 3. Google Analytics

1. Tạo GA4 property tại [Google Analytics](https://analytics.google.com)
2. Thêm GA ID vào `NEXT_PUBLIC_GA_ID`
3. Cấu hình goals và conversions

## 📊 SEO Components

### StructuredData Component

```tsx
import { StructuredData } from "@/components/seo";

// Sử dụng trong layout
<StructuredData type="LocalBusiness" />;
```

### SEOHead Component

```tsx
import { SEOHead } from "@/components/seo";

<SEOHead
  title="Trang Dịch Vụ - Sương Wedding"
  description="Dịch vụ cưới hỏi chuyên nghiệp..."
  keywords={["dịch vụ cưới", "wedding planner"]}
  url="/services"
/>;
```

### Breadcrumb Component

```tsx
import { Breadcrumb } from "@/components/seo";

<Breadcrumb
  items={[
    { name: "Trang chủ", href: "/" },
    { name: "Dịch vụ", href: "/services" },
    { name: "Trang trí cưới", href: "/services/decoration" },
  ]}
/>;
```

## 🎨 SEO Best Practices

### 1. Content Optimization

- **Title**: 50-60 ký tự, chứa từ khóa chính
- **Description**: 150-160 ký tự, mô tả hấp dẫn
- **Keywords**: Tập trung vào từ khóa địa phương
- **Images**: Alt text mô tả chi tiết

### 2. Technical SEO

- **Page Speed**: Tối ưu images và CSS
- **Mobile-First**: Responsive design
- **HTTPS**: SSL certificate
- **Core Web Vitals**: LCP, FID, CLS

### 3. Local SEO

- **Google My Business**: Đăng ký và tối ưu
- **Local Keywords**: "cưới hỏi Hà Nội", "wedding planner TP.HCM"
- **NAP Consistency**: Name, Address, Phone
- **Reviews**: Khuyến khích khách hàng review

## 📈 Monitoring & Analytics

### 1. Google Search Console

- Monitor search performance
- Check indexing status
- Fix crawl errors
- Track keyword rankings

### 2. Google Analytics

- Track user behavior
- Monitor conversion rates
- Analyze traffic sources
- Set up goals

### 3. SEO Tools

- **Ahrefs**: Keyword research
- **SEMrush**: Competitor analysis
- **Screaming Frog**: Technical SEO audit

## 🔧 Maintenance

### Weekly Tasks

- [ ] Check Google Search Console for errors
- [ ] Monitor page speed scores
- [ ] Update content with fresh keywords
- [ ] Check mobile usability

### Monthly Tasks

- [ ] Analyze keyword rankings
- [ ] Review competitor strategies
- [ ] Update structured data
- [ ] Optimize underperforming pages

### Quarterly Tasks

- [ ] Complete SEO audit
- [ ] Update meta descriptions
- [ ] Refresh content strategy
- [ ] Review technical SEO

## 📞 Support

Nếu cần hỗ trợ về SEO, liên hệ:

- Email: info@suongwedding.com
- Phone: 0359998753
- Facebook: https://www.facebook.com/suongwedding

---

**Lưu ý**: SEO là quá trình dài hạn, cần thời gian để thấy kết quả. Hãy kiên trì và theo dõi metrics thường xuyên.
