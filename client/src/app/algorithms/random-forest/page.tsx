'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Quiz from '../../components/Quiz';
import TableOfContents from '../../components/TableOfContents';
import Code from '../../components/ui/Code';
import PageHeader from '../../components/ui/PageHeader';
import RandomForestVisualization from '../../components/visualizations/RandomForestVisualization';

export default function RandomForestPage() {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', title: 'Overview', icon: '📋' },
    { id: 'visualization', title: 'Visualization', icon: '🌲' },
    { id: 'when-to-use', title: 'When to Use', icon: '⏰' },
    { id: 'how-it-works', title: 'How It Works', icon: '⚙️' },
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
              title="Random Forest"
              description="Explore how Random Forest combines multiple decision trees to create a robust and accurate ensemble model. Understand the power of bagging and feature randomization in reducing overfitting and improving predictions."
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
                    Random Forest is an ensemble learning method that operates by constructing multiple decision trees during training
                    and outputting the class that is the mode of the classes (classification) or mean prediction (regression) of the
                    individual trees. It combines the power of bagging (Bootstrap Aggregating) with random feature selection to create
                    a diverse set of trees, making it one of the most powerful and widely used machine learning algorithms.
                  </p>
                </div>
              </section>

              {/* Visualization Section */}
              <section id="visualization" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Visualization</h2>
                <RandomForestVisualization />
              </section>

              {/* When to Use Section */}
              <section id="when-to-use" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">When to Use</h2>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-900/50 p-6 rounded-lg">
                      <h3 className="text-lg font-medium text-purple-400 mb-4">Ideal Use Cases</h3>
                      <ul className="space-y-3 text-gray-300">
                        <li className="flex items-start">
                          <span className="text-purple-400 mr-2">✓</span>
                          <span>Classification and regression problems</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-400 mr-2">✓</span>
                          <span>High-dimensional data</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-400 mr-2">✓</span>
                          <span>Feature importance analysis</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-400 mr-2">✓</span>
                          <span>Handling missing values</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-400 mr-2">✓</span>
                          <span>Outlier detection</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-gray-900/50 p-6 rounded-lg">
                      <h3 className="text-lg font-medium text-purple-400 mb-4">Key Advantages</h3>
                      <ul className="space-y-3 text-gray-300">
                        <li className="flex items-start">
                          <span className="text-purple-400 mr-2">✓</span>
                          <span>Reduced overfitting</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-400 mr-2">✓</span>
                          <span>Handles non-linear relationships</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-400 mr-2">✓</span>
                          <span>Robust to outliers</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-400 mr-2">✓</span>
                          <span>Parallelizable training</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-400 mr-2">✓</span>
                          <span>Feature importance ranking</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* How It Works Section */}
              <section id="how-it-works" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">How It Works</h2>
                <div className="space-y-6">
                  <div className="bg-gray-900/50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-purple-400 mb-4">The Process</h3>
                    <ol className="space-y-4 text-gray-300">
                      <li className="flex items-start">
                        <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">1</span>
                        <span>Create multiple bootstrap samples from the training data</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">2</span>
                        <span>For each sample, grow a decision tree using a random subset of features</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">3</span>
                        <span>At each node, select the best split from the random feature subset</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">4</span>
                        <span>Grow trees to maximum depth without pruning</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">5</span>
                        <span>Combine predictions using majority voting (classification) or averaging (regression)</span>
                      </li>
                    </ol>
                  </div>
                </div>
              </section>

              {/* Formulas Section */}
              <section id="formulas" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Formulas</h2>
                <div className="space-y-8">
                  <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 p-6 rounded-xl">
                    <h3 className="text-lg font-medium text-purple-400 mb-4">Classification Prediction</h3>
                    <div className="flex justify-center items-center">
                      <div className="text-white text-lg sm:text-xl font-mono bg-gray-900/50 p-4 rounded-lg">
                        ŷ = mode(&#123;f<sub>1</sub>(x), f<sub>2</sub>(x), ..., f<sub>n</sub>(x)&#125;)
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm sm:text-base mt-4">
                      Where:
                    </p>
                    <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm sm:text-base ml-4">
                      <li>ŷ is the predicted class</li>
                      <li>f<sub>i</sub>(x) is the prediction of the i-th tree</li>
                      <li>mode() returns the most frequent prediction</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-6 rounded-xl">
                    <h3 className="text-lg font-medium text-purple-400 mb-4">Regression Prediction</h3>
                    <div className="flex justify-center items-center">
                      <div className="text-white text-lg sm:text-xl font-mono bg-gray-900/50 p-4 rounded-lg">
                        ŷ = (1/n) ∑<sub>i=1</sub><sup>n</sup> f<sub>i</sub>(x)
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm sm:text-base mt-4">
                      Where:
                    </p>
                    <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm sm:text-base ml-4">
                      <li>ŷ is the predicted value</li>
                      <li>n is the number of trees</li>
                      <li>f<sub>i</sub>(x) is the prediction of the i-th tree</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 p-6 rounded-xl">
                    <h3 className="text-lg font-medium text-purple-400 mb-4">Feature Importance</h3>
                    <div className="flex justify-center items-center">
                      <div className="text-white text-lg sm:text-xl font-mono bg-gray-900/50 p-4 rounded-lg">
                        Importance(f) = (1/n) ∑<sub>i=1</sub><sup>n</sup> ΔI(f, T<sub>i</sub>)
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm sm:text-base mt-4">
                      Where:
                    </p>
                    <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm sm:text-base ml-4">
                      <li>f is the feature</li>
                      <li>n is the number of trees</li>
                      <li>T<sub>i</sub> is the i-th tree</li>
                      <li>ΔI is the impurity decrease</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Practical Example Section */}
              <section id="practical-example" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Practical Example: Credit Risk Assessment</h2>
                <div className="space-y-6">
                  <p className="text-gray-300 text-sm sm:text-base">
                    Let&apos;s see how Random Forest can be used to assess credit risk by analyzing various customer features.
                  </p>

                  <div className="bg-gray-900/50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-purple-400 mb-4">Sample Data</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-gray-900 rounded-lg">
                        <thead>
                          <tr className="text-gray-300">
                            <th className="px-4 py-2">Customer ID</th>
                            <th className="px-4 py-2">Income</th>
                            <th className="px-4 py-2">Credit Score</th>
                            <th className="px-4 py-2">Age</th>
                            <th className="px-4 py-2">Risk Level</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="text-gray-300">
                            <td className="px-4 py-2 border-t border-gray-700">1</td>
                            <td className="px-4 py-2 border-t border-gray-700">$75,000</td>
                            <td className="px-4 py-2 border-t border-gray-700">720</td>
                            <td className="px-4 py-2 border-t border-gray-700">35</td>
                            <td className="px-4 py-2 border-t border-gray-700">Low</td>
                          </tr>
                          <tr className="text-gray-300">
                            <td className="px-4 py-2 border-t border-gray-700">2</td>
                            <td className="px-4 py-2 border-t border-gray-700">$45,000</td>
                            <td className="px-4 py-2 border-t border-gray-700">650</td>
                            <td className="px-4 py-2 border-t border-gray-700">28</td>
                            <td className="px-4 py-2 border-t border-gray-700">Medium</td>
                          </tr>
                          <tr className="text-gray-300">
                            <td className="px-4 py-2 border-t border-gray-700">3</td>
                            <td className="px-4 py-2 border-t border-gray-700">$120,000</td>
                            <td className="px-4 py-2 border-t border-gray-700">780</td>
                            <td className="px-4 py-2 border-t border-gray-700">42</td>
                            <td className="px-4 py-2 border-t border-gray-700">Low</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-gray-900/50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-purple-400 mb-4">Feature Importance</h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="w-32 text-gray-300">Credit Score</div>
                        <div className="flex-grow h-4 bg-gray-700 rounded-full">
                          <div className="h-4 bg-purple-500 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                        <div className="w-16 text-right text-gray-300">85%</div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-32 text-gray-300">Income</div>
                        <div className="flex-grow h-4 bg-gray-700 rounded-full">
                          <div className="h-4 bg-purple-500 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                        <div className="w-16 text-right text-gray-300">65%</div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-32 text-gray-300">Age</div>
                        <div className="flex-grow h-4 bg-gray-700 rounded-full">
                          <div className="h-4 bg-purple-500 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                        <div className="w-16 text-right text-gray-300">45%</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-900/30 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-purple-400 mb-2">Key Insights</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm sm:text-base">
                      <li>Credit Score is the most important feature for risk assessment</li>
                      <li>Income has a significant but secondary impact</li>
                      <li>Age has a moderate influence on risk prediction</li>
                      <li>The model can handle non-linear relationships between features</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Pseudo-code Section */}
              <section id="pseudocode" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Pseudo-code</h2>
                <Code
                  code={`function RandomForest(data, n_trees, max_features):
    forest = []
    
    for i in range(n_trees):
        # Create bootstrap sample
        sample = bootstrap_sample(data)
        
        # Grow tree with random feature subset
        tree = grow_tree(sample, max_features)
        forest.append(tree)
    
    return forest

function predict(forest, x):
    predictions = []
    for tree in forest:
        pred = tree.predict(x)
        predictions.append(pred)
    
    # For classification
    if is_classification:
        return mode(predictions)
    # For regression
    else:
        return mean(predictions)

function grow_tree(data, max_features):
    if stopping_criterion_met:
        return create_leaf(data)
    
    # Select random feature subset
    features = random_subset(all_features, max_features)
    
    # Find best split
    best_split = find_best_split(data, features)
    
    # Create child nodes
    left_data = data[best_split.left_mask]
    right_data = data[best_split.right_mask]
    
    left_child = grow_tree(left_data, max_features)
    right_child = grow_tree(right_data, max_features)
    
    return create_node(best_split, left_child, right_child)`}
                  language="python"
                />
              </section>

              {/* Characteristics Section */}
              <section id="characteristics" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Key Characteristics</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium text-purple-400 mb-2">Type & Category</h3>
                      <ul className="text-gray-300 space-y-2 text-sm sm:text-base">
                        <li>Type: Supervised Learning</li>
                        <li>Category: Ensemble Method</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-purple-400 mb-2">Strengths</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm sm:text-base">
                        <li>High accuracy and robustness</li>
                        <li>Resistant to overfitting</li>
                        <li>Handles non-linear relationships</li>
                        <li>Provides feature importance</li>
                        <li>Works well with high-dimensional data</li>
                      </ul>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium text-purple-400 mb-2">Complexity</h3>
                      <ul className="text-gray-300 space-y-2 text-sm sm:text-base">
                        <li>Time Complexity: O(n * m * log(n) * k)</li>
                        <li>Space Complexity: O(n * m * k)</li>
                        <li>where:</li>
                        <li>n = number of samples</li>
                        <li>m = number of features</li>
                        <li>k = number of trees</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-purple-400 mb-2">Limitations</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm sm:text-base">
                        <li>Can be computationally expensive</li>
                        <li>Less interpretable than single trees</li>
                        <li>May require more memory</li>
                        <li>Can be slow for real-time predictions</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Limitations Section */}
              <section id="limitations" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">When Not to Use</h2>
                <div className="space-y-4">
                  <p className="text-gray-300 text-sm sm:text-base">
                    Random Forest may not be suitable in the following scenarios:
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm sm:text-base">
                    <li>When interpretability is crucial</li>
                    <li>When computational resources are limited</li>
                    <li>When real-time predictions are required</li>
                    <li>When the dataset is very small</li>
                    <li>When features have strong linear relationships</li>
                    <li>When memory constraints are strict</li>
                  </ul>
                  <p className="text-gray-300 text-sm sm:text-base mt-4">
                    In these cases, consider simpler models like linear regression, logistic regression,
                    or single decision trees.
                  </p>
                </div>
              </section>

              {/* Quiz Section */}
              <section id="quiz" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <Quiz algorithm="random-forest" />
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 