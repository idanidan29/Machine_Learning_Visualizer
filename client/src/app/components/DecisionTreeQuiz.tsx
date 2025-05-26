'use client';

import React, { useState } from 'react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const questions: Question[] = [
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

const DecisionTreeQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Quiz Completed!</h2>
        <p className="text-gray-300 mb-6">
          Your score: {score} out of {questions.length}
        </p>
        <button
          onClick={handleRestartQuiz}
          className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors duration-200"
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-4">Test Your Knowledge</h2>
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="mb-4">
          <span className="text-gray-400">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        <h3 className="text-xl text-white mb-6">{questions[currentQuestion].question}</h3>
        <div className="space-y-4">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={selectedAnswer !== null}
              className={`w-full text-left p-4 rounded-lg transition-colors duration-200 ${
                selectedAnswer === index
                  ? index === questions[currentQuestion].correctAnswer
                    ? 'bg-green-600 text-white'
                    : 'bg-red-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        {showExplanation && (
          <div className="mt-6 p-4 bg-gray-700 rounded-lg">
            <p className="text-gray-300">{questions[currentQuestion].explanation}</p>
            <button
              onClick={handleNextQuestion}
              className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors duration-200"
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DecisionTreeQuiz; 