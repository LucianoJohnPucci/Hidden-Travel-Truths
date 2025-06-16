import React from 'react';

export default function BenefitsTiles() {
  const benefits = [
    {
      title: 'No More Nasty Surprises',
      description: 'Know entry bans, strikes, or weather hazards before you pack.',
      icon: '🛡️'
    },
    {
      title: 'AI, Not Guesswork',
      description: 'Multilingual agents monitor 4,000+ data sources 24/7.',
      icon: '🤖'
    },
    {
      title: 'Tailored to You',
      description: 'Advice changes if you\'re solo vs. with kids.',
      icon: '👨‍👩‍👧‍👦'
    },
    {
      title: 'One-Click Share',
      description: 'Forward the briefing to travel buddies or HR.',
      icon: '📤'
    }
  ];

  return (
    <section style={{ 
      padding: '4rem 2rem',
      background: 'white',
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
          Risk-Busters
        </h2>
        
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem'
        }}>
          {benefits.map((benefit, index) => (
            <div key={index} style={{ 
              background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
              borderRadius: '12px',
              padding: '2rem',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer',
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ 
                fontSize: '3rem', 
                marginBottom: '1rem',
                color: '#1e40af'
              }}>
                {benefit.icon}
              </div>
              <h3 style={{ 
                fontSize: '1.25rem', 
                marginBottom: '1rem', 
                color: '#1e40af',
                fontWeight: '600'
              }}>
                {benefit.title}
              </h3>
              <p style={{ 
                color: '#475569',
                fontSize: '1rem',
                lineHeight: '1.6',
                flex: 1
              }}>
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
