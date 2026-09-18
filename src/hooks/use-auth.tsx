
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";

export interface User {
  id: string;
  name: string;
  email: string;
  profileImg?: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('femfinhub-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // This is a mock implementation that would typically call an API
      // In production, replace with actual API call
      
      // Simulating network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Hardcoded demo user
      if (email === 'demo@femfinhub.com' && password === 'password') {
        const mockUser: User = {
          id: '1',
          name: 'Jane Doe',
          email: 'demo@femfinhub.com',
          role: 'user',
        };
        
        localStorage.setItem('femfinhub-user', JSON.stringify(mockUser));
        setUser(mockUser);
        toast({
          title: "Logged in successfully",
          description: "Welcome back to FemFinHub!",
        });
        navigate('/dashboard');
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Invalid email or password. Try demo@femfinhub.com/password",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login error",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      // Simulating network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real implementation, this would call an API to create a user
      const mockUser: User = {
        id: '1',
        name,
        email,
        role: 'user',
      };
      
      localStorage.setItem('femfinhub-user', JSON.stringify(mockUser));
      setUser(mockUser);
      toast({
        title: "Account created",
        description: "Welcome to FemFinHub!",
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Signup error",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem('femfinhub-user');
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      signIn,
      signUp,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
