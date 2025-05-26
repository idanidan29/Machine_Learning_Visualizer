"use client"
import Link from 'next/link'
import { useState } from 'react'

const categories = [
  {
    id: 'all',
    name: 'All Algorithms',
    description: 'View all available algorithms'
  },
  {
    id: 'supervised',
    name: 'Supervised Learning',
    description: 'Algorithms that learn from labeled training data'
  },
  {
    id: 'unsupervised',
    name: 'Unsupervised Learning',
    description: 'Algorithms that find patterns in unlabeled data'
  },
  {
    id: 'regression',
    name: 'Regression',
    description: 'Algorithms for predicting continuous values'
  }
]

const algorithms = [
  {
    name: 'K-Nearest Neighbors',
    description: 'A simple, instance-based learning algorithm that stores all available cases and classifies new cases based on a similarity measure.',
    path: '/algorithms/knn',
    icon: '🔍',
    category: 'supervised'
  },
  {
    name: 'Decision Trees',
    description: 'A tree-like model of decisions and their possible consequences, including chance event outcomes.',
    path: '/algorithms/decision-trees',
    icon: '🌳',
    category: 'supervised'
  },
  {
    name: 'K-Means Clustering',
    description: 'An unsupervised learning algorithm that groups similar data points into clusters.',
    path: '/kmeans',
    icon: '🎯',
    category: 'unsupervised'
  },
  {
    name: 'Linear Regression',
    description: 'A linear approach to modeling the relationship between a dependent variable and one or more independent variables.',
    path: '/algorithms/linear-regression',
    icon: '📈',
    category: 'regression'
  }
]

export default function AlgorithmFilter() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredAlgorithms = selectedCategory === 'all'
    ? algorithms
    : algorithms.filter(algorithm => algorithm.category === selectedCategory)

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Explore ML Algorithms
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Select an algorithm to visualize and understand its behavior
          </p>
        </div>

        {/* Category Filter */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                ${selectedCategory === category.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Selected Category Description */}
        <div className="mt-4 text-center">
          <p className="text-gray-400 text-sm">
            {categories.find(cat => cat.id === selectedCategory)?.description}
          </p>
        </div>

        {/* Algorithm Cards */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAlgorithms.map((algorithm) => (
            <Link
              key={algorithm.name}
              href={algorithm.path}
              className="group relative bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-all duration-200"
            >
              <div className="flex items-center space-x-4">
                <span className="text-4xl">{algorithm.icon}</span>
                <div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-purple-400">
                    {algorithm.name}
                  </h3>
                  <span className="text-xs text-purple-400">
                    {categories.find(cat => cat.id === algorithm.category)?.name}
                  </span>
                </div>
              </div>
              <p className="mt-4 text-gray-300">
                {algorithm.description}
              </p>
              <div className="mt-6 flex items-center text-purple-400 group-hover:text-purple-300">
                <span className="text-sm font-medium">Learn more</span>
                <svg
                  className="ml-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results Message */}
        {filteredAlgorithms.length === 0 && (
          <div className="text-center mt-12">
            <p className="text-gray-400 text-lg">
              No algorithms found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 