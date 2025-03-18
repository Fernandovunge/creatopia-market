
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Sun, Moon, User, LogIn, Bell, ShoppingBag } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  
  const isLoggedIn = false; // This would be replaced with auth state
  const userInitials = "JD"; // This would be replaced with user data
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore', path: '/explore' },
    { name: 'Artists', path: '/artists' },
    { name: 'About', path: '/about' },
  ];
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);
  
  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const toggleSearch = () => setSearchActive(!searchActive);
  
  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300",
        scrolled ? "bg-white/80 dark:bg-art-primary/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="bg-art-accent h-8 w-8 rounded-full flex items-center justify-center text-white font-serif text-lg">A</span>
          <span className="font-serif text-xl font-medium">ArtConnect</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path}
              className={cn(
                "text-art-primary dark:text-white hover:text-art-accent dark:hover:text-art-accent-light transition-colors relative group py-2",
                location.pathname === link.path && "text-art-accent dark:text-art-accent-light"
              )}
            >
              {link.name}
              <span 
                className={cn(
                  "absolute bottom-0 left-0 w-0 h-0.5 bg-art-accent dark:bg-art-accent-light transition-all duration-300 group-hover:w-full",
                  location.pathname === link.path && "w-full"
                )}
              />
            </Link>
          ))}
        </nav>
        
        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <button 
            onClick={toggleSearch} 
            className="text-art-primary dark:text-white hover:text-art-accent dark:hover:text-art-accent-light transition-colors"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
          
          <button 
            onClick={toggleTheme} 
            className="text-art-primary dark:text-white hover:text-art-accent dark:hover:text-art-accent-light transition-colors"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
          
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <Link 
                to="/notifications" 
                className="text-art-primary dark:text-white hover:text-art-accent dark:hover:text-art-accent-light transition-colors"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
              </Link>
              
              <Link 
                to="/cart" 
                className="text-art-primary dark:text-white hover:text-art-accent dark:hover:text-art-accent-light transition-colors"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="h-5 w-5" />
              </Link>
              
              <Link to="/profile">
                <Avatar className="h-9 w-9 transition-transform hover:scale-105">
                  <AvatarImage src="" alt="Profile" />
                  <AvatarFallback className="bg-art-accent text-white">{userInitials}</AvatarFallback>
                </Avatar>
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/auth?type=login">
                <Button variant="ghost" size="sm" className="font-medium">
                  <LogIn className="h-4 w-4 mr-2" /> Login
                </Button>
              </Link>
              <Link to="/auth?type=signup">
                <Button size="sm" className="bg-art-accent hover:bg-art-accent-dark font-medium">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-4">
          <button 
            onClick={toggleSearch} 
            className="text-art-primary dark:text-white"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
          <button 
            onClick={toggleMenu} 
            className="text-art-primary dark:text-white"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Search Bar */}
      <div 
        className={cn(
          "absolute top-full left-0 right-0 bg-white dark:bg-art-primary border-t border-art-gray-light dark:border-art-secondary transition-all duration-300 overflow-hidden",
          searchActive ? "max-h-16 py-3 opacity-100" : "max-h-0 py-0 opacity-0"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-art-gray" />
            <Input 
              type="text" 
              placeholder="Search for artists, artworks, or collections..." 
              className="pl-10 input-field"
              autoFocus={searchActive}
            />
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-white dark:bg-art-primary z-40 transition-transform duration-300 ease-in-out transform md:hidden pt-20",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="container mx-auto px-4 py-6 flex flex-col h-full">
          <nav className="flex flex-col space-y-6 mb-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path}
                className={cn(
                  "text-art-primary dark:text-white text-xl font-medium",
                  location.pathname === link.path && "text-art-accent dark:text-art-accent-light"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          <div className="flex flex-col space-y-4 mt-auto">
            <button 
              onClick={toggleTheme} 
              className="flex items-center space-x-3 text-art-primary dark:text-white py-2"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="h-5 w-5" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="h-5 w-5" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
            
            {isLoggedIn ? (
              <div className="flex items-center space-x-4 py-2">
                <Avatar>
                  <AvatarImage src="" alt="Profile" />
                  <AvatarFallback className="bg-art-accent text-white">{userInitials}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">John Doe</div>
                  <div className="text-sm text-art-gray">View Profile</div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col space-y-3">
                <Link to="/auth?type=login" className="w-full">
                  <Button variant="outline" className="w-full justify-start">
                    <LogIn className="h-4 w-4 mr-2" /> Login
                  </Button>
                </Link>
                <Link to="/auth?type=signup" className="w-full">
                  <Button className="w-full justify-start bg-art-accent hover:bg-art-accent-dark">
                    <User className="h-4 w-4 mr-2" /> Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
