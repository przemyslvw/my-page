import type { ReactNode } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Software Architecture & Dev-Ops',
    icon: 'fas fa-network-wired',
    description: (
      <>
        <strong>Projektowanie i wdrażanie redundantnych środowisk aplikacyjnych opartych na nowoczesnym stacku technologicznym.</strong>
        <br />
        <br />
        <ul className={styles.noListStyle}>
          <li><span style={{ color: 'var(--ifm-color-primary)' }}>&gt;</span> Architektura mikroserwisowa oparta o Node.js </li>
          <li><span style={{ color: 'var(--ifm-color-primary)' }}>&gt;</span> Restrykcyjne polityki CSP i autoryzacja zero-trust</li>
          <li><span style={{ color: 'var(--ifm-color-primary)' }}>&gt;</span> PWA z obsługą trybu offline i optymalizacją opóźnień</li>
          <li><span style={{ color: 'var(--ifm-color-primary)' }}>&gt;</span> Konteneryzacja (Docker), pipeline'y CI/CD we wdrożeniach</li>
          <li><span style={{ color: 'var(--ifm-color-primary)' }}>&gt;</span> Tworzenie dedykowanych API (REST, GraphQL) pod integracje</li>
        </ul>
      </>
    ),
  },
  {
    title: 'Process Automation & Interoperability',
    icon: 'fas fa-microchip',
    description: (
      <>
        <strong>Integracja zaawansowanych systemów rozproszonych, redukcja długu technologicznego i optymalizacja operacji I/O.</strong>
        <br />
        <br />
        <ul className={styles.noListStyle}>
          <li><span style={{ color: 'var(--ifm-color-primary)' }}>&gt;</span> Budowa event-driven architecture (n8n, Make)</li>
          <li><span style={{ color: 'var(--ifm-color-primary)' }}>&gt;</span> Pełne testowanie E2E (Continuous Testing - Playwright)</li>
          <li><span style={{ color: 'var(--ifm-color-primary)' }}>&gt;</span> Systemy wbudowane: logika ESP32, protokoły M2M</li>
          <li><span style={{ color: 'var(--ifm-color-primary)' }}>&gt;</span> Optymalizacja strumieni danych (ERP/Cloud/Databases)</li>
          <li><span style={{ color: 'var(--ifm-color-primary)' }}>&gt;</span> Automatyczne deploymenty i monitorowanie logów systemowych</li>
        </ul>
      </>
    ),
  },
  {
    title: 'Offensive Security & Hardening',
    icon: 'fas fa-shield-alt',
    description: (
      <>
        <strong>Wykrywanie podatności i hardening systemów od warstwy sprzętowej po aplikacyjną, techniki Red Team.</strong>
        <br />
        <br />
        <ul className={styles.noListStyle}>
          <li><span style={{ color: 'var(--ifm-color-primary)' }}>&gt;</span> Architektura bezpieczeństwa zgodna z OWASP</li>
          <li><span style={{ color: 'var(--ifm-color-primary)' }}>&gt;</span> Testy penetracyjne, audyty web API (Kali Linux)</li>
          <li><span style={{ color: 'var(--ifm-color-primary)' }}>&gt;</span> Hardening sieci oraz analiza transmisji bezprzewodowej</li>
          <li><span style={{ color: 'var(--ifm-color-primary)' }}>&gt;</span> Operacjonalizacja dyrektywy NIS2 i ISO 27001</li>
          <li><span style={{ color: 'var(--ifm-color-primary)' }}>&gt;</span> Bezpieczna logika dla standardów teleinformatycznych</li>
        </ul>
      </>
    ),
  },
];

function Feature({ title, icon, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <i className={clsx(icon)} style={{ fontSize: '4rem', color: 'var(--ifm-color-primary)', textShadow: '0 0 20px rgba(56, 189, 248, 0.2)', marginBottom: '1.5rem', marginTop: '1.5rem' }}></i>
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
