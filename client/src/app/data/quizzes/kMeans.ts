import { Question } from './types';

export const kMeansQuestions: Question[] = [
  {
    id: 1,
    question: 'What is the main purpose of K-Means clustering?',
    options: [
      'To classify data into predefined categories',
      'To find natural groupings in data',
      'To predict continuous values',
      'To reduce dimensionality'
    ],
    correctAnswer: 1,
    explanation: 'K-Means is an unsupervised learning algorithm that finds natural groupings (clusters) in data without predefined categories.'
  },
  {
    id: 2,
    question: 'How does K-Means determine the optimal number of clusters?',
    options: [
      'It automatically finds the optimal number',
      'The number must be specified beforehand',
      'It uses cross-validation',
      'It uses feature importance'
    ],
    correctAnswer: 1,
    explanation: 'K-Means requires the number of clusters (k) to be specified in advance. Methods like the elbow method can help determine the optimal k.'
  },
  {
    id: 3,
    question: 'What is the main limitation of K-Means?',
    options: [
      'It cannot handle large datasets',
      'It requires labeled data',
      'It assumes spherical clusters',
      'It is computationally expensive'
    ],
    correctAnswer: 2,
    explanation: 'K-Means assumes that clusters are spherical and of similar size, which may not be true for all datasets.'
  },
  {
    id: 4,
    question: 'What is the role of centroids in K-Means?',
    options: [
      'They represent the boundaries between clusters',
      'They are the center points of each cluster',
      'They are the outliers in the data',
      'They are the input features'
    ],
    correctAnswer: 1,
    explanation: 'Centroids are the center points of each cluster, and the algorithm iteratively updates them to minimize the within-cluster variance.'
  },
  {
    id: 5,
    question: 'Which of the following is a common application of K-Means?',
    options: [
      'Sentiment analysis',
      'Image segmentation',
      'Time series forecasting',
      'Natural language processing'
    ],
    correctAnswer: 1,
    explanation: 'K-Means is commonly used in image segmentation to group similar pixels together and identify distinct regions in an image.'
  }
]; 