import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

export default function Automatyzacja() {
  return (
    <Layout title="Capabilities // Ops" description="Automatyzacja procesów i integracja systemowa.">
      <div className="container margin-vert--xl" style={{ maxWidth: '800px' }}>
        <div>
          <Heading as="h1" style={{ fontFamily: 'monospace', textTransform: 'uppercase', color: 'var(--ifm-color-primary-light)' }}>
            &gt; /ops/process_automation
          </Heading>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
            Projektujemy architekturę wymiany danych, usuwając wąskie gardła procesowe i minimalizując operacje ręczne. Zastępujemy przestarzałe skrypty skalowalną, redundantną logiką <strong>Event-Driven</strong>.
          </p>
        </div>
        <div style={{ background: 'var(--ifm-background-surface-color)', padding: '2rem', border: '1px solid var(--ifm-color-primary-darker)', borderRadius: '4px' }}>
          <h2 style={{ fontFamily: 'monospace', borderBottom: '1px solid var(--ifm-color-emphasis-300)', paddingBottom: '0.5rem' }}>// ZDOLNOŚCI OPERACYJNE</h2>
          <ul style={{ listStyleType: 'none', paddingLeft: '0', marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <li><strong style={{ color: 'var(--ifm-color-primary)' }}>[01] E2E Automation:</strong> Budowa skalowalnych węzłów i mikroserwisów z użyciem <code>n8n</code>, Make oraz własnych instancji <code>Python</code>.</li>
            <li><strong style={{ color: 'var(--ifm-color-primary)' }}>[02] AI Logic Injection:</strong> Wdrażanie systemów NLP / modeli generatywnych do obsługi danych operacyjnych z pominięciem interfejsu białkowego (Zero-human intervention).</li>
            <li><strong style={{ color: 'var(--ifm-color-primary)' }}>[03] API & Database Interoperability:</strong> Rygorystyczny transfer danych między platformami ERP, CRM oraz systemami magazynowymi w czasie rzeczywistym.</li>
            <li><strong style={{ color: 'var(--ifm-color-primary)' }}>[04] Logi & Raportowanie:</strong> Automatyczne wyprowadzanie streamów danych i alertów bezpieczeństwa bezpośrednio z infrastruktury do bezpiecznych węzłów podsumowujących.</li>
          </ul>
        </div>
        <div style={{ marginTop: '2.5rem' }}>
          <p style={{ fontFamily: 'monospace', color: 'var(--ifm-color-emphasis-600)' }}>
            $ [STATUS] Czas na rygorystyczną optymalizację Twoich cyklów I/O.
          </p>
          <p>
            <a href="/contact" className="button button--primary button--lg" style={{ borderRadius: '0', fontFamily: 'monospace', textTransform: 'uppercase' }}>
              &gt; ZAINICJUJ KONTAKT
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
}
