import { useState } from 'react';
import dynamic from 'next/dynamic';
const MapPicker = dynamic(() => import('./MapPicker'), { ssr: false });

const tripTypes = ['Solo', 'Family', 'Business', 'Backpacker'];

export default function TravelForm({ onResult, onStartLoading, onDailyLimit }) {
  const [email, setEmail] = useState('');
  const [emailMeAdvice, setEmailMeAdvice] = useState(false);
  const [username, setUsername] = useState('');
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState({ start: '', end: '' });
  const [tripType, setTripType] = useState(tripTypes[0]);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (onStartLoading) onStartLoading();
    // Send data to webhook
    try {
      const res = await fetch('https://n8n.puffcloud.net/webhook-test/2aae2967-55d3-4ef5-831b-9b01b9f36fd3', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          emailMeAdvice,
          username,
          destination,
          dates,
          tripType
        })
      });
    } catch (err) {
      // Optionally handle error
      console.error('Failed to send data to webhook:', err);
    }
    // Use webhook response for advice
    try {
      const data = await res.json();
      onResult(data);
    } catch (err) {
      // fallback: show error or mock data
      onResult({
        destination,
        dates,
        tripType,
        alerts: ['Could not load advice.'],
        etiquette: [],
        scams: [],
        emergency: { numbers: [], phrases: [] },
        checklist: []
      });
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto', background: '#fff', padding: 24, borderRadius: 12, boxShadow: '0 2px 12px #0369a122', marginBottom: 32 }}>
      <label style={{ display: 'block', marginBottom: 8 }}>
        Email (required)
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="your@email.com" style={{ width: '100%', padding: 8, marginTop: 4, marginBottom: 8, borderRadius: 6, border: '1px solid #ccc' }} />
      </label>
      <label style={{ display: 'flex', alignItems: 'center', marginBottom: 16, gap: 8 }}>
        <input type="checkbox" checked={emailMeAdvice} onChange={e => setEmailMeAdvice(e.target.checked)} style={{ margin: 0 }} />
        Please email me advice
      </label>
      <label style={{ display: 'block', marginBottom: 8 }}>
        Username
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username (optional)" style={{ width: '100%', padding: 8, marginTop: 4, marginBottom: 16, borderRadius: 6, border: '1px solid #ccc' }} />
      </label>
      <div style={{ marginBottom: 16 }}>
        <MapPicker onPlaceSelect={setDestination} />
      </div>
      <label style={{ display: 'block', marginBottom: 8 }}>
        Destination
        <input type="text" value={destination} onChange={e => setDestination(e.target.value)} required placeholder="City, Country" style={{ width: '100%', padding: 8, marginTop: 4, marginBottom: 16, borderRadius: 6, border: '1px solid #ccc' }} />
      </label>
      <label style={{ display: 'block', marginBottom: 8 }}>
        Travel Dates
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
          <input
            type="date"
            value={dates.start}
            onChange={e => setDates(d => ({ ...d, start: e.target.value }))}
            required
            style={{ flex: '1 1 120px', minWidth: 0, maxWidth: 'calc(50% - 24px)', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
          />
          <span style={{ alignSelf: 'center', minWidth: 24, textAlign: 'center' }}>to</span>
          <input
            type="date"
            value={dates.end}
            onChange={e => setDates(d => ({ ...d, end: e.target.value }))}
            required
            style={{ flex: '1 1 120px', minWidth: 0, maxWidth: 'calc(50% - 24px)', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
          />
        </div>
      </label>
      <label style={{ display: 'block', marginBottom: 16 }}>
        Trip Type
        <select value={tripType} onChange={e => setTripType(e.target.value)} style={{ width: '100%', padding: 8, marginTop: 4, borderRadius: 6, border: '1px solid #ccc' }}>
          {tripTypes.map(type => <option key={type} value={type}>{type}</option>)}
        </select>
      </label>
      <button type="submit" disabled={loading} style={{ width: '100%', padding: '12px 0', background: '#0369a1', color: '#fff', border: 'none', borderRadius: 8, fontSize: '1.1rem', cursor: loading ? 'not-allowed' : 'pointer' }}>
        {loading ? 'Loading...' : 'Get Advice'}
      </button>
    </form>
  );
}
