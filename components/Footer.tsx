
import React, { useRef } from 'react';
import { Phone } from 'lucide-react';
import { styles } from '../App';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const Footer: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  return (
    <footer className="bg-slate-900 text-white py-12" ref={sectionRef}>
      <div className={`max-w-4xl mx-auto px-4 text-center transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 style={styles.headerFont} className="text-2xl font-bold mb-8">Ready to Pack Your Bags?</h2>
        
        <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
          <a href="tel:9650584108" className="flex items-center justify-center gap-4 bg-white/10 p-4 rounded-xl hover:bg-white/20 transition-colors border border-white/10">
            <div className="bg-green-500 p-2 rounded-full">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="text-xs text-slate-400 uppercase">Contact Organizer</p>
              <p className="text-lg font-bold">Shivam: 9650584108</p>
            </div>
          </a>
          
          <a href="tel:8527022751" className="flex items-center justify-center gap-4 bg-white/10 p-4 rounded-xl hover:bg-white/20 transition-colors border border-white/10">
            <div className="bg-green-500 p-2 rounded-full">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="text-xs text-slate-400 uppercase">Contact Organizer</p>
              <p className="text-lg font-bold">Jatin: 8527022751</p>
            </div>
          </a>
        </div>

        <p className="text-slate-500 text-sm">
          © 2025 Kedarkantha Expeditions. Limited seats available. <br/>
          Prices subject to change based on availability.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
