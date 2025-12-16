
import React from 'react';
import HeroSection from './components/HeroSection';
import HighlightsSection from './components/HighlightsSection';
import PhotoGallerySection from './components/PhotoGallerySection';
import ItinerarySection from './components/ItinerarySection';
import TrekDetailsSection from './components/TrekDetailsSection';
import MysterySection from './components/MysterySection';
import ContactFormSection from './components/ContactFormSection';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

// Custom styles to be used across components
export const styles = {
  container: { fontFamily: "'Open Sans', sans-serif" },
  headerFont: { fontFamily: "'Montserrat', sans-serif" },
  snowGradient: { background: 'linear-gradient(180deg, #1e3a8a 0%, #3b82f6 50%, #eff6ff 100%)' },
  mysteryGradient: { background: 'linear-gradient(135deg, #4c1d95 0%, #8b5cf6 100%)' }
};

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800" style={styles.container}>
      <HeroSection />
      <main>
        <HighlightsSection />
        <PhotoGallerySection />
        <ItinerarySection />
        <TrekDetailsSection />
        <MysterySection />
        <ContactFormSection />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default App;
