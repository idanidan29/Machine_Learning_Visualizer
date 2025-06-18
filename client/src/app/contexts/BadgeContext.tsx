'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Badge, UserProgress, QuizCompletion, BadgeNotification } from '../../types/badge';
import { useAuth } from './AuthContext';
import { AUTH_CONFIG } from '../config/auth';

interface BadgeContextType {
  userProgress: UserProgress | null;
  badges: Badge[];
  badgeNotification: BadgeNotification | null;
  loading: boolean;
  getUserProgress: () => Promise<void>;
  getUserBadges: () => Promise<void>;
  processQuizCompletion: (quizCompletion: QuizCompletion) => Promise<Badge[]>;
  showBadgeNotification: (badge: Badge) => void;
  hideBadgeNotification: () => void;
}

const BadgeContext = createContext<BadgeContextType | undefined>(undefined);

export function BadgeProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuth();
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [badgeNotification, setBadgeNotification] = useState<BadgeNotification | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      getUserProgress();
      getUserBadges();
    } else {
      setUserProgress(null);
      setBadges([]);
    }
  }, [isAuthenticated, user]);

  const getUserProgress = async () => {
    if (!user?.token) return;

    try {
      setLoading(true);
      const response = await fetch(`${AUTH_CONFIG.API_BASE_URL}/api/Badge/user-progress`, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const progress: UserProgress = await response.json();
        setUserProgress(progress);
      }
    } catch (error) {
      console.error('Error fetching user progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const getUserBadges = async () => {
    if (!user?.token) return;

    try {
      const response = await fetch(`${AUTH_CONFIG.API_BASE_URL}/api/Badge/user-badges`, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const userBadges: Badge[] = await response.json();
        setBadges(userBadges);
      }
    } catch (error) {
      console.error('Error fetching user badges:', error);
    }
  };

  const processQuizCompletion = async (quizCompletion: QuizCompletion): Promise<Badge[]> => {
    if (!user?.token) return [];

    try {
      const response = await fetch(`${AUTH_CONFIG.API_BASE_URL}/api/Badge/quiz-completion`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quizCompletion),
      });

      if (response.ok) {
        const result = await response.json();
        const newBadges: Badge[] = result.newBadges || [];
        
        // Update local state
        if (newBadges.length > 0) {
          setBadges(prev => [...prev, ...newBadges]);
          // Show notification for the first new badge
          showBadgeNotification(newBadges[0]);
        }
        
        // Refresh user progress
        await getUserProgress();
        
        return newBadges;
      }
    } catch (error) {
      console.error('Error processing quiz completion:', error);
    }

    return [];
  };

  const showBadgeNotification = (badge: Badge) => {
    setBadgeNotification({ badge, show: true });
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      hideBadgeNotification();
    }, 5000);
  };

  const hideBadgeNotification = () => {
    setBadgeNotification(null);
  };

  const value: BadgeContextType = {
    userProgress,
    badges,
    badgeNotification,
    loading,
    getUserProgress,
    getUserBadges,
    processQuizCompletion,
    showBadgeNotification,
    hideBadgeNotification,
  };

  return (
    <BadgeContext.Provider value={value}>
      {children}
    </BadgeContext.Provider>
  );
}

export function useBadge() {
  const context = useContext(BadgeContext);
  if (context === undefined) {
    throw new Error('useBadge must be used within a BadgeProvider');
  }
  return context;
} 