'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Quiz from '../../components/Quiz';
import TableOfContents from '../../components/TableOfContents';
import Code from '../../components/ui/Code';
import PageHeader from '../../components/ui/PageHeader';
import Formula from '../../components/ui/Formula';
import HowItWorks from '../../components/ui/HowItWorks';
import WhenToUse from '../../components/ui/WhenToUse';
import { dbscanImplementation } from '../../data/psudo-code/dbscan';
import { dbscanQuiz } from '../../data/quizzes/dbscan';
import DBSCANVisualization from '../../components/visualizations/DBSCANVisualization';

export default function DBSCANPage() {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', title: 'Overview', icon: '📋' },
    { id: 'visualization', title: 'Visualization', icon: '🎯' },
    { id: 'how-it-works', title: 'How It Works', icon: '⚙️' },
    { id: 'when-to-use', title: 'When to Use', icon: '⏰' },
    { id: 'formulas', title: 'Formulas', icon: '📐' },
    { id: 'practical-example', title: 'Practical Example', icon: '📝' },
    { id: 'characteristics', title: 'Characteristics', icon: '📊' },
    { id: 'limitations', title: 'Limitations', icon: '⚠️' },
    { id: 'pseudocode', title: 'Pseudo-code', icon: '💻' },
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
              title="DBSCAN (Density-Based Spatial Clustering of Applications with Noise)"
              description="Explore how DBSCAN identifies clusters based on density and handles noise points. Visualize how the algorithm groups data points into clusters of varying shapes."
              onQuizClick={() => {
                const section = document.getElementById('quiz');
                if (section) {
                  section.scrollIntoView({ behavior: 'smooth' });
                  setActiveSection('quiz');
                }
              }}
            />

            <div className="space-y-6">
              {/* Overview Section */}
              <section id="overview" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Overview</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 text-sm sm:text-base">
                    DBSCAN (Density-Based Spatial Clustering of Applications with Noise) is a density-based clustering algorithm
                    that groups together points that are closely packed together and marks points that lie alone in low-density
                    regions as outliers. Unlike K-means, DBSCAN doesn't require specifying the number of clusters beforehand
                    and can find clusters of arbitrary shapes.
                  </p>
                </div>
              </section>

              {/* Visualization Section */}
              <section id="visualization" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <DBSCANVisualization />
              </section>

              {/* Documentation Sections */}
              <section id="how-it-works" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">How DBSCAN Works</h2>
                <div className="prose prose-invert max-w-none space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-purple-400">Key Concepts</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-700/50 p-4 rounded-lg">
                        <h4 className="font-medium text-white mb-2">Epsilon (ε)</h4>
                        <p className="text-gray-300 text-sm">
                          The maximum distance between two points to be considered neighbors. Points within this distance
                          are considered part of the same neighborhood.
                        </p>
                      </div>
                      <div className="bg-gray-700/50 p-4 rounded-lg">
                        <h4 className="font-medium text-white mb-2">MinPts</h4>
                        <p className="text-gray-300 text-sm">
                          The minimum number of points required to form a dense region. If a point has fewer than MinPts
                          neighbors within ε distance, it is marked as noise.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-purple-400">Algorithm Steps</h3>
                    <ol className="list-decimal pl-5 space-y-2 text-gray-300 text-sm">
                      <li>
                        <strong>Point Classification:</strong>
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          <li>Core Point: Has at least MinPts neighbors within ε distance</li>
                          <li>Border Point: Has fewer than MinPts neighbors but is reachable from a core point</li>
                          <li>Noise Point: Neither a core point nor a border point</li>
                        </ul>
                      </li>
                      <li>
                        <strong>Cluster Formation:</strong>
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          <li>Start with an unvisited point</li>
                          <li>If it's a core point, start a new cluster</li>
                          <li>Add all density-reachable points to the cluster</li>
                          <li>Repeat until all points are visited</li>
                        </ul>
                      </li>
                    </ol>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-purple-400">Advantages</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-300 text-sm">
                      <li>No need to specify the number of clusters beforehand</li>
                      <li>Can find clusters of arbitrary shapes</li>
                      <li>Robust to outliers</li>
                      <li>Works well with spatial data</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-purple-400">Limitations</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-300 text-sm">
                      <li>Sensitive to parameter selection (ε and MinPts)</li>
                      <li>May struggle with clusters of varying densities</li>
                      <li>Performance can be slow on large datasets</li>
                      <li>Not suitable for high-dimensional data</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Applications Section */}
              <section id="applications" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Applications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <h3 className="font-medium text-white mb-2">Spatial Data Analysis</h3>
                    <p className="text-gray-300 text-sm">
                      Identifying regions of interest in geographical data, such as crime hotspots or
                      areas of high population density.
                    </p>
                  </div>
                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <h3 className="font-medium text-white mb-2">Anomaly Detection</h3>
                    <p className="text-gray-300 text-sm">
                      Detecting unusual patterns or outliers in data, such as fraudulent transactions
                      or system intrusions.
                    </p>
                  </div>
                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <h3 className="font-medium text-white mb-2">Image Segmentation</h3>
                    <p className="text-gray-300 text-sm">
                      Grouping similar pixels in images to identify objects or regions of interest.
                    </p>
                  </div>
                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <h3 className="font-medium text-white mb-2">Customer Segmentation</h3>
                    <p className="text-gray-300 text-sm">
                      Identifying groups of customers with similar behaviors or characteristics
                      without predefined categories.
                    </p>
                  </div>
                </div>
              </section>

              {/* Formulas Section */}
              <section id="formulas" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Formulas</h2>
                <div className="space-y-8">
                  <Formula
                    title="Epsilon Neighborhood"
                    formula="N_eps(p) = {q ∈ D | dist(p,q) ≤ eps}"
                    variables={[
                      { name: "N_eps(p)", description: "the epsilon neighborhood of point p" },
                      { name: "D", description: "the dataset" },
                      { name: "dist(p,q)", description: "the distance between points p and q" },
                      { name: "eps", description: "the maximum distance between points in a neighborhood" }
                    ]}
                    gradient="purple-blue"
                  />

                  <Formula
                    title="Core Point Condition"
                    formula="|N_eps(p)| ≥ minPts"
                    variables={[
                      { name: "|N_eps(p)|", description: "the number of points in the epsilon neighborhood of p" },
                      { name: "minPts", description: "the minimum number of points required to form a core point" }
                    ]}
                    gradient="blue-purple"
                  />

                  <div className="bg-purple-900/30 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-purple-400 mb-2">Key Insights</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm sm:text-base">
                      <li>The epsilon neighborhood defines the maximum distance between points in a cluster</li>
                      <li>Core points are the foundation of clusters and must have enough neighbors</li>
                      <li>Border points connect to core points but don&apos;t have enough neighbors themselves</li>
                      <li>Noise points are neither core points nor border points</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Characteristics Section */}
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
                        <li>No need to specify number of clusters</li>
                        <li>Can find clusters of arbitrary shapes</li>
                        <li>Robust to noise and outliers</li>
                        <li>Works well with spatial data</li>
                        <li>Only requires two parameters</li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <div>
                      <h3 className="text-lg font-medium text-purple-400 mb-2">Complexity</h3>
                      <ul className="text-gray-300 space-y-2 text-sm sm:text-base">
                        <li>Time Complexity: O(n²) in worst case</li>
                        <li>Space Complexity: O(n)</li>
                        <li>where:</li>
                        <li>n = number of data points</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-purple-400 mb-2">Limitations</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm sm:text-base">
                        <li>Sensitive to parameter selection</li>
                        <li>Struggles with varying density clusters</li>
                        <li>Can be computationally expensive</li>
                        <li>Requires careful distance metric selection</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Limitations Section */}
              <section id="limitations" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Limitations</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-700 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-purple-400 mb-3">Technical Limitations</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm">
                        <li>Parameter sensitivity (eps and minPts)</li>
                        <li>Difficulty with varying density clusters</li>
                        <li>High computational cost for large datasets</li>
                        <li>Dependency on distance metric choice</li>
                        <li>Memory usage for neighborhood calculations</li>
                        <li>Curse of dimensionality</li>
                      </ul>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-purple-400 mb-3">Mitigation Strategies</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm">
                        <li>Use parameter optimization techniques</li>
                        <li>Apply data normalization</li>
                        <li>Implement spatial indexing</li>
                        <li>Use approximate nearest neighbors</li>
                        <li>Consider dimensionality reduction</li>
                        <li>Apply data sampling for large datasets</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Pseudocode Section */}
              <section id="pseudocode" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Pseudo-code</h2>
                <Code
                  code={dbscanImplementation}
                  language="python"
                />
              </section>

              {/* Quiz Section */}
              <section id="quiz" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <Quiz
                  questions={dbscanQuiz}
                />
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 