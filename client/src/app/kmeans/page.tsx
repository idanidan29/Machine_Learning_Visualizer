'use client';

import React from 'react';
import KMeansVisualization from '../components/KMeansVisualization';

export default function KMeansPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          K-Means Clustering Visualization
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <KMeansVisualization />
        </div>
        <div className="mt-8 text-gray-600">
          <h2 className="text-xl font-semibold mb-4">How it works:</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Select the number of clusters (K) using the input field</li>
            <li>Click &quot;Start&quot; to begin the clustering process</li>
            <li>Watch as the algorithm assigns points to clusters and updates centroids</li>
            <li>Use &quot;Reset&quot; to generate new random points and start over</li>
          </ol>
        </div>
      </div>
    </div>
  );
} 