import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';

// Import MapPicker with SSR disabled
const MapPicker = dynamic(() => import('./MapPicker'), { ssr: false });

const groupTypes = ['Solo', 'Couple', 'Family', 'Group', 'Business'];

export default function TripDetailForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [destination, setDestination] = useState('');
  const [origin, setOrigin] = useState('');
  const [dates, setDates] = useState({ start: '', end: '' });
  const [groupType, setGroupType] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const formRef = useRef(null);

  const handleDestinationSelect = (place) => {
    setDestination(place);
    if (currentStep === 1) {
      setCurrentStep(2);
    }
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send data to webhook
      await fetch('https://n8n.puffcloud.net/webhook/2aae2967-55d3-4ef5-831b-9b01b9f36fd3', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination,
          origin,
          dates,
          groupType,
          email,
          source: 'Behind the Brochure Landing Page'
        })
      });
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="trip-form" ref={formRef} style={{
      padding: '3rem 2rem',
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      maxWidth: '1000px',
      margin: '-3rem auto 3rem',
      position: 'relative',
      zIndex: 10,
      fontFamily: 'Poppins, sans-serif',
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#1e40af' }}>Plan Your Safe Journey</h2>
      
      {isSubmitted ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
          <h3 style={{ marginBottom: '1rem', color: '#1e40af' }}>Thank You!</h3>
          <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
            We'll send your custom intel sheet to <strong>{email}</strong> within minutes.
          </p>
          <p>Keep an eye on your inbox for your personalized travel briefing.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ display: currentStep === 1 ? 'block' : 'none' }}>
            <h3 style={{ marginBottom: '1rem', color: '#1e40af' }}>Step 1: Pick your destination</h3>
            <div style={{ marginBottom: '1.5rem' }}>
              <MapPicker onPlaceSelect={handleDestinationSelect} />
            </div>
            <p style={{ textAlign: 'center', marginBottom: '1rem' }}>
              {destination ? (
                <>Selected destination: <strong>{destination}</strong></>
              ) : (
                'Click on the map to select your destination'
              )}
            </p>
            <div style={{ textAlign: 'center' }}>
              <button 
                type="button" 
                onClick={handleNextStep}
                disabled={!destination}
                style={{
                  padding: '12px 32px',
                  background: destination ? '#f97316' : '#e2e8f0',
                  color: destination ? 'white' : '#94a3b8',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: destination ? 'pointer' : 'not-allowed',
                  fontWeight: 'bold',
                }}
              >
                Next Step
              </button>
            </div>
          </div>

          <div style={{ display: currentStep === 2 ? 'block' : 'none' }}>
            <h3 style={{ marginBottom: '1rem', color: '#1e40af' }}>Step 2: Trip Details</h3>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Origin City</label>
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="Where are you traveling from?"
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '1rem',
                }}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Start Date</label>
                <input
                  type="date"
                  value={dates.start}
                  onChange={(e) => setDates({ ...dates, start: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '1rem',
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>End Date</label>
                <input
                  type="date"
                  value={dates.end}
                  onChange={(e) => setDates({ ...dates, end: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '1rem',
                  }}
                />
              </div>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Group Type</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {groupTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setGroupType(type)}
                    style={{
                      padding: '10px 16px',
                      background: groupType === type ? '#1e40af' : '#f1f5f9',
                      color: groupType === type ? 'white' : '#334155',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: groupType === type ? 'bold' : 'normal',
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button
                type="button"
                onClick={handlePrevStep}
                style={{
                  padding: '12px 24px',
                  background: '#f1f5f9',
                  color: '#334155',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                disabled={!origin || !dates.start || !dates.end || !groupType}
                style={{
                  padding: '12px 32px',
                  background: origin && dates.start && dates.end && groupType ? '#f97316' : '#e2e8f0',
                  color: origin && dates.start && dates.end && groupType ? 'white' : '#94a3b8',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: origin && dates.start && dates.end && groupType ? 'pointer' : 'not-allowed',
                  fontWeight: 'bold',
                }}
              >
                Next Step
              </button>
            </div>
          </div>

          <div style={{ display: currentStep === 3 ? 'block' : 'none' }}>
            <h3 style={{ marginBottom: '1rem', color: '#1e40af' }}>Step 3: Get Your Briefing</h3>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Where should we send your report?"
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '1rem',
                }}
              />
              <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.5rem' }}>
                We'll send a custom intel sheet within minutes.
              </p>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button
                type="button"
                onClick={handlePrevStep}
                style={{
                  padding: '12px 24px',
                  background: '#f1f5f9',
                  color: '#334155',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
              >
                Back
              </button>
              <button
                type="submit"
                disabled={!email || isSubmitting}
                style={{
                  padding: '12px 32px',
                  background: email && !isSubmitting ? '#f97316' : '#e2e8f0',
                  color: email && !isSubmitting ? 'white' : '#94a3b8',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: email && !isSubmitting ? 'pointer' : 'not-allowed',
                  fontWeight: 'bold',
                }}
              >
                {isSubmitting ? 'Sending...' : 'Get My Briefing'}
              </button>
            </div>
          </div>
        </form>
      )}
    </section>
  );
}
