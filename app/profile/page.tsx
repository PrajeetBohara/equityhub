'use client';

import { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { Trophy, Award, TrendingUp, Star, Crown, Target, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, getLeaderboard } = useUser();
  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  useEffect(() => {
    const lb = getLeaderboard();
    setLeaderboard(lb);
  }, [user, getLeaderboard]);

  const earnedBadges = user?.badges.filter((b) => b.earned) || [];
  const availableBadges = user?.badges.filter((b) => !b.earned) || [];

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
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Your Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Track your progress and achievements</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Stats & Level */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Your Stats</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total Score</p>
                  <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{user?.score || 0}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Level</p>
                  <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{user?.level || 'Beginner'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Badges Earned</p>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{earnedBadges.length}</p>
                </div>
              </div>

              {/* Progress to Next Level */}
              <div className="mt-8">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <span>Progress to Next Level</span>
                  <span>
                    {(() => {
                      const current = user?.score || 0;
                      let next: number;
                      if (current < 200) next = 200;
                      else if (current < 500) next = 500;
                      else if (current < 1000) next = 1000;
                      else if (current < 2500) next = 2500;
                      else if (current < 5000) next = 5000;
                      else next = 10000;
                      const progress = Math.min((current / next) * 100, 100);
                      return `${Math.round(progress)}%`;
                    })()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 h-3 rounded-full transition-all"
                    style={{
                      width: `${(() => {
                        const current = user?.score || 0;
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
                  <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300">Earned Badges</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {earnedBadges.map((badge) => (
                      <div
                        key={badge.id}
                        className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg p-4 border-2 border-yellow-300 dark:border-yellow-700"
                      >
                        <div className="text-3xl mb-2">{badge.icon}</div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{badge.name}</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{badge.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {availableBadges.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300">Available Badges</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {availableBadges.map((badge) => (
                      <div
                        key={badge.id}
                        className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600 opacity-60"
                      >
                        <div className="text-3xl mb-2 grayscale">{badge.icon}</div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{badge.name}</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{badge.description}</p>
                        <p className="text-xs font-medium text-purple-600 dark:text-purple-400">
                          Need {badge.scoreRequired - (user?.score || 0)} more points
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Leaderboard */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 sticky top-24">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                Leaderboard
              </h2>

              <div className="space-y-3">
                {leaderboard.slice(0, 10).map((player, index) => (
                  <div
                    key={player.id}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      player.id === user?.id
                        ? 'bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 border-2 border-purple-300 dark:border-purple-700'
                        : 'bg-gray-50 dark:bg-gray-700/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-bold text-sm">
                        {player.rank}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {player.id === user?.id ? 'You' : player.name}
                          {player.rank <= 3 && <span className="ml-2">{getRankIcon(player.rank)}</span>}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{player.level}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-purple-600 dark:text-purple-400">{player.score}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">pts</p>
                    </div>
                  </div>
                ))}
              </div>

              {user && user.rank > 10 && (
                <div className="mt-4 p-3 rounded-lg bg-purple-100 dark:bg-purple-900/30 border-2 border-purple-300 dark:border-purple-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 text-white font-bold text-sm">
                        {user.rank}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">You</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{user.level}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-purple-600 dark:text-purple-400">{user.score}</p>
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
                  className="block w-full text-left px-4 py-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                >
                  <Target className="h-4 w-4 inline mr-2" />
                  View Courses
                </Link>
                <Link
                  href="/messaging"
                  className="block w-full text-left px-4 py-3 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors"
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

