'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import DecisionTreeVisualization from '../../components/visualizations/DecisionTreeVisualization';
import Quiz from '../../components/Quiz';
import TableOfContents from '../../components/TableOfContents';
import Code from '../../components/ui/Code';
import PDFDownloadCard from '../../components/ui/PDFDownloadCard';
import PageHeader from '../../components/ui/PageHeader';
import Formula from '../../components/ui/Formula';
import HowItWorks from '../../components/ui/HowItWorks';
import WhenToUse from '../../components/ui/WhenToUse';
import { decisionTreeImplementation } from '../../data/psudo-code/decision-tree';

export default function DecisionTreePage() {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', title: 'Overview', icon: '📋' },
    { id: 'visualization', title: 'Visualization', icon: '🌳' },
    { id: 'when-to-use', title: 'When to Use', icon: '⏰' },
    { id: 'how-it-works', title: 'How It Works', icon: '⚙️' },
    { id: 'decisions', title: 'Decisions', icon: '🎯' },
    { id: 'information-gain', title: 'Information Gain', icon: '📈' },
    { id: 'gini-impurity', title: 'Gini Impurity', icon: '🎲' },
    { id: 'chi-square', title: 'Chi-Square', icon: '📊' },
    { id: 'practical-example', title: 'Practical Example', icon: '📝' },
    { id: 'pdf-download', title: 'Complex Example', icon: '📄' },
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
              title="Decision Tree"
              description="Explore how decision trees make predictions by learning simple decision rules from data. Visualize the tree structure and understand how it splits data to make decisions."
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
                    A Decision Tree is a supervised learning algorithm that uses a tree-like model of decisions and their possible consequences.
                    It&apos;s a powerful and intuitive algorithm that can be used for both classification and regression tasks. The algorithm works by
                    recursively splitting the data into subsets based on the most significant features, creating a tree structure where each
                    internal node represents a decision based on a feature, and each leaf node represents a prediction.
                  </p>
                </div>
              </section>

              {/* Visualization Section */}
              <section id="visualization" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <DecisionTreeVisualization />
              </section>

{/* How It Works Section */}
              <HowItWorks
                title="How It Works"
                steps={[
                  { number: 1, description: "Select the best feature to split the data based on information gain or Gini impurity" },
                  { number: 2, description: "Create a decision node that splits the data into subsets" },
                  { number: 3, description: "Recursively repeat the process for each subset" },
                  { number: 4, description: "Stop when a stopping criterion is met (e.g., maximum depth, minimum samples)" },
                  { number: 5, description: "Assign the most common class (classification) or mean value (regression) to leaf nodes" }
                ]}
              />

              {/* When to Use Section */}
              <WhenToUse
                idealUseCases={{
                  title: "Ideal Use Cases",
                  items: [
                    "Classification problems with clear decision boundaries",
                    "Regression problems with non-linear relationships",
                    "Feature importance analysis",
                    "When interpretability is crucial",
                    "When dealing with both numerical and categorical features"
                  ]
                }}
                keyAdvantages={{
                  title: "Key Advantages",
                  items: [
                    "Easy to understand and interpret",
                    "Can handle both numerical and categorical data",
                    "Requires little data preprocessing",
                    "Can capture non-linear relationships",
                    "Feature importance is inherent"
                  ]
                }}
              />

              {/* Decisions Section */}
              <section id="decisions" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Key Decisions in Decision Trees</h2>
                <div className="space-y-6">
                  
                  
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

              {/* Information Gain Section */}
              <section id="information-gain" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Information Gain</h2>
                <div className="space-y-6">
                  <div className="space-y-8">
                    <Formula
                      title="Information Gain"
                      formula="IG(D,S) = H(D) - Σ(|Dᵥ|/|D|) * H(Dᵥ)"
                      variables={[
                        { name: "IG(D,S)", description: "information gain of split S on dataset D" },
                        { name: "H(D)", description: "entropy of dataset D" },
                        { name: "Dᵥ", description: "subset of D for value v of feature S" },
                        { name: "|D|", description: "size of dataset D" }
                      ]}
                      gradient="purple-blue"
                    />

                    <Formula
                      title="Entropy"
                      formula="H(D) = -Σ pᵢ * log₂(pᵢ)"
                      variables={[
                        { name: "H(D)", description: "entropy of dataset D" },
                        { name: "pᵢ", description: "proportion of class i in dataset D" }
                      ]}
                      gradient="blue-purple"
                    />
                  </div>

                  <div className="space-y-6">
                    <p className="text-gray-300 text-sm sm:text-base">
                      Information Gain measures how much a feature reduces uncertainty in the dataset. It&apos;s calculated by comparing the entropy
                      of the parent node with the weighted average entropy of the child nodes after splitting.
                    </p>

                    <div className="bg-gray-700 rounded-lg p-6">
                      <h3 className="text-lg font-medium text-purple-400 mb-4">Example: Loan Approval Decision</h3>
                      
                      {/* Parent Node */}
                      <div className="mb-8">
                        <h4 className="text-purple-300 font-medium mb-3">Parent Node (Before Split)</h4>
                        <div className="bg-gray-600 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 rounded-full bg-green-500"></div>
                              <span className="text-gray-300">Approved</span>
                            </div>
                            <span className="text-white font-medium">4 loans</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 rounded-full bg-red-500"></div>
                              <span className="text-gray-300">Not Approved</span>
                            </div>
                            <span className="text-white font-medium">6 loans</span>
                          </div>
                          <div className="mt-4 pt-4 border-t border-gray-500">
                            <div className="flex justify-between items-center">
                              <span className="text-purple-300">Parent Entropy</span>
                              <span className="text-white font-medium">0.971</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Split Visualization */}
                      <div className="flex justify-center mb-12">
                        <div className="relative w-full max-w-2xl">
                          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-500"></div>
                          <div className="absolute left-1/2 top-0 w-0.5 h-8 bg-gray-500"></div>
                          <div className="absolute left-1/2 -translate-x-1/2 top-8 px-4 py-2 bg-gray-600 border border-purple-500 rounded-lg text-white shadow-lg transform -translate-y-1/2">
                            <div className="flex flex-col items-center space-y-1">
                              <div className="text-purple-300 font-medium flex items-center gap-2">
                                <span className="text-lg">📊</span>
                                <span>Decision Point: Credit Score</span>
                              </div>
                              <span className="text-gray-400 text-sm">(Highest Information Gain)</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Split Explanation */}
                      <div className="mb-8 bg-gray-600 rounded-lg p-4">
                        <h4 className="text-purple-300 font-medium mb-3">Why Split by Credit Score?</h4>
                        <div className="space-y-3 text-gray-300 text-sm">
                          <p>We compared different features to find the best split:</p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-gray-500/50 rounded-lg p-3">
                              <p className="text-purple-300 font-medium mb-1">Credit Score</p>
                              <p className="text-white">Information Gain: 0.246</p>
                            </div>
                            <div className="bg-gray-500/50 rounded-lg p-3">
                              <p className="text-purple-300 font-medium mb-1">Income</p>
                              <p className="text-white">Information Gain: 0.180</p>
                            </div>
                            <div className="bg-gray-500/50 rounded-lg p-3">
                              <p className="text-purple-300 font-medium mb-1">Employment</p>
                              <p className="text-white">Information Gain: 0.150</p>
                            </div>
                          </div>
                          <p className="mt-3">Credit Score provided the highest information gain, making it the best feature to split on.</p>
                        </div>
                      </div>

                      {/* Child Nodes */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Child */}
                        <div className="bg-gray-600 rounded-lg p-4">
                          <h4 className="text-purple-300 font-medium mb-3">Left Child (Credit Score ≤ 700)</h4>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                <span className="text-gray-300">Approved</span>
                              </div>
                              <span className="text-white font-medium">3 loans</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <span className="text-gray-300">Not Approved</span>
                              </div>
                              <span className="text-white font-medium">1 loan</span>
                            </div>
                            <div className="pt-3 border-t border-gray-500">
                              <div className="flex justify-between items-center">
                                <span className="text-purple-300">Child Entropy</span>
                                <span className="text-white font-medium">0.811</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right Child */}
                        <div className="bg-gray-600 rounded-lg p-4">
                          <h4 className="text-purple-300 font-medium mb-3">Right Child (Credit Score &gt; 700)</h4>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                <span className="text-gray-300">Approved</span>
                              </div>
                              <span className="text-white font-medium">1 loan</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <span className="text-gray-300">Not Approved</span>
                              </div>
                              <span className="text-white font-medium">5 loans</span>
                            </div>
                            <div className="pt-3 border-t border-gray-500">
                              <div className="flex justify-between items-center">
                                <span className="text-purple-300">Child Entropy</span>
                                <span className="text-white font-medium">0.650</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Information Gain Calculation */}
                      <div className="mt-8 bg-gray-600 rounded-lg p-4">
                        <h4 className="text-purple-300 font-medium mb-3">Information Gain Calculation</h4>
                        <div className="space-y-2 text-gray-300 text-sm">
                          <p>1. Parent Entropy = 0.971</p>
                          <p>2. Weighted Child Entropy = (0.4 × 0.811) + (0.6 × 0.650) = 0.725</p>
                          <div className="mt-4 pt-4 border-t border-gray-500">
                            <p className="text-purple-300 font-medium">Information Gain = 0.971 - 0.725 = 0.246</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Gini Impurity Section */}
              <section id="gini-impurity" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Gini Impurity</h2>
                <div className="space-y-6">
                  <div className="space-y-8">
                    <Formula
                      title="Gini Impurity"
                      formula="G(D) = 1 - Σ(pᵢ²)"
                      variables={[
                        { name: "G(D)", description: "Gini impurity of dataset D" },
                        { name: "pᵢ", description: "proportion of class i in dataset D" }
                      ]}
                      gradient="purple-blue"
                    />
                  </div>

                  <div className="space-y-6">
                    <p className="text-gray-300 text-sm sm:text-base">
                      Gini Impurity is another measure of impurity used in decision trees. It measures the probability of incorrectly
                      classifying a randomly chosen element if it were randomly labeled according to the class distribution in the dataset.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-700 rounded-lg p-6">
                        <h3 className="text-lg font-medium text-purple-400 mb-4">Pure Node Example</h3>
                        <div className="space-y-4">
                          <div className="bg-green-900/30 rounded-lg p-4">
                            <p className="text-gray-300 text-sm mb-2">Distribution: [Class A: 5, Class B: 0, Class C: 0]</p>
                            <p className="text-gray-300 text-sm">Probabilities: [1.0, 0.0, 0.0]</p>
                            <p className="text-gray-300 text-sm mt-2">Gini = 1 - (1² + 0² + 0²) = 0</p>
                          </div>
                          <div className="flex justify-center">
                            <div className="w-32 h-32 rounded-full bg-green-500/20 flex items-center justify-center">
                              <span className="text-green-400 text-2xl">0</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-700 rounded-lg p-6">
                        <h3 className="text-lg font-medium text-purple-400 mb-4">Maximum Impurity Example</h3>
                        <div className="space-y-4">
                          <div className="bg-red-900/30 rounded-lg p-4">
                            <p className="text-gray-300 text-sm mb-2">Distribution: [Class A: 2, Class B: 2, Class C: 2]</p>
                            <p className="text-gray-300 text-sm">Probabilities: [0.33, 0.33, 0.33]</p>
                            <p className="text-gray-300 text-sm mt-2">Gini = 1 - (0.33² + 0.33² + 0.33²) = 0.67</p>
                          </div>
                          <div className="flex justify-center">
                            <div className="w-32 h-32 rounded-full bg-red-500/20 flex items-center justify-center">
                              <span className="text-red-400 text-2xl">0.67</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-700 rounded-lg p-6 mt-6">
                      <h3 className="text-lg font-medium text-purple-400 mb-4">Interactive Example</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-600 rounded-lg p-4">
                          <p className="text-gray-300 text-sm mb-2">Node Distribution: [Class A: 3, Class B: 2, Class C: 1]</p>
                          <div className="flex space-x-2 mb-4">
                            <div className="flex-1 bg-purple-500 h-4 rounded-full">
                              <div className="bg-purple-400 h-4 rounded-full" style={{ width: '50%' }}></div>
                            </div>
                            <div className="flex-1 bg-blue-500 h-4 rounded-full">
                              <div className="bg-blue-400 h-4 rounded-full" style={{ width: '33%' }}></div>
                            </div>
                            <div className="flex-1 bg-green-500 h-4 rounded-full">
                              <div className="bg-green-400 h-4 rounded-full" style={{ width: '17%' }}></div>
                            </div>
                          </div>
                          <p className="text-gray-300 text-sm">Gini Impurity = 1 - (0.5² + 0.33² + 0.17²) = 0.61</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Chi-Square Section */}
              <section id="chi-square" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Chi-Square</h2>
                <div className="space-y-6">
                  <div className="space-y-8">
                    <Formula
                      title="Chi-Square Statistic"
                      formula="χ² = Σ((O - E)²/E)"
                      variables={[
                        { name: "χ²", description: "chi-square statistic" },
                        { name: "O", description: "observed frequency" },
                        { name: "E", description: "expected frequency" }
                      ]}
                      gradient="purple-blue"
                    />
                  </div>

                  <div className="space-y-6">
                    <p className="text-gray-300 text-sm sm:text-base">
                      The Chi-Square test measures the statistical significance of the relationship between a feature and the target variable.
                      It compares observed frequencies with expected frequencies under the assumption of independence.
                    </p>

                    <div className="bg-gray-700 rounded-lg p-6">
                      <h3 className="text-lg font-medium text-purple-400 mb-4">Example Calculation</h3>
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-purple-300 font-medium mb-3">Observed Values</h4>
                          <div className="overflow-x-auto">
                            <table className="min-w-full bg-gray-600 rounded-lg overflow-hidden">
                              <thead>
                                <tr className="bg-gray-500">
                                  <th className="px-6 py-3 text-left text-white font-semibold">Feature</th>
                                  <th className="px-6 py-3 text-center text-white font-semibold">Class A</th>
                                  <th className="px-6 py-3 text-center text-white font-semibold">Class B</th>
                                  <th className="px-6 py-3 text-center text-white font-semibold">Total</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-t border-gray-500">
                                  <td className="px-6 py-4 text-white font-medium">Value 1</td>
                                  <td className="px-6 py-4 text-center text-white">15</td>
                                  <td className="px-6 py-4 text-center text-white">5</td>
                                  <td className="px-6 py-4 text-center text-white font-medium">20</td>
                                </tr>
                                <tr className="border-t border-gray-500">
                                  <td className="px-6 py-4 text-white font-medium">Value 2</td>
                                  <td className="px-6 py-4 text-center text-white">5</td>
                                  <td className="px-6 py-4 text-center text-white">15</td>
                                  <td className="px-6 py-4 text-center text-white font-medium">20</td>
                                </tr>
                                <tr className="border-t border-gray-500 bg-gray-500/50">
                                  <td className="px-6 py-4 text-white font-medium">Total</td>
                                  <td className="px-6 py-4 text-center text-white font-medium">20</td>
                                  <td className="px-6 py-4 text-center text-white font-medium">20</td>
                                  <td className="px-6 py-4 text-center text-white font-medium">40</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-purple-300 font-medium mb-3">Expected Values</h4>
                          <div className="overflow-x-auto">
                            <table className="min-w-full bg-gray-600 rounded-lg overflow-hidden">
                              <thead>
                                <tr className="bg-gray-500">
                                  <th className="px-6 py-3 text-left text-white font-semibold">Feature</th>
                                  <th className="px-6 py-3 text-center text-white font-semibold">Class A</th>
                                  <th className="px-6 py-3 text-center text-white font-semibold">Class B</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-t border-gray-500">
                                  <td className="px-6 py-4 text-white font-medium">Value 1</td>
                                  <td className="px-6 py-4 text-center text-white">10</td>
                                  <td className="px-6 py-4 text-center text-white">10</td>
                                </tr>
                                <tr className="border-t border-gray-500">
                                  <td className="px-6 py-4 text-white font-medium">Value 2</td>
                                  <td className="px-6 py-4 text-center text-white">10</td>
                                  <td className="px-6 py-4 text-center text-white">10</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div className="bg-gray-600 rounded-lg p-4">
                          <h4 className="text-purple-300 font-medium mb-3">Chi-Square Calculation</h4>
                          <div className="space-y-2 text-gray-300 text-sm">
                            <p>χ² = ((15-10)²/10 + (5-10)²/10 + (5-10)²/10 + (15-10)²/10)</p>
                            <p>χ² = (25/10 + 25/10 + 25/10 + 25/10)</p>
                            <p>χ² = 10</p>
                          </div>
                        </div>

                        <div className="bg-gray-600 rounded-lg p-4">
                          <h4 className="text-purple-300 font-medium mb-3">Interpretation</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-500/50 rounded-lg p-3">
                              <p className="text-gray-300 text-sm font-medium">Degrees of Freedom</p>
                              <p className="text-white">(rows-1) × (columns-1) = 1</p>
                            </div>
                            <div className="bg-gray-500/50 rounded-lg p-3">
                              <p className="text-gray-300 text-sm font-medium">Significance Level</p>
                              <p className="text-white">p-value &lt; 0.05</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Practical Example Section */}
              <section id="practical-example" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Practical Example: Loan Approval</h2>
                <div className="space-y-6">
                  <p className="text-gray-300 text-sm sm:text-base">
                    Let&apos;s solve a loan approval problem using a Decision Tree. We&apos;ll analyze customer features to predict
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
                          <div className="bg-gray-700 p-6 rounded-lg flex flex-col items-center relative" style={{ minHeight: 200, minWidth: '100%', maxWidth: 420 }}>
                            {/* Root Node */}
                            <div className="bg-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg z-10 mb-2 text-sm sm:text-base">
                              Credit Score &gt; 700?
                            </div>
                            {/* SVG for lines */}
                            <svg
                              width="100%"
                              height="120"
                              className="absolute left-1/2"
                              style={{ transform: 'translateX(-50%)', top: 60, pointerEvents: 'none', zIndex: 0 }}
                              viewBox="0 0 420 120"
                              preserveAspectRatio="xMidYMid meet"
                            >
                              {/* Vertical from root */}
                              <line x1="210" y1="0" x2="210" y2="30" stroke="#a3a3a3" strokeWidth="2" />
                              {/* Horizontal split */}
                              <line x1="130" y1="30" x2="290" y2="30" stroke="#a3a3a3" strokeWidth="2" />
                              {/* Left vertical to leaf */}
                              <line x1="130" y1="30" x2="130" y2="90" stroke="#a3a3a3" strokeWidth="2" />
                              {/* Right vertical to leaf */}
                              <line x1="290" y1="30" x2="290" y2="90" stroke="#a3a3a3" strokeWidth="2" />
                            </svg>
                            {/* Branches */}
                            <div className="flex justify-between w-full" style={{ marginTop: 40, maxWidth: 420 }}>
                              <div className="flex flex-col items-center" style={{ width: '45%', marginLeft: '5%' }}>
                                <span className="text-gray-300 font-medium text-sm sm:text-base">Yes</span>
                                <div className="bg-green-600 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg mt-2 text-sm sm:text-base">
                                  Approved
                                </div>
                              </div>
                              <div className="flex flex-col items-center" style={{ width: '45%', marginRight: '5%' }}>
                                <span className="text-gray-300 font-medium text-sm sm:text-base">No</span>
                                <div className="bg-red-600 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg mt-2 text-sm sm:text-base">
                                  Not Approved
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* Tree Statistics */}
                          <div className=" text-gray-300 text-sm bg-gray-800 p-4 rounded-lg">
                            <p className="mb-2 text-purple-400 font-medium">Tree Statistics:</p>
                            <ul className="list-disc list-inside space-y-1">
                              <li>Depth: 1</li>
                              <li>Total Nodes: 3</li>
                              <li>Leaf Nodes: 2</li>
                              <li>Accuracy: 100% (on training data)</li>
                            </ul>
                          </div>
                        </div>
                      </li>
                    </ol>
                  </div>
                </div>
              </section>

              {/* PDF Download Section */}
              <section id="pdf-download" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Complex Example</h2>
                <div className="space-y-4">
                  <p className="text-gray-300">
                    Download our example that demonstrates how to solve a more complex decision tree problem using information gain.
                  </p>
                  <PDFDownloadCard
                    title="Decision Tree Complex Example"
                    description="A detailed guide with step-by-step example for how to create a decision tree by comparing information gain."
                    pdfPath="/pdfs/Decision_tree.pdf"
                  />
                </div>
              </section>

              {/* Pseudocode Section */}
              <section id="pseudocode" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Pseudocode</h2>
                <div className="space-y-6">
                  <Code
                    code={decisionTreeImplementation}
                    language="python"
                  />
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
                <Quiz algorithm="decision-tree" />
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 