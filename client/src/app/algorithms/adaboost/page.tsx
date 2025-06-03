'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Quiz from '../../components/Quiz';
import TableOfContents from '../../components/TableOfContents';
import Code from '../../components/ui/Code';
import PageHeader from '../../components/ui/PageHeader';
import Formula from '../../components/ui/Formula';
import AdaBoostVisualization from '../../components/visualizations/AdaBoostVisualization';
import HowItWorks from '../../components/ui/HowItWorks';
import WhenToUse from '../../components/ui/WhenToUse';

export default function AdaBoostPage() {
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
              title="AdaBoost"
              description="Explore how AdaBoost combines multiple weak learners to create a strong classifier. Understand the power of adaptive boosting in improving model performance through iterative weight adjustments."
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
                    AdaBoost (Adaptive Boosting) is an ensemble learning method that combines multiple weak learners
                    to create a strong classifier. It works by iteratively training weak learners on weighted versions
                    of the training data, where the weights are adjusted to focus on previously misclassified examples.
                    This adaptive approach makes AdaBoost particularly effective at improving the performance of simple
                    classifiers.
                  </p>
                </div>
              </section>

              {/* Visualization Section */}
              <section id="visualization" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Visualization</h2>
                <AdaBoostVisualization />
              </section>

              {/* How It Works Section */}
              <HowItWorks
                title="How It Works"
                steps={[
                  { number: 1, description: "Initialize equal weights for all training examples" },
                  { number: 2, description: "Train a weak learner on the weighted data" },
                  { number: 3, description: "Calculate the weighted error of the weak learner" },
                  { number: 4, description: "Update the weights of training examples (increase weights of misclassified examples)" },
                  { number: 5, description: "Repeat steps 2-4 for a specified number of iterations" },
                  { number: 6, description: "Combine weak learners using weighted voting" }
                ]}
              />

              {/* When to Use Section */}
              <WhenToUse
                idealUseCases={{
                  title: "Ideal Use Cases",
                  items: [
                    "Binary classification problems",
                    "When you have weak learners available",
                    "When interpretability is important",
                    "When you need fast training and prediction",
                    "When you have limited computational resources"
                  ]
                }}
                keyAdvantages={{
                  title: "Key Advantages",
                  items: [
                    "Simple to implement",
                    "No need to tune many parameters",
                    "Resistant to overfitting",
                    "Can use any weak learner",
                    "Provides feature importance"
                  ]
                }}
              />

              {/* Formulas Section */}
              <section id="formulas" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Formulas</h2>
                <div className="space-y-8">
                  <Formula
                    title="Weak Learner Weight"
                    formula="αₜ = ½ ln((1 - εₜ) / εₜ)"
                    variables={[
                      { name: "αₜ", description: "weight of the t-th weak learner" },
                      { name: "εₜ", description: "weighted error of the t-th weak learner" }
                    ]}
                    gradient="purple-blue"
                  />

                  <Formula
                    title="Example Weight Update"
                    formula="wₜ₊₁(i) = wₜ(i) * exp(αₜ * hₜ(xᵢ) * yᵢ)"
                    variables={[
                      { name: "wₜ(i)", description: "weight of example i at iteration t" },
                      { name: "hₜ(xᵢ)", description: "prediction of weak learner t on example i" },
                      { name: "yᵢ", description: "true label of example i" }
                    ]}
                    gradient="blue-purple"
                  />

                  <Formula
                    title="Final Prediction"
                    formula="H(x) = sign(∑ₜ₌₁ᵀ αₜ * hₜ(x))"
                    variables={[
                      { name: "H(x)", description: "final prediction" },
                      { name: "T", description: "number of weak learners" },
                      { name: "hₜ(x)", description: "prediction of weak learner t" }
                    ]}
                    gradient="purple-blue"
                  />
                </div>
              </section>

              {/* Practical Example Section */}
              <section id="practical-example" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Practical Example: Email Spam Detection</h2>
                <div className="space-y-6">
                  <p className="text-gray-300 text-sm sm:text-base">
                    Let&apos;s see how AdaBoost can be used to detect spam emails using simple features.
                  </p>

                  {/* Sample Data */}
                  <div className="bg-gray-900/50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-purple-400 mb-4">Email Features</h3>
                    <div className="grid grid-cols-2 gap-4 text-gray-300">
                      <div>Contains &quot;FREE&quot;: Yes</div>
                      <div>All Caps: No</div>
                      <div>Has Links: Yes</div>
                      <div>Word Count: 50</div>
                    </div>
                  </div>

                  {/* Weak Learners */}
                  <div className="bg-gray-900/50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-purple-400 mb-4">Weak Learners and Their Weights</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div className="text-gray-300">Learner 1</div>
                        <div className="text-gray-300">Rule: Contains &quot;FREE&quot;</div>
                        <div className="text-purple-400 font-medium">Weight: 0.8</div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div className="text-gray-300">Learner 2</div>
                        <div className="text-gray-300">Rule: All Caps</div>
                        <div className="text-purple-400 font-medium">Weight: 0.5</div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div className="text-gray-300">Learner 3</div>
                        <div className="text-gray-300">Rule: Has Links</div>
                        <div className="text-purple-400 font-medium">Weight: 0.3</div>
                      </div>
                    </div>
                  </div>

                  {/* Final Decision */}
                  <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 p-6 rounded-xl">
                    <h3 className="text-lg font-medium text-purple-400 mb-4">Final Decision</h3>
                    <div className="bg-gray-900/50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-gray-300">Total Weight: 1.6</div>
                        <div className="text-gray-300">Threshold: 0.5</div>
                      </div>
                      <div className="p-3 bg-red-900/30 rounded-lg">
                        <p className="text-red-400 font-medium">Final Prediction: Spam (80% confidence)</p>
                        <p className="text-gray-300 text-sm mt-2">
                          The email is classified as spam because the weighted sum of predictions exceeds the threshold.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Pseudo-code Section */}
              <section id="pseudocode" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Pseudo-code</h2>
                <Code
                  code={`function AdaBoost(data, T):
    # Initialize weights
    weights = [1/N for i in range(N)]
    weak_learners = []
    
    for t in range(T):
        # Train weak learner
        weak_learner = train_weak_learner(data, weights)
        
        # Calculate weighted error
        error = calculate_weighted_error(weak_learner, data, weights)
        
        # Calculate learner weight
        alpha = 0.5 * log((1 - error) / error)
        
        # Update weights
        for i in range(N):
            if weak_learner.predict(data[i]) != data[i].label:
                weights[i] *= exp(alpha)
            else:
                weights[i] *= exp(-alpha)
        
        # Normalize weights
        weights = normalize(weights)
        
        # Add to ensemble
        weak_learners.append((alpha, weak_learner))
    
    return weak_learners

function predict(weak_learners, x):
    prediction = 0
    for alpha, learner in weak_learners:
        prediction += alpha * learner.predict(x)
    return sign(prediction)`}
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
                        <li>Simple to implement</li>
                        <li>No need to tune many parameters</li>
                        <li>Resistant to overfitting</li>
                        <li>Can use any weak learner</li>
                        <li>Provides feature importance</li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <div>
                      <h3 className="text-lg font-medium text-purple-400 mb-2">Complexity</h3>
                      <ul className="text-gray-300 space-y-2 text-sm sm:text-base">
                        <li>Time Complexity: O(T * N * M)</li>
                        <li>Space Complexity: O(N * M)</li>
                        <li>where:</li>
                        <li>T = number of iterations</li>
                        <li>N = number of examples</li>
                        <li>M = number of features</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-purple-400 mb-2">Limitations</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm sm:text-base">
                        <li>Sensitive to noisy data</li>
                        <li>Can be affected by outliers</li>
                        <li>May not work well with complex data</li>
                        <li>Requires careful weak learner selection</li>
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
                    AdaBoost may not be suitable in the following scenarios:
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm sm:text-base">
                    <li>When the data is very noisy</li>
                    <li>When there are many outliers</li>
                    <li>When the weak learners are too complex</li>
                    <li>When the data is highly imbalanced</li>
                    <li>When you need probability estimates</li>
                    <li>When the features are highly correlated</li>
                  </ul>
                  <p className="text-gray-300 text-sm sm:text-base mt-4">
                    In these cases, consider other ensemble methods like Random Forest or Gradient Boosting.
                  </p>
                </div>
              </section>

              {/* Quiz Section */}
              <section id="quiz" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <Quiz algorithm="adaboost" />
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 