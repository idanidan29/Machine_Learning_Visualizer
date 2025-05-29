'use client';

import React, { useState } from 'react';
import { Question } from '../data/quizzes/decisionTree';
import { quizData, AlgorithmType } from '../data/quizzes';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface QuizProps {
  questions?: Question[];
  title?: string;
  algorithm?: AlgorithmType;
}

// Create properly typed motion components
const MotionDiv = motion('div');
const MotionH2 = motion('h2');
const MotionH3 = motion('h3');
const MotionButton = motion('button');
const MotionSpan = motion('span');

const Quiz: React.FC<QuizProps> = ({ questions: directQuestions, title: directTitle, algorithm }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [streak, setStreak] = useState(0);

  // Get questions and title either directly or from algorithm data
  const { questions, title } = algorithm 
    ? quizData[algorithm]
    : { questions: directQuestions || [], title: directTitle || 'Test Your Knowledge' };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + 1);
      setStreak(streak + 1);
      triggerConfetti();
    } else {
      setStreak(0);
    }
    
    setTimeout(() => setShowExplanation(true), 500);
  };

  const handleNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setIsCorrect(null);
    if (currentQuestion === questions.length - 1) {
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizCompleted(false);
    setIsCorrect(null);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (quizCompleted) {
    return (
      <MotionDiv 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 shadow-xl border border-purple-500/20">
          <MotionDiv
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="text-6xl mb-4"
          >
            {score === questions.length ? '🏆' : score > questions.length / 2 ? '🎯' : '📚'}
          </MotionDiv>
          <MotionH2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-white mb-4"
          >
            Quiz Completed!
          </MotionH2>
          <MotionDiv
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-6"
          >
            <div className="text-4xl font-bold text-purple-400 mb-2">{score}/{questions.length}</div>
            <div className="text-gray-300 text-lg">
              {score === questions.length 
                ? "Perfect score! You're a master! 🌟" 
                : score > questions.length / 2 
                  ? "Great job! Keep learning! 💪" 
                  : "Keep practicing, you'll get better! 📚"}
            </div>
          </MotionDiv>
          <MotionButton
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(147, 51, 234, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRestartQuiz}
            className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-3 rounded-full hover:from-purple-700 hover:to-purple-800 transition-all duration-300 text-lg font-medium shadow-lg shadow-purple-600/20"
          >
            Try Again
          </MotionButton>
        </div>
      </MotionDiv>
    );
  }

  return (
    <MotionDiv 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center mb-6">
        <MotionH2 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-2xl font-bold text-white"
        >
          {title}
        </MotionH2>
        <MotionDiv 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-4"
        >
          {streak > 1 && (
            <div className="text-yellow-400 font-medium flex items-center">
              🔥 {streak}x Streak!
            </div>
          )}
          <div className="text-purple-400 font-medium">
            Score: {score}/{currentQuestion + 1}
          </div>
        </MotionDiv>
      </div>

      {/* Enhanced Progress bar */}
      <div className="w-full bg-gray-700 rounded-full h-3 mb-6 overflow-hidden">
        <MotionDiv
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="bg-gradient-to-r from-purple-600 to-purple-400 h-3 rounded-full transition-all duration-300 relative"
        >
          <MotionDiv
            animate={{
              x: ["0%", "100%"],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
        </MotionDiv>
      </div>

      <MotionDiv 
        key={currentQuestion}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-xl border border-purple-500/20"
      >
        <div className="mb-4 flex justify-between items-center">
          <span className="text-gray-400">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-sm text-purple-400">
            {Math.round((currentQuestion + 1) / questions.length * 100)}% Complete
          </span>
        </div>

        <MotionH3 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-xl text-white mb-6"
        >
          {questions[currentQuestion].question}
        </MotionH3>

        <div className="space-y-4">
          {questions[currentQuestion].options.map((option, index) => (
            <MotionButton
              key={index}
              whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(147, 51, 234, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAnswerSelect(index)}
              disabled={selectedAnswer !== null}
              className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                selectedAnswer === index
                  ? index === questions[currentQuestion].correctAnswer
                    ? 'bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg shadow-green-600/20'
                    : 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-600/20'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <div className="flex items-center">
                <span className="mr-3 text-lg font-medium">{['A', 'B', 'C', 'D'][index]}.</span>
                {option}
              </div>
            </MotionButton>
          ))}
        </div>

        <AnimatePresence>
          {showExplanation && (
            <MotionDiv
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6"
            >
              <div className={`p-4 rounded-lg ${
                isCorrect 
                  ? 'bg-gradient-to-r from-green-900/30 to-green-800/30 border border-green-500/30' 
                  : 'bg-gradient-to-r from-red-900/30 to-red-800/30 border border-red-500/30'
              }`}>
                <div className="flex items-center mb-3">
                  <MotionSpan 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-2xl mr-2"
                  >
                    {isCorrect ? '✅' : '❌'}
                  </MotionSpan>
                  <h4 className="text-lg font-medium text-white">
                    {isCorrect ? 'Correct!' : 'Not quite right'}
                  </h4>
                </div>
                <p className="text-gray-300">{questions[currentQuestion].explanation}</p>
                <MotionButton
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(147, 51, 234, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextQuestion}
                  className="mt-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-2 rounded-full hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-lg shadow-purple-600/20"
                >
                  {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                </MotionButton>
              </div>
            </MotionDiv>
          )}
        </AnimatePresence>
      </MotionDiv>
    </MotionDiv>
  );
};

export default Quiz; 