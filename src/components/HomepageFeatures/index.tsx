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
    title: 'Cyberbezpieczeństwo',
    Svg: require('@site/static/img/undraw_security.svg').default,
    description: (
      <>
      <strong>Bezpieczeństwo to podstawa każdego nowoczesnego biznesu.</strong><br />
      Zabezpieczamy Twoją firmę przed utratą danych, cyberatakami i nieprzewidzianymi awariami.<br />
      <br />
      <ul className={styles.noListStyle}>
        <li>🔍 Audyty bezpieczeństwa i testy penetracyjne (web, API, sieć)</li>
        <li>🧩 Wdrażanie standardów (ISO 27001, OWASP, NIS2)</li>
        <li>🔒 Zabezpieczanie aplikacji webowych, urządzeń IoT i sieci firmowych</li>
        <li>📑 Dokumentacja, polityki bezpieczeństwa, szkolenia zespołów</li>
        <li>🧠 Konsultacje dla firm potrzebujących realnych, a nie papierowych zabezpieczeń</li>
      </ul>
      </>
    ),
  },
  {
    title: 'Automatyzacja',
    Svg: require('@site/static/img/undraw_programming.svg').default,
    description: (
      <>
      <strong>Zyskaj czas, wyeliminuj błędy i przyspiesz rozwój swojego biznesu.**  </strong><br />
      Budujemy automatyczne systemy, które wyręczają ludzi w powtarzalnych zadaniach i zwiększają zyski.<br />
      <br />
      <ul className={styles.noListStyle}>
        <li>🤖 Automatyzacja procesów w Make, n8n, OpenAI</li>
        <li>🧪 Automatyzacja testów (Playwright, CI/CD)</li>
        <li>📡 Obsługa IoT (ESP32, Raspberry Pi, integracje sprzętowe)</li>
        <li>🔗 Integracje API – sklepy, CRM, systemy płatności</li>
        <li>🛠️ Dedykowane rozwiązania, które skalują się razem z Twoim biznesem</li>
      </ul>
      </>
    ),
  },
  {
    title: 'Tworzenie Aplikacji Internetowych',
    Svg: require('@site/static/img/undraw_web_development.svg').default,
    description: (
      <>
      <strong>Szybkie, bezpieczne i nowoczesne aplikacje dopasowane do Twoich potrzeb.</strong> 
      Projektujemy i wdrażamy rozwiązania, które łączą świetny frontend z wydajnym zapleczem technologicznym.<br />
      <br />
        <ul className={styles.noListStyle}>
          <li>⚡ Angular, Firebase, TypeScript – szybki rozwój nowoczesnych aplikacji</li>
          <li>🖥️ SSR, PWA, responsywne UI – szybkie i lekkie aplikacje na każde urządzenie</li>
          <li>🧰 Autoryzacja, baza danych i pliki – kompletne rozwiązania dla aplikacji</li>
          <li>🔧 Od MVP po produkt – wspieramy startupy, scale-upy i większe firmy</li>
          <li>🧪 Testy, monitoring i rozwój – pełne wsparcie po uruchomieniu aplikacji</li>
        </ul>
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