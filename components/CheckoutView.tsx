import React, { useState } from 'react';
import { Address, CartItem, PaymentMethod } from '../types';
import { ArrowLeft, MapPin, CheckCircle, CreditCard, Banknote, Landmark, QrCode, ChevronRight, ArrowRight } from 'lucide-react';

interface CheckoutViewProps {
  items: CartItem[];
  addresses: Address[];
  onBack: () => void;
  onSuccess: () => void;
  onAddAddress: () => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({ items, addresses, onBack, onSuccess, onAddAddress }) => {
  const [selectedAddressId, setSelectedAddressId] = useState<string>(addresses.find(a => a.isDefault)?.id || addresses[0]?.id);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const total = items.reduce((sum, item) => sum + (item.discountPrice || item.price) * item.quantity, 0) + 2;
  const activeAddress = addresses.find(a => a.id === selectedAddressId);

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
        setIsProcessing(false);
        onSuccess();
    }, 2000);
  };

  const renderPaymentInput = () => {
    switch(paymentMethod) {
        case 'card':
            return (
                <div className="bg-gray-50 p-4 rounded-lg mt-2 space-y-3 border animate-slide-in">
                    <input type="text" placeholder="Card Number" className="w-full p-2 border rounded text-sm" maxLength={16}/>
                    <div className="flex gap-2">
                        <input type="text" placeholder="MM/YY" className="w-1/2 p-2 border rounded text-sm" />
                        <input type="text" placeholder="CVV" className="w-1/2 p-2 border rounded text-sm" maxLength={3}/>
                    </div>
                    <input type="text" placeholder="Card Holder Name" className="w-full p-2 border rounded text-sm"/>
                </div>
            );
        case 'upi':
             return (
                <div className="bg-gray-50 p-4 rounded-lg mt-2 flex flex-col items-center space-y-3 border animate-slide-in">
                    <div className="w-32 h-32 bg-white border p-2 rounded-lg">
                        {/* Dummy QR */}
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=dummy@upi&pn=BlinkitClone&am=100" alt="UPI QR" className="w-full h-full opacity-80" />
                    </div>
                    <p className="text-xs text-slate-500">Scan using any UPI App</p>
                    <div className="w-full flex items-center gap-2">
                         <div className="h-px bg-gray-300 flex-1"></div>
                         <span className="text-xs text-gray-400">OR</span>
                         <div className="h-px bg-gray-300 flex-1"></div>
                    </div>
                    <input type="text" placeholder="Enter UPI ID (e.g. mob@okhdfc)" className="w-full p-2 border rounded text-sm"/>
                </div>
            );
        case 'netbanking':
             return (
                <div className="bg-gray-50 p-4 rounded-lg mt-2 border animate-slide-in">
                    <select className="w-full p-2 border rounded text-sm bg-white">
                        <option>HDFC Bank</option>
                        <option>SBI</option>
                        <option>ICICI Bank</option>
                        <option>Axis Bank</option>
                    </select>
                </div>
             );
        default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-brand-gray pb-24">
        {/* Header */}
        <div className="bg-white p-4 flex items-center gap-3 shadow-sm sticky top-0 z-10">
            <button onClick={onBack}><ArrowLeft size={24} className="text-slate-700"/></button>
            <div>
                <h1 className="text-lg font-bold text-slate-800 leading-tight">Checkout</h1>
                <p className="text-xs text-slate-500">{items.length} items • ₹{total}</p>
            </div>
        </div>

        <div className="p-4 space-y-4 max-w-lg mx-auto">
            
            {/* Address Selection */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="font-bold text-slate-800 flex items-center gap-2">
                        <MapPin size={18} className="text-slate-800"/> Delivery Address
                    </h2>
                    <button onClick={onAddAddress} className="text-brand-green text-xs font-bold uppercase">Add New</button>
                </div>
                
                <div className="space-y-3">
                    {addresses.map(addr => (
                         <div 
                            key={addr.id} 
                            onClick={() => setSelectedAddressId(addr.id)}
                            className={`border rounded-lg p-3 relative cursor-pointer transition-all ${selectedAddressId === addr.id ? 'border-brand-green bg-green-50/50' : 'border-gray-200'}`}
                        >
                            <div className="flex items-start gap-3">
                                <div className={`w-4 h-4 rounded-full border mt-1 flex items-center justify-center ${selectedAddressId === addr.id ? 'border-brand-green' : 'border-gray-400'}`}>
                                    {selectedAddressId === addr.id && <div className="w-2 h-2 bg-brand-green rounded-full"></div>}
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-slate-800">{addr.type}</h4>
                                    <p className="text-xs text-slate-500">{addr.flat}, {addr.line1}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    {addresses.length === 0 && <p className="text-sm text-red-500">Please add an address first.</p>}
                </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
                 <h2 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
                    <Banknote size={18} className="text-slate-800"/> Payment Method
                </h2>

                <div className="space-y-2">
                    {/* UPI */}
                    <div className="border rounded-lg overflow-hidden">
                        <button 
                            onClick={() => setPaymentMethod('upi')}
                            className="w-full flex items-center p-3 gap-3 hover:bg-gray-50 text-left"
                        >
                            <QrCode size={20} className="text-brand-green"/>
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-slate-700">UPI</p>
                                <p className="text-xs text-slate-400">Google Pay, PhonePe, Paytm</p>
                            </div>
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'upi' ? 'border-brand-green' : 'border-gray-300'}`}>
                                 {paymentMethod === 'upi' && <div className="w-2 h-2 bg-brand-green rounded-full"></div>}
                            </div>
                        </button>
                        {paymentMethod === 'upi' && renderPaymentInput()}
                    </div>

                    {/* Card */}
                    <div className="border rounded-lg overflow-hidden">
                        <button 
                            onClick={() => setPaymentMethod('card')}
                            className="w-full flex items-center p-3 gap-3 hover:bg-gray-50 text-left"
                        >
                            <CreditCard size={20} className="text-blue-600"/>
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-slate-700">Credit / Debit Card</p>
                                <p className="text-xs text-slate-400">Visa, Mastercard, Rupay</p>
                            </div>
                             <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'card' ? 'border-brand-green' : 'border-gray-300'}`}>
                                 {paymentMethod === 'card' && <div className="w-2 h-2 bg-brand-green rounded-full"></div>}
                            </div>
                        </button>
                        {paymentMethod === 'card' && renderPaymentInput()}
                    </div>

                     {/* Netbanking */}
                     <div className="border rounded-lg overflow-hidden">
                        <button 
                            onClick={() => setPaymentMethod('netbanking')}
                            className="w-full flex items-center p-3 gap-3 hover:bg-gray-50 text-left"
                        >
                            <Landmark size={20} className="text-orange-600"/>
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-slate-700">Netbanking</p>
                                <p className="text-xs text-slate-400">All Indian banks</p>
                            </div>
                             <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'netbanking' ? 'border-brand-green' : 'border-gray-300'}`}>
                                 {paymentMethod === 'netbanking' && <div className="w-2 h-2 bg-brand-green rounded-full"></div>}
                            </div>
                        </button>
                        {paymentMethod === 'netbanking' && renderPaymentInput()}
                    </div>

                    {/* COD */}
                    <div className="border rounded-lg overflow-hidden">
                        <button 
                            onClick={() => setPaymentMethod('cod')}
                            className="w-full flex items-center p-3 gap-3 hover:bg-gray-50 text-left"
                        >
                            <Banknote size={20} className="text-slate-600"/>
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-slate-700">Cash on Delivery</p>
                                <p className="text-xs text-slate-400">Pay cash at your doorstep</p>
                            </div>
                             <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'cod' ? 'border-brand-green' : 'border-gray-300'}`}>
                                 {paymentMethod === 'cod' && <div className="w-2 h-2 bg-brand-green rounded-full"></div>}
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Disclaimer */}
            <p className="text-[10px] text-center text-slate-400 mt-4">
                By placing an order, you agree to our Terms and Conditions. 
                <br/>
                Made with love by Godkun
            </p>

        </div>

        {/* Footer */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-20">
            <div className="max-w-lg mx-auto">
                 <button 
                    onClick={handlePlaceOrder}
                    disabled={!selectedAddressId || !paymentMethod || isProcessing}
                    className={`w-full font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all ${
                        !selectedAddressId || !paymentMethod 
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                        : 'bg-brand-green hover:bg-brand-darkGreen text-white'
                    }`}
                >
                    {isProcessing ? (
                        <>Processing...</>
                    ) : (
                        <>Place Order <ArrowRight size={18}/></>
                    )}
                </button>
            </div>
        </div>
    </div>
  );
};