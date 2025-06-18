'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '../../types/badge';

interface BadgeDisplayProps {
  badges: Badge[];
  title?: string;
  showProgress?: boolean;
  maxDisplay?: number;
}

const BadgeDisplay: React.FC<BadgeDisplayProps> = ({ 
  badges, 
  title = "Your Badges", 
  showProgress = true,
  maxDisplay 
}) => {
  const displayBadges = maxDisplay ? badges.slice(0, maxDisplay) : badges;

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'from-blue-500 to-blue-600 border-blue-400 shadow-blue-500/20';
      case 'gold':
        return 'from-yellow-400 to-yellow-500 border-yellow-300 shadow-yellow-500/20';
      case 'yellow':
        return 'from-yellow-400 to-yellow-500 border-yellow-300 shadow-yellow-500/20';
      case 'orange':
        return 'from-orange-500 to-orange-600 border-orange-400 shadow-orange-500/20';
      case 'purple':
        return 'from-purple-500 to-purple-600 border-purple-400 shadow-purple-500/20';
      case 'green':
        return 'from-green-500 to-green-600 border-green-400 shadow-green-500/20';
      case 'red':
        return 'from-red-500 to-red-600 border-red-400 shadow-red-500/20';
      case 'indigo':
        return 'from-indigo-500 to-indigo-600 border-indigo-400 shadow-indigo-500/20';
      case 'diamond':
        return 'from-cyan-400 to-blue-500 border-cyan-300 shadow-cyan-500/20';
      default:
        return 'from-gray-500 to-gray-600 border-gray-400 shadow-gray-500/20';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (badges.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-6xl mb-4">🏆</div>
        <h3 className="text-xl font-semibold text-white mb-2">No Badges Yet</h3>
        <p className="text-gray-400">Complete quizzes to earn your first badge!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        {maxDisplay && badges.length > maxDisplay && (
          <span className="text-sm text-gray-400">
            Showing {maxDisplay} of {badges.length}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayBadges.map((badge, index) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.05, 
              y: -5,
              transition: { duration: 0.2 }
            }}
            className={`bg-gradient-to-br ${getColorClasses(badge.color)} rounded-xl p-4 border-2 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group`}
          >
            <div className="text-center">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="text-3xl mb-3"
              >
                {badge.icon}
              </motion.div>

              <h4 className="font-semibold text-white mb-2 group-hover:text-white/90 transition-colors">
                {badge.name}
              </h4>

              <p className="text-white/80 text-sm mb-3 line-clamp-2">
                {badge.description}
              </p>

              {showProgress && badge.requiredProgress > 1 && (
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-white/70 mb-1">
                    <span>Progress</span>
                    <span>{badge.progress}/{badge.requiredProgress}</span>
                  </div>
                  <div className="bg-white/20 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((badge.progress / badge.requiredProgress) * 100, 100)}%` }}
                      transition={{ delay: 0.5, duration: 1 }}
                      className="bg-white h-2 rounded-full"
                    />
                  </div>
                </div>
              )}

              <div className="text-xs text-white/60">
                Earned {formatDate(badge.earnedAt)}
              </div>

              {badge.isCompleted && (
                <div className="absolute top-2 right-2">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {maxDisplay && badges.length > maxDisplay && (
        <div className="text-center">
          <button className="text-purple-400 hover:text-purple-300 transition-colors text-sm">
            View All Badges →
          </button>
        </div>
      )}
    </div>
  );
};

export default BadgeDisplay; 