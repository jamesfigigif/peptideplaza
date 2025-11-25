import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles } from 'lucide-react';
import { askPeptideAssistant } from '../services/geminiService';
import { ChatMessage } from '../types';

interface AiAssistantProps {
    isWidget?: boolean;
}

const AiAssistant: React.FC<AiAssistantProps> = ({ isWidget = false }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello. I am Dr. Helix. How can I assist with your research today? (Information is for research purposes only.)" }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const response = await askPeptideAssistant(history, userMsg);
    
    setHistory(prev => [...prev, { role: 'model', text: response }]);
    setLoading(false);
  };

  // Widget vs Full Page styles
  const containerClasses = isWidget 
    ? "h-full flex flex-col bg-slate-900" 
    : "h-full flex flex-col bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden shadow-xl";

  return (
    <div className={containerClasses}>
      {/* Header - Only show if NOT in widget mode, as wrapper handles it */}
      {!isWidget && (
          <div className="p-4 border-b border-slate-700 bg-slate-900/50 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center shadow-lg">
              <Bot size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white flex items-center gap-2">
                Dr. Helix AI
                <span className="px-2 py-0.5 bg-teal-500/20 text-teal-400 text-[10px] rounded-full uppercase tracking-wider">Online</span>
              </h3>
              <p className="text-xs text-slate-400">Powered by Gemini 2.5</p>
            </div>
          </div>
      )}

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar" ref={scrollRef}>
        {history.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-3 ${
              msg.role === 'user' 
              ? 'bg-teal-600 text-white rounded-tr-none shadow-md' 
              : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700 shadow-sm'
            }`}>
               <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex justify-start">
             <div className="bg-slate-800 rounded-2xl rounded-tl-none p-3 border border-slate-700 flex items-center gap-2">
                <Sparkles size={14} className="text-teal-400 animate-spin" />
                <span className="text-xs text-slate-400">Analyzing...</span>
             </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className={`p-3 border-t border-slate-700 flex gap-2 ${isWidget ? 'bg-slate-900' : 'bg-slate-900/50'}`}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about research..."
          className="flex-1 bg-slate-800 border border-slate-600 rounded-xl px-3 py-2 text-sm text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
        />
        <button 
          type="submit"
          disabled={loading || !input.trim()}
          className="p-2 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-colors"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default AiAssistant;