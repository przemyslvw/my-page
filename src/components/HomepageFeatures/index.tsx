import type { ReactNode } from 'react';
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
    title: 'Tworzenie Aplikacji Internetowych',
    img: require('@site/static/img/undraw_web_development.png').default,
    description: (
      <>
        <strong>Szybkie, bezpieczne i nowoczesne aplikacje dopasowane do Twoich potrzeb.</strong>
        <br />
        Projektujemy i wdrażamy rozwiązania, które łączą świetny frontend z wydajnym zapleczem technologicznym.
        <br />
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
  {
    title: 'Automatyzacja',
    img: require('@site/static/img/undraw_programming.png').default,
    description: (
      <>
        <strong>Zyskaj czas, wyeliminuj błędy i przyspiesz rozwój swojego biznesu.</strong>
        <br />
        Budujemy automatyczne systemy, które wyręczają ludzi w powtarzalnych zadaniach i zwiększają zyski.
        <br />
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
    title: 'Cyberbezpieczeństwo',
    img: require('@site/static/img/undraw_security.png').default,
    description: (
      <>
        <strong>Bezpieczeństwo to podstawa każdego nowoczesnego i skalującego się biznesu.</strong>
        <br />
        Zabezpieczamy Twoją firmę przed wyciekiem danych, atakami hakerskimi, przestojami systemów i kosztownymi
        konsekwencjami awarii.
        <br />
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
];

function Feature({ title, img, description }: FeatureItem) {
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
            padding: '12px',
          }}
        />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        {description}
        <br />
      </div>
    </div>
  );
}

function Testimonials() {
  return (
    <section id="testimonials" className={styles.testimonials}>
      <div className="container">
        <div className={styles.testimonialHeader}>
          <h2>Rezultaty, które mówią same za siebie</h2>
          <p>Historie naszych klientów i realne efekty współpracy</p>
        </div>

        <div className={styles.testimonialGrid}>
          <div className={styles.testimonialCard} data-aos="fade-up" data-aos-delay="100">
            <p className={styles.testimonialContent}>
              „Potrzebowaliśmy gotowej aplikacji webowej w krótkim czasie. MAJDAK.ONLINE nie tylko zrealizowało projekt
              szybciej niż zakładaliśmy, ale też zadbali o bezpieczeństwo i skalowalność. Technicznie wszystko dopięte,
              a wdrożenie przebiegło bez problemów.”
            </p>
            <div className={styles.testimonialAuthor}>
              <div className={styles.testimonialAvatar} style={{ backgroundColor: '#3B82F6' }}>
                AK
              </div>
              <div className={styles.testimonialAuthorInfo}>
                <div className={styles.testimonialAuthorName}>Anna</div>
                <div className={styles.testimonialRole}>właścicielka sklepu internetowego</div>
              </div>
            </div>
          </div>

          <div className={styles.testimonialCard} data-aos="fade-up" data-aos-delay="200">
            <p className={styles.testimonialContent}>
              „Audyt bezpieczeństwa i testy penetracyjne wykonane przez MAJDAK.ONLINE ujawniły luki, o których nie
              mieliśmy pojęcia. Po wdrożeniu zaleceń czujemy się o wiele bezpieczniej."
            </p>
            <div className={styles.testimonialAuthor}>
              <div className={styles.testimonialAvatar} style={{ backgroundColor: '#10B981' }}>
                KK
              </div>
              <div className={styles.testimonialAuthorInfo}>
                <div className={styles.testimonialAuthorName}>Krzysztof</div>
                <div className={styles.testimonialRole}>CTO w software house</div>
              </div>
            </div>
          </div>

          <div className={styles.testimonialCard} data-aos="fade-up" data-aos-delay="300">
            <p className={styles.testimonialContent}>
              „Dzięki integracjom z Make i n8n udało nam się połączyć CRM z naszymi wewnętrznymi systemami.
              Automatyzacja, którą wdrożyliśmy z zespołem MAJDAK.ONLINE, zaoszczędziła nam dziesiątki godzin
              tygodniowo."
            </p>
            <div className={styles.testimonialAuthor}>
              <div className={styles.testimonialAvatar} style={{ backgroundColor: '#8B5CF6' }}>
                MK
              </div>
              <div className={styles.testimonialAuthorInfo}>
                <div className={styles.testimonialAuthorName}>Marta</div>
                <div className={styles.testimonialRole}>Project Manager w firmie produkcyjnej</div>
              </div>
            </div>
          </div>

          <div className={styles.testimonialCard} data-aos="fade-up" data-aos-delay="100">
            <p className={styles.testimonialContent}>
              „Szukałem kogoś, kto zrobi dla mnie porządne zabezpieczenia strony i nie będzie tylko teoretyzować.
              MAJDAK.ONLINE nie tylko wdrożyło ochronę, ale też nauczyli mnie, jak samemu reagować na zagrożenia."
            </p>
            <div className={styles.testimonialAuthor}>
              <div className={styles.testimonialAvatar} style={{ backgroundColor: '#EC4899' }}>
                TK
              </div>
              <div className={styles.testimonialAuthorInfo}>
                <div className={styles.testimonialAuthorName}>Tomasz</div>
                <div className={styles.testimonialRole}>freelancer IT</div>
              </div>
            </div>
          </div>

          <div className={styles.testimonialCard} data-aos="fade-up" data-aos-delay="200">
            <p className={styles.testimonialContent}>
              „Współpraca z MAJDAK.ONLINE to konkret, bez zbędnego gadania. Zleciliśmy stworzenie aplikacji Angular +
              Firebase — od MVP do pełnej wersji produkcyjnej. Wszystko działa płynnie, wsparcie po wdrożeniu bez
              zarzutu."
            </p>
            <div className={styles.testimonialAuthor}>
              <div className={styles.testimonialAvatar} style={{ backgroundColor: '#F59E0B' }}>
                PK
              </div>
              <div className={styles.testimonialAuthorInfo}>
                <div className={styles.testimonialAuthorName}>Piotr</div>
                <div className={styles.testimonialRole}>CEO startupu technologicznego</div>
              </div>
            </div>
          </div>

          <div className={styles.testimonialCard} data-aos="fade-up" data-aos-delay="300">
            <p className={styles.testimonialContent}>
              „Profesjonalizm, szybkie reakcje i realna znajomość cyberbezpieczeństwa. Jako firma administrująca dane
              wrażliwe, mieliśmy wysokie wymagania. MAJDAK.ONLINE spełniło je w 100%."
            </p>
            <div className={styles.testimonialAuthor}>
              <div className={styles.testimonialAvatar} style={{ backgroundColor: '#6366F1' }}>
                KZ
              </div>
              <div className={styles.testimonialAuthorInfo}>
                <div className={styles.testimonialAuthorName}>Katarzyna</div>
                <div className={styles.testimonialRole}>kierownik działu IT w instytucji publicznej</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <>
      <section className={styles.features}>
        <div className="container">
          <div className="row">
            {FeatureList.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
          </div>
        </div>
      </section>
      <Testimonials />
    </>
  );
}
