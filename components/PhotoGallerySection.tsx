
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { styles } from '../App';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const trekImages = [
  { src: 'https://lkfnglrbdzdyjeebnnez.supabase.co/storage/v1/object/public/trek-images/pexels-sanket-barik-2808574-7846481.jpg', alt: 'Trekkers sitting on a snowy slope, watching a beautiful golden sunset over the mountains.' },
  { src: 'https://lkfnglrbdzdyjeebnnez.supabase.co/storage/v1/object/public/trek-images/neha-maheen-mahfin-SbCqwxc9-Cg-unsplash.jpg', alt: 'The majestic snow-capped peaks of Swargarohini against a clear blue sky.' },
  { src: 'https://lkfnglrbdzdyjeebnnez.supabase.co/storage/v1/object/public/trek-images/pexels-sanket-barik-2808574-7846474.jpg', alt: 'A panoramic view of the vast, snow-covered Himalayan range from a high vantage point.' },
  { src: 'https://lkfnglrbdzdyjeebnnez.supabase.co/storage/v1/object/public/trek-images/roshan-mohammed-O_jdx6EeZRA-unsplash.jpg', alt: 'A wide view of the frozen Juda Ka Talab with a campsite nestled in the snowy woods.' },
  { src: 'https://lkfnglrbdzdyjeebnnez.supabase.co/storage/v1/object/public/trek-images/sankri-village-6502967.webp', alt: 'A lush green valley with the small village of Sankri nestled among terraced fields.' },
  { src: 'https://lkfnglrbdzdyjeebnnez.supabase.co/storage/v1/object/public/trek-images/vidhey-pv-0a_7nTNd5kY-unsplash.jpg', alt: 'A traditional wooden temple in a high-altitude meadow with mountains in the background.' },
  { src: 'https://lkfnglrbdzdyjeebnnez.supabase.co/storage/v1/object/public/trek-images/1fab7a44-4800-4b4a-a2cb-b8f8b6fe68fd_8.1+Kedarkantha_Indiahikes_Gourab_winter+season_+(2).webp', alt: 'A line of trekkers making their way up a steep, sunlit snowy slope towards the summit.' },
  { src: 'https://lkfnglrbdzdyjeebnnez.supabase.co/storage/v1/object/public/trek-images/c9efeaf0-812e-4cac-8718-a1bb97c37852_2.+Kedarkantha_Caroline_Indiahikes_base+camp+view_.webp', alt: 'Bright yellow tents at a campsite with a stunning backdrop of pine trees and mountains at dusk.' },
  { src: 'https://lkfnglrbdzdyjeebnnez.supabase.co/storage/v1/object/public/trek-images/Ansoo%20Lake.jpg', alt: 'A high-altitude alpine lake reflecting the surrounding snowy peaks.' },
  { src: 'https://lkfnglrbdzdyjeebnnez.supabase.co/storage/v1/object/public/trek-images/pexels-ex-route-adventures-656223369-20282345.jpg', alt: 'A trekker standing with arms raised in victory on a summit overlooking misty mountain ranges.' },
  { src: 'https://lkfnglrbdzdyjeebnnez.supabase.co/storage/v1/object/public/trek-images/de68ecd1-dc36-4003-ac6a-cbe520a0622b_20.+Kedarkantha_Jothiranjan_Winter+season_+(3).webp', alt: 'A trekker with a red backpack sitting on a cliff, gazing at the expansive snow-covered peaks.' },
  { src: 'https://lkfnglrbdzdyjeebnnez.supabase.co/storage/v1/object/public/trek-images/7040e56b-983f-4f00-93ea-be2c3e0712c0_19..+Kedarkantha_Jothiranjan_Winter+season_+(6).webp', alt: 'Trekkers following a narrow path carved into the deep snow on a mountain trail.' },
  { src: 'https://lkfnglrbdzdyjeebnnez.supabase.co/storage/v1/object/public/trek-images/akhilesh-ravi-utyQ-pgh2mQ-unsplash.jpg', alt: 'A stunning, clear-day view from the summit, showing endless snow-covered mountain ridges.' }
];

const PhotoGallerySection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  const goToPrevious = () => {
    setIsAnimating(true);
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? trekImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    setIsAnimating(true);
    const isLastSlide = currentIndex === trekImages.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    if (currentIndex !== slideIndex) {
        setIsAnimating(true);
        setCurrentIndex(slideIndex);
    }
  };

  useEffect(() => {
    if (isAnimating) {
        const timer = setTimeout(() => setIsAnimating(false), 400); // Duration of the animation
        return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  return (
    <section className="py-16 bg-white" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-4">
        <div className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 style={styles.headerFont} className="text-3xl font-bold text-center mb-4 text-slate-800">
            Glimpses from the Summit
          </h2>
          <p className="text-center text-slate-500 mb-12 max-w-2xl mx-auto">
            Explore the breathtaking landscapes, serene campsites, and triumphant moments from the Kedarkantha trek.
          </p>
        </div>

        <div className={`relative w-full max-w-4xl mx-auto transition-all duration-700 ease-out delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Main Image Display */}
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-2xl bg-slate-200">
            <img
              key={currentIndex} // Re-trigger animation on change
              src={trekImages[currentIndex].src}
              alt={trekImages[currentIndex].alt}
              className="w-full h-full object-cover animate-fade-in-zoom"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/70 hover:bg-white text-slate-800 p-2 rounded-full shadow-lg transition-all transform hover:scale-110 z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/70 hover:bg-white text-slate-800 p-2 rounded-full shadow-lg transition-all transform hover:scale-110 z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Thumbnails */}
        <div className={`mt-6 flex justify-center gap-2 md:gap-4 overflow-x-auto p-2 transition-all duration-700 ease-out delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {trekImages.map((image, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-lg overflow-hidden border-4 transition-all duration-300 ${
                currentIndex === index ? 'border-blue-600 scale-105' : 'border-transparent hover:border-blue-300'
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotoGallerySection;
