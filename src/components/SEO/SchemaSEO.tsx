import React from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';

interface SchemaSEOProps {
  isBlogPost?: boolean;
  isDoc?: boolean;
  postData?: any;
  docData?: any;
}

const SchemaSEO: React.FC<SchemaSEOProps> = () => {
  const { siteConfig } = useDocusaurusContext();
  const { pathname } = useLocation();
  const baseUrl = siteConfig.url;

  // 1. Global Organization Schema
  const organizationSchema = {
    "@type": "ProfessionalService",
    "@id": `${baseUrl}/#organization`,
    "name": "MAJDAK.ONLINE - Engineering Hub",
    "url": baseUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${baseUrl}/img/logo.png`
    },
    "description": "Zaawansowana inżynieria systemowa, automatyzacja procesów oraz cyberbezpieczeństwo (Red Teaming).",
    "email": "kontakt@baluarte.pl",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "18"
    },
    "review": [
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Piotr R., CISO" },
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "reviewBody": "Audyt infrastruktury sieciowej oraz próby penetracyjne ujawniły niewidoczne wektory. Raport techniczny stał na niesamowicie wysokim poziomie."
      },
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Kamil W., Lead DevOps" },
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "reviewBody": "Migracja do logiki event-driven przy wykorzystaniu n8n przebiegła bez spadku performance'u bazy danych."
      },
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Tomasz K., Embedded Engineer" },
        "reviewRating": { "@type": "Rating", "ratingValue": "4.8", "bestRating": "5" },
        "reviewBody": "Szkolenia techniczne i twarda dokumentacja - zwłaszcza z procedur C2 / protokołów MIDS i Link 16 udowadniają ekspercki narzut wiedzowy."
      }
    ],
    "sameAs": [
      "https://github.com/przemyslvw",
      "https://x.com/przemyslvw",
      "https://www.instagram.com/przemas.ts/"
    ]
  };

  // 2. WebSite Schema
  const websiteSchema = {
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    "url": baseUrl,
    "name": "MAJDAK.ONLINE",
    "description": siteConfig.tagline,
    "publisher": { "@id": `${baseUrl}/#organization` },
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${baseUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  // 3. Breadcrumb Schema (Generic Logic)
  const pathParts = pathname.split('/').filter(Boolean);
  const breadcrumbList: any[] = [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@id": baseUrl,
        "name": "Home"
      }
    }
  ];

  let currentPath = '';
  pathParts.forEach((part, index) => {
    currentPath += `/${part}`;
    
    // Humanize path part
    const name = part
      .replace(/-/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());

    breadcrumbList.push({
      "@type": "ListItem",
      "position": index + 2,
      "item": {
        "@id": `${baseUrl}${currentPath}`,
        "name": name
      }
    });
  });

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbList
  };

  const schemas: any[] = [organizationSchema, websiteSchema, breadcrumbSchema];

  // Note: For blog posts and docs, it's better to inject them from within their respective themes
  // or components to get full metadata (title, author, date, etc.).
  // However, we can add a basic "WebPage" schema globally.

  return (
    <Head>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": schemas
        })}
      </script>
    </Head>
  );
};

export default SchemaSEO;
