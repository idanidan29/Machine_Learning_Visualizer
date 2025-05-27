'use client';

import React, { useState } from 'react';
import { Question } from '../data/quizzes/decisionTree';
import { quizData, AlgorithmType } from '../data/quizzes';

interface QuizProps {
  questions?: Question[];
  title?: string;
  algorithm?: AlgorithmType;
}

const Quiz: React.FC<QuizProps> = ({ questions: directQuestions, title: directTitle, algorithm }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Get questions and title either directly or from algorithm data
  const { questions, title } = algorithm 
    ? quizData[algorithm]
    : { questions: directQuestions || [], title: directTitle || 'Test Your Knowledge' };

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
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
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

export default Quiz; 