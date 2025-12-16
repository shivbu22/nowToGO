
import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Send } from 'lucide-react';
import { ChatMessage } from '../types';
import { generateContent } from '../services/geminiService';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<ChatMessage[]>([
    { role: 'assistant', text: "Namaste! I'm your AI Sherpa. Ask me anything about the Kedarkantha trek, gear, or weather! 🏔️" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setHistory(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    const systemPrompt = `You are an expert trekking guide for the Kedarkantha Winter Trek.
    Your knowledge base includes:
    - **Trek Specs:** Altitude 12,500 ft, Duration 5 Nights/6 Days, Distance 24 km, Difficulty Easy-Moderate. Start point is Ghaziabad, with an option to join at Dehradun.
    - **Price:** Pricing varies based on the package and group size. For a specific quote, please fill out the contact form.
    - **Itinerary:** Day 0 (Ghaziabad to Dehradun), Day 1 (Dehradun to Sankri), Day 2 (Sankri to Juda Ka Talab), Day 3 (Base Camp), Day 4 (Summit & return), Day 5 (Departure from Sankri).
    - **Inclusions:** Forest permits, tent accommodation, all meals (veg), expert guides, and a medical kit with oxygen.
    - **Exclusions:** Personal insurance, medical certificate, and optional backpack offloading (₹300/day).
    - **Packing:** Essential gear includes a down jacket, good trekking shoes, a 40L rucksack, woolen cap, and gloves.
    
    Your role:
    - Answer questions in an enthusiastic, helpful, and safety-conscious tone.
    - Keep answers brief and to the point (max 2-3 sentences).
    - If asked about the 'Mystery Day' (Day 6), be secretive and say it's a surprise for trekkers revealed only after booking. Do not invent details about it.
    - If you don't know an answer, say you can connect them with a human expert via the contact form.`;

    const responseText = await generateContent(userMsg.text, systemPrompt);
    
    setHistory(prev => [...prev, { role: 'assistant', text: responseText }]);
    setIsLoading(false);
  };
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 flex items-center justify-center"
        >
          <Bot className="w-8 h-8" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-bounce">
            AI
          </span>
        </button>
      )}

      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-80 md:w-96 flex flex-col h-[500px] border border-slate-200 overflow-hidden animate-fade-in-up">
          <header className="bg-blue-600 p-4 flex justify-between items-center text-white flex-shrink-0">
            <div className="flex items-center gap-2">
              <Bot className="w-6 h-6" />
              <div>
                <h3 className="font-bold text-sm">Kedarkantha Sherpa</h3>
                <span className="text-xs text-blue-100 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Online
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-blue-700 p-1 rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </header>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {history.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-bl-none'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm border border-slate-100 flex gap-1.5 items-center">
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-slate-100 flex gap-2 flex-shrink-0">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about gear, weather..."
              className="flex-1 px-4 py-2 bg-slate-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              type="submit" 
              disabled={!input.trim() || isLoading}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white w-9 h-9 flex items-center justify-center rounded-full transition-colors flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
