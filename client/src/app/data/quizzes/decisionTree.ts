export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const decisionTreeQuestions: Question[] = [
  {
    id: 1,
    question: 'What is the main purpose of a decision tree?',
    options: [
      'To create a hierarchical structure of decisions',
      'To perform clustering on data',
      'To reduce dimensionality of data',
      'To perform feature scaling'
    ],
    correctAnswer: 0,
    explanation: 'A decision tree creates a hierarchical structure of decisions by recursively splitting the data based on feature values.'
  },
  {
    id: 2,
    question: 'Which metric is commonly used to determine the best split in a decision tree?',
    options: [
      'Mean Squared Error',
      'Information Gain',
      'Euclidean Distance',
      'Cosine Similarity'
    ],
    correctAnswer: 1,
    explanation: 'Information Gain is commonly used to determine the best split by measuring how much a feature reduces uncertainty.'
  },
  {
    id: 3,
    question: 'What is the main advantage of decision trees?',
    options: [
      'They always achieve the highest accuracy',
      'They are computationally efficient',
      'They are easy to interpret and explain',
      'They work well with any type of data'
    ],
    correctAnswer: 2,
    explanation: 'Decision trees are highly interpretable as they can be visualized and the decision path can be easily understood.'
  },
  {
    id: 4,
    question: 'What is a leaf node in a decision tree?',
    options: [
      'A node that has no children',
      'A node that has the most children',
      'A node that represents the root',
      'A node that has exactly two children'
    ],
    correctAnswer: 0,
    explanation: 'A leaf node is a terminal node that has no children and represents the final prediction or classification.'
  },
  {
    id: 5,
    question: 'Which of the following is a limitation of decision trees?',
    options: [
      'They can only handle numerical data',
      'They are prone to overfitting',
      'They cannot handle missing values',
      'They are too complex to implement'
    ],
    correctAnswer: 1,
    explanation: 'Decision trees can easily overfit the training data, especially when they grow too deep.'
  }
]; 