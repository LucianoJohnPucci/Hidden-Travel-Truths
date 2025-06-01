import { useState } from 'react';
import dynamic from 'next/dynamic';
const MapPicker = dynamic(() => import('./MapPicker'), { ssr: false });

const tripTypes = ['Solo', 'Family', 'Business', 'Backpacker'];

const languages = [
  'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Dutch', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Arabic', 'Hindi', 'Bengali', 'Turkish', 'Vietnamese', 'Polish', 'Ukrainian', 'Romanian', 'Greek', 'Czech', 'Swedish', 'Hungarian', 'Finnish', 'Norwegian', 'Danish', 'Thai', 'Hebrew', 'Malay', 'Indonesian', 'Filipino', 'Persian', 'Swahili', 'Urdu', 'Serbian', 'Croatian', 'Slovak', 'Bulgarian', 'Slovenian', 'Estonian', 'Latvian', 'Lithuanian', 'Catalan', 'Basque', 'Galician', 'Afrikaans', 'Icelandic', 'Albanian', 'Armenian', 'Georgian', 'Macedonian', 'Maltese', 'Belarusian', 'Irish', 'Welsh', 'Scottish Gaelic', 'Yiddish', 'Esperanto'
];

// --- Country, US States, and Canadian Provinces lists ---
const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];
const usStates = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];
const canadaProvinces = [
  "Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Nova Scotia", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Northwest Territories", "Nunavut", "Yukon"
];

import { useEffect, useRef } from 'react';

