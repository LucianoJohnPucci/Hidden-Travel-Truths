import React from 'react';

export default function HowItWorks() {
  const steps = [
    {
      icon: '🔍',
      title: 'Scan',
      description: 'Our AI agents sweep local news, government advisories, forums, and blogs.'
    },
    {
      icon: '🔄',
      title: 'Filter',
      description: 'We rank alerts by relevance, severity, and freshness.'
    },
    {
      icon: '📋',
      title: 'Brief',
      description: 'A concise email highlights entry rules, strikes, protests, weather events, health warnings, & practical tips.'
    }
  ];

  return (
    <section style={{ 
      padding: '4rem 2rem', 
      background: '#f8fafc',
      fontFamily: 'Poppins, sans-serif'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ 
          textAlign: 'center', 
          fontSize: '2.25rem', 
          marginBottom: '3rem', 
          color: '#0f172a',
          fontWeight: '600'
        }}>
          How It Works
        </h2>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          gap: '2rem', 
          flexWrap: 'wrap',
          position: 'relative'
        }}>
          {/* Dotted connecting line */}
          <div style={{
            position: 'absolute',
            top: '30%',
            left: '15%',
            right: '15%',
            height: '4px',
            background: 'repeating-linear-gradient(to right, #cbd5e1 0, #cbd5e1 5px, transparent 5px, transparent 12px)',
            zIndex: 0
          }} />
          
          {steps.map((step, index) => (
            <div key={index} style={{ 
              flex: '1 1 300px', 
              textAlign: 'center', 
              padding: '2rem 1.5rem',
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              zIndex: 1,
              position: 'relative'
            }}>
              <div style={{ 
                fontSize: '3.5rem', 
                marginBottom: '1.5rem',
                background: '#1e40af',
                color: 'white',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem'
              }}>
                {step.icon}
              </div>
              <h3 style={{ 
                fontSize: '1.5rem', 
                marginBottom: '1rem', 
                color: '#1e40af',
                fontWeight: '600'
              }}>
                {step.title}
              </h3>
              <p style={{ 
                color: '#475569',
                fontSize: '1.1rem',
                lineHeight: '1.6'
              }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
