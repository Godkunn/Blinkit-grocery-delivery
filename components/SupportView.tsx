import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Search, MessageSquare, ChevronRight, Star, Send, Phone, Mail, HelpCircle } from 'lucide-react';
import { SUPPORT_DATA } from '../constants';
import { ChatMessage } from '../types';

interface SupportViewProps {
  onBack: () => void;
}

export const SupportView: React.FC<SupportViewProps> = ({ onBack }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial Greeting
    if (chatHistory.length === 0) {
       setChatHistory([
           { id: '1', type: 'bot', text: "Hi there! 👋 I'm your Blinkit Support Assistant. How can I help you today?" }
       ]);
    }
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleCategoryClick = (catId: string) => {
    setActiveCategory(catId);
    setSearchQuery('');
  };

  const handleQuestionClick = (question: string, answer: string) => {
      // Add user question
      const userMsg: ChatMessage = { id: Date.now().toString(), type: 'user', text: question };
      
      // Add bot answer + satisfaction check
      const botMsg: ChatMessage = { 
          id: (Date.now() + 1).toString(), 
          type: 'bot', 
          text: answer,
          options: [
              { label: "Yes, thanks!", action: "resolved" },
              { label: "No, need help", action: "unresolved" }
          ]
      };

      setChatHistory(prev => [...prev, userMsg, botMsg]);
      setActiveCategory(null); // Return to chat view
  };

  const handleOptionClick = (action: string) => {
      if (action === 'resolved') {
          setChatHistory(prev => [
              ...prev, 
              { id: Date.now().toString(), type: 'user', text: "Yes, thanks!" },
              { id: (Date.now()+1).toString(), type: 'bot', text: "Great! How would you rate your support experience today?", isRating: true }
          ]);
      } else if (action === 'unresolved') {
          setChatHistory(prev => [
              ...prev,
              { id: Date.now().toString(), type: 'user', text: "No, I still need help." },
              { id: (Date.now()+1).toString(), type: 'bot', text: "I'm sorry I couldn't solve it. Please contact our human support team below." }
          ]);
      }
  };

  const filteredQuestions = activeCategory 
    ? SUPPORT_DATA.questions.filter(q => q.category === activeCategory)
    : [];

  const renderRating = () => {
      return (
          <div className="flex gap-2 mt-2">
              {[1, 2, 3, 4, 5].map(star => (
                  <button key={star} className="p-1 hover:scale-110 transition-transform text-gray-300 hover:text-brand-yellow focus:text-brand-yellow">
                      <Star fill="currentColor" size={24} />
                  </button>
              ))}
          </div>
      );
  };

  return (
    <div className="min-h-screen bg-white pb-20 flex flex-col animate-slide-in">
        {/* Header */}
        <div className="bg-white p-4 flex items-center gap-3 shadow-sm sticky top-0 z-20 border-b">
            <button onClick={onBack} className="p-1 rounded-full hover:bg-gray-100"><ArrowLeft size={24} className="text-slate-700"/></button>
            <div>
                <h1 className="text-lg font-bold text-slate-800 leading-tight">Help & Support</h1>
                <p className="text-xs text-brand-green flex items-center gap-1"><span className="w-2 h-2 bg-brand-green rounded-full animate-pulse"></span> Online</p>
            </div>
        </div>

        <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full">
            
            {/* Chat Area */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                {chatHistory.map(msg => (
                    <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.type === 'user' ? 'bg-brand-green text-white rounded-br-none' : 'bg-gray-100 text-slate-800 rounded-tl-none'}`}>
                            {msg.text}
                            {msg.isRating && renderRating()}
                        </div>
                    </div>
                ))}
                
                {/* Options Buttons */}
                {chatHistory.length > 0 && chatHistory[chatHistory.length - 1].options && (
                     <div className="flex flex-wrap gap-2 mt-2">
                         {chatHistory[chatHistory.length - 1].options?.map((opt, idx) => (
                             <button 
                                key={idx}
                                onClick={() => handleOptionClick(opt.action)}
                                className="bg-white border border-brand-green text-brand-green font-bold text-sm px-4 py-2 rounded-full hover:bg-green-50 transition-colors"
                             >
                                 {opt.label}
                             </button>
                         ))}
                     </div>
                )}
                
                {/* Contact Support Card (if unresolved) */}
                {chatHistory.length > 0 && chatHistory[chatHistory.length - 1].text?.includes("human support") && (
                    <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl mt-4 animate-slide-in">
                        <h3 className="font-bold text-orange-800 mb-3">Contact Us Directly</h3>
                        <div className="space-y-3">
                            <a href="tel:1800-200-9000" className="flex items-center gap-3 text-slate-700 bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all">
                                <div className="bg-orange-100 p-2 rounded-full text-orange-600"><Phone size={18} /></div>
                                <div>
                                    <p className="text-xs text-slate-500 font-bold uppercase">Toll Free</p>
                                    <p className="font-bold">1800-200-9000</p>
                                </div>
                            </a>
                            <a href="mailto:godayush10@gmail.com" className="flex items-center gap-3 text-slate-700 bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all">
                                <div className="bg-orange-100 p-2 rounded-full text-orange-600"><Mail size={18} /></div>
                                <div>
                                    <p className="text-xs text-slate-500 font-bold uppercase">Email Support</p>
                                    <p className="font-bold">godayush10@gmail.com</p>
                                </div>
                            </a>
                        </div>
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>

            {/* Category Selector (Overlay if active) */}
            {activeCategory ? (
                <div className="fixed inset-0 top-[60px] bg-white z-30 animate-slide-in flex flex-col">
                    <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
                         <h3 className="font-bold text-slate-700">{SUPPORT_DATA.categories.find(c => c.id === activeCategory)?.name}</h3>
                         <button onClick={() => setActiveCategory(null)} className="text-sm font-bold text-brand-green">Close</button>
                    </div>
                    <div className="p-4">
                        <div className="relative mb-4">
                            <Search className="absolute left-3 top-2.5 text-slate-400" size={18}/>
                            <input 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search issues..."
                                className="w-full bg-gray-100 pl-10 pr-4 py-2 rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand-green/20"
                            />
                        </div>
                        <div className="space-y-2 overflow-y-auto h-[calc(100vh-180px)] custom-scrollbar pb-20">
                            {filteredQuestions
                                .filter(q => q.question.toLowerCase().includes(searchQuery.toLowerCase()))
                                .map((q, idx) => (
                                    <button 
                                        key={idx}
                                        onClick={() => handleQuestionClick(q.question, q.answer)}
                                        className="w-full text-left p-3 border rounded-xl hover:bg-gray-50 hover:border-brand-green transition-all flex items-center justify-between group"
                                    >
                                        <span className="text-sm text-slate-700 font-medium">{q.question}</span>
                                        <ChevronRight size={16} className="text-gray-300 group-hover:text-brand-green" />
                                    </button>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                /* Bottom Sheet Categories */
                <div className="bg-white border-t p-4 pb-8 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-3">Select a topic to chat</p>
                    <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                        {SUPPORT_DATA.categories.map(cat => (
                            <button 
                                key={cat.id}
                                onClick={() => handleCategoryClick(cat.id)}
                                className="flex-shrink-0 bg-gray-50 border border-gray-200 px-4 py-2 rounded-full text-sm font-medium text-slate-700 hover:bg-brand-green hover:text-white hover:border-brand-green transition-colors whitespace-nowrap"
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};
