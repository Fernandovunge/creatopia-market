
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import SearchFilters from '@/components/SearchFilters';
import ArtworkCard from '@/components/ArtworkCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Grid, List, Loader, Filter as FilterIcon } from 'lucide-react';
import { Artwork, SearchFilters as SearchFiltersType } from '@/types';

// Mock artwork data (would come from an API in a real app)
const artworksData: Artwork[] = [
  {
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
    },
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
  },
  {
    id: '7',
    title: 'Convergence of Light',
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
  }
];

const Explore = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'artworks' | 'artists'>('artworks');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<SearchFiltersType>({
    query: '',
    categories: [],
    priceRange: { min: 0, max: 10000 },
    forSale: true,
    sortBy: 'popularity',
    sortOrder: 'desc',
  });
  const [filteredArtworks, setFilteredArtworks] = useState<Artwork[]>(artworksData);
  const [loading, setLoading] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(true);
  
  // Parse URL params on load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const initialFilters: SearchFiltersType = { ...filters };
    
    if (params.has('query')) {
      initialFilters.query = params.get('query') || '';
    }
    
    if (params.has('category')) {
      initialFilters.categories = [params.get('category') || ''];
    }
    
    if (params.has('tag')) {
      initialFilters.query = params.get('tag') || '';
    }
    
    setFilters(initialFilters);
    applyFilters(initialFilters);
  }, [location.search]);
  
  const applyFilters = (currentFilters: SearchFiltersType) => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      let results = [...artworksData];
      
      // Apply query filter (search in title, description, artist name, tags)
      if (currentFilters.query) {
        const query = currentFilters.query.toLowerCase();
        results = results.filter(artwork => 
          artwork.title.toLowerCase().includes(query) ||
          artwork.description.toLowerCase().includes(query) ||
          artwork.artist.name.toLowerCase().includes(query) ||
          artwork.tags.some(tag => tag.toLowerCase().includes(query))
        );
      }
      
      // Apply category filter
      if (currentFilters.categories && currentFilters.categories.length > 0) {
        results = results.filter(artwork => 
          artwork.category.some(cat => 
            currentFilters.categories?.includes(cat.toLowerCase())
          )
        );
      }
      
      // Apply price range filter
      if (currentFilters.priceRange) {
        results = results.filter(artwork => 
          artwork.price !== undefined && 
          artwork.price >= currentFilters.priceRange!.min &&
          artwork.price <= currentFilters.priceRange!.max
        );
      }
      
      // Apply forSale filter
      if (currentFilters.forSale !== undefined) {
        results = results.filter(artwork => artwork.forSale === currentFilters.forSale);
      }
      
      // Apply sorting
      if (currentFilters.sortBy) {
        results.sort((a, b) => {
          let comparison = 0;
          
          switch (currentFilters.sortBy) {
            case 'price':
              comparison = (a.price || 0) - (b.price || 0);
              break;
            case 'date':
              comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
              break;
            case 'popularity':
              comparison = a.views - b.views;
              break;
            case 'rating':
              comparison = a.artist.rating - b.artist.rating;
              break;
          }
          
          // Apply sort order
          return currentFilters.sortOrder === 'asc' ? comparison : -comparison;
        });
      }
      
      setFilteredArtworks(results);
      setLoading(false);
      
      // Update URL with current filters
      const params = new URLSearchParams();
      if (currentFilters.query) params.set('query', currentFilters.query);
      if (currentFilters.categories?.length) params.set('categories', currentFilters.categories.join(','));
      
      navigate({
        pathname: location.pathname,
        search: params.toString()
      }, { replace: true });
      
    }, 500);
  };
  
  const handleFilterChange = (newFilters: SearchFiltersType) => {
    setFilters(newFilters);
    applyFilters(newFilters);
  };
  
  const toggleFiltersVisibility = () => {
    setFiltersVisible(!filtersVisible);
  };
  
  return (
    <div className="min-h-screen bg-art-light dark:bg-art-primary">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-28 pb-12">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-serif font-medium">Explore Art</h1>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="md:hidden"
              onClick={toggleFiltersVisibility}
            >
              <FilterIcon className="h-4 w-4 mr-2" />
              Filters
            </Button>
            
            <div className="hidden md:flex items-center gap-2 bg-white dark:bg-art-secondary rounded-lg p-1">
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
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar - Desktop */}
          <div className={`md:w-80 md:flex-shrink-0 md:block ${filtersVisible ? 'block' : 'hidden'}`}>
            <SearchFilters onFilterChange={handleFilterChange} className="sticky top-28" />
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            <Tabs defaultValue="artworks" className="mb-8" onValueChange={(value) => setActiveTab(value as 'artworks' | 'artists')}>
              <TabsList className="w-full mb-6">
                <TabsTrigger value="artworks" className="flex-1">Artworks</TabsTrigger>
                <TabsTrigger value="artists" className="flex-1">Artists</TabsTrigger>
              </TabsList>
              
              <TabsContent value="artworks">
                {loading ? (
                  <div className="flex items-center justify-center py-20">
                    <div className="flex flex-col items-center">
                      <Loader className="h-10 w-10 text-art-accent animate-spin mb-4" />
                      <p className="text-art-gray">Searching for artworks...</p>
                    </div>
                  </div>
                ) : filteredArtworks.length === 0 ? (
                  <div className="text-center py-20 bg-white dark:bg-art-secondary rounded-xl">
                    <div className="h-20 w-20 bg-art-gray-light dark:bg-art-primary/60 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="h-10 w-10 text-art-gray" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">No artworks found</h3>
                    <p className="text-art-gray mb-6 max-w-md mx-auto">
                      We couldn't find any artworks matching your current filters. Try adjusting your search criteria.
                    </p>
                    <Button onClick={() => handleFilterChange({
                      query: '',
                      categories: [],
                      priceRange: { min: 0, max: 10000 },
                      forSale: true,
                      sortBy: 'popularity',
                      sortOrder: 'desc',
                    })}>
                      Clear Filters
                    </Button>
                  </div>
                ) : (
                  <div className={viewMode === 'grid' 
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
                    : "space-y-4"
                  }>
                    {filteredArtworks.map((artwork, index) => (
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
                              <a href={`/artwork/${artwork.id}`} className="hover:text-art-accent transition-colors">
                                <h3 className="font-medium text-lg mb-1">{artwork.title}</h3>
                              </a>
                              <a href={`/artist/${artwork.artist.id}`} className="text-art-gray text-sm hover:text-art-accent transition-colors mb-2">
                                {artwork.artist.name}
                              </a>
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
              
              <TabsContent value="artists">
                <div className="text-center py-20 bg-white dark:bg-art-secondary rounded-xl">
                  <div className="h-20 w-20 bg-art-gray-light dark:bg-art-primary/60 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-10 w-10 text-art-gray" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Artist Search Coming Soon</h3>
                  <p className="text-art-gray mb-6 max-w-md mx-auto">
                    We're working on enhancing our artist search functionality. This feature will be available soon!
                  </p>
                  <Button onClick={() => setActiveTab('artworks')}>
                    Browse Artworks
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
            
            {filteredArtworks.length > 0 && (
              <div className="flex justify-center mt-8">
                <Button variant="outline" size="lg">
                  Load More
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
