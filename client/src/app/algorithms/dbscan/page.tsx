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
              title="DBSCAN"
              description="Explore how DBSCAN identifies clusters based on density and handles noise points. Visualize how the algorithm groups data points into clusters of varying shapes."
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
                    DBSCAN (Density-Based Spatial Clustering of Applications with Noise) is a density-based clustering algorithm
                    that groups together points that are closely packed together and marks as outliers the points that lie alone
                    in low-density regions. Unlike K-means, DBSCAN doesn&apos;t require specifying the number of clusters beforehand
                    and can find clusters of arbitrary shapes.
                  </p>
                </div>
              </section>

              {/* Visualization Section */}
              <section id="visualization" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <DBSCANVisualization />
              </section>

              {/* How It Works Section */}
              <HowItWorks
                title="How It Works"
                steps={[
                  { number: 1, description: "Start with an unvisited point and find its neighbors within ε distance" },
                  { number: 2, description: "If the point has at least minPts neighbors, mark it as a core point and start a new cluster" },
                  { number: 3, description: "Recursively add all density-reachable points to the cluster" },
                  { number: 4, description: "If a point is not a core point but is reachable from a core point, mark it as a border point" },
                  { number: 5, description: "If a point is neither a core point nor a border point, mark it as noise" },
                  { number: 6, description: "Repeat the process for all unvisited points" }
                ]}
              />

              {/* When to Use Section */}
              <WhenToUse
                idealUseCases={{
                  title: "Ideal Use Cases",
                  items: [
                    "Finding clusters of arbitrary shapes",
                    "Identifying outliers and noise",
                    "Spatial data clustering",
                    "Image segmentation",
                    "Anomaly detection"
                  ]
                }}
                keyAdvantages={{
                  title: "Key Advantages",
                  items: [
                    "No need to specify number of clusters",
                    "Can find clusters of arbitrary shapes",
                    "Robust to outliers",
                    "Works well with spatial data",
                    "Only requires two parameters"
                  ]
                }}
              />

              {/* Formulas Section */}
              <section id="formulas" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Mathematical Formulas</h2>
                <div className="space-y-6">
                  <Formula
                    title="Epsilon Neighborhood"
                    formula="N_eps(p) = {q ∈ D | dist(p,q) ≤ eps}"
                    variables={[
                      { name: "N_eps(p)", description: "set of points within ε distance of point p" },
                      { name: "eps", description: "maximum distance between points in a cluster" },
                      { name: "dist(p,q)", description: "distance between points p and q" }
                    ]}
                  />

                  <Formula
                    title="Core Point Condition"
                    formula="|N_eps(p)| ≥ minPts"
                    variables={[
                      { name: "|N_eps(p)|", description: "number of points in the ε-neighborhood of p" },
                      { name: "minPts", description: "minimum number of points required to form a cluster" }
                    ]}
                  />

                  <Formula
                    title="Distance Calculation"
                    formula="d(p,q) = √(Σ(p_i - q_i)²)"
                    variables={[
                      { name: "d(p,q)", description: "Euclidean distance between points p and q" },
                      { name: "p_i, q_i", description: "coordinates of points p and q in dimension i" },
                      { name: "n", description: "number of dimensions" }
                    ]}
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

              {/* Practical Example Section */}
              <section id="practical-example" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Practical Example</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 text-sm sm:text-base">
                    Let&apos;s consider a real-world example of using DBSCAN for customer segmentation in a retail store:
                  </p>
                  <div className="mt-4 space-y-4">
                    <div className="bg-gray-700/50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-purple-400 mb-2">Problem</h3>
                      <p className="text-gray-300 text-sm">
                        A retail store wants to identify groups of customers based on their shopping patterns and behavior.
                      </p>
                    </div>
                    <div className="bg-gray-700/50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-purple-400 mb-2">Solution</h3>
                      <p className="text-gray-300 text-sm">
                        Using DBSCAN to cluster customers based on features like:
                      </p>
                      <ul className="list-disc list-inside text-gray-300 text-sm mt-2">
                        <li>Purchase frequency</li>
                        <li>Average transaction value</li>
                        <li>Time spent in store</li>
                        <li>Product categories purchased</li>
                      </ul>
                    </div>
                    <div className="bg-gray-700/50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-purple-400 mb-2">Results</h3>
                      <p className="text-gray-300 text-sm">
                        DBSCAN identifies:
                      </p>
                      <ul className="list-disc list-inside text-gray-300 text-sm mt-2">
                        <li>Core customer segments (frequent shoppers)</li>
                        <li>Border customers (occasional shoppers)</li>
                        <li>Noise points (one-time or irregular customers)</li>
                      </ul>
                    </div>
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
                        <li>Robust to outliers</li>
                        <li>Works well with spatial data</li>
                      </ul>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium text-purple-400 mb-2">Parameters</h3>
                      <ul className="text-gray-300 space-y-2 text-sm sm:text-base">
                        <li>ε (eps): Maximum distance between points</li>
                        <li>minPts: Minimum points to form a cluster</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-purple-400 mb-2">Complexity</h3>
                      <ul className="text-gray-300 space-y-2 text-sm sm:text-base">
                        <li>Time: O(n²) in worst case</li>
                        <li>Space: O(n) for storing points</li>
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
                        <li>Sensitive to parameter selection</li>
                        <li>Struggles with varying density clusters</li>
                        <li>High-dimensional data challenges</li>
                        <li>Computationally expensive for large datasets</li>
                        <li>Requires distance metric scaling</li>
                        <li>Memory intensive for large datasets</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-700 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-purple-400 mb-3">Mitigation Strategies</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm">
                        <li>Use domain knowledge for parameters</li>
                        <li>Apply data normalization</li>
                        <li>Use dimensionality reduction</li>
                        <li>Implement spatial indexing</li>
                        <li>Consider data sampling</li>
                        <li>Use approximate nearest neighbors</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Pseudocode Section */}
              <section id="pseudocode" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Pseudocode</h2>
                <Code
                  code={dbscanImplementation}
                  language="python"
                />
              </section>

              {/* Quiz Section */}
              <section id="quiz" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <Quiz algorithm='dbscan'/>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 