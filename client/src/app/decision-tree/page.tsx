'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import DecisionTreeVisualization from '../components/DecisionTreeVisualization';
import DecisionTreeQuiz from '../components/DecisionTreeQuiz';

export default function DecisionTreePage() {
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
    { id: 'visualization', title: 'Visualization', icon: '🌳' },
    { id: 'when-to-use', title: 'When to Use', icon: '⏰' },
    { id: 'how-it-works', title: 'How It Works', icon: '⚙️' },
    { id: 'decisions', title: 'Decisions', icon: '🎯' },
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
                Decision Tree
              </h1>
              <p className="text-gray-300 max-w-2xl mx-auto mb-6 text-sm sm:text-base">
                Explore how decision trees make predictions by learning simple decision rules from data.
                Visualize the tree structure and understand how it splits data to make decisions.
              </p>
              <button
                onClick={() => scrollToSection('quiz')}
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
                    A Decision Tree is a supervised learning algorithm that uses a tree-like model of decisions and their possible consequences.
                    It's a powerful and intuitive algorithm that can be used for both classification and regression tasks. The algorithm works by
                    recursively splitting the data into subsets based on the most significant features, creating a tree structure where each
                    internal node represents a decision based on a feature, and each leaf node represents a prediction.
                  </p>
                </div>
              </section>

              {/* Visualization Section */}
              <section id="visualization" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <DecisionTreeVisualization />
              </section>

              {/* When to Use Section */}
              <section id="when-to-use" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">When to Use It</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-purple-400 mb-2">Ideal Use Cases</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm sm:text-base">
                      <li>Classification problems with clear decision boundaries</li>
                      <li>Regression problems with non-linear relationships</li>
                      <li>Feature importance analysis</li>
                      <li>When interpretability is crucial</li>
                      <li>When dealing with both numerical and categorical features</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-purple-400 mb-2">Assumptions</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm sm:text-base">
                      <li>Features are independent of each other</li>
                      <li>Data can be split into distinct groups</li>
                      <li>Features are equally important (unless using feature importance)</li>
                      <li>Decision boundaries are axis-parallel</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* How It Works Section */}
              <section id="how-it-works" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">How It Works</h2>
                <div className="space-y-4">
                  <p className="text-gray-300 text-sm sm:text-base">
                    The Decision Tree algorithm works through the following process:
                  </p>
                  <ol className="list-decimal list-inside text-gray-300 space-y-2 text-sm sm:text-base">
                    <li>Select the best feature to split the data based on information gain or Gini impurity</li>
                    <li>Create a decision node that splits the data into subsets</li>
                    <li>Recursively repeat the process for each subset</li>
                    <li>Stop when a stopping criterion is met (e.g., maximum depth, minimum samples)</li>
                    <li>Assign the most common class (classification) or mean value (regression) to leaf nodes</li>
                  </ol>
                </div>
              </section>

              {/* Decisions Section */}
              <section id="decisions" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Key Decisions in Decision Trees</h2>
                <div className="space-y-6">
                  <div className="bg-gray-700 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-purple-400 mb-4 text-center">Main Formula</h3>
                    <div className="text-center text-white text-lg mb-4">
                      Information Gain = Entropy(parent) - Σ(Weight × Entropy(child))
                    </div>
                    <div className="text-center text-white text-lg">
                      Entropy = -Σ(p × log₂(p))
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-purple-400">Types of Decisions</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm sm:text-base">
                      <li><strong>Binary Decisions:</strong> Yes/No questions that split data into two groups</li>
                      <li><strong>Multi-way Decisions:</strong> Questions with multiple possible answers</li>
                      <li><strong>Continuous Decisions:</strong> Numerical thresholds for splitting data</li>
                      <li><strong>Categorical Decisions:</strong> Grouping based on discrete categories</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-purple-400">Decision Criteria</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm sm:text-base">
                      <li><strong>Information Gain:</strong> Measures how much a feature reduces uncertainty</li>
                      <li><strong>Gini Impurity:</strong> Measures how often a randomly chosen element would be incorrectly labeled</li>
                      <li><strong>Variance Reduction:</strong> Used in regression trees to minimize variance</li>
                      <li><strong>Chi-Square:</strong> Statistical test for categorical features</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-purple-400">Stopping Criteria</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm sm:text-base">
                      <li>Maximum tree depth reached</li>
                      <li>Minimum number of samples in a node</li>
                      <li>Minimum information gain threshold</li>
                      <li>All samples in a node belong to the same class</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Practical Example Section */}
              <section id="practical-example" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Practical Example: Loan Approval</h2>
                <div className="space-y-6">
                  <p className="text-gray-300 text-sm sm:text-base">
                    Let's solve a loan approval problem using a Decision Tree. We'll analyze customer features to predict
                    whether a loan should be approved or not.
                  </p>

                  <div className="overflow-x-auto">
                    <h3 className="text-lg font-medium text-purple-400 mb-4">Sample Dataset</h3>
                    <table className="min-w-full bg-gray-700 rounded-lg overflow-hidden">
                      <thead>
                        <tr className="bg-gray-600">
                          <th className="px-4 py-2 text-left text-white">Credit Score</th>
                          <th className="px-4 py-2 text-left text-white">Income ($)</th>
                          <th className="px-4 py-2 text-left text-white">Employment</th>
                          <th className="px-4 py-2 text-left text-white">Loan Amount ($)</th>
                          <th className="px-4 py-2 text-left text-white">Approved</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t border-gray-600">
                          <td className="px-4 py-2 text-gray-300">750</td>
                          <td className="px-4 py-2 text-gray-300">85000</td>
                          <td className="px-4 py-2 text-gray-300">Full-time</td>
                          <td className="px-4 py-2 text-gray-300">25000</td>
                          <td className="px-4 py-2 text-gray-300">Yes</td>
                        </tr>
                        <tr className="border-t border-gray-600">
                          <td className="px-4 py-2 text-gray-300">680</td>
                          <td className="px-4 py-2 text-gray-300">45000</td>
                          <td className="px-4 py-2 text-gray-300">Part-time</td>
                          <td className="px-4 py-2 text-gray-300">15000</td>
                          <td className="px-4 py-2 text-gray-300">No</td>
                        </tr>
                        <tr className="border-t border-gray-600">
                          <td className="px-4 py-2 text-gray-300">720</td>
                          <td className="px-4 py-2 text-gray-300">65000</td>
                          <td className="px-4 py-2 text-gray-300">Full-time</td>
                          <td className="px-4 py-2 text-gray-300">20000</td>
                          <td className="px-4 py-2 text-gray-300">Yes</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-purple-400">Step-by-Step Solution</h3>
                    <ol className="list-decimal list-inside text-gray-300 space-y-4 text-sm sm:text-base">
                      <li>
                        <strong>Calculate Initial Entropy:</strong>
                        <div className="ml-6 mt-2">
                          <p>Total samples: 3</p>
                          <p>Approved: 2, Not Approved: 1</p>
                          <p>Entropy = -(2/3 × log₂(2/3) + 1/3 × log₂(1/3)) = 0.918</p>
                        </div>
                      </li>
                      <li>
                        <strong>Calculate Information Gain for Credit Score:</strong>
                        <div className="ml-6 mt-2">
                          <p>Split at 700:</p>
                          <p>Left branch (&lt;=700): 1 sample, 0 approved</p>
                          <p>Right branch (&gt;700): 2 samples, 2 approved</p>
                          <p>Gain = 0.918 - (1/3 × 0 + 2/3 × 0) = 0.918</p>
                        </div>
                      </li>
                      <li>
                        <strong>Final Decision Tree:</strong>
                        <div className="ml-6 mt-2">
                          <pre className="bg-gray-700 p-4 rounded-lg text-sm">
{`Credit Score > 700?
├── Yes → Approved
└── No → Not Approved`}
                          </pre>
                        </div>
                      </li>
                      <li>
                        <strong>Visual Representation:</strong>
                        <div className="ml-6 mt-4">
                          <div className="bg-gray-700 p-6 rounded-lg">
                            <div className="flex flex-col items-center">
                              {/* Root Node */}
                              <div className="bg-purple-600 text-white px-6 py-3 rounded-lg mb-4">
                                Credit Score &gt; 700?
                              </div>
                              
                              {/* Branches */}
                              <div className="flex justify-center space-x-16 mb-4">
                                <div className="text-gray-300">Yes</div>
                                <div className="text-gray-300">No</div>
                              </div>
                              
                              {/* Leaf Nodes */}
                              <div className="flex justify-center space-x-16">
                                <div className="bg-green-600 text-white px-6 py-3 rounded-lg">
                                  Approved
                                </div>
                                <div className="bg-red-600 text-white px-6 py-3 rounded-lg">
                                  Not Approved
                                </div>
                              </div>
                            </div>
                            
                            {/* Tree Statistics */}
                            <div className="mt-6 text-gray-300 text-sm">
                              <p className="mb-2"><strong>Tree Statistics:</strong></p>
                              <ul className="list-disc list-inside space-y-1">
                                <li>Depth: 1</li>
                                <li>Total Nodes: 3</li>
                                <li>Leaf Nodes: 2</li>
                                <li>Accuracy: 100% (on training data)</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ol>
                  </div>
                </div>
              </section>

              {/* Pseudocode Section */}
              <section id="pseudocode" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Pseudocode</h2>
                <div className="space-y-6">
                  <div className="bg-gray-700 rounded-lg p-6">
                    <pre className="text-gray-300 text-sm overflow-x-auto">
{`function buildDecisionTree(data, features, target):
    # Base cases
    if all samples have same target value:
        return leaf node with that value
    if no features left or max depth reached:
        return leaf node with most common target value
    
    # Find best split
    best_feature = findBestSplit(data, features, target)
    best_threshold = findBestThreshold(data, best_feature, target)
    
    # Create decision node
    node = createDecisionNode(best_feature, best_threshold)
    
    # Split data
    left_data = data where best_feature &lt;= best_threshold
    right_data = data where best_feature &gt; best_threshold
    
    # Recursively build subtrees
    node.left = buildDecisionTree(left_data, features - best_feature, target)
    node.right = buildDecisionTree(right_data, features - best_feature, target)
    
    return node

function findBestSplit(data, features, target):
    best_gain = -infinity
    best_feature = null
    
    for feature in features:
        gain = calculateInformationGain(data, feature, target)
        if gain > best_gain:
            best_gain = gain
            best_feature = feature
    
    return best_feature

function calculateInformationGain(data, feature, target):
    parent_entropy = calculateEntropy(data[target])
    weighted_child_entropy = 0
    
    for split in getSplits(data[feature]):
        child_data = data where feature == split
        weight = len(child_data) / len(data)
        child_entropy = calculateEntropy(child_data[target])
        weighted_child_entropy += weight * child_entropy
    
    return parent_entropy - weighted_child_entropy`}
                    </pre>
                  </div>
                </div>
              </section>

              {/* Characteristics Section */}
              <section id="characteristics" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Characteristics</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-700 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-purple-400 mb-3">Advantages</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm">
                        <li>Easy to understand and interpret</li>
                        <li>Can handle both numerical and categorical data</li>
                        <li>Requires little data preprocessing</li>
                        <li>Can capture non-linear relationships</li>
                        <li>Feature importance is inherent</li>
                        <li>Fast training and prediction</li>
                        <li>Works well with missing values</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-700 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-purple-400 mb-3">Performance Metrics</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm">
                        <li>Accuracy: Overall prediction correctness</li>
                        <li>Precision: True positives / (True positives + False positives)</li>
                        <li>Recall: True positives / (True positives + False negatives)</li>
                        <li>F1 Score: Harmonic mean of precision and recall</li>
                        <li>ROC-AUC: Area under the ROC curve</li>
                        <li>Cross-validation score</li>
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
                        <li>Can overfit with complex trees</li>
                        <li>Sensitive to small data changes</li>
                        <li>Can create biased trees with imbalanced data</li>
                        <li>Limited to axis-parallel splits</li>
                        <li>May not capture complex relationships</li>
                        <li>Can be unstable with high variance</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-700 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-purple-400 mb-3">Mitigation Strategies</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm">
                        <li>Use pruning techniques</li>
                        <li>Implement cross-validation</li>
                        <li>Apply ensemble methods (Random Forest)</li>
                        <li>Balance the dataset</li>
                        <li>Feature engineering</li>
                        <li>Hyperparameter tuning</li>
                    </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Quiz Section */}
              <section id="quiz" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <DecisionTreeQuiz />
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 