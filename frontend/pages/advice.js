import { useEffect, useState } from 'react';
import TravelForm from '../components/TravelForm';

export default function AdvicePage() {
  const [advice, setAdvice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dailyLimit, setDailyLimit] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  function handleResult(data) {
    setAdvice(data);
    setLoading(false);
    setRedirecting(true);
  }

  function handleStartLoading() {
    setLoading(true);
    setAdvice(null);
    setDailyLimit(false);
  }

  function handleDailyLimit() {
    setDailyLimit(true);
    setLoading(false);
    setAdvice(null);
    setRedirecting(true);
  }

  useEffect(() => {
    if (redirecting) {
      const timer = setTimeout(() => {
        window.location.href = 'https://www.tolago.net';
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [redirecting]);

  return (
    <main style={{ minHeight: '100vh', padding: 24, background: '#f8fafc', fontFamily: 'sans-serif' }}>
      <h2 style={{ 
        textAlign: 'center', 
        marginBottom: 24, 
        fontSize: '2.6rem', 
        fontWeight: 800, 
        fontFamily: `'Montserrat', 'Quicksand', 'Poppins', 'Segoe UI', 'Arial', 'sans-serif'`,
        letterSpacing: '0.03em',
        color: '#0369a1',
        textShadow: '0 2px 8px #0369a122'
      }}>Behind the Brochure</h2>
      <div style={{ maxWidth: 500, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 32 }}>
        <div style={{ width: '100%' }}>
          <TravelForm onResult={handleResult} onStartLoading={handleStartLoading} onDailyLimit={handleDailyLimit} />
        </div>
        {(loading || advice || dailyLimit) && (
          <div style={{ width: '100%', background: '#fffbe6', borderRadius: 12, padding: 32, textAlign: 'center', boxShadow: '0 2px 12px #0369a122', fontWeight: 700, fontSize: '1.2em', color: '#b45309', marginTop: 24 }}>
            <div style={{ marginBottom: 8 }}>
              <span style={{ fontSize: '1.1em' }}>📧</span>
            </div>
            <div style={{ marginBottom: 8 }}>
              Your complementary report for the day has been submitted.
            </div>
            <div>
              Your report will be emailed to you shortly, please check your inbox.
            </div>
            <div style={{ fontSize: '0.95em', marginTop: 12, color: '#92400e' }}>
              You will be redirected to www.tolago.net in 10 seconds.
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

