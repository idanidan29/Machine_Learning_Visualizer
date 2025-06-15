export interface Algorithm {
  name: string;
  description: string;
  path: string;
  icon: string;
  categories: string[];
}

export const algorithms: Algorithm[] = [
  {
    name: 'Linear Regression',
    description: 'A fundamental supervised learning algorithm that models the relationship between variables using a linear equation.',
    path: '/algorithms/linear-regression',
    icon: '📈',
    categories: ['supervised', 'regression']
  },
  {
    name: 'Logistic Regression',
    description: 'A supervised learning algorithm for binary classification that models the probability of a binary outcome.',
    path: '/algorithms/logistic-regression',
    icon: '🎲',
    categories: ['supervised', 'classification']
  },
  {
    name: 'K-Means Clustering',
    description: 'An unsupervised learning algorithm that groups similar data points.',
    path: '/algorithms/kmeans',
    icon: '🎯',
    categories: ['unsupervised', 'clustering']
  },
  {
    name: 'DBSCAN',
    description: 'A density-based clustering algorithm that identifies clusters of varying shapes.',
    path: '/algorithms/dbscan',
    icon: '🌐',
    categories: ['unsupervised', 'clustering']
  },
  {
    name: 'K-Nearest Neighbors',
    description: 'A simple, instance-based learning algorithm for classification.',
    path: '/algorithms/knn',
    icon: '🔍',
    categories: ['supervised', 'classification']
  },
  {
    name: 'Naive Bayes',
    description: 'A probabilistic classifier based on Bayes theorem.',
    path: '/algorithms/naive-bayes',
    icon: '📊',
    categories: ['supervised', 'classification']
  },
  {
    name: 'Random Forest',
    description: 'An ensemble learning method that constructs multiple decision trees.',
    path: '/algorithms/random-forest',
    icon: '🌲',
    categories: ['supervised', 'classification', 'ensemble']
  },
  {
    name: 'AdaBoost',
    description: 'An adaptive boosting algorithm that combines weak classifiers.',
    path: '/algorithms/adaboost',
    icon: '⚡',
    categories: ['supervised', 'classification', 'ensemble']
  },
  {
    name: 'Decision Trees',
    description: 'A tree-like model of decisions and their consequences.',
    path: '/algorithms/decision-tree',
    icon: '🌳',
    categories: ['supervised', 'classification']
  },
  {
    name: 'Deep Neural Networks',
    description: 'A powerful machine learning model inspired by the human brain, capable of learning complex patterns through multiple layers of interconnected neurons.',
    path: '/algorithms/deep-neural-networks',
    icon: '🧠',
    categories: ['supervised', 'deep-learning']
  },
];

export const categories = [
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
  },
  {
    id: 'ensemble',
    name: 'Ensemble Methods',
    description: 'Algorithms that combine multiple models for better performance'
  },
  {
    id: 'deep-learning',
    name: 'Deep Learning',
    description: 'Neural network-based algorithms with multiple layers for complex pattern recognition'
  }
]; 