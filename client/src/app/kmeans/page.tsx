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
              K-Means Clustering
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

          {/* Documentation Sections */}
          <div className="space-y-12">
            {/* Overview Section */}
            <section className="bg-gray-800 rounded-xl shadow-xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">Overview</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300">
                  K-means clustering is an unsupervised learning algorithm that groups similar data points into clusters.
                  It's one of the most popular and widely used clustering algorithms in machine learning. The algorithm
                  works by partitioning a dataset into K distinct, non-overlapping groups where each data point belongs
                  to the cluster with the nearest mean (centroid).
                </p>
              </div>
            </section>

            {/* When to Use It Section */}
            <section className="bg-gray-800 rounded-xl shadow-xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">When to Use It</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-purple-400 mb-2">Ideal Use Cases</h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    <li>Customer segmentation in marketing</li>
                    <li>Image compression and color quantization</li>
                    <li>Document clustering and topic modeling</li>
                    <li>Anomaly detection</li>
                    <li>Data preprocessing and dimensionality reduction</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-purple-400 mb-2">Assumptions</h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    <li>Clusters are spherical and of similar size</li>
                    <li>Data points are independent of each other</li>
                    <li>Features are equally important</li>
                    <li>The number of clusters (K) is known in advance</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How It Works Section */}
            <section className="bg-gray-800 rounded-xl shadow-xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">How It Works</h2>
              <div className="space-y-4">
                <p className="text-gray-300">
                  The K-means algorithm works through an iterative process:
                </p>
                <ol className="list-decimal list-inside text-gray-300 space-y-2">
                  <li>Randomly initialize K centroids in the feature space</li>
                  <li>Assign each data point to the nearest centroid</li>
                  <li>Recalculate centroids by computing the mean of all points in each cluster</li>
                  <li>Repeat steps 2-3 until convergence (centroids no longer move significantly)</li>
                </ol>
                <p className="text-gray-300 mt-4">
                  The algorithm minimizes the within-cluster sum of squares, effectively creating
                  compact, well-separated clusters.
                </p>
              </div>
            </section>

            {/* Pseudo-code Section */}
            <section className="bg-gray-800 rounded-xl shadow-xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">Pseudo-code</h2>
              <div className="bg-gray-900 rounded-lg p-4">
                <pre className="text-gray-300 font-mono text-sm">
{`function KMeans(data, k):
    # Initialize k centroids randomly
    centroids = random_points(data, k)
    
    while not converged:
        # Assign points to nearest centroid
        clusters = [[] for _ in range(k)]
        for point in data:
            nearest_centroid = find_nearest_centroid(point, centroids)
            clusters[nearest_centroid].append(point)
        
        # Update centroids
        new_centroids = []
        for cluster in clusters:
            if cluster:
                new_centroid = calculate_mean(cluster)
                new_centroids.append(new_centroid)
        
        # Check convergence
        if centroids == new_centroids:
            converged = True
        else:
            centroids = new_centroids
    
    return clusters, centroids`}
                </pre>
              </div>
            </section>

            {/* Key Characteristics Section */}
            <section className="bg-gray-800 rounded-xl shadow-xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">Key Characteristics</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-purple-400 mb-2">Type & Category</h3>
                    <ul className="text-gray-300 space-y-2">
                      <li>Type: Unsupervised Learning</li>
                      <li>Category: Clustering</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-purple-400 mb-2">Strengths</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                      <li>Simple and easy to implement</li>
                      <li>Scales well to large datasets</li>
                      <li>Guarantees convergence</li>
                      <li>Works well with spherical clusters</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-purple-400 mb-2">Complexity</h3>
                    <ul className="text-gray-300 space-y-2">
                      <li>Time Complexity: O(n * k * i * d)</li>
                      <li>Space Complexity: O(n * d + k * d)</li>
                      <li>where:</li>
                      <li>n = number of data points</li>
                      <li>k = number of clusters</li>
                      <li>i = number of iterations</li>
                      <li>d = number of dimensions</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-purple-400 mb-2">Limitations</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                      <li>Requires specifying number of clusters</li>
                      <li>Sensitive to initial centroid positions</li>
                      <li>Assumes spherical clusters</li>
                      <li>Can get stuck in local optima</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* When Not to Use It Section */}
            <section className="bg-gray-800 rounded-xl shadow-xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">When Not to Use It</h2>
              <div className="space-y-4">
                <p className="text-gray-300">
                  K-means clustering may not be suitable in the following scenarios:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>When clusters have non-spherical shapes</li>
                  <li>When clusters have significantly different sizes</li>
                  <li>When the number of clusters is unknown</li>
                  <li>When data contains many outliers</li>
                  <li>When features have different scales or importance</li>
                  <li>When clusters overlap significantly</li>
                </ul>
                <p className="text-gray-300 mt-4">
                  In these cases, consider alternative clustering algorithms like DBSCAN,
                  hierarchical clustering, or Gaussian mixture models.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
} 