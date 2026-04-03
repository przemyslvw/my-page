import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import BuyMeACoffee from '@site/src/components/BuyMeACoffee';
import Heading from '@theme/Heading';
import ParticleBackground from '@site/src/components/ParticleBackground';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx( styles.heroBanner)}>
      <div className="container">
        <div className="row">
          <div className="col col--6 col--offset-3">
            <div className={styles.contentWrapper}>
              <Heading as="h1" className="hero__title">
                <img src="/img/logo.png" alt="MAJDAK.ONLINE Logo" style={{ width: '240px', height: 'auto' }} />
                <br />
                <span className="text--gradient">MAJDAK.ONLINE ENGINEERING HUB</span>
              </Heading>
              <p className="hero__subtitle">Zaawansowana Inżynieria IT, Sec-Ops i Automatyzacja.</p>
              <p className="hero__description">
                Projektujemy skalowalną architekturę i zabezpieczamy krytyczną infrastrukturę cyfrową. Od inżynierii niskopoziomowej w systemach wbudowanych (IoT, esp-idf), przez ofensywne testy penetracyjne, aż po automatyzację procesów i wysokowydajny backend. Stawiamy na security-by-design z wojskowym rygorem operacyjnym.
              </p>
              <div className={styles.buttons}>
                <Link className="button button--primary button--lg" to="/docs/intro">
                  <i className="fas fa-book"></i> Docs / Specs
                </Link>
                <Link className="button button--secondary button--lg" to="/blog">
                  <i className="fas fa-satellite-dish"></i> Research / Base
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  
  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": "https://www.majdak.online/#organization",
        "name": "MAJDAK.ONLINE - Engineering Hub",
        "description": "Zaawansowana inżynieria systemowa, automatyzacja procesów oraz cyberbezpieczeństwo (Red Teaming).",
        "url": "https://www.majdak.online",
        "email": "kontakt@baluarte.pl",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "18"
        }
      },
      {
        "@type": "ItemList",
        "name": "Core Engineering Capabilities",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@type": "Service",
              "name": "Offensive Security & Red Teaming",
              "description": "Audyty bezpieczeństwa, footprinting oraz wektoryzacja ataków sieciowych w oparciu o Kali Linux i OWASP."
            }
          },
          {
            "@type": "ListItem",
            "position": 2,
            "item": {
              "@type": "Service",
              "name": "Process Automation & System Interoperability",
              "description": "E2E automatyzacja (n8n, Python), logika asynchroniczna mikroserwisów oraz testy automatyczne Playwright."
            }
          },
          {
            "@type": "ListItem",
            "position": 3,
            "item": {
              "@type": "Service",
              "name": "Embedded Systems & Technical Training",
              "description": "Konfiguracje sprzętowe (ESP-IDF, sensoryka), translacja standardów wojskowych (Link 16) oraz szkolenia techniczne."
            }
          }
        ]
      },
      {
        "@type": "Review",
        "itemReviewed": { "@id": "https://www.majdak.online/#organization" },
        "author": { "@type": "Person", "name": "Piotr R., CISO" },
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "reviewBody": "Audyt infrastruktury sieciowej oraz próby penetracyjne ujawniły niewidoczne wektory. Raport techniczny stał na niesamowicie wysokim poziomie."
      },
      {
        "@type": "Review",
        "itemReviewed": { "@id": "https://www.majdak.online/#organization" },
        "author": { "@type": "Person", "name": "Kamil W., Lead DevOps" },
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "reviewBody": "Migracja do logiki event-driven przy wykorzystaniu n8n przebiegła bez spadku performance'u bazy danych."
      },
      {
        "@type": "Review",
        "itemReviewed": { "@id": "https://www.majdak.online/#organization" },
        "author": { "@type": "Person", "name": "Tomasz K., Embedded Engineer" },
        "reviewRating": { "@type": "Rating", "ratingValue": "4.8", "bestRating": "5" },
        "reviewBody": "Szkolenia techniczne i twarda dokumentacja - zwłaszcza z procedur C2 / protokołów MIDS i Link 16 udowadniają ekspercki narzut wiedzowy. Polecamy usługi na poziomie R&D."
      }
    ]
  };

  return (
    <>
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(jsonLdData)}
        </script>
      </Head>
      <ParticleBackground />
      <Layout
        title={`${siteConfig.title}`}
        description="Wspieramy firmy w osiąganiu realnych wyników: oszczędności czasu, większych przychodów i spokoju operacyjnego. Automatyzujemy, zabezpieczamy i budujemy systemy, które po prostu działają. Od koncepcji, przez projekt, aż po wdrożenie i utrzymanie.">
        <HomepageHeader />
        <main>
          <HomepageFeatures />
        </main>
      </Layout>
    </>
  );
}
