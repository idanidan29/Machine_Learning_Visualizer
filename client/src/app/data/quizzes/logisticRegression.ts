import { Question } from './types';

export const logisticRegressionQuestions: Question[] = [
  {
    question: 'What is the main purpose of logistic regression?',
    options: [
      'To predict continuous values',
      'To perform binary classification',
      'To cluster data points',
      'To reduce dimensionality'
    ],
    correctAnswer: 1,
    explanation: 'Logistic regression is primarily used for binary classification problems, where the goal is to predict one of two possible outcomes.',
    id: 1
  },
  {
    question: 'What function is used in logistic regression to convert linear predictions into probabilities?',
    options: [
      'Linear function',
      'Sigmoid function',
      'ReLU function',
      'Tanh function'
    ],
    correctAnswer: 1,
    explanation: 'The sigmoid function (also called the logistic function) is used to convert linear predictions into probabilities between 0 and 1.',
    id: 2
  },
  {
    question: 'What is the range of the sigmoid function?',
    options: [
      '(-∞, ∞)',
      '[-1, 1]',
      '[0, 1]',
      '(0, 1)'
    ],
    correctAnswer: 2,
    explanation: 'The sigmoid function outputs values between 0 and 1, making it suitable for probability estimation.',
    id: 3
  },
  {
    question: 'Which loss function is commonly used in logistic regression?',
    options: [
      'Mean Squared Error',
      'Binary Cross-Entropy',
      'Hinge Loss',
      'Absolute Error'
    ],
    correctAnswer: 1,
    explanation: 'Binary Cross-Entropy (also called log loss) is the standard loss function for logistic regression as it penalizes incorrect probability estimates.',
    id: 4
  },
  {
    question: 'What is the decision boundary in logistic regression?',
    options: [
      'A straight line',
      'A curved line',
      'A hyperplane',
      'A circle'
    ],
    correctAnswer: 2,
    explanation: 'In logistic regression, the decision boundary is a hyperplane that separates the two classes. In 2D space, this appears as a line.',
    id: 5
  },
  {
    question: 'How does logistic regression handle outliers?',
    options: [
      'It is very sensitive to outliers',
      'It is completely immune to outliers',
      'It is moderately robust to outliers',
      'It automatically removes outliers'
    ],
    correctAnswer: 2,
    explanation: 'Logistic regression is moderately robust to outliers because the sigmoid function compresses extreme values, making the model less sensitive to outliers compared to linear regression.',
    id: 6
  },
  {
    question: 'What is the main advantage of logistic regression over more complex models?',
    options: [
      'Better accuracy',
      'Interpretability',
      'Faster training time',
      'Ability to handle non-linear relationships'
    ],
    correctAnswer: 1,
    explanation: 'Logistic regression is highly interpretable as the coefficients directly indicate the impact of each feature on the probability of the positive class.',
    id: 7
  },
  {
    question: 'Which of the following is NOT a limitation of logistic regression?',
    options: [
      'Cannot handle non-linear relationships',
      'Requires feature scaling',
      'Cannot handle missing values',
      'Cannot handle categorical variables'
    ],
    correctAnswer: 3,
    explanation: 'Logistic regression can handle categorical variables through one-hot encoding or other encoding techniques. The other options are actual limitations.',
    id: 8
  },
  {
    question: 'What is the purpose of regularization in logistic regression?',
    options: [
      'To increase model complexity',
      'To prevent overfitting',
      'To speed up training',
      'To handle missing values'
    ],
    correctAnswer: 1,
    explanation: 'Regularization (L1 or L2) helps prevent overfitting by penalizing large coefficients and encouraging simpler models.',
    id: 9
  },
  {
    question: 'How does logistic regression handle multi-class classification?',
    options: [
      'It cannot handle multi-class problems',
      'Using one-vs-rest approach',
      'Using one-vs-one approach',
      'Using softmax function'
    ],
    correctAnswer: 1,
    explanation: 'For multi-class problems, logistic regression typically uses the one-vs-rest (OvR) approach, where a separate binary classifier is trained for each class.',
    id: 10
  }
]; 