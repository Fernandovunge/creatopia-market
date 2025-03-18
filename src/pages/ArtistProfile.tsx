
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
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  Image,
  Grid,
  List,
  Instagram,
  Twitter,
  Globe,
  ChevronLeft
} from 'lucide-react';
import { Artist, Artwork } from '@/types';

// Mock artist data (would come from an API)
const artistData: Artist = {
  id: '1',
  username: 'sophia_art',
  email: 'sophia@example.com',
  name: 'Sophia Chen',
  role: 'artist',
  profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1364&auto=format&fit=crop',
  bio: 'Contemporary artist specializing in abstract expressionism and mixed media. Based in New York City with a focus on large-scale works that explore human emotion and experience. My work has been exhibited in galleries across the United States and Europe, and is held in several private collections.',
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
};

// Mock artworks data
const artworksData: Artwork[] = [
  {
    id: '1',
    title: 'Abstract Thought Patterns',
    artist: artistData,
    description: 'This piece explores the interconnected nature of human thought and emotion through vibrant color and organic forms.',
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
  },
  {
    id: '5',
    title: 'Abstract Composition #7',
    artist: artistData,
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
    id: '7',
    title: 'Convergence of Light',
    artist: artistData,
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
  },
  {
    id: '8',
    title: 'Urban Fragments',
    artist: artistData,
    description: 'A mixed media piece inspired by urban landscapes and city life.',
    price: 1950,
    currency: 'USD',
    medium: 'Mixed Media',
    year: 2022,
    image: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=1470&auto=format&fit=crop',
    category: ['Urban', 'Mixed Media'],
    tags: ['city', 'texture', 'collage'],
    forSale: true,
    views: 421,
    likes: 119,
    createdAt: new Date('2022-08-22')
  },
  {
    id: '9',
    title: 'Flowing Emotions',
    artist: artistData,
    description: 'An abstract representation of emotional states through fluid forms and vibrant colors.',
    price: 3100,
    currency: 'USD',
    medium: 'Oil on Canvas',
    year: 2023,
    image: 'https://images.unsplash.com/photo-1549887534-1541e9326642?q=80&w=1365&auto=format&fit=crop',
    category: ['Abstract', 'Emotional'],
    tags: ['fluid', 'emotional', 'colorful'],
    forSale: true,
    views: 687,
    likes: 201,
    createdAt: new Date('2023-01-17')
  },
  {
    id: '10',
    title: 'Structural Elements',
    artist: artistData,
    description: 'A geometric study of architectural forms and structures.',
    price: 1700,
    currency: 'USD',
    medium: 'Acrylic on Canvas',
    year: 2022,
    image: 'https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?q=80&w=1374&auto=format&fit=crop',
    category: ['Geometric', 'Architectural'],
    tags: ['structure', 'lines', 'minimalist'],
    forSale: true,
    views: 389,
    likes: 92,
    createdAt: new Date('2022-06-30')
  }
];

const ArtistProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // In a real app, this would fetch artist data based on the ID
  useEffect(() => {
    // Simulate API fetch delay
    setTimeout(() => {
      setArtist(artistData);
      setArtworks(artworksData);
      setLoading(false);
    }, 500);
  }, [id]);
  
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
  
  if (!artist) {
    return (
      <div className="min-h-screen bg-art-light dark:bg-art-primary">
        <Navbar />
        <div className="container mx-auto px-4 pt-28 pb-12">
          <div className="text-center">
            <h1 className="text-2xl font-medium mb-4">Artist not found</h1>
            <p className="text-art-gray mb-6">The artist you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/artists">Browse Artists</Link>
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
        
        {/* Artist Header */}
        <div className="bg-white dark:bg-art-secondary rounded-xl overflow-hidden shadow-sm mb-8">
          {/* Cover Photo */}
          <div className="h-48 md:h-64 bg-gradient-to-r from-art-accent/80 to-art-accent-light/80 relative">
            {/* Profile Photo */}
            <div className="absolute -bottom-16 left-8">
              <div className="h-32 w-32 rounded-full border-4 border-white dark:border-art-secondary bg-white dark:bg-art-secondary overflow-hidden">
                <img 
                  src={artist.profileImage || "https://via.placeholder.com/128"} 
                  alt={artist.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          {/* Artist Info */}
          <div className="pt-20 pb-6 px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-serif font-medium">{artist.name}</h1>
                <div className="flex items-center gap-4 text-art-gray mt-1">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{artist.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Member since {new Date(artist.createdAt).getFullYear()}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4 md:mt-0">
                <Button className="bg-art-accent hover:bg-art-accent-dark">
                  <Users className="mr-2 h-4 w-4" /> Follow
                </Button>
                <Button variant="outline">
                  <MessageSquare className="mr-2 h-4 w-4" /> Message
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Stats */}
            <div className="flex flex-wrap gap-6 mb-6">
              <div className="text-center">
                <div className="text-xl font-medium">{artworks.length}</div>
                <div className="text-art-gray text-sm">Artworks</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-medium">{artist.followers?.toLocaleString()}</div>
                <div className="text-art-gray text-sm">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-medium">{artist.following?.toLocaleString()}</div>
                <div className="text-art-gray text-sm">Following</div>
              </div>
              <div className="flex items-center">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`h-4 w-4 ${star <= Math.round(artist.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-art-gray-light'}`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm font-medium">{artist.rating.toFixed(1)}</span>
              </div>
            </div>
            
            {/* Bio */}
            <p className="text-art-primary/80 dark:text-white/80 mb-6">
              {artist.bio}
            </p>
            
            {/* Specialties */}
            {artist.specialties && artist.specialties.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm text-art-gray mb-2">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {artist.specialties.map((specialty, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-art-gray-light dark:bg-art-primary text-art-primary dark:text-white rounded-full text-sm"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Social Links */}
            {artist.social && (
              <div className="flex gap-3">
                {artist.social.instagram && (
                  <a 
                    href={`https://instagram.com/${artist.social.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-art-gray hover:text-art-accent transition-colors"
                  >
                    <Instagram className="h-4 w-4" />
                    <span>{artist.social.instagram}</span>
                  </a>
                )}
                {artist.social.twitter && (
                  <a 
                    href={`https://twitter.com/${artist.social.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-art-gray hover:text-art-accent transition-colors"
                  >
                    <Twitter className="h-4 w-4" />
                    <span>{artist.social.twitter}</span>
                  </a>
                )}
                {artist.social.website && (
                  <a 
                    href={`https://${artist.social.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-art-gray hover:text-art-accent transition-colors"
                  >
                    <Globe className="h-4 w-4" />
                    <span>{artist.social.website}</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Tabs and Content */}
        <Tabs defaultValue="artworks" className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="artworks" className="flex gap-2">
                <Image className="h-4 w-4" />
                Artworks
              </TabsTrigger>
              <TabsTrigger value="about" className="flex gap-2">
                About
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex gap-2">
                Reviews
              </TabsTrigger>
            </TabsList>
            
            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 ml-auto bg-white dark:bg-art-secondary rounded-lg p-1">
              <Button
                variant="ghost"
                size="sm"
                className={viewMode === 'grid' ? 'bg-art-gray-light dark:bg-art-primary' : ''}
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={viewMode === 'list' ? 'bg-art-gray-light dark:bg-art-primary' : ''}
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <TabsContent value="artworks">
            {artworks.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-art-secondary rounded-xl">
                <Image className="h-12 w-12 mx-auto text-art-gray opacity-50 mb-4" />
                <h3 className="text-xl font-medium mb-2">No artworks yet</h3>
                <p className="text-art-gray mb-6">This artist hasn't uploaded any artworks yet.</p>
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
                : "space-y-4"
              }>
                {artworks.map((artwork, index) => (
                  <motion.div
                    key={artwork.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    {viewMode === 'grid' ? (
                      <ArtworkCard artwork={artwork} />
                    ) : (
                      <div className="flex bg-white dark:bg-art-secondary rounded-xl overflow-hidden shadow-sm h-40">
                        <div className="w-40 h-full">
                          <img 
                            src={artwork.image} 
                            alt={artwork.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-4 flex flex-col">
                          <Link to={`/artwork/${artwork.id}`} className="hover:text-art-accent transition-colors">
                            <h3 className="font-medium text-lg mb-1">{artwork.title}</h3>
                          </Link>
                          <div className="text-sm text-art-gray mb-2">
                            {artwork.medium} · {artwork.year}
                          </div>
                          <p className="text-art-primary/80 dark:text-white/80 text-sm line-clamp-2 mb-auto">
                            {artwork.description}
                          </p>
                          <div className="flex items-center justify-between mt-3">
                            {artwork.forSale && artwork.price ? (
                              <div className="font-medium">${artwork.price}</div>
                            ) : (
                              <div className="text-art-gray text-sm">Not for sale</div>
                            )}
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1 text-art-gray text-sm">
                                <Eye className="h-4 w-4" />
                                <span>{artwork.views}</span>
                              </div>
                              <div className="flex items-center gap-1 text-art-gray text-sm">
                                <Heart className="h-4 w-4" />
                                <span>{artwork.likes}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="about">
            <div className="bg-white dark:bg-art-secondary rounded-xl p-6">
              <h3 className="text-xl font-medium mb-4">About {artist.name}</h3>
              <div className="space-y-6">
                <p className="text-art-primary/80 dark:text-white/80">
                  {artist.bio}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Experience</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="font-medium">Solo Exhibition - "Abstract Expressions"</div>
                        <div className="text-art-gray">New York Modern Gallery • 2023</div>
                      </div>
                      <div>
                        <div className="font-medium">Group Show - "New Perspectives"</div>
                        <div className="text-art-gray">Artspace Gallery, Chicago • 2022</div>
                      </div>
                      <div>
                        <div className="font-medium">Artist Residency</div>
                        <div className="text-art-gray">Berlin Creative Institute • 2021</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Education</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="font-medium">MFA Fine Arts</div>
                        <div className="text-art-gray">Pratt Institute • 2018-2020</div>
                      </div>
                      <div>
                        <div className="font-medium">BFA Painting</div>
                        <div className="text-art-gray">Rhode Island School of Design • 2014-2018</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews">
            <div className="bg-white dark:bg-art-secondary rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className="h-5 w-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="font-medium text-lg">{artist.rating.toFixed(1)} out of 5</span>
                  <span className="text-art-gray">Based on 24 reviews</span>
                </div>
                <Button>Write a Review</Button>
              </div>
              
              <div className="space-y-6">
                {[1, 2, 3].map((review) => (
                  <div key={review} className="border-b border-art-gray-light dark:border-art-primary pb-6 last:border-0">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <img 
                          src={`https://i.pravatar.cc/40?img=${review + 10}`} 
                          alt="Reviewer" 
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <div className="font-medium">John Doe</div>
                          <div className="text-art-gray text-sm">June 2023</div>
                        </div>
                      </div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            className={`h-4 w-4 ${star <= 5 ? 'fill-yellow-400 text-yellow-400' : 'text-art-gray-light'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-art-primary/80 dark:text-white/80">
                      Amazing artist with incredible talent! The piece I commissioned exceeded my expectations in every way. Sophia was a pleasure to work with, responsive, and delivered on time.
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <Button variant="outline">Load More Reviews</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ArtistProfile;
