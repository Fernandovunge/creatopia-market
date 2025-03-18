
export type UserRole = 'admin' | 'artist' | 'client';

export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  role: UserRole;
  profileImage?: string;
  bio?: string;
  followers?: number;
  following?: number;
  createdAt: Date;
}

export interface Artist extends User {
  role: 'artist';
  artworks: Artwork[];
  specialties?: string[];
  location?: string;
  rating: number;
  social?: {
    instagram?: string;
    twitter?: string;
    website?: string;
  };
}

export interface Client extends User {
  role: 'client';
  favorites: Artwork[];
  purchases: Artwork[];
  followingArtists: Artist[];
}

export interface Admin extends User {
  role: 'admin';
  permissions: string[];
}

export interface Artwork {
  id: string;
  title: string;
  artist: Artist;
  description: string;
  price?: number;
  currency?: string;
  medium: string;
  dimensions?: {
    width: number;
    height: number;
    unit: string;
  };
  year: number;
  image: string;
  category: string[];
  tags: string[];
  forSale: boolean;
  views: number;
  likes: number;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string;
  description?: string;
}

export interface SearchFilters {
  query?: string;
  categories?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  forSale?: boolean;
  sortBy?: 'price' | 'date' | 'popularity' | 'rating';
  sortOrder?: 'asc' | 'desc';
}
