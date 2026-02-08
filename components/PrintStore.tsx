import React, { useState, useRef, useEffect } from 'react';
import { Upload, FileText, Check, Printer, ChevronRight, CreditCard, Loader2, Sparkles, File, X, AlertCircle, Banknote, QrCode, Landmark, ArrowLeft } from 'lucide-react';
import { PrintConfig, PaymentMethod } from '../types';

export const PrintStore: React.FC = () => {
  const [step, setStep] = useState<'upload' | 'scanning' | 'config' | 'payment' | 'success'>('upload');
  const [fileName, setFileName] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [config, setConfig] = useState<PrintConfig>({
    copies: 1,
    colorMode: 'bw',
    sides: 'single',
    paperType: 'standard',
    binding: 'none'
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const calculateCost = () => {
    let baseRate = config.colorMode === 'bw' ? 3 : 10;
    
    // Paper costs
    const paperCosts = {
      standard: 0,
      bond: 2,
      glossy: 15,
      cardstock: 8
    };
    baseRate += paperCosts[config.paperType];

    // Binding
    const bindingCosts = {
      none: 0,
      staple: 5,
      spiral: 40,
      softcover: 150
    };

    let total = (baseRate * config.copies) + bindingCosts[config.binding];
    return total;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
      setStep('scanning');
      simulateUpload();
    }
  };

  const simulateUpload = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setStep('config'), 500);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
        setIsProcessing(false);
        setStep('success');
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

  if (step === 'success') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center animate-slide-in">
        <div className="relative">
          <div className="absolute inset-0 bg-green-200 rounded-full blur-xl opacity-50 animate-pulse"></div>
          <div className="w-24 h-24 bg-gradient-to-tr from-brand-green to-green-400 rounded-full flex items-center justify-center mb-6 relative z-10 shadow-lg shadow-green-200/50">
            <Printer size={40} className="text-white" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-md z-20">
            <Check size={20} className="text-brand-green" strokeWidth={3} />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Documents Sent for Printing!</h2>
        <p className="text-slate-500 mb-8 max-w-xs mx-auto">
          Your order for <span className="font-bold text-slate-700">{fileName}</span> has been received. Delivering in 12 mins.
        </p>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 w-full max-w-sm">
           <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
              <span className="text-slate-500 text-sm">Order ID</span>
              <span className="font-mono font-bold text-slate-700">#PRT-{Math.floor(Math.random() * 10000)}</span>
           </div>
           <div className="flex justify-between items-center">
              <span className="text-slate-500 text-sm">Amount Paid</span>
              <span className="font-bold text-brand-green text-lg">₹{calculateCost() + 5}</span>
           </div>
        </div>

        <button 
          onClick={() => {
            setStep('upload');
            setFileName('');
            setConfig({ copies: 1, colorMode: 'bw', sides: 'single', paperType: 'standard', binding: 'none' });
            setPaymentMethod(null);
          }}
          className="mt-8 text-slate-500 font-medium text-sm hover:text-brand-green transition-colors"
        >
          Print another document
        </button>
      </div>
    );
  }

  return (
    <div className="pb-40 animate-slide-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 pt-8 pb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="relative z-10">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Printer className="text-brand-yellow" /> Print Store
            </h1>
            <p className="text-slate-400 mt-2 text-sm max-w-xs">Upload documents, customize print settings, and get them delivered in minutes.</p>
        </div>
      </div>

      <div className="-mt-6 px-4 relative z-20">
        
        {step === 'upload' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
             <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-brand-green/30 rounded-xl p-8 bg-brand-green/5 hover:bg-brand-green/10 transition-colors cursor-pointer group"
             >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300">
                   <Upload size={28} className="text-brand-green" />
                </div>
                <h3 className="font-bold text-slate-800 text-lg mb-1">Tap to Upload</h3>
                <p className="text-xs text-slate-500">PDF, DOCX, JPG supported</p>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept=".pdf,.doc,.docx,.jpg,.png"
                  onChange={handleFileChange}
                />
             </div>
             
             <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                {[
                  { icon: FileText, label: "Documents" },
                  { icon: Sparkles, label: "Glossy Photos" },
                  { icon: Check, label: "Hard Binding" }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-slate-600">
                      <item.icon size={18} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">{item.label}</span>
                  </div>
                ))}
             </div>
          </div>
        )}

        {step === 'scanning' && (
           <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 relative overflow-hidden">
              <div className="flex flex-col items-center">
                 <div className="relative w-20 h-24 bg-gray-100 rounded border border-gray-300 mb-6 flex items-center justify-center overflow-hidden">
                    <FileText size={40} className="text-gray-400" />
                    {/* Futuristic Scan Line */}
                    <div className="absolute left-0 right-0 h-1 bg-brand-green shadow-[0_0_15px_rgba(12,131,31,0.8)] animate-[scan_1.5s_ease-in-out_infinite]"></div>
                 </div>
                 
                 <h3 className="font-bold text-slate-800 text-lg mb-1">Analyzing Document...</h3>
                 <p className="text-xs text-slate-500 mb-6">{fileName}</p>

                 {/* Progress Bar */}
                 <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-brand-green transition-all duration-300 ease-out"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                 </div>
                 <div className="flex justify-between w-full mt-2 text-xs font-bold text-slate-400">
                    <span>UPLOADING</span>
                    <span>{uploadProgress}%</span>
                 </div>
              </div>
           </div>
        )}

        {(step === 'config' || step === 'payment') && (
           <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {/* File Summary Header */}
              <div className="bg-gray-50 p-4 border-b flex justify-between items-center">
                 <div className="flex items-center gap-3">
                    <div className="bg-white p-2 rounded border">
                       <File size={16} className="text-red-500" />
                    </div>
                    <div className="max-w-[150px]">
                       <p className="font-bold text-slate-700 text-sm truncate">{fileName}</p>
                       <p className="text-xs text-slate-500">12 Pages detected</p>
                    </div>
                 </div>
                 <button onClick={() => setStep('upload')} className="text-slate-400 hover:text-red-500">
                    <X size={20} />
                 </button>
              </div>

              {step === 'config' ? (
                <div className="p-5 space-y-6">
                   {/* Copies */}
                   <div className="flex justify-between items-center">
                      <label className="font-bold text-slate-700 text-sm">Number of Copies</label>
                      <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1 border">
                         <button onClick={() => setConfig({...config, copies: Math.max(1, config.copies - 1)})} className="w-8 h-8 flex items-center justify-center hover:bg-white rounded shadow-sm text-slate-600 font-bold">-</button>
                         <span className="w-4 text-center font-bold text-sm">{config.copies}</span>
                         <button onClick={() => setConfig({...config, copies: config.copies + 1})} className="w-8 h-8 flex items-center justify-center hover:bg-white rounded shadow-sm text-slate-600 font-bold">+</button>
                      </div>
                   </div>

                   {/* Color Mode */}
                   <div>
                      <label className="font-bold text-slate-700 text-sm mb-3 block">Color Mode</label>
                      <div className="grid grid-cols-2 gap-3">
                         <button 
                            onClick={() => setConfig({...config, colorMode: 'bw'})}
                            className={`p-3 rounded-xl border text-sm font-medium transition-all ${config.colorMode === 'bw' ? 'border-brand-green bg-green-50 text-brand-green ring-1 ring-brand-green' : 'border-gray-200 text-slate-600'}`}
                         >
                            Black & White
                            <span className="block text-[10px] opacity-70 mt-1">₹3 / page</span>
                         </button>
                         <button 
                            onClick={() => setConfig({...config, colorMode: 'color'})}
                            className={`p-3 rounded-xl border text-sm font-medium transition-all ${config.colorMode === 'color' ? 'border-brand-green bg-green-50 text-brand-green ring-1 ring-brand-green' : 'border-gray-200 text-slate-600'}`}
                         >
                            Full Color
                            <span className="block text-[10px] opacity-70 mt-1">₹10 / page</span>
                         </button>
                      </div>
                   </div>

                   {/* Paper Type */}
                   <div>
                      <label className="font-bold text-slate-700 text-sm mb-3 block flex items-center gap-2">
                        Paper Type <Sparkles size={14} className="text-brand-yellow" />
                      </label>
                      <div className="space-y-2">
                          {[
                            { id: 'standard', label: 'Standard (75gsm)', price: '+₹0' },
                            { id: 'bond', label: 'Bond Paper (100gsm)', price: '+₹2' },
                            { id: 'glossy', label: 'Glossy Photo Paper', price: '+₹15' },
                          ].map((paper) => (
                            <div 
                              key={paper.id}
                              onClick={() => setConfig({...config, paperType: paper.id as any})}
                              className={`flex justify-between items-center p-3 rounded-lg border cursor-pointer ${config.paperType === paper.id ? 'border-brand-green bg-green-50' : 'border-gray-200'}`}
                            >
                               <span className={`text-sm ${config.paperType === paper.id ? 'font-bold text-brand-green' : 'text-slate-600'}`}>{paper.label}</span>
                               <span className="text-xs font-bold text-slate-500">{paper.price}</span>
                            </div>
                          ))}
                      </div>
                   </div>
                   
                   {/* Binding */}
                   <div>
                       <label className="font-bold text-slate-700 text-sm mb-3 block">Binding Options</label>
                       <select 
                        value={config.binding}
                        onChange={(e) => setConfig({...config, binding: e.target.value as any})}
                        className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-brand-green"
                       >
                           <option value="none">No Binding (Loose Sheets)</option>
                           <option value="staple">Corner Staple (+₹5)</option>
                           <option value="spiral">Spiral Binding (+₹40)</option>
                           <option value="softcover">Soft Cover Book (+₹150)</option>
                       </select>
                   </div>
                </div>
              ) : (
                // Payment Preview Step
                <div className="p-5">
                   <div className="flex items-center gap-2 mb-4">
                      <button onClick={() => setStep('config')} className="p-1 hover:bg-gray-100 rounded-full"><ArrowLeft size={20} className="text-slate-600"/></button>
                      <h3 className="font-bold text-slate-800">Select Payment Method</h3>
                   </div>

                   {/* Payment Summary */}
                   <div className="bg-gray-50 p-4 rounded-xl mb-6">
                      <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-slate-600">Print Cost ({config.copies} copies)</span>
                          <span className="font-bold text-slate-800">₹{calculateCost()}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-slate-600">Service Fee</span>
                          <span className="font-bold text-slate-800">₹5.00</span>
                      </div>
                      <div className="border-t border-gray-200 pt-2 flex justify-between items-center">
                          <span className="text-sm font-bold text-slate-800">Total Payable</span>
                          <span className="text-lg font-extrabold text-brand-green">₹{calculateCost() + 5}</span>
                      </div>
                   </div>

                   {/* Payment Options */}
                   <div className="space-y-3 mb-6">
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

                   <button 
                      onClick={handlePayment}
                      disabled={!paymentMethod || isProcessing}
                      className={`w-full font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg ${
                        !paymentMethod || isProcessing
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-brand-green hover:bg-brand-darkGreen text-white shadow-brand-green/20'
                      }`}
                   >
                      {isProcessing ? (
                          <>Processing Payment...</>
                      ) : (
                          <>
                             <CreditCard size={18} /> Pay ₹{calculateCost() + 5} & Print
                          </>
                      )}
                   </button>
                </div>
              )}
           </div>
        )}
      </div>

      {/* Footer Action Bar (Only in config step) - Updated Floating Pill Design */}
      {step === 'config' && (
         <div className="fixed bottom-4 inset-x-4 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-full md:max-w-xl z-[60] animate-slide-in">
             <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between ring-1 ring-white/10">
                 <div className="flex flex-col px-2">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Estimated Cost</p>
                    <p className="text-2xl font-extrabold text-white">₹{calculateCost()}</p>
                 </div>
                 <button 
                    onClick={() => setStep('payment')}
                    className="bg-brand-green hover:bg-brand-darkGreen text-white font-bold text-sm py-3 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-brand-green/30 active:scale-95 transition-all"
                 >
                    Next <ChevronRight size={18} />
                 </button>
             </div>
         </div>
      )}
      
      {/* Styles for animation */}
      <style>{`
        @keyframes scan {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};
