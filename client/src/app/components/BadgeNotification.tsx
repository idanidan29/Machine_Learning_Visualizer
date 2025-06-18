'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '../../types/badge';
import confetti from 'canvas-confetti';

interface BadgeNotificationProps {
  badge: Badge;
  show: boolean;
  onClose: () => void;
}

const BadgeNotification: React.FC<BadgeNotificationProps> = ({ badge, show, onClose }) => {
  React.useEffect(() => {
    if (show) {
      // Trigger confetti when badge is shown
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [show]);

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'from-blue-500 to-blue-600 border-blue-400';
      case 'gold':
        return 'from-yellow-400 to-yellow-500 border-yellow-300';
      case 'yellow':
        return 'from-yellow-400 to-yellow-500 border-yellow-300';
      case 'orange':
        return 'from-orange-500 to-orange-600 border-orange-400';
      case 'purple':
        return 'from-purple-500 to-purple-600 border-purple-400';
      case 'green':
        return 'from-green-500 to-green-600 border-green-400';
      case 'red':
        return 'from-red-500 to-red-600 border-red-400';
      case 'indigo':
        return 'from-indigo-500 to-indigo-600 border-indigo-400';
      case 'diamond':
        return 'from-cyan-400 to-blue-500 border-cyan-300';
      default:
        return 'from-gray-500 to-gray-600 border-gray-400';
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -100, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed top-4 right-4 z-50 max-w-sm w-full"
        >
          <div className={`bg-gradient-to-r ${getColorClasses(badge.color)} rounded-xl p-6 shadow-2xl border-2 relative overflow-hidden`}>
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-16 -translate-y-16">
                <div className="w-full h-full bg-white rounded-full"></div>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Badge content */}
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="text-4xl mb-4 text-center"
              >
                {badge.icon}
              </motion.div>

              <motion.h3
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xl font-bold text-white mb-2 text-center"
              >
                {badge.name}
              </motion.h3>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-white/90 text-center mb-4"
              >
                {badge.description}
              </motion.p>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center"
              >
                <div className="inline-flex items-center px-3 py-1 bg-white/20 rounded-full text-white text-sm font-medium">
                  <span className="mr-2">🎉</span>
                  New Achievement!
                </div>
              </motion.div>
            </div>

            {/* Progress bar for badges with progress */}
            {badge.requiredProgress > 1 && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mt-4"
              >
                <div className="bg-white/20 rounded-full h-2">
                  <div
                    className="bg-white h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((badge.progress / badge.requiredProgress) * 100, 100)}%` }}
                  />
                </div>
                <p className="text-white/80 text-xs text-center mt-1">
                  {badge.progress}/{badge.requiredProgress}
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BadgeNotification; 