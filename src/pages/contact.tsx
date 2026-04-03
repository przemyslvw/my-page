import React, { useState } from 'react';
import Layout from '@theme/Layout';

export default function Contact() {
  const [status, setStatus] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('Transmitting...');
    const formData = new FormData(e.currentTarget);
    const object: Record<string, any> = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });
    object.access_key = "e2dc0277-93b6-4d51-ab27-f081bb925107";
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: json
      });
      const result = await response.json();
      if (result.success) {
        setStatus('Transmission successful. [HTTP 200 OK]');
        e.currentTarget.reset();
      } else {
        setStatus(`Error: ${result.message}`);
      }
    } catch (error) {
      setStatus('Transmission failed. Network error.');
    }
  };

  return (
    <Layout title="Secure Comms" description="Baluarte / Majdak Online - Secure Communications">
      <div style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'monospace', textTransform: 'uppercase', borderBottom: '1px solid var(--ifm-color-primary)', paddingBottom: '1rem' }}>
          [System._Init] // Secure Communications
        </h1>
        <div style={{ marginTop: '2rem' }}>
          <p style={{ fontSize: '1.1rem', color: 'var(--ifm-font-color-base)' }}>
            Zgłoszenia operacyjne, konsultacje inżynieryjne oraz audyty cyberbezpieczeństwa. Kanały komunikacji bezpośredniej. Wiadomości obsługiwane są przez system ticketowy. Prosimy o stosowanie precyzyjnych parametrów w formularzu.
          </p>

          <div style={{ 
            marginTop: '3rem', 
            padding: '2rem', 
            background: 'var(--color-surface)', 
            border: '1px solid var(--ifm-color-primary-dark)',
            borderRadius: '4px' 
          }}>
            <h2 style={{ fontFamily: 'monospace', fontSize: '1.2rem', marginBottom: '1.5rem' }}>&gt; ROOT_CONTACT_FORM</h2>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div style={{ display: 'none' }}>
                  <label htmlFor="bot_honey">Don't fill this out if you're human:</label>
                  <input
                      type="text"
                      name="bot_honey"
                      id="bot_honey"
                      tabIndex={-1}
                      autoComplete="off"
                  />
              </div>
              <div>
                <label style={{ display: 'block', fontFamily: 'monospace', marginBottom: '0.5rem', color: 'var(--ifm-color-primary)' }}>[Input_Name]</label>
                <input type="text" name="name" required style={{ width: '100%', padding: '0.8rem', background: 'var(--ifm-background-color)', border: '1px solid var(--ifm-color-primary-darker)', color: 'var(--ifm-heading-color)', fontFamily: 'monospace', borderRadius: '3px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontFamily: 'monospace', marginBottom: '0.5rem', color: 'var(--ifm-color-primary)' }}>[Input_Email]</label>
                <input type="email" name="email" required style={{ width: '100%', padding: '0.8rem', background: 'var(--ifm-background-color)', border: '1px solid var(--ifm-color-primary-darker)', color: 'var(--ifm-heading-color)', fontFamily: 'monospace', borderRadius: '3px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontFamily: 'monospace', marginBottom: '0.5rem', color: 'var(--ifm-color-primary)' }}>[Payload // Message]</label>
                <textarea name="message" required rows={5} style={{ width: '100%', padding: '0.8rem', background: 'var(--ifm-background-color)', border: '1px solid var(--ifm-color-primary-darker)', color: 'var(--ifm-heading-color)', fontFamily: 'monospace', borderRadius: '3px', resize: 'vertical' }}></textarea>
              </div>
              <div>
                <button type="submit" style={{ padding: '1rem 2rem', background: 'var(--ifm-color-primary-dark)', color: '#fff', border: '1px solid var(--ifm-color-primary)', cursor: 'pointer', fontFamily: 'monospace', width: '100%', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase' }}>
                  Execute // Wyślij
                </button>
              </div>
              
              {status && (
                <div style={{ marginTop: '1rem', padding: '1rem', background: 'var(--ifm-background-color)', borderLeft: '3px solid var(--ifm-color-primary)', fontFamily: 'monospace', color: 'var(--ifm-heading-color)' }}>
                  &gt; {status}
                </div>
              )}
            </form>
            
            <p style={{ marginTop: '3rem', fontSize: '1.1rem', borderTop: '1px solid var(--ifm-color-primary-dark)', paddingTop: '1.5rem', textAlign: 'center' }}>
              <span style={{opacity: 0.7}}>// Direct channel:</span> <code style={{ margin: '0 10px', padding: '5px 10px', background: 'var(--ifm-background-color)', border: '1px solid var(--ifm-color-primary-darker)' }}>kontakt@baluarte.pl</code>
            </p>
          </div>

          <div style={{ marginTop: '3rem' }}>
            <h2 style={{ fontFamily: 'monospace', fontSize: '1.2rem', marginBottom: '1rem' }}>&gt; TRUST_NETWORK</h2>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '1.1rem', lineHeight: '2' }}>
              <li><i className="fab fa-github" style={{ marginRight: '10px' }}></i> <strong>GitHub:</strong> <a href="https://github.com/przemyslvw" target="_blank" rel="noopener noreferrer">github.com/przemyslvw</a></li>
              <li><i className="fas fa-key" style={{ marginRight: '10px' }}></i> <strong>PGP Public Key:</strong> <code style={{background: 'var(--color-surface)'}}>[AWAITING_UPLOAD]</code></li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
