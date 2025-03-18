
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroProps {
  className?: string;
}

const Hero = ({ className }: HeroProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const heroImages = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1566&auto=format&fit=crop',
      alt: 'Modern art painting',
      title: 'Discover Unique Artworks',
      subtitle: 'Connect with artists and find the perfect piece for your space',
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1558180077-09f158c76707?q=80&w=1548&auto=format&fit=crop',
      alt: 'Abstract art',
      title: 'Support Independent Artists',
      subtitle: 'Every purchase directly supports a creative individual',
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=1566&auto=format&fit=crop',
      alt: 'Colorful painting',
      title: 'Art for Every Space',
      subtitle: 'Browse thousands of artworks across all mediums and styles',
    },
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [heroImages.length]);
  
  const image = heroImages[currentIndex];
  
  return (
    <section className={`relative w-full h-[90vh] min-h-[600px] overflow-hidden ${className}`}>
      {/* Hero Background with Gradient Overlay */}
      {heroImages.map((img, index) => (
        <div
          key={img.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div 
            className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-transparent"
            style={{ mixBlendMode: 'multiply' }}
          />
          <img
            src={img.url}
            alt={img.alt}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      
      {/* Hero Content */}
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center z-10">
        <div className="max-w-2xl">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <span className="inline-block px-4 py-1.5 bg-art-accent/90 backdrop-blur-sm text-white rounded-full text-sm font-medium">
              Featured Collection
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-white leading-tight">
              {image.title}
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-xl">
              {image.subtitle}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/explore">
                <Button 
                  size="lg"
                  className="bg-white text-art-primary hover:bg-white/90 transition-all"
                >
                  Explore Artworks
                </Button>
              </Link>
              <Link to="/artists">
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 transition-all"
                >
                  Meet the Artists <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Hero Pagination */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === currentIndex 
                ? 'bg-white w-8' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
