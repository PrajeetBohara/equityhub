'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  scoreRequired: number;
  earned: boolean;
  earnedDate?: string;
}

interface User {
  id: string;
  name: string;
  score: number;
  badges: Badge[];
  rank: number;
  level: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  updateScore: (points: number) => void;
  checkBadges: () => void;
  getLeaderboard: () => User[];
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const availableBadges: Badge[] = [
  { id: '1', name: 'First Steps', description: 'Complete your first course', icon: '🌟', scoreRequired: 50, earned: false },
  { id: '2', name: 'Bronze Scholar', description: 'Earn 200 points', icon: '🥉', scoreRequired: 200, earned: false },
  { id: '3', name: 'Silver Scholar', description: 'Earn 500 points', icon: '🥈', scoreRequired: 500, earned: false },
  { id: '4', name: 'Gold Scholar', description: 'Earn 1000 points', icon: '🥇', scoreRequired: 1000, earned: false },
  { id: '5', name: 'Financial Expert', description: 'Earn 2500 points', icon: '💎', scoreRequired: 2500, earned: false },
  { id: '6', name: 'Master Educator', description: 'Earn 5000 points', icon: '👑', scoreRequired: 5000, earned: false },
];

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('fizzy_user');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return null;
        }
      }
    }
    return {
      id: '1',
      name: 'User',
      score: 0,
      badges: availableBadges.map(b => ({ ...b, earned: false })),
      rank: 0,
      level: 'Beginner',
    };
  });

  const [leaderboard, setLeaderboard] = useState<User[]>([]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('fizzy_user', JSON.stringify(user));
      updateLeaderboard();
    }
  }, [user]);

  const updateScore = (points: number) => {
    if (user) {
      const newScore = user.score + points;
      let newLevel = user.level;
      
      if (newScore >= 5000) newLevel = 'Master';
      else if (newScore >= 2500) newLevel = 'Expert';
      else if (newScore >= 1000) newLevel = 'Advanced';
      else if (newScore >= 500) newLevel = 'Intermediate';
      else if (newScore >= 200) newLevel = 'Beginner+';
      
      setUserState({
        ...user,
        score: newScore,
        level: newLevel,
      });
      checkBadges();
    }
  };

  const checkBadges = () => {
    if (!user) return;
    
    const updatedBadges = user.badges.map(badge => {
      if (!badge.earned && user.score >= badge.scoreRequired) {
        return {
          ...badge,
          earned: true,
          earnedDate: new Date().toISOString(),
        };
      }
      return badge;
    });

    setUserState({
      ...user,
      badges: updatedBadges,
    });
  };

  const updateLeaderboard = () => {
    // Mock leaderboard data - in real app, this would come from an API
    const mockUsers: User[] = [
      { id: '1', name: 'You', score: user?.score || 0, badges: user?.badges || [], rank: 1, level: user?.level || 'Beginner' },
      { id: '2', name: 'Marcus J.', score: 3500, badges: availableBadges.slice(0, 4).map(b => ({ ...b, earned: true })), rank: 2, level: 'Expert' },
      { id: '3', name: 'Keisha W.', score: 2800, badges: availableBadges.slice(0, 4).map(b => ({ ...b, earned: true })), rank: 3, level: 'Expert' },
      { id: '4', name: 'David B.', score: 1800, badges: availableBadges.slice(0, 3).map(b => ({ ...b, earned: true })), rank: 4, level: 'Advanced' },
      { id: '5', name: 'Aisha T.', score: 1200, badges: availableBadges.slice(0, 3).map(b => ({ ...b, earned: true })), rank: 5, level: 'Advanced' },
    ].sort((a, b) => b.score - a.score)
    .map((u, idx) => ({ ...u, rank: idx + 1 }));

    setLeaderboard(mockUsers);
  };

  const getLeaderboard = () => {
    updateLeaderboard();
    return leaderboard;
  };

  const setUser = (newUser: User | null) => {
    setUserState(newUser);
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateScore, checkBadges, getLeaderboard }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

