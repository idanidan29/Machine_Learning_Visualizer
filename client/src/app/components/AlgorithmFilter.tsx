"use client"
import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
  },
  {
    id: 'classification',
    name: 'Classification',
    description: 'Algorithms for predicting discrete categories'
  },
  {
    id: 'clustering',
    name: 'Clustering',
    description: 'Algorithms for grouping similar data points'
  }
]

const algorithms = [
  {
    name: 'K-Nearest Neighbors',
    description: 'A simple, instance-based learning algorithm that stores all available cases and classifies new cases based on a similarity measure.',
    path: '/algorithms/knn',
    icon: '🔍',
    categories: ['supervised', 'classification']
  },
  {
    name: 'Decision Trees',
    description: 'A tree-like model of decisions and their possible consequences, including chance event outcomes.',
    path: '/decision-tree',
    icon: '🌳',
    categories: ['supervised', 'classification']
  },
  {
    name: 'Naive Bayes',
    description: 'A probabilistic classifier based on Bayes theorem that assumes independence between features.',
    path: '/algorithms/naive-bayes',
    icon: '📊',
    categories: ['supervised', 'classification']
  },
  {
    name: 'K-Means Clustering',
    description: 'An unsupervised learning algorithm that groups similar data points into clusters.',
    path: '/algorithms/kmeans',
    icon: '🎯',
    categories: ['unsupervised', 'clustering']
  },
  {
    name: 'Linear Regression',
    description: 'A linear approach to modeling the relationship between a dependent variable and one or more independent variables.',
    path: '/algorithms/linear-regression',
    icon: '📈',
    categories: ['supervised', 'regression']
  },
  {
    name: 'Logistic Regression',
    description: 'A statistical model that uses a logistic function to model binary dependent variables.',
    path: '/algorithms/logistic-regression',
    icon: '📉',
    categories: ['supervised', 'classification']
  },
  {
    name: 'Support Vector Machines',
    description: 'A supervised learning model that finds the optimal hyperplane to separate classes in high-dimensional space.',
    path: '/algorithms/svm',
    icon: '⚡',
    categories: ['supervised', 'classification']
  },
  {
    name: 'Random Forest',
    description: 'An ensemble learning method that constructs multiple decision trees and outputs the class that is the mode of the classes.',
    path: '/algorithms/random-forest',
    icon: '🌲',
    categories: ['supervised', 'classification', 'regression']
  },
  {
    name: 'Gradient Boosting',
    description: 'A machine learning technique that produces a prediction model in the form of an ensemble of weak prediction models.',
    path: '/algorithms/gradient-boosting',
    icon: '📈',
    categories: ['supervised', 'classification', 'regression']
  },
  {
    name: 'DBSCAN',
    description: 'A density-based clustering algorithm that groups together points that are close to each other and marks outliers.',
    path: '/algorithms/dbscan',
    icon: '🎯',
    categories: ['unsupervised', 'clustering']
  },
  {
    name: 'Hierarchical Clustering',
    description: 'A method of cluster analysis that builds a hierarchy of clusters by successively merging or splitting groups.',
    path: '/algorithms/hierarchical-clustering',
    icon: '🌳',
    categories: ['unsupervised', 'clustering']
  },
  {
    name: 'Polynomial Regression',
    description: 'A form of regression analysis in which the relationship between variables is modeled as an nth degree polynomial.',
    path: '/algorithms/polynomial-regression',
    icon: '📊',
    categories: ['supervised', 'regression']
  }
]

export default function AlgorithmFilter() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredAlgorithms = algorithms.filter(algorithm => {
    const matchesCategory = selectedCategory === 'all' || algorithm.categories.includes(selectedCategory)
    const matchesSearch = searchQuery === '' || 
      algorithm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      algorithm.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div id="algorithms-section" className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Explore ML Algorithms
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Select an algorithm to visualize and understand its behavior
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mt-8 max-w-md mx-auto"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search algorithms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-200"
            />
            <svg
              className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                ${selectedCategory === category.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Selected Category Description */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="mt-4 text-center"
        >
          <p className="text-gray-400 text-sm">
            {categories.find(cat => cat.id === selectedCategory)?.description}
          </p>
        </motion.div>

        {/* Algorithm Cards */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredAlgorithms.map((algorithm, index) => (
              <motion.div
                key={algorithm.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ 
                  duration: 0.2,
                  delay: index * 0.05,
                  ease: "easeOut"
                }}
                whileHover={{ 
                  scale: 1.01,
                  transition: { duration: 0.1 }
                }}
              >
                <Link
                  href={algorithm.path}
                  className="group relative bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-all duration-200 block"
                >
                  <div className="flex items-center space-x-4">
                    <motion.span 
                      className="text-4xl"
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      transition={{ duration: 0.1 }}
                    >
                      {algorithm.icon}
                    </motion.span>
                    <div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-purple-400">
                        {algorithm.name}
                      </h3>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {algorithm.categories.map(category => (
                          <span key={category} className="text-xs text-purple-400 bg-purple-900/30 px-2 py-0.5 rounded-full">
                            {categories.find(cat => cat.id === category)?.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-300">
                    {algorithm.description}
                  </p>
                  <motion.div 
                    className="mt-6 flex items-center text-purple-400 group-hover:text-purple-300"
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.1 }}
                  >
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
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* No Results Message */}
        <AnimatePresence>
          {filteredAlgorithms.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="text-center mt-12"
            >
              <p className="text-gray-400 text-lg">
                No algorithms found in this category.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
} 