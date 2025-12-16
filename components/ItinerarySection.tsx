
import React, { useState, useRef } from 'react';
import { MapPin, Tent, Mountain, Sunrise, Bus } from 'lucide-react';
import { styles } from '../App';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const itineraryData = [
  {
    day: "Day 0",
    title: "Ghaziabad to Dehradun",
    desc: "Your journey begins in the evening. Meet the group at Ghaziabad Railway Station. We will board an overnight transport to Dehradun, allowing us to get an early start for the mountains the next morning.",
    icon: <Bus className="w-6 h-6" />
  },
  {
    day: "Day 1",
    title: "Dehradun to Sankri",
    desc: "Trekkers will be picked up from Dehradun railway station at 7 AM. The journey starts with a scenic drive along the Yamuna river and through beautiful pine forests. By 5 PM, you will reach the charming village of Sankri. After freshening up, you'll have time to explore. Night stay will be arranged in a cozy local homestay.",
    icon: <Bus className="w-6 h-6" />
  },
  {
    day: "Day 2",
    title: "Sankri to Juda Ka Talab",
    desc: "In the early morning, we begin our mesmerizing 4 km trek to Juda Ka Talab, situated at 9,100 ft. You'll enjoy amazing views as the trail passes through dense forests of maple, deodar, oak, and birch. The night will be spent in tents near the serene lake, offering a chance to connect with nature.",
    icon: <Tent className="w-6 h-6" />
  },
  {
    day: "Day 3",
    title: "Juda Ka Talab to Kedarkantha Basecamp",
    desc: "The trek continues towards the Kedarkantha base, nestled at an altitude of 11,250 ft. The trail moves through pine and oak forests before opening up to breathtaking meadows. Get ready to witness splendid views of Himalayan peaks like Swarga Rohini, Kala Nag, and Bandarpoonch. Night stay will be at the base camp.",
    icon: <Mountain className="w-6 h-6" />
  },
  {
    day: "Day 4",
    title: "Basecamp to Peak to Hargaon",
    desc: "Today we trek from the base to the Kedarkantha summit at 12,000 ft. After soaking in the panoramic views, we will return to base camp and then descend to the Hargaon campsite. The trail passes through crystal clear streams and oak trees. A delicious and healthy breakfast will be served. At night, we'll stay under an open sky filled with sparkling stars.",
    icon: <Sunrise className="w-6 h-6" />
  },
  {
    day: "Day 5",
    title: "Hargaon to Sankri to Ghaziabad",
    desc: "On the final day, we trek back from Hargaon to Sankri. After reaching the village, we will begin our overnight journey back to Ghaziabad, filled with beautiful and lifelong memories. You will be dropped off at Ghaziabad the next morning.",
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