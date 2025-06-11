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
      const response = await fetch(`${AUTH_CONFIG.API_BASE_URL}/api/Auth/login`, {
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
      const response = await fetch(`${AUTH_CONFIG.API_BASE_URL}/api/Auth/register`, {
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

      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
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