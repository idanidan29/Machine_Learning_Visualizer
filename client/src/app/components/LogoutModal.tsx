"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconX } from "@tabler/icons-react";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {
  useEffect(() => {
    console.log('LogoutModal isOpen:', isOpen);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <div className="shadow-input mx-auto w-full bg-gray-900 border border-gray-700 p-6 rounded-2xl">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
              >
                <IconX className="h-5 w-5" />
              </button>

              {/* Header */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                  Logout Confirmation
                </h2>
                <p className="mt-2 text-sm text-gray-300">
                  Are you sure you want to log out?
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col space-y-3">
                <button
                  onClick={onConfirm}
                  className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Yes, Logout
                </button>
                <button
                  onClick={onClose}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 