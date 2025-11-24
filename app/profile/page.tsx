'use client';

import { useEffect, useState, useRef } from 'react';
import { useUser } from '../context/UserContext';
import { Trophy, Award, TrendingUp, Star, Crown, Target, MessageCircle, Upload, Camera, Users, Mail, Phone, Building2 } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, setUser, getLeaderboard } = useUser();
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const lb = getLeaderboard();
    setLeaderboard(lb);
    // Get Dubem's data from leaderboard for consistency
    const dubemInLeaderboard = lb.find(p => p.id === 'dubem');
    if (dubemInLeaderboard && user?.id === 'dubem' && user?.score !== dubemInLeaderboard.score) {
      // Update user to match leaderboard exactly
      setUser(dubemInLeaderboard);
    }
  }, [user, getLeaderboard, setUser]);

  // Get exact score and level from leaderboard
  const dubemInLeaderboard = leaderboard.find(p => p.id === 'dubem');
  const currentUser = dubemInLeaderboard || user;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setAvatarPreview(imageUrl);
        if (user) {
          setUser({ ...user, avatar: imageUrl });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string;
    scoreRequired: number;
    earned: boolean;
    earnedDate?: string;
  }

  const earnedBadges = currentUser?.badges.filter((b: Badge) => b.earned) || [];
  const availableBadges = currentUser?.badges.filter((b: Badge) => !b.earned) || [];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-5 w-5 text-yellow-500" />;
    if (rank === 2) return <Star className="h-5 w-5 text-gray-400" />;
    if (rank === 3) return <Star className="h-5 w-5 text-orange-500" />;
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-6 mb-6">
            {/* User Avatar */}
            <div className="flex-shrink-0 relative group">
              <div className="w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-lg overflow-hidden" style={{ background: 'linear-gradient(to bottom right, #5BA8FF, #8BC5FF)' }}>
                {avatarPreview || (currentUser?.avatar && currentUser.avatar.startsWith('data:image')) ? (
                  <img src={avatarPreview || currentUser?.avatar} alt={currentUser?.name || 'User'} className="w-full h-full object-cover" />
                ) : (
                  <span>{currentUser?.avatar || currentUser?.name?.charAt(0) || 'D'}</span>
                )}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors opacity-0 group-hover:opacity-100"
                style={{ borderColor: '#A0CEFD' }}
                aria-label="Upload profile picture"
              >
                <Camera className="h-4 w-4" style={{ color: '#A0CEFD' }} />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            {/* User Info */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to right, #5BA8FF, #8BC5FF)' }}>
                {currentUser?.name || 'Dubem'}'s Profile
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Level {currentUser?.level || 'Intermediate'} • Rank #{currentUser?.rank || 1} • Score: {currentUser?.score || 750} pts
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-sm mt-1">Track your progress and achievements</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Stats & Level */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Your Stats</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br p-4 rounded-lg overflow-hidden min-h-[120px] flex flex-col justify-between" style={{ background: 'linear-gradient(to bottom right, #8BC5FF, #5BA8FF)' }}>
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 mb-2 font-medium truncate">Total Score</p>
                  <p className="text-2xl sm:text-3xl font-bold truncate" style={{ color: '#5BA8FF' }}>{currentUser?.score || 750}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">points</p>
                </div>
                <div className="bg-gradient-to-br p-4 rounded-lg overflow-hidden min-h-[120px] flex flex-col justify-between" style={{ background: 'linear-gradient(to bottom right, #8BC5FF, #5BA8FF)' }}>
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 mb-2 font-medium truncate">Level</p>
                  <p className="text-xl sm:text-2xl font-bold break-words line-clamp-2" style={{ color: '#5BA8FF' }}>{currentUser?.level || 'Intermediate'}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">current level</p>
                </div>
                <div className="bg-gradient-to-br p-4 rounded-lg overflow-hidden min-h-[120px] flex flex-col justify-between" style={{ background: 'linear-gradient(to bottom right, #8BC5FF, #5BA8FF)' }}>
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 mb-2 font-medium truncate">Badges</p>
                  <p className="text-2xl sm:text-3xl font-bold" style={{ color: '#5BA8FF' }}>{earnedBadges.length}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 break-words">of {currentUser?.badges.length || 6}</p>
                </div>
                <div className="bg-gradient-to-br p-4 rounded-lg overflow-hidden min-h-[120px] flex flex-col justify-between" style={{ background: 'linear-gradient(to bottom right, #8BC5FF, #5BA8FF)' }}>
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 mb-2 font-medium truncate">Rank</p>
                  <p className="text-2xl sm:text-3xl font-bold truncate" style={{ color: '#5BA8FF' }}>#{currentUser?.rank || 1}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 break-words">leaderboard</p>
                </div>
              </div>

              {/* Progress to Next Level */}
              <div className="mt-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <span className="font-medium">Progress to Next Level</span>
                  <span className="text-xs sm:text-sm break-words sm:text-right">
                    {(() => {
                      const current = currentUser?.score || 750;
                      let next: number;
                      if (current < 200) next = 200;
                      else if (current < 500) next = 500;
                      else if (current < 1000) next = 1000;
                      else if (current < 2500) next = 2500;
                      else if (current < 5000) next = 5000;
                      else next = 10000;
                      const progress = Math.min((current / next) * 100, 100);
                      const remaining = next - current;
                      return `${Math.round(progress)}% (${remaining} pts to go)`;
                    })()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="h-3 rounded-full transition-all"
                    style={{
                      background: 'linear-gradient(to right, #5BA8FF, #8BC5FF)',
                      width: `${(() => {
                        const current = currentUser?.score || 750;
                        let next: number;
                        if (current < 200) next = 200;
                        else if (current < 500) next = 500;
                        else if (current < 1000) next = 1000;
                        else if (current < 2500) next = 2500;
                        else if (current < 5000) next = 5000;
                        else next = 10000;
                        return Math.min((current / next) * 100, 100);
                      })()}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Badges Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
                <Trophy className="h-6 w-6 text-yellow-500" />
                Your Badges
              </h2>

              {earnedBadges.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300">
                    Earned Badges ({earnedBadges.length})
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {earnedBadges.map((badge: Badge) => (
                      <div
                        key={badge.id}
                        className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg p-4 border-2 border-yellow-300 dark:border-yellow-700 shadow-md"
                      >
                        <div className="text-4xl mb-2 text-center">{badge.icon}</div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1 text-center">{badge.name}</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 text-center">{badge.description}</p>
                        {badge.earnedDate && (
                          <p className="text-xs text-gray-500 dark:text-gray-500 text-center mt-2">
                            Earned {new Date(badge.earnedDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {availableBadges.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300">
                    Available Badges ({availableBadges.length})
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {availableBadges.map((badge: Badge) => (
                      <div
                        key={badge.id}
                        className="bg-gradient-to-br rounded-lg p-4 border-2 shadow-md transition-all hover:scale-105"
                        style={{ 
                          background: 'linear-gradient(to bottom right, #8BC5FF, #5BA8FF)', 
                          borderColor: '#5BA8FF',
                        }}
                      >
                        <div className="text-4xl mb-2 text-center">{badge.icon}</div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1 text-center">{badge.name}</h4>
                        <p className="text-xs text-gray-700 dark:text-gray-300 mb-2 text-center font-medium">{badge.description}</p>
                        <p className="text-xs font-semibold text-center" style={{ color: '#5BA8FF' }}>
                          Need {badge.scoreRequired - (currentUser?.score || 750)} more points
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Financial Advisors Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Users className="h-6 w-6" style={{ color: '#A0CEFD' }} />
                  Recommended Financial Advisors
                </h2>
                <Link
                  href="/advisors"
                  className="text-sm font-medium hover:underline"
                  style={{ color: '#A0CEFD' }}
                >
                  View All →
                </Link>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Connect with experienced financial advisors who specialize in helping Black communities achieve homeownership and build generational wealth.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    id: '1',
                    name: 'Dr. Marcus Johnson',
                    title: 'Certified Financial Planner',
                    company: 'Black Wealth Advisory Group',
                    specialties: ['First-Time Homebuyer Programs', 'Down Payment Assistance', 'Mortgage Planning'],
                    rating: 4.9,
                    bio: 'Specializing in helping Black families navigate the homeownership journey with expertise in down payment assistance and first-time buyer programs.',
                  },
                  {
                    id: '2',
                    name: 'Keisha Williams',
                    title: 'Homeownership Specialist & CPA',
                    company: 'Williams Housing Solutions',
                    specialties: ['Credit Building for Mortgages', 'Housing Policy Navigation', 'Down Payment Strategies'],
                    rating: 4.8,
                    bio: 'Dedicated to helping Black homebuyers overcome credit barriers and access housing assistance programs.',
                  },
                  {
                    id: '3',
                    name: 'David Brown',
                    title: 'Real Estate & Mortgage Advisor',
                    company: 'Equity First Advisors',
                    specialties: ['Mortgage Options', 'FHA/VA/USDA Loans', 'Homeownership Readiness'],
                    rating: 4.9,
                    bio: 'Expert in mortgage types and helping Black families qualify for the best loan options available.',
                  },
                  {
                    id: '4',
                    name: 'Aisha Thompson',
                    title: 'Housing Equity Advocate',
                    company: 'Thompson Wealth Builders',
                    specialties: ['Fair Housing Rights', 'Housing Policy', 'Zoning Law Navigation'],
                    rating: 4.7,
                    bio: 'Passionate about housing equity and helping Black communities understand their rights and navigate housing policies.',
                  },
                ].map((advisor) => (
                  <div
                    key={advisor.id}
                    className="bg-gradient-to-br p-5 rounded-lg border-2 hover:shadow-lg transition-all"
                    style={{
                      background: 'linear-gradient(to bottom right, #8BC5FF, #5BA8FF)',
                      borderColor: '#5BA8FF',
                    }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md" style={{ background: 'linear-gradient(to bottom right, #5BA8FF, #8BC5FF)' }}>
                          {advisor.name.split(' ').map((n: string) => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                            {advisor.name}
                          </h3>
                          <p className="text-xs text-gray-700 dark:text-gray-300">{advisor.title}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          {advisor.rating}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3 text-xs text-gray-700 dark:text-gray-300">
                      <Building2 className="h-3 w-3" />
                      <span>{advisor.company}</span>
                    </div>

                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
                      {advisor.bio}
                    </p>

                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Specialties:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {advisor.specialties.map((specialty: string) => (
                          <span
                            key={specialty}
                            className="px-2 py-1 rounded text-xs font-medium text-white"
                            style={{ backgroundColor: '#A0CEFD' }}
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href={`/advisors#${advisor.id}`}
                        className="flex-1 text-center px-4 py-2 text-white rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: '#A0CEFD' }}
                      >
                        <Mail className="h-4 w-4 inline mr-1" />
                        Contact
                      </Link>
                      <Link
                        href="/advisors"
                        className="flex-1 text-center px-4 py-2 border-2 rounded-lg font-semibold text-sm hover:bg-white/20 transition-colors"
                        style={{ borderColor: '#A0CEFD', color: '#A0CEFD' }}
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Leaderboard */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 sticky top-24">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="h-6 w-6" style={{ color: '#A0CEFD' }} />
                Leaderboard
              </h2>

              <div className="space-y-3">
                {leaderboard.slice(0, 10).map((player, index) => (
                  <div
                    key={player.id}
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      player.id === currentUser?.id
                        ? 'border-2'
                        : 'bg-gray-50 dark:bg-gray-700/50'
                    }`}
                    {...(player.id === currentUser?.id && { style: { backgroundColor: '#8BC5FF', borderColor: '#5BA8FF' } })}
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm flex-shrink-0" style={{ backgroundColor: '#8BC5FF', color: '#5BA8FF' }}>
                      {player.rank}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-gray-900 dark:text-white truncate">
                          {player.id === currentUser?.id ? `${player.name} (You)` : player.name}
                        </p>
                        {player.rank <= 3 && <span>{getRankIcon(player.rank)}</span>}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{player.level}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="text-right mr-1">
                        <p className="font-semibold text-sm" style={{ color: '#A0CEFD' }}>{player.score}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">pts</p>
                      </div>
                      {player.id !== currentUser?.id && (
                        <Link
                          href={`/messaging?user=${player.id}`}
                          className="p-2 rounded-lg hover:opacity-90 transition-opacity flex-shrink-0"
                          style={{ backgroundColor: '#A0CEFD' }}
                          title={`Message ${player.name}`}
                        >
                          <MessageCircle className="h-4 w-4 text-white" />
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {currentUser && currentUser.rank > 10 && (
                <div className="mt-4 p-3 rounded-lg border-2" style={{ backgroundColor: '#8BC5FF', borderColor: '#5BA8FF' }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full text-white font-bold text-sm" style={{ backgroundColor: '#A0CEFD' }}>
                        {currentUser.rank}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">You</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{currentUser.level}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold" style={{ color: '#A0CEFD' }}>{currentUser.score}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">pts</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Quick Actions</h3>
              <div className="space-y-2">
                <Link
                  href="/courses"
                  className="block w-full text-left px-4 py-3 rounded-lg transition-colors hover:bg-[#5BA8FF] hover:text-white"
                  style={{ backgroundColor: '#8BC5FF', color: '#5BA8FF' }}
                >
                  <Target className="h-4 w-4 inline mr-2" />
                  View Courses
                </Link>
                <Link
                  href="/messaging"
                  className="block w-full text-left px-4 py-3 rounded-lg transition-colors hover:bg-[#5BA8FF] hover:text-white"
                  style={{ backgroundColor: '#8BC5FF', color: '#5BA8FF' }}
                >
                  <MessageCircle className="h-4 w-4 inline mr-2" />
                  Connect with Others
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

