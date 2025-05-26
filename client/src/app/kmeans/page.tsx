'use client';

import React from 'react';
import KMeansVisualization from '../components/KMeansVisualization';
import Navbar from '../components/Navbar';

export default function KMeansPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              K-Means Clustering Visualization
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Watch how the K-means algorithm groups similar data points into clusters.
              Experiment with different numbers of clusters and observe how the algorithm
              iteratively assigns points and updates cluster centers.
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl shadow-xl p-6 mb-8">
            <KMeansVisualization />
          </div>

          <div className="bg-gray-800 rounded-xl shadow-xl p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">How it works:</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-purple-600 text-white font-semibold">1</span>
                  <p className="text-gray-300">Select the number of clusters (K) using the input field</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-purple-600 text-white font-semibold">2</span>
                  <p className="text-gray-300">Click &quot;Start&quot; to begin the clustering process</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-purple-600 text-white font-semibold">3</span>
                  <p className="text-gray-300">Watch as the algorithm assigns points to clusters and updates centroids</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-purple-600 text-white font-semibold">4</span>
                  <p className="text-gray-300">Use "Reset&quot; to generate new random points and start over</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 