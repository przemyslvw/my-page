import React from 'react';
import Layout from '@theme/Layout';

export default function Contact() {
  return (
    <Layout title="Kontakt" description="Skontaktuj się z nami">
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Kontakt</h1>
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <h2>📬 Skontaktuj się ze mną!</h2>
          <p>Chcesz porozmawiać o projektach, zadać pytanie lub po prostu powiedzieć "cześć"? Wybierz jedną z opcji:</p>

          <p style={{ marginTop: '20px' }}>📧 <strong>Email:</strong> <a href="mailto:kontakt@majdak.online">kontakt@majdak.online</a></p>

          <ul style={{ listStyle: 'none', padding: 0, fontSize: '18px' }}>
            <li>🐙 <strong>GitHub:</strong> <a href="https://github.com/przemyslvw" target="_blank" rel="noopener noreferrer">przemyslvw</a></li>
            <li>📸 <strong>Instagram:</strong> <a href="https://www.instagram.com/przemas.ts/" target="_blank" rel="noopener noreferrer">przemas.ts</a></li>
            <li>⌚ <strong>Garmin Connect:</strong> <a href="https://connect.garmin.com/modern/profile/396bbbd1-edbd-4fd4-a780-132723eef739" target="_blank" rel="noopener noreferrer">Mój profil Garmin</a></li>
            <li>🐦 <strong>X:</strong> <a href="https://x.com/przemyslvw" target="_blank" rel="noopener noreferrer">przemyslvw</a></li>
          </ul>

          <p style={{ marginTop: '20px' }}>💡 <em>Znajdź mnie tam, gdzie dzieje się najwięcej — a jeśli masz pytania techniczne, uderzaj śmiało! 🚀</em></p>
        </div>
      </div>
    </Layout>
  );
}
