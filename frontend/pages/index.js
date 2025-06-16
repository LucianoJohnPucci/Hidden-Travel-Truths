import { useState } from 'react';
import HeroSection from '../components/HeroSection';
import HowItWorks from '../components/HowItWorks';
import BenefitsTiles from '../components/BenefitsTiles';
import SocialProof from '../components/SocialProof';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div style={{ fontFamily: 'Poppins, sans-serif', background: '#f8fafc' }}>
      {/* Hero Section */}
      <HeroSection />
      
      {/* How It Works */}
      <HowItWorks />
      
      {/* Benefits/Risk-Buster Tiles */}
      <BenefitsTiles />
      
      {/* Social Proof */}
      <SocialProof />
      
      {/* FAQ */}
      <FAQ />
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
