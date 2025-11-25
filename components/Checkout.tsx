import React, { useState } from 'react';
import { CartItem } from '../types';
import { Trash2, Minus, Plus, Bitcoin, CheckCircle, Copy, ArrowLeft } from 'lucide-react';

interface CheckoutProps {
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onBack: () => void;
  onClearCart: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cart, onUpdateQuantity, onRemove, onBack, onClearCart }) => {
  const [step, setStep] = useState<'cart' | 'payment' | 'success'>('cart');
  const [paymentMethod, setPaymentMethod] = useState<'BTC' | 'ETH'>('BTC');
  const [formData, setFormData] = useState({ email: '', shipping: '' });

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  // Bulk discount: 10% off if more than 5 items total
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const discount = totalItems >= 5 ? subtotal * 0.10 : 0;
  const shipping = subtotal > 200 ? 0 : 15;
  const total = subtotal - discount + shipping;

  const handlePayment = () => {
    if (!formData.email || !formData.shipping) {
      alert("Please fill in shipping details");
      return;
    }
    setStep('payment');
  };

  const sendToTelegram = async () => {
    const botToken = '8262624631:AAG5nM3mB7sI3hexKJD6b6VqrWz9duxtluE';
    const chatId = '5747344081';

    // Format order items
    const itemsList = cart.map(item =>
      `${item.quantity}x ${item.name} (${item.size}) - $${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');

    // Format payment address
    const paymentAddress = paymentMethod === 'BTC'
      ? 'bc1pukgq6zche4hjlprakvh65xgvj5sz9gx802uu4guy7ftf976gm4esqeyumc'
      : '0x911A2d9c76Db9793263f56150d224245065A7235';

    const message = `🛒 *NEW ORDER RECEIVED*\n\n` +
      `💰 *Payment Method:* ${paymentMethod}\n` +
      `📍 *Payment Address:* \`${paymentAddress}\`\n\n` +
      `📦 *Order Details:*\n${itemsList}\n\n` +
      `💵 *Subtotal:* $${subtotal.toFixed(2)}\n` +
      (discount > 0 ? `🎉 *Discount:* -$${discount.toFixed(2)}\n` : '') +
      `🚚 *Shipping:* ${shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}\n` +
      `💳 *Total:* $${total.toFixed(2)}\n\n` +
      `📧 *Email:* ${formData.email}\n` +
      `🏠 *Shipping Address:*\n${formData.shipping}`;

    try {
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown'
        })
      });
    } catch (error) {
      console.error('Failed to send to Telegram:', error);
    }
  };

  const confirmPayment = () => {
    sendToTelegram();
    setTimeout(() => {
      setStep('success');
      onClearCart();
    }, 2000);
  };

  if (step === 'success') {
    return (
      <div className="max-w-2xl mx-auto bg-slate-800 p-8 rounded-3xl border border-teal-500/30 text-center py-20 shadow-2xl">
        <div className="w-24 h-24 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(20,184,166,0.4)]">
          <CheckCircle size={48} className="text-slate-900" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">Order Confirmed!</h2>
        <p className="text-slate-400 mb-8 max-w-md mx-auto">
          Thank you for your order. A confirmation email has been sent to <span className="text-teal-400">{formData.email}</span>.
          Your tracking number will be generated within 24 hours.
        </p>
        <button onClick={onBack} className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-bold transition-all">
          Return to Catalog
        </button>
      </div>
    );
  }

  if (step === 'payment') {
    return (
      <div className="max-w-4xl mx-auto">
         <button onClick={() => setStep('cart')} className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors">
            <ArrowLeft size={18} /> Back to Details
         </button>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Payment Selector */}
            <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-xl">
               <h2 className="text-2xl font-bold text-white mb-6">Select Crypto</h2>
               <div className="grid grid-cols-2 gap-4 mb-8">
                  <button 
                    onClick={() => setPaymentMethod('BTC')}
                    className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${paymentMethod === 'BTC' ? 'bg-orange-500/10 border-orange-500 text-orange-500' : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'}`}
                  >
                    <Bitcoin size={32} />
                    <span className="font-bold">Bitcoin</span>
                  </button>
                  <button 
                    onClick={() => setPaymentMethod('ETH')}
                    className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${paymentMethod === 'ETH' ? 'bg-blue-500/10 border-blue-500 text-blue-500' : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'}`}
                  >
                     {/* Eth Icon Mock */}
                    <div className="w-8 h-8 flex items-center justify-center font-bold text-xl">Ξ</div>
                    <span className="font-bold">Ethereum</span>
                  </button>
               </div>

               <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 text-center">
                  <p className="text-sm text-slate-400 mb-4">Send exactly <span className="text-white font-bold">${total.toFixed(2)}</span> equivalent to:</p>
                  
                  <div className="bg-white p-4 w-48 h-48 mx-auto mb-4 rounded-lg flex items-center justify-center">
                      {/* Mock QR Code */}
                      <div className="w-full h-full bg-black/90 pattern-grid-lg mask-qr"></div> 
                  </div>
                  
                  <div className="flex items-center gap-2 bg-slate-800 p-3 rounded-lg border border-slate-600 mb-4">
                      <code className="text-xs text-teal-400 flex-1 overflow-hidden text-ellipsis">
                        {paymentMethod === 'BTC' ? 'bc1pukgq6zche4hjlprakvh65xgvj5sz9gx802uu4guy7ftf976gm4esqeyumc' : '0x911A2d9c76Db9793263f56150d224245065A7235'}
                      </code>
                      <button className="text-slate-400 hover:text-white"><Copy size={16}/></button>
                  </div>

                  <button onClick={confirmPayment} className="w-full py-4 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl transition-all shadow-lg">
                    I Have Sent Payment
                  </button>
               </div>
            </div>

            {/* Order Summary Side */}
            <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700 h-fit">
                <h3 className="text-lg font-bold text-white mb-4">Order Summary</h3>
                <div className="space-y-3 mb-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                    {cart.map(item => (
                        <div key={item.id} className="flex justify-between text-sm">
                            <span className="text-slate-300">{item.quantity}x {item.name}</span>
                            <span className="text-white font-mono">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                </div>
                <div className="border-t border-slate-700 pt-4 space-y-2 text-sm">
                    <div className="flex justify-between text-slate-400">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                        <div className="flex justify-between text-green-400">
                            <span>Bulk Discount (10%)</span>
                            <span>-${discount.toFixed(2)}</span>
                        </div>
                    )}
                    <div className="flex justify-between text-slate-400">
                        <span>Shipping</span>
                        <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-white pt-2 border-t border-slate-700 mt-2">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
         </div>
      </div>
    );
  }

  // Step: CART
  return (
    <div className="max-w-5xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors">
            <ArrowLeft size={18} /> Continue Shopping
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-4">
              <h2 className="text-3xl font-bold text-white">Your Cart</h2>
              <span className="text-slate-400">{cart.length} Items</span>
          </div>
          
          {cart.length === 0 ? (
             <div className="bg-slate-800 rounded-2xl p-12 text-center border border-slate-700">
                <p className="text-slate-500 mb-4">Your cart is empty.</p>
                <button onClick={onBack} className="text-teal-400 hover:text-teal-300 font-bold">Browse Catalog</button>
             </div>
          ) : (
             cart.map(item => (
                <div key={item.id} className="bg-slate-800 p-4 rounded-2xl border border-slate-700 flex items-center gap-4">
                   <div className="w-20 h-20 bg-slate-900 rounded-xl flex items-center justify-center text-xs text-slate-600 font-mono">
                      {item.id.substring(0,3).toUpperCase()}
                   </div>
                   <div className="flex-1">
                      <h3 className="font-bold text-white text-lg">{item.name}</h3>
                      <p className="text-slate-400 text-sm">{item.size}</p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-teal-500">
                         <CheckCircle size={12} /> In Stock
                      </div>
                   </div>
                   <div className="flex flex-col items-end gap-3">
                      <span className="font-bold text-xl text-white">${item.price.toFixed(2)}</span>
                      <div className="flex items-center bg-slate-900 rounded-lg border border-slate-700">
                         <button onClick={() => onUpdateQuantity(item.id, -1)} className="p-2 text-slate-400 hover:text-white"><Minus size={14}/></button>
                         <span className="w-8 text-center text-sm font-mono">{item.quantity}</span>
                         <button onClick={() => onUpdateQuantity(item.id, 1)} className="p-2 text-slate-400 hover:text-white"><Plus size={14}/></button>
                      </div>
                      <button onClick={() => onRemove(item.id)} className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1">
                         <Trash2 size={12} /> Remove
                      </button>
                   </div>
                </div>
             ))
          )}
        </div>

        <div className="lg:col-span-1">
           <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 sticky top-24">
              <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>
              <div className="space-y-3 mb-6 text-sm">
                 <div className="flex justify-between text-slate-400">
                     <span>Subtotal</span>
                     <span>${subtotal.toFixed(2)}</span>
                 </div>
                 {discount > 0 && (
                     <div className="flex justify-between text-green-400 bg-green-400/10 px-2 py-1 rounded">
                         <span>Bulk Discount (10%)</span>
                         <span>-${discount.toFixed(2)}</span>
                     </div>
                 )}
                 <div className="flex justify-between text-slate-400">
                     <span>Shipping</span>
                     <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                 </div>
                 {shipping > 0 && (
                    <p className="text-[10px] text-slate-500 text-right">Free shipping on orders over $200</p>
                 )}
                 <div className="flex justify-between text-2xl font-bold text-white pt-4 border-t border-slate-700 mt-4">
                     <span>Total</span>
                     <span>${total.toFixed(2)}</span>
                 </div>
              </div>

              <div className="space-y-4">
                  <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase">Shipping Address</label>
                      <textarea 
                        value={formData.shipping}
                        onChange={(e) => setFormData({...formData, shipping: e.target.value})}
                        placeholder="Enter full address..."
                        className="w-full bg-slate-900 border border-slate-600 rounded-xl p-3 text-sm text-white focus:ring-2 focus:ring-teal-500 outline-none resize-none h-24"
                      />
                  </div>
                  <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase">Email Address</label>
                      <input 
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="confidential@protonmail.com"
                        className="w-full bg-slate-900 border border-slate-600 rounded-xl p-3 text-sm text-white focus:ring-2 focus:ring-teal-500 outline-none"
                      />
                  </div>
                  <button 
                    onClick={handlePayment}
                    disabled={cart.length === 0}
                    className="w-full py-4 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-lg shadow-teal-900/20 flex items-center justify-center gap-2"
                  >
                    Proceed to Crypto Payment
                  </button>
                  <p className="text-[10px] text-slate-500 text-center">
                    Secure SSL Connection. Anonymous checkout supported.
                  </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
