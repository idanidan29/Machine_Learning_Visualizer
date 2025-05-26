'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
    question: "What is the main assumption of Naive Bayes?",
    options: [
      "Features are dependent on each other",
      "Features are conditionally independent",
      "Features are normally distributed",
      "Features are linearly separable"
    ],
    correctAnswer: 1,
    explanation: "Naive Bayes assumes that features are conditionally independent given the class, which is why it's called 'naive'."
  },
  {
    id: 2,
    question: "Which theorem is the foundation of Naive Bayes?",
    options: [
      "Central Limit Theorem",
      "Bayes' Theorem",
      "Pythagorean Theorem",
      "Law of Large Numbers"
    ],
    correctAnswer: 1,
    explanation: "Naive Bayes is based on Bayes' Theorem, which describes the probability of an event based on prior knowledge of conditions related to the event."
  },
  {
    id: 3,
    question: "What is a common application of Naive Bayes?",
    options: [
      "Image recognition",
      "Time series forecasting",
      "Spam filtering",
      "Clustering"
    ],
    correctAnswer: 2,
    explanation: "Naive Bayes is particularly effective for text classification tasks like spam filtering due to its ability to handle high-dimensional data."
  },
  {
    id: 4,
    question: "What is the 'zero probability problem' in Naive Bayes?",
    options: [
      "When the algorithm fails to converge",
      "When a feature value never appears in a class",
      "When the prior probability is zero",
      "When the posterior probability is zero"
    ],
    correctAnswer: 1,
    explanation: "The zero probability problem occurs when a feature value in the test data was not present in the training data for a particular class, leading to a zero probability."
  },
  {
    id: 5,
    question: "Which of these is NOT a variant of Naive Bayes?",
    options: [
      "Gaussian Naive Bayes",
      "Multinomial Naive Bayes",
      "Bernoulli Naive Bayes",
      "Logistic Naive Bayes"
    ],
    correctAnswer: 3,
    explanation: "Logistic Naive Bayes is not a variant. The main variants are Gaussian (for continuous features), Multinomial (for discrete counts), and Bernoulli (for binary features)."
  }
];

export default function NaiveBayesQuiz() {
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

  return (
    <div className="bg-gray-800 rounded-xl shadow-xl p-6 mt-8">
      <h2 className="text-2xl font-semibold text-white mb-6">Test Your Knowledge</h2>
      
      <AnimatePresence mode="wait">
        {!quizCompleted ? (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-4">
              <span className="text-purple-400 text-sm">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <h3 className="text-xl text-white mt-2">
                {questions[currentQuestion].question}
              </h3>
            </div>

            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-gray-700/50 rounded-lg"
              >
                <p className="text-gray-300">
                  {questions[currentQuestion].explanation}
                </p>
                <button
                  onClick={handleNextQuestion}
                  className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
                >
                  {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                </button>
              </motion.div>
            )}

            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => !showExplanation && handleAnswerSelect(index)}
                  className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                    selectedAnswer === index
                      ? index === questions[currentQuestion].correctAnswer
                        ? 'bg-green-600/20 border-2 border-green-500'
                        : 'bg-red-600/20 border-2 border-red-500'
                      : 'bg-gray-700/50 hover:bg-gray-700 border-2 border-transparent'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={showExplanation}
                >
                  <span className="text-white">{option}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <h3 className="text-2xl font-semibold text-white mb-4">Quiz Completed!</h3>
            <p className="text-xl text-purple-400 mb-6">
              Your Score: {score} out of {questions.length}
            </p>
            <p className="text-gray-300 mb-8">
              {score === questions.length
                ? "Perfect score! You're a Naive Bayes expert! 🎉"
                : score >= questions.length * 0.7
                ? "Great job! You have a solid understanding of Naive Bayes! 🌟"
                : "Keep learning! Review the material and try again! 💪"}
            </p>
            <button
              onClick={handleRestartQuiz}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
            >
              Try Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 