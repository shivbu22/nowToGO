
import React, { useState, useRef } from 'react';
import { Award, Backpack, CheckCircle, XCircle, Map } from 'lucide-react';
import { styles } from '../App';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const tabs = [
  { id: 'highlights', label: 'Highlights', icon: <Award className="w-5 h-5" /> },
  { id: 'itinerary', label: 'Itinerary', icon: <Map className="w-5 h-5" /> },
  { id: 'inclusions', label: 'Inclusions', icon: <CheckCircle className="w-5 h-5" /> },
  { id: 'packing', label: 'Packing List', icon: <Backpack className="w-5 h-5" /> },
];

const highlightsData = [
  { label: "Altitude", value: "12,500 ft" },
  { label: "Duration", value: "5 Nights / 6 Days" },
  { label: "Distance", value: "24 km (round trip)" },
  { label: "Difficulty", value: "Easy to Moderate" },
  { label: "Start/End Point", value: "Ghaziabad" },
  { label: "Best Season", value: "Winter (for snow)" },
];

const itineraryTableData = [
    { day: 0, from: "Ghaziabad", to: "Dehradun", activity: "Overnight Travel", highlights: "Meet at Ghaziabad station in the evening for departure to Dehradun." },
    { day: 1, from: "Dehradun", to: "Sankri", activity: "Drive (7 AM - 5 PM)", highlights: "Pickup from railway station. Drive along Yamuna River. Explore Sankri village. Homestay." },
    { day: 2, from: "Sankri", to: "Juda Ka Talab", activity: "Trek (4 km / 9,100 ft)", highlights: "Trek through dense forests of maple, oak, and birch. Camp stay near the lake." },
    { day: 3, from: "Juda Ka Talab", to: "Base Camp", activity: "Trek (11,250 ft)", highlights: "Ascend through meadows with views of Swarga Rohini, Kala Nag, and Bandarpoonch peaks." },
    { day: 4, from: "Base Camp", to: "Hargaon", activity: "Summit Trek (12,000 ft)", highlights: "Summit Kedarkantha peak, witness panoramic views, and descend to Hargaon campsite." },
    { day: 5, from: "Hargaon", to: "Ghaziabad", activity: "Trek & Overnight Drive", highlights: "Trek down to Sankri, then begin overnight journey back to Ghaziabad. Expected arrival next morning." },
];

const inclusionsData = [
    "Round-trip transport from Ghaziabad",
    "1 Night Stay in Sankri (Homestay)",
    "1 Night Stay in Juda Ka Talab (Camp)",
    "1 Night Stay in Kedarkantha Base (Camp)",
    "1 Night Stay in Hargaon (Camp)",
    "All meals included during the trek",
    "Local and certified guides",
    "Rental gears"
];
const exclusionsData = [
    "Tickets for any sightseeing or extra activity",
    "Travel insurance and other benefits",
    "Anything not mentioned in the inclusions",
    "Heater charge (extra)"
];

const packingData = {
  clothing: ["Down Jacket", "Raincoat / Poncho", "Inner Layers & Fleece", "Trekking Pants & T-Shirts", "Extra Socks & Clothes", "Woolen Cap & Gloves", "Neck Warmer"],
  gear: ["Rucksack (min 40L)", "Trekking Shoes", "Slippers", "Power Bank", "Sunscreen & Sunglasses", "Torch / Headlamp", "Water Bottle (2L)"],
  essentials: ["Tissue Roll & Hand Sanitizer", "Personal Toiletries", "First-Aid Kit", "Basic Medicines"]
};

const TabContent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="p-6 bg-white rounded-b-2xl rounded-tr-2xl border-l border-r border-b border-slate-200 animate-fade-in">
        {children}
    </div>
);

const TrekDetailsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('highlights');
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  return (
    <section className="py-20 bg-slate-50" ref={sectionRef}>
      <div className="max-w-4xl mx-auto px-4">
        <div className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 style={styles.headerFont} className="text-3xl font-bold text-center mb-4 text-slate-800">Trek Essentials</h2>
          <p className="text-center text-slate-500 mb-12 max-w-2xl mx-auto">
            Everything you need to know to prepare for your Himalayan adventure, all in one place.
          </p>
        </div>

        <div className={`transition-all duration-700 ease-out delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex border-b border-slate-200">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 sm:flex-none sm:px-6 py-3 flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-300 border-b-2 ${
                            activeTab === tab.id
                            ? 'text-blue-600 border-blue-600'
                            : 'text-slate-500 border-transparent hover:bg-slate-100 hover:text-slate-700'
                        }`}
                    >
                        {tab.icon}
                        <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                ))}
            </div>

            {activeTab === 'highlights' && (
              <TabContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
                  {highlightsData.map(item => (
                    <div key={item.label} className="bg-slate-50 p-4 rounded-xl">
                      <p className="text-sm text-slate-500">{item.label}</p>
                      <p style={styles.headerFont} className="font-bold text-lg text-slate-800">{item.value}</p>
                    </div>
                  ))}
                </div>
              </TabContent>
            )}

            {activeTab === 'itinerary' && (
              <TabContent>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-600">
                        <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                            <tr>
                                <th scope="col" className="px-4 py-3">Day</th>
                                <th scope="col" className="px-4 py-3">Activity</th>
                                <th scope="col" className="px-4 py-3">Highlights</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itineraryTableData.map(row => (
                                <tr key={row.day} className="bg-white border-b">
                                    <td className="px-4 py-4 font-bold text-slate-800">{row.day}</td>
                                    <td className="px-4 py-4">
                                        <p className="font-semibold">{row.from} ➝ {row.to}</p>
                                        <p className="text-xs text-slate-500">{row.activity}</p>
                                    </td>
                                    <td className="px-4 py-4">{row.highlights}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
              </TabContent>
            )}

            {activeTab === 'inclusions' && (
              <TabContent>
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="font-bold text-lg text-green-600 mb-3">What's Included?</h3>
                        <ul className="space-y-2">
                            {inclusionsData.map(item => <li key={item} className="flex items-center gap-2 text-slate-600"><CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" /> {item}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-red-600 mb-3">What's Excluded?</h3>
                        <ul className="space-y-2">
                            {exclusionsData.map(item => <li key={item} className="flex items-center gap-2 text-slate-600"><XCircle className="w-4 h-4 text-red-500 flex-shrink-0" /> {item}</li>)}
                        </ul>
                    </div>
                </div>
              </TabContent>
            )}

            {activeTab === 'packing' && (
              <TabContent>
                 <div className="grid md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="font-bold text-lg text-slate-800 mb-3">Clothing & Gear</h3>
                        <ul className="space-y-2">
                            {packingData.clothing.map(item => <li key={item} className="flex items-start gap-2 text-slate-600"><Backpack className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" /> {item}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-slate-800 mb-3">Hardware</h3>
                         <ul className="space-y-2">
                            {packingData.gear.map(item => <li key={item} className="flex items-start gap-2 text-slate-600"><Backpack className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" /> {item}</li>)}
                        </ul>
                    </div>
                     <div>
                        <h3 className="font-bold text-lg text-slate-800 mb-3">Essentials</h3>
                         <ul className="space-y-2">
                            {packingData.essentials.map(item => <li key={item} className="flex items-start gap-2 text-slate-600"><Backpack className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" /> {item}</li>)}
                        </ul>
                    </div>
                 </div>
              </TabContent>
            )}
        </div>
      </div>
    </section>
  );
};

export default TrekDetailsSection;