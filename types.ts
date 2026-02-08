export interface Product {
  id: string;
  name: string;
  weight: string;
  price: number;
  discountPrice?: number;
  image: string;
  category: string;
  time: string; // e.g. "8 mins"
  bestseller?: boolean;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface SearchResult {
  query: string;
  products: Product[];
  aiSuggestion?: string;
}

export interface Address {
  id: string;
  type: 'Home' | 'Work' | 'Other';
  flat: string;
  line1: string;
  line2: string;
  isDefault?: boolean;
}

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  addresses: Address[];
}

export type ViewState = 'home' | 'search' | 'account' | 'checkout' | 'success' | 'category' | 'print' | 'support';

export type PaymentMethod = 'upi' | 'card' | 'cod' | 'netbanking';

// Print Store Types
export interface PrintConfig {
  copies: number;
  colorMode: 'bw' | 'color';
  sides: 'single' | 'double';
  paperType: 'standard' | 'glossy' | 'bond' | 'cardstock';
  binding: 'none' | 'staple' | 'spiral' | 'softcover';
}

// Support & Legal Types
export interface ChatMessage {
  id: string;
  type: 'bot' | 'user';
  text?: string;
  options?: { label: string; action: string; payload?: any }[];
  isRating?: boolean;
}

export type LegalPageType = 'privacy' | 'terms' | 'disclosure' | 'mobikwik' | 'dmca' | null;
