'use client';

import React, { useState } from 'react';
import KMeansVisualization from '../../components/visualizations/KMeansVisualization';
import Navbar from '../../components/Navbar';
import Quiz from '../../components/Quiz';
import TableOfContents from '../../components/TableOfContents';

export default function KMeansPage() {
  const [activeSection, setActiveSection] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMobileMenuOpen(false);
    }
  };

  const sections = [
    { id: 'overview', title: 'Overview', icon: '📋' },
    { id: 'visualization', title: 'Visualization', icon: '🎯' },
    { id: 'when-to-use', title: 'When to Use', icon: '⏰' },
    { id: 'how-it-works', title: 'How It Works', icon: '⚙️' },
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

          {/* Mobile Table of Contents Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="fixed bottom-6 right-6 z-50 lg:hidden bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-colors duration-200"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Mobile Table of Contents Drawer */}
          <div
            className={`fixed inset-0 bg-gray-900/80 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
              isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div
              className={`fixed right-0 top-0 h-full w-64 bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out ${
                isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-4">Contents</h3>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                        activeSection === section.id
                          ? 'bg-purple-600 text-white'
                          : 'text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      <span className="text-lg">{section.icon}</span>
                      <span className="font-medium">{section.title}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Desktop Table of Contents */}
          <div className="hidden lg:block fixed top-24 left-4 w-64">
            <div className="bg-gray-800 rounded-xl shadow-xl p-4">
              <h3 className="text-lg font-semibold text-white mb-4">Contents</h3>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                      activeSection === section.id
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <span className="text-lg">{section.icon}</span>
                    <span className="font-medium">{section.title}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:ml-72">
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                K-Means Clustering
              </h1>
              <p className="text-gray-300 max-w-2xl mx-auto mb-6 text-sm sm:text-base">
                Watch how the K-means algorithm groups similar data points into clusters.
                Experiment with different numbers of clusters and observe how the algorithm
                iteratively assigns points and updates cluster centers.
              </p>
              <button
                onClick={() => {
                  const section = document.getElementById('quiz');
                  if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                    setActiveSection('quiz');
                  }
                }}
                className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-purple-600 text-white text-sm sm:text-base font-medium hover:bg-purple-700 transition-colors duration-200 shadow-lg shadow-purple-600/20 hover:shadow-purple-600/30"
              >
                Test Your Knowledge
                <svg
                  className="ml-2 w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </button>
            </div>

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
                {/* When to Use It Section */}
                <section id="when-to-use" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                  <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">When to Use It</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium text-purple-400 mb-2">Ideal Use Cases</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm sm:text-base">
                        <li>Customer segmentation in marketing</li>
                        <li>Image compression and color quantization</li>
                        <li>Document clustering and topic modeling</li>
                        <li>Anomaly detection</li>
                        <li>Data preprocessing and dimensionality reduction</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-purple-400 mb-2">Assumptions</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm sm:text-base">
                        <li>Clusters are spherical and of similar size</li>
                        <li>Data points are independent of each other</li>
                        <li>Features are equally important</li>
                        <li>The number of clusters (K) is known in advance</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* How It Works Section */}
                <section id="how-it-works" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                  <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">How It Works</h2>
                  <div className="space-y-4">
                    <p className="text-gray-300 text-sm sm:text-base">
                      The K-means algorithm works through an iterative process:
                    </p>
                    <ol className="list-decimal list-inside text-gray-300 space-y-2 text-sm sm:text-base">
                      <li>Randomly initialize K centroids in the feature space</li>
                      <li>Assign each data point to the nearest centroid</li>
                      <li>Recalculate centroids by computing the mean of all points in each cluster</li>
                      <li>Repeat steps 2-3 until convergence (centroids no longer move significantly)</li>
                    </ol>
                    <p className="text-gray-300 text-sm sm:text-base mt-4">
                      The algorithm minimizes the within-cluster sum of squares, effectively creating
                      compact, well-separated clusters.
                    </p>
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
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-gray-300 font-mono text-sm md:text-base whitespace-pre-wrap md:whitespace-pre">
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