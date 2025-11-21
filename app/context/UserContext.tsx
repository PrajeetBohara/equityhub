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
  avatar?: string;
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
    // Default user: Dubem with score that gives exactly 3 badges for screenshots
    const defaultScore = 750; // This gives exactly 3 badges (First Steps, Bronze, Silver)
    const defaultBadges = availableBadges.map(b => ({ 
      ...b, 
      earned: defaultScore >= b.scoreRequired,
      earnedDate: defaultScore >= b.scoreRequired ? new Date().toISOString() : undefined
    }));
    
    return {
      id: 'dubem',
      name: 'Dubem',
      score: defaultScore,
      badges: defaultBadges,
      rank: 1,
      level: defaultScore >= 5000 ? 'Master' : defaultScore >= 2500 ? 'Expert' : defaultScore >= 1000 ? 'Advanced' : defaultScore >= 500 ? 'Intermediate' : 'Beginner+',
      avatar: '👤', // User avatar emoji
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
    // Mock leaderboard data with proxy users for screenshots
    const getBadgesForScore = (score: number): Badge[] => {
      return availableBadges.map(badge => ({
        ...badge,
        earned: score >= badge.scoreRequired,
        earnedDate: score >= badge.scoreRequired ? new Date().toISOString() : undefined
      }));
    };

    const getLevelForScore = (score: number): string => {
      if (score >= 5000) return 'Master';
      if (score >= 2500) return 'Expert';
      if (score >= 1000) return 'Advanced';
      if (score >= 500) return 'Intermediate';
      if (score >= 200) return 'Beginner+';
      return 'Beginner';
    };

    const mockUsers: User[] = [
      // Current user (Dubem) - #1 highest score
      { 
        id: 'dubem', 
        name: 'Dubem', 
        score: user?.id === 'dubem' ? (user?.score || 750) : 750, 
        badges: user?.id === 'dubem' ? (user?.badges || getBadgesForScore(750)) : getBadgesForScore(750), 
        rank: 1, 
        level: user?.id === 'dubem' ? (user?.level || getLevelForScore(750)) : getLevelForScore(750),
        avatar: user?.id === 'dubem' ? (user?.avatar || '👤') : '👤',
      },
      // Francis - #2
      { 
        id: 'francis', 
        name: 'Francis', 
        score: 650, 
        badges: getBadgesForScore(650), 
        rank: 2, 
        level: getLevelForScore(650),
        avatar: '👤',
      },
      // Prajeet - #3
      { 
        id: 'prajeet', 
        name: 'Prajeet', 
        score: 550, 
        badges: getBadgesForScore(550), 
        rank: 3, 
        level: getLevelForScore(550),
        avatar: '👤',
      },
      // Grace - #4
      { 
        id: 'grace', 
        name: 'Grace', 
        score: 450, 
        badges: getBadgesForScore(450), 
        rank: 4, 
        level: getLevelForScore(450),
        avatar: '👤',
      },
      // Chiamanda - #5
      { 
        id: 'chiamanda', 
        name: 'Chiamanda', 
        score: 350, 
        badges: getBadgesForScore(350), 
        rank: 5, 
        level: getLevelForScore(350),
        avatar: '👤',
      },
    ].sort((a, b) => b.score - a.score)
    .map((u, idx) => ({ ...u, rank: idx + 1 }));

    setLeaderboard(mockUsers);
  };

  const getLeaderboard = (): User[] => {
    // Create and return leaderboard directly
    const getBadgesForScore = (score: number): Badge[] => {
      return availableBadges.map(badge => ({
        ...badge,
        earned: score >= badge.scoreRequired,
        earnedDate: score >= badge.scoreRequired ? new Date().toISOString() : undefined
      }));
    };

    const getLevelForScore = (score: number): string => {
      if (score >= 5000) return 'Master';
      if (score >= 2500) return 'Expert';
      if (score >= 1000) return 'Advanced';
      if (score >= 500) return 'Intermediate';
      if (score >= 200) return 'Beginner+';
      return 'Beginner';
    };

    const mockUsers: User[] = [
      { 
        id: 'dubem', 
        name: 'Dubem', 
        score: user?.id === 'dubem' ? (user?.score || 750) : 750, 
        badges: user?.id === 'dubem' ? (user?.badges || getBadgesForScore(750)) : getBadgesForScore(750), 
        rank: 1, 
        level: user?.id === 'dubem' ? (user?.level || getLevelForScore(750)) : getLevelForScore(750),
        avatar: user?.id === 'dubem' ? (user?.avatar || '👤') : '👤',
      },
      { 
        id: 'francis', 
        name: 'Francis', 
        score: 650, 
        badges: getBadgesForScore(650), 
        rank: 2, 
        level: getLevelForScore(650),
        avatar: '👤',
      },
      { 
        id: 'prajeet', 
        name: 'Prajeet', 
        score: 550, 
        badges: getBadgesForScore(550), 
        rank: 3, 
        level: getLevelForScore(550),
        avatar: '👤',
      },
      { 
        id: 'grace', 
        name: 'Grace', 
        score: 450, 
        badges: getBadgesForScore(450), 
        rank: 4, 
        level: getLevelForScore(450),
        avatar: '👤',
      },
      { 
        id: 'chiamanda', 
        name: 'Chiamanda', 
        score: 350, 
        badges: getBadgesForScore(350), 
        rank: 5, 
        level: getLevelForScore(350),
        avatar: '👤',
      },
    ].sort((a, b) => b.score - a.score)
    .map((u, idx) => ({ ...u, rank: idx + 1 }));

    updateLeaderboard();
    return mockUsers;
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

