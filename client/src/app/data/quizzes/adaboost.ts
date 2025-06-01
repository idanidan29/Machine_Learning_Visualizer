import { Question } from './decisionTree';

export const adaboostQuestions: Question[] = [
  {
    id: 1,
    question: 'What is the main principle behind AdaBoost?',
    options: [
      'Combining multiple weak classifiers to create a strong classifier',
      'Using a single strong classifier for all predictions',
      'Randomly selecting features for each prediction',
      'Creating a hierarchical structure of decisions'
    ],
    correctAnswer: 0,
    explanation: 'AdaBoost works by combining multiple weak classifiers (those that perform slightly better than random guessing) to create a strong classifier through weighted voting.'
  },
  {
    id: 2,
    question: 'How does AdaBoost handle misclassified examples?',
    options: [
      'It removes them from the training set',
      'It increases their weights in the next iteration',
      'It decreases their weights in the next iteration',
      'It ignores them completely'
    ],
    correctAnswer: 1,
    explanation: 'AdaBoost increases the weights of misclassified examples in each iteration, forcing subsequent weak classifiers to focus more on these difficult cases.'
  },
  {
    id: 3,
    question: 'What is the role of the alpha (α) parameter in AdaBoost?',
    options: [
      'It determines the learning rate',
      'It controls the number of iterations',
      'It weights the contribution of each weak classifier',
      'It sets the threshold for classification'
    ],
    correctAnswer: 2,
    explanation: 'The alpha parameter determines how much influence each weak classifier has in the final prediction. It is calculated based on the classifier\'s error rate.'
  },
  {
    id: 4,
    question: 'Which of the following is a key advantage of AdaBoost?',
    options: [
      'It always achieves perfect accuracy',
      'It requires minimal computational resources',
      'It is resistant to overfitting',
      'It can handle any type of data without preprocessing'
    ],
    correctAnswer: 2,
    explanation: 'AdaBoost is resistant to overfitting because it focuses on difficult examples and combines multiple weak classifiers, each with different strengths.'
  },
  {
    id: 5,
    question: 'What happens to the weights of correctly classified examples in AdaBoost?',
    options: [
      'They remain unchanged',
      'They are increased',
      'They are decreased',
      'They are set to zero'
    ],
    correctAnswer: 2,
    explanation: 'Correctly classified examples have their weights decreased in each iteration, as the algorithm focuses more on the misclassified examples.'
  },
  {
    id: 6,
    question: 'Which of the following is NOT a typical use case for AdaBoost?',
    options: [
      'Face detection',
      'Text classification',
      'Time series forecasting',
      'Object recognition'
    ],
    correctAnswer: 2,
    explanation: 'AdaBoost is not typically used for time series forecasting as it doesn\'t account for temporal dependencies in the data.'
  },
  {
    id: 7,
    question: 'What is the main limitation of AdaBoost?',
    options: [
      'It cannot handle binary classification',
      'It is sensitive to noisy data and outliers',
      'It requires feature scaling',
      'It cannot handle missing values'
    ],
    correctAnswer: 1,
    explanation: 'AdaBoost is sensitive to noisy data and outliers because it gives higher weights to misclassified examples, which can lead to overfitting if the data contains noise.'
  },
  {
    id: 8,
    question: 'How does AdaBoost determine the final prediction?',
    options: [
      'By taking the average of all weak classifiers',
      'By using weighted voting of all weak classifiers',
      'By selecting the prediction of the best weak classifier',
      'By using a majority vote of all weak classifiers'
    ],
    correctAnswer: 1,
    explanation: 'AdaBoost makes the final prediction by taking a weighted vote of all weak classifiers, where each classifier\'s weight is determined by its performance.'
  }
]; 