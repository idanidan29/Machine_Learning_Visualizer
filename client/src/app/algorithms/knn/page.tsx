'use client';

import React, { useState } from 'react';
import KNNVisualization from '@/app/components/visualizations/KNNVisualization';
import Quiz from '@/app/components/Quiz';

const knnQuestions = [
  {
    id: 1,
    question: 'What is the main principle behind K-Nearest Neighbors?',
    options: [
      'It uses a complex mathematical model to make predictions',
      'It assumes that similar things exist in close proximity',
      'It requires a large amount of training data',
      'It works best with high-dimensional data'
    ],
    correctAnswer: 1,
    explanation: 'KNN is based on the principle that similar things exist in close proximity. It assumes that similar points are near each other in the feature space.'
  },
  {
    id: 2,
    question: 'How does KNN make predictions?',
    options: [
      'By using a trained model',
      'By finding the k closest training examples and taking a majority vote',
      'By using a decision boundary',
      'By calculating probabilities'
    ],
    correctAnswer: 1,
    explanation: 'KNN makes predictions by finding the k closest training examples to the new point and taking a majority vote among their classes.'
  },
  {
    id: 3,
    question: 'What is the main advantage of KNN?',
    options: [
      'It is computationally efficient',
      'It can handle any type of data',
      'It is simple to understand and implement',
      'It always achieves high accuracy'
    ],
    correctAnswer: 2,
    explanation: 'KNN is simple to understand and implement, making it a good choice for beginners and for cases where interpretability is important.'
  },
  {
    id: 4,
    question: 'What is a potential disadvantage of KNN?',
    options: [
      'It cannot handle categorical data',
      'It requires a large amount of memory',
      'It is too complex to implement',
      'It cannot handle missing values'
    ],
    correctAnswer: 1,
    explanation: 'KNN requires storing all training data in memory, which can be a problem for large datasets.'
  },
  {
    id: 5,
    question: 'How does the choice of k affect the model?',
    options: [
      'A larger k always gives better results',
      'A smaller k always gives better results',
      'The choice of k depends on the data and can affect the balance between bias and variance',
      'The choice of k doesn\'t matter'
    ],
    correctAnswer: 2,
    explanation: 'The choice of k affects the balance between bias and variance. A small k can lead to overfitting, while a large k can lead to underfitting.'
  }
];

export default function KNNPage() {
  const [activeSection, setActiveSection] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <nav className="space-y-1">
              {['overview', 'visualization', 'quiz'].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeSection === section
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-grow">
            {activeSection === 'overview' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold">K-Nearest Neighbors (KNN)</h1>
                
                <div className="prose prose-invert max-w-none">
                  <p>
                    K-Nearest Neighbors (KNN) is a simple, instance-based learning algorithm that
                    stores all available cases and classifies new cases based on a similarity measure.
                  </p>

                  <h2>How KNN Works</h2>
                  <ol>
                    <li>Store all training data points</li>
                    <li>When a new point needs to be classified:
                      <ul>
                        <li>Calculate the distance to all training points</li>
                        <li>Select the k nearest points</li>
                        <li>Take a majority vote among these k points</li>
                      </ul>
                    </li>
                  </ol>

                  <h2>Key Concepts</h2>
                  <ul>
                    <li>
                      <strong>Distance Metric:</strong> Usually Euclidean distance, but can be
                      Manhattan, Minkowski, or other metrics
                    </li>
                    <li>
                      <strong>K Value:</strong> Number of neighbors to consider. Must be odd for
                      binary classification to avoid ties
                    </li>
                    <li>
                      <strong>Voting:</strong> For classification, majority vote; for regression,
                      average of k nearest neighbors
                    </li>
                  </ul>

                  <h2>Advantages</h2>
                  <ul>
                    <li>Simple to understand and implement</li>
                    <li>No training phase</li>
                    <li>Works well with multi-class problems</li>
                    <li>Adapts easily to new training data</li>
                  </ul>

                  <h2>Disadvantages</h2>
                  <ul>
                    <li>Computationally expensive for large datasets</li>
                    <li>Sensitive to irrelevant features</li>
                    <li>Requires feature scaling</li>
                    <li>Memory intensive</li>
                  </ul>

                  <h2>Applications</h2>
                  <ul>
                    <li>Pattern recognition</li>
                    <li>Image recognition</li>
                    <li>Recommendation systems</li>
                    <li>Credit scoring</li>
                  </ul>
                </div>
              </div>
            )}

            {activeSection === 'visualization' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold">KNN Visualization</h1>
                <p className="text-gray-300">
                  Click on the canvas to add points. Select a class (0 or 1) first, then click to add points of that class.
                  Use the slider to adjust the k value and see how it affects the decision boundary.
                </p>
                <KNNVisualization />
              </div>
            )}

            {activeSection === 'quiz' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold">KNN Quiz</h1>
                <Quiz
                  questions={knnQuestions}
                  title="Test your knowledge of K-Nearest Neighbors"
                  algorithm="knn"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 