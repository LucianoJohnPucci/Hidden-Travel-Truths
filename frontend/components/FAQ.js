import React, { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  
  const faqs = [
    {
      question: "How much does Behind the Brochure cost?",
      answer: "Our basic travel briefing is completely free. For premium features like daily updates, custom alerts, and group sharing, we offer affordable subscription plans starting at just $4.99/month."
    },
    {
      question: "How do you handle my data and privacy?",
      answer: "We take your privacy seriously. Your personal information is encrypted and never sold to third parties. We only use your travel details to generate relevant alerts and recommendations. You can request data deletion at any time."
    },
    {
      question: "Do you cover destinations worldwide?",
      answer: "Yes! We cover over 190 countries and territories globally. Our AI monitoring system works in multiple languages to ensure comprehensive coverage regardless of your destination."
    },
    {
      question: "How often are your alerts updated?",
      answer: "Our system continuously monitors sources and updates alerts in real-time. Your initial briefing contains the most current information, and premium subscribers receive daily updates throughout their trip."
    },
    {
      question: "Why use Behind the Brochure instead of browsing news myself?",
      answer: "Our AI filters through thousands of sources to find only what's relevant to your specific trip dates, location, and travel style. This saves you hours of research and ensures you don't miss critical information buried in local sources or non-English publications."
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section style={{ 
      padding: '4rem 2rem',
      background: 'white',
      fontFamily: 'Poppins, sans-serif'
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ 
          textAlign: 'center', 
          fontSize: '2.25rem', 
          marginBottom: '3rem', 
          color: '#0f172a',
          fontWeight: '600'
        }}>
          Frequently Asked Questions
        </h2>
        
        <div>
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              style={{
                marginBottom: '1rem',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                border: '1px solid #e2e8f0'
              }}
            >
              <button 
                onClick={() => toggleAccordion(index)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '1.25rem',
                  background: openIndex === index ? '#1e40af' : 'white',
                  color: openIndex === index ? 'white' : '#0f172a',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '1.1rem',
                  fontWeight: '500',
                  transition: 'all 0.2s ease'
                }}
              >
                {faq.question}
                <span style={{ fontSize: '1.25rem' }}>
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              <div 
                style={{
                  padding: openIndex === index ? '1.25rem' : '0 1.25rem',
                  maxHeight: openIndex === index ? '300px' : '0',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  background: '#f8fafc'
                }}
              >
                <p style={{ 
                  margin: 0,
                  color: '#475569',
                  lineHeight: '1.6',
                  fontSize: '1rem'
                }}>
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
