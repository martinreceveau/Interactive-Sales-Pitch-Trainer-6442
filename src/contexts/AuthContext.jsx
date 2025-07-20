import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = Cookies.get('popsales_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        Cookies.remove('popsales_user');
      }
    }
    setLoading(false);
  }, []);

  const signUp = async (email, password, fullName, industry) => {
    try {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData = {
        id: Date.now().toString(),
        email,
        fullName,
        industry,
        createdAt: new Date().toISOString(),
        plan: 'free',
        pitchesCreated: 0,
        practicesSessions: 0,
        weeklyNewsSuggestions: []
      };
      
      setUser(userData);
      Cookies.set('popsales_user', JSON.stringify(userData), { expires: 30 });
      
      toast.success('Account created successfully!');
      return { success: true };
    } catch (error) {
      toast.error('Failed to create account');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email, password) => {
    try {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData = {
        id: Date.now().toString(),
        email,
        fullName: email.split('@')[0],
        industry: 'Technology & Software', // Default for existing users
        createdAt: new Date().toISOString(),
        plan: 'free',
        pitchesCreated: 0,
        practicesSessions: 0,
        weeklyNewsSuggestions: []
      };
      
      setUser(userData);
      Cookies.set('popsales_user', JSON.stringify(userData), { expires: 30 });
      
      toast.success('Welcome back!');
      return { success: true };
    } catch (error) {
      toast.error('Failed to sign in');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setUser(null);
      Cookies.remove('popsales_user');
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error('Error signing out');
    }
  };

  const updateUserStats = (stats) => {
    if (user) {
      const updatedUser = { ...user, ...stats };
      setUser(updatedUser);
      Cookies.set('popsales_user', JSON.stringify(updatedUser), { expires: 30 });
    }
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    updateUserStats
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};