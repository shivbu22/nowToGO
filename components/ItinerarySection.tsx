
import React, { useState, useRef } from 'react';
import { MapPin, Tent, Mountain, Sunrise, Bus } from 'lucide-react';
import { styles } from '../App';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const itineraryData = [
  {
    day: "Day 1",
    title: "Arrival in Sankri",
    desc: "Arrive at the base camp, Sankri (1,920m). Briefing, dinner, and overnight stay in a cozy guesthouse.",
    icon: <MapPin className="w-6 h-6" />
  },
  {
    day: "Day 2",
    title: "Trek to Juda Ka Talab",
    desc: "Trek 4km through pine forests to the frozen lake of Juda Ka Talab (2,700m). Camping under the stars.",
    icon: <Tent className="w-6 h-6" />
  },
  {
    day: "Day 3",
    title: "Base Camp Arrival",
    desc: "Short trek to Kedarkantha Base Camp (3,400m). Acclimatization and snowcraft training. Prepare for summit.",
    icon: <Mountain className="w-6 h-6" />
  },
  {
    day: "Day 4",
    title: "The Summit Push",
    desc: "Start at 3 AM. Climb to the summit (3,800m) for a majestic sunrise. Descend back to Hargaon/Sankri.",
    icon: <Sunrise className="w-6 h-6" />
  },
  {
    day: "Day 5",
    title: "Departure / Leisure",
    desc: "Morning tea and breakfast. Check out and departure with a bag full of memories.",
    icon: <Bus className="w-6 h-6" />
  }
];

const ItinerarySection: React.FC = () => {
  const [activeDay, setActiveDay] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  return (
    <section className="py-16 bg-white" ref={sectionRef}>
      <div className="max-w-4xl mx-auto px-4">
        <h2 style={styles.headerFont} className="text-3xl font-bold text-center mb-12 text-slate-800">The Journey</h2>
        
        <div className="space-y-6">
          {itineraryData.map((item, idx) => (
            <div 
              key={idx} 
              className={`p-6 rounded-xl transition-all duration-300 cursor-pointer border ${activeDay === idx ? 'bg-blue-50 border-blue-200 shadow-md' : 'bg-slate-50 border-transparent hover:bg-slate-100'} ${isVisible ? 'animate-slide-in-bottom' : 'opacity-0'}`}
              style={{ animationDelay: `${idx * 150}ms` }}
              onClick={() => setActiveDay(idx)}
            >
              <div className="flex gap-4 items-start">
                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${activeDay === idx ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                  {item.icon}
                </div>
                <div className="flex-1">
                  <span className="text-sm font-bold tracking-wider text-blue-600 uppercase">{item.day}</span>
                  <h3 style={styles.headerFont} className="text-xl font-bold my-1 text-slate-800">{item.title}</h3>
                  <div 
                     className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${activeDay === idx ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                  >
                    <div className="overflow-hidden">
                      <p className={`text-slate-600 leading-relaxed pt-2 transition-opacity duration-300 ease-in ${activeDay === idx ? 'opacity-100 delay-200' : 'opacity-0'}`}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ItinerarySection;
    