'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Quiz from '../../components/Quiz';
import TableOfContents from '../../components/TableOfContents';
import Code from '../../components/ui/Code';
import PageHeader from '../../components/ui/PageHeader';
import Formula from '../../components/ui/Formula';
import SVMVisualization from '../../components/visualizations/SVMVisualization';
import WhenToUse from '../../components/ui/WhenToUse';
import HowItWorks from '../../components/ui/HowItWorks';
import { svmImplementation } from '../../data/psudo-code/svm';

export default function SVMPage() {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', title: 'Overview', icon: '📋' },
    { id: 'visualization', title: 'Visualization', icon: '🔍' },
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
              title="Support Vector Machine (SVM)"
              description="Explore how Support Vector Machines find optimal hyperplanes to separate data classes with maximum margin. Understand the power of kernel functions and how SVMs handle both linear and non-linear classification problems."
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
                    Support Vector Machine (SVM) is a powerful supervised learning algorithm used for classification, regression, and outlier detection. 
                    The core idea behind SVM is to find a hyperplane that best separates data points of different classes while maximizing the margin 
                    between them. SVMs can handle both linear and non-linear classification problems through the use of kernel functions, making them 
                    versatile for various machine learning tasks.
                  </p>
                </div>
              </section>

              {/* Visualization Section */}
              <section id="visualization" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Visualization</h2>
                <SVMVisualization />
              </section>

              {/* How It Works Section */}
              <HowItWorks
                steps={[
                  { number: 1, description: "Find the optimal hyperplane that separates the classes" },
                  { number: 2, description: "Maximize the margin between the classes" },
                  { number: 3, description: "Use support vectors (closest points) to define the margin" },
                  { number: 4, description: "Apply kernel functions for non-linear transformations" },
                  { number: 5, description: "Classify new points based on which side of the hyperplane they fall" }
                ]}
              />

              {/* When to Use Section */}
              <WhenToUse
                idealUseCases={{
                  title: "Ideal Use Cases",
                  items: [
                    "Binary classification problems",
                    "High-dimensional data",
                    "Text classification",
                    "Image recognition",
                    "Bioinformatics applications"
                  ]
                }}
                keyAdvantages={{
                  title: "Key Advantages",
                  items: [
                    "Effective in high-dimensional spaces",
                    "Memory efficient",
                    "Versatile through kernel functions",
                    "Robust to overfitting",
                    "Clear geometric interpretation"
                  ]
                }}
              />

              {/* Formulas Section */}
              <section id="formulas" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Formulas</h2>
                <div className="space-y-8">
                  <Formula
                    title="Linear SVM Decision Function"
                    formula="f(x) = w^T x + b"
                    variables={[
                      { name: "w", description: "weight vector" },
                      { name: "x", description: "input feature vector" },
                      { name: "b", description: "bias term" }
                    ]}
                    gradient="purple-blue"
                  />

                  <Formula
                    title="Margin Optimization"
                    formula="min (1/2) ||w||² subject to y_i(w^T x_i + b) ≥ 1"
                    variables={[
                      { name: "w", description: "weight vector" },
                      { name: "y_i", description: "class label (-1 or +1)" },
                      { name: "x_i", description: "training sample" }
                    ]}
                    gradient="blue-purple"
                  />

                  <Formula
                    title="Kernel Function"
                    formula="K(x_i, x_j) = φ(x_i)^T φ(x_j)"
                    variables={[
                      { name: "K", description: "kernel function" },
                      { name: "φ", description: "feature mapping function" },
                      { name: "x_i, x_j", description: "input vectors" }
                    ]}
                    gradient="purple-blue"
                  />

                  <Formula
                    title="RBF Kernel"
                    formula="K(x_i, x_j) = exp(-γ||x_i - x_j||²)"
                    variables={[
                      { name: "γ", description: "gamma parameter" },
                      { name: "||x_i - x_j||", description: "Euclidean distance" }
                    ]}
                    gradient="blue-purple"
                  />
                </div>
              </section>

              {/* Practical Example Section */}
              <section id="practical-example" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Practical Example: Email Spam Classification</h2>
                <div className="space-y-6">
                  <p className="text-gray-300 text-sm sm:text-base">
                    Let&apos;s see how SVM classifies emails as spam or legitimate based on word frequencies.
                  </p>

                  {/* Sample Data */}
                  <div className="bg-gray-900/50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-purple-400 mb-4">Email Features</h3>
                    <div className="grid grid-cols-2 gap-4 text-gray-300">
                      <div>Word &quot;free&quot;: 0.8</div>
                      <div>Word &quot;money&quot;: 0.6</div>
                      <div>Word &quot;urgent&quot;: 0.9</div>
                      <div>Word &quot;meeting&quot;: 0.1</div>
                    </div>
                  </div>

                  {/* SVM Decision Process */}
                  <div className="bg-gray-900/50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-purple-400 mb-4">SVM Decision Process</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div className="text-gray-300">Feature Vector</div>
                        <div className="text-gray-300">[0.8, 0.6, 0.9, 0.1]</div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div className="text-gray-300">Weight Vector</div>
                        <div className="text-gray-300">[2.5, 1.8, 2.1, -0.5]</div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div className="text-gray-300">Bias Term</div>
                        <div className="text-gray-300">-1.2</div>
                      </div>
                    </div>
                  </div>

                  {/* Calculation */}
                  <div className="bg-gray-900/50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-purple-400 mb-4">Decision Calculation</h3>
                    <div className="space-y-3 text-gray-300">
                      <div>f(x) = w^T x + b</div>
                      <div>= 2.5×0.8 + 1.8×0.6 + 2.1×0.9 + (-0.5)×0.1 + (-1.2)</div>
                      <div>= 2.0 + 1.08 + 1.89 + (-0.05) + (-1.2)</div>
                      <div>= 3.72</div>
                    </div>
                  </div>

                  {/* Final Decision */}
                  <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 p-6 rounded-xl">
                    <h3 className="text-lg font-medium text-purple-400 mb-4">Final Decision</h3>
                    <div className="bg-gray-900/50 p-4 rounded-lg">
                      <div className="p-3 bg-red-900/30 rounded-lg">
                        <p className="text-red-400 font-medium">Classification: Spam</p>
                        <p className="text-gray-300 text-sm mt-2">
                          Since f(x) = 3.72 {'>'} 0, the SVM classifies this email as spam. The high values of 
                          &quot;free&quot;, &quot;money&quot;, and &quot;urgent&quot; contribute to the spam classification.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Key Points */}
                  <div className="bg-purple-900/30 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-purple-400 mb-2">Key Points</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm sm:text-base">
                      <li>The decision boundary is defined by w^T x + b = 0</li>
                      <li>Positive values classify as one class, negative as the other</li>
                      <li>Support vectors are the closest points to the decision boundary</li>
                      <li>The margin is maximized to improve generalization</li>
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
                        <li>Type: Supervised Learning</li>
                        <li>Category: Classification/Regression</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-purple-400 mb-2">Strengths</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm sm:text-base">
                        <li>Effective in high-dimensional spaces</li>
                        <li>Memory efficient</li>
                        <li>Versatile through kernel functions</li>
                        <li>Robust to overfitting</li>
                        <li>Clear geometric interpretation</li>
                      </ul>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium text-purple-400 mb-2">Complexity</h3>
                      <ul className="text-gray-300 space-y-2 text-sm sm:text-base">
                        <li>Training: O(n²) to O(n³)</li>
                        <li>Prediction: O(n_sv × d)</li>
                        <li>where:</li>
                        <li>n = number of training samples</li>
                        <li>n_sv = number of support vectors</li>
                        <li>d = number of features</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-purple-400 mb-2">Limitations</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm sm:text-base">
                        <li>Sensitive to feature scaling</li>
                        <li>Requires careful parameter tuning</li>
                        <li>Can be slow for large datasets</li>
                        <li>Binary classification by default</li>
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
                    SVM may not be suitable in the following scenarios:
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm sm:text-base">
                    <li>When the dataset is very large ({'>'}100,000 samples)</li>
                    <li>When features are not properly scaled</li>
                    <li>When interpretability is crucial</li>
                    <li>When computational resources are limited</li>
                    <li>When dealing with noisy data</li>
                    <li>When real-time predictions are required</li>
                  </ul>
                  <p className="text-gray-300 text-sm sm:text-base mt-4">
                    In these cases, consider alternatives like Random Forest, Neural Networks, or simpler 
                    models like Logistic Regression.
                  </p>
                </div>
              </section>

              {/* Pseudo-code Section */}
              <section id="pseudocode" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Pseudo-code</h2>
                <Code
                  code={svmImplementation}
                  language="python"
                />
              </section>

              {/* Quiz Section */}
              <section id="quiz" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <Quiz algorithm="svm" />
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 