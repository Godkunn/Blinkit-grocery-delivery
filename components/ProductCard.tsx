import React, { useState } from 'react';
import { Product } from '../types';
import { Plus, Minus, Timer } from 'lucide-react';
import { FALLBACK_IMAGE } from '../constants';

interface ProductCardProps {
  product: Product;
  quantity: number;
  onUpdateQuantity: (delta: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, quantity, onUpdateQuantity }) => {
  const [imgSrc, setImgSrc] = useState(product.image);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setImgSrc(FALLBACK_IMAGE);
      setHasError(true);
    }
  };

  return (
    <div className="w-32 md:w-44 lg:w-52 flex-shrink-0 flex flex-col bg-white rounded-xl border border-brand-border p-2 relative group hover:shadow-lg transition-shadow duration-200">
      {/* Discount Tag */}
      {product.discountPrice && (
        <div className="absolute top-0 left-0 bg-blue-500 text-white text-[9px] md:text-[10px] font-bold px-1.5 py-0.5 rounded-tl-lg rounded-br-lg z-10">
          {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
        </div>
      )}

      {/* Image */}
      <div className="w-full aspect-square mb-2 relative flex items-center justify-center overflow-hidden rounded-lg"> 
        <img 
            src={imgSrc} 
            alt={product.name} 
            onError={handleError}
            className={`w-full h-full object-contain p-1 transition-transform duration-500 group-hover:scale-110 ${hasError ? 'opacity-50' : ''}`}
            loading="lazy"
        />
      </div>

      {/* Delivery Time */}
      <div className="bg-brand-gray self-start px-1.5 py-0.5 rounded-[4px] flex items-center space-x-1 mb-2">
        <Timer size={10} className="text-slate-500" />
        <span className="text-[9px] md:text-[10px] font-semibold text-slate-600 uppercase">{product.time}</span>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <h3 className="text-xs md:text-[13px] font-semibold text-slate-800 leading-tight line-clamp-2 mb-1">{product.name}</h3>
        <p className="text-[10px] md:text-xs text-slate-500 mb-3">{product.weight}</p>
        
        <div className="mt-auto flex items-center justify-between">
            <div className="flex flex-col">
                <span className="text-xs md:text-[13px] font-bold text-slate-800">
                    ₹{product.discountPrice || product.price}
                </span>
                {product.discountPrice && (
                    <span className="text-[10px] md:text-[11px] text-slate-400 line-through">
                        ₹{product.price}
                    </span>
                )}
            </div>
            
            {quantity === 0 ? (
                <button 
                    onClick={(e) => { e.stopPropagation(); onUpdateQuantity(1); }}
                    className="bg-green-50 text-brand-green border border-brand-green font-bold text-xs px-3 md:px-4 py-1 md:py-1.5 rounded-lg hover:bg-green-100 transition-colors uppercase"
                >
                    Add
                </button>
            ) : (
                <div className="bg-brand-green text-white flex items-center rounded-lg h-7 shadow-sm">
                    <button onClick={(e) => { e.stopPropagation(); onUpdateQuantity(-1); }} className="px-2 h-full hover:bg-brand-darkGreen rounded-l-lg transition-colors"><Minus size={12} /></button>
                    <span className="text-xs font-bold w-4 text-center">{quantity}</span>
                    <button onClick={(e) => { e.stopPropagation(); onUpdateQuantity(1); }} className="px-2 h-full hover:bg-brand-darkGreen rounded-r-lg transition-colors"><Plus size={12} /></button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};