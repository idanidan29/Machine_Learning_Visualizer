import { Question } from './types';

export const svmQuestions: Question[] = [
  {
    id: 1,
    question: "What is the main goal of Support Vector Machine (SVM)?",
    options: [
      "To minimize the number of misclassifications",
      "To find the optimal hyperplane that maximizes the margin between classes",
      "To reduce the dimensionality of the data",
      "To maximize the number of support vectors"
    ],
    correctAnswer: 1,
    explanation: "The main goal of SVM is to find the optimal hyperplane that separates the classes while maximizing the margin between them. This helps in better generalization and reduces overfitting."
  },
  {
    id: 2,
    question: "What are support vectors in SVM?",
    options: [
      "All training data points",
      "Data points that are misclassified",
      "Data points that are closest to the decision boundary and define the margin",
      "Randomly selected data points"
    ],
    correctAnswer: 2,
    explanation: "Support vectors are the data points that are closest to the decision boundary and define the margin. They are crucial for determining the optimal hyperplane and are the only points that matter for classification."
  },
  {
    id: 3,
    question: "What is the kernel trick in SVM?",
    options: [
      "A method to reduce computational complexity",
      "A technique to transform data into higher-dimensional space without explicitly computing the coordinates",
      "A way to handle missing data",
      "A method to normalize features"
    ],
    correctAnswer: 1,
    explanation: "The kernel trick allows SVM to operate in higher-dimensional spaces without explicitly computing the coordinates in that space. This is done by computing the inner products between the images of all pairs of data in the feature space."
  },
  {
    id: 4,
    question: "Which of the following is NOT a common kernel function used in SVM?",
    options: [
      "Linear kernel",
      "RBF (Radial Basis Function) kernel",
      "Polynomial kernel",
      "Exponential kernel"
    ],
    correctAnswer: 3,
    explanation: "Linear, RBF, and Polynomial kernels are common kernel functions in SVM. Exponential kernel is not a standard kernel function, though there are variations like the Laplacian kernel which uses exponential functions."
  },
  {
    id: 5,
    question: "What does the parameter C control in SVM?",
    options: [
      "The number of support vectors",
      "The trade-off between margin size and classification error",
      "The kernel function type",
      "The dimensionality of the feature space"
    ],
    correctAnswer: 1,
    explanation: "The parameter C controls the trade-off between margin size and classification error. A larger C value means the SVM will try to classify all training examples correctly, potentially leading to overfitting, while a smaller C allows some misclassifications for a larger margin."
  },
  {
    id: 6,
    question: "What is the mathematical form of the decision function in linear SVM?",
    options: [
      "f(x) = w^T x + b",
      "f(x) = w^T x - b",
      "f(x) = w^T x * b",
      "f(x) = w^T x / b"
    ],
    correctAnswer: 0,
    explanation: "The decision function in linear SVM is f(x) = w^T x + b, where w is the weight vector, x is the input feature vector, and b is the bias term. The sign of this function determines the class prediction."
  },
  {
    id: 7,
    question: "What happens when you use a very large value for the gamma parameter in RBF kernel?",
    options: [
      "The model becomes more robust to noise",
      "The model becomes more flexible and may overfit",
      "The model becomes less sensitive to individual data points",
      "The model becomes more computationally efficient"
    ],
    correctAnswer: 1,
    explanation: "A very large gamma value in RBF kernel makes the model more flexible and may lead to overfitting. This is because each training example affects a very small region, making the decision boundary very complex."
  },
  {
    id: 8,
    question: "Which of the following is a limitation of SVM?",
    options: [
      "It cannot handle non-linear data",
      "It requires feature scaling for optimal performance",
      "It cannot perform multi-class classification",
      "It cannot handle categorical features"
    ],
    correctAnswer: 1,
    explanation: "SVM is sensitive to feature scaling and requires features to be on similar scales for optimal performance. This is because SVM uses distance-based calculations, and features with different scales can dominate the distance calculations."
  },
  {
    id: 9,
    question: "What is the margin in SVM?",
    options: [
      "The distance between the two classes",
      "The distance between the hyperplane and the closest data points of each class",
      "The number of support vectors",
      "The regularization parameter"
    ],
    correctAnswer: 1,
    explanation: "The margin is the distance between the hyperplane and the closest data points of each class. SVM aims to maximize this margin to improve generalization and reduce overfitting."
  },
  {
    id: 10,
    question: "Which kernel function is most suitable for text classification tasks?",
    options: [
      "Linear kernel",
      "RBF kernel",
      "Polynomial kernel",
      "Sigmoid kernel"
    ],
    correctAnswer: 0,
    explanation: "Linear kernel is most suitable for text classification tasks because text data is often high-dimensional and sparse, and linear separation is usually sufficient. Linear kernels are also faster and more interpretable for high-dimensional data."
  }
]; 