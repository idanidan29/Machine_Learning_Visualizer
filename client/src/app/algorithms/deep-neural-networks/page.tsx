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
import { deepNeuralNetworksImplementation } from '../../data/psudo-code/deepNeuralNetworks';
import DeepNeuralNetworksVisualization from '../../components/visualizations/DeepNeuralNetworksVisualization';

export default function DeepNeuralNetworksPage() {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'visualization', title: 'Visualization', icon: '🖼️' },
    { id: 'overview', title: 'Overview', icon: '📋' },
    { id: 'how-it-works', title: 'How It Works', icon: '⚙️' },
    { id: 'when-to-use', title: 'When to Use', icon: '⏰' },
    { id: 'formulas', title: 'Formulas', icon: '📐' },
    { id: 'practical-example', title: 'Practical Example', icon: '📝' },
    { id: 'characteristics', title: 'Characteristics', icon: '📊' },
    { id: 'limitations', title: 'Limitations', icon: '⚠️' },
    { id: 'pseudocode', title: 'Pseudo-code', icon: '💻' },
    { id: 'quiz', title: 'Quiz', icon: '❓' },
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
              title="Deep Neural Networks"
              description="Explore how Deep Neural Networks learn complex patterns through multiple layers of interconnected neurons. Understand the architecture, training process, and applications of this powerful machine learning model."
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

               {/* Visualization Section */}
              <section id="visualization" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <DeepNeuralNetworksVisualization />
              </section>

              {/* Overview Section */}
              <section id="overview" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Overview</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 text-sm sm:text-base">
                    Deep Neural Networks (DNNs) are a class of machine learning models inspired by the human brain&apos;s neural structure. They consist of multiple layers of interconnected neurons that can learn hierarchical representations of data. DNNs have revolutionized fields like computer vision, natural language processing, and speech recognition by achieving state-of-the-art performance on complex tasks.
                  </p>
                </div>
              </section>

              {/* How It Works Section */}
              <HowItWorks
                title="How It Works"
                steps={[
                  { number: 1, description: "Input data is fed into the input layer of the network" },
                  { number: 2, description: "Data flows through hidden layers, where each neuron computes a weighted sum of inputs and applies an activation function" },
                  { number: 3, description: "The output layer produces predictions based on the processed information" },
                  { number: 4, description: "During training, the network adjusts weights using backpropagation and gradient descent" },
                  { number: 5, description: "The process repeats until the network learns to make accurate predictions" }
                ]}
              />

              {/* When to Use Section */}
              <WhenToUse
                idealUseCases={{
                  title: "Ideal Use Cases",
                  items: [
                    "Complex pattern recognition tasks",
                    "Image and video processing",
                    "Natural language processing",
                    "Speech recognition",
                    "Time series prediction"
                  ]
                }}
                keyAdvantages={{
                  title: "Key Advantages",
                  items: [
                    "Can learn complex patterns automatically",
                    "Excellent performance on large datasets",
                    "Flexible architecture for various tasks",
                    "Can handle unstructured data",
                    "State-of-the-art results in many domains"
                  ]
                }}
              />

              {/* Formulas Section */}
              <section id="formulas" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Mathematical Formulas</h2>
                <div className="space-y-6">
                  <Formula
                    title="Neuron Output"
                    formula="y = f(Σ(wᵢxᵢ) + b)"
                    variables={[
                      { name: "y", description: "neuron output" },
                      { name: "f", description: "activation function" },
                      { name: "wᵢ", description: "weights" },
                      { name: "xᵢ", description: "inputs" },
                      { name: "b", description: "bias" }
                    ]}
                  />

                  <Formula
                    title="ReLU Activation"
                    formula="f(x) = max(0, x)"
                    variables={[
                      { name: "x", description: "input value" }
                    ]}
                  />

                  <Formula
                    title="Sigmoid Activation"
                    formula="f(x) = 1 / (1 + e^(-x))"
                    variables={[
                      { name: "x", description: "input value" }
                    ]}
                  />

                  <Formula
                    title="Cross-Entropy Loss"
                    formula="L = -Σ(yᵢ * log(ŷᵢ))"
                    variables={[
                      { name: "yᵢ", description: "true label" },
                      { name: "ŷᵢ", description: "predicted probability" }
                    ]}
                  />

                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-purple-400 mb-2">Key Insights</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm sm:text-base">
                      <li>Activation functions introduce non-linearity into the network</li>
                      <li>Backpropagation calculates gradients for weight updates</li>
                      <li>Loss functions measure prediction accuracy</li>
                      <li>Regularization techniques prevent overfitting</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Practical Example Section */}
              <section id="practical-example" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Practical Example</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 text-sm sm:text-base">
                    Let&apos;s consider a real-world example of using Deep Neural Networks for image classification:
                  </p>
                  <div className="mt-4 space-y-4">
                    <div className="bg-gray-700/50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-purple-400 mb-2">Problem</h3>
                      <p className="text-gray-300 text-sm">
                        A company wants to automatically classify product images into different categories.
                      </p>
                    </div>
                    <div className="bg-gray-700/50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-purple-400 mb-2">Solution</h3>
                      <p className="text-gray-300 text-sm">
                        Using a Convolutional Neural Network (CNN) with:
                      </p>
                      <ul className="list-disc list-inside text-gray-300 text-sm mt-2">
                        <li>Convolutional layers for feature extraction</li>
                        <li>Pooling layers for dimensionality reduction</li>
                        <li>Fully connected layers for classification</li>
                        <li>Dropout for regularization</li>
                        <li>Softmax output for multi-class prediction</li>
                      </ul>
                    </div>
                    <div className="bg-gray-700/50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-purple-400 mb-2">Results</h3>
                      <p className="text-gray-300 text-sm">
                        The model achieves:
                      </p>
                      <ul className="list-disc list-inside text-gray-300 text-sm mt-2">
                        <li>High accuracy in product classification</li>
                        <li>Robust performance on new images</li>
                        <li>Fast inference time for real-time applications</li>
                        <li>Ability to learn complex visual features</li>
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
                        <li>Category: Deep Learning</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-purple-400 mb-2">Strengths</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm sm:text-base">
                        <li>Automatic feature learning</li>
                        <li>Excellent performance on complex tasks</li>
                        <li>Flexible architecture</li>
                        <li>Transfer learning capabilities</li>
                      </ul>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium text-purple-400 mb-2">Parameters</h3>
                      <ul className="text-gray-300 space-y-2 text-sm sm:text-base">
                        <li>Network architecture</li>
                        <li>Learning rate</li>
                        <li>Batch size</li>
                        <li>Regularization strength</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-purple-400 mb-2">Complexity</h3>
                      <ul className="text-gray-300 space-y-2 text-sm sm:text-base">
                        <li>Time: O(n * d * l) for training</li>
                        <li>Space: O(d * l) for parameters</li>
                        <li>Where n = samples, d = features, l = layers</li>
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
                      <h3 className="text-lg font-medium text-purple-400 mb-2">Computational Requirements</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm sm:text-base">
                        <li>High computational cost</li>
                        <li>Requires significant memory</li>
                        <li>Long training times</li>
                        <li>GPU acceleration often needed</li>
                      </ul>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-purple-400 mb-2">Data Requirements</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm sm:text-base">
                        <li>Large amounts of training data</li>
                        <li>Data quality sensitivity</li>
                        <li>Labeling requirements</li>
                        <li>Data preprocessing needs</li>
                      </ul>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-700 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-purple-400 mb-2">Training Challenges</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm sm:text-base">
                        <li>Vanishing/exploding gradients</li>
                        <li>Overfitting risk</li>
                        <li>Hyperparameter tuning</li>
                        <li>Local optima issues</li>
                      </ul>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-purple-400 mb-2">Interpretability</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm sm:text-base">
                        <li>Black box nature</li>
                        <li>Difficult to explain decisions</li>
                        <li>Limited transparency</li>
                        <li>Debugging challenges</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Pseudocode Section */}
              <section id="pseudocode" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Pseudo-code</h2>
                <Code
                  code={deepNeuralNetworksImplementation}
                  language="python"
                />
              </section>

              {/* Quiz Section */}
              <section id="quiz" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
                <Quiz algorithm="deep-neural-networks" />
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 