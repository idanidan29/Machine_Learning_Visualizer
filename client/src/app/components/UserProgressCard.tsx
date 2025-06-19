'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { UserProgress } from '../../types/badge';

interface UserProgressCardProps {
  progress: UserProgress;
  title?: string;
}

const UserProgressCard: React.FC<UserProgressCardProps> = ({ 
  progress, 
  title = "Your Progress" 
}) => {
  const stats = [
    {
      label: 'Quizzes Completed',
      value: progress.totalQuizzesCompleted,
      icon: '📝',
      color: 'from-blue-500 to-blue-600'
    },
    {
      label: 'Perfect Scores',
      value: progress.perfectScores,
      icon: '⭐',
      color: 'from-yellow-400 to-yellow-500'
    },
    {
      label: 'Total Score',
      value: progress.totalScore,
      icon: '🎯',
      color: 'from-green-500 to-green-600'
    },
    {
      label: 'Current Streak',
      value: progress.currentStreak,
      icon: '🔥',
      color: 'from-orange-500 to-orange-600'
    },
    {
      label: 'Longest Streak',
      value: progress.longestStreak,
      icon: '⚡',
      color: 'from-purple-500 to-purple-600'
    },
    {
      label: 'Badges Earned',
      value: progress.badges.length,
      icon: '🏆',
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  const algorithmStats = Object.entries(progress.algorithmQuizCounts).map(([algorithm, count]) => ({
    algorithm: algorithm.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
    count,
    icon: getAlgorithmIcon(algorithm)
  }));

  function getAlgorithmIcon(algorithm: string): string {
    const icons: Record<string, string> = {
      'decision-tree': '🌳',
      'naive-bayes': '📊',
      'k-means': '🎯',
      'knn': '📍',
      'random-forest': '🌲',
      'adaboost': '🚀',
      'dbscan': '🔍',
      'linear-regression': '📈',
      'logistic-regression': '📉',
      'deep-neural-networks': '🧠'
    };
    return icons[algorithm] || '🤖';
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white">{title}</h3>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className={`bg-gradient-to-br ${stat.color} rounded-xl p-4 text-center shadow-lg`}
          >
            <div className="text-2xl mb-2">{stat.icon}</div>
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-white/80 text-sm">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Algorithm Progress */}
      {algorithmStats.length > 0 && (
        <div className="bg-gray-800 rounded-xl p-6">
          <h4 className="text-lg font-semibold text-white mb-4">Algorithm Progress</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {algorithmStats.map((stat, index) => (
              <motion.div
                key={stat.algorithm}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-700 rounded-lg p-3 text-center hover:bg-gray-600 transition-colors"
              >
                <div className="text-xl mb-1">{stat.icon}</div>
                <div className="text-sm font-medium text-white mb-1">{stat.algorithm}</div>
                <div className="text-xs text-gray-300">{stat.count} quiz{stat.count !== 1 ? 'zes' : ''}</div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Progress Summary */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">Learning Journey</h4>
            <p className="text-purple-100 text-sm">
              You've completed {progress.totalQuizzesCompleted} quizzes and earned {progress.badges.length} badges!
            </p>
          </div>
          <div className="text-4xl">🎓</div>
        </div>
        
        {progress.currentStreak > 0 && (
          <div className="mt-4 flex items-center text-purple-100">
            <span className="text-xl mr-2">🔥</span>
            <span className="text-sm">
              {progress.currentStreak} day{progress.currentStreak !== 1 ? 's' : ''} streak! 
              {progress.currentStreak === progress.longestStreak && ' (Personal Best!)'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProgressCard; 