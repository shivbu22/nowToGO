
import React, { useState, useEffect } from 'react';
import { Calendar, ThermometerSnowflake, ChevronDown } from 'lucide-react';
import { styles } from '../App';
import SnowfallEffect from './SnowfallEffect';

const HeroSection: React.FC = () => {
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => setOffsetY(window.scrollY);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEnquireClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const videoUrl = 'https://lkfnglrbdzdyjeebnnez.supabase.co/storage/v1/object/public/trek-videos/kedarkantha-hero-bg.mp4';

  return (
    <header 
      style={styles.snowGradient} 
      className="text-white min-h-[85vh] flex flex-col items-center justify-center relative overflow-hidden px-4 text-center"
      role="banner"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
        style={{
          transform: `translateY(${offsetY * 0.4}px)`,
          willChange: 'transform'
        }}
        aria-hidden="true"
        title="Breathtaking snowy peaks of Kedarkantha"
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <SnowfallEffect />

      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <span className="bg-blue-500/30 text-blue-100 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider mb-6 backdrop-blur-sm border border-blue-400/30">
          WINTER EDITION 2025-26
        </span>
        
        <h1 style={styles.headerFont} className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight drop-shadow-lg uppercase">
          Kedarkantha <span className="block text-4xl md:text-5xl font-bold mt-2">Winter Trek</span>
        </h1>
        <p className="text-xl md:text-2xl font-light mb-8 max-w-2xl text-blue-100">
          Conquer the Summit at 12,500ft
        </p>

        <button
          onClick={handleEnquireClick}
          style={styles.headerFont}
          className="bg-white text-blue-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-all shadow-lg transform hover:scale-105 mb-8 focus:outline-none focus:ring-4 focus:ring-white/50"
          aria-label="Enquire about the trek"
        >
          Enquire Now
        </button>

        <div className="flex flex-wrap gap-4 justify-center text-sm md:text-base font-semibold">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
            <Calendar className="w-5 h-5" aria-hidden="true" /> 5 Nights / 6 Days
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
            <ThermometerSnowflake className="w-5 h-5" aria-hidden="true" /> Snow Trek
          </div>
        </div>

        <div className="mt-12 animate-bounce" aria-hidden="true">
          <ChevronDown className="w-8 h-8 opacity-75" />
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
