"use client";

import { BRAND_NAME, MOBILE_NUMBER, FACEBOOK_URL } from "@/constants/common";

interface StructuredDataProps {
  type?: "Organization" | "LocalBusiness" | "Service";
  additionalData?: Record<string, unknown>;
}

export default function StructuredData({
  type = "LocalBusiness",
  additionalData = {},
}: StructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://suongwedding.com";

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND_NAME,
    url: baseUrl,
    logo: `${baseUrl}/logo.webp`,
    description:
      "Sương Wedding cung cấp dịch vụ cưới hỏi chuyên nghiệp với thiết kế đẹp mắt, trang trí cưới hỏi độc đáo và dịch vụ hoàn hảo",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: MOBILE_NUMBER,
      contactType: "customer service",
      availableLanguage: "Vietnamese",
    },
    sameAs: [FACEBOOK_URL],
    address: {
      "@type": "PostalAddress",
      addressCountry: "VN",
      addressLocality: "Việt Nam",
    },
  };

  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BRAND_NAME,
    url: baseUrl,
    logo: `${baseUrl}/logo.webp`,
    description:
      "Sương Wedding cung cấp dịch vụ cưới hỏi chuyên nghiệp với thiết kế đẹp mắt, trang trí cưới hỏi độc đáo và dịch vụ hoàn hảo",
    telephone: MOBILE_NUMBER,
    priceRange: "$$",
    currenciesAccepted: "VND",
    paymentAccepted: "Cash, Credit Card, Bank Transfer",
    openingHours: "Mo-Su 08:00-22:00",
    address: {
      "@type": "PostalAddress",
      addressCountry: "VN",
      addressLocality: "Việt Nam",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "10.8231",
      longitude: "106.6297",
    },
    areaServed: {
      "@type": "Country",
      name: "Vietnam",
    },
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: "10.8231",
        longitude: "106.6297",
      },
      geoRadius: "100000",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Dịch vụ cưới hỏi",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Trang trí cưới hỏi",
            description:
              "Dịch vụ trang trí cưới hỏi chuyên nghiệp với thiết kế độc đáo",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Wedding Planner",
            description: "Dịch vụ lên kế hoạch cưới hỏi hoàn chỉnh",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Thiết kế cưới hỏi",
            description: "Thiết kế concept cưới hỏi theo phong cách riêng",
          },
        },
      ],
    },
    sameAs: [FACEBOOK_URL],
    image: [
      `${baseUrl}/images/backgrounds/wedding-1.jpg`,
      `${baseUrl}/images/backgrounds/wedding-2.jpg`,
      `${baseUrl}/images/backgrounds/wedding-3.jpg`,
    ],
  };

  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Dịch vụ cưới hỏi chuyên nghiệp",
    description:
      "Sương Wedding cung cấp dịch vụ cưới hỏi chuyên nghiệp với thiết kế đẹp mắt, trang trí cưới hỏi độc đáo và dịch vụ hoàn hảo",
    provider: {
      "@type": "LocalBusiness",
      name: BRAND_NAME,
      telephone: MOBILE_NUMBER,
      url: baseUrl,
    },
    areaServed: {
      "@type": "Country",
      name: "Vietnam",
    },
    serviceType: "Wedding Planning and Decoration",
    category: "Event Planning",
  };

  const getStructuredData = () => {
    switch (type) {
      case "Organization":
        return { ...organizationData, ...additionalData };
      case "Service":
        return { ...serviceData, ...additionalData };
      case "LocalBusiness":
      default:
        return { ...localBusinessData, ...additionalData };
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData(), null, 2),
      }}
    />
  );
}
