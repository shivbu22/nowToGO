
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { styles } from '../App';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const trekImages = [
  { src: 'https://lkfnglrbdzdyjeebnnez.supabase.co/storage/v1/object/public/trek-images/1%20(1).jpg', alt: 'Exterior view of our cozy Sankri homestay with colorful flags and a snowy balcony.' },
  { src: 'https://lkfnglrbdzdyjeebnnez.supabase.co/storage/v1/object/public/trek-images/1%20(2).jpg', alt: 'Trekkers having a blast playing and jumping in deep, fresh winter snow.' },
  { src: 'https://lkfnglrbdzdyjeebnnez.supabase.co/storage/v1/object/public/trek-images/1%20(3).jpg', alt: 'A group of adventurers sliding down the snowy slopes of Kedarkantha for some extra fun.' },
  { src: 'https://lkfnglrbdzdyjeebnnez.supabase.co/storage/v1/object/public/trek-images/1%20(4).jpg', alt: 'Our dedicated local porters navigating the steep snowy terrain with expert precision.' },
  { src: 'https://lkfnglrbdzdyjeebnnez.supabase.co/storage/v1/object/public/trek-images/1%20(5).jpg', alt: 'Warm and comfortable wooden interior of the guest rooms at Sankri base camp.' },
  { src: 'https://lkfnglrbdzdyjeebnnez.supabase.co/storage/v1/object/public/trek-images/1%20(6).jpg', alt: 'Triple sharing rooms at our homestay featuring clean bedding and a peaceful atmosphere.' },
  { src: 'https://lkfnglrbdzdyjeebnnez.supabase.co/storage/v1/object/public/trek-images/pexels-sanket-barik-2808574-7846481.jpg', alt: 'Trekkers sitting on a snowy slope, watching a beautiful golden sunset over the mountains.' },
  { src: 'https://lkfnglrbdzdyjeebnnez.supabase.co/storage/v1/object/public/trek-images/neha-maheen-mahfin-SbCqwxc9-Cg-unsplash.jpg', alt: 'The majestic snow-capped peaks of Swargarohini against a clear blue sky.' },
  { src: 'https://lkfnglrbdzdyjeebnnez.supabase.co/storage/v1/object/public/trek-images/roshan-mohammed-O_jdx6EeZRA-unsplash.jpg', alt: 'A wide view of the frozen Juda Ka Talab with a campsite nestled in the snowy woods.' },
  { src: 'https://lkfnglrbdzdyjeebnnez.supabase.co/storage/v1/object/public/trek-images/1fab7a44-4800-4b4a-a2cb-b8f8b6fe68fd_8.1+Kedarkantha_Indiahikes_Gourab_winter+season_+(2).webp', alt: 'A line of trekkers making their way up a steep, sunlit snowy slope towards the summit.' },
  { src: 'https://lkfnglrbdzdyjeebnnez.supabase.co/storage/v1/object/public/trek-images/c9efeaf0-812e-4cac-8718-a1bb97c37852_2.+Kedarkantha_Caroline_Indiahikes_base+camp+view_.webp', alt: 'Bright yellow tents at a campsite with a stunning backdrop of pine trees and mountains at dusk.' },
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
          {/* Main Image Display with Frame */}
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-2xl bg-slate-200 ring-8 ring-white/50">
            <img
              key={currentIndex} 
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
        <div className={`mt-10 flex justify-center gap-2 md:gap-4 overflow-x-auto p-2 pb-4 transition-all duration-700 ease-out delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {trekImages.map((image, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-16 h-16 md:w-24 md:h-24 flex-shrink-0 rounded-lg overflow-hidden border-4 transition-all duration-300 ${
                currentIndex === index ? 'border-blue-600 scale-110 shadow-lg' : 'border-white hover:border-blue-300'
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
