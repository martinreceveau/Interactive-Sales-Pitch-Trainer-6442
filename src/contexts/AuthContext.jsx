import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import supabase from '../lib/supabase';

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
    // Check for existing session from Supabase
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error checking session:', error);
          return;
        }

        if (session) {
          const { data: { user: userData }, error: userError } = await supabase.auth.getUser();
          
          if (userError) {
            console.error('Error getting user:', userError);
            return;
          }

          // Get additional user metadata from profiles table if needed
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userData.id)
            .single();

          // Combine auth user with profile data
          const fullUserData = {
            ...userData,
            ...(profileData || {}),
            createdAt: userData.created_at || new Date().toISOString(),
            isEmailVerified: userData.email_confirmed_at ? true : false
          };

          setUser(fullUserData);
        }
      } catch (error) {
        console.error('Session check error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state change:', event);
      
      if (event === 'SIGNED_IN' && session) {
        const { data: { user: userData } } = await supabase.auth.getUser();
        
        // Get additional user metadata from profiles table if needed
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userData.id)
          .single();

        // Combine auth user with profile data
        const fullUserData = {
          ...userData,
          ...(profileData || {}),
          createdAt: userData.created_at || new Date().toISOString(),
          isEmailVerified: userData.email_confirmed_at ? true : false
        };

        setUser(fullUserData);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  const signUp = async (email, password, fullName, industry) => {
    try {
      setLoading(true);
      
      // Sign up with Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            industry: industry
          },
        }
      });

      if (error) {
        toast.error(error.message);
        return { success: false, error: error.message };
      }

      // Create a record in the profiles table
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: data.user.id,
              full_name: fullName,
              industry: industry,
              plan: 'free',
              pitches_created: 0,
              practice_sessions: 0,
              updated_at: new Date().toISOString()
            }
          ]);

        if (profileError) {
          console.error('Error creating profile:', profileError);
        }
      }

      toast.success('Account created successfully! Please check your email for verification.');
      return { success: true, data };
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
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        toast.error(error.message);
        return { success: false, error: error.message };
      }

      toast.success('Welcome back!');
      return { success: true, data };
    } catch (error) {
      toast.error('Failed to sign in');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast.error(error.message);
        return;
      }
      
      setUser(null);
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error('Error signing out');
    }
  };

  const resetPassword = async (email) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/#/reset-password`
      });

      if (error) {
        toast.error(error.message);
        return { success: false, error: error.message };
      }
      
      toast.success('Password reset link sent to your email');
      return { success: true };
    } catch (error) {
      toast.error('Failed to send password reset email');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (newPassword) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        toast.error(error.message);
        return { success: false, error: error.message };
      }
      
      toast.success('Password updated successfully');
      return { success: true };
    } catch (error) {
      toast.error('Failed to update password');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const updateUserStats = async (stats) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update(stats)
        .eq('id', user.id);

      if (error) {
        console.error('Error updating user stats:', error);
        return;
      }

      // Update local user state
      setUser(prev => ({
        ...prev,
        ...stats
      }));
    } catch (error) {
      console.error('Error updating user stats:', error);
    }
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword,
    updateUserStats
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};