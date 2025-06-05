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
                Specjalizacja w cyberbezpieczeństwie, innowacyjnych technologiach i rozwiązaniach IT - cyberbezpieczeństwo, automatyzacja, programowanie, web development
              </p>
              <p className="hero__description">
                Expertise w zakresie:
                <br />
                <span className="text--highlight">• Bezpieczeństwo IT i Cyberbezpieczeństwo (cybersecurity, IT security)</span>
                <br />
                <span className="text--highlight">• Automatyzacja i Programowanie (Automation, Programming)</span>
                <br />
                <span className="text--highlight">• Web Development i Aplikacje Internetowe (Web Development, Internet Applications)</span>
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
