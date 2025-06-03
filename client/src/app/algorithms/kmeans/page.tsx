'use client';

import React, { useState } from 'react';
import KMeansVisualization from '../../components/visualizations/KMeansVisualization';
import Navbar from '../../components/Navbar';
import Quiz from '../../components/Quiz';
import TableOfContents from '../../components/TableOfContents';
import Code from '../../components/ui/Code';
import PageHeader from '../../components/ui/PageHeader';
import Formula from '../../components/ui/Formula';
import HowItWorks from '../../components/ui/HowItWorks';
import WhenToUse from '../../components/ui/WhenToUse';

export default function KMeansPage() {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', title: 'Overview', icon: '📋' },
    { id: 'visualization', title: 'Visualization', icon: '🎯' },
    { id: 'how-it-works', title: 'How It Works', icon: '⚙️' },
    { id: 'when-to-use', title: 'When to Use', icon: '⏰' },
    { id: 'formulas', title: 'Formulas', icon: '📐' },
    { id: 'practical-example', title: 'Practical Example', icon: '📝' },
    { id: 'pseudocode', title: 'Pseudo-code', icon: '💻' },
    { id: 'characteristics', title: 'Characteristics', icon: '📊' },
    { id: 'limitations', title: 'Limitations', icon: '⚠️' },
    { id: 'quiz', title: 'Quiz', icon: '❓' }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <TableOfContents
            sections={sections}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />

          {/* Main Content */}
          <div className="lg:ml-72">
            <PageHeader
              title="K-Means Clustering"
              description="Watch how the K-means algorithm groups similar data points into clusters. Experiment with different numbers of clusters and observe how the algorithm iteratively assigns points and updates cluster centers."
              onQuizClick={() => {
                const section = document.getElementById('quiz');
                if (section) {
                  section.scrollIntoView({ behavior: 'smooth' });
                  setActiveSection('quiz');
                }
              }}
            />

            {/* Content Sections */}
            <div className="space-y-6">
              {/* Overview Section */}
              <section id="overview" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Overview</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 text-sm sm:text-base">
                    K-means clustering is an unsupervised learning algorithm that groups similar data points into clusters.
                    It&apos;s one of the most popular and widely used clustering algorithms in machine learning. The algorithm
                    works by partitioning a dataset into K distinct, non-overlapping groups where each data point belongs
                    to the cluster with the nearest mean (centroid).
                  </p>
                </div>
              </section>

              {/* Visualization Section */}
              <section id="visualization" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <KMeansVisualization />
              </section>

              {/* Documentation Sections */}
              <div className="space-y-6">

                {/* How It Works Section */}
                <HowItWorks
                  title="How It Works"
                  steps={[
                    { number: 1, description: "Randomly initialize K centroids in the feature space" },
                    { number: 2, description: "Assign each data point to the nearest centroid" },
                    { number: 3, description: "Recalculate centroids by computing the mean of all points in each cluster" },
                    { number: 4, description: "Repeat steps 2-3 until convergence (centroids no longer move significantly)" }
                  ]}
                />

                {/* When to Use Section */}
                <WhenToUse
                  idealUseCases={{
                    title: "Ideal Use Cases",
                    items: [
                      "Customer segmentation in marketing",
                      "Image compression and color quantization",
                      "Document clustering and topic modeling",
                      "Anomaly detection",
                      "Data preprocessing and dimensionality reduction"
                    ]
                  }}
                  keyAdvantages={{
                    title: "Key Advantages",
                    items: [
                      "Simple and easy to implement",
                      "Scales well to large datasets",
                      "Guarantees convergence",
                      "Works well with spherical clusters",
                      "Fast and efficient for large datasets"
                    ]
                  }}
                />

                

                {/* Mathematical Formulas Section */}
                <section id="formulas" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                  <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Mathematical Formulas</h2>
                  <div className="space-y-8">
                    <Formula
                      title="Objective Function"
                      formula="J = ∑ᵢ₌₁ᵏ ∑ₓ∈Cᵢ ||x - μᵢ||²"
                      variables={[
                        { name: "J", description: "the objective function to minimize" },
                        { name: "k", description: "the number of clusters" },
                        { name: "Cᵢ", description: "represents the i-th cluster" },
                        { name: "μᵢ", description: "is the centroid of cluster i" },
                        { name: "||x - μᵢ||²", description: "is the squared Euclidean distance" }
                      ]}
                      gradient="purple-blue"
                    />

                    <Formula
                      title="Centroid Update"
                      formula="μᵢ = (1/|Cᵢ|) ∑ₓ∈Cᵢ x"
                      variables={[
                        { name: "μᵢ", description: "is the new centroid position" },
                        { name: "|Cᵢ|", description: "is the number of points in cluster i" },
                        { name: "x", description: "represents each data point in the cluster" }
                      ]}
                      gradient="blue-purple"
                    />

                    <Formula
                      title="Distance Calculation"
                      formula="d(x, μ) = √(∑ⱼ₌₁ᵈ (xⱼ - μⱼ)²)"
                      variables={[
                        { name: "d", description: "is the number of dimensions" },
                        { name: "xⱼ", description: "is the j-th coordinate of point x" },
                        { name: "μⱼ", description: "is the j-th coordinate of centroid μ" }
                      ]}
                      gradient="purple-blue"
                    />

                    <div className="bg-purple-900/30 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-purple-400 mb-2">Key Insights</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm sm:text-base">
                        <li>The objective function measures the total squared distance between points and their cluster centroids</li>
                        <li>The centroid update formula ensures each centroid is the mean of all points in its cluster</li>
                        <li>The distance calculation uses Euclidean distance, which assumes spherical clusters</li>
                        <li>The algorithm converges when the objective function reaches a local minimum</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Practical Example Section */}
                <section id="practical-example" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                  <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Practical Example: Customer Segmentation</h2>
                  <div className="space-y-6">
                    <p className="text-gray-300 text-sm sm:text-base">
                      Let&apos;s solve a customer segmentation problem using K-means clustering. We&apos;ll analyze customer spending patterns
                      to identify distinct customer groups.
                    </p>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-purple-400">Step 1: Data Preparation</h3>
                      <p className="text-gray-300 text-sm sm:text-base">
                        We have a dataset of customer spending in two categories: Groceries and Electronics.
                      </p>
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-gray-900 rounded-lg">
                          <thead>
                            <tr className="text-gray-300">
                              <th className="px-4 py-2">Customer ID</th>
                              <th className="px-4 py-2">Groceries ($)</th>
                              <th className="px-4 py-2">Electronics ($)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="text-gray-300">
                              <td className="px-4 py-2 border-t border-gray-700">1</td>
                              <td className="px-4 py-2 border-t border-gray-700">1200</td>
                              <td className="px-4 py-2 border-t border-gray-700">300</td>
                            </tr>
                            <tr className="text-gray-300">
                              <td className="px-4 py-2 border-t border-gray-700">2</td>
                              <td className="px-4 py-2 border-t border-gray-700">800</td>
                              <td className="px-4 py-2 border-t border-gray-700">1200</td>
                            </tr>
                            <tr className="text-gray-300">
                              <td className="px-4 py-2 border-t border-gray-700">3</td>
                              <td className="px-4 py-2 border-t border-gray-700">1500</td>
                              <td className="px-4 py-2 border-t border-gray-700">200</td>
                            </tr>
                            <tr className="text-gray-300">
                              <td className="px-4 py-2 border-t border-gray-700">4</td>
                              <td className="px-4 py-2 border-t border-gray-700">600</td>
                              <td className="px-4 py-2 border-t border-gray-700">1500</td>
                            </tr>
                            <tr className="text-gray-300">
                              <td className="px-4 py-2 border-t border-gray-700">5</td>
                              <td className="px-4 py-2 border-t border-gray-700">1000</td>
                              <td className="px-4 py-2 border-t border-gray-700">800</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-purple-400">Step 2: Initialization (K=2)</h3>
                      <p className="text-gray-300 text-sm sm:text-base">
                        Randomly initialize two centroids:
                      </p>
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-gray-900 rounded-lg">
                          <thead>
                            <tr className="text-gray-300">
                              <th className="px-4 py-2">Centroid</th>
                              <th className="px-4 py-2">Groceries ($)</th>
                              <th className="px-4 py-2">Electronics ($)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="text-gray-300">
                              <td className="px-4 py-2 border-t border-gray-700">C1</td>
                              <td className="px-4 py-2 border-t border-gray-700">1000</td>
                              <td className="px-4 py-2 border-t border-gray-700">500</td>
                            </tr>
                            <tr className="text-gray-300">
                              <td className="px-4 py-2 border-t border-gray-700">C2</td>
                              <td className="px-4 py-2 border-t border-gray-700">700</td>
                              <td className="px-4 py-2 border-t border-gray-700">1000</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-purple-400">Step 3: First Iteration</h3>
                      <p className="text-gray-300 text-sm sm:text-base">
                        Assign points to nearest centroid and recalculate centroids:
                      </p>
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-gray-900 rounded-lg">
                          <thead>
                            <tr className="text-gray-300">
                              <th className="px-4 py-2">Customer ID</th>
                              <th className="px-4 py-2">Assigned Cluster</th>
                              <th className="px-4 py-2">Distance to C1</th>
                              <th className="px-4 py-2">Distance to C2</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="text-gray-300">
                              <td className="px-4 py-2 border-t border-gray-700">1</td>
                              <td className="px-4 py-2 border-t border-gray-700">C1</td>
                              <td className="px-4 py-2 border-t border-gray-700">200</td>
                              <td className="px-4 py-2 border-t border-gray-700">700</td>
                            </tr>
                            <tr className="text-gray-300">
                              <td className="px-4 py-2 border-t border-gray-700">2</td>
                              <td className="px-4 py-2 border-t border-gray-700">C2</td>
                              <td className="px-4 py-2 border-t border-gray-700">500</td>
                              <td className="px-4 py-2 border-t border-gray-700">200</td>
                            </tr>
                            <tr className="text-gray-300">
                              <td className="px-4 py-2 border-t border-gray-700">3</td>
                              <td className="px-4 py-2 border-t border-gray-700">C1</td>
                              <td className="px-4 py-2 border-t border-gray-700">300</td>
                              <td className="px-4 py-2 border-t border-gray-700">800</td>
                            </tr>
                            <tr className="text-gray-300">
                              <td className="px-4 py-2 border-t border-gray-700">4</td>
                              <td className="px-4 py-2 border-t border-gray-700">C2</td>
                              <td className="px-4 py-2 border-t border-gray-700">600</td>
                              <td className="px-4 py-2 border-t border-gray-700">500</td>
                            </tr>
                            <tr className="text-gray-300">
                              <td className="px-4 py-2 border-t border-gray-700">5</td>
                              <td className="px-4 py-2 border-t border-gray-700">C1</td>
                              <td className="px-4 py-2 border-t border-gray-700">300</td>
                              <td className="px-4 py-2 border-t border-gray-700">400</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-purple-400">Step 4: New Centroids</h3>
                      <p className="text-gray-300 text-sm sm:text-base">
                        Calculate new centroids based on cluster assignments:
                      </p>
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-gray-900 rounded-lg">
                          <thead>
                            <tr className="text-gray-300">
                              <th className="px-4 py-2">Cluster</th>
                              <th className="px-4 py-2">New Groceries ($)</th>
                              <th className="px-4 py-2">New Electronics ($)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="text-gray-300">
                              <td className="px-4 py-2 border-t border-gray-700">C1</td>
                              <td className="px-4 py-2 border-t border-gray-700">1233</td>
                              <td className="px-4 py-2 border-t border-gray-700">433</td>
                            </tr>
                            <tr className="text-gray-300">
                              <td className="px-4 py-2 border-t border-gray-700">C2</td>
                              <td className="px-4 py-2 border-t border-gray-700">700</td>
                              <td className="px-4 py-2 border-t border-gray-700">1350</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-purple-400">Step 5: Final Results</h3>
                      <p className="text-gray-300 text-sm sm:text-base">
                        After convergence, we identify two distinct customer segments:
                      </p>
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-gray-900 rounded-lg">
                          <thead>
                            <tr className="text-gray-300">
                              <th className="px-4 py-2">Cluster</th>
                              <th className="px-4 py-2">Characteristics</th>
                              <th className="px-4 py-2">Customers</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="text-gray-300">
                              <td className="px-4 py-2 border-t border-gray-700">Cluster 1</td>
                              <td className="px-4 py-2 border-t border-gray-700">High grocery spenders, low electronics</td>
                              <td className="px-4 py-2 border-t border-gray-700">1, 3, 5</td>
                            </tr>
                            <tr className="text-gray-300">
                              <td className="px-4 py-2 border-t border-gray-700">Cluster 2</td>
                              <td className="px-4 py-2 border-t border-gray-700">Low grocery spenders, high electronics</td>
                              <td className="px-4 py-2 border-t border-gray-700">2, 4</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="bg-purple-900/30 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-purple-400 mb-2">Key Insights</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm sm:text-base">
                        <li>Cluster 1 represents customers who spend more on groceries and less on electronics</li>
                        <li>Cluster 2 represents customers who spend more on electronics and less on groceries</li>
                        <li>This segmentation can help in targeted marketing and personalized recommendations</li>
                        <li>The algorithm converged after just a few iterations due to the clear separation in spending patterns</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Pseudo-code Section */}
                <section id="pseudocode" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                  <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Pseudo-code</h2>
                  <Code
                    code={`function KMeans(data, k):
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
                    language="python"
                  />
                </section>

                {/* Key Characteristics Section */}
                <section id="characteristics" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                  <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Key Characteristics</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium text-purple-400 mb-2">Type & Category</h3>
                        <ul className="text-gray-300 space-y-2 text-sm sm:text-base">
                          <li>Type: Unsupervised Learning</li>
                          <li>Category: Clustering</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-purple-400 mb-2">Strengths</h3>
                        <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm sm:text-base">
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
                        <ul className="text-gray-300 space-y-2 text-sm sm:text-base">
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
                        <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm sm:text-base">
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
                <section id="limitations" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                  <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">When Not to Use It</h2>
                  <div className="space-y-4">
                    <p className="text-gray-300 text-sm sm:text-base">
                      K-means clustering may not be suitable in the following scenarios:
                    </p>
                    <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm sm:text-base">
                      <li>When clusters have non-spherical shapes</li>
                      <li>When clusters have significantly different sizes</li>
                      <li>When the number of clusters is unknown</li>
                      <li>When data contains many outliers</li>
                      <li>When features have different scales or importance</li>
                      <li>When clusters overlap significantly</li>
                    </ul>
                    <p className="text-gray-300 text-sm sm:text-base mt-4">
                      In these cases, consider alternative clustering algorithms like DBSCAN,
                      hierarchical clustering, or Gaussian mixture models.
                    </p>
                  </div>
                </section>

                {/* Quiz Section */}
                <section id="quiz" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                  <Quiz algorithm="k-means" />
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 