'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import KNNVisualization from '../../components/visualizations/KNNVisualization';
import Quiz from '../../components/Quiz';
import TableOfContents from '../../components/TableOfContents';
import Code from '../../components/ui/Code';
import PageHeader from '../../components/ui/PageHeader';

export default function KNNPage() {
  const [activeSection, setActiveSection] = useState('overview');

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

          {/* Main Content */}
          <div className="lg:ml-72">
            <PageHeader
              title="K-Nearest Neighbors (KNN)"
              description="Explore how KNN makes predictions by finding the K closest training examples. Visualize how the algorithm classifies new points based on their nearest neighbors."
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
                    K-Nearest Neighbors (KNN) is a simple yet powerful supervised learning algorithm used for both
                    classification and regression tasks. It works by finding the K closest training examples to a new
                    data point and making predictions based on their labels or values. KNN is a non-parametric algorithm,
                    meaning it doesn't make any assumptions about the underlying data distribution.
                  </p>
                </div>
              </section>

              {/* Visualization Section */}
              <section id="visualization" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <KNNVisualization />
              </section>

              {/* When to Use Section */}
              <section id="when-to-use" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">When to Use It</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-purple-400 mb-2">Ideal Use Cases</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm sm:text-base">
                      <li>Classification problems with clear decision boundaries</li>
                      <li>Regression problems with smooth, continuous relationships</li>
                      <li>When interpretability is important</li>
                      <li>When you have a small to medium-sized dataset</li>
                      <li>When you need a simple baseline model</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-purple-400 mb-2">Assumptions</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm sm:text-base">
                      <li>Similar data points should have similar labels</li>
                      <li>Features should be properly scaled</li>
                      <li>Features should be relevant to the prediction task</li>
                      <li>Data should be representative of the problem domain</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* How It Works Section */}
              <section id="how-it-works" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">How It Works</h2>
                <div className="space-y-4">
                  <p className="text-gray-300 text-sm sm:text-base">
                    The KNN algorithm works through these steps:
                  </p>
                  <ol className="list-decimal list-inside text-gray-300 space-y-2 text-sm sm:text-base">
                    <li>Store all training examples in memory</li>
                    <li>For a new data point, calculate distances to all training examples</li>
                    <li>Select the K nearest neighbors based on the calculated distances</li>
                    <li>For classification: Take the majority vote of the K neighbors' labels</li>
                    <li>For regression: Take the average of the K neighbors' values</li>
                  </ol>
                </div>
              </section>

              {/* Practical Example Section */}
              <section id="practical-example" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Practical Example</h2>
                <div className="space-y-6">
                  <div className="bg-gray-700 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-purple-400 mb-4 text-center">Distance Calculation</h3>
                    <div className="text-center text-white text-lg mb-4">
                      Euclidean Distance = √(Σ(x₁ - x₂)²)
                    </div>
                    <p className="text-gray-300 text-sm sm:text-base">
                      For example, with K=3, we find the 3 closest points to our new data point
                      and use their labels to make a prediction.
                    </p>
                  </div>
                </div>
              </section>

              {/* Pseudocode Section */}
              <section id="pseudocode" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Pseudocode</h2>
                <Code
                  code={`function KNN(train_data, test_point, k):
    # Calculate distances to all training points
    distances = []
    for train_point in train_data:
        distance = calculate_distance(test_point, train_point)
        distances.append((distance, train_point.label))
    
    # Sort distances and get k nearest neighbors
    distances.sort()
    k_nearest = distances[:k]
    
    # For classification: majority vote
    if is_classification:
        labels = [label for _, label in k_nearest]
        return most_common(labels)
    
    # For regression: average
    else:
        values = [label for _, label in k_nearest]
        return sum(values) / len(values)

function calculate_distance(point1, point2):
    # Euclidean distance
    return sqrt(sum((x1 - x2) ** 2 for x1, x2 in zip(point1, point2)))`}
                  language="python"
                />
              </section>

              {/* Characteristics Section */}
              <section id="characteristics" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Characteristics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium text-purple-400 mb-2">Type & Category</h3>
                      <ul className="text-gray-300 space-y-2 text-sm sm:text-base">
                        <li>Type: Supervised Learning</li>
                        <li>Category: Classification & Regression</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-purple-400 mb-2">Strengths</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm sm:text-base">
                        <li>Simple to understand and implement</li>
                        <li>No training required</li>
                        <li>Works well with non-linear data</li>
                        <li>Adapts to new data automatically</li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <div>
                      <h3 className="text-lg font-medium text-purple-400 mb-2">Complexity</h3>
                      <ul className="text-gray-300 space-y-2 text-sm sm:text-base">
                        <li>Training Time: O(1)</li>
                        <li>Prediction Time: O(n * d)</li>
                        <li>Space Complexity: O(n * d)</li>
                        <li>where:</li>
                        <li>n = number of training examples</li>
                        <li>d = number of features</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-purple-400 mb-2">Limitations</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm sm:text-base">
                        <li>Computationally expensive for large datasets</li>
                        <li>Sensitive to feature scaling</li>
                        <li>Requires careful choice of K</li>
                        <li>Memory intensive</li>
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
                        <li>High computational cost for large datasets</li>
                        <li>Sensitive to irrelevant features</li>
                        <li>Requires feature normalization</li>
                        <li>Curse of dimensionality</li>
                        <li>Memory intensive storage</li>
                        <li>Slow prediction time</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-700 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-purple-400 mb-3">Mitigation Strategies</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm">
                        <li>Use dimensionality reduction</li>
                        <li>Implement feature selection</li>
                        <li>Apply data normalization</li>
                        <li>Use approximate nearest neighbors</li>
                        <li>Optimize distance calculations</li>
                        <li>Consider data sampling</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Quiz Section */}
              <section id="quiz" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <Quiz algorithm="knn" />
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
