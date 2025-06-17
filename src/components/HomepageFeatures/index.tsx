import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  img: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Cyberbezpieczeństwo',
    img: require('@site/static/img/undraw_security.png').default,
    description: (
      <>
      <strong>Bezpieczeństwo to podstawa każdego nowoczesnego i skalującego się biznesu.</strong><br />
      Zabezpieczamy Twoją firmę przed wyciekiem danych, atakami hakerskimi, przestojami systemów i kosztownymi konsekwencjami awarii.<br />
      <br />
      <ul className={styles.noListStyle}>
        <li>🔍 Audyty i testy bezpieczeństwa web, API i sieci</li>
        <li>🧩 Wdrażanie ISO 27001, OWASP, NIS2 </li>
        <li>🔒 Zabezpieczenia aplikacji, IoT oraz sieci </li>
        <li>📑 Polityki bezpieczeństwa i szkolenia dla firm</li>
        <li>🧠 Konsultacje z naciskiem na praktykę</li>
      </ul>
      </>
    ),
  },
  {
    title: 'Automatyzacja',
    img: require('@site/static/img/undraw_programming.png').default,
    description: (
      <>
      <strong>Zyskaj czas, wyeliminuj błędy i przyspiesz rozwój swojego biznesu.</strong><br />
      Budujemy automatyczne systemy, które wyręczają ludzi w powtarzalnych zadaniach i zwiększają zyski.<br />
      <br />
      <ul className={styles.noListStyle}>
        <li>🤖 Automatyzacja procesów w Make, n8n, OpenAI</li>
        <li>🧪 Testy automatyczne Playwright oraz integracje </li>
        <li>📡 Integracje sprzętowe IoT z ESP32, Raspberry Pi</li>
        <li>🔗 Łączenie systemów: API, sklepy, CRM, płatności</li>
        <li>🛠️ Rozwiązania, które rosną razem z Twoją firmą</li>
      </ul>
      </>
    ),
  },
  {
    title: 'Tworzenie Aplikacji Internetowych',
    img: require('@site/static/img/undraw_web_development.png').default,
    description: (
      <>
      <strong>Szybkie, bezpieczne i nowoczesne aplikacje dopasowane do Twoich potrzeb.</strong><br />
      Projektujemy i wdrażamy rozwiązania, które łączą świetny frontend z wydajnym zapleczem technologicznym.<br />
      <br />
        <ul className={styles.noListStyle}>
          <li>⚡ Angular + Firebase – szybkie aplikacje</li>
          <li>🖥️ Responsywne UI, PWA dla każdej platformy</li>
          <li>🧰 Baza danych, auth, pliki – kompletna aplikacja</li>
          <li>🔧 MVP i skalowanie – wsparcie dla firm na starcie</li>
          <li>🧪 Wsparcie, monitoring i rozwój po wdrożeniu</li>
        </ul>
      </>
    ),
  },
];

function Feature({title, img, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img
  src={img}
  className={styles.featureSvg}
  alt={title}
  loading="lazy"
  style={{
    maxWidth: '100%',
    height: 'auto',
    padding: '12px'
  }}
/>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        {description}
        <br/>
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