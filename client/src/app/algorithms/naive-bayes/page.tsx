/* eslint-disable react/no-unescaped-entities */
'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import NaiveBayesVisualization from '../../components/visualizations/NaiveBayesVisualization';
import Quiz from '../../components/Quiz';
import TableOfContents from '../../components/TableOfContents';
import Code from '../../components/ui/Code';
import PDFDownloadCard from '../../components/ui/PDFDownloadCard';
import PageHeader from '../../components/ui/PageHeader';
import Formula from '../../components/ui/Formula';
import HowItWorks from '../../components/ui/HowItWorks';
import WhenToUse from '../../components/ui/WhenToUse';

export default function NaiveBayesPage() {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', title: 'Overview', icon: '📋' },
    { id: 'visualization', title: 'Visualization', icon: '🎯' },
    { id: 'how-it-works', title: 'How It Works', icon: '⚙️' },
    { id: 'when-to-use', title: 'When to Use', icon: '⏰' },
    { id: 'formulas', title: 'Formulas', icon: '📐' },
    { id: 'laplace-smoothing', title: 'Laplace Smoothing', icon: '🧮' },
    { id: 'm-estimate', title: 'm-Estimate', icon: '📐' },
    { id: 'example', title: 'Example', icon: '📝' },
    { id: 'pdf-download', title: 'Complex Example', icon: '📄' },
    { id: 'characteristics', title: 'Characteristics', icon: '📊' },
    { id: 'limitations', title: 'Limitations', icon: '⚠️' },
    { id: 'pseudocode', title: 'Pseudocode', icon: '💻' },
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
              title="Naive Bayes Classification"
              description="Explore how Naive Bayes uses probability to classify data points. Watch how the algorithm calculates posterior probabilities and makes predictions based on feature independence assumptions."
              onQuizClick={() => {
                const section = document.getElementById('quiz');
                if (section) {
                  section.scrollIntoView({ behavior: 'smooth' });
                  setActiveSection('quiz');
                }
              }}
            />

            <div className="space-y-6 sm:space-y-8">
              {/* Overview Section */}
              <section id="overview" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Overview</h2>
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
              <section id="visualization" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <NaiveBayesVisualization />
              </section>

              {/* How It Works Section */}
              <HowItWorks
                title="How It Works"
                steps={[
                  { number: 1, description: "Calculate prior probabilities for each class" },
                  { number: 2, description: "Calculate likelihood probabilities for each feature given each class" },
                  { number: 3, description: "Apply Bayes' theorem to compute posterior probabilities" },
                  { number: 4, description: "Select the class with the highest posterior probability" }
                ]}
              />

              {/* When to Use Section */}
              <WhenToUse
                idealUseCases={{
                  title: "Ideal Use Cases",
                  items: [
                    "Text classification and spam filtering",
                    "Sentiment analysis",
                    "Document categorization",
                    "Medical diagnosis",
                    "Weather prediction"
                  ]
                }}
                keyAdvantages={{
                  title: "Key Advantages",
                  items: [
                    "Fast training and prediction",
                    "Works well with high-dimensional data",
                    "Requires little training data",
                    "Handles both continuous and discrete features",
                    "Simple to implement and understand"
                  ]
                }}
              />

              {/* Formulas Section */}
              <section id="formulas" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Formulas</h2>
                <div className="space-y-8">
                  <Formula
                    title="Bayes' Theorem"
                    formula="P(A|B) = P(B|A) * P(A) / P(B)"
                    variables={[
                      { name: "P(A|B)", description: "posterior probability of A given B" },
                      { name: "P(B|A)", description: "likelihood of B given A" },
                      { name: "P(A)", description: "prior probability of A" },
                      { name: "P(B)", description: "marginal probability of B" }
                    ]}
                    gradient="purple-blue"
                  />

                  <Formula
                    title="Naive Bayes Classifier"
                    formula="P(y|x) ∝ P(y) * Π P(xᵢ|y)"
                    variables={[
                      { name: "P(y|x)", description: "probability of class y given features x" },
                      { name: "P(y)", description: "prior probability of class y" },
                      { name: "P(xᵢ|y)", description: "probability of feature xᵢ given class y" }
                    ]}
                    gradient="blue-purple"
                  />

                  <Formula
                    title="Gaussian Naive Bayes"
                    formula="P(xᵢ|y) = (1/√(2πσ²)) * e^(-(x-μ)²/(2σ²))"
                    variables={[
                      { name: "xᵢ", description: "feature value" },
                      { name: "y", description: "class" },
                      { name: "μ", description: "mean of feature for class y" },
                      { name: "σ", description: "standard deviation of feature for class y" }
                    ]}
                    gradient="purple-blue"
                  />

                  <div className="bg-purple-900/30 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-purple-400 mb-2">Key Insights</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm sm:text-base">
                      <li>Naive Bayes assumes feature independence</li>
                      <li>Gaussian Naive Bayes is used for continuous features</li>
                      <li>Multinomial Naive Bayes is used for discrete features</li>
                      <li>Bernoulli Naive Bayes is used for binary features</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Laplace Smoothing Section */}
              <section id="laplace-smoothing" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Laplace Smoothing</h2>
                <div className="space-y-6">
                  <div className="bg-gray-900/50 p-6 rounded-lg">
                    <p className="text-gray-300 mb-4">
                      Laplace smoothing (also known as add-one smoothing) is a technique used to handle the zero probability problem in Naive Bayes. 
                      It adds a small constant to all probability estimates, ensuring that no feature has a zero probability.
                    </p>
                    
                    <Formula
                      title="Laplace Smoothing Formula"
                      formula="P(xᵢ|y) = (count(xᵢ,y) + α) / (count(y) + α * |V|)"
                      variables={[
                        { name: "count(xᵢ,y)", description: "number of times feature xᵢ appears in class y" },
                        { name: "count(y)", description: "total count of features in class y" },
                        { name: "α", description: "smoothing parameter (typically 1)" },
                        { name: "|V|", description: "size of vocabulary (number of unique features)" }
                      ]}
                      gradient="purple-blue"
                    />

                    <div className="mt-6 space-y-4">
                      <h3 className="text-lg font-medium text-purple-400">Why Use Laplace Smoothing?</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2">
                        <li>Prevents zero probabilities for unseen features</li>
                        <li>Improves model robustness</li>
                        <li>Handles sparse data better</li>
                        <li>Provides more reliable probability estimates</li>
                      </ul>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-lg font-medium text-purple-400 mb-3">Example</h3>
                      <div className="bg-gray-800 rounded-lg p-4">
                        <p className="text-gray-300 mb-2">Without smoothing:</p>
                        <p className="text-gray-300 mb-2">P("money"|Spam) = 2/2 = 1.0</p>
                        <p className="text-gray-300 mb-2">P("money"|Not Spam) = 0/2 = 0.0 (problem!)</p>
                        <p className="text-gray-300 mt-4 mb-2">With Laplace smoothing (α=1):</p>
                        <p className="text-gray-300 mb-2">P("money"|Spam) = (2+1)/(2+1*2) = 0.75</p>
                        <p className="text-gray-300">P("money"|Not Spam) = (0+1)/(2+1*2) = 0.25</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* m-Estimate Section */}
              <section id="m-estimate" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">m-Estimate</h2>
                <div className="space-y-6">
                  <div className="bg-gray-900/50 p-6 rounded-lg">
                    <p className="text-gray-300 mb-4">
                      The m-estimate is a more sophisticated smoothing technique that uses prior knowledge about the expected 
                      probability distribution of features. It's particularly useful when you have domain knowledge about 
                      the expected probabilities.
                    </p>
                    
                    <Formula
                      title="m-Estimate Formula"
                      formula="P(xᵢ|y) = (count(xᵢ,y) + m * p) / (count(y) + m)"
                      variables={[
                        { name: "count(xᵢ,y)", description: "number of times feature xᵢ appears in class y" },
                        { name: "count(y)", description: "total count of features in class y" },
                        { name: "m", description: "equivalent sample size (smoothing parameter)" },
                        { name: "p", description: "prior probability estimate" }
                      ]}
                      gradient="blue-purple"
                    />

                    <div className="mt-6 space-y-4">
                      <h3 className="text-lg font-medium text-purple-400">Advantages of m-Estimate</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2">
                        <li>More flexible than Laplace smoothing</li>
                        <li>Incorporates prior knowledge</li>
                        <li>Better handles imbalanced classes</li>
                        <li>Can be tuned based on domain expertise</li>
                      </ul>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-lg font-medium text-purple-400 mb-3">Example</h3>
                      <div className="bg-gray-800 rounded-lg p-4">
                        <p className="text-gray-300 mb-2">Parameters:</p>
                        <p className="text-gray-300 mb-2">m = 2 (equivalent sample size)</p>
                        <p className="text-gray-300 mb-2">p = 0.3 (prior probability)</p>
                        <p className="text-gray-300 mt-4 mb-2">Calculations:</p>
                        <p className="text-gray-300 mb-2">P("money"|Spam) = (2 + 2*0.3)/(2 + 2) = 0.65</p>
                        <p className="text-gray-300">P("money"|Not Spam) = (0 + 2*0.3)/(2 + 2) = 0.15</p>
                      </div>
                    </div>

                    <div className="mt-6 bg-purple-900/30 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-purple-400 mb-2">When to Choose m-Estimate</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2">
                        <li>When you have reliable prior knowledge about feature probabilities</li>
                        <li>When dealing with imbalanced datasets</li>
                        <li>When you need more control over the smoothing process</li>
                        <li>When Laplace smoothing is too aggressive</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Detailed Example Section */}
              <div id="example" className="mt-8 bg-gray-900 rounded-lg p-4 sm:p-6">
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
                            <th className="px-2 sm:px-4 py-2 text-left text-gray-300">Email</th>
                            <th className="px-2 sm:px-4 py-2 text-left text-gray-300">Contains "money"</th>
                            <th className="px-2 sm:px-4 py-2 text-left text-gray-300">Contains "urgent"</th>
                            <th className="px-2 sm:px-4 py-2 text-left text-gray-300">Class</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="px-2 sm:px-4 py-2 text-gray-300">Email 1</td>
                            <td className="px-2 sm:px-4 py-2 text-gray-300">Yes</td>
                            <td className="px-2 sm:px-4 py-2 text-gray-300">Yes</td>
                            <td className="px-2 sm:px-4 py-2 text-gray-300">Spam</td>
                          </tr>
                          <tr>
                            <td className="px-2 sm:px-4 py-2 text-gray-300">Email 2</td>
                            <td className="px-2 sm:px-4 py-2 text-gray-300">Yes</td>
                            <td className="px-2 sm:px-4 py-2 text-gray-300">No</td>
                            <td className="px-2 sm:px-4 py-2 text-gray-300">Spam</td>
                          </tr>
                          <tr>
                            <td className="px-2 sm:px-4 py-2 text-gray-300">Email 3</td>
                            <td className="px-2 sm:px-4 py-2 text-gray-300">No</td>
                            <td className="px-2 sm:px-4 py-2 text-gray-300">No</td>
                            <td className="px-2 sm:px-4 py-2 text-gray-300">Not Spam</td>
                          </tr>
                          <tr>
                            <td className="px-2 sm:px-4 py-2 text-gray-300">Email 4</td>
                            <td className="px-2 sm:px-4 py-2 text-gray-300">No</td>
                            <td className="px-2 sm:px-4 py-2 text-gray-300">Yes</td>
                            <td className="px-2 sm:px-4 py-2 text-gray-300">Not Spam</td>
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

              {/* PDF Download Section */}
              <section id="pdf-download" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Complex Example</h2>
                <div className="space-y-4">
                  <p className="text-gray-300">
                    Download our example that demonstrates how to solve a more complex Naive Bayes problem using leplace smoothing and m-estimate techniques.
                  </p>
                  <PDFDownloadCard
                    title="Naive Bayes Complex Example"
                    description="A detailed guide with step-by-step example for how to implement Naive Bayes classification using Laplace smoothing and m-estimate techniques."
                    pdfPath="/pdfs/Baysian_Learning.pdf"
                  />
                </div>
              </section>

              {/* Characteristics Section */}
              <section id="characteristics" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Key Characteristics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <section id="limitations" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">When Not to Use It</h2>
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

              {/* Pseudocode Section */}
              <section id="pseudocode" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Pseudocode</h2>
                <div className="space-y-6">
                  <Code
                    code={`function trainNaiveBayes(training_data):
    # Calculate prior probabilities
    class_counts = count_occurrences(training_data.target)
    prior_probs = {}
    for class, count in class_counts.items():
        prior_probs[class] = count / len(training_data)
    
    # Calculate likelihood probabilities
    likelihood_probs = {}
    for feature in training_data.features:
        likelihood_probs[feature] = {}
        for class in class_counts.keys():
            class_data = training_data[training_data.target == class]
            feature_counts = count_occurrences(class_data[feature])
            for value, count in feature_counts.items():
                likelihood_probs[feature][(value, class)] = count / len(class_data)
    
    return prior_probs, likelihood_probs

function predictNaiveBayes(instance, prior_probs, likelihood_probs):
    predictions = {}
    for class in prior_probs.keys():
        # Start with prior probability
        prob = prior_probs[class]
        
        # Multiply by likelihood of each feature
        for feature in instance.features:
            value = instance[feature]
            if (value, class) in likelihood_probs[feature]:
                prob *= likelihood_probs[feature][(value, class)]
            else:
                # Handle unseen feature values with Laplace smoothing
                prob *= 1 / (len(likelihood_probs[feature]) + 1)
        
        predictions[class] = prob
    
    # Return class with highest probability
    return max(predictions.items(), key=lambda x: x[1])[0]`}
                    language="python"
                  />
                </div>
              </section>

              {/* Quiz Section */}
              <section id="quiz" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <Quiz algorithm="naive-bayes" />
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 