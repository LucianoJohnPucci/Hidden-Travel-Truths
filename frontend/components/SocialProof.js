import React, { useState, useEffect } from 'react';

export default function SocialProof() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  const testimonials = [
    {
      quote: "A volcano erupted the day after we arrived—thanks for the heads-up! We were able to adjust our itinerary and stay safe.",
      author: "Sarah M., Family Traveler"
    },
    {
      quote: "The transit strike alert saved our business trip. We arranged alternative transportation before even landing.",
      author: "Michael T., Business Traveler"
    },
    {
      quote: "As a solo female traveler, the local safety insights were invaluable. I felt prepared and confident throughout my journey.",
      author: "Jessica L., Solo Adventurer"
    }
  ];

  const trustBadges = [
    'BBC', 'CNN', 'Reuters', 'CDC', 'gov.uk', 'WHO', 'travel.state.gov'
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section style={{ 
      padding: '4rem 2rem',
      background: '#f1f5f9',
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
          Travelers Trust Us
        </h2>
        
        {/* Testimonial Carousel */}
        <div style={{ 
          position: 'relative',
          maxWidth: '800px',
          margin: '0 auto 4rem',
          minHeight: '200px'
        }}>
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                opacity: activeTestimonial === index ? 1 : 0,
                transform: `translateX(${activeTestimonial === index ? 0 : (activeTestimonial > index ? -100 : 100)}px)`,
                transition: 'opacity 0.5s ease, transform 0.5s ease',
                visibility: activeTestimonial === index ? 'visible' : 'hidden',
                background: 'white',
                borderRadius: '12px',
                padding: '2rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '1rem', color: '#f97316' }}>❝</div>
              <p style={{ 
                fontSize: '1.25rem', 
                fontStyle: 'italic',
                marginBottom: '1.5rem',
                color: '#334155',
                lineHeight: '1.6'
              }}>
                {testimonial.quote}
              </p>
              <p style={{ fontWeight: '600', color: '#1e40af' }}>{testimonial.author}</p>
            </div>
          ))}
          
          {/* Carousel Indicators */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '0.5rem',
            position: 'absolute',
            bottom: '-2rem',
            left: 0,
            right: 0
          }}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: activeTestimonial === index ? '#1e40af' : '#cbd5e1',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer'
                }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Trust Badges */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ 
            fontSize: '0.875rem', 
            color: '#64748b', 
            marginBottom: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Data Sources We Monitor
          </p>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'center',
            gap: '1.5rem',
            alignItems: 'center'
          }}>
            {trustBadges.map((badge, index) => (
              <div key={index} style={{ 
                padding: '0.5rem 1rem',
                background: 'white',
                borderRadius: '6px',
                fontSize: '1rem',
                fontWeight: '600',
                color: '#64748b',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}>
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
