'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useBadge } from '../contexts/BadgeContext';
import Navbar from '../components/Navbar';
import BadgeDisplay from '../components/BadgeDisplay';
import UserProgressCard from '../components/UserProgressCard';

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuth();
  const { userProgress, badges, loading } = useBadge();

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <div className="pt-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Profile</h1>
            <p className="text-gray-400">Please log in to view your profile.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-bold text-white">
              {user.firstName?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-gray-400 text-lg">{user.email}</p>
          </motion.div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
              <p className="text-gray-400 mt-4">Loading your profile...</p>
            </div>
          ) : userProgress ? (
            <div className="space-y-12">
              {/* Progress Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <UserProgressCard progress={userProgress} />
              </motion.div>

              {/* Badges Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <BadgeDisplay 
                  badges={badges} 
                  title="Your Achievements"
                  showProgress={true}
                />
              </motion.div>

              {/* Recent Activity */}
              {userProgress.totalQuizzesCompleted > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-gray-800 rounded-xl p-6"
                >
                  <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">📝</span>
                        <div>
                          <p className="text-white font-medium">Quizzes Completed</p>
                          <p className="text-gray-400 text-sm">
                            {userProgress.totalQuizzesCompleted} total quizzes
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-purple-400 font-bold">{userProgress.totalScore}</p>
                        <p className="text-gray-400 text-xs">Total Score</p>
                      </div>
                    </div>

                    {userProgress.currentStreak > 0 && (
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg border border-orange-500/30">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">🔥</span>
                          <div>
                            <p className="text-white font-medium">Current Streak</p>
                            <p className="text-orange-300 text-sm">
                              {userProgress.currentStreak} day{userProgress.currentStreak !== 1 ? 's' : ''} in a row!
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-orange-400 font-bold">{userProgress.currentStreak}</p>
                          <p className="text-orange-300 text-xs">Days</p>
                        </div>
                      </div>
                    )}

                    {userProgress.perfectScores > 0 && (
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded-lg border border-yellow-500/30">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">⭐</span>
                          <div>
                            <p className="text-white font-medium">Perfect Scores</p>
                            <p className="text-yellow-300 text-sm">
                              {userProgress.perfectScores} perfect quiz{userProgress.perfectScores !== 1 ? 'zes' : ''}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-yellow-400 font-bold">{userProgress.perfectScores}</p>
                          <p className="text-yellow-300 text-xs">Perfect</p>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-white mb-2">Start Your Learning Journey</h3>
              <p className="text-gray-400 mb-6">
                Complete your first quiz to see your progress and earn badges!
              </p>
              <button className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-full hover:from-purple-700 hover:to-purple-800 transition-all duration-300">
                Take Your First Quiz
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 