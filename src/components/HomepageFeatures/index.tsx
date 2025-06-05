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
    title: 'Cyberbezpieczeństwo i Bezpieczeństwo IT',
    Svg: require('@site/static/img/undraw_security.svg').default,
    description: (
      <>
        Zadbaj o bezpieczeństwo swoich danych i infrastruktury IT. Oferujemy audyty bezpieczeństwa, testy penetracyjne, wdrażanie standardów (m.in. ISO 27001) oraz ochronę aplikacji webowych i sieci firmowych.
      </>
    ),
  },
  {
    title: 'Automatyzacja i Programowanie',
    Svg: require('@site/static/img/undraw_programming.svg').default,
    description: (
      <>
        Optymalizuj procesy biznesowe i przyspiesz rozwój oprogramowania. Tworzymy dedykowane rozwiązania automatyzujące testy (Playwright, n8n), obsługę urządzeń IoT (ESP32, Raspberry Pi) i integracje API.
      </>
    ),
  },
  {
    title: 'Tworzenie Aplikacji Internetowych',
    Svg: require('@site/static/img/undraw_web_development.svg').default,
    description: (
      <>
        Tworzymy szybkie, skalowalne i nowoczesne aplikacje internetowe. Specjalizujemy się w technologiach Angular, Firebase i TypeScript, łącząc atrakcyjny frontend z wydajnym backendem. Od prototypu po produkcję.
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