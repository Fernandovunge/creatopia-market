
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import ArtworkCard from '@/components/ArtworkCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Heart, 
  MessageSquare, 
  Share2, 
  ShoppingCart, 
  Eye, 
  Calendar, 
  Tag,
  Info,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  X
} from 'lucide-react';
import { Artwork } from '@/types';

// Mock artwork data (would come from an API in a real app)
const artworkData: Artwork = {
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
    rating: 4.9,
    artworks: [],
    specialties: ['Abstract', 'Mixed Media', 'Large Scale'],
    location: 'New York, NY',
    createdAt: new Date('2021-05-12')
  },
  description: 'This piece explores the interconnected nature of human thought and emotion through vibrant color and organic forms. The layered acrylic paint creates depth and movement, inviting the viewer to discover new details with each viewing. The composition balances chaos and order, reflecting the complex nature of human consciousness.\n\nInspired by both natural structures like neural networks and emotional states, this work aims to create a visual representation of how our thoughts form patterns and influence our perception of the world around us.',
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
  tags: ['colorful', 'expressive', 'large scale', 'textured', 'vibrant', 'organic', 'emotional'],
  forSale: true,
  views: 1243,
  likes: 286,
  createdAt: new Date('2023-03-15')
};

// Mock similar artworks (in a real app, these would be fetched based on artwork tags/category)
const similarArtworks = [
  {
    id: '5',
    title: 'Abstract Composition #7',
    artist: {
      id: '1',
      username: 'sophia_art',
      email: 'sophia@example.com',
      name: 'Sophia Chen',
      role: 'artist' as const,
      profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1364&auto=format&fit=crop',
      bio: 'Contemporary artist specializing in abstract expressionism.',
      followers: 3456,
      rating: 4.9,
      artworks: [],
      createdAt: new Date('2021-05-12')
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
    id: '3',
    title: 'Serene Landscapes',
    artist: {
      id: '3',
      username: 'emma_paintings',
      email: 'emma@example.com',
      name: 'Emma Wilson',
      role: 'artist' as const,
      bio: 'Traditional landscape painter inspired by nature.',
      followers: 1902,
      rating: 4.8,
      artworks: [],
      createdAt: new Date('2019-08-05')
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
    id: '7',
    title: 'Convergence of Light',
    artist: {
      id: '1',
      username: 'sophia_art',
      email: 'sophia@example.com',
      name: 'Sophia Chen',
      role: 'artist' as const,
      bio: 'Contemporary artist specializing in abstract expressionism.',
      followers: 3456,
      rating: 4.9,
      artworks: [],
      createdAt: new Date('2021-05-12')
    },
    description: 'A study of light and shadow in abstract forms.',
    price: 2200,
    currency: 'USD',
    medium: 'Mixed Media on Canvas',
    year: 2022,
    image: 'https://images.unsplash.com/photo-1531913764164-f85c52e6e654?q=80&w=1374&auto=format&fit=crop',
    category: ['Abstract', 'Light Study'],
    tags: ['light', 'shadow', 'movement'],
    forSale: true,
    views: 532,
    likes: 147,
    createdAt: new Date('2022-11-08')
  }
];

const ArtworkDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [imageZoomed, setImageZoomed] = useState(false);
  
  // In a real app, this would fetch artwork data based on the ID
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setArtwork(artworkData);
      setLoading(false);
    }, 500);
  }, [id]);
  
  const handleLike = () => {
    setLiked(!liked);
    if (artwork) {
      // In a real app, this would call an API to update likes
      const newLikes = liked ? artwork.likes - 1 : artwork.likes + 1;
      setArtwork({ ...artwork, likes: newLikes });
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-art-light dark:bg-art-primary">
        <Navbar />
        <div className="container mx-auto px-4 pt-28 pb-12">
          <div className="flex items-center justify-center h-[calc(100vh-200px)]">
            <div className="animate-pulse">
              <div className="h-10 w-48 bg-art-gray-light dark:bg-art-secondary rounded-md mb-4"></div>
              <div className="h-6 w-72 bg-art-gray-light dark:bg-art-secondary rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!artwork) {
    return (
      <div className="min-h-screen bg-art-light dark:bg-art-primary">
        <Navbar />
        <div className="container mx-auto px-4 pt-28 pb-12">
          <div className="text-center">
            <h1 className="text-2xl font-medium mb-4">Artwork not found</h1>
            <p className="text-art-gray mb-6">The artwork you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/explore">Browse Artworks</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-art-light dark:bg-art-primary">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-28 pb-12">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="ghost" size="sm" className="group" onClick={() => window.history.back()}>
            <ChevronLeft className="mr-1 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back
          </Button>
        </div>
        
        {/* Artwork Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Artwork Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className={`relative overflow-hidden rounded-xl ${
              imageZoomed ? "fixed inset-0 z-50 flex items-center justify-center bg-black/80" : ""
            }`}>
              <img 
                src={artwork.image} 
                alt={artwork.title} 
                className={`w-full h-auto object-contain ${
                  imageZoomed ? "max-h-screen cursor-zoom-out" : "cursor-zoom-in"
                }`}
                onClick={() => setImageZoomed(!imageZoomed)}
              />
              
              {!imageZoomed && (
                <button 
                  className="absolute bottom-4 right-4 bg-white/80 dark:bg-art-primary/50 backdrop-blur-sm p-2 rounded-full hover:bg-white dark:hover:bg-art-primary/70 transition-colors"
                  onClick={() => setImageZoomed(true)}
                >
                  <ZoomIn className="h-5 w-5 text-art-primary dark:text-white" />
                </button>
              )}
              
              {imageZoomed && (
                <button 
                  className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/40 transition-colors"
                  onClick={() => setImageZoomed(false)}
                >
                  <X className="h-5 w-5 text-white" />
                </button>
              )}
            </div>
            
            {/* Stats */}
            <div className="absolute bottom-4 left-4 flex space-x-4">
              <div className="flex items-center space-x-1.5 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5">
                <Eye className="h-4 w-4 text-white" />
                <span className="text-xs font-medium text-white">{artwork.views}</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5">
                <Heart className="h-4 w-4 text-white" />
                <span className="text-xs font-medium text-white">{artwork.likes}</span>
              </div>
            </div>
          </motion.div>
          
          {/* Artwork Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white dark:bg-art-secondary rounded-xl p-6 md:p-8 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-art-accent font-medium text-sm mb-2 block">
                    {artwork.medium}
                  </span>
                  <h1 className="text-3xl font-serif font-medium">{artwork.title}</h1>
                  <div className="text-art-gray mt-1">
                    {artwork.year}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    className={liked ? "bg-art-accent/10 text-art-accent border-art-accent" : ""}
                    onClick={handleLike}
                  >
                    <Heart className={`h-5 w-5 ${liked ? "fill-art-accent" : ""}`} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              {/* Artist info */}
              <Link to={`/artist/${artwork.artist.id}`} className="flex items-center mb-6 group">
                <img 
                  src={artwork.artist.profileImage || "https://via.placeholder.com/60"} 
                  alt={artwork.artist.name} 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-3">
                  <div className="font-medium group-hover:text-art-accent transition-colors">
                    {artwork.artist.name}
                  </div>
                  <div className="text-sm text-art-gray">
                    {artwork.artist.location || "Artist"}
                  </div>
                </div>
              </Link>
              
              {/* Tabs */}
              <Tabs defaultValue="details" className="mb-6">
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
                  <TabsTrigger value="shipping" className="flex-1">Shipping</TabsTrigger>
                  <TabsTrigger value="payments" className="flex-1">Payments</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-4">
                  <p className="text-art-primary/80 dark:text-white/80 whitespace-pre-line">
                    {artwork.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mt-6 border-t border-art-gray-light dark:border-art-primary pt-4">
                    <div>
                      <div className="text-sm text-art-gray mb-1">Medium</div>
                      <div className="font-medium">{artwork.medium}</div>
                    </div>
                    <div>
                      <div className="text-sm text-art-gray mb-1">Year</div>
                      <div className="font-medium">{artwork.year}</div>
                    </div>
                    
                    {artwork.dimensions && (
                      <div>
                        <div className="text-sm text-art-gray mb-1">Dimensions</div>
                        <div className="font-medium">
                          {artwork.dimensions.width} × {artwork.dimensions.height} {artwork.dimensions.unit}
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <div className="text-sm text-art-gray mb-1">Style</div>
                      <div className="font-medium">
                        {artwork.category.join(', ')}
                      </div>
                    </div>
                  </div>
                  
                  {/* Tags */}
                  {artwork.tags && artwork.tags.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-art-gray-light dark:border-art-primary">
                      <div className="flex items-center gap-2 text-art-gray mb-2">
                        <Tag className="h-4 w-4" />
                        <span>Tags</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {artwork.tags.map((tag, index) => (
                          <Link 
                            key={index}
                            to={`/explore?tag=${tag}`}
                            className="px-3 py-1.5 bg-art-gray-light dark:bg-art-primary text-sm rounded-full hover:bg-art-gray/50 dark:hover:bg-art-primary/70 transition-colors"
                          >
                            {tag}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="shipping" className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-art-accent mt-0.5" />
                    <div>
                      <h4 className="font-medium mb-1">Professional Packaging & Shipping</h4>
                      <p className="text-art-primary/80 dark:text-white/80">
                        This artwork is professionally packaged to ensure safe delivery. We use museum-quality materials and secure shipping methods.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-3">
                    <div className="flex justify-between items-center py-3 border-b border-art-gray-light dark:border-art-primary">
                      <div>Standard Shipping (7-10 days)</div>
                      <div className="font-medium">$25</div>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-art-gray-light dark:border-art-primary">
                      <div>Express Shipping (3-5 days)</div>
                      <div className="font-medium">$45</div>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <div>International Shipping (10-14 days)</div>
                      <div className="font-medium">$75</div>
                    </div>
                  </div>
                  
                  <div className="bg-art-accent/10 rounded-lg p-4 mt-4">
                    <p className="text-art-accent font-medium">Free shipping on purchases over $2,000</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="payments" className="space-y-4">
                  <p className="text-art-primary/80 dark:text-white/80">
                    We accept various payment methods to make your art purchase convenient and secure.
                  </p>
                  
                  <div className="space-y-3 mt-4">
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 bg-blue-500 rounded-md"></div>
                      <div>
                        <h4 className="font-medium">Credit & Debit Cards</h4>
                        <p className="text-art-gray text-sm">Visa, Mastercard, American Express</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 bg-yellow-500 rounded-md"></div>
                      <div>
                        <h4 className="font-medium">Buy Now, Pay Later</h4>
                        <p className="text-art-gray text-sm">Interest-free installments with Affirm, Klarna, or Afterpay</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 bg-green-500 rounded-md"></div>
                      <div>
                        <h4 className="font-medium">Direct Bank Transfer</h4>
                        <p className="text-art-gray text-sm">For purchases over $5,000</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-art-gray-light dark:bg-art-primary rounded-lg p-4 mt-4">
                    <p className="font-medium">All transactions are secure and encrypted</p>
                  </div>
                </TabsContent>
              </Tabs>
              
              {/* Price & Actions */}
              {artwork.forSale && artwork.price ? (
                <div className="mt-6 border-t border-art-gray-light dark:border-art-primary pt-6">
                  <div className="flex flex-wrap items-baseline gap-2 mb-4">
                    <span className="text-3xl font-serif font-medium text-art-primary dark:text-white">
                      ${artwork.price}
                    </span>
                    <span className="text-art-gray">
                      {artwork.price > 1000 ? 'Free shipping included' : 'Plus shipping'}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <Button size="lg" className="flex-1 sm:flex-none bg-art-accent hover:bg-art-accent-dark">
                      <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                    </Button>
                    <Button size="lg" variant="outline" className="flex-1 sm:flex-none">
                      <Heart className={`mr-2 h-4 w-4 ${liked ? "fill-art-accent text-art-accent" : ""}`} />
                      {liked ? 'Saved to Favorites' : 'Add to Favorites'}
                    </Button>
                    <Link to={`/contact/${artwork.artist.id}?artwork=${artwork.id}`} className="w-full sm:w-auto mt-3 sm:mt-0">
                      <Button size="lg" variant="outline" className="w-full">
                        <MessageSquare className="mr-2 h-4 w-4" /> Contact Artist
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="mt-6 border-t border-art-gray-light dark:border-art-primary pt-6">
                  <div className="text-xl font-medium mb-4">
                    Not for sale • Exhibition Only
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className={liked ? "bg-art-accent/10 text-art-accent border-art-accent" : ""}
                      onClick={handleLike}
                    >
                      <Heart className={`mr-2 h-4 w-4 ${liked ? "fill-art-accent" : ""}`} />
                      {liked ? 'Saved to Favorites' : 'Add to Favorites'}
                    </Button>
                    <Link to={`/contact/${artwork.artist.id}?artwork=${artwork.id}`} className="flex-1 sm:flex-none">
                      <Button size="lg" variant="outline" className="w-full">
                        <MessageSquare className="mr-2 h-4 w-4" /> Contact Artist
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
        
        {/* Similar Artworks */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-serif font-medium">Similar Artworks</h2>
            <Link to="/explore" className="text-art-accent hover:underline">
              View More
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarArtworks.map((artwork, index) => (
              <motion.div
                key={artwork.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <ArtworkCard artwork={artwork} />
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ArtworkDetail;
