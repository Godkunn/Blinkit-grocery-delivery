import React, { useState, useEffect } from 'react';
import { Address } from '../types';
import { X, Home, Briefcase, MapPin } from 'lucide-react';

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (addr: Omit<Address, 'id'> | Address) => void;
  initialData?: Address | null;
}

export const AddressModal: React.FC<AddressModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [type, setType] = useState<'Home' | 'Work' | 'Other'>('Home');
  const [flat, setFlat] = useState('');
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');

  useEffect(() => {
    if (initialData) {
        setType(initialData.type);
        setFlat(initialData.flat);
        setLine1(initialData.line1);
        setLine2(initialData.line2);
    } else {
        // Reset for new entry
        setType('Home');
        setFlat('');
        setLine1('');
        setLine2('');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (initialData) {
        onSave({ ...initialData, type, flat, line1, line2 });
    } else {
        onSave({ type, flat, line1, line2 });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="bg-white w-full max-w-sm rounded-2xl z-10 p-6 animate-slide-in relative">
        <button onClick={onClose} className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-600">
            <X size={20} />
        </button>
        
        <h2 className="text-xl font-bold mb-6">{initialData ? 'Edit Address' : 'Add Address'}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">SAVE AS</label>
                <div className="flex gap-2">
                    {['Home', 'Work', 'Other'].map((t) => (
                        <button
                            key={t}
                            type="button"
                            onClick={() => setType(t as any)}
                            className={`flex-1 py-2 px-3 rounded-lg border text-sm font-medium flex items-center justify-center gap-2 transition-all ${
                                type === t 
                                ? 'bg-green-50 border-brand-green text-brand-green' 
                                : 'bg-white border-gray-200 text-slate-600 hover:border-gray-300'
                            }`}
                        >
                            {t === 'Home' && <Home size={14}/>}
                            {t === 'Work' && <Briefcase size={14}/>}
                            {t === 'Other' && <MapPin size={14}/>}
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">FLAT / HOUSE NO / FLOOR</label>
                <input 
                    required
                    value={flat}
                    onChange={e => setFlat(e.target.value)}
                    className="w-full p-3 bg-brand-gray rounded-lg border-none focus:ring-1 focus:ring-brand-green text-sm"
                    placeholder="e.g. Flat 304, 3rd Floor"
                />
            </div>

             <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">AREA / SECTOR / LOCALITY</label>
                <input 
                    required
                    value={line1}
                    onChange={e => setLine1(e.target.value)}
                    className="w-full p-3 bg-brand-gray rounded-lg border-none focus:ring-1 focus:ring-brand-green text-sm"
                    placeholder="e.g. Green Park Main"
                />
            </div>

            <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">NEARBY LANDMARK (OPTIONAL)</label>
                <input 
                    value={line2}
                    onChange={e => setLine2(e.target.value)}
                    className="w-full p-3 bg-brand-gray rounded-lg border-none focus:ring-1 focus:ring-brand-green text-sm"
                    placeholder="e.g. Near Metro Station"
                />
            </div>

            <button type="submit" className="w-full bg-brand-green text-white py-3.5 rounded-xl font-bold hover:bg-brand-darkGreen transition-colors mt-4">
                {initialData ? 'Update Address' : 'Save Address'}
            </button>
        </form>
      </div>
    </div>
  );
};