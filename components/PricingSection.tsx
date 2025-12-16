
import React, { useRef } from 'react';
import { Check, Bus, Train } from 'lucide-react';
import { styles } from '../App';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const PricingSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  const handleBookNowClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 px-4 bg-slate-50" ref={sectionRef}>
      <div className="max-w-5xl mx-auto">
        <h2 style={styles.headerFont} className="text-3xl font-bold text-center mb-4">Choose Your Package</h2>
        <p className="text-center text-slate-500 mb-12">Transport from Dehradun included in select packages!</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Solo Traveler */}
          <div 
            className={`bg-white rounded-2xl p-8 shadow-xl border border-slate-100 hover:scale-105 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '150ms' }}
          >
            <div className="text-center mb-6">
              <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Solo Traveler</span>
              <h3 style={styles.headerFont} className="text-4xl font-extrabold text-slate-900 mt-4">₹5,499</h3>
              <p className="text-sm text-slate-500">per person</p>
            </div>
            <ul className="space-y-3 mb-8 text-slate-600">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> 4 Nights / 5 Days Stay</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> All Meals (Veg)</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Forest Permits & Expert Guide</li>
            </ul>
            <button onClick={handleBookNowClick} className="w-full py-3 bg-slate-800 text-white text-center rounded-xl font-semibold hover:bg-slate-900 transition-colors">
              Book Solo
            </button>
          </div>

          {/* Duplet Pass */}
          <div 
            className={`bg-white rounded-2xl p-8 shadow-xl border-2 border-blue-600 relative overflow-hidden hover:scale-105 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">BEST VALUE</div>
            <div className="text-center mb-6">
              <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Duplet / Couple</span>
              <h3 style={styles.headerFont} className="text-4xl font-extrabold text-blue-600 mt-4">₹5,800</h3>
              <p className="text-sm text-slate-500 font-semibold">per person</p>
            </div>
            <ul className="space-y-3 mb-8 text-slate-600">
              <li className="flex items-center gap-2 font-semibold"><Train className="w-4 h-4 text-purple-500" /> Train Tickets to Dehradun</li>
              <li className="flex items-center gap-2 font-semibold"><Bus className="w-4 h-4 text-blue-500" /> Dehradun ➝ Dehradun Transport</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> <strong>Twin Sharing</strong> Accommodation</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> 4 Nights / 5 Days Stay</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> All Meals (Veg) & Permits</li>
            </ul>
            <button onClick={handleBookNowClick} className="w-full py-3 bg-blue-600 text-white text-center rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/60">
              Book for Two
            </button>
          </div>
          
          {/* Group Pass */}
          <div 
            className={`bg-white rounded-2xl p-8 shadow-xl border-2 border-purple-500 relative overflow-hidden hover:scale-105 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '450ms' }}
          >
            <div className="absolute top-0 right-0 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">POPULAR CHOICE</div>
            <div className="text-center mb-6">
              <span className="bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Friends & Group</span>
              <h3 style={styles.headerFont} className="text-4xl font-extrabold text-purple-600 mt-4">₹5,199</h3>
              <p className="text-sm text-slate-500">per person (7+)</p>
            </div>
            <ul className="space-y-3 mb-8 text-slate-600">
              <li className="flex items-center gap-2 font-semibold"><Bus className="w-4 h-4 text-blue-500" /> Dehradun ➝ Dehradun Transport</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> <strong>Group</strong> Accommodation</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> 4 Nights / 5 Days Stay</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> All Meals (Veg) & Permits</li>
            </ul>
            <button onClick={handleBookNowClick} className="w-full py-3 bg-purple-500 text-white text-center rounded-xl font-semibold hover:bg-purple-600 transition-all shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/60">
              Book for Group
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
