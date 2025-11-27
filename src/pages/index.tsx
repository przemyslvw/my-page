import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
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
                <span className="text--gradient">MAJDAK ONLINE</span>
              </Heading>
              <p className="hero__subtitle">🚀 Więcej klientów 🔧 Mniej pracy 💸 Większy zysk ⚙️</p>
              <p className="hero__description">
                Wspieramy firmy w osiąganiu realnych rezultatów: oszczędności czasu, większych przychodów i spokoju
                operacyjnego. Automatyzujemy, zabezpieczamy i budujemy systemy, które po prostu działają. Od koncepcji,
                przez projekt, aż po wdrożenie i utrzymanie.
              </p>
              <div className={styles.buttons}>
                <Link className="button button--primary button--lg" to="/docs/intro">
                  <i className="fas fa-book"></i> Dokumentacja
                </Link>
                <Link className="button button--secondary button--lg" to="/blog">
                  <i className="fas fa-newspaper"></i> Blog
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
  return (
    <>
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
