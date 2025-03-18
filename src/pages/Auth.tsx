
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowRight, UserPlus, LogIn, Palette, User, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

type AuthMode = 'login' | 'signup';
type UserRole = 'artist' | 'client';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [userRole, setUserRole] = useState<UserRole>('client');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Parse query params on load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.has('type')) {
      const type = params.get('type');
      if (type === 'login' || type === 'signup') {
        setAuthMode(type);
      }
    }
    
    if (params.has('role')) {
      const role = params.get('role');
      if (role === 'artist' || role === 'client') {
        setUserRole(role);
      }
    }
  }, [location.search]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      
      // In a real app, this would handle authentication/registration with a backend
      navigate('/');
    }, 1500);
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <div className="min-h-screen bg-art-light dark:bg-art-primary">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-28 pb-12">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-art-secondary rounded-xl p-6 md:p-8 shadow-sm"
          >
            <Tabs defaultValue={authMode} onValueChange={(value) => setAuthMode(value as AuthMode)}>
              <TabsList className="grid grid-cols-2 mb-6 w-full">
                <TabsTrigger value="login" className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </TabsTrigger>
                <TabsTrigger value="signup" className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  <span>Sign Up</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <div className="space-y-6">
                  <div className="text-center">
                    <h1 className="text-2xl font-serif font-medium mb-2">Welcome Back</h1>
                    <p className="text-art-gray">Sign in to continue to ArtConnect</p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="your.email@example.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link to="/forgot-password" className="text-xs text-art-accent hover:underline">
                          Forgot Password?
                        </Link>
                      </div>
                      <div className="relative">
                        <Input 
                          id="password" 
                          type={showPassword ? "text" : "password"} 
                          placeholder="••••••••" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-art-gray hover:text-art-primary dark:hover:text-white transition-colors"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember" />
                      <label
                        htmlFor="remember"
                        className="text-sm leading-none text-art-gray peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Remember me
                      </label>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-art-accent hover:bg-art-accent-dark" 
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          <span>Signing In...</span>
                        </div>
                      ) : (
                        <span>Sign In</span>
                      )}
                    </Button>
                  </form>
                  
                  <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-art-gray-light dark:border-art-primary"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white dark:bg-art-secondary px-2 text-art-gray">or continue with</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="w-full">
                      <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                      Google
                    </Button>
                    <Button variant="outline" className="w-full">
                      <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                      </svg>
                      Facebook
                    </Button>
                  </div>
                  
                  <div className="text-center text-sm text-art-gray">
                    <span>Don't have an account? </span>
                    <button 
                      type="button"
                      className="text-art-accent hover:underline font-medium"
                      onClick={() => setAuthMode('signup')}
                    >
                      Sign up
                    </button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="signup">
                <div className="space-y-6">
                  <div className="text-center">
                    <h1 className="text-2xl font-serif font-medium mb-2">Create Your Account</h1>
                    <p className="text-art-gray">Join the ArtConnect community</p>
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-sm mb-3">I am joining as:</p>
                    <RadioGroup defaultValue={userRole} onValueChange={(value) => setUserRole(value as UserRole)}>
                      <div className="grid grid-cols-2 gap-4">
                        <Label
                          htmlFor="artist"
                          className={cn(
                            "flex flex-col items-center justify-center rounded-md border-2 border-muted bg-transparent p-4 hover:bg-art-gray-light/50 hover:border-art-gray [&:has([data-state=checked])]:border-art-accent [&:has([data-state=checked])]:bg-art-accent/10",
                            "dark:hover:bg-art-primary/50"
                          )}
                        >
                          <RadioGroupItem value="artist" id="artist" className="sr-only" />
                          <Palette className="h-6 w-6 mb-2" />
                          <span className="text-sm font-medium">Artist</span>
                        </Label>
                        <Label
                          htmlFor="client"
                          className={cn(
                            "flex flex-col items-center justify-center rounded-md border-2 border-muted bg-transparent p-4 hover:bg-art-gray-light/50 hover:border-art-gray [&:has([data-state=checked])]:border-art-accent [&:has([data-state=checked])]:bg-art-accent/10",
                            "dark:hover:bg-art-primary/50"
                          )}
                        >
                          <RadioGroupItem value="client" id="client" className="sr-only" />
                          <User className="h-6 w-6 mb-2" />
                          <span className="text-sm font-medium">Art Enthusiast</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          type="text" 
                          placeholder="John Doe" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input 
                          id="username" 
                          type="text" 
                          placeholder="johndoe" 
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input 
                        id="signup-email" 
                        type="email" 
                        placeholder="your.email@example.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <div className="relative">
                        <Input 
                          id="signup-password" 
                          type={showPassword ? "text" : "password"} 
                          placeholder="••••••••" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-art-gray hover:text-art-primary dark:hover:text-white transition-colors"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      <p className="text-xs text-art-gray mt-1">
                        Must be at least 8 characters and include a number and a special character.
                      </p>
                    </div>
                    
                    <div className="flex items-start space-x-2 mt-4">
                      <Checkbox id="terms" required />
                      <label
                        htmlFor="terms"
                        className="text-sm leading-none text-art-gray peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree to the{" "}
                        <Link to="/terms" className="text-art-accent hover:underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link to="/privacy" className="text-art-accent hover:underline">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-art-accent hover:bg-art-accent-dark" 
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          <span>Creating Account...</span>
                        </div>
                      ) : (
                        <span>Create Account</span>
                      )}
                    </Button>
                  </form>
                  
                  <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-art-gray-light dark:border-art-primary"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white dark:bg-art-secondary px-2 text-art-gray">or continue with</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="w-full">
                      <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                      Google
                    </Button>
                    <Button variant="outline" className="w-full">
                      <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                      </svg>
                      Facebook
                    </Button>
                  </div>
                  
                  <div className="text-center text-sm text-art-gray">
                    <span>Already have an account? </span>
                    <button 
                      type="button"
                      className="text-art-accent hover:underline font-medium"
                      onClick={() => setAuthMode('login')}
                    >
                      Log in
                    </button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
