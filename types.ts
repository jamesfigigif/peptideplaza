export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface Peptide {
  id: string;
  name: string;
  fullName: string;
  price: number;
  size: string;
  description: string;
  category: 'Recovery' | 'Metabolic' | 'Anti-Aging' | 'Nootropic' | 'Peptide Blends';
  purity: string;
  sequence?: string;
  casNumber?: string;
  molarMass?: string;
  inStock: boolean;
  bestseller?: boolean;
  reviews: Review[];
  image?: string;
}

export interface CartItem extends Peptide {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum ImageSize {
  SIZE_1K = '1K',
  SIZE_2K = '2K',
  SIZE_4K = '4K'
}

export type LoadingState = 'idle' | 'generating' | 'loading' | 'error';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  publishDate: string;
  readTime: string;
  image?: string;
  peptide?: string;
  location?: string;
}
