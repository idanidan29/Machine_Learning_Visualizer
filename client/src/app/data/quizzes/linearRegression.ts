import { Question } from './decisionTree';

export const linearRegressionQuestions: Question[] = [
  {
    question: 'What is the main goal of linear regression?',
    options: [
      'To find the best-fitting straight line through a set of data points',
      'To classify data into different categories',
      'To find clusters in unlabeled data',
      'To reduce the dimensionality of data'
    ],
    correctAnswer: 0,
    explanation: 'Linear regression aims to find the best-fitting straight line (or hyperplane in higher dimensions) that minimizes the sum of squared differences between the predicted and actual values.',
    id: 1
  },
  {
    question: 'What is the cost function typically used in linear regression?',
    options: [
      'Mean Squared Error (MSE)',
      'Cross-Entropy Loss',
      'Hinge Loss',
      'Absolute Error'
    ],
    correctAnswer: 0,
    explanation: 'Mean Squared Error (MSE) is the most commonly used cost function in linear regression. It measures the average squared difference between the predicted and actual values.',
    id: 2
  },
  {
    question: 'What is gradient descent used for in linear regression?',
    options: [
      'To find the optimal values of the model parameters',
      'To normalize the input features',
      'To split the data into training and test sets',
      'To visualize the data'
    ],
    correctAnswer: 0,
    explanation: 'Gradient descent is an optimization algorithm used to find the optimal values of the model parameters (slope and intercept) by minimizing the cost function.',
    id: 3
  },
  {
    question: 'What is the difference between simple and multiple linear regression?',
    options: [
      'Simple linear regression has one independent variable, while multiple linear regression has multiple independent variables',
      'Simple linear regression is faster than multiple linear regression',
      'Simple linear regression can only handle continuous data',
      'Multiple linear regression can only handle categorical data'
    ],
    correctAnswer: 0,
    explanation: 'Simple linear regression models the relationship between one independent variable and the dependent variable, while multiple linear regression models the relationship between multiple independent variables and the dependent variable.',
    id: 4
  },
  {
    question: 'What is the purpose of the learning rate in gradient descent?',
    options: [
      'To control the size of the steps taken towards the minimum of the cost function',
      'To determine how many iterations to run',
      'To scale the input features',
      'To split the data into batches'
    ],
    correctAnswer: 0,
    explanation: 'The learning rate determines how large the steps are when updating the model parameters during gradient descent. A too large learning rate can cause overshooting, while a too small learning rate can make the algorithm converge slowly.',
    id: 5
  },
  {
    question: 'What is the difference between linear and polynomial regression?',
    options: [
      'Polynomial regression can model non-linear relationships by using polynomial terms',
      'Polynomial regression is always more accurate than linear regression',
      'Linear regression can only handle continuous data',
      'Polynomial regression can only handle categorical data'
    ],
    correctAnswer: 0,
    explanation: 'Polynomial regression extends linear regression by adding polynomial terms of the independent variables, allowing it to model non-linear relationships between variables.',
    id: 6
  },
  {
    question: 'What is the purpose of regularization in linear regression?',
    options: [
      'To prevent overfitting by penalizing large coefficients',
      'To speed up the training process',
      'To handle missing values in the data',
      'To normalize the input features'
    ],
    correctAnswer: 0,
    explanation: 'Regularization techniques like Ridge (L2) and Lasso (L1) regression add a penalty term to the cost function to prevent overfitting by discouraging large coefficient values.',
    id: 7
  },
  {
    question: 'What is the difference between Ridge and Lasso regression?',
    options: [
      'Ridge regression uses L2 regularization, while Lasso uses L1 regularization',
      'Ridge regression is faster than Lasso regression',
      'Lasso regression can only handle continuous data',
      'Ridge regression can only handle categorical data'
    ],
    correctAnswer: 0,
    explanation: 'Ridge regression uses L2 regularization (sum of squared coefficients), while Lasso regression uses L1 regularization (sum of absolute coefficients). Lasso can perform feature selection by setting some coefficients to zero.',
    id: 8
  },
  {
    question: 'What is the purpose of the intercept term in linear regression?',
    options: [
      'To allow the line to cross the y-axis at any point',
      'To normalize the input features',
      'To handle missing values',
      'To speed up the training process'
    ],
    correctAnswer: 0,
    explanation: 'The intercept term (bias) allows the regression line to cross the y-axis at any point, making the model more flexible and able to fit data that doesn\'t pass through the origin.',
    id: 9
  },
  {
    question: 'What is the difference between correlation and causation in linear regression?',
    options: [
      'Correlation shows a relationship between variables, while causation implies one variable directly affects another',
      'Correlation is always stronger than causation',
      'Causation can only be shown with categorical data',
      'Correlation can only be shown with continuous data'
    ],
    correctAnswer: 0,
    explanation: 'While linear regression can show correlation between variables, it cannot prove causation. Additional evidence and domain knowledge are needed to establish causal relationships.',
    id: 10
  }
]; 