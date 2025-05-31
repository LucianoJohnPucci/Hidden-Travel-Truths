import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', background: '#f8fafc' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: 8 }}>KnowBeforeYouGo</h1>
      <p style={{ maxWidth: 500, textAlign: 'center', marginBottom: 32 }}>
        Your hyper-local, week-specific travel risk & etiquette advisor. Get real-time alerts, cultural tips, and daily checklists for your next destination.
      </p>
      <Link href="/advice">
        <button style={{ padding: '12px 32px', fontSize: '1.1rem', background: '#0369a1', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', boxShadow: '0 2px 8px #0369a122' }}>
          Get Travel Advice
        </button>
      </Link>
    </main>
  );
}
