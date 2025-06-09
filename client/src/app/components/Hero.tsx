"use client"

import React, { useState } from 'react'
import Navbar from './Navbar'
import AlgorithmFilter from './AlgoFilter'
import DragCloseDrawer from './ui/DragCloseDrawer'
import { useAuth } from '../contexts/AuthContext'
import FeatureCard from './FeatureCard'

export default function HeroSection() {
  const [open, setOpen] = useState(false);
  const { openLoginModal, isAuthenticated } = useAuth();

  return (
    <>
      <Navbar />
      <section className="bg-gray-900 py-6 overflow-hidden min-h-screen flex flex-col relative">
        {/* Background elements */}
        <div className="absolute top-0 left-0 -translate-x-[54%] -translate-y-[70%] w-2/5 rounded-full aspect-square bg-purple-600/70 backdrop-filter blur-3xl opacity-50" />
        <div className="absolute bottom-0 right-0 translate-x-[54%] translate-y-[70%] w-2/5 rounded-full aspect-square bg-purple-600/70 backdrop-filter blur-3xl opacity-50" />
        <div className="absolute min-w-[300px] w-[48%] md:w-2/5 aspect-square rounded-full bg-gradient-to-r from-purple-400/5 right-0 -translate-y-[40%] translate-x-[40%] top-0">
          <div className="inset-[10%] rounded-full bg-gradient-to-l from-purple-400/20">
            <div className="absolute inset-[20%] rounded-full bg-gradient-to-l from-purple-400/30" />
          </div>
        </div>
        <div className="absolute min-w-[300px] w-[48%] md:w-2/5 aspect-square rounded-full bg-gradient-to-l from-purple-400/5 left-0 translate-y-[40%] -translate-x-[40%] bottom-0">
          <div className="inset-[10%] rounded-full bg-gradient-to-r from-purple-400/40">
            <div className="absolute inset-[20%] rounded-full bg-gradient-to-r from-purple-400/50" />
          </div>
        </div>

        {/* Content container */}
        <div className="mx-auto w-full max-w-7xl p-5 flex flex-col h-full">
          {/* Hero content */}
          <div className="flex flex-col items-center justify-center p-6 mb-8 mt-16">
            <div className="text-center flex flex-col items-center space-y-6 md:space-y-7 max-w-4xl">
              <span className="border border-gray-500 px-6 py-0.5 rounded-full bg-gray-950 bg-opacity-50 text-gray-300">
                ML Visualizer
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl/tight xl:text-6xl/tight text-white font-bold capitalize text-center">
                Explore and Understand ML Algorithms Visually
              </h1>
              <p className="text-base text-gray-300 text-center max-w-xl">
                Interactively visualize KNN, decision trees, clustering, and more. Change parameters on the fly and see how algorithms make decisions in real time.
              </p>
              <div className="flex justify-center gap-4 pb-8">
                <button
                  onClick={() => setOpen(true)}
                  className="group relative px-8 py-3 text-base font-medium text-white transition-all duration-300 ease-out hover:scale-102"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Instructions
                    <svg 
                      className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M13 7l5 5m0 0l-5 5m5-5H6" 
                      />
                    </svg>
                  </span>
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/90 to-purple-500/90 opacity-100 transition-opacity duration-300 group-hover:opacity-90"></span>
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/50 to-purple-500/50 blur-md opacity-30 transition-opacity duration-300 group-hover:opacity-40"></span>
                </button>

                {!isAuthenticated && (
                  <button
                    onClick={openLoginModal}
                    className="group relative px-8 py-3 text-base font-medium text-white transition-all duration-300 ease-out hover:scale-102"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Log In
                      <svg 
                        className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" 
                        />
                      </svg>
                    </span>
                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-100 transition-opacity duration-300 group-hover:opacity-90"></span>
                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 blur-md opacity-30 transition-opacity duration-300 group-hover:opacity-40"></span>
                  </button>
                )}
              </div>

              {/* Feature Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
                <FeatureCard
                  emoji="🎯"
                  title="Interactive Learning"
                  description="Experiment with parameters and see real-time updates in the visualizations."
                />
                <FeatureCard
                  emoji="📊"
                  title="Multiple Algorithms"
                  description="Explore various ML algorithms with detailed explanations and examples."
                />
                <FeatureCard
                  emoji="🎓"
                  title="Learn by Doing"
                  description="Test your knowledge with interactive quizzes and practical examples."
                />
              </div>
            </div>
          </div>

          {/* Algorithm Filter Section */}
          <div id="algorithms" className="mt-8">
            <AlgorithmFilter />
          </div>
        </div>
      </section>

      <DragCloseDrawer open={open} setOpen={setOpen}>
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6 text-gray-200">
          <div className="text-center mb-6">
            <h2 className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Welcome to ML Visualizer
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4 bg-gray-800/50 p-5 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
              <h3 className="text-xl font-semibold text-purple-400 flex items-center gap-2">
                <span className="text-2xl">✨</span> About This App
              </h3>
              <p className="text-gray-300 leading-relaxed">
                ML Visualizer is an interactive platform designed to help you understand machine learning algorithms through visual demonstrations. 
                Whether you&apos;re a student, researcher, or ML enthusiast, this tool provides an intuitive way to explore and experiment with various algorithms.
              </p>
            </div>

            <div className="space-y-4 bg-gray-800/50 p-5 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
              <h3 className="text-xl font-semibold text-purple-400 flex items-center gap-2">
                <span className="text-2xl">💡</span> Learning Tips
              </h3>
              <ul className="list-none space-y-2 text-gray-300">
                <li className="flex items-start gap-3 group">
                  <span className="text-purple-400 group-hover:text-purple-300 transition-colors">•</span>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">Start with simpler algorithms like KNN to understand basic concepts.</p>
                </li>
                <li className="flex items-start gap-3 group">
                  <span className="text-purple-400 group-hover:text-purple-300 transition-colors">•</span>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">Experiment with different parameter values to see their effects.</p>
                </li>
                <li className="flex items-start gap-3 group">
                  <span className="text-purple-400 group-hover:text-purple-300 transition-colors">•</span>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">Test your knowledge with interactive quizzes at the end of each algorithm page.</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-4 bg-gray-800/50 p-5 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
            <h3 className="text-xl font-semibold text-purple-400 flex items-center gap-2">
              <span className="text-2xl">🚀</span> Key Features
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ul className="list-none space-y-3 text-gray-300">
                <li className="flex items-start gap-3 group">
                  <span className="text-purple-400 group-hover:text-purple-300 transition-colors">•</span>
                  <div>
                    <span className="font-medium text-white group-hover:text-purple-300 transition-colors">Interactive Visualizations:</span>
                    <p className="text-gray-400">See algorithms in action with real-time updates as you modify parameters.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 group">
                  <span className="text-purple-400 group-hover:text-purple-300 transition-colors">•</span>
                  <div>
                    <span className="font-medium text-white group-hover:text-purple-300 transition-colors">Multiple Algorithms:</span>
                    <p className="text-gray-400">Explore KNN, Decision Trees, K-Means, and more with detailed explanations.</p>
                  </div>
                </li>
              </ul>
              <ul className="list-none space-y-3 text-gray-300">
                <li className="flex items-start gap-3 group">
                  <span className="text-purple-400 group-hover:text-purple-300 transition-colors">•</span>
                  <div>
                    <span className="font-medium text-white group-hover:text-purple-300 transition-colors">Parameter Tuning:</span>
                    <p className="text-gray-400">Adjust algorithm parameters and instantly see their impact on the results.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 group">
                  <span className="text-purple-400 group-hover:text-purple-300 transition-colors">•</span>
                  <div>
                    <span className="font-medium text-white group-hover:text-purple-300 transition-colors">Custom Data Points:</span>
                    <p className="text-gray-400">Add your own data points to test algorithm behavior in different scenarios.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4 bg-gray-800/50 p-5 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
              <h3 className="text-xl font-semibold text-purple-400 flex items-center gap-2">
                <span className="text-2xl">🎯</span> Getting Started
              </h3>
              <ol className="list-none space-y-3 text-gray-300">
                <li className="flex items-start gap-3 group">
                  <span className="text-purple-400 group-hover:text-purple-300 transition-colors">1.</span>
                  <div>
                    <span className="font-medium text-white group-hover:text-purple-300 transition-colors">Choose an Algorithm:</span>
                    <p className="text-gray-400">Select from the available algorithms in the navigation panel.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 group">
                  <span className="text-purple-400 group-hover:text-purple-300 transition-colors">2.</span>
                  <div>
                    <span className="font-medium text-white group-hover:text-purple-300 transition-colors">Explore Parameters:</span>
                    <p className="text-gray-400">Use the interactive controls to modify algorithm settings.</p>
                  </div>
                </li>
              </ol>
            </div>

            <div className="space-y-4 bg-gray-800/50 p-5 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
              <h3 className="text-xl font-semibold text-purple-400 flex items-center gap-2">
                <span className="text-2xl">❓</span> Need Help?
              </h3>
              <p className="text-gray-300 leading-relaxed">
                If you have any questions or need assistance, feel free to explore the documentation or reach out to our support team. 
                We&apos;re here to help you make the most of your machine learning journey!
              </p>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <button
              onClick={() => {
                setOpen(false);
                document.getElementById('algorithms')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative px-8 py-3 text-lg font-medium text-white transition-all duration-300 ease-out hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                I&apos;m Ready to Start
                <svg 
                  className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 7l5 5m0 0l-5 5m5-5H6" 
                  />
                </svg>
              </span>
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-100 transition-opacity duration-300 group-hover:opacity-90"></span>
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 blur-lg opacity-50 transition-opacity duration-300 group-hover:opacity-70"></span>
            </button>
          </div>
        </div>
      </DragCloseDrawer>
    </>
  )
}
