import { Question } from './decisionTree';

export const randomForestQuestions: Question[] = [
  {
    id: 1,
    question: 'What is the main advantage of Random Forest over a single decision tree?',
    options: [
      'Faster training time',
      'Better handling of overfitting',
      'Lower memory usage',
      'More interpretable results'
    ],
    correctAnswer: 1,
    explanation: 'Random Forest reduces overfitting by combining multiple decision trees and using techniques like bagging and feature randomization.'
  },
  {
    id: 2,
    question: 'How does Random Forest handle feature selection?',
    options: [
      'It uses all features for every tree',
      'It randomly selects a subset of features for each tree',
      'It uses feature importance to select features',
      'It requires manual feature selection'
    ],
    correctAnswer: 1,
    explanation: 'Random Forest randomly selects a subset of features for each tree, which helps create diverse trees and reduces correlation between them.'
  },
  {
    id: 3,
    question: 'What is bagging in Random Forest?',
    options: [
      'A technique to reduce tree depth',
      'A method to combine multiple trees',
      'A process of creating bootstrap samples',
      'A way to handle missing values'
    ],
    correctAnswer: 2,
    explanation: 'Bagging (Bootstrap Aggregating) involves creating multiple bootstrap samples from the training data, where each sample is created by randomly selecting data points with replacement.'
  },
  {
    id: 4,
    question: 'How does Random Forest make predictions for classification tasks?',
    options: [
      'By averaging the predictions of all trees',
      'By taking the majority vote of all trees',
      'By using the prediction of the most accurate tree',
      'By weighting the predictions based on tree accuracy'
    ],
    correctAnswer: 1,
    explanation: 'For classification tasks, Random Forest uses majority voting, where each tree votes for a class and the class with the most votes becomes the final prediction.'
  },
  {
    id: 5,
    question: 'What is a key limitation of Random Forest?',
    options: [
      'It cannot handle categorical features',
      'It requires feature scaling',
      'It is less interpretable than single trees',
      'It cannot handle missing values'
    ],
    correctAnswer: 2,
    explanation: 'While Random Forest is powerful, it is less interpretable than a single decision tree because it combines multiple trees and their predictions.'
  }
]; 