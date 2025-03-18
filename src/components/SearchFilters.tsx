
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  X, 
  ChevronDown,
  Paintbrush,
  Camera, 
  Pencil,
  Shapes,
  Palette
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SearchFilters as SearchFiltersType } from '@/types';

interface SearchFiltersProps {
  onFilterChange: (filters: SearchFiltersType) => void;
  className?: string;
}

const categories = [
  { id: 'painting', name: 'Painting', icon: Paintbrush },
  { id: 'photography', name: 'Photography', icon: Camera },
  { id: 'drawing', name: 'Drawing', icon: Pencil },
  { id: 'sculpture', name: 'Sculpture', icon: Shapes },
  { id: 'digital', name: 'Digital Art', icon: Palette },
  { id: 'mixed-media', name: 'Mixed Media', icon: Palette },
];

const sortOptions = [
  { id: 'date-desc', name: 'Newest', value: { sortBy: 'date', sortOrder: 'desc' } },
  { id: 'date-asc', name: 'Oldest', value: { sortBy: 'date', sortOrder: 'asc' } },
  { id: 'price-asc', name: 'Price: Low to High', value: { sortBy: 'price', sortOrder: 'asc' } },
  { id: 'price-desc', name: 'Price: High to Low', value: { sortBy: 'price', sortOrder: 'desc' } },
  { id: 'popularity-desc', name: 'Most Popular', value: { sortBy: 'popularity', sortOrder: 'desc' } },
  { id: 'rating-desc', name: 'Highest Rated', value: { sortBy: 'rating', sortOrder: 'desc' } },
];

const SearchFilters = ({ onFilterChange, className }: SearchFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('artworks');
  
  const [filters, setFilters] = useState<SearchFiltersType>({
    query: '',
    categories: [],
    priceRange: { min: 0, max: 10000 },
    forSale: true,
    sortBy: 'popularity',
    sortOrder: 'desc',
  });
  
  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };
  
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, query: e.target.value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const handleCategoryToggle = (categoryId: string) => {
    const newCategories = filters.categories?.includes(categoryId)
      ? filters.categories.filter(id => id !== categoryId)
      : [...(filters.categories || []), categoryId];
    
    const newFilters = { ...filters, categories: newCategories };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const handlePriceChange = (value: number[]) => {
    const newFilters = { 
      ...filters, 
      priceRange: { min: value[0], max: value[1] } 
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const handleForSaleToggle = (checked: boolean) => {
    const newFilters = { ...filters, forSale: checked };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const handleSortChange = (optionId: string) => {
    const option = sortOptions.find(opt => opt.id === optionId);
    if (option) {
      const newFilters = { 
        ...filters, 
        sortBy: option.value.sortBy, 
        sortOrder: option.value.sortOrder 
      };
      setFilters(newFilters);
      onFilterChange(newFilters);
    }
  };
  
  const handleReset = () => {
    const defaultFilters: SearchFiltersType = {
      query: '',
      categories: [],
      priceRange: { min: 0, max: 10000 },
      forSale: true,
      sortBy: 'popularity',
      sortOrder: 'desc',
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };
  
  return (
    <div className={cn("bg-white dark:bg-art-secondary rounded-xl shadow-sm", className)}>
      {/* Search Bar */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-art-gray h-5 w-5" />
          <Input
            type="text"
            placeholder="Search for artworks, artists, styles..."
            value={filters.query}
            onChange={handleQueryChange}
            className="pl-10 pr-4 py-3 h-12 input-field"
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            onClick={toggleFilters}
          >
            <Filter className={cn(
              "h-5 w-5 transition-colors", 
              filtersVisible ? "text-art-accent" : "text-art-gray"
            )} />
          </Button>
        </div>
      </div>
      
      {/* Filter Section */}
      {filtersVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="border-t border-art-gray-light dark:border-art-secondary"
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-lg">Filters</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleReset}
                className="text-art-gray hover:text-art-primary dark:hover:text-white"
              >
                Reset All
              </Button>
            </div>
            
            <Tabs defaultValue="artworks" className="mb-4">
              <TabsList className="w-full">
                <TabsTrigger value="artworks" className="flex-1">Artworks</TabsTrigger>
                <TabsTrigger value="artists" className="flex-1">Artists</TabsTrigger>
              </TabsList>
              
              <TabsContent value="artworks" className="pt-4 space-y-6">
                {/* Categories */}
                <div>
                  <Label className="mb-2 block">Categories</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {categories.map((category) => {
                      const isActive = filters.categories?.includes(category.id);
                      return (
                        <Button
                          key={category.id}
                          variant="outline"
                          className={cn(
                            "justify-start",
                            isActive && "bg-art-accent/10 text-art-accent border-art-accent"
                          )}
                          onClick={() => handleCategoryToggle(category.id)}
                        >
                          <category.icon className="h-4 w-4 mr-2" />
                          {category.name}
                        </Button>
                      );
                    })}
                  </div>
                </div>
                
                {/* Price Range */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Price Range</Label>
                    <div className="text-sm text-art-gray">
                      ${filters.priceRange?.min} - ${filters.priceRange?.max === 10000 ? '10,000+' : filters.priceRange?.max}
                    </div>
                  </div>
                  <Slider
                    defaultValue={[filters.priceRange?.min || 0, filters.priceRange?.max || 10000]}
                    max={10000}
                    step={100}
                    className="py-4"
                    onValueChange={handlePriceChange}
                  />
                </div>
                
                {/* For Sale Toggle */}
                <div className="flex items-center justify-between">
                  <Label>Available for Purchase</Label>
                  <Switch 
                    checked={filters.forSale}
                    onCheckedChange={handleForSaleToggle}
                  />
                </div>
                
                {/* Sort */}
                <div>
                  <Label className="mb-2 block">Sort By</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {sortOptions.map((option) => {
                      const isActive = filters.sortBy === option.value.sortBy && 
                                      filters.sortOrder === option.value.sortOrder;
                      return (
                        <Button
                          key={option.id}
                          variant="outline"
                          className={cn(
                            isActive && "bg-art-accent/10 text-art-accent border-art-accent"
                          )}
                          onClick={() => handleSortChange(option.id)}
                        >
                          {option.name}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="artists" className="pt-4">
                <div className="text-center py-4 text-art-gray">
                  <Palette className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>Artist-specific filters will appear here</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SearchFilters;
