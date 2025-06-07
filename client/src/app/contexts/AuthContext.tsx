/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { AUTH_CONFIG } from '../config/auth';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  token: string;
  expiration: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  showLoginModal: boolean;
  showSignUpModal: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<boolean>;
  logout: () => void;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  openSignUpModal: () => void;
  closeSignUpModal: () => void;
  initiateOAuth: (provider: 'google' | 'github') => void;
  handleOAuthCallback: (provider: 'google' | 'github', code: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing authentication on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.warn('Invalid user data in localStorage, clearing it');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${AUTH_CONFIG.API_BASE_URL}/Auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      
      const userData: User = {
        id: data.userId,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        token: data.token,
        expiration: data.expiration,
      };
      
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));
      setShowLoginModal(false);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string): Promise<boolean> => {
    try {
      const response = await fetch(`${AUTH_CONFIG.API_BASE_URL}/Auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, firstName, lastName }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      return await login(email, password);
    } catch (error) {
      console.error('Sign up error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const initiateOAuth = (provider: 'google' | 'github') => {
    const clientId = provider === 'google' 
      ? AUTH_CONFIG.GOOGLE_CLIENT_ID 
      : AUTH_CONFIG.GITHUB_CLIENT_ID;
    
    const redirectUri = provider === 'google'
      ? AUTH_CONFIG.GOOGLE_REDIRECT_URI
      : AUTH_CONFIG.GITHUB_REDIRECT_URI;

    const authUrl = provider === 'google'
      ? AUTH_CONFIG.GOOGLE_AUTH_URL
      : AUTH_CONFIG.GITHUB_AUTH_URL;

    const scope = provider === 'google'
      ? 'email profile'
      : 'user:email';

    const url = new URL(authUrl);
    url.searchParams.append('client_id', clientId);
    url.searchParams.append('redirect_uri', redirectUri);
    url.searchParams.append('response_type', 'code');
    url.searchParams.append('scope', scope);
    
    if (provider === 'github') {
      url.searchParams.append('state', Math.random().toString(36).substring(7));
    }

    window.location.href = url.toString();
  };

  const handleOAuthCallback = async (provider: 'google' | 'github', code: string): Promise<void> => {
    try {
      const response = await fetch(`${AUTH_CONFIG.API_BASE_URL}/auth/${provider}/callback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error(`${provider} authentication failed`);
      }

      const data = await response.json();
      
      const userData: User = {
        id: data.userId,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        token: data.token,
        expiration: data.expiration,
      };
      
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));
      setShowLoginModal(false);
      setShowSignUpModal(false);
    } catch (error) {
      console.error(`${provider} OAuth error:`, error);
      throw error;
    }
  };

  const openLoginModal = () => {
    setShowLoginModal(true);
    setShowSignUpModal(false);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const openSignUpModal = () => {
    setShowSignUpModal(true);
    setShowLoginModal(false);
  };

  const closeSignUpModal = () => {
    setShowSignUpModal(false);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    showLoginModal,
    showSignUpModal,
    login,
    signUp,
    logout,
    openLoginModal,
    closeLoginModal,
    openSignUpModal,
    closeSignUpModal,
    initiateOAuth,
    handleOAuthCallback,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 