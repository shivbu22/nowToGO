
import React, { useRef } from 'react';
import { Check, Bus } from 'lucide-react';
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
          <p className="text-center text-slate-500 mb-12 max-w-2xl mx-auto">
            Affordable packages designed for every type of adventurer. Transport from Dehradun included in select options!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Ex-Dehradun */}
          <div 
            className={`bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '150ms' }}
          >
            <div className="text-center mb-6">
              <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Ex-Dehradun</span>
              <h3 style={styles.headerFont} className="text-4xl font-extrabold text-slate-900 mt-4">₹5,800</h3>
              <p className="text-sm text-slate-500">per person</p>
            </div>
            <ul className="space-y-3 mb-8 text-slate-600">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> 5 Nights / 6 Days Stay</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> All Meals Included</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Forest Permits & Expert Guide</li>
              <li className="flex items-center gap-2 text-slate-400"><Bus className="w-4 h-4" /> Dehradun Transport Not Included</li>
            </ul>
            <button onClick={handleBookNowClick} className="w-full py-3 bg-slate-800 text-white text-center rounded-xl font-semibold hover:bg-slate-900 transition-colors">
              Book Now
            </button>
          </div>

          {/* With Transport */}
          <div 
            className={`bg-white rounded-2xl p-8 shadow-xl border-2 border-blue-600 relative overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl shadow-md">BEST VALUE</div>
            <div className="text-center mb-6">
              <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Duplet / Couple</span>
              <h3 style={styles.headerFont} className="text-4xl font-extrabold text-blue-600 mt-4">₹5,600</h3>
              <p className="text-sm text-slate-500 font-semibold">per person</p>
            </div>
            <ul className="space-y-3 mb-8 text-slate-600">
              <li className="flex items-center gap-2 font-semibold"><Bus className="w-4 h-4 text-blue-500" /> Dehradun ➝ Dehradun Transport</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> <strong>Twin Sharing</strong> Accommodation</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> 5 Nights / 6 Days Stay</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> All Meals & Permits Included</li>
            </ul>
            <button onClick={handleBookNowClick} className="w-full py-3 bg-blue-600 text-white text-center rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/60">
              Book for Two
            </button>
          </div>
          
          {/* Group Pass */}
          <div 
            className={`bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '450ms' }}
          >
            <div className="text-center mb-6">
              <span className="bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Friends & Group</span>
              <h3 style={styles.headerFont} className="text-4xl font-extrabold text-purple-600 mt-4">₹5,500</h3>
              <p className="text-sm text-slate-500">per person (min 7)</p>
            </div>
            <ul className="space-y-3 mb-8 text-slate-600">
              <li className="flex items-center gap-2 font-semibold"><Bus className="w-4 h-4 text-blue-500" /> Dehradun ➝ Dehradun Transport</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Group Accommodation</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> 5 Nights / 6 Days Stay</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> All Meals & Permits Included</li>
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
