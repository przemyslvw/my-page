import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Bezpieczeństwo IT',
    Svg: require('@site/static/img/undraw_security.svg').default,
    description: (
      <>
        Zdobądź wiedzę z zakresu bezpieczeństwa sieciowego, webowego i cyberbezpieczeństwa. Poznaj techniki ochrony danych i zabezpieczania aplikacji.
      </>
    ),
  },
  {
    title: 'Automatyzacja i Programowanie',
    Svg: require('@site/static/img/undraw_programming.svg').default,
    description: (
      <>
        Naucz się automatyzować procesy, pisać testy end-to-end (Playwright) i realizować projekty z wykorzystaniem ESP32 oraz Raspberry Pi.
      </>
    ),
  },
  {
    title: 'Tworzenie Aplikacji Internetowych',
    Svg: require('@site/static/img/undraw_web_development.svg').default,
    description: (
      <>
        Projektowanie i tworzenie nowoczesnych stron oraz aplikacji webowych z wykorzystaniem Angulara, Firebase i TypeScript. Od pomysłu po wdrożenie.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}