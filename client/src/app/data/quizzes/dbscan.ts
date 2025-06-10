import { Question } from './decisionTree';

export const dbscanQuestions: Question[] = [
  {
    id: 1,
    question: 'What are the two main parameters of DBSCAN?',
    options: [
      'eps and minPts',
      'k and distance',
      'radius and density',
      'threshold and neighbors'
    ],
    correctAnswer: 0,
    explanation: 'DBSCAN uses two parameters: eps (the maximum distance between points in a neighborhood) and minPts (the minimum number of points required to form a core point).'
  },
  {
    id: 2,
    question: 'What type of points are neither core points nor border points?',
    options: [
      'Cluster points',
      'Noise points',
      'Edge points',
      'Center points'
    ],
    correctAnswer: 1,
    explanation: 'Noise points are points that are neither core points nor border points. They are outliers in the dataset.'
  },
  {
    id: 3,
    question: 'What is the main advantage of DBSCAN over K-means?',
    options: [
      'Faster computation',
      'No need to specify number of clusters',
      'Better for high-dimensional data',
      'More accurate results'
    ],
    correctAnswer: 1,
    explanation: 'DBSCAN does not require specifying the number of clusters beforehand, unlike K-means, which needs the number of clusters to be defined.'
  },
  {
    id: 4,
    question: 'What is the time complexity of DBSCAN in the worst case?',
    options: [
      'O(n)',
      'O(n log n)',
      'O(n²)',
      'O(n³)'
    ],
    correctAnswer: 2,
    explanation: 'The time complexity of DBSCAN in the worst case is O(n²), where n is the number of data points, due to the need to compute distances between all points.'
  },
  {
    id: 5,
    question: 'What is a core point in DBSCAN?',
    options: [
      'A point that is farthest from other points',
      'A point that has at least minPts neighbors within eps distance',
      'A point that is at the center of a cluster',
      'A point that connects two clusters'
    ],
    correctAnswer: 1,
    explanation: 'A core point is a point that has at least minPts neighbors within its eps-neighborhood. These points form the foundation of clusters.'
  },
  {
    id: 6,
    question: 'What is a border point in DBSCAN?',
    options: [
      'A point that is on the edge of the dataset',
      'A point that has fewer than minPts neighbors but is reachable from a core point',
      'A point that has exactly minPts neighbors',
      'A point that is equidistant from two core points'
    ],
    correctAnswer: 1,
    explanation: 'A border point has fewer than minPts neighbors but is reachable from a core point. It helps connect core points in a cluster.'
  },
  {
    id: 7,
    question: 'Which of the following is a limitation of DBSCAN?',
    options: [
      'Cannot handle categorical data',
      'Requires feature scaling',
      'Struggles with clusters of varying densities',
      'Cannot handle missing values'
    ],
    correctAnswer: 2,
    explanation: 'DBSCAN struggles with clusters of varying densities because it uses the same eps and minPts parameters for all clusters.'
  },
  {
    id: 8,
    question: 'What is the main advantage of DBSCAN for spatial data?',
    options: [
      'Faster computation than other algorithms',
      'Can find clusters of arbitrary shapes',
      'Works better with high-dimensional data',
      'Requires less memory'
    ],
    correctAnswer: 1,
    explanation: 'DBSCAN can find clusters of arbitrary shapes, which is particularly useful for spatial data where clusters may not be spherical or well-separated.'
  }
]; 