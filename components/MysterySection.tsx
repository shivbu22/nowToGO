
import React, { useState, useRef } from 'react';
import { Sparkles, Loader } from 'lucide-react';
import { styles } from '../App';
import { generateContent } from '../services/geminiService';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const MysterySection: React.FC = () => {
  const [mysteryClue, setMysteryClue] = useState("");
  const [isClueLoading, setIsClueLoading] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  const handleGenerateClue = async () => {
    if (isClueLoading) return;
    setIsClueLoading(true);
    const systemPrompt = "You are a mystical storyteller. Generate a short, cryptic, rhyming riddle (2 lines max) about a secret surprise activity in the Himalayas (like a hidden waterfall, a hot spring, or a ghost village). Do not reveal exactly what it is.";
    const clue = await generateContent("Give me a hint about the mystery day.", systemPrompt);
    setMysteryClue(clue);
    setIsClueLoading(false);
  };

  return (
    <section style={styles.mysteryGradient} className="py-20 text-white relative overflow-hidden" ref={sectionRef}>
      <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500 opacity-10 rounded-full blur-3xl -ml-48 -mb-48"></div>
      
      <div className={`max-w-4xl mx-auto px-4 text-center relative z-10 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="inline-block p-3 rounded-full bg-white/10 mb-6 animate-pulse">
          <Sparkles className="w-8 h-8 text-yellow-300" />
        </div>
        <h2 style={styles.headerFont} className="text-4xl md:text-5xl font-extrabold mb-6">Day 6: The Mystery Unfolds</h2>
        <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
          Is it a hidden waterfall? A secret village tour? Or a wild party in the mountains? 
          <br/>We have kept the 6th day exclusively as a surprise for our trekkers.
        </p>
        
        <div className="flex flex-col items-center gap-4">
           {mysteryClue && (
             <div className="bg-purple-900/50 p-4 rounded-xl border border-purple-400/30 max-w-md mx-auto mb-4 animate-fade-in">
               <p className="text-lg italic text-yellow-200 font-serif">"{mysteryClue}"</p>
             </div>
           )}
           
           <div className="flex gap-4 flex-wrap justify-center">
              <button 
                onClick={handleGenerateClue}
                disabled={isClueLoading}
                className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-full font-bold transition-all shadow-lg flex items-center gap-2 border border-purple-400 disabled:opacity-70"
              >
                {isClueLoading ? <Loader className="w-5 h-5 animate-spin"/> : <Sparkles className="w-5 h-5"/>}
                Ask AI for a Clue
              </button>
              <button className="bg-white text-purple-900 px-8 py-3 rounded-full font-bold hover:bg-purple-50 transition-colors shadow-lg">
                Reveal on Booking
              </button>
           </div>
        </div>
      </div>
    </section>
  );
};

export default MysterySection;
