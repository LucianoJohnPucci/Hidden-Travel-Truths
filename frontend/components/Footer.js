import React, { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send data to webhook
      await fetch('https://n8n.puffcloud.net/webhook/2aae2967-55d3-4ef5-831b-9b01b9f36fd3', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'Newsletter Signup'
        })
      });
      
      setIsSubmitted(true);
      setEmail('');
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer style={{ 
      padding: '4rem 2rem 2rem',
      background: '#0f172a',
      color: 'white',
      fontFamily: 'Poppins, sans-serif'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ 
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {/* Brand Column */}
          <div style={{ flex: '1 1 300px' }}>
            <h3 style={{ 
              fontSize: '1.5rem', 
              marginBottom: '1rem',
              fontWeight: '600',
              color: '#f97316'
            }}>
              Behind the Brochure
            </h3>
            <p style={{ 
              color: '#cbd5e1',
              marginBottom: '1.5rem',
              lineHeight: '1.6'
            }}>
              Providing travelers with real-time intelligence for safer, smarter journeys worldwide.
            </p>
            <div style={{ 
              display: 'flex',
              gap: '1rem'
            }}>
              {/* Social Media Icons */}
              {['Twitter', 'Facebook', 'Instagram', 'LinkedIn'].map((social, index) => (
                <a 
                  key={index}
                  href="#"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: '#1e293b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    textDecoration: 'none',
                    fontSize: '0.875rem'
                  }}
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>
          
          {/* Newsletter Signup */}
          <div style={{ flex: '1 1 400px' }}>
            <h3 style={{ 
              fontSize: '1.25rem', 
              marginBottom: '1rem',
              fontWeight: '500'
            }}>
              Stay in the loop—weekly top travel alerts
            </h3>
            
            {isSubmitted ? (
              <div style={{ 
                padding: '1rem',
                background: '#10b981',
                borderRadius: '8px',
                marginBottom: '1rem'
              }}>
                <p>Thank you for subscribing! Check your inbox soon for travel updates.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ marginBottom: '1.5rem' }}>
                <div style={{ 
                  display: 'flex',
                  gap: '0.5rem'
                }}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    style={{
                      flex: 1,
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: 'none',
                      fontSize: '1rem',
                      background: '#1e293b',
                      color: 'white'
                    }}
                  />
                  <button
                    type="submit"
                    disabled={!email || isSubmitting}
                    style={{
                      padding: '0.75rem 1.5rem',
                      background: '#f97316',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: email && !isSubmitting ? 'pointer' : 'not-allowed',
                      fontWeight: '500',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {isSubmitting ? 'Sending...' : 'Subscribe'}
                  </button>
                </div>
              </form>
            )}
            
            <p style={{ 
              fontSize: '0.875rem',
              color: '#94a3b8'
            }}>
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
        
        {/* Links and Copyright */}
        <div style={{ 
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid #334155',
          paddingTop: '2rem'
        }}>
          <div>
            <nav>
              <ul style={{ 
                display: 'flex',
                gap: '1.5rem',
                listStyle: 'none',
                padding: 0,
                margin: 0,
                flexWrap: 'wrap'
              }}>
                {['Privacy', 'Terms', 'Contact', 'Careers'].map((link, index) => (
                  <li key={index}>
                    <Link href="#" style={{ 
                      color: '#94a3b8',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      transition: 'color 0.2s ease'
                    }}>
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          
          <div style={{ 
            color: '#64748b',
            fontSize: '0.875rem',
            marginTop: '1rem'
          }}>
            © 2025 Behind the Brochure. Navigating the unknown, together.
          </div>
        </div>
      </div>
    </footer>
  );
}
