import { Question } from './decisionTree';

export const knnQuestions: Question[] = [
  {
    id: 1,
    question: 'What is the main principle behind K-Nearest Neighbors (KNN)?',
    options: [
      'Finding the optimal hyperplane to separate classes',
      'Making predictions based on the K closest training examples',
      'Minimizing the error between predicted and actual values',
      'Finding patterns in unlabeled data'
    ],
    correctAnswer: 1,
    explanation: 'KNN makes predictions by finding the K closest training examples to a new data point and using their labels or values to make a prediction.'
  },
  {
    id: 2,
    question: 'What is the main advantage of KNN?',
    options: [
      'Fast training time',
      'No training required',
      'Works well with high-dimensional data',
      'Handles missing values automatically'
    ],
    correctAnswer: 1,
    explanation: 'KNN is a lazy learning algorithm that doesn\'t require any training. It simply stores all training examples and makes predictions based on the nearest neighbors.'
  },
  {
    id: 3,
    question: 'Which of the following is a key limitation of KNN?',
    options: [
      'Cannot handle categorical features',
      'Requires feature scaling',
      'Cannot be used for regression',
      'Always overfits the data'
    ],
    correctAnswer: 1,
    explanation: 'KNN is sensitive to the scale of features. Features with larger scales will have a greater influence on the distance calculations, so proper scaling is essential.'
  },
  {
    id: 4,
    question: 'How does KNN handle classification tasks?',
    options: [
      'By calculating the weighted average of neighbors',
      'By taking the majority vote of K nearest neighbors',
      'By using a decision boundary',
      'By applying a probability threshold'
    ],
    correctAnswer: 1,
    explanation: 'For classification tasks, KNN takes the majority vote of the K nearest neighbors\' labels to make a prediction.'
  },
  {
    id: 5,
    question: 'What is the time complexity of making a prediction with KNN?',
    options: [
      'O(1)',
      'O(n)',
      'O(n * d)',
      'O(n²)'
    ],
    correctAnswer: 2,
    explanation: 'The time complexity is O(n * d) where n is the number of training examples and d is the number of features, as we need to calculate distances to all training points.'
  },
  {
    id: 6,
    question: 'Which distance metric is most commonly used in KNN?',
    options: [
      'Manhattan distance',
      'Euclidean distance',
      'Cosine similarity',
      'Hamming distance'
    ],
    correctAnswer: 1,
    explanation: 'Euclidean distance is the most commonly used distance metric in KNN, though other metrics like Manhattan distance can also be used depending on the problem.'
  },
  {
    id: 7,
    question: 'What happens if K is set too small in KNN?',
    options: [
      'The model becomes too general',
      'The model becomes too specific and sensitive to noise',
      'The model becomes computationally expensive',
      'The model cannot make predictions'
    ],
    correctAnswer: 1,
    explanation: 'A small K value makes the model more sensitive to noise and outliers, as it only considers a few nearest neighbors for prediction.'
  },
  {
    id: 8,
    question: 'Which of the following is NOT a typical use case for KNN?',
    options: [
      'Image classification',
      'Recommendation systems',
      'Time series forecasting',
      'Pattern recognition'
    ],
    correctAnswer: 2,
    explanation: 'KNN is not typically used for time series forecasting as it doesn\'t account for temporal dependencies in the data.'
  }
]; 