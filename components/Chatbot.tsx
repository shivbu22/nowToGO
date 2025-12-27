
import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, Brain, Volume2, Loader } from 'lucide-react';
import { ChatMessage } from '../types';
import { generateContent, generateThinkingContent, generateSpeech, decodeAudioData } from '../services/geminiService';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isThinkingMode, setIsThinkingMode] = useState(false);
  const [history, setHistory] = useState<ChatMessage[]>([
    { role: 'assistant', text: "Namaste! I'm your AI Sherpa. Ask me anything about the Kedarkantha trek, gear, or weather! 🏔️" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState<number | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isLoading]);

  const handleSpeech = async (text: string, index: number) => {
    if (isSpeaking !== null) return;
    setIsSpeaking(index);

    try {
      const audioData = await generateSpeech(text);
      if (audioData) {
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        }
        const ctx = audioContextRef.current;
        const buffer = await decodeAudioData(audioData, ctx, 24000, 1);
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.onended = () => setIsSpeaking(null);
        source.start();
      } else {
        setIsSpeaking(null);
      }
    } catch (error) {
      console.error("Playback error:", error);
      setIsSpeaking(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setHistory(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    const systemPrompt = `You are an expert trekking guide for the Kedarkantha Winter Trek.
    Your knowledge base includes:
    - **Trek Specs:** Altitude 12,500 ft, Duration 5 Nights/6 Days, Distance 24 km, Difficulty Easy-Moderate. Start and end point is Ghaziabad.
    - **Price:** Pricing varies based on the package and group size. For a specific quote, please fill out the contact form.
    - **Itinerary:** Day 0 (Ghaziabad to Dehradun), Day 1 (Dehradun to Sankri), Day 2 (Sankri to Juda Ka Talab), Day 3 (Base Camp), Day 4 (Summit & return), Day 5 (Departure from Sankri for an overnight journey to Ghaziabad).
    - **Inclusions:** Round-trip transport from Ghaziabad, forest permits, tent accommodation, all meals (veg), expert guides, and a medical kit with oxygen.
    - **Exclusions:** Personal insurance, medical certificate, and optional backpack offloading (₹300/day).
    - **Packing:** Essential gear includes a down jacket, good trekking shoes, a 40L rucksack, woolen cap, and gloves.
    
    Your role:
    - Answer questions in an enthusiastic, helpful, and safety-conscious tone.
    - Keep answers brief and to the point (max 3 sentences).
    - If in "Thinking Mode", provide a more detailed, well-reasoned response explaining the 'why' behind gear choices or safety protocols.
    - If asked about the 'Mystery Day' (Day 6), be secretive and say it's a surprise for trekkers revealed only after booking.
    - If you don't know an answer, say you can connect them with a human expert via the contact form.`;

    let responseText: string;
    if (isThinkingMode) {
      responseText = await generateThinkingContent(userMsg.text, systemPrompt);
    } else {
      responseText = await generateContent(userMsg.text, systemPrompt);
    }
    
    setHistory(prev => [...prev, { role: 'assistant', text: responseText }]);
    setIsLoading(false);
  };
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 flex items-center justify-center group"
        >
          <Bot className="w-8 h-8" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-full animate-bounce">
            PRO
          </span>
          <span className="absolute right-full mr-3 bg-slate-800 text-white text-xs py-1 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Ask AI Sherpa
          </span>
        </button>
      )}

      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-80 md:w-96 flex flex-col h-[550px] border border-slate-200 overflow-hidden animate-fade-in-up">
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
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsThinkingMode(!isThinkingMode)}
                className={`p-1.5 rounded-lg transition-all flex items-center gap-1.5 text-xs font-bold ${isThinkingMode ? 'bg-purple-500 text-white' : 'hover:bg-blue-700 text-blue-100'}`}
                title={isThinkingMode ? "Deep Thinking Mode On" : "Enable Deep Thinking (Pro)"}
              >
                <Brain className={`w-4 h-4 ${isThinkingMode ? 'animate-pulse' : ''}`} />
                {isThinkingMode && "DEEP"}
              </button>
              <button onClick={() => setIsOpen(false)} className="hover:bg-blue-700 p-1.5 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {history.map((msg, idx) => (
              <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`group relative max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-bl-none'}`}>
                  {msg.text}
                  {msg.role === 'assistant' && (
                    <button 
                      onClick={() => handleSpeech(msg.text, idx)}
                      disabled={isSpeaking !== null}
                      className="absolute -right-8 top-1 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 bg-white border border-slate-200 rounded-full hover:bg-slate-50 disabled:opacity-30"
                      title="Listen to response"
                    >
                      {isSpeaking === idx ? <Loader className="w-3.5 h-3.5 animate-spin text-blue-600" /> : <Volume2 className="w-3.5 h-3.5 text-slate-400" />}
                    </button>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm border border-slate-100 flex gap-2 items-center">
                  {isThinkingMode && <Brain className="w-4 h-4 text-purple-500 animate-pulse" />}
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
                  </div>
                  {isThinkingMode && <span className="text-[10px] font-bold text-slate-400 italic">Thinking...</span>}
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
              placeholder={isThinkingMode ? "Ask a complex query..." : "Ask about gear, weather..."}
              className="flex-1 px-4 py-2 bg-slate-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              type="submit" 
              disabled={!input.trim() || isLoading}
              className={`${isThinkingMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-blue-600 hover:bg-blue-700'} disabled:opacity-50 text-white w-9 h-9 flex items-center justify-center rounded-full transition-colors flex-shrink-0`}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          {isThinkingMode && (
            <div className="px-4 py-1.5 bg-purple-50 text-[10px] text-purple-600 font-bold uppercase tracking-widest text-center border-t border-purple-100">
              Gemini 3 Pro Reasoning Enabled
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Chatbot;
