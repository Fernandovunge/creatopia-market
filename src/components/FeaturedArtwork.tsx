
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ExternalLink, Heart, Eye, MessageCircle } from 'lucide-react';
import { Artwork } from '@/types';

interface FeaturedArtworkProps {
  artwork: Artwork;
  className?: string;
}

const FeaturedArtwork = ({ artwork, className }: FeaturedArtworkProps) => {
  const { id, title, artist, description, image, medium, price, forSale, views, likes } = artwork;
  
  return (
    <section className={`${className} py-16 md:py-24`}>
      <div className="container px-4 mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          {/* Artwork Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative overflow-hidden rounded-2xl aspect-[4/5]">
              <img 
                src={image} 
                alt={title} 
                className="w-full h-full object-cover"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              
              {/* Stats */}
              <div className="absolute bottom-4 left-4 flex space-x-4">
                <div className="flex items-center space-x-1.5 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5">
                  <Eye className="h-4 w-4 text-white" />
                  <span className="text-xs font-medium text-white">{views}</span>
                </div>
                <div className="flex items-center space-x-1.5 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5">
                  <Heart className="h-4 w-4 text-white" />
                  <span className="text-xs font-medium text-white">{likes}</span>
                </div>
              </div>
              
              {/* Featured badge */}
              <div className="absolute top-4 left-4 bg-art-accent text-white px-3 py-1.5 rounded-full text-xs font-medium">
                Featured Artwork
              </div>
            </div>
          </motion.div>
          
          {/* Artwork Details */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-1/2"
          >
            <span className="text-art-accent font-medium text-sm mb-2 block">
              {medium}
            </span>
            
            <h2 className="text-3xl md:text-4xl font-serif font-medium mb-3 text-art-primary dark:text-white">
              {title}
            </h2>
            
            {/* Artist info */}
            <Link to={`/artist/${artist.id}`} className="flex items-center mb-6 group">
              <img 
                src={artist.profileImage || "https://via.placeholder.com/60"} 
                alt={artist.name} 
                className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-art-secondary"
              />
              <div className="ml-3">
                <div className="font-medium group-hover:text-art-accent transition-colors">
                  {artist.name}
                </div>
                <div className="text-sm text-art-gray">
                  {artist.location || "Artist"}
                </div>
              </div>
            </Link>
            
            {/* Description */}
            <p className="text-art-primary/80 dark:text-white/80 mb-6 line-clamp-4">
              {description}
            </p>
            
            {/* Price & Actions */}
            <div className="mb-6">
              {forSale && price ? (
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-2xl font-medium text-art-primary dark:text-white">
                    ${price}
                  </span>
                  <span className="text-art-gray text-sm">
                    {price > 1000 ? 'Free shipping worldwide' : 'Plus shipping'}
                  </span>
                </div>
              ) : (
                <div className="text-lg text-art-primary dark:text-white font-medium mb-2">
                  Not for sale • Exhibition Only
                </div>
              )}
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3">
              <Link to={`/artwork/${id}`} className="block">
                <Button size="lg" className="bg-art-accent hover:bg-art-accent-dark">
                  View Details
                </Button>
              </Link>
              
              {forSale && (
                <Button size="lg" variant="outline">
                  <Heart className="mr-2 h-4 w-4" /> Add to Favorites
                </Button>
              )}
              
              <Link to={`/contact/${artist.id}`} className="block w-full sm:w-auto mt-2 sm:mt-0">
                <Button size="lg" variant="outline" className="w-full">
                  <MessageCircle className="mr-2 h-4 w-4" /> Contact Artist
                </Button>
              </Link>
            </div>
            
            {/* Details/Specs */}
            <div className="grid grid-cols-2 gap-4 mt-8 border-t border-art-gray-light dark:border-art-secondary pt-6">
              <div>
                <div className="text-sm text-art-gray mb-1">Medium</div>
                <div className="font-medium">{medium}</div>
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
                <div className="text-sm text-art-gray mb-1">Category</div>
                <div className="font-medium">
                  {artwork.category.join(', ')}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArtwork;
