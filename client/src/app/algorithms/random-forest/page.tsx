'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Quiz from '../../components/Quiz';
import TableOfContents from '../../components/TableOfContents';
import Code from '../../components/ui/Code';
import PageHeader from '../../components/ui/PageHeader';
import Formula from '../../components/ui/Formula';
import RandomForestVisualization from '../../components/visualizations/RandomForestVisualization';

export default function RandomForestPage() {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', title: 'Overview', icon: '📋' },
    { id: 'visualization', title: 'Visualization', icon: '🌲' },
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

              {/* Formulas Section */}
              <section id="formulas" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Formulas</h2>
                <div className="space-y-8">
                  <Formula
                    title="Classification Prediction"
                    formula="ŷ = mode({f₁(x), f₂(x), ..., fₙ(x)})"
                    variables={[
                      { name: "ŷ", description: "the predicted class" },
                      { name: "fᵢ(x)", description: "the prediction of the i-th tree" },
                      { name: "mode()", description: "returns the most frequent prediction" }
                    ]}
                    gradient="purple-blue"
                  />

                  <Formula
                    title="Regression Prediction"
                    formula="ŷ = (1/n) ∑ᵢ₌₁ⁿ fᵢ(x)"
                    variables={[
                      { name: "ŷ", description: "the predicted value" },
                      { name: "n", description: "the number of trees" },
                      { name: "fᵢ(x)", description: "the prediction of the i-th tree" }
                    ]}
                    gradient="blue-purple"
                  />

                  <Formula
                    title="Feature Importance"
                    formula="Importance(f) = (1/n) ∑ᵢ₌₁ⁿ ΔI(f, Tᵢ)"
                    variables={[
                      { name: "f", description: "the feature" },
                      { name: "n", description: "the number of trees" },
                      { name: "Tᵢ", description: "the i-th tree" },
                      { name: "ΔI", description: "the impurity decrease" }
                    ]}
                    gradient="purple-blue"
                  />
                </div>
              </section>

              {/* Practical Example Section */}
              <section id="practical-example" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Practical Example: How Random Forest Makes Decisions</h2>
                <div className="space-y-6">
                  <p className="text-gray-300 text-sm sm:text-base">
                    Let&apos;s see how a Random Forest with 5 trees makes a prediction for a new student. Each tree votes based on different features.
                  </p>

                  {/* Sample Data */}
                  <div className="bg-gray-900/50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-purple-400 mb-4">New Student Data</h3>
                    <div className="grid grid-cols-2 gap-4 text-gray-300">
                      <div>Study Hours: 3.5</div>
                      <div>Previous Score: 78</div>
                      <div>Attendance: 85%</div>
                      <div>Assignments: 9</div>
                    </div>
                  </div>

                  {/* Tree Votes */}
                  <div className="bg-gray-900/50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-purple-400 mb-4">How Each Tree Votes</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div className="text-gray-300">Tree 1</div>
                        <div className="text-gray-300">Based on: Study Hours (3.5) &gt; 3.0</div>
                        <div className="text-green-400 font-medium">Votes: Pass</div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div className="text-gray-300">Tree 2</div>
                        <div className="text-gray-300">Based on: Previous Score (78) &gt; 75</div>
                        <div className="text-green-400 font-medium">Votes: Pass</div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div className="text-gray-300">Tree 3</div>
                        <div className="text-gray-300">Based on: Attendance (85%) &lt; 90%</div>
                        <div className="text-red-400 font-medium">Votes: Fail</div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div className="text-gray-300">Tree 4</div>
                        <div className="text-gray-300">Based on: Assignments (9) &gt; 8</div>
                        <div className="text-green-400 font-medium">Votes: Pass</div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div className="text-gray-300">Tree 5</div>
                        <div className="text-gray-300">Based on: Study Hours (3.5) &gt; 3.0</div>
                        <div className="text-green-400 font-medium">Votes: Pass</div>
                      </div>
                    </div>
                  </div>

                  {/* Final Decision */}
                  <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 p-6 rounded-xl">
                    <h3 className="text-lg font-medium text-purple-400 mb-4">Final Decision</h3>
                    <div className="bg-gray-900/50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-gray-300">Total Trees: 5</div>
                        <div className="text-gray-300">Pass Votes: 4</div>
                        <div className="text-gray-300">Fail Votes: 1</div>
                      </div>
                      <div className="p-3 bg-green-900/30 rounded-lg">
                        <p className="text-green-400 font-medium">Final Prediction: Pass (80% confidence)</p>
                        <p className="text-gray-300 text-sm mt-2">
                          The Random Forest predicts the student will pass because 4 out of 5 trees voted for Pass.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Key Points */}
                  <div className="bg-purple-900/30 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-purple-400 mb-2">Key Points</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm sm:text-base">
                      <li>Each tree looks at different features to make its decision</li>
                      <li>The final prediction is based on majority voting</li>
                      <li>More trees voting the same way means higher confidence</li>
                      <li>Different trees can use the same feature but with different thresholds</li>
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