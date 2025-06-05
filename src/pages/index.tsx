import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className="row">
          <div className="col col--6 col--offset-3">
            <div className={styles.contentWrapper}>
              <Heading as="h1" className="hero__title">
                <span className="text--gradient">Majdak Think Tank</span>
              </Heading>
              <p className="hero__subtitle">
                Specjalizujemy się w cyberbezpieczeństwie, automatyzacji procesów i tworzeniu nowoczesnych aplikacji internetowych. Wspieramy firmy w bezpiecznej transformacji cyfrowej – od koncepcji po wdrożenie.
              </p>
              <p className="hero__description">
                Expertise w zakresie:
                <br />
                <span className="text--highlight">• Cyberbezpieczeństwo i Bezpieczeństwo IT - audyty bezpieczeństwa, testy penetracyjne, wdrażanie standardów (m.in. ISO 27001) oraz ochrona aplikacji webowych i sieci firmowych.</span>
                <br />
                <span className="text--highlight">• Automatyzacja i Programowanie - optymalizacja procesów biznesowych i przyspieszenie rozwoju oprogramowania.</span>
                <br />
                <span className="text--highlight">• Web Development i Aplikacje Internetowe - tworzenie aplikacji internetowych z wykorzystaniem Angulara, Firebase i TypeScript.</span>
              </p>
              <div className={styles.buttons}>
                <Link
                  className="button button--primary button--lg"
                  to="/docs/intro">
                  <i className="fas fa-book"></i> Dokumentacja
                </Link>
                <Link
                  className="button button--secondary button--lg"
                  to="/blog">
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
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
