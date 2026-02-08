import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Search, ShoppingCart, MapPin, User, ChevronDown, Home, Printer, User as UserIcon, ShoppingBag, Check, ArrowLeft, FileText, Upload, AlertCircle, Heart, Github, Linkedin, HelpCircle } from 'lucide-react';
import { CATEGORIES, PRODUCTS } from './constants';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { ProfileView } from './components/ProfileView';
import { AddressModal } from './components/AddressModal';
import { CheckoutView } from './components/CheckoutView';
import { PrintStore } from './components/PrintStore'; 
import { SupportView } from './components/SupportView'; 
import { LegalModal } from './components/LegalModal'; 
import { CartItem, Product, UserProfile, Address, ViewState, LegalPageType } from './types';
import { smartSearch } from './services/geminiService';

const DEFAULT_USER: UserProfile = {
    name: 'Godkun Fan',
    phone: '+91 98765 43210',
    email: 'fan@godkun.dev',
    addresses: [
        { id: 'addr_1', type: 'Home', flat: '102', line1: 'Sunshine Apartments, Sector 12', line2: 'New Delhi, 110075', isDefault: true }
    ]
};

export default function App() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [user, setUser] = useState<UserProfile>(DEFAULT_USER);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [addressToEdit, setAddressToEdit] = useState<Address | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Legal Modal State
  const [activeLegalPage, setActiveLegalPage] = useState<LegalPageType>(null);

  // Persistence
  useEffect(() => {
    const savedCart = localStorage.getItem('blinkit_clone_cart');
    const savedUser = localStorage.getItem('blinkit_clone_user');
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  useEffect(() => {
    localStorage.setItem('blinkit_clone_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('blinkit_clone_user', JSON.stringify(user));
  }, [user]);

  const activeAddress = user.addresses.find(a => a.isDefault) || user.addresses[0];

  const cartTotalItems = (Object.values(cart) as number[]).reduce((a: number, b: number) => a + b, 0);
  const cartTotalPrice = Object.entries(cart).reduce((total: number, [id, qty]: [string, number]) => {
    const product = PRODUCTS.find(p => p.id === id);
    return total + (product ? (product.discountPrice || product.price) * qty : 0);
  }, 0);

  const cartItems: CartItem[] = useMemo(() => {
    return Object.entries(cart)
        .map(([id, qty]: [string, number]) => {
            const product = PRODUCTS.find(p => p.id === id);
            return product ? { ...product, quantity: qty } : null;
        })
        .filter((item): item is CartItem => item !== null && item.quantity > 0);
  }, [cart]);

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => {
      const next = { ...prev };
      const currentQty = next[id] || 0;
      const newQty = Math.max(0, currentQty + delta);
      if (newQty === 0) {
        delete next[id];
      } else {
        next[id] = newQty;
      }
      return next;
    });
  };

  const handleSaveAddress = (addrData: Omit<Address, 'id'> | Address) => {
      if ('id' in addrData) {
          // Update existing
          setUser(prev => ({
              ...prev,
              addresses: prev.addresses.map(a => a.id === addrData.id ? addrData : a)
          }));
      } else {
          // Create new
           const newAddr: Address = {
              ...addrData,
              id: `addr_${Date.now()}`,
              isDefault: user.addresses.length === 0
          };
          setUser(prev => ({ ...prev, addresses: [...prev.addresses, newAddr] }));
      }
  };

  const handleSearch = useCallback(async (e: React.FormEvent | React.KeyboardEvent) => {
      if ('key' in e && e.key !== 'Enter') return;
      e.preventDefault();
      
      if (!searchQuery.trim()) {
          setSearchResults(null);
          return;
      }

      setIsSearching(true);
      setCurrentView('search');
      
      // Perform pseudo-binary optimized search
      const queryLower = searchQuery.toLowerCase();
      const simpleMatches = PRODUCTS.filter(p => p.name.toLowerCase().includes(queryLower));
      
      if (simpleMatches.length > 0) {
          setSearchResults(simpleMatches.slice(0, 50));
          setIsSearching(false);
      } else {
          // AI Search or Fallback
          const results = await smartSearch(searchQuery);
          setSearchResults(results);
          setIsSearching(false);
      }
  }, [searchQuery]);

  const productsByCategory = useMemo(() => {
    const groups: Record<string, Product[]> = {};
    CATEGORIES.forEach(cat => {
        const catProducts = PRODUCTS.filter(p => p.category === cat.name).slice(0, 15);
        if (catProducts.length > 0) {
            groups[cat.name] = catProducts;
        }
    });
    return groups;
  }, []);

  const handleCategoryClick = (categoryName: string) => {
      setSelectedCategory(categoryName);
      setCurrentView('category');
      window.scrollTo(0, 0);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setCurrentView('checkout');
  };

  const handleOrderSuccess = () => {
    setCurrentView('success');
    setCart({}); // Clear cart
    setTimeout(() => {
        setCurrentView('home');
    }, 3000);
  };

  const handleLogout = () => {
      // Simulate logout by resetting to default or guest state
      // In a real app, this would clear tokens
      setCurrentView('home');
      window.scrollTo(0,0);
  };

  const handleLegalClick = (e: React.MouseEvent, page: LegalPageType) => {
      e.preventDefault();
      setActiveLegalPage(page);
  };

  // View Renders
  const renderHome = () => (
    <>
         {/* Hero Banners */}
        <div className="px-4 md:px-0 mb-8 mt-4 space-y-4">
                {/* Full Width Banner */}
                <div 
                    onClick={() => handleCategoryClick('Vegetables & Fruits')}
                    className="w-full rounded-xl overflow-hidden shadow-sm relative h-48 md:h-72 group cursor-pointer"
                >
                    <img 
                        src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        alt="Fresh Vegetables"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6 md:p-8">
                        <h2 className="text-white text-3xl md:text-5xl font-extrabold mb-2 tracking-tight">Fresh & Organic</h2>
                        <p className="text-white/90 font-medium text-base md:text-lg">Farm fresh veggies delivered in minutes</p>
                    </div>
                </div>
                
                {/* 3-Column Grid Below */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div 
                        onClick={() => handleCategoryClick('Bath & Body')}
                        className="rounded-xl overflow-hidden shadow-sm relative h-40 md:h-52 group cursor-pointer"
                    >
                        <img 
                            src="https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=400&q=80" 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                            alt="Pharmacy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                            <h2 className="text-white text-lg md:text-xl font-bold">Beauty</h2>
                            <p className="text-white/90 text-xs md:text-sm">Glow in 10 mins</p>
                        </div>
                    </div>

                    <div 
                        onClick={() => handleCategoryClick('Munchies')}
                        className="rounded-xl overflow-hidden shadow-sm relative h-40 md:h-52 group cursor-pointer"
                    >
                        <img 
                            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80" 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                            alt="Pizza"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                            <h2 className="text-white text-lg md:text-xl font-bold">Party Time?</h2>
                            <p className="text-white/90 text-xs md:text-sm">Snacks & Drinks ready</p>
                        </div>
                    </div>

                    <div 
                        onClick={() => handleCategoryClick('Instant & Frozen Food')}
                        className="rounded-xl overflow-hidden shadow-sm relative h-40 md:h-52 group cursor-pointer"
                    >
                        <img 
                            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80" 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                            alt="Instant Food"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                            <h2 className="text-white text-lg md:text-xl font-bold">Instant Cravings</h2>
                            <p className="text-white/90 text-xs md:text-sm">Ready to eat in minutes</p>
                        </div>
                    </div>
                </div>
        </div>

        {/* Categories Grid - Mobile Optimized - Dense Grid for Desktop */}
        <div className="mb-10 px-4 md:px-0">
            <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-4">Shop by Category</h3>
            {/* Increased column count to 10 on large screens for a tighter, more app-like feel */}
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-x-3 gap-y-6">
                {CATEGORIES.map(cat => (
                    <div 
                        key={cat.id} 
                        className="flex flex-col items-center group cursor-pointer"
                        onClick={() => handleCategoryClick(cat.name)}
                    >
                        <div className="w-full aspect-[4/5] bg-blue-50 rounded-xl mb-2 overflow-hidden shadow-sm border border-transparent group-hover:border-brand-green transition-all relative">
                            {/* Reduced zoom to scale-105 for a subtler effect */}
                            <img src={cat.image} alt={cat.name} className="w-full h-full object-contain p-1.5 mix-blend-multiply group-hover:scale-105 transition-transform duration-300 ease-out" />
                        </div>
                        <span className="text-[10px] md:text-xs font-semibold text-slate-700 text-center leading-tight group-hover:text-brand-green transition-colors">{cat.name}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* Product Rows */}
        {Object.entries(productsByCategory).map(([category, items]: [string, Product[]]) => (
            <div key={category} className="mb-8 pl-4 md:pl-0">
                <div className="flex items-center justify-between pr-4 md:pr-0 mb-4">
                    <h3 
                        className="text-lg md:text-xl font-bold text-slate-800 cursor-pointer hover:text-brand-green"
                        onClick={() => handleCategoryClick(category)}
                    >
                        {category}
                    </h3>
                    <button 
                        onClick={() => handleCategoryClick(category)}
                        className="text-brand-green font-bold text-sm"
                    >
                        see all
                    </button>
                </div>
                <div className="overflow-x-auto no-scrollbar pb-4 pr-4">
                    <div className="flex gap-3 md:gap-4 w-max">
                        {items.map(p => (
                            <ProductCard 
                                key={p.id} 
                                product={p}
                                quantity={cart[p.id] || 0}
                                onUpdateQuantity={(d) => updateQuantity(p.id, d)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        ))}

        {/* Footer & Disclaimer */}
        <div className="bg-white mt-12 pt-12 pb-24 md:pb-12 border-t border-gray-100">
             <div className="container mx-auto px-4">
                 <div className="flex flex-col items-center justify-center text-center">
                      <div className="mb-6 flex flex-col items-center justify-center gap-2 text-slate-500 font-medium text-sm">
                           <div className="flex items-center gap-2 mb-2">
                               Made with <Heart size={16} className="text-red-500 fill-red-500 animate-pulse" /> by <span className="font-bold text-slate-800">Ayush Chaudhary</span>
                           </div>
                           <div className="flex items-center gap-4">
                               <a href="https://github.com/Godkunn" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-brand-green transition-colors">
                                   <Github size={16} /> GitHub
                               </a>
                               <a href="https://www.linkedin.com/in/ayush-chaudharyy" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                                   <Linkedin size={16} /> LinkedIn
                               </a>
                           </div>
                      </div>
                      
                      <div className="w-full h-px bg-gray-100 mb-6 max-w-xl mx-auto"></div>
                      
                      <div className="space-y-4 max-w-2xl mx-auto">
                          <p className="text-[10px] md:text-xs text-slate-400 leading-relaxed">
                              © Blinkit Commerce Private Limited, 2016-2026
                          </p>
                          <p className="text-[10px] md:text-xs text-slate-400 leading-relaxed">
                             "Blinkit" is owned & managed by "Blinkit Commerce Private Limited" (formerly known as Grofers India Private Limited) and is not related, linked or interconnected in whatsoever manner or nature, to "GROFFR.COM" which is a real estate services business operated by "Redstone Consultancy Services Private Limited".
                          </p>
                          <div className="flex flex-wrap justify-center gap-4 text-[10px] md:text-xs text-slate-500 font-medium">
                              <a href="#" onClick={(e) => handleLegalClick(e, 'privacy')} className="cursor-pointer hover:underline hover:text-brand-green">Privacy Policy</a>
                              <a href="#" onClick={(e) => handleLegalClick(e, 'terms')} className="cursor-pointer hover:underline hover:text-brand-green">Terms of Use</a>
                              <a href="#" onClick={(e) => handleLegalClick(e, 'disclosure')} className="cursor-pointer hover:underline hover:text-brand-green">Responsible Disclosure Policy</a>
                              <a href="#" onClick={(e) => handleLegalClick(e, 'mobikwik')} className="cursor-pointer hover:underline hover:text-brand-green">MobiKwik / Zip Terms & Conditions</a>
                              <a href="#" onClick={(e) => handleLegalClick(e, 'dmca')} className="cursor-pointer hover:underline hover:text-brand-green">Legal & DMCA</a>
                          </div>
                      </div>
                 </div>
             </div>
        </div>
    </>
  );

  const renderCategoryPage = () => {
      const categoryProducts = PRODUCTS.filter(p => p.category === selectedCategory);
      
      return (
          <div className="min-h-screen bg-brand-gray pb-20 animate-slide-in">
              <div className="bg-white sticky top-0 z-30 shadow-sm p-4 flex items-center gap-4">
                  <button onClick={() => setCurrentView('home')} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
                      <ArrowLeft size={24} className="text-slate-700" />
                  </button>
                  <h1 className="text-xl font-bold text-slate-800">{selectedCategory}</h1>
                  <span className="ml-auto text-xs text-slate-500 font-medium bg-gray-100 px-2 py-1 rounded-full">{categoryProducts.length} items</span>
              </div>
              
              <div className="p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
                  {categoryProducts.map(p => (
                      <ProductCard 
                            key={p.id} 
                            product={p} 
                            quantity={cart[p.id] || 0}
                            onUpdateQuantity={(d) => updateQuantity(p.id, d)}
                        />
                  ))}
              </div>
          </div>
      );
  };

  return (
    <div className="min-h-screen bg-brand-gray font-sans pb-20 md:pb-0">
      
      {/* Header - Only Show on Home/Search/Print/Category/Support */}
      {(currentView !== 'checkout' && currentView !== 'success') && (
        <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-100 transition-all duration-300">
            {/* Optimized Gap and Padding for Tablet Responsiveness */}
            <div className="container mx-auto max-w-[1600px] px-4 py-3 md:py-4 flex items-center justify-between gap-2 md:gap-4 lg:gap-8">
            
            {/* Logo & Location - Adjusted max-width for tablet */}
            <div className="flex items-center gap-2 md:gap-8 shrink-0 flex-1 md:flex-none overflow-hidden">
                <div className="md:border-r md:pr-8 border-gray-200 cursor-pointer shrink-0" onClick={() => setCurrentView('home')}>
                    <h1 className="text-3xl font-extrabold text-brand-yellow tracking-tighter hidden md:block">blinkit</h1>
                    <h1 className="text-3xl font-extrabold text-brand-yellow tracking-tighter md:hidden">bi</h1>
                </div>
                
                {currentView !== 'support' && (
                    <div className="flex flex-col cursor-pointer max-w-[120px] md:max-w-[200px] lg:max-w-xs group overflow-hidden">
                        <div className="font-bold text-slate-800 text-sm md:text-lg flex items-center truncate">
                            Delivery in 8 minutes
                        </div>
                        <div className="text-xs md:text-sm text-slate-500 truncate flex items-center gap-1 group-hover:text-slate-700">
                            <span className="truncate block max-w-[120px] md:max-w-full">{activeAddress ? `${activeAddress.type} - ${activeAddress.line1}` : 'Select Location'}</span>
                            <ChevronDown size={14} className="shrink-0" />
                        </div>
                    </div>
                )}
                {currentView === 'support' && (
                    <h2 className="text-lg font-bold text-slate-700">Support</h2>
                )}
            </div>

            {/* Desktop Search Bar */}
            {currentView !== 'print' && currentView !== 'support' && (
                <div className="flex-1 max-w-2xl hidden md:block relative">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="text-slate-400 group-focus-within:text-brand-green" size={20} />
                        </div>
                        <input 
                            type="text" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearch}
                            placeholder='Search "milk"'
                            className="w-full pl-10 pr-4 py-3 bg-brand-gray border border-transparent rounded-xl focus:bg-white focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none transition-all text-sm font-medium placeholder:font-normal"
                        />
                    </div>
                </div>
            )}

            {/* Desktop Actions - Optimized Gap for Tablet */}
            <div className="hidden md:flex items-center gap-2 md:gap-3 lg:gap-6 shrink-0">
                <button onClick={() => setCurrentView('support')} className={`font-medium hover:text-brand-green ${currentView === 'support' ? 'text-brand-green' : 'text-slate-700'}`}>Support</button>
                <button onClick={() => setCurrentView('print')} className={`font-medium hover:text-brand-green ${currentView === 'print' ? 'text-brand-green' : 'text-slate-700'}`}>Print Store</button>
                <button onClick={() => setCurrentView('account')} className="text-slate-700 font-medium hover:text-brand-green">Profile</button>
                
                {currentView !== 'support' && (
                    cartTotalItems === 0 ? (
                        <button 
                            onClick={() => setIsCartOpen(true)}
                            className="bg-brand-green text-white px-3 py-2 lg:px-4 lg:py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-brand-darkGreen transition-colors"
                        >
                            <ShoppingCart size={20} />
                            <span className="hidden lg:inline">My Cart</span>
                            <span className="lg:hidden">Cart</span>
                        </button>
                    ) : (
                        <button 
                            onClick={() => setIsCartOpen(true)}
                            className="bg-brand-green text-white px-3 py-2 lg:px-4 lg:py-3 rounded-lg flex items-center gap-2 lg:gap-3 hover:bg-brand-darkGreen transition-colors"
                        >
                            {/* Icon for tablet only */}
                            <div className="hidden md:block lg:hidden">
                                <ShoppingCart size={20} />
                            </div>

                            <div className="flex flex-col items-start lg:items-end leading-none">
                                <span className="text-xs lg:text-sm font-bold whitespace-nowrap">{cartTotalItems} items</span>
                                <span className="text-xs lg:text-sm font-bold">₹{cartTotalPrice}</span>
                            </div>
                            
                            {/* Text for desktop only */}
                            <div className="hidden lg:flex items-center gap-1">
                                <span className="font-bold text-sm whitespace-nowrap">View Cart</span>
                                <ShoppingCart size={18} /> 
                            </div>
                        </button>
                    )
                )}
            </div>

            {/* Mobile Header Actions - Fixed Visibility */}
            <div className="flex md:hidden items-center gap-2 shrink-0">
                 <button 
                    onClick={() => setCurrentView('support')}
                    className="p-2 rounded-full bg-gray-50 hover:bg-gray-100 text-slate-700 border border-transparent active:border-brand-green transition-all"
                    aria-label="Support"
                >
                    <HelpCircle size={22} />
                </button>
                
                 <button 
                    onClick={() => setCurrentView('account')}
                    className="p-2 rounded-full bg-gray-50 hover:bg-gray-100 text-slate-700 border border-transparent active:border-brand-green transition-all"
                    aria-label="Profile"
                >
                    <User size={22} />
                </button>
                
                {cartTotalItems > 0 && currentView !== 'support' && (
                    <button 
                        onClick={() => setIsCartOpen(true)}
                        className="bg-brand-green text-white px-2 py-1.5 rounded-lg flex flex-col items-center justify-center min-w-[50px] shadow-sm active:scale-95 transition-transform"
                    >
                        <span className="text-[10px] uppercase font-bold leading-none opacity-90">Cart</span>
                        <span className="text-xs font-bold leading-none mt-0.5">₹{cartTotalPrice}</span>
                    </button>
                )}
            </div>

            </div>

            {/* Mobile Search Bar - Hide on Print/Support Page */}
            {currentView !== 'print' && currentView !== 'support' && (
                <div className="md:hidden px-4 pb-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-3 text-slate-400" size={18} />
                        <input 
                            type="text" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearch}
                            placeholder='Search "chips"'
                            className="w-full pl-10 pr-4 py-2.5 bg-brand-gray rounded-lg border border-gray-200 outline-none focus:border-brand-green text-sm shadow-sm"
                        />
                    </div>
                </div>
            )}
        </header>
      )}

      {/* Main Content Area */}
      <main className="container mx-auto max-w-[1600px] px-0 md:px-4">
        
        {currentView === 'account' && (
             <ProfileView 
                user={user} 
                onLogout={handleLogout}
                onAddAddress={() => { setAddressToEdit(null); setIsAddressModalOpen(true); }}
                onEditAddress={(addr) => { setAddressToEdit(addr); setIsAddressModalOpen(true); }}
                onUpdateProfile={(u) => setUser(u)}
             />
        )}
        
        {currentView === 'support' && (
            <SupportView onBack={() => setCurrentView('home')} />
        )}

        {currentView === 'checkout' && (
            <CheckoutView 
                items={cartItems}
                addresses={user.addresses}
                onBack={() => setCurrentView('home')}
                onSuccess={handleOrderSuccess}
                onAddAddress={() => { setAddressToEdit(null); setIsAddressModalOpen(true); }}
            />
        )}

        {currentView === 'success' && (
            <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center animate-slide-in">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <Check size={48} className="text-brand-green"/>
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Order Placed Successfully!</h2>
                <p className="text-slate-500 mb-8">Your items will be delivered in 8 minutes by our super-fast partner.</p>
                <div className="bg-white p-4 rounded-xl shadow-sm border max-w-sm w-full">
                    <p className="text-xs text-slate-400 uppercase font-bold mb-2">Order Summary</p>
                    <div className="flex justify-between text-sm font-bold text-slate-800">
                        <span>Total Paid</span>
                        <span>₹{cartTotalPrice + 2}</span>
                    </div>
                </div>
                <button 
                    onClick={() => setCurrentView('home')}
                    className="mt-8 text-brand-green font-bold text-sm hover:underline"
                >
                    Continue Shopping
                </button>
            </div>
        )}

        {currentView === 'category' && renderCategoryPage()}

        {currentView === 'print' && <PrintStore />}

        {currentView === 'search' && (
             <div className="px-4 py-4 animate-slide-in">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-slate-800">
                        {isSearching ? 'Searching...' : 
                         !searchResults || searchResults.length === 0 ? `No results for "${searchQuery}"` :
                         `Results for "${searchQuery}"`}
                    </h2>
                    <button onClick={() => {setSearchResults(null); setSearchQuery(''); setCurrentView('home');}} className="text-sm text-brand-green font-bold">Back to Home</button>
                </div>
                
                {isSearching ? (
                    <div className="flex justify-center py-20">
                         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green"></div>
                    </div>
                ) : !searchResults || searchResults.length === 0 ? (
                    <div className="text-center py-8">
                        <div className="flex justify-center mb-4">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                                <Search size={32} className="text-gray-300"/>
                            </div>
                        </div>
                        <p className="text-slate-500 mb-8 font-medium">Sorry, we couldn't find what you're looking for.</p>
                        
                        <div className="text-left">
                            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <ShoppingBag size={18} className="text-brand-green"/> You may also like
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
                                {/* Suggest random bestsellers */}
                                {PRODUCTS.filter(p => p.bestseller).slice(0, 10).sort(() => 0.5 - Math.random()).slice(0, 6).map(p => (
                                    <ProductCard 
                                        key={p.id} 
                                        product={p} 
                                        quantity={cart[p.id] || 0}
                                        onUpdateQuantity={(d) => updateQuantity(p.id, d)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
                        {(searchResults as Product[]).map(p => (
                            <ProductCard 
                                key={p.id} 
                                product={p} 
                                quantity={cart[p.id] || 0}
                                onUpdateQuantity={(d) => updateQuantity(p.id, d)}
                            />
                        ))}
                    </div>
                )}
            </div>
        )}

        {currentView === 'home' && renderHome()}

      </main>

      {/* Mobile Bottom Navigation - Official Look */}
      {(currentView !== 'checkout' && currentView !== 'success') && (
        <div className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-100 z-50 pb-safe shadow-[0_-2px_10px_rgba(0,0,0,0.03)]">
            <div className="flex justify-around items-center h-16">
                <button 
                    onClick={() => setCurrentView('home')}
                    className={`flex flex-col items-center justify-center w-full h-full relative transition-colors duration-200 ${currentView === 'home' || currentView === 'category' || currentView === 'search' ? 'text-brand-green' : 'text-slate-400'}`}
                >
                    {/* Active Indicator Top Border */}
                    {(currentView === 'home' || currentView === 'category' || currentView === 'search') && (
                        <div className="absolute top-0 w-10 h-0.5 bg-brand-green rounded-b-full shadow-[0_0_8px_rgba(12,131,31,0.6)]"></div>
                    )}
                    <Home size={22} strokeWidth={currentView === 'home' ? 2.5 : 2} />
                    <span className="text-[10px] font-bold mt-1 tracking-tight">Home</span>
                </button>
                
                <button 
                    onClick={() => setCurrentView('print')}
                    className={`flex flex-col items-center justify-center w-full h-full relative transition-colors duration-200 ${currentView === 'print' ? 'text-brand-green' : 'text-slate-400'}`}
                >
                    {currentView === 'print' && (
                        <div className="absolute top-0 w-10 h-0.5 bg-brand-green rounded-b-full shadow-[0_0_8px_rgba(12,131,31,0.6)]"></div>
                    )}
                    <Printer size={22} strokeWidth={currentView === 'print' ? 2.5 : 2} />
                    <span className="text-[10px] font-bold mt-1 tracking-tight">Print</span>
                </button>
                
                <button 
                    onClick={() => setCurrentView('account')}
                    className={`flex flex-col items-center justify-center w-full h-full relative transition-colors duration-200 ${currentView === 'account' ? 'text-brand-green' : 'text-slate-400'}`}
                >
                    {currentView === 'account' && (
                        <div className="absolute top-0 w-10 h-0.5 bg-brand-green rounded-b-full shadow-[0_0_8px_rgba(12,131,31,0.6)]"></div>
                    )}
                    <UserIcon size={22} strokeWidth={currentView === 'account' ? 2.5 : 2} />
                    <span className="text-[10px] font-bold mt-1 tracking-tight">Account</span>
                </button>
            </div>
        </div>
      )}

      {/* Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        updateQuantity={updateQuantity}
        onCheckout={handleCheckout}
      />

      {/* Address Modal */}
      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        onSave={handleSaveAddress}
        initialData={addressToEdit}
      />
      
      {/* Legal Modal */}
      <LegalModal 
        page={activeLegalPage}
        onClose={() => setActiveLegalPage(null)}
      />

    </div>
  );
}