
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedArtwork from '@/components/FeaturedArtwork';
import ArtworkCard from '@/components/ArtworkCard';
import ArtistCard from '@/components/ArtistCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Eye, Award } from 'lucide-react';
import { Artist, Artwork } from '@/types';

// Mock featured artwork data (would be fetched from API)
const featuredArtwork: Artwork = {
  id: '1',
  title: 'Abstract Thought Patterns',
  artist: {
    id: '1',
    username: 'sophia_art',
    email: 'sophia@example.com',
    name: 'Sophia Chen',
    role: 'artist',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1364&auto=format&fit=crop',
    bio: 'Contemporary artist specializing in abstract expressionism and mixed media.',
    followers: 3456,
    specialties: ['Abstract', 'Mixed Media', 'Large Scale'],
    location: 'New York, NY',
    rating: 4.9,
    artworks: [],
    social: {
      instagram: '@sophia_art',
    }
  },
  description: 'This piece explores the interconnected nature of human thought and emotion through vibrant color and organic forms. The layered acrylic paint creates depth and movement, inviting the viewer to discover new details with each viewing.',
  price: 2800,
  currency: 'USD',
  medium: 'Acrylic on Canvas',
  dimensions: {
    width: 48,
    height: 60,
    unit: 'in'
  },
  year: 2023,
  image: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?q=80&w=1472&auto=format&fit=crop',
  category: ['Abstract', 'Contemporary'],
  tags: ['colorful', 'expressive', 'large scale'],
  forSale: true,
  views: 1243,
  likes: 286,
  createdAt: new Date('2023-03-15')
};

// Mock trending artworks data
const trendingArtworks: Artwork[] = [
  {
    id: '2',
    title: 'Urban Reflections',
    artist: {
      id: '2',
      username: 'marcus_creative',
      email: 'marcus@example.com',
      name: 'Marcus Johnson',
      role: 'artist',
      bio: 'Urban photographer capturing city life and architecture.',
      followers: 2178,
      rating: 4.7,
      artworks: [],
    },
    description: 'A photographic study of urban architecture and reflections in modern glass buildings.',
    price: 750,
    currency: 'USD',
    medium: 'Digital Photography',
    year: 2023,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1471&auto=format&fit=crop',
    category: ['Photography', 'Urban'],
    tags: ['cityscape', 'reflections', 'architecture'],
    forSale: true,
    views: 876,
    likes: 195,
    createdAt: new Date('2023-04-02')
  },
  {
    id: '3',
    title: 'Serene Landscapes',
    artist: {
      id: '3',
      username: 'emma_paintings',
      email: 'emma@example.com',
      name: 'Emma Wilson',
      role: 'artist',
      bio: 'Traditional landscape painter inspired by nature.',
      followers: 1902,
      rating: 4.8,
      artworks: [],
    },
    description: 'A peaceful mountain landscape captured in traditional oil painting techniques.',
    price: 1200,
    currency: 'USD',
    medium: 'Oil on Canvas',
    year: 2022,
    image: 'https://images.unsplash.com/photo-1503455637927-730bce8583c0?q=80&w=1470&auto=format&fit=crop',
    category: ['Landscape', 'Traditional'],
    tags: ['mountains', 'nature', 'peaceful'],
    forSale: true,
    views: 654,
    likes: 148,
    createdAt: new Date('2022-11-15')
  },
  {
    id: '4',
    title: 'Digital Dreams',
    artist: {
      id: '4',
      username: 'alex_digital',
      email: 'alex@example.com',
      name: 'Alex Rivera',
      role: 'artist',
      bio: 'Digital artist exploring surreal and futuristic themes.',
      followers: 3289,
      rating: 4.9,
      artworks: [],
    },
    description: 'A surreal digital artwork exploring themes of technology and human consciousness.',
    price: 500,
    currency: 'USD',
    medium: 'Digital Art',
    year: 2023,
    image: 'https://images.unsplash.com/photo-1511306404404-ad607bd7c601?q=80&w=1470&auto=format&fit=crop',
    category: ['Digital', 'Surreal'],
    tags: ['futuristic', 'technology', 'surreal'],
    forSale: true,
    views: 1432,
    likes: 367,
    createdAt: new Date('2023-01-20')
  },
  {
    id: '5',
    title: 'Abstract Composition #7',
    artist: {
      id: '1',
      username: 'sophia_art',
      email: 'sophia@example.com',
      name: 'Sophia Chen',
      role: 'artist',
      bio: 'Contemporary artist specializing in abstract expressionism.',
      followers: 3456,
      rating: 4.9,
      artworks: [],
    },
    description: 'An exploration of form and color through geometric abstraction.',
    price: 1800,
    currency: 'USD',
    medium: 'Acrylic on Canvas',
    year: 2023,
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=1420&auto=format&fit=crop',
    category: ['Abstract', 'Geometric'],
    tags: ['geometric', 'colorful', 'minimalist'],
    forSale: true,
    views: 721,
    likes: 183,
    createdAt: new Date('2023-02-10')
  },
  {
    id: '6',
    title: 'Sculptural Forms',
    artist: {
      id: '5',
      username: 'david_sculpts',
      email: 'david@example.com',
      name: 'David Chen',
      role: 'artist',
      bio: 'Sculptor working with stone and metal.',
      followers: 1245,
      rating: 4.6,
      artworks: [],
    },
    description: 'A modern sculpture exploring organic forms in marble.',
    price: 3500,
    currency: 'USD',
    medium: 'Marble Sculpture',
    year: 2022,
    image: 'https://images.unsplash.com/photo-1544942579-9671c211c6d8?q=80&w=1374&auto=format&fit=crop',
    category: ['Sculpture', 'Contemporary'],
    tags: ['marble', 'organic', '3D'],
    forSale: true,
    views: 432,
    likes: 98,
    createdAt: new Date('2022-09-05')
  }
];

