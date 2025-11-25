import React, { useState, useEffect } from 'react';
import { Dna, ShieldCheck, Truck, ArrowRight, Timer } from 'lucide-react';

interface HeroSectionProps {
  onShopNow: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onShopNow }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    // Countdown to 4 PM EST for same-day shipping
    const calculateTimeLeft = () => {
      const now = new Date();
      const target = new Date();
      target.setHours(16, 0, 0, 0); // 4 PM
      
      if (now > target) {
        target.setDate(target.getDate() + 1);
      }
      
      const diff = target.getTime() - now.getTime();
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      return `${hours}h ${minutes}m`;
    };

    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 60000);
    setTimeLeft(calculateTimeLeft());
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 mb-8 shadow-2xl group">
      {/* Abstract Background */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 to-teal-950/50"></div>
      
      {/* Trust Banner */}
      <div className="absolute top-0 left-0 right-0 bg-teal-900/20 backdrop-blur-sm border-b border-teal-900/30 py-2 px-6 flex justify-between items-center z-20 text-xs font-medium text-teal-400">
         <div className="flex items-center gap-2">
            <ShieldCheck size={14} />
            <span>HPLC & Mass Spec Verified &gt;99% Purity</span>
         </div>
         <div className="hidden md:flex items-center gap-2">
            <Timer size={14} />
            <span>Order in <span className="text-white font-bold">{timeLeft}</span> for Same Day Shipping</span>
         </div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 md:p-16 gap-8 pt-20">
        <div className="max-w-2xl space-y-8">
          <h1 className="text-5xl md:text-6xl font-black text-white leading-tight tracking-tight">
            Peptide<span className="text-teal-500">Plaza</span>
            <br />
            <span className="text-2xl md:text-4xl font-light text-slate-400">
              The Gold Standard in Research
            </span>
          </h1>
          
          <p className="text-slate-400 text-lg max-w-lg leading-relaxed">
            Source your laboratory reagents from the industry leader. We accept Bitcoin & Ethereum for secure, private transactions.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={onShopNow}
              className="px-8 py-4 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl transition-all flex items-center gap-2 shadow-[0_0_30px_rgba(20,184,166,0.3)] hover:shadow-[0_0_40px_rgba(20,184,166,0.5)] hover:-translate-y-1"
            >
              Browse Catalog <ArrowRight size={20} />
            </button>
            
            <div className="flex items-center gap-4 px-6 py-4 rounded-xl border border-slate-700 bg-slate-800/50 backdrop-blur">
                <div className="text-center">
                    <p className="text-xs text-slate-400 uppercase tracking-wider">TrustPilot</p>
                    <div className="flex text-yellow-400 text-xs gap-0.5">
                        {'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}
                    </div>
                </div>
                <div className="w-px h-8 bg-slate-700"></div>
                <div className="text-center">
                    <p className="text-xs text-slate-400 uppercase tracking-wider">Verified</p>
                    <p className="text-white font-bold text-sm">US Domestic</p>
                </div>
            </div>
          </div>
        </div>

        {/* Decorative Visual */}
        <div className="hidden lg:block relative">
          <div className="w-80 h-80 bg-gradient-to-tr from-teal-600 to-blue-700 rounded-full blur-[100px] opacity-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
          
          <div className="relative grid grid-cols-2 gap-4 transform rotate-6 hover:rotate-0 transition-all duration-700">
             <div className="bg-slate-800/80 backdrop-blur p-4 rounded-2xl border border-slate-700 shadow-xl flex flex-col gap-3 w-48">
                <div className="h-32 bg-slate-900 rounded-xl flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent"></div>
                    <Dna className="text-teal-500" size={48} />
                </div>
                <div className="h-2 w-20 bg-slate-600 rounded"></div>
                <div className="h-2 w-12 bg-teal-500/50 rounded"></div>
             </div>
             
             <div className="bg-slate-800/80 backdrop-blur p-4 rounded-2xl border border-slate-700 shadow-xl flex flex-col gap-3 w-48 mt-12">
                <div className="h-32 bg-slate-900 rounded-xl flex items-center justify-center relative overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent"></div>
                    <Truck className="text-blue-500" size={48} />
                </div>
                <div className="h-2 w-20 bg-slate-600 rounded"></div>
                <div className="h-2 w-12 bg-blue-500/50 rounded"></div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
