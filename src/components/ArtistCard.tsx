
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Star, Users } from 'lucide-react';
import { Artist } from '@/types';
import { Button } from '@/components/ui/button';

interface ArtistCardProps {
  artist: Artist;
  className?: string;
  featured?: boolean;
}

const ArtistCard = ({ artist, className, featured = false }: ArtistCardProps) => {
  const { id, name, profileImage, bio, rating, followers, specialties } = artist;
  
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group bg-white dark:bg-art-secondary rounded-xl overflow-hidden shadow-sm transition-all hover:shadow-md",
        featured ? "md:col-span-2" : "",
        className
      )}
    >
      <div className="p-5 md:p-6">
        <div className="flex flex-col md:flex-row gap-5 items-start">
          {/* Artist Avatar */}
          <Link to={`/artist/${id}`} className="relative group block">
            <div className="overflow-hidden rounded-xl aspect-square w-24 h-24 md:w-32 md:h-32">
              <img 
                src={profileImage || "https://via.placeholder.com/300"} 
                alt={name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            
            {/* Rating Badge */}
            <div className="absolute -bottom-2 -right-2 bg-white dark:bg-art-primary shadow-sm rounded-full px-2 py-1 flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium">{rating.toFixed(1)}</span>
            </div>
          </Link>
          
          {/* Artist Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Link to={`/artist/${id}`} className="font-serif text-xl font-medium text-art-primary dark:text-white hover:text-art-accent dark:hover:text-art-accent-light transition-colors">
                {name}
              </Link>
              
              {featured && (
                <span className="px-2 py-0.5 bg-art-accent/10 text-art-accent rounded-full text-xs font-medium">
                  Featured
                </span>
              )}
            </div>
            
            {/* Followers */}
            <div className="flex items-center gap-1 text-sm text-art-gray mb-3">
              <Users className="h-3.5 w-3.5" />
              <span>{followers} {followers === 1 ? 'follower' : 'followers'}</span>
            </div>
            
            {/* Specialties */}
            {specialties && specialties.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {specialties.map((specialty, index) => (
                  <span 
                    key={index}
                    className="px-2.5 py-1 bg-art-gray-light dark:bg-art-primary text-art-primary dark:text-white rounded-full text-xs"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            )}
            
            {/* Bio Short */}
            {bio && (
              <p className="text-sm text-art-primary/80 dark:text-white/80 line-clamp-2 mb-4">
                {bio}
              </p>
            )}
            
            {/* Actions */}
            <div className="flex gap-2">
              <Link to={`/artist/${id}`} className="flex-1 md:flex-none">
                <Button variant="outline" size="sm" className="w-full md:w-auto">
                  View Profile
                </Button>
              </Link>
              <Button size="sm" className="flex-1 md:flex-none bg-art-accent hover:bg-art-accent-dark">
                Follow
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArtistCard;