export default function TravelForm({ onResult, onStartLoading, onDailyLimit }) {
  const [showTosModal, setShowTosModal] = useState(false);
  const [showLinktreeModal, setShowLinktreeModal] = useState(false);
  const linktreeTimerRef = useRef(null);

  // Auto-redirect when popup is shown
  useEffect(() => {
    if (showLinktreeModal) {
      linktreeTimerRef.current = setTimeout(() => {
        window.location.href = 'https://tolgalo.com/';
      }, 3000); // 3 seconds
    } else {
      clearTimeout(linktreeTimerRef.current);
    }
    return () => clearTimeout(linktreeTimerRef.current);
  }, [showLinktreeModal]);
  const [email, setEmail] = useState('');
  const [emailMeAdvice, setEmailMeAdvice] = useState(false);
  const [username, setUsername] = useState('');
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState({ start: '', end: '' });
  const [tripType, setTripType] = useState(tripTypes[0]);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('English');

  async function handleSubmit(e) {
    e.preventDefault();
    // Require checkbox and both dates
    if (!emailMeAdvice) {
      alert('You must acknowledge the Terms of Service to proceed.');
      return;
    }
    if (!dates.start || !dates.end) {
      alert('Please select both a start and end date for your trip.');
      return;
    }
    if (!destination) {
      alert('Please select a destination (Click on Map Destination Location) to proceed.');
      return;
    }
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
          departure,
          destination,
          dates,
          tripType,
          language
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
    // Wait 2 seconds, then show the Linktree popup
    setTimeout(() => setShowLinktreeModal(true), 2000);
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto', background: '#fff', padding: 24, borderRadius: 12, boxShadow: '0 2px 12px #0369a122', marginBottom: 32 }}>
      {/* Username at the top */}
      <label style={{ display: 'block', marginBottom: 8 }}>
        Username
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username (optional)" style={{ width: '100%', padding: 8, marginTop: 4, marginBottom: 16, borderRadius: 6, border: '1px solid #ccc' }} />
      </label>
      {/* Email next */}
      <label style={{ display: 'block', marginBottom: 8 }}>
        Email (required)
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="your@email.com" style={{ width: '100%', padding: 8, marginTop: 4, marginBottom: 8, borderRadius: 6, border: '1px solid #ccc' }} />
      </label>
      {/* Email advice checkbox directly after email */}
      <label style={{ display: 'flex', alignItems: 'center', marginBottom: 16, gap: 8 }}>
        <input
          type="checkbox"
          checked={emailMeAdvice}
          required
          onChange={e => {
            setEmailMeAdvice(e.target.checked);
            if (e.target.checked) setShowTosModal(true);
          }}
          style={{ margin: 0 }}
        />
        <span style={{ fontStyle: 'italic', fontSize: '0.92em' }}>I acknowledge to the Terms of Service</span>
      </label>

      {/* Terms of Service Modal */}
      {showTosModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ background: '#fff', borderRadius: 12, maxWidth: 420, width: '90%', padding: 28, boxShadow: '0 2px 24px #0002', position: 'relative' }}>
            {/* Friendly green checkmark and "I understand" button */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18, flexDirection: 'column' }}>
              <button
                onClick={() => setShowTosModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginBottom: 2,
                  marginTop: -8
                }}
                aria-label="I understand"
              >
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="24" cy="24" r="24" fill="#22c55e"/>
                  <path d="M14 26l7 7 13-13" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span style={{ color: '#22c55e', fontWeight: 600, fontSize: '1.1em', marginTop: 4 }}>I understand</span>
              </button>
            </div>
            <h2 style={{ fontSize: '1.2em', marginBottom: 10, textAlign: 'center' }}>Email Terms of Service</h2>
            <div style={{ fontSize: '0.98em', lineHeight: 1.5, maxHeight: '60vh', overflowY: 'auto', marginBottom: 18 }}>
              <strong>By providing your email address to Tolgalo Travel, you agree to the following terms:</strong>
              <br /><br />
              <strong>Email Communications</strong><br />
              You consent to receive promotional emails, newsletters, and marketing communications from us at the email address you provided.<br />
              We may use your email for future sales campaigns, product announcements, and special offers.<br />
              Email frequency may vary based on promotions and business needs.<br /><br />
              <strong>Your Rights</strong><br />
              You may unsubscribe from our email list at any time by clicking the "unsubscribe" link in any email or contacting us directly.<br />
              Unsubscribe requests will be processed within 10 business days.<br />
              Even after unsubscribing from marketing emails, you may still receive transactional emails related to your account or purchases.<br /><br />
              <strong>Data Use</strong><br />
              Your email address will be stored securely and used solely for communication purposes.<br />
              We do not sell or share your email address with third parties for their marketing purposes.<br />
              We may use email service providers to send communications on our behalf.<br /><br />
              <strong>Contact Information</strong><br />
              For questions about these terms or to update your email preferences, contact us at <a href="mailto:support@Tolgalo.net">support@Tolgalo.net</a>.<br /><br />
              By continuing to engage with our emails, you acknowledge that you have read and agree to these terms.
            </div>
            {/* Bottom I understand button */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 8, flexDirection: 'column' }}>
              <button
                onClick={() => setShowTosModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginBottom: 2,
                  marginTop: 0
                }}
                aria-label="I understand"
              >
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="24" cy="24" r="24" fill="#22c55e"/>
                  <path d="M14 26l7 7 13-13" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span style={{ color: '#22c55e', fontWeight: 600, fontSize: '1.1em', marginTop: 4 }}>I understand</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Map third */}
      <div style={{ marginBottom: 16 }}>
        <MapPicker onPlaceSelect={setDestination} />
      </div>
      {/* Departure fourth */}
      <label style={{ display: 'block', marginBottom: 8 }}>
        Departure
        <select
          value={departure}
          onChange={e => setDeparture(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginTop: 4, marginBottom: 8, borderRadius: 6, border: '1px solid #ccc' }}
        >
          <option value="">Select country, US state, or Canadian province</option>
          <optgroup label="Countries">
            {countries.map(c => <option key={c} value={c}>{c}</option>)}
          </optgroup>
          <optgroup label="US States">
            {usStates.map(s => <option key={s} value={s}>{s}, United States</option>)}
          </optgroup>
          <optgroup label="Canadian Provinces">
            {canadaProvinces.map(p => <option key={p} value={p}>{p}, Canada</option>)}
          </optgroup>
        </select>
      </label>
      {/* Destination fifth */}
      <label style={{ display: 'block', marginBottom: 8 }}>
        Destination (Click on Map Destination Location)
        <input type="text" value={destination} onChange={e => setDestination(e.target.value)} required placeholder="City, Country" style={{ width: '100%', padding: 8, marginTop: 4, marginBottom: 16, borderRadius: 6, border: '1px solid #ccc' }} />
      </label>
      {/* Dates sixth */}
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
      {/* Language dropdown above button */}
      <label style={{ display: 'block', marginBottom: 16 }}>
        Language
        <select
          value={language}
          onChange={e => setLanguage(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginTop: 4, borderRadius: 6, border: '1px solid #ccc' }}
        >
          {languages.map(lang => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
      </label>
      <button type="submit" disabled={loading} style={{ width: '100%', padding: '12px 0', background: '#0369a1', color: '#fff', border: 'none', borderRadius: 8, fontSize: '1.1rem', cursor: loading ? 'not-allowed' : 'pointer' }}>
        {loading ? 'Loading...' : 'Email Me the Report'}
      </button>

      {/* Linktree Modal Popup */}
      {showLinktreeModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', zIndex: 2000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ background: '#fff', borderRadius: 16, maxWidth: 420, width: '90%', padding: 32, boxShadow: '0 2px 24px #0002', position: 'relative', textAlign: 'center' }}>
            <button onClick={() => { clearTimeout(linktreeTimerRef.current); window.location.href = 'https://tolgalo.com/'; }} style={{ position: 'absolute', top: 14, right: 18, background: 'none', border: 'none', fontSize: 26, cursor: 'pointer', color: '#0369a1' }} aria-label="Close">×</button>
            <h2 style={{ fontSize: '1.25em', marginBottom: 24, color: '#0369a1', fontWeight: 700 }}>Please Check Your Email for Your Custom Report</h2>
            <a href="https://tolgalo.com/" target="_blank" rel="noopener noreferrer"
              onClick={() => clearTimeout(linktreeTimerRef.current)}
              style={{
                display: 'inline-block',
                background: '#22c55e',
                color: '#fff',
                fontWeight: 600,
                fontSize: '1.1em',
                padding: '12px 28px',
                borderRadius: 8,
                textDecoration: 'none',
                marginBottom: 10,
                boxShadow: '0 2px 8px #22c55e33',
                transition: 'background 0.2s',
              }}
            >
              Visit Tolgalo.com
            </a>
          </div>
        </div>
      )}
    </form>
  );
}
