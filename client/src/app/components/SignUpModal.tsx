"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/app/lib/utils";
import { Toast } from "./ui/toast";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconX,
} from "@tabler/icons-react";

export function SignUpModal() {
  const { showSignUpModal, closeSignUpModal, signUp, openLoginModal, initiateOAuth } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await signUp(email, password, firstName, lastName);
      if (success) {
        setShowSuccess(true);
        // Close the modal after a short delay to show the success message
        setTimeout(() => {
          closeSignUpModal();
        }, 1500);
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setError('');
    setShowSuccess(false);
    closeSignUpModal();
  };

  const handleLoginClick = () => {
    closeSignUpModal();
    openLoginModal();
  };

  const handleGoogleSignUp = (e: React.MouseEvent) => {
    e.preventDefault();
    initiateOAuth('google');
  };

  const handleGitHubSignUp = (e: React.MouseEvent) => {
    e.preventDefault();
    initiateOAuth('github');
  };

  return (
    <>
      <AnimatePresence>
        {showSignUpModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto"
            onClick={handleClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-md my-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="shadow-input mx-auto w-full bg-gray-900 border border-gray-700 p-4 rounded-2xl md:p-6">
                {/* Close button */}
                <button
                  onClick={handleClose}
                  className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <IconX className="h-5 w-5" />
                </button>

                {/* Header */}
                <div className="text-center mb-4">
                  <h2 className="text-xl font-bold text-white">
                    Create an Account
                  </h2>
                  <p className="mt-1 text-sm text-gray-300">
                    Sign up to access all algorithm visualizations
                  </p>
                </div>

                {/* Error message */}
                {error && (
                  <div className="mb-3 p-2 bg-red-900/30 border border-red-700 rounded-md">
                    <p className="text-red-300 text-sm">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <LabelInputContainer>
                      <Label htmlFor="first-name">First Name</Label>
                      <Input
                        id="first-name"
                        placeholder="John"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </LabelInputContainer>
                    
                    <LabelInputContainer>
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input
                        id="last-name"
                        placeholder="Doe"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </LabelInputContainer>
                  </div>

                  <LabelInputContainer className="mb-3">
                    <Label htmlFor="signup-email">Email Address</Label>
                    <Input
                      id="signup-email"
                      placeholder="your.email@example.com"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </LabelInputContainer>

                  <LabelInputContainer className="mb-4">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      placeholder="••••••••"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </LabelInputContainer>

                  <button
                    className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br font-medium text-white bg-purple-600 hover:bg-purple-700 from-purple-600 to-purple-700 shadow-[0px_1px_0px_0px_#8b5cf6_inset,0px_-1px_0px_0px_#8b5cf6_inset] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating Account...' : 'Sign Up & Continue'}
                    <BottomGradient />
                  </button>

                  <div className="my-4 h-[1px] w-full bg-gradient-to-r from-transparent to-transparent via-gray-600" />

                  <div className="flex flex-col space-y-2">
                    <button
                      className="group/btn shadow-input relative flex h-9 w-full items-center justify-center space-x-2 rounded-md px-4 font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 border border-gray-600 transition-colors duration-200"
                      type="button"
                      onClick={handleGitHubSignUp}
                    >
                      <IconBrandGithub className="h-4 w-4" />
                      <span className="text-sm">Sign up with GitHub</span>
                    </button>
                    
                    <button
                      className="group/btn shadow-input relative flex h-9 w-full items-center justify-center space-x-2 rounded-md px-4 font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 border border-gray-600 transition-colors duration-200"
                      type="button"
                      onClick={handleGoogleSignUp}
                    >
                      <IconBrandGoogle className="h-4 w-4" />
                      <span className="text-sm">Sign up with Google</span>
                    </button>
                  </div>
                </form>

                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-400">
                    Already have an account?{' '}
                    <button 
                      className="text-purple-400 hover:text-purple-300 transition-colors"
                      onClick={handleLoginClick}
                    >
                      Log in here
                    </button>
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Toast */}
      {showSuccess && (
        <Toast
          message="Account created successfully! Welcome to the app!"
          type="success"
          onClose={() => setShowSuccess(false)}
        />
      )}
    </>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-1", className)}>
      {children}
    </div>
  );
}; 