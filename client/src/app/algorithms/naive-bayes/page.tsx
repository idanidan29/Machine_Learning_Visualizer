/* eslint-disable react/no-unescaped-entities */
'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import NaiveBayesVisualization from '../../components/NaiveBayesVisualization';
import NaiveBayesQuiz from '../../components/NaiveBayesQuiz';

export default function NaiveBayesPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const sections = [
    { id: 'overview', title: 'Overview', icon: '📋' },
    { id: 'visualization', title: 'Visualization', icon: '🎯' },
    { id: 'when-to-use', title: 'When to Use', icon: '⏰' },
    { id: 'how-it-works', title: 'How It Works', icon: '⚙️' },
    { id: 'example', title: 'Example', icon: '📝' },
    { id: 'characteristics', title: 'Characteristics', icon: '📊' },
    { id: 'limitations', title: 'Limitations', icon: '⚠️' },
    { id: 'quiz', title: 'Quiz', icon: '❓' }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex">
          {/* Table of Contents Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0 mr-8">
            <div className="sticky top-24">
              <div className="bg-gray-800 rounded-xl shadow-xl p-4">
                <h3 className="text-lg font-semibold text-white mb-4 px-2">Contents</h3>
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
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div 
              className={`text-center mb-8 transition-all duration-1000 ease-out transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <h1 className="text-4xl font-bold text-white mb-4">
                Naive Bayes Classification
              </h1>
              <p className="text-gray-300 max-w-2xl mx-auto mb-6">
                Explore how Naive Bayes uses probability to classify data points.
                Watch how the algorithm calculates posterior probabilities and makes predictions
                based on feature independence assumptions.
              </p>
              <button
                onClick={() => scrollToSection('quiz')}
                className="inline-flex items-center px-6 py-3 rounded-full bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors duration-200 shadow-lg shadow-purple-600/20 hover:shadow-purple-600/30"
              >
                Test Your Knowledge
                <svg
                  className="ml-2 w-5 h-5"
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

            <div className="space-y-8">
              {/* Overview Section */}
              <section id="overview" className="bg-gray-800 rounded-xl shadow-xl p-6">
                <h2 className="text-2xl font-semibold text-white mb-4">Overview</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300">
                    Naive Bayes is a probabilistic classifier based on Bayes' theorem with an assumption of independence
                    between features. It's particularly effective for text classification and spam filtering. Despite its
                    "naive" assumption of feature independence, it often performs well in practice and is computationally
                    efficient.
                  </p>
                </div>
              </section>

              {/* Visualization Section */}
              <section id="visualization" className="bg-gray-800 rounded-xl shadow-xl p-6">
                <NaiveBayesVisualization />
              </section>

              {/* When to Use Section */}
              <section id="when-to-use" className="bg-gray-800 rounded-xl shadow-xl p-6">
                <h2 className="text-2xl font-semibold text-white mb-4">When to Use It</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-purple-400 mb-2">Ideal Use Cases</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                      <li>Text classification and spam filtering</li>
                      <li>Sentiment analysis</li>
                      <li>Document categorization</li>
                      <li>Medical diagnosis</li>
                      <li>Weather prediction</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-purple-400 mb-2">Assumptions</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                      <li>Features are conditionally independent</li>
                      <li>All features contribute equally to the outcome</li>
                      <li>No missing values in the training data</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* How It Works Section */}
              <section id="how-it-works" className="bg-gray-800 rounded-xl shadow-xl p-6">
                <h2 className="text-2xl font-semibold text-white mb-4">How It Works</h2>
                <div className="space-y-4">
                  <p className="text-gray-300">
                    The Naive Bayes algorithm works through these steps:
                  </p>
                  <ol className="list-decimal list-inside text-gray-300 space-y-2">
                    <li>Calculate prior probabilities for each class</li>
                    <li>Calculate likelihood probabilities for each feature given each class</li>
                    <li>Apply Bayes' theorem to compute posterior probabilities</li>
                    <li>Select the class with the highest posterior probability</li>
                  </ol>

                  {/* Formula Section */}
                  <div  className="mt-8 bg-gray-900 rounded-lg p-8">
                    <h3 className="text-xl font-semibold text-white mb-6 text-center">Bayes' Theorem</h3>
                    
                    <div className="flex flex-col items-center space-y-8">
                      {/* Main Formula */}
                      <div  className="bg-gray-800 p-6 rounded-lg w-full max-w-2xl">
                        <div className="text-center text-2xl text-white font-mono">
                          P(class|features) = <span className="text-purple-400">P(features|class) × P(class)</span> / P(features)
                        </div>
                      </div>

                      {/* Formula Components */}
                      <div className="grid md:grid-cols-2 gap-6 w-full max-w-2xl">
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-purple-400 font-semibold mb-2">Posterior Probability</h4>
                          <p className="text-gray-300 text-sm">P(class|features)</p>
                          <p className="text-gray-400 text-xs mt-1">Probability of class given the features</p>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-purple-400 font-semibold mb-2">Prior Probability</h4>
                          <p className="text-gray-300 text-sm">P(class)</p>
                          <p className="text-gray-400 text-xs mt-1">Initial probability of the class</p>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-purple-400 font-semibold mb-2">Likelihood</h4>
                          <p className="text-gray-300 text-sm">P(features|class)</p>
                          <p className="text-gray-400 text-xs mt-1">Probability of features given the class</p>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-purple-400 font-semibold mb-2">Evidence</h4>
                          <p className="text-gray-300 text-sm">P(features)</p>
                          <p className="text-gray-400 text-xs mt-1">Probability of the features</p>
                        </div>
                      </div>

                      {/* Naive Bayes Formula */}
                      
                      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-2xl">
                        <h4  className="text-purple-400 font-semibold mb-4 text-center">Naive Bayes Formula</h4>
                        <div className="text-center text-lg text-white font-mono">
                          P(class|features) ∝ P(class) × <span className="text-purple-400">∏</span> P(feature<sub>i</sub>|class)
                        </div>
                        <p className="text-gray-400 text-sm mt-4 text-center">
                          Where ∏ represents the product of all feature probabilities
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 mt-4">
                    The algorithm uses Bayes' theorem to calculate the probability of a class given a set of features.
                    The "naive" assumption is that all features are conditionally independent given the class.
                  </p>

                  {/* Detailed Example Section */}
                  <div id="example" className="mt-8 bg-gray-900 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Detailed Example</h3>
                    <p className="text-gray-300 mb-4">
                      Let's solve a simple spam detection problem using Naive Bayes:
                    </p>

                    <div className="space-y-6">
                      {/* Training Data */}
                      <div>
                        <h4 className="text-lg font-medium text-purple-400 mb-2">Training Data</h4>
                        <div className="overflow-x-auto">
                          <table className="min-w-full bg-gray-800 rounded-lg">
                            <thead>
                              <tr>
                                <th className="px-4 py-2 text-left text-gray-300">Email</th>
                                <th className="px-4 py-2 text-left text-gray-300">Contains "money"</th>
                                <th className="px-4 py-2 text-left text-gray-300">Contains "urgent"</th>
                                <th className="px-4 py-2 text-left text-gray-300">Class</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="px-4 py-2 text-gray-300">Email 1</td>
                                <td className="px-4 py-2 text-gray-300">Yes</td>
                                <td className="px-4 py-2 text-gray-300">Yes</td>
                                <td className="px-4 py-2 text-gray-300">Spam</td>
                              </tr>
                              <tr>
                                <td className="px-4 py-2 text-gray-300">Email 2</td>
                                <td className="px-4 py-2 text-gray-300">Yes</td>
                                <td className="px-4 py-2 text-gray-300">No</td>
                                <td className="px-4 py-2 text-gray-300">Spam</td>
                              </tr>
                              <tr>
                                <td className="px-4 py-2 text-gray-300">Email 3</td>
                                <td className="px-4 py-2 text-gray-300">No</td>
                                <td className="px-4 py-2 text-gray-300">No</td>
                                <td className="px-4 py-2 text-gray-300">Not Spam</td>
                              </tr>
                              <tr>
                                <td className="px-4 py-2 text-gray-300">Email 4</td>
                                <td className="px-4 py-2 text-gray-300">No</td>
                                <td className="px-4 py-2 text-gray-300">Yes</td>
                                <td className="px-4 py-2 text-gray-300">Not Spam</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Step 1: Prior Probabilities */}
                      <div>
                        <h4 className="text-lg font-medium text-purple-400 mb-2">Step 1: Calculate Prior Probabilities</h4>
                        <div className="bg-gray-800 rounded-lg p-4">
                          <p className="text-gray-300 mb-2">P(Spam) = 2/4 = 0.5</p>
                          <p className="text-gray-300">P(Not Spam) = 2/4 = 0.5</p>
                        </div>
                      </div>

                      {/* Step 2: Likelihood Probabilities */}
                      <div>
                        <h4 className="text-lg font-medium text-purple-400 mb-2">Step 2: Calculate Likelihood Probabilities</h4>
                        <div className="bg-gray-800 rounded-lg p-4">
                          <p className="text-gray-300 mb-2">For Spam class:</p>
                          <p className="text-gray-300 mb-2">P("money"|Spam) = 2/2 = 1.0</p>
                          <p className="text-gray-300 mb-2">P("urgent"|Spam) = 1/2 = 0.5</p>
                          <p className="text-gray-300 mb-2">For Not Spam class:</p>
                          <p className="text-gray-300 mb-2">P("money"|Not Spam) = 0/2 = 0.0</p>
                          <p className="text-gray-300">P("urgent"|Not Spam) = 1/2 = 0.5</p>
                        </div>
                      </div>

                      {/* Step 3: Classify New Email */}
                      <div>
                        <h4 className="text-lg font-medium text-purple-400 mb-2">Step 3: Classify New Email</h4>
                        <p className="text-gray-300 mb-4">New email contains "money" but not "urgent"</p>
                        <div className="bg-gray-800 rounded-lg p-4">
                          <p className="text-gray-300 mb-2">P(Spam|features) = P(features|Spam) * P(Spam)</p>
                          <p className="text-gray-300 mb-2">= P("money"|Spam) * P("not urgent"|Spam) * P(Spam)</p>
                          <p className="text-gray-300 mb-2">= 1.0 * 0.5 * 0.5 = 0.25</p>
                          <p className="text-gray-300 mb-2">P(Not Spam|features) = P(features|Not Spam) * P(Not Spam)</p>
                          <p className="text-gray-300 mb-2">= P("money"|Not Spam) * P("not urgent"|Not Spam) * P(Not Spam)</p>
                          <p className="text-gray-300">= 0.0 * 0.5 * 0.5 = 0.0</p>
                        </div>
                        <p className="text-gray-300 mt-4">
                          Since P(Spam|features) &gt; P(Not Spam|features), the email is classified as Spam.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              

              {/* Characteristics Section */}
              <section id="characteristics" className="bg-gray-800 rounded-xl shadow-xl p-6">
                <h2 className="text-2xl font-semibold text-white mb-4">Key Characteristics</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium text-purple-400 mb-2">Type & Category</h3>
                      <ul className="text-gray-300 space-y-2">
                        <li>Type: Supervised Learning</li>
                        <li>Category: Classification</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-purple-400 mb-2">Strengths</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2">
                        <li>Fast training and prediction</li>
                        <li>Works well with high-dimensional data</li>
                        <li>Requires little training data</li>
                        <li>Handles both continuous and discrete features</li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <div>
                      <h3 className="text-lg font-medium text-purple-400 mb-2">Complexity</h3>
                      <ul className="text-gray-300 space-y-2">
                        <li>Training Time: O(n * d)</li>
                        <li>Prediction Time: O(d)</li>
                        <li>where:</li>
                        <li>n = number of training examples</li>
                        <li>d = number of features</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-purple-400 mb-2">Limitations</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2">
                        <li>Assumes feature independence</li>
                        <li>Sensitive to feature scaling</li>
                        <li>Requires feature discretization for continuous data</li>
                        <li>Zero probability problem with unseen features</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Limitations Section */}
              <section id="limitations" className="bg-gray-800 rounded-xl shadow-xl p-6">
                <h2 className="text-2xl font-semibold text-white mb-4">When Not to Use It</h2>
                <div className="space-y-4">
                  <p className="text-gray-300">
                    Naive Bayes may not be suitable in the following scenarios:
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    <li>When features are highly correlated</li>
                    <li>When feature independence assumption is violated</li>
                    <li>When probability estimates are important</li>
                    <li>When dealing with complex feature interactions</li>
                    <li>When training data is very small</li>
                  </ul>
                  <p className="text-gray-300 mt-4">
                    In these cases, consider alternative algorithms like Logistic Regression,
                    Random Forests, or Support Vector Machines.
                  </p>
                </div>
              </section>

              {/* Quiz Section */}
              <section id="quiz" className="bg-gray-800 rounded-xl shadow-xl p-6">
                <NaiveBayesQuiz />
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 