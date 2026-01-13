
import React, { useRef } from 'react';
import { styles } from '../App';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const Footer: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  return (
    <footer id="contact" className="bg-slate-900 text-white py-12" ref={sectionRef}>
      <div className={`max-w-4xl mx-auto px-4 text-center transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 style={styles.headerFont} className="text-2xl font-bold mb-8">Ready to Pack Your Bags?</h2>
        
        <p className="text-slate-500 text-sm">
          © 2025 Kedarkantha Expeditions. Limited seats available. <br/>
          Prices subject to change based on availability.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
