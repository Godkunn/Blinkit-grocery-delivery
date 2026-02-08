import React from 'react';
import { X, Shield, FileText, AlertTriangle, Scale } from 'lucide-react';
import { LEGAL_CONTENT } from '../constants';
import { LegalPageType } from '../types';

interface LegalModalProps {
  page: LegalPageType;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ page, onClose }) => {
  if (!page) return null;

  const content = LEGAL_CONTENT[page];
  
  const getIcon = () => {
    switch(page) {
      case 'privacy': return <Shield className="text-brand-green" size={24} />;
      case 'dmca': return <Scale className="text-red-500" size={24} />;
      case 'disclosure': return <AlertTriangle className="text-orange-500" size={24} />;
      default: return <FileText className="text-blue-500" size={24} />;
    }
  };

  const renderContent = (text: string) => {
    // Split by markdown bold syntax **text**
    const parts = text.split(/(\*\*.*?\*\*)/);
    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <span key={index} className="font-bold text-slate-900">{part.slice(2, -2)}</span>;
        }
        return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 animate-slide-in">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal Content */}
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl relative z-10 flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-6 border-b flex items-center justify-between bg-gray-50 rounded-t-2xl">
           <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                 {getIcon()}
              </div>
              <h2 className="text-xl font-bold text-slate-800">{content.title}</h2>
           </div>
           <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
              <X size={24} className="text-slate-500" />
           </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
           <div className="prose prose-slate prose-sm md:prose-base max-w-none text-slate-600 leading-relaxed">
              {content.content.split('\n').map((line, idx) => {
                 const trimmed = line.trim();
                 if (!trimmed) return <br key={idx}/>;
                 
                 // If line starts with a bold section (like headings or numbered lists with bold), we might want extra spacing
                 const isHeadingLike = trimmed.startsWith('**') || trimmed.match(/^\d+\.\s\*\*/);
                 
                 return (
                    <p key={idx} className={`mb-2 ${isHeadingLike ? 'mt-4' : ''}`}>
                        {renderContent(trimmed)}
                    </p>
                 );
              })}
           </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50 rounded-b-2xl flex justify-end">
           <button 
              onClick={onClose}
              className="px-6 py-2.5 bg-brand-green text-white font-bold rounded-xl hover:bg-brand-darkGreen transition-colors"
           >
              Understood
           </button>
        </div>
      </div>
    </div>
  );
};
