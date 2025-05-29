'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import KNNVisualization from '../../components/visualizations/KNNVisualization';
import Quiz from '../../components/Quiz';
import TableOfContents from '../../components/TableOfContents';
import Code from '../../components/ui/Code';
import PageHeader from '../../components/ui/PageHeader';
import Formula from '../../components/ui/Formula';

export default function KNNPage() {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', title: 'Overview', icon: '📋' },
    { id: 'visualization', title: 'Visualization', icon: '🎯' },
    { id: 'when-to-use', title: 'When to Use', icon: '⏰' },
    { id: 'how-it-works', title: 'How It Works', icon: '⚙️' },
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
                    meaning it doesn&apos;t make any assumptions about the underlying data distribution.
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
                    <li>For classification: Take the majority vote of the K neighbors&apos; labels</li>
                    <li>For regression: Take the average of the K neighbors&apos; values</li>
                  </ol>
                </div>
              </section>

              {/* Formulas Section */}
              <section id="formulas" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Formulas</h2>
                <div className="space-y-8">
                  <Formula
                    title="Euclidean Distance"
                    formula="d(x,y) = √(Σ(xᵢ - yᵢ)²)"
                    variables={[
                      { name: "xᵢ", description: "the i-th coordinate of point x" },
                      { name: "yᵢ", description: "the i-th coordinate of point y" },
                      { name: "d", description: "the distance between points x and y" }
                    ]}
                    gradient="purple-blue"
                  />

                  <Formula
                    title="Manhattan Distance"
                    formula="d(x,y) = Σ|xᵢ - yᵢ|"
                    variables={[
                      { name: "xᵢ", description: "the i-th coordinate of point x" },
                      { name: "yᵢ", description: "the i-th coordinate of point y" },
                      { name: "d", description: "the distance between points x and y" }
                    ]}
                    gradient="blue-purple"
                  />

                  <Formula
                    title="Minkowski Distance"
                    formula="d(x,y) = (Σ|xᵢ - yᵢ|ᵖ)^(1/p)"
                    variables={[
                      { name: "xᵢ", description: "the i-th coordinate of point x" },
                      { name: "yᵢ", description: "the i-th coordinate of point y" },
                      { name: "p", description: "the order of the distance metric" },
                      { name: "d", description: "the distance between points x and y" }
                    ]}
                    gradient="purple-blue"
                  />

                  <div className="bg-purple-900/30 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-purple-400 mb-2">Key Insights</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm sm:text-base">
                      <li>Euclidean distance is most common and works well for continuous data</li>
                      <li>Manhattan distance is better for categorical or discrete data</li>
                      <li>Minkowski distance generalizes both Euclidean and Manhattan distances</li>
                      <li>Choice of distance metric can significantly impact KNN performance</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Practical Example Section */}
              <section id="practical-example" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Practical Example</h2>
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg p-6 shadow-lg border border-purple-500/20">
                    <h3 className="text-xl font-bold text-purple-400 mb-6 text-center">Classifying a New Point</h3>
                    <div className="space-y-6">
                      <div className="bg-gray-800/50 p-6 rounded-lg border border-purple-500/20">
                        <h4 className="text-lg font-medium text-purple-400 mb-4 flex items-center">
                          <span className="mr-2">📊</span> Training Data
                        </h4>
                        <div className="overflow-x-auto">
                          <table className="min-w-full bg-gray-900/50 text-white rounded-lg overflow-hidden">
                            <thead>
                              <tr className="bg-purple-500/20">
                                <th className="px-4 py-3 text-left">Point</th>
                                <th className="px-4 py-3 text-left">X</th>
                                <th className="px-4 py-3 text-left">Y</th>
                                <th className="px-4 py-3 text-left">Class</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-gray-700 hover:bg-gray-800/50">
                                <td className="px-4 py-3">P1</td>
                                <td className="px-4 py-3">2</td>
                                <td className="px-4 py-3">3</td>
                                <td className="px-4 py-3"><span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded">A</span></td>
                              </tr>
                              <tr className="border-b border-gray-700 hover:bg-gray-800/50">
                                <td className="px-4 py-3">P2</td>
                                <td className="px-4 py-3">4</td>
                                <td className="px-4 py-3">5</td>
                                <td className="px-4 py-3"><span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded">A</span></td>
                              </tr>
                              <tr className="border-b border-gray-700 hover:bg-gray-800/50">
                                <td className="px-4 py-3">P3</td>
                                <td className="px-4 py-3">6</td>
                                <td className="px-4 py-3">2</td>
                                <td className="px-4 py-3"><span className="px-2 py-1 bg-green-500/20 text-green-300 rounded">B</span></td>
                              </tr>
                              <tr className="hover:bg-gray-800/50">
                                <td className="px-4 py-3">P4</td>
                                <td className="px-4 py-3">8</td>
                                <td className="px-4 py-3">4</td>
                                <td className="px-4 py-3"><span className="px-2 py-1 bg-green-500/20 text-green-300 rounded">B</span></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="bg-gray-800/50 p-6 rounded-lg border border-purple-500/20">
                        <h4 className="text-lg font-medium text-purple-400 mb-4 flex items-center">
                          <span className="mr-2">🎯</span> New Point to Classify
                        </h4>
                        <div className="bg-gray-900/50 p-4 rounded-lg text-center">
                          <p className="text-white text-lg font-mono">
                            (5, 4)
                          </p>
                        </div>
                      </div>

                      <div className="bg-gray-800/50 p-6 rounded-lg border border-purple-500/20">
                        <h4 className="text-lg font-medium text-purple-400 mb-4 flex items-center">
                          <span className="mr-2">📏</span> Step 1: Calculate Distances
                        </h4>
                        <div className="overflow-x-auto">
                          <table className="min-w-full bg-gray-900/50 text-white rounded-lg overflow-hidden">
                            <thead>
                              <tr className="bg-purple-500/20">
                                <th className="px-4 py-3 text-left">Point</th>
                                <th className="px-4 py-3 text-left">Distance</th>
                                <th className="px-4 py-3 text-left">Class</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-gray-700 hover:bg-gray-800/50">
                                <td className="px-4 py-3">P1</td>
                                <td className="px-4 py-3 font-mono">√((5-2)² + (4-3)²) = 3.16</td>
                                <td className="px-4 py-3"><span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded">A</span></td>
                              </tr>
                              <tr className="border-b border-gray-700 hover:bg-gray-800/50">
                                <td className="px-4 py-3">P2</td>
                                <td className="px-4 py-3 font-mono">√((5-4)² + (4-5)²) = 1.41</td>
                                <td className="px-4 py-3"><span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded">A</span></td>
                              </tr>
                              <tr className="border-b border-gray-700 hover:bg-gray-800/50">
                                <td className="px-4 py-3">P3</td>
                                <td className="px-4 py-3 font-mono">√((5-6)² + (4-2)²) = 2.24</td>
                                <td className="px-4 py-3"><span className="px-2 py-1 bg-green-500/20 text-green-300 rounded">B</span></td>
                              </tr>
                              <tr className="hover:bg-gray-800/50">
                                <td className="px-4 py-3">P4</td>
                                <td className="px-4 py-3 font-mono">√((5-8)² + (4-4)²) = 3.00</td>
                                <td className="px-4 py-3"><span className="px-2 py-1 bg-green-500/20 text-green-300 rounded">B</span></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="bg-gray-800/50 p-6 rounded-lg border border-purple-500/20">
                        <h4 className="text-lg font-medium text-purple-400 mb-4 flex items-center">
                          <span className="mr-2">🔍</span> Step 2: Find K Nearest Neighbors
                        </h4>
                        <div className="bg-gray-900/50 p-4 rounded-lg">
                          <p className="text-gray-300 text-sm sm:text-base mb-3">
                            With K=3, the nearest neighbors are:
                          </p>
                          <ol className="list-decimal list-inside text-gray-300 space-y-2">
                            <li className="flex items-center">
                              <span className="mr-2">P2</span>
                              <span className="text-purple-300">(distance: 1.41)</span>
                              <span className="ml-2 px-2 py-1 bg-blue-500/20 text-blue-300 rounded">A</span>
                            </li>
                            <li className="flex items-center">
                              <span className="mr-2">P3</span>
                              <span className="text-purple-300">(distance: 2.24)</span>
                              <span className="ml-2 px-2 py-1 bg-green-500/20 text-green-300 rounded">B</span>
                            </li>
                            <li className="flex items-center">
                              <span className="mr-2">P4</span>
                              <span className="text-purple-300">(distance: 3.00)</span>
                              <span className="ml-2 px-2 py-1 bg-green-500/20 text-green-300 rounded">B</span>
                            </li>
                          </ol>
                        </div>
                      </div>

                      <div className="bg-gray-800/50 p-6 rounded-lg border border-purple-500/20">
                        <h4 className="text-lg font-medium text-purple-400 mb-4 flex items-center">
                          <span className="mr-2">🎲</span> Step 3: Make Prediction
                        </h4>
                        <div className="bg-gray-900/50 p-4 rounded-lg">
                          <div className="flex items-center justify-center space-x-4 mb-4">
                            <div className="text-center">
                              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg">Class A: 1 vote</span>
                            </div>
                            <div className="text-center">
                              <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-lg">Class B: 2 votes</span>
                            </div>
                          </div>
                          <div className="text-center">
                            <p className="text-white text-lg font-medium">
                              Final prediction: The new point (5, 4) is classified as 
                              <span className="ml-2 px-3 py-1 bg-green-500/20 text-green-300 rounded-lg">Class B</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
