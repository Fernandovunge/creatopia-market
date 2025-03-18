
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Artwork } from '@/types';

interface ArtworkCardProps {
  artwork: Artwork;
  className?: string;
  featured?: boolean;
}

const ArtworkCard = ({ artwork, className, featured = false }: ArtworkCardProps) => {
  const { id, title, artist, price, image, medium, forSale, likes } = artwork;
  
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group bg-white dark:bg-art-secondary rounded-xl overflow-hidden shadow-sm transition-all hover:shadow-md",
        featured ? "col-span-2 row-span-2" : "",
        className
      )}
    >
      <Link to={`/artwork/${id}`} className="block">
        <div className="relative overflow-hidden aspect-[3/4]">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Overlay + Quick Actions */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
            <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-white font-medium text-lg">{title}</h3>
              <div className="flex items-center text-white/80 text-sm mt-1">
                <span>By {artist.name}</span>
                <span className="mx-2">•</span>
                <span>{medium}</span>
              </div>
            </div>
          </div>
          
          {/* Top-right like button */}
          <button 
            className="absolute top-3 right-3 bg-white/80 dark:bg-art-primary/50 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white dark:hover:bg-art-primary/70"
            aria-label="Like artwork"
          >
            <Heart className="h-4 w-4 text-art-primary dark:text-white" />
          </button>
          
          {/* Price badge, only show if for sale */}
          {forSale && price && (
            <div className="absolute top-3 left-3 bg-white/80 dark:bg-art-primary/50 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-art-primary dark:text-white">
              ${price}
            </div>
          )}
          
          {/* Likes count */}
          <div className="absolute bottom-3 right-3 bg-white/80 dark:bg-art-primary/50 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-medium text-art-primary dark:text-white flex items-center gap-1">
            <Heart className="h-3 w-3 fill-art-accent stroke-art-accent" />
            {likes}
          </div>
        </div>
      </Link>
      
      {/* Additional info for non-hover state (mobile support) */}
      <div className="p-4 md:p-5">
        <div className="flex items-center justify-between">
          <Link to={`/artist/${artist.id}`} className="flex items-center gap-2">
            <img 
              src={artist.profileImage || "https://via.placeholder.com/40"} 
              alt={artist.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm font-medium text-art-primary dark:text-white hover:text-art-accent dark:hover:text-art-accent-light transition-colors">
              {artist.name}
            </span>
          </Link>
          
          {forSale && (
            <Link 
              to={`/artwork/${id}`}
              className="text-xs font-medium px-3 py-1.5 bg-art-accent/10 text-art-accent rounded-full hover:bg-art-accent/20 transition-colors"
            >
              View Details
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ArtworkCard;
