import React from 'react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section style={{
      padding: '4rem 2rem',
      background: 'linear-gradient(135deg, #1e40af 0%, #0369a1 100%)',
      color: 'white',
      textAlign: 'center',
      position: 'relative',
      fontFamily: 'Poppins, sans-serif',
      backgroundImage: 'url("/hero-bg.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundBlendMode: 'overlay',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ 
          fontSize: '3.5rem', 
          marginBottom: '1rem',
          fontWeight: '700'
        }}>
          See what the brochure leaves out.
        </h1>
        <p style={{ 
          fontSize: '1.5rem', 
          maxWidth: '800px', 
          margin: '0 auto 2.5rem',
          fontWeight: '300'
        }}>
          Real-time alerts on last-minute risks, rules, and news for your next trip.
        </p>
        <Link href="/advice">
          <button 
            style={{ 
              padding: '16px 40px', 
              fontSize: '1.2rem', 
              background: '#f97316', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px', 
              cursor: 'pointer', 
              fontWeight: 'bold',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Check My Trip
          </button>
        </Link>
      </div>
    </section>
  );
}
