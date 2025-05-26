'use client';

import React, { useEffect, useState } from 'react';
import KMeansVisualization from '../../components/KMeansVisualization';
import Navbar from '../../components/Navbar';

export default function KMeansPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div 
            className={`text-center mb-8 transition-all duration-1000 ease-out transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <h1 
              className="text-4xl font-bold text-white mb-4 transition-all duration-1000 delay-200"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              K-Means Clustering
            </h1>
            <p 
              className="text-gray-300 max-w-2xl mx-auto transition-all duration-1000 delay-300"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              K-means clustering is an unsupervised learning algorithm that groups similar data points into clusters.
              Watch how the algorithm iteratively assigns points to the nearest centroid and updates cluster centers.
            </p>
          </div>
          <div 
            className={`transition-all duration-1000 delay-500 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <KMeansVisualization />
          </div>
        </div>
      </main>
    </div>
  );
} 