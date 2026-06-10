import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';
import styles from './wsparcie.module.css';

function WsparcieHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <Heading as="h1" className="hero__title">
              Wesprzyj moją pracę
            </Heading>
            <p className="hero__subtitle">Twoje wsparcie pomaga mi tworzyć wartościowe treści i rozwijać projekt</p>
          </div>
        </div>
      </div>
    </header>
  );
}

function BuyMeACoffee() {
  return (
    <div className={styles.buttonContainer}>
      <a
        href="https://buycoffee.to/majdak.online"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.coffeeButton}>
        <span className={styles.coffeeIcon}>☕</span>
        Postaw mi kawę
      </a>
    </div>
  );
}

function BuyMeACoffeeWidget() {
  return (
    <div className={styles.coffeeWidget}>
      <div className={styles.coffeeWidgetHeader}>
        <h3>Postaw kawę za:</h3>
      </div>

      <div className={styles.coffeeSizes}>
        <a
          href="https://buycoffee.to/majdak.online?coffeeSize=small"
          className={styles.coffeeSizeButton}
          target="_blank"
          rel="noopener noreferrer"
          title="Postaw kawę za: 5 zł">
          <img
            src="https://buycoffee.to/img/coffee-small-white.svg"
            alt="small coffee icon"
            className={styles.coffeeIcon}
          />
          <span>5 zł</span>
        </a>

        <a
          href="https://buycoffee.to/majdak.online?coffeeSize=medium"
          className={styles.coffeeSizeButton}
          target="_blank"
          rel="noopener noreferrer"
          title="Postaw kawę za: 10 zł">
          <img
            src="https://buycoffee.to/img/coffee-medium-white.svg"
            alt="medium coffee icon"
            className={styles.coffeeIcon}
          />
          <span>10 zł</span>
        </a>

        <a
          href="https://buycoffee.to/majdak.online?coffeeSize=large"
          className={styles.coffeeSizeButton}
          target="_blank"
          rel="noopener noreferrer"
          title="Postaw kawę za: 15 zł">
          <img
            src="https://buycoffee.to/img/coffee-large-white.svg"
            alt="large coffee icon"
            className={styles.coffeeIcon}
          />
          <span>15 zł</span>
        </a>
      </div>
    </div>
  );
}

export default function WsparciePage(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title="Wesprzyj moją pracę" description="Wesprzyj moją pracę i pomóż mi tworzyć wartościowe treści">
      <WsparcieHeader />
      <main className={styles.mainContainer}>
        <div className="container">
          <div className="row">
            <div className="col col--12">
              <div className={styles.wsparcieContent}>
                <h2>Dlaczego warto mnie wesprzeć?</h2>
                <p>
                  Tworzenie wartościowych treści, poradników i projektów zajmuje dużo czasu i wysiłku. Każda wpłata,
                  nawet symboliczna, pomaga mi w dalszym rozwijaniu tej strony i tworzeniu coraz lepszych materiałów dla
                  Ciebie.
                </p>

                <h3>Co zyskujesz?</h3>
                <ul>
                  <li> Dostęp do unikalnych materiałów i poradników</li>
                  <li>🚀 Szybsze odpowiedzi na pytania</li>
                  <li> Wpływ na tematykę kolejnych artykułów i projektów</li>
                  <li>❤️ Satysfakcję wspierania niezależnego twórcy</li>
                </ul>

                <div className={styles.donationMethods}>
                  <h3>Jak możesz wesprzeć?</h3>
                  <div className={styles.methodsGrid}>
                    <div className={styles.methodCard}>
                      <div className={styles.methodIcon}>💳</div>
                      <h4>Płatność BLIK</h4>
                      <p>Szybka i bezpieczna płatność przez aplikację Twojego banku</p>
                      <div className={styles.bankDetails}>
                        <p>
                          <strong>Numer telefonu BLIK:</strong>
                        </p>
                        <div className={styles.blikNumber}>513 313 133</div>
                        <p className={styles.note}>
                          Użyj tej funkcji w aplikacji Twojego banku, aby dokonać szybkiej płatności.
                        </p>
                      </div>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          navigator.clipboard.writeText('513313133');
                          alert('Numer BLIK został skopiowany do schowka!');
                        }}
                        className={styles.buttonSecondary}>
                        Kopiuj numer telefonu
                      </a>
                    </div>
                    <div className={styles.methodCard}>
                      <div className={styles.methodIcon}>☕</div>
                      <h4>Postaw mi kawę</h4>
                      <p>Wesprzyj moją pracę przez platformę Buy Me a Coffee</p>
                      <div className={styles.coffeeAlternative}>
                        <BuyMeACoffeeWidget />
                        <p className={styles.note}>Przekierowanie do zewnętrznej platformy płatności</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.thankYou}>
                  <h3>Dziękuję za Twoje wsparcie! ❤️</h3>
                  <p>
                    Każda wpłata, nawet najmniejsza, jest dla mnie ogromną motywacją do dalszej pracy i rozwijania tego
                    projektu. Dziękuję, że jesteś częścią tej społeczności!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
