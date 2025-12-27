
import React, { useRef } from 'react';
import { Check, Bus, AlertCircle } from 'lucide-react';
import { styles } from '../App';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const PricingSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  const handleBookNowClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 px-4 bg-white" ref={sectionRef}>
      <div className="max-w-5xl mx-auto">
        <div className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 style={styles.headerFont} className="text-3xl font-bold text-center mb-4 text-slate-800">Choose Your Package</h2>
          <p className="text-center text-slate-500 mb-8 max-w-2xl mx-auto">
            Affordable packages designed for every type of adventurer. Round-trip transport from Ghaziabad included!
          </p>
        </div>

        {/* Price Variation Warning */}
        <div 
          className={`mb-12 p-6 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl max-w-2xl mx-auto transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        >
          <div className="flex gap-4">
            <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <p className="font-bold text-amber-900 leading-relaxed uppercase tracking-tight">
                Important Notice: Prices may vary because of potential inconveniences and travel issues such as train cancellations, bus delays, or other unforeseen transport circumstances.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center max-w-3xl mx-auto">
          {/* Solo Adventurer - Now Centered */}
          <div 
            className={`bg-white rounded-2xl p-8 shadow-2xl border border-slate-100 hover:shadow-blue-200 transition-all duration-500 ease-out max-w-sm w-full ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="text-center mb-6">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Solo Adventurer</span>
              <h3 style={styles.headerFont} className="text-5xl font-extrabold text-slate-900 mt-4">₹5,800</h3>
              <p className="text-sm text-slate-500 mt-1 font-medium italic">Base Price per person</p>
            </div>
            <ul className="space-y-4 mb-8 text-slate-600">
              <li className="flex items-center gap-3 font-semibold"><Bus className="w-5 h-5 text-blue-500" /> Ghaziabad ↔ Ghaziabad Transport</li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-green-500" /> 5 Nights / 6 Days Stay</li>
            </ul>
            <button 
              onClick={handleBookNowClick} 
              className="w-full py-4 bg-blue-600 text-white text-center rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 active:scale-95"
            >
              Book My Spot
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
