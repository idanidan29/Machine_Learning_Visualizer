import { Question } from './types';

export const naiveBayesQuestions: Question[] = [
  {
    id: 1,
    question: 'What is the main assumption of Naive Bayes?',
    options: [
      'Features are dependent on each other',
      'Features are independent of each other',
      'Features are normally distributed',
      'Features are linearly correlated'
    ],
    correctAnswer: 1,
    explanation: 'Naive Bayes assumes that all features are independent of each other, which is why it\'s called "naive".'
  },
  {
    id: 2,
    question: 'Which probability rule is fundamental to Naive Bayes?',
    options: [
      'Bayes\' Theorem',
      'Central Limit Theorem',
      'Law of Large Numbers',
      'Markov\'s Inequality'
    ],
    correctAnswer: 0,
    explanation: 'Naive Bayes is based on Bayes\' Theorem, which describes the probability of an event based on prior knowledge.'
  },
  {
    id: 3,
    question: 'What is the main advantage of Naive Bayes?',
    options: [
      'It always achieves the highest accuracy',
      'It can handle any type of data',
      'It is fast and works well with high-dimensional data',
      'It can capture complex relationships'
    ],
    correctAnswer: 2,
    explanation: 'Naive Bayes is computationally efficient and performs well even with high-dimensional data.'
  },
  {
    id: 4,
    question: 'What is Laplace smoothing used for in Naive Bayes?',
    options: [
      'To improve computational efficiency',
      'To handle missing values',
      'To prevent zero probability problems',
      'To reduce dimensionality'
    ],
    correctAnswer: 2,
    explanation: 'Laplace smoothing (add-one smoothing) prevents zero probabilities by adding a small value to all counts.'
  },
  {
    id: 5,
    question: 'Which of the following is a limitation of Naive Bayes?',
    options: [
      'It cannot handle categorical data',
      'It requires a large amount of training data',
      'It assumes feature independence which may not be true',
      'It is too complex to implement'
    ],
    correctAnswer: 2,
    explanation: 'The main limitation is the naive assumption of feature independence, which may not hold true in real-world scenarios.'
  }
]; 