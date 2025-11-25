import React, { useState } from 'react';
import HeroSection from './components/LogoUploader';
import PeptideCatalog from './components/ProductSelector';
import ProductDetail from './components/ProductDetail';
import AiAssistant from './components/ResultViewer';
import MoleculeVisualizer from './components/ProGenerator';
import Checkout from './components/Checkout';
import { Peptide, CartItem } from './types';
import { FlaskConical, ShoppingCart, MessageSquare, Atom, X, MessageCircle } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'catalog' | 'assistant' | 'visualizer' | 'checkout' | 'product'>('catalog');
  const [selectedPeptide, setSelectedPeptide] = useState<Peptide | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleAddToCart = (peptide: Peptide, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === peptide.id);
      if (existing) {
        return prev.map(item => item.id === peptide.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...peptide, quantity }];
    });
    // Optional: Show toast
  };

  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
        if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
    }));
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleViewProduct = (peptide: Peptide) => {
    setSelectedPeptide(peptide);
    setActiveTab('product');
    window.scrollTo(0,0);
  };

  const handleFooterLink = (action: string) => {
    if (action === 'catalog') {
        setActiveTab('catalog');
        window.scrollTo(0,0);
    } else if (action === 'track') {
        const id = window.prompt("Please enter your Order ID for tracking:");
        if (id) alert("Tracking Status: PROCESSING. Your order is being prepared for shipment from our Florida facility.");
    } else if (action === 'coa') {
        const batch = window.prompt("Enter Batch Number found on vial:");
        if (batch) alert("CoA has been located. Downloading PDF...");
    } else if (action === 'contact') {
        setIsChatOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans selection:bg-teal-500/30">
      {/* Top Notification */}
      <div className="bg-teal-900/20 border-b border-teal-900/50 text-teal-400 text-center py-2 text-xs font-medium tracking-wide">
        NOTICE: PRODUCTS ARE FOR LABORATORY RESEARCH USE ONLY. NOT FOR HUMAN CONSUMPTION.
      </div>

      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveTab('catalog')}>
            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-900/20 group-hover:shadow-teal-500/30 transition-all">
              <FlaskConical size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white leading-none tracking-tight">Peptide<span className="text-teal-400">Plaza</span></h1>
              <span className="text-xs text-slate-400 tracking-widest uppercase">Research Supply</span>
            </div>
          </div>
          
          <nav className="hidden md:flex bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button 
              onClick={() => setActiveTab('catalog')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'catalog' || activeTab === 'product' ? 'bg-slate-800 text-white shadow-sm border border-slate-700' : 'text-slate-400 hover:text-white'}`}
            >
              Catalog
            </button>
            <button 
              onClick={() => setActiveTab('assistant')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'assistant' ? 'bg-slate-800 text-white shadow-sm border border-slate-700' : 'text-slate-400 hover:text-white'}`}
            >
              <MessageSquare size={16} />
              Research AI
            </button>
            <button 
              onClick={() => setActiveTab('visualizer')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'visualizer' ? 'bg-slate-800 text-white shadow-sm border border-slate-700' : 'text-slate-400 hover:text-white'}`}
            >
              <Atom size={16} />
              Structure Lab
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveTab('checkout')}
              className={`relative p-2 transition-colors ${activeTab === 'checkout' ? 'text-teal-400' : 'text-slate-400 hover:text-white'}`}
            >
              <ShoppingCart size={22} />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-teal-500 text-slate-900 text-[10px] font-bold flex items-center justify-center rounded-full animate-bounce">
                  {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav (Simple) */}
      <div className="md:hidden flex justify-around border-b border-slate-800 bg-slate-900 p-2 sticky top-20 z-40">
         <button onClick={() => setActiveTab('catalog')} className={`p-2 rounded-lg ${activeTab === 'catalog' || activeTab === 'product' ? 'text-teal-400 bg-slate-800' : 'text-slate-500'}`}><FlaskConical size={20}/></button>
         <button onClick={() => setActiveTab('assistant')} className={`p-2 rounded-lg ${activeTab === 'assistant' ? 'text-teal-400 bg-slate-800' : 'text-slate-500'}`}><MessageSquare size={20}/></button>
         <button onClick={() => setActiveTab('visualizer')} className={`p-2 rounded-lg ${activeTab === 'visualizer' ? 'text-teal-400 bg-slate-800' : 'text-slate-500'}`}><Atom size={20}/></button>
         <button onClick={() => setActiveTab('checkout')} className={`p-2 rounded-lg ${activeTab === 'checkout' ? 'text-teal-400 bg-slate-800' : 'text-slate-500'}`}><ShoppingCart size={20}/></button>
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-8 relative">
        
        {activeTab === 'catalog' && (
          <div className="animate-fadeIn">
            <HeroSection onShopNow={() => window.scrollTo({ top: 800, behavior: 'smooth' })} />
            <PeptideCatalog onViewProduct={handleViewProduct} />
          </div>
        )}

        {activeTab === 'product' && selectedPeptide && (
           <ProductDetail 
              peptide={selectedPeptide} 
              onBack={() => setActiveTab('catalog')}
              onAddToCart={(p, q) => {
                  handleAddToCart(p, q);
                  setActiveTab('checkout');
              }}
           />
        )}

        {activeTab === 'checkout' && (
           <div className="animate-fadeIn">
              <Checkout 
                cart={cart}
                onUpdateQuantity={handleUpdateCartQuantity}
                onRemove={handleRemoveFromCart}
                onBack={() => setActiveTab('catalog')}
                onClearCart={() => setCart([])}
              />
           </div>
        )}

        {activeTab === 'assistant' && (
           <div className="h-[calc(100vh-200px)] animate-fadeIn">
              <AiAssistant />
           </div>
        )}

        {activeTab === 'visualizer' && (
            <div className="h-[calc(100vh-200px)] animate-fadeIn">
                <MoleculeVisualizer />
            </div>
        )}

      </main>

      {/* Floating Live Chat Widget (Bottom Left) */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-4">
        {isChatOpen && (
            <div className="w-[350px] h-[500px] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden animate-fadeIn flex flex-col">
                <div className="bg-slate-800 p-3 border-b border-slate-700 flex justify-between items-center">
                    <span className="text-sm font-bold text-white flex items-center gap-2">
                        <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div> Live Support
                    </span>
                    <button onClick={() => setIsChatOpen(false)} className="text-slate-400 hover:text-white">
                        <X size={18} />
                    </button>
                </div>
                <div className="flex-1 overflow-hidden relative">
                    <div className="absolute inset-0">
                        <AiAssistant isWidget={true} />
                    </div>
                </div>
            </div>
        )}
        <button 
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="group flex items-center gap-3 bg-teal-600 hover:bg-teal-500 text-white px-4 py-3 rounded-full shadow-[0_0_20px_rgba(20,184,166,0.4)] transition-all hover:scale-105 active:scale-95"
        >
            <MessageCircle size={24} />
            {!isChatOpen && <span className="font-bold pr-2">Chat with Support</span>}
        </button>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-8">
            <div className="max-w-xs">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-teal-900/50 rounded-lg flex items-center justify-center">
                        <FlaskConical size={16} className="text-teal-500" />
                    </div>
                    <span className="text-lg font-bold text-white">PeptidePlaza</span>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">
                    Global leader in high-purity research peptides. Synthesized in GMP compliant facilities. 
                </p>
                <div className="flex gap-4 text-slate-500">
                    {/* Socials Mock */}
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-teal-900 hover:text-teal-400 cursor-pointer transition-colors">X</div>
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-teal-900 hover:text-teal-400 cursor-pointer transition-colors">in</div>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-sm">
                <div>
                    <h4 className="font-bold text-white mb-4">Shop</h4>
                    <ul className="space-y-2 text-slate-500">
                        <li onClick={() => handleFooterLink('catalog')} className="hover:text-teal-400 cursor-pointer transition-colors">New Arrivals</li>
                        <li onClick={() => handleFooterLink('catalog')} className="hover:text-teal-400 cursor-pointer transition-colors">Best Sellers</li>
                        <li onClick={() => handleFooterLink('catalog')} className="hover:text-teal-400 cursor-pointer transition-colors">Lab Equipment</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-4">Support</h4>
                    <ul className="space-y-2 text-slate-500">
                        <li onClick={() => handleFooterLink('track')} className="hover:text-teal-400 cursor-pointer transition-colors">Track Order</li>
                        <li onClick={() => handleFooterLink('coa')} className="hover:text-teal-400 cursor-pointer transition-colors">CoA Search</li>
                        <li onClick={() => window.alert('All products are >99% purity guaranteed by HPLC/MS analysis.')} className="hover:text-teal-400 cursor-pointer transition-colors">Quality Guarantee</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-4">Contact</h4>
                    <ul className="space-y-2 text-slate-500">
                        <li onClick={() => handleFooterLink('contact')} className="hover:text-teal-400 cursor-pointer transition-colors">support@peptideplaza.com</li>
                        <li onClick={() => handleFooterLink('contact')} className="hover:text-teal-400 cursor-pointer transition-colors">Live Chat Available 24/7</li>
                        <li>Miami, FL (Headquarters)</li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-800 text-center">
            <p className="text-xs text-slate-600 mb-2">
                © 2024 PeptidePlaza. All products are strictly for laboratory research use only and not for human consumption. 
            </p>
            <p className="text-[10px] text-slate-700">
                We ship worldwide including USA, UK, Europe, and Australia. Secure packaging guaranteed.
            </p>
        </div>
      </footer>
    </div>
  );
};

export default App;