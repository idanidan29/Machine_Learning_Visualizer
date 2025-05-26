"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is the main purpose of K-means clustering?",
    options: [
      "To classify data into predefined categories",
      "To group similar data points into clusters",
      "To predict continuous values",
      "To reduce dimensionality of data"
    ],
    correctAnswer: 1,
    explanation: "K-means is an unsupervised learning algorithm that groups similar data points into clusters without predefined categories."
  },
  {
    id: 2,
    question: "What does 'K' represent in K-means?",
    options: [
      "The number of features in the dataset",
      "The number of clusters to form",
      "The number of iterations",
      "The number of data points"
    ],
    correctAnswer: 1,
    explanation: "K represents the number of clusters we want to form. It's a parameter that needs to be specified before running the algorithm."
  },
  {
    id: 3,
    question: "Which of these is NOT a step in the K-means algorithm?",
    options: [
      "Randomly initialize K centroids",
      "Assign points to nearest centroid",
      "Update centroids based on cluster means",
      "Calculate feature importance"
    ],
    correctAnswer: 3,
    explanation: "K-means doesn't calculate feature importance. The main steps are: initialize centroids, assign points, and update centroids."
  },
  {
    id: 4,
    question: "What is a limitation of K-means clustering?",
    options: [
      "It requires labeled data",
      "It can only work with numerical data",
      "It assumes spherical clusters",
      "It's computationally expensive"
    ],
    correctAnswer: 2,
    explanation: "K-means assumes that clusters are spherical and of similar size, which is a limitation when dealing with non-spherical clusters."
  },
  {
    id: 5,
    question: "How does K-means determine cluster membership?",
    options: [
      "By using a decision boundary",
      "By calculating the distance to centroids",
      "By using probability distributions",
      "By comparing feature importance"
    ],
    correctAnswer: 1,
    explanation: "K-means assigns each point to the cluster whose centroid is closest, using distance calculations (usually Euclidean distance)."
  }
]

export default function KMeansQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowExplanation(true)
    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setQuizCompleted(true)
    }
  }

  const handleRestartQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setScore(0)
    setQuizCompleted(false)
  }

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

            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-gray-700/50 rounded-lg"
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
                ? "Perfect score! You're a K-means expert! 🎉"
                : score >= questions.length * 0.7
                ? "Great job! You have a solid understanding of K-means! 🌟"
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
  )
} 