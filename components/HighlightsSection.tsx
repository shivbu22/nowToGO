
import React, { useRef } from 'react';
import { Camera, Flame, Utensils } from 'lucide-react';
import { styles } from '../App';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const highlights = [
  {
    icon: <Camera className="w-6 h-6" />,
    title: "360° Views",
    description: "Witness the majestic peaks of Swargarohini, Bandarpoonch, and Black Peak from the top."
  },
  {
    icon: <Flame className="w-6 h-6" />,
    title: "Campfire Nights",
    description: "Experience cozy evenings with bonfires, music, and stargazing at minus temperatures."
  },
  {
    icon: <Utensils className="w-6 h-6" />,
    title: "Delicious Meals",
    description: "Hot, nutritious meals served throughout the trek to keep you energized."
  }
];

const HighlightCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-t-4 border-blue-600">
    <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center text-blue-600 mb-4">
      {icon}
    </div>
    <h3 style={styles.headerFont} className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const HighlightsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.2 });

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto" ref={sectionRef}>
      <div className="grid md:grid-cols-3 gap-8">
        {highlights.map((highlight, index) => (
          <div
            key={index}
            className={`transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <HighlightCard {...highlight} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HighlightsSection;
