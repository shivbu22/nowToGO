
import React, { useRef } from 'react';
import { styles } from '../App';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { Check } from 'lucide-react';

const itineraryData = [
  {
    day: "Day 1",
    title: "Dehradun to Sankri",
    details: [
      "Trekkers will be picked up from Dehradun railway station at 7 AM to start the journey to Sankri village.",
      "Enjoy a memorable drive along the Yamuna river, surrounded by beautiful pine forests and captivating sights.",
      "Reach the beautiful village of Sankri by 5 PM. After freshening up, explore the village before a cozy homestay."
    ],
    images: [
      'https://lkfnglrbdzdyjeebnnez.supabase.co/storage/v1/object/public/trek-images/sankri-village-6502967.webp',
      'https://lkfnglrbdzdyjeebnnez.supabase.co/storage/v1/object/public/trek-images/vidhey-pv-0a_7nTNd5kY-unsplash.jpg'
    ]
  },
  {
    day: "Day 2",
    title: "Sankri to Juda Ka Talab",
    details: [
        "Begin a mesmerizing 4 km trek from Sankri to Juda Ka Talab, located at an altitude of 9,100 ft.",
        "The trail passes through riveting forests of deodar, oak, and birch, with a dense carpet of maple leaves.",
        "Night stay will be in tents near the serene Juda lake, offering a chance to connect with nature."
    ],
    images: [
      'https://lkfnglrbdzdyjeebnnez.supabase.co/storage/v1/object/public/trek-images/roshan-mohammed-O_jdx6EeZRA-unsplash.jpg',
      'https://lkfnglrbdzdyjeebnnez.supabase.co/storage/v1/object/public/trek-images/c9efeaf0-812e-4cac-8718-a1bb97c37852_2.+Kedarkantha_Caroline_Indiahikes_base+camp+view_.webp'
    ]
  },
  {
    day: "Day 3",
    title: "Juda Ka Talab to Basecamp",
    details: [
        "Your trek continues towards the Kedarkantha base, nestled at an altitude of 11,250 ft.",
        "The trail goes through forests of pine and oak which later open up into breathtaking meadows.",
        "Experience splendid views of Himalayan peaks like Swarga Rohini, Kala Nag, and Bandarpoonch."
    ],
    images: [
      'https://lkfnglrbdzdyjeebnnez.supabase.co/storage/v1/object/public/trek-images/neha-maheen-mahfin-SbCqwxc9-Cg-unsplash.jpg',
      'https://lkfnglrbdzdyjeebnnez.supabase.co/storage/v1/object/public/trek-images/1fab7a44-4800-4b4a-a2cb-b8f8b6fe68fd_8.1+Kedarkantha_Indiahikes_Gourab_winter+season_+(2).webp'
    ]
  },
  {
    day: "Day 4",
    title: "Peak Summit & Return to Hargaon",
    details: [
        "Trek from base camp to the Kedarkantha summit, located at a height of 12,000 ft.",
        "After soaking in the panoramic views, descend back to base camp and then to the Hargaon campsite.",
        "Enjoy a delicious and healthy breakfast and spend the night under an open sky filled with sparkling stars."
    ],
    images: [
      'https://lkfnglrbdzdyjeebnnez.supabase.co/storage/v1/object/public/trek-images/pexels-sanket-barik-2808574-7846481.jpg',
      'https://lkfnglrbdzdyjeebnnez.supabase.co/storage/v1/object/public/trek-images/akhilesh-ravi-utyQ-pgh2mQ-unsplash.jpg'
    ]
  },
  {
    day: "Day 5",
    title: "Hargaon to Sankri to Ghaziabad",
    details: [
      "On the final day, trek back from Hargaon to Sankri.",
      "After reaching the village, we will begin our overnight journey back to Ghaziabad, filled with lifelong memories.",
      "Say goodbye to an exciting trek that will give you unique experiences to cherish forever."
    ],
    images: [
      'https://lkfnglrbdzdyjeebnnez.supabase.co/storage/v1/object/public/trek-images/pexels-ex-route-adventures-656223369-20282345.jpg',
      'https://lkfnglrbdzdyjeebnnez.supabase.co/storage/v1/object/public/trek-images/7040e56b-983f-4f00-93ea-be2c3e0712c0_19..+Kedarkantha_Jothiranjan_Winter+season_+(6).webp'
    ]
  }
];

const ItinerarySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  return (
    <section className="py-20 bg-white" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-4">
        <div className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 style={styles.headerFont} className="text-3xl font-bold text-center mb-4 text-slate-800">
                A Day in the Life
            </h2>
            <p className="text-center text-slate-500 mb-16 max-w-2xl mx-auto">
                Follow the daily journey from the bustling city to the serene summit, detailing each step of your adventure.
            </p>
        </div>

        <div className="space-y-16">
          {itineraryData.map((item, idx) => (
            <div
              key={item.day}
              className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center transition-all duration-700 ease-out delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              {/* Text Content */}
              <div className={`text-content ${idx % 2 !== 0 ? 'md:order-2' : ''}`}>
                <span className="text-sm font-bold tracking-wider text-blue-600 uppercase">{item.day}</span>
                <h3 style={styles.headerFont} className="text-2xl font-bold my-2 text-slate-800">{item.title}</h3>
                <ul className="space-y-3 mt-4">
                  {item.details.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-3 text-slate-600">
                      <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Image Gallery */}
              <div className={`image-gallery grid grid-cols-2 gap-4 ${idx % 2 !== 0 ? 'md:order-1' : ''}`}>
                <img 
                  src={item.images[0]} 
                  alt={`${item.title} view 1`}
                  className="w-full h-full object-cover rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 aspect-[4/5]"
                />
                 <img 
                  src={item.images[1]} 
                  alt={`${item.title} view 2`}
                  className="w-full h-full object-cover rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 aspect-[4/5] mt-8"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ItinerarySection;