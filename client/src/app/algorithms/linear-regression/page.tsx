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
import { linearRegressionImplementation } from '../../data/psudo-code/linearRegression';
import LinearRegressionVisualization from '../../components/visualizations/LinearRegressionVisualization';

export default function LinearRegressionPage() {
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
              title="Linear Regression"
              description="Explore how Linear Regression models the relationship between variables using a linear equation. Visualize how the algorithm finds the best-fit line through data points."
              onQuizClick={() => {
                const section = document.getElementById('quiz');
                if (section) {
                  section.scrollIntoView({ behavior: 'smooth' });
                  setActiveSection('quiz');
                }
              }}
            />

            {/* Content Sections */}
            <div className="space-y-8">
              {/* Overview Section */}
              <section id="overview" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Overview</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 text-sm sm:text-base">
                    Linear Regression is a fundamental supervised learning algorithm that models the relationship between a dependent variable and one or more independent variables using a linear equation. It finds the best-fit line that minimizes the sum of squared differences between predicted and actual values.
                  </p>
                </div>
              </section>

              {/* Visualization Section */}
              <section id="visualization" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <LinearRegressionVisualization />
              </section>

              {/* How It Works Section */}
                <HowItWorks
                  title="How It Works"
                  steps={[
                    { number: 1, description: "Start with a dataset of input features (X) and target values (y)" },
                    { number: 2, description: "Initialize model parameters (weights and bias) with random values" },
                    { number: 3, description: "Calculate predictions using the linear equation: y = mx + b" },
                    { number: 4, description: "Compute the loss (mean squared error) between predictions and actual values" },
                    { number: 5, description: "Update parameters using gradient descent to minimize the loss" },
                    { number: 6, description: "Repeat steps 3-5 until convergence or maximum iterations reached" }
                  ]}
                />

              {/* When to Use Section */}

                <WhenToUse
                  idealUseCases={{
                    title: "Ideal Use Cases",
                    items: [
                      "Predicting continuous values",
                      "Understanding relationships between variables",
                      "Simple, interpretable models",
                      "Baseline model for comparison",
                      "Feature importance analysis"
                    ]
                  }}
                  keyAdvantages={{
                    title: "Key Advantages",
                    items: [
                      "Simple and interpretable",
                      "Computationally efficient",
                      "Works well with small datasets",
                      "Provides statistical insights",
                      "Easy to implement and understand"
                    ]
                  }}
                />

              {/* Formulas Section */}
              <section id="formulas" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Mathematical Formulas</h2>
                <div className="space-y-6">
                  <Formula
                    title="Linear Regression Equation"
                    formula="y = β₀ + β₁x₁ + β₂x₂ + ... + βₙxₙ + ε"
                    variables={[
                      { name: "y", description: "dependent variable (target)" },
                      { name: "β₀", description: "intercept (bias)" },
                      { name: "βᵢ", description: "coefficients (weights)" },
                      { name: "xᵢ", description: "independent variables (features)" },
                      { name: "ε", description: "error term" }
                    ]}
                  />

                  <Formula
                    title="Mean Squared Error"
                    formula="MSE = (1/n) * Σ(yᵢ - ŷᵢ)²"
                    variables={[
                      { name: "n", description: "number of samples" },
                      { name: "yᵢ", description: "actual value" },
                      { name: "ŷᵢ", description: "predicted value" }
                    ]}
                  />

                  <Formula
                    title="Gradient Descent Update"
                    formula="β = β - α * ∇J(β)"
                    variables={[
                      { name: "β", description: "model parameters" },
                      { name: "α", description: "learning rate" },
                      { name: "∇J(β)", description: "gradient of cost function" }
                    ]}
                  />

                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-purple-400 mb-2">Key Insights</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm sm:text-base">
                      <li>The linear equation represents a hyperplane in n-dimensional space</li>
                      <li>Gradient descent iteratively updates parameters to minimize the loss</li>
                      <li>The learning rate controls the step size in parameter updates</li>
                      <li>Regularization can be added to prevent overfitting</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Practical Example Section */}
              <section id="practical-example" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Practical Example</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 text-sm sm:text-base">
                    Let&apos;s consider a real-world example of using Linear Regression for house price prediction:
                  </p>
                  <div className="mt-4 space-y-4">
                    <div className="bg-gray-700/50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-purple-400 mb-2">Problem</h3>
                      <p className="text-gray-300 text-sm">
                        A real estate company wants to predict house prices based on various features.
                      </p>
                    </div>
                    <div className="bg-gray-700/50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-purple-400 mb-2">Solution</h3>
                      <p className="text-gray-300 text-sm">
                        Using Linear Regression with features like:
                      </p>
                      <ul className="list-disc list-inside text-gray-300 text-sm mt-2">
                        <li>Square footage</li>
                        <li>Number of bedrooms</li>
                        <li>Number of bathrooms</li>
                        <li>Location features</li>
                        <li>Age of the house</li>
                      </ul>
                    </div>
                    <div className="bg-gray-700/50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-purple-400 mb-2">Results</h3>
                      <p className="text-gray-300 text-sm">
                        The model provides:
                      </p>
                      <ul className="list-disc list-inside text-gray-300 text-sm mt-2">
                        <li>Price predictions for new houses</li>
                        <li>Feature importance through coefficients</li>
                        <li>Understanding of price relationships</li>
                        <li>Confidence intervals for predictions</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Characteristics Section */}
              <section id="characteristics" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Key Characteristics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium text-purple-400 mb-2">Type & Category</h3>
                      <ul className="text-gray-300 space-y-2 text-sm sm:text-base">
                        <li>Type: Supervised Learning</li>
                        <li>Category: Regression</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-purple-400 mb-2">Strengths</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm sm:text-base">
                        <li>Simple and interpretable</li>
                        <li>Computationally efficient</li>
                        <li>Works well with small datasets</li>
                        <li>Provides statistical insights</li>
                      </ul>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium text-purple-400 mb-2">Parameters</h3>
                      <ul className="text-gray-300 space-y-2 text-sm sm:text-base">
                        <li>Learning rate</li>
                        <li>Number of iterations</li>
                        <li>Regularization strength</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-purple-400 mb-2">Complexity</h3>
                      <ul className="text-gray-300 space-y-2 text-sm sm:text-base">
                        <li>Time: O(n * d) per iteration</li>
                        <li>Space: O(d) for parameters</li>
                        <li>Where n = samples, d = features</li>
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
                        <li>Assumes linear relationships</li>
                        <li>Sensitive to outliers</li>
                        <li>Requires feature scaling</li>
                        <li>Can&apos;t handle non-linear patterns</li>
                        <li>Assumes independent features</li>
                        <li>May overfit with many features</li>
                      </ul>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-purple-400 mb-3">Mitigation Strategies</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm">
                        <li>Feature engineering</li>
                        <li>Outlier detection and removal</li>
                        <li>Regularization techniques</li>
                        <li>Cross-validation</li>
                        <li>Feature selection</li>
                        <li>Data preprocessing</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Pseudocode Section */}
              <section id="pseudocode" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Pseudo-code</h2>
                <Code code={linearRegressionImplementation} language="python" />
              </section>

              {/* Quiz Section */}
              <section id="quiz" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Quiz</h2>
                <Quiz algorithm='linear-regression' />
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 