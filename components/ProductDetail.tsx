import React, { useState, useEffect } from 'react';
import { Peptide } from '../types';
import { generateProductImage } from '../services/geminiService';
import { ArrowLeft, ShieldCheck, FileText, ShoppingCart, Star, Box, AlertTriangle, Globe, Lock, Clock, Truck, CheckCircle2, Sparkles, Image as ImageIcon } from 'lucide-react';

interface ProductDetailProps {
  peptide: Peptide;
  onBack: () => void;
  onAddToCart: (peptide: Peptide, qty: number) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ peptide, onBack, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'coa' | 'reviews'>('desc');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loadingImage, setLoadingImage] = useState(false);

  useEffect(() => {
    // Reset image when peptide changes
    setImageUrl(null);
    
    // Auto-generate professional product image
    const fetchImage = async () => {
        setLoadingImage(true);
        try {
            const url = await generateProductImage(peptide.name);
            setImageUrl(url);
        } catch (e) {
            console.error("Failed to generate product image", e);
            // Fallback to null (shows CSS placeholder)
        } finally {
            setLoadingImage(false);
        }
    };

    fetchImage();
  }, [peptide]);

  return (
    <div className="max-w-7xl mx-auto animate-fadeIn pb-12">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 group transition-colors font-medium"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        Back to Catalog
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Visuals (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
           <div className="w-full aspect-square bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden relative group shadow-2xl flex items-center justify-center">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none z-0"></div>
              
              <div className="absolute top-4 left-4 z-20">
                  <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg animate-pulse">
                      HIGH DEMAND
                  </span>
              </div>
              <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
                 <div className="bg-teal-500/90 backdrop-blur text-slate-950 text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-2">
                    <ShieldCheck size={14} /> Verified {peptide.purity}
                 </div>
              </div>
              
              {/* Product Image Logic */}
              {loadingImage ? (
                  <div className="flex flex-col items-center gap-3 z-10 animate-pulse">
                      <Sparkles className="text-teal-400 animate-spin" size={32} />
                      <p className="text-xs text-teal-400 font-bold uppercase tracking-widest">Generating Product Shot...</p>
                  </div>
              ) : imageUrl ? (
                  <img 
                    src={imageUrl} 
                    alt={peptide.name} 
                    className="w-full h-full object-cover z-10 hover:scale-105 transition-transform duration-700"
                  />
              ) : (
                  /* Fallback CSS Visual if Generation Fails */
                  <div className="w-full h-full flex items-center justify-center relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-blue-600/10 radial-gradient"></div>
                      <div className="relative z-10 flex flex-col items-center transform group-hover:scale-105 transition-transform duration-700">
                        <div className="relative">
                            <div className="absolute inset-0 bg-teal-500 blur-3xl opacity-20"></div>
                            <Box size={140} className="text-slate-600 relative z-10" strokeWidth={1} />
                        </div>
                        <div className="text-8xl font-black text-slate-800/50 select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-overlay">
                            {peptide.id.substring(0,2).toUpperCase()}
                        </div>
                      </div>
                  </div>
              )}
           </div>

           {/* Trust Stats */}
           <div className="grid grid-cols-3 gap-3">
              <div className="bg-slate-800/30 p-3 rounded-xl border border-slate-700/50 text-center backdrop-blur-sm">
                  <ShieldCheck className="mx-auto text-teal-500 mb-1" size={20} />
                  <p className="text-[10px] text-slate-500 uppercase tracking-wide">Purity</p>
                  <p className="text-sm font-bold text-white">{peptide.purity}</p>
              </div>
              <div className="bg-slate-800/30 p-3 rounded-xl border border-slate-700/50 text-center backdrop-blur-sm">
                  <Truck className="mx-auto text-blue-500 mb-1" size={20} />
                  <p className="text-[10px] text-slate-500 uppercase tracking-wide">Shipping</p>
                  <p className="text-sm font-bold text-white">Worldwide</p>
              </div>
              <div className="bg-slate-800/30 p-3 rounded-xl border border-slate-700/50 text-center backdrop-blur-sm">
                  <Clock className="mx-auto text-amber-500 mb-1" size={20} />
                  <p className="text-[10px] text-slate-500 uppercase tracking-wide">Dispatch</p>
                  <p className="text-sm font-bold text-white">Same Day</p>
              </div>
           </div>
           
           {!imageUrl && !loadingImage && (
               <button 
                 onClick={() => {
                     setLoadingImage(true);
                     generateProductImage(peptide.name).then(setImageUrl).finally(() => setLoadingImage(false));
                 }}
                 className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-teal-400 text-xs rounded-lg transition-colors border border-dashed border-slate-600 hover:border-teal-500 flex items-center justify-center gap-2"
               >
                 <ImageIcon size={14} /> Retry Image Generation
               </button>
           )}
        </div>

        {/* Right Column: Conversion & Details (7 cols) */}
        <div className="lg:col-span-7 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
                <span className="text-teal-500 text-xs font-bold tracking-wider uppercase bg-teal-950 border border-teal-900 px-3 py-1 rounded-full">
                    {peptide.category}
                </span>
                {peptide.bestseller && (
                    <span className="text-amber-500 text-xs font-bold tracking-wider uppercase bg-amber-950 border border-amber-900 px-3 py-1 rounded-full flex items-center gap-1">
                        <Star size={10} fill="currentColor" /> Best Seller
                    </span>
                )}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">{peptide.name}</h1>
            <p className="text-lg text-slate-400 font-medium mb-6">{peptide.fullName}</p>

            {/* Price & Stock */}
            <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700 mb-8 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 relative z-10">
                    <div>
                        <p className="text-slate-400 text-sm mb-1">Research Price</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-bold text-white">${peptide.price.toFixed(2)}</span>
                            <span className="text-sm text-slate-500">/ {peptide.size} vial</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <div className="flex items-center gap-1.5 text-emerald-400 text-sm font-bold bg-emerald-950/50 px-2 py-1 rounded border border-emerald-900/50 mb-1">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                            In Stock & Ready to Ship
                        </div>
                        <p className="text-xs text-slate-500">Ships from: <span className="text-slate-300">Florida, USA</span></p>
                    </div>
                </div>

                {/* Add to Cart Section */}
                <div className="space-y-4 relative z-10">
                    {quantity >= 5 ? (
                         <div className="bg-teal-900/30 border border-teal-800/50 rounded-lg p-2 flex items-center justify-center gap-2 text-sm text-teal-300">
                             <Star size={14} fill="currentColor" /> 
                             <span className="font-bold">10% Bulk Discount Applied</span>
                         </div>
                    ) : (
                        <div className="text-xs text-slate-500 text-center">
                            Buy 5+ vials for <span className="text-teal-400 font-bold">10% OFF</span>
                        </div>
                    )}
                    
                    <div className="flex gap-4 h-14">
                        <div className="flex items-center bg-slate-950 rounded-xl border border-slate-600 w-32 shrink-0">
                            <button 
                                onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                                className="w-10 h-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 rounded-l-xl transition-colors text-xl"
                            >-</button>
                            <input 
                                type="number" 
                                value={quantity} 
                                readOnly 
                                className="flex-1 bg-transparent text-center text-white font-bold outline-none h-full" 
                            />
                            <button 
                                onClick={() => setQuantity(quantity + 1)} 
                                className="w-10 h-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 rounded-r-xl transition-colors text-xl"
                            >+</button>
                        </div>
                        <button 
                            onClick={() => onAddToCart(peptide, quantity)}
                            className="flex-1 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white text-lg font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            <ShoppingCart size={22} /> Add to Cart
                        </button>
                    </div>
                </div>
            </div>

            {/* Value Props / Marketing Icons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 pb-8 border-b border-slate-800">
                <div className="flex flex-col items-center text-center gap-2">
                    <div className="p-2 bg-slate-800 rounded-full text-teal-500"><Globe size={20} /></div>
                    <span className="text-xs text-slate-300 font-medium">Worldwide Shipping</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                    <div className="p-2 bg-slate-800 rounded-full text-teal-500"><Lock size={20} /></div>
                    <span className="text-xs text-slate-300 font-medium">Secure Payment</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                    <div className="p-2 bg-slate-800 rounded-full text-teal-500"><Box size={20} /></div>
                    <span className="text-xs text-slate-300 font-medium">Discreet Packaging</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                    <div className="p-2 bg-slate-800 rounded-full text-teal-500"><CheckCircle2 size={20} /></div>
                    <span className="text-xs text-slate-300 font-medium">Reship Guarantee</span>
                </div>
            </div>

            {/* Tabs */}
            <div className="mt-auto">
                <div className="flex gap-8 border-b border-slate-800 mb-6 overflow-x-auto">
                    <button onClick={() => setActiveTab('desc')} className={`pb-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'desc' ? 'border-teal-500 text-white' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>Product Description</button>
                    <button onClick={() => setActiveTab('coa')} className={`pb-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'coa' ? 'border-teal-500 text-white' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>Certificate of Analysis</button>
                    <button onClick={() => setActiveTab('reviews')} className={`pb-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'reviews' ? 'border-teal-500 text-white' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>Customer Reviews ({peptide.reviews.length})</button>
                </div>
                
                <div className="min-h-[200px]">
                    {activeTab === 'desc' && (
                        <div className="space-y-6 animate-fadeIn">
                            <p className="text-slate-300 leading-relaxed text-lg font-light">{peptide.description}</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 bg-slate-900/30 p-5 rounded-xl border border-slate-800">
                                {peptide.casNumber && (
                                    <div className="flex justify-between border-b border-slate-800 pb-2">
                                        <span className="text-sm text-slate-500 uppercase tracking-wider font-bold">CAS Number</span>
                                        <span className="text-sm text-teal-400 font-mono">{peptide.casNumber}</span>
                                    </div>
                                )}
                                {peptide.molarMass && (
                                    <div className="flex justify-between border-b border-slate-800 pb-2">
                                        <span className="text-sm text-slate-500 uppercase tracking-wider font-bold">Molar Mass</span>
                                        <span className="text-sm text-teal-400 font-mono">{peptide.molarMass}</span>
                                    </div>
                                )}
                                <div className="flex justify-between border-b border-slate-800 pb-2">
                                    <span className="text-sm text-slate-500 uppercase tracking-wider font-bold">Storage</span>
                                    <span className="text-sm text-slate-300">-20°C Lyophilized</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-800 pb-2">
                                    <span className="text-sm text-slate-500 uppercase tracking-wider font-bold">Solubility</span>
                                    <span className="text-sm text-slate-300">Sterile Water / Bacteriostatic</span>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-3 p-4 bg-amber-950/20 border border-amber-500/20 rounded-xl mt-4">
                                <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={18} />
                                <div className="space-y-1">
                                    <p className="text-sm font-bold text-amber-200">Laboratory Research Use Only</p>
                                    <p className="text-xs text-amber-400/70 leading-relaxed">
                                        This product is strictly intended for in-vitro laboratory research. It is not intended for human or animal consumption, nor for any diagnostic, therapeutic, or clinical use.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {activeTab === 'coa' && (
                        <div className="flex flex-col items-center justify-center py-12 space-y-6 animate-fadeIn border border-dashed border-slate-700 rounded-xl bg-slate-900/30">
                            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center">
                                <FileText size={40} className="text-teal-500" />
                            </div>
                            <div className="text-center max-w-md px-4">
                                <h3 className="text-white font-bold text-lg mb-2">Batch Verified: {new Date().getFullYear()}-A04</h3>
                                <p className="text-slate-400 mb-6">
                                    Our peptides undergo rigorous third-party HPLC and Mass Spectrometry analysis to ensure &gt;{peptide.purity} purity.
                                </p>
                                <button className="px-6 py-3 bg-slate-800 hover:bg-slate-700 hover:text-teal-400 border border-slate-600 text-slate-200 rounded-lg transition-colors flex items-center gap-2 mx-auto font-medium">
                                    <FileText size={18} /> Download PDF Report
                                </button>
                            </div>
                        </div>
                    )}
                    
                    {activeTab === 'reviews' && (
                        <div className="space-y-4 animate-fadeIn">
                            {peptide.reviews.length > 0 ? peptide.reviews.map(review => (
                                <div key={review.id} className="bg-slate-800/30 p-6 rounded-xl border border-slate-700/50">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-blue-600 rounded-full flex items-center justify-center text-xs font-bold text-white">
                                                {review.user.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-white text-sm">{review.user}</p>
                                                {review.verified && <p className="text-[10px] text-teal-400 flex items-center gap-1"><CheckCircle2 size={10}/> Verified Buyer</p>}
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <div className="flex text-yellow-400 text-xs gap-0.5">
                                                {Array.from({length: review.rating}).map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                                            </div>
                                            <span className="text-[10px] text-slate-500 mt-1">{review.date}</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-slate-300 italic">"{review.comment}"</p>
                                </div>
                            )) : (
                                <div className="text-center py-12 text-slate-500">
                                    <p className="italic mb-2">No reviews yet for this specific batch.</p>
                                    <p className="text-xs">Be the first to review and get 10% off your next order.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;