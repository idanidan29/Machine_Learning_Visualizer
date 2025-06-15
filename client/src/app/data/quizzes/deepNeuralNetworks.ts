import { Question } from './types';

export const deepNeuralNetworksQuestions: Question[] = [
  {
    question: 'What is the main advantage of deep neural networks over traditional neural networks?',
    options: [
      'They can learn hierarchical features automatically',
      'They are faster to train',
      'They require less data',
      'They are easier to implement'
    ],
    correctAnswer: 0,
    explanation: 'Deep neural networks can automatically learn hierarchical features from raw data, with each layer learning increasingly complex patterns. This is their main advantage over traditional neural networks.',
    id: 1
  },
  {
    question: 'What is the purpose of the activation function in a neural network?',
    options: [
      'To introduce non-linearity into the network',
      'To speed up training',
      'To reduce memory usage',
      'To normalize the input data'
    ],
    correctAnswer: 0,
    explanation: 'Activation functions introduce non-linearity into the network, allowing it to learn complex patterns. Without activation functions, the network would only be able to learn linear relationships.',
    id: 2
  },
  {
    question: 'What is backpropagation used for in deep neural networks?',
    options: [
      'To calculate gradients and update weights during training',
      'To initialize the network weights',
      'To normalize the input data',
      'To visualize the network structure'
    ],
    correctAnswer: 0,
    explanation: 'Backpropagation is an algorithm that calculates gradients of the loss function with respect to the network weights, which are then used to update the weights during training.',
    id: 3
  },
  {
    question: 'What is the vanishing gradient problem?',
    options: [
      'When gradients become too small to effectively update weights in early layers',
      'When the network becomes too large',
      'When there is too much training data',
      'When the learning rate is too high'
    ],
    correctAnswer: 0,
    explanation: 'The vanishing gradient problem occurs when gradients become extremely small as they are backpropagated through many layers, making it difficult to update weights in early layers effectively.',
    id: 4
  },
  {
    question: 'What is the purpose of dropout in neural networks?',
    options: [
      'To prevent overfitting by randomly deactivating neurons during training',
      'To speed up training',
      'To reduce memory usage',
      'To normalize the input data'
    ],
    correctAnswer: 0,
    explanation: 'Dropout is a regularization technique that randomly deactivates neurons during training, forcing the network to learn with different subsets of neurons and preventing overfitting.',
    id: 5
  },
  {
    question: 'What is batch normalization used for?',
    options: [
      'To normalize the inputs of each layer to improve training stability',
      'To increase the batch size',
      'To reduce the number of layers',
      'To speed up inference'
    ],
    correctAnswer: 0,
    explanation: 'Batch normalization normalizes the inputs of each layer by adjusting and scaling the activations, which helps stabilize and speed up training of deep neural networks.',
    id: 6
  },
  {
    question: 'What is the difference between convolutional and fully connected layers?',
    options: [
      'Convolutional layers use shared weights and are designed for spatial data, while fully connected layers connect every neuron to every other neuron',
      'Convolutional layers are faster to train',
      'Fully connected layers can only handle 1D data',
      'Convolutional layers can only handle 2D data'
    ],
    correctAnswer: 0,
    explanation: 'Convolutional layers use shared weights and are specifically designed to process spatial data like images, while fully connected layers connect every neuron to every other neuron in the next layer.',
    id: 7
  },
  {
    question: 'What is the purpose of the learning rate in neural network training?',
    options: [
      'To control how much the weights are updated during each iteration',
      'To determine the number of layers',
      'To set the batch size',
      'To choose the activation function'
    ],
    correctAnswer: 0,
    explanation: 'The learning rate determines the size of the weight updates during training. A too large learning rate can cause instability, while a too small learning rate can make training very slow.',
    id: 8
  },
  {
    question: 'What is transfer learning in deep neural networks?',
    options: [
      'Using pre-trained models and fine-tuning them for new tasks',
      'Moving the model to a different computer',
      'Changing the network architecture',
      'Using different activation functions'
    ],
    correctAnswer: 0,
    explanation: 'Transfer learning involves using a pre-trained model (usually trained on a large dataset) and fine-tuning it for a new task, which can significantly reduce the amount of training data and time needed.',
    id: 9
  },
  {
    question: 'What is the purpose of the softmax activation function?',
    options: [
      'To convert raw scores into probabilities that sum to 1',
      'To introduce non-linearity',
      'To normalize the input data',
      'To speed up training'
    ],
    correctAnswer: 0,
    explanation: 'The softmax activation function converts raw scores (logits) into probabilities that sum to 1, making it suitable for multi-class classification problems.',
    id: 10
  }
]; 