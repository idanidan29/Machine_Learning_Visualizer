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
import { logisticRegressionImplementation } from '../../data/psudo-code/logisticRegression';
import LogisticRegressionVisualization from '../../components/visualizations/LogisticRegressionVisualization';

export default function LogisticRegressionPage() {
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
          <div className="lg:ml-72 space-y-6">
            <PageHeader
              title="Logistic Regression"
              description="Explore how Logistic Regression models binary classification problems using the sigmoid function. Visualize how the algorithm finds the decision boundary between classes."
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
                    Logistic Regression is a fundamental supervised learning algorithm used for binary classification problems. Despite its name, it&apos;s a classification algorithm that uses the sigmoid function to model the probability of a binary outcome. It finds the best decision boundary that separates the classes while maximizing the likelihood of the observed data.
                  </p>
                </div>
              </section>

              {/* Visualization Section */}
              <section id="visualization" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <LogisticRegressionVisualization />
              </section>

              {/* How It Works Section */}
                <HowItWorks
                  title="How It Works"
                  steps={[
                    { number: 1, description: "Start with a dataset of input features (X) and binary labels (y)" },
                    { number: 2, description: "Initialize model parameters (weights and bias) with random values" },
                    { number: 3, description: "Calculate predictions using the sigmoid function: σ(z) = 1/(1 + e^(-z))" },
                    { number: 4, description: "Compute the loss (binary cross-entropy) between predictions and actual values" },
                    { number: 5, description: "Update parameters using gradient descent to maximize the likelihood" },
                    { number: 6, description: "Repeat steps 3-5 until convergence or maximum iterations reached" }
                  ]}
                />

              {/* When to Use Section */}
                <WhenToUse
                  idealUseCases={{
                    title: "Ideal Use Cases",
                    items: [
                      "Binary classification problems",
                      "Probability estimation",
                      "Medical diagnosis",
                      "Credit risk assessment",
                      "Customer churn prediction"
                    ]
                  }}
                  keyAdvantages={{
                    title: "Key Advantages",
                    items: [
                      "Simple and interpretable",
                      "Provides probability estimates",
                      "Works well with small datasets",
                      "Efficient training and prediction",
                      "Can be regularized to prevent overfitting"
                    ]
                  }}
                />

              {/* Formulas Section */}
              <section id="formulas" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Mathematical Formulas</h2>
                <div className="space-y-6">
                  <Formula
                    title="Logistic Function (Sigmoid)"
                    formula="σ(z) = 1/(1 + e^(-z))"
                    variables={[
                      { name: "z", description: "linear combination of features" },
                      { name: "e", description: "Euler's number (≈ 2.718)" }
                    ]}
                  />

                  <Formula
                    title="Binary Cross-Entropy Loss"
                    formula="L = -(1/n) * Σ[y * log(p) + (1-y) * log(1-p)]"
                    variables={[
                      { name: "n", description: "number of samples" },
                      { name: "y", description: "actual class (0 or 1)" },
                      { name: "p", description: "predicted probability" }
                    ]}
                  />

                  <Formula
                    title="Gradient Descent Update"
                    formula="w = w - α * (X^T * (p - y))"
                    variables={[
                      { name: "w", description: "model parameters" },
                      { name: "α", description: "learning rate" },
                      { name: "X", description: "feature matrix" },
                      { name: "p", description: "predicted probabilities" },
                      { name: "y", description: "actual labels" }
                    ]}
                  />

                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-purple-400 mb-2">Key Insights</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm sm:text-base">
                      <li>The sigmoid function maps any real number to a probability between 0 and 1</li>
                      <li>Binary cross-entropy loss penalizes confident wrong predictions more heavily</li>
                      <li>The decision boundary is linear in the feature space</li>
                      <li>Regularization can be added to prevent overfitting</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Practical Example Section */}
              <section id="practical-example" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Practical Example</h2>
                <div className="space-y-4">
                  <p className="text-gray-300 text-sm sm:text-base">
                    Let&apos;s consider a real-world example of using Logistic Regression for medical diagnosis:
                  </p>
                  <div className="mt-4 space-y-4">
                    <div className="bg-gray-700/50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-purple-400 mb-2">Problem</h3>
                      <p className="text-gray-300 text-sm">
                        A hospital wants to predict whether a patient has a certain disease based on various medical measurements.
                      </p>
                    </div>
                    <div className="bg-gray-700/50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-purple-400 mb-2">Solution</h3>
                      <p className="text-gray-300 text-sm">
                        Using Logistic Regression with features like:
                      </p>
                      <ul className="list-disc list-inside text-gray-300 text-sm mt-2">
                        <li>Age</li>
                        <li>Blood pressure</li>
                        <li>Cholesterol levels</li>
                        <li>BMI</li>
                        <li>Family history</li>
                      </ul>
                    </div>
                    <div className="bg-gray-700/50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-purple-400 mb-2">Results</h3>
                      <p className="text-gray-300 text-sm">
                        The model provides:
                      </p>
                      <ul className="list-disc list-inside text-gray-300 text-sm mt-2">
                        <li>Probability of disease for new patients</li>
                        <li>Feature importance through coefficients</li>
                        <li>Understanding of risk factors</li>
                        <li>Confidence in predictions</li>
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
                        <li>Category: Classification</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-purple-400 mb-2">Strengths</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm sm:text-base">
                        <li>Simple and interpretable</li>
                        <li>Provides probability estimates</li>
                        <li>Works well with small datasets</li>
                        <li>Efficient training and prediction</li>
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
                        <li>Assumes linear decision boundary</li>
                        <li>Requires feature scaling</li>
                        <li>Sensitive to outliers</li>
                        <li>Cannot handle missing values</li>
                      </ul>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-purple-400 mb-3">Mitigation Strategies</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm">
                        <li>Feature engineering for non-linear relationships</li>
                        <li>Regularization to prevent overfitting</li>
                        <li>Data preprocessing and outlier handling</li>
                        <li>Imputation techniques for missing values</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Pseudocode Section */}
              <section id="pseudocode" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Implementation</h2>
                <Code code={logisticRegressionImplementation} language="python" />
              </section>

              {/* Quiz Section */}
              <section id="quiz" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Test Your Knowledge</h2>
                <Quiz algorithm="logistic-regression" />
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 