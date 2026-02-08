import React, { useEffect, useState } from 'react';
import { CartItem } from '../types';
import { X, Clock, ShoppingBag, Plus, Minus, ArrowRight } from 'lucide-react';
import { getRecipeSuggestions } from '../services/geminiService';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  updateQuantity: (id: string, delta: number) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, updateQuantity, onCheckout }) => {
  const [suggestion, setSuggestion] = useState<string>('');
  
  const total = items.reduce((sum, item) => sum + (item.discountPrice || item.price) * item.quantity, 0);
  const savings = items.reduce((sum, item) => {
    if (item.discountPrice) {
      return sum + (item.price - item.discountPrice) * item.quantity;
    }
    return sum;
  }, 0);

  useEffect(() => {
    if (isOpen && items.length > 0) {
        getRecipeSuggestions(items).then(setSuggestion);
    } else {
        setSuggestion('');
    }
  }, [isOpen, items]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      {/* Drawer */}
      <div className="relative w-full max-w-md bg-brand-gray h-full flex flex-col shadow-2xl animate-slide-in">
        {/* Header */}
        <div className="bg-white p-4 flex items-center justify-between border-b shadow-sm z-10">
          <h2 className="text-lg font-bold text-slate-800">My Cart</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Delivery Time Banner */}
            {items.length > 0 && (
                <div className="bg-white p-4 rounded-xl flex items-center space-x-3 shadow-sm">
                    <div className="bg-brand-gray p-2 rounded-lg">
                        <Clock className="text-brand-green" size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-800">Delivery in 8 minutes</h3>
                        <p className="text-xs text-slate-500">Shipment of {items.length} items</p>
                    </div>
                </div>
            )}

            {/* AI Suggestion */}
            {suggestion && (
                 <div className="bg-gradient-to-r from-purple-100 to-indigo-100 p-4 rounded-xl border border-purple-200">
                    <div className="flex items-start space-x-2">
                        <span className="text-xl">🧑‍🍳</span>
                        <div>
                            <p className="text-xs font-bold text-purple-800 uppercase mb-1">AI Chef Tip</p>
                            <p className="text-sm text-purple-900 leading-snug">{suggestion}</p>
                        </div>
                    </div>
                </div>
            )}

          {/* Items List */}
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
                <ShoppingBag size={64} className="text-slate-300 mb-4" />
                <h3 className="text-lg font-bold text-slate-600">Your cart is empty</h3>
                <p className="text-sm text-slate-500 mt-2">Add items to start shopping</p>
                <button 
                    onClick={onClose}
                    className="mt-6 bg-brand-green text-white px-6 py-2 rounded-lg font-semibold"
                >
                    Start Shopping
                </button>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm divide-y">
                {items.map((item) => (
                    <div key={item.id} className="flex p-4 gap-3">
                        <div className="w-16 h-16 shrink-0 border rounded-lg overflow-hidden">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm text-slate-700 leading-snug line-clamp-2">{item.name}</h4>
                            <p className="text-xs text-slate-500 mt-1">{item.weight}</p>
                            <div className="flex items-center justify-between mt-3">
                                <div className="font-semibold text-slate-800">
                                    ₹{(item.discountPrice || item.price) * item.quantity}
                                    {item.discountPrice && (
                                        <span className="ml-2 text-xs font-normal text-slate-400 line-through">
                                            ₹{item.price * item.quantity}
                                        </span>
                                    )}
                                </div>
                                <div className="bg-brand-green text-white rounded-md flex items-center h-8 text-sm font-bold shadow-sm">
                                    <button onClick={() => updateQuantity(item.id, -1)} className="px-2 h-full hover:bg-brand-darkGreen rounded-l-md transition-colors"><Minus size={14} /></button>
                                    <span className="w-6 text-center">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, 1)} className="px-2 h-full hover:bg-brand-darkGreen rounded-r-md transition-colors"><Plus size={14} /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
          )}

          {/* Bill Details */}
          {items.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-4 space-y-2 text-sm">
                <h3 className="font-bold text-slate-800 mb-3">Bill Details</h3>
                <div className="flex justify-between text-slate-600">
                    <span>MRP Total</span>
                    <span>₹{items.reduce((acc, i) => acc + (i.price * i.quantity), 0)}</span>
                </div>
                {savings > 0 && (
                    <div className="flex justify-between text-blue-600">
                        <span>Product Discount</span>
                        <span>-₹{savings}</span>
                    </div>
                )}
                <div className="flex justify-between text-slate-600">
                    <span>Delivery Charge</span>
                    <span className="text-brand-green">FREE</span>
                </div>
                <div className="flex justify-between text-slate-600">
                    <span>Handling Charge</span>
                    <span>₹2</span>
                </div>
                <div className="pt-3 mt-2 border-t flex justify-between font-bold text-slate-800 text-base">
                    <span>Grand Total</span>
                    <span>₹{total + 2}</span>
                </div>
            </div>
          )}
          
          {/* Cancellation Policy */}
           {items.length > 0 && (
               <div className="bg-white rounded-xl p-4 text-xs text-slate-500">
                   <h4 className="font-bold text-slate-700 mb-1">Cancellation Policy</h4>
                   <p>Orders cannot be cancelled once packed for delivery. In case of unexpected delays, a refund will be provided, if applicable.</p>
               </div>
           )}
           
           <div className="h-20"></div> {/* Spacer for sticky footer */}
        </div>

        {/* Footer */}
        {items.length > 0 && (
            <div className="absolute bottom-0 left-0 right-0 bg-white border-t p-4 z-20">
                <button 
                    onClick={onCheckout}
                    className="w-full bg-brand-green hover:bg-brand-darkGreen text-white font-bold py-3.5 rounded-xl flex items-center justify-between px-4 transition-colors"
                >
                    <div className="flex flex-col items-start text-sm">
                         <span>₹{total + 2}</span>
                         <span className="text-xs font-normal opacity-90">TOTAL</span>
                    </div>
                    <div className="flex items-center">
                        Proceed to Pay
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                </button>
            </div>
        )}
      </div>
    </div>
  );
};