// Mock featured artists data
const featuredArtists: Artist[] = [
  {
    id: '1',
    username: 'sophia_art',
    email: 'sophia@example.com',
    name: 'Sophia Chen',
    role: 'artist',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1364&auto=format&fit=crop',
    bio: 'Contemporary artist specializing in abstract expressionism and mixed media. Based in New York City with a focus on large-scale works that explore human emotion and experience.',
    followers: 3456,
    following: 245,
    specialties: ['Abstract', 'Mixed Media', 'Large Scale'],
    location: 'New York, NY',
    rating: 4.9,
    artworks: [],
    social: {
      instagram: '@sophia_art',
      twitter: '@sophia_creates',
      website: 'sophiachen.art'
    },
    createdAt: new Date('2021-05-12')
  },
  {
    id: '2',
    username: 'marcus_creative',
    email: 'marcus@example.com',
    name: 'Marcus Johnson',
    role: 'artist',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374&auto=format&fit=crop',
    bio: 'Urban photographer documenting city life and architecture. My work focuses on finding beauty in everyday urban landscapes and the interaction between people and their environments.',
    followers: 2178,
    following: 310,
    specialties: ['Photography', 'Urban', 'Black & White'],
    location: 'Chicago, IL',
    rating: 4.7,
    artworks: [],
    social: {
      instagram: '@marcus_lens',
    },
    createdAt: new Date('2020-11-23')
  },
  {
    id: '3',
    username: 'emma_paintings',
    email: 'emma@example.com',
    name: 'Emma Wilson',
    role: 'artist',
    profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1376&auto=format&fit=crop',
    bio: 'Traditional landscape painter inspired by the natural world. My paintings capture the beauty and serenity of natural landscapes using classical oil painting techniques.',
    followers: 1902,
    following: 178,
    specialties: ['Landscape', 'Oil Painting', 'Traditional'],
    location: 'Portland, OR',
    rating: 4.8,
    artworks: [],
    social: {
      website: 'emmawilsonart.com'
    },
    createdAt: new Date('2019-08-05')
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-art-light dark:bg-art-primary">
      <Navbar />
      
      {/* Hero Section */}
      <Hero className="pt-16" />
      
      {/* Featured Artwork Section */}
      <FeaturedArtwork artwork={featuredArtwork} />
      
      {/* Trending Artworks Section */}
      <section className="py-16 md:py-20">
        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-art-accent" />
              <h2 className="text-2xl md:text-3xl font-serif font-medium">Trending Artworks</h2>
            </div>
            <Link to="/explore">
              <Button variant="outline" className="group">
                View All 
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingArtworks.map((artwork, index) => (
              <motion.div
                key={artwork.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ArtworkCard 
                  artwork={artwork} 
                  featured={index === 0}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Artists Section */}
      <section className="py-16 md:py-20 bg-white/50 dark:bg-art-secondary/20">
        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Award className="h-6 w-6 text-art-accent" />
              <h2 className="text-2xl md:text-3xl font-serif font-medium">Featured Artists</h2>
            </div>
            <Link to="/artists">
              <Button variant="outline" className="group">
                View All 
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArtists.map((artist, index) => (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ArtistCard 
                  artist={artist} 
                  featured={index === 0}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Explore by Category Section */}
      <section className="py-16 md:py-20">
        <div className="container px-4 mx-auto">
          <h2 className="text-2xl md:text-3xl font-serif font-medium mb-8 text-center">
            Explore by Category
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {['Painting', 'Photography', 'Sculpture', 'Digital Art', 'Drawing', 'Mixed Media'].map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="relative group overflow-hidden rounded-xl aspect-square"
              >
                <Link to={`/explore?category=${category.toLowerCase().replace(' ', '-')}`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                  <img 
                    src={`https://picsum.photos/400/400?random=${index}`} 
                    alt={category} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                    <h3 className="text-white font-medium text-lg">{category}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="py-20 md:py-24 bg-art-accent text-white">
        <div className="container px-4 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-medium mb-4">
              Join Our Creative Community
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
              Connect with artists, discover new artwork, and build your collection on ArtConnect.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/auth?type=signup&role=artist">
                <Button size="lg" className="bg-white text-art-accent hover:bg-white/90">
                  Join as Artist
                </Button>
              </Link>
              <Link to="/auth?type=signup&role=client">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                  Join as Art Lover
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-white dark:bg-art-secondary py-12 md:py-16">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link to="/" className="flex items-center gap-2 mb-4">
                <span className="bg-art-accent h-8 w-8 rounded-full flex items-center justify-center text-white font-serif text-lg">A</span>
                <span className="font-serif text-xl font-medium">ArtConnect</span>
              </Link>
              <p className="text-art-gray mb-4">
                Connecting artists and art enthusiasts in a vibrant online community.
              </p>
              <div className="flex space-x-4">
                {['twitter', 'instagram', 'facebook'].map((social) => (
                  <a 
                    key={social}
                    href="#" 
                    className="h-10 w-10 rounded-full bg-art-gray-light dark:bg-art-primary flex items-center justify-center text-art-primary dark:text-white hover:bg-art-accent hover:text-white transition-colors"
                  >
                    <span className="sr-only">{social}</span>
                    <i className={`fab fa-${social}`}></i>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-4">Explore</h3>
              <ul className="space-y-2">
                {['Artworks', 'Artists', 'Collections', 'Categories', 'Featured'].map((item) => (
                  <li key={item}>
                    <Link to="#" className="text-art-gray hover:text-art-accent transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-4">Information</h3>
              <ul className="space-y-2">
                {['About Us', 'How It Works', 'Artist Resources', 'Buyer Guide', 'Blog'].map((item) => (
                  <li key={item}>
                    <Link to="#" className="text-art-gray hover:text-art-accent transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-4">Subscribe</h3>
              <p className="text-art-gray mb-4">
                Stay updated with new artworks and artist features.
              </p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-1 px-4 py-2 bg-white dark:bg-art-primary border border-art-gray-light dark:border-art-primary rounded-l-lg focus:outline-none"
                />
                <Button className="rounded-l-none bg-art-accent hover:bg-art-accent-dark">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-art-gray-light dark:border-art-primary/50 text-center text-art-gray">
            <p>&copy; {new Date().getFullYear()} ArtConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
