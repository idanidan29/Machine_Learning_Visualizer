'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { quizData, AlgorithmType } from '../data/quizzes';
import { Question } from '../data/quizzes/types';
import confetti from 'canvas-confetti';
import { Clock, Brain, Trophy, Target, Settings, Play, RotateCcw, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface QuizSettings {
  selectedTopics: AlgorithmType[];
  timeLimit: number; // in minutes, 0 means no limit
  questionCount: number;
}

interface QuizResult {
  question: Question;
  userAnswer: number;
  isCorrect: boolean;
  timeSpent: number;
}

const QuizPage: React.FC = () => {
  const [gameState, setGameState] = useState<'setup' | 'playing' | 'results'>('setup');
  const [settings, setSettings] = useState<QuizSettings>({
    selectedTopics: [],
    timeLimit: 0,
    questionCount: 10
  });
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [warningData, setWarningData] = useState<{ available: number; requested: number } | null>(null);
  const [showEndQuizConfirm, setShowEndQuizConfirm] = useState(false);

  // Timer effect
  useEffect(() => {
    if (gameState === 'playing' && settings.timeLimit > 0 && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameState, timeRemaining, settings.timeLimit]);

  const getAllTopics = (): { id: AlgorithmType; name: string; category: string }[] => {
    return [
      { id: 'linear-regression', name: 'Linear Regression', category: 'Regression' },
      { id: 'logistic-regression', name: 'Logistic Regression', category: 'Classification' },
      { id: 'decision-tree', name: 'Decision Trees', category: 'Classification' },
      { id: 'random-forest', name: 'Random Forest', category: 'Ensemble' },
      { id: 'naive-bayes', name: 'Naive Bayes', category: 'Classification' },
      { id: 'knn', name: 'K-Nearest Neighbors', category: 'Classification' },
      { id: 'k-means', name: 'K-Means Clustering', category: 'Clustering' },
      { id: 'dbscan', name: 'DBSCAN', category: 'Clustering' },
      { id: 'adaboost', name: 'AdaBoost', category: 'Ensemble' },
    ];
  };

  const getAvailableQuestionsCount = () => {
    if (settings.selectedTopics.length === 0) return 0;
    
    let totalQuestions = 0;
    settings.selectedTopics.forEach(topic => {
      totalQuestions += quizData[topic].questions.length;
    });
    return totalQuestions;
  };

  const generateQuestions = () => {
    if (settings.selectedTopics.length === 0) return [];
    
    let allQuestions: Question[] = [];
    settings.selectedTopics.forEach(topic => {
      allQuestions = [...allQuestions, ...quizData[topic].questions];
    });
    
    // Shuffle and select the requested number of questions
    const shuffled = allQuestions.sort(() => Math.random() - 0.5);
    
    // If "All Available" is selected, return all questions
    if (settings.questionCount >= allQuestions.length) {
      return shuffled;
    }
    
    return shuffled.slice(0, settings.questionCount);
  };

  const startQuiz = () => {
    const availableQuestions = getAvailableQuestionsCount();
    
    if (availableQuestions === 0) return;
    
    // If "All Available" is selected, update the question count to the available amount
    if (settings.questionCount >= availableQuestions) {
      setSettings(prev => ({ ...prev, questionCount: availableQuestions }));
    }
    
    // Check if requested questions exceed available questions
    if (settings.questionCount > availableQuestions) {
      setWarningData({ available: availableQuestions, requested: settings.questionCount });
      setShowWarning(true);
      return;
    }
    
    const questions = generateQuestions();
    if (questions.length === 0) return;
    
    setCurrentQuestions(questions);
    setCurrentQuestionIndex(0);
    setResults([]);
    setStreak(0);
    setMaxStreak(0);
    setTimeRemaining(settings.timeLimit * 60);
    setQuestionStartTime(Date.now());
    setGameState('playing');
  };

  const handleStartWithAvailableQuestions = () => {
    setShowWarning(false);
    setWarningData(null);
    
    // Update the question count to the available amount
    const availableQuestions = getAvailableQuestionsCount();
    setSettings(prev => ({ ...prev, questionCount: availableQuestions }));
    
    // Start the quiz with the updated settings
    const questions = generateQuestions();
    if (questions.length === 0) return;
    
    setCurrentQuestions(questions);
    setCurrentQuestionIndex(0);
    setResults([]);
    setStreak(0);
    setMaxStreak(0);
    setTimeRemaining(settings.timeLimit * 60);
    setQuestionStartTime(Date.now());
    setGameState('playing');
  };

  const handleCancelWarning = () => {
    setShowWarning(false);
    setWarningData(null);
  };

  const handleEndQuiz = () => {
    setShowEndQuizConfirm(true);
  };

  const confirmEndQuiz = () => {
    // If there's a current question that hasn't been answered, mark it as unanswered
    if (selectedAnswer === null && currentQuestionIndex < currentQuestions.length) {
      const question = currentQuestions[currentQuestionIndex];
      const result: QuizResult = {
        question,
        userAnswer: -1, // -1 indicates no answer (quiz ended early)
        isCorrect: false,
        timeSpent: (Date.now() - questionStartTime) / 1000
      };
      setResults(prev => [...prev, result]);
    }
    setShowEndQuizConfirm(false);
    setGameState('results');
  };

  const cancelEndQuiz = () => {
    setShowEndQuizConfirm(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    const question = currentQuestions[currentQuestionIndex];
    const isCorrect = answerIndex === question.correctAnswer;
    const timeSpent = (Date.now() - questionStartTime) / 1000;
    
    if (isCorrect) {
      setStreak(prev => prev + 1);
      setMaxStreak(prev => Math.max(prev, streak + 1));
      confetti({
        particleCount: 50,
        spread: 45,
        origin: { y: 0.7 }
      });
    } else {
      setStreak(0);
    }
    
    const result: QuizResult = {
      question,
      userAnswer: answerIndex,
      isCorrect,
      timeSpent
    };
    
    setResults(prev => [...prev, result]);
    setTimeout(() => setShowExplanation(true), 500);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setQuestionStartTime(Date.now());
    } else {
      setGameState('results');
    }
  };

  const handleTimeUp = () => {
    if (selectedAnswer === null) {
      const question = currentQuestions[currentQuestionIndex];
      const result: QuizResult = {
        question,
        userAnswer: -1, // -1 indicates no answer due to timeout
        isCorrect: false,
        timeSpent: settings.timeLimit * 60
      };
      setResults(prev => [...prev, result]);
    }
    setGameState('results');
  };

  const resetQuiz = () => {
    setGameState('setup');
    setCurrentQuestions([]);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setResults([]);
    setTimeRemaining(0);
    setStreak(0);
    setMaxStreak(0);
  };

  const toggleTopic = (topic: AlgorithmType) => {
    setSettings(prev => {
      const newSelectedTopics = prev.selectedTopics.includes(topic)
        ? prev.selectedTopics.filter(t => t !== topic)
        : [...prev.selectedTopics, topic];
      
      // If the question count was set to "All Available", update it to the new available count
      const availableQuestions = newSelectedTopics.reduce((total, t) => total + quizData[t].questions.length, 0);
      const newQuestionCount = prev.questionCount >= availableQuestions ? availableQuestions : prev.questionCount;
      
      return {
        ...prev,
        selectedTopics: newSelectedTopics,
        questionCount: newQuestionCount
      };
    });
  };

  const selectAllTopics = () => {
    const allTopics = getAllTopics().map(t => t.id);
    const availableQuestions = allTopics.reduce((total, t) => total + quizData[t].questions.length, 0);
    
    setSettings(prev => ({
      ...prev,
      selectedTopics: allTopics,
      questionCount: prev.questionCount >= availableQuestions ? availableQuestions : prev.questionCount
    }));
  };

  const clearAllTopics = () => {
    setSettings(prev => ({
      ...prev,
      selectedTopics: [],
      questionCount: 5 // Reset to default when no topics selected
    }));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-400';
    if (percentage >= 75) return 'text-blue-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (gameState === 'setup') {
    return (
      <div className="min-h-screen bg-gray-900 pt-20 px-2">
        <Navbar/>
        <div className="absolute top-0 left-0 -translate-x-[54%] -translate-y-[70%] w-2/5 rounded-full aspect-square bg-purple-600/70 backdrop-filter blur-3xl opacity-50" />
        <div className="absolute bottom-0 right-0 translate-x-[54%] translate-y-[70%] w-2/5 rounded-full aspect-square bg-purple-600/70 backdrop-filter blur-3xl opacity-50" />
        
        <div className="max-w-4xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Brain className="text-purple-400 w-8 h-8" />
              <h1 className="text-4xl font-bold text-white">ML Algorithm Quiz</h1>
            </div>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Test your knowledge of machine learning algorithms with our interactive quiz platform. 
              Choose your topics, set your preferences, and challenge yourself!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 shadow-xl border border-purple-500/20 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Settings className="text-purple-400 w-6 h-6" />
              <h2 className="text-2xl font-bold text-white">Quiz Settings</h2>
            </div>

            {/* Topic Selection */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <label className="text-lg font-medium text-white">Select Topics</label>
                <div className="flex gap-2">
                  <button
                    onClick={selectAllTopics}
                    className="text-purple-400 hover:text-purple-300 text-sm transition-colors"
                  >
                    Select All
                  </button>
                  <span className="text-gray-500">|</span>
                  <button
                    onClick={clearAllTopics}
                    className="text-purple-400 hover:text-purple-300 text-sm transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {getAllTopics().map(topic => (
                  <motion.button
                    key={topic.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleTopic(topic.id)}
                    className={`p-4 rounded-lg border transition-all duration-200 text-left ${
                      settings.selectedTopics.includes(topic.id)
                        ? 'bg-purple-600/20 border-purple-500/50 text-white'
                        : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <div className="font-medium">{topic.name}</div>
                    <div className="text-sm text-gray-400">{topic.category}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Quiz Configuration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-medium text-white mb-3">
                  Number of Questions
                </label>
                <select
                  value={settings.questionCount === getAvailableQuestionsCount() && getAvailableQuestionsCount() > 0 ? 'all' : settings.questionCount.toString()}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === 'all') {
                      setSettings(prev => ({ ...prev, questionCount: getAvailableQuestionsCount() }));
                    } else {
                      setSettings(prev => ({ ...prev, questionCount: parseInt(value) }));
                    }
                  }}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value={5}>5 Questions</option>
                  <option value={10}>10 Questions</option>
                  <option value={15}>15 Questions</option>
                  <option value={20}>20 Questions</option>
                  <option value={25}>25 Questions</option>
                  <option value="all">All Available ({getAvailableQuestionsCount()})</option>
                </select>
                {settings.selectedTopics.length > 0 && (
                  <div className="mt-2 text-sm text-gray-400">
                    Available questions: <span className="text-purple-400 font-medium">{getAvailableQuestionsCount()}</span>
                    {settings.questionCount > getAvailableQuestionsCount() && (
                      <span className="text-yellow-400 ml-2">⚠️ Not enough questions available</span>
                    )}
                    {settings.questionCount === getAvailableQuestionsCount() && getAvailableQuestionsCount() > 0 && (
                      <span className="text-green-400 ml-2">✓ All available questions selected</span>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-lg font-medium text-white mb-3">
                  Time Limit
                </label>
                <select
                  value={settings.timeLimit}
                  onChange={(e) => setSettings(prev => ({ ...prev, timeLimit: parseInt(e.target.value) }))}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value={0}>No Time Limit</option>
                  <option value={5}>5 Minutes</option>
                  <option value={10}>10 Minutes</option>
                  <option value={15}>15 Minutes</option>
                  <option value={20}>20 Minutes</option>
                  <option value={30}>30 Minutes</option>
                </select>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(147, 51, 234, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={startQuiz}
              disabled={settings.selectedTopics.length === 0}
              className="w-full mt-8 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-4 rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 font-medium text-lg shadow-lg shadow-purple-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              <Play className="w-5 h-5" />
              Start Quiz
            </motion.button>
          </motion.div>
        </div>

        {/* Warning Popup */}
        <AnimatePresence>
          {showWarning && warningData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 shadow-xl border border-yellow-500/30 max-w-md w-full"
              >
                <div className="flex items-center gap-3 mb-6">
                  <AlertTriangle className="text-yellow-400 w-8 h-8" />
                  <h3 className="text-2xl font-bold text-white">Not Enough Questions</h3>
                </div>
                
                <div className="text-gray-300 mb-6">
                  <p className="mb-4">
                    You requested <span className="text-yellow-400 font-semibold">{warningData.requested} questions</span>, 
                    but only <span className="text-yellow-400 font-semibold">{warningData.available} questions</span> are available 
                    for the selected topics.
                  </p>
                  <p>
                    Would you like to start the quiz with the available {warningData.available} questions?
                  </p>
                </div>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleStartWithAvailableQuestions}
                    className="flex-1 bg-gradient-to-r from-yellow-600 to-yellow-700 text-white px-6 py-3 rounded-lg hover:from-yellow-700 hover:to-yellow-800 transition-all duration-300 font-medium"
                  >
                    Start with {warningData.available} Questions
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCancelWarning}
                    className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-all duration-300 font-medium"
                  >
                    Cancel
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Footer />
      </div>
    );
  }

  if (gameState === 'playing') {
    const progress = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;
    const currentQuestion = currentQuestions[currentQuestionIndex];

    return (
      <div className="min-h-screen bg-gray-900 pt-20 px-2">
        <Navbar />
        <div className="absolute top-0 left-0 -translate-x-[54%] -translate-y-[70%] w-2/5 rounded-full aspect-square bg-purple-600/70 backdrop-filter blur-3xl opacity-50" />
        
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-center mb-8"
          >
            <div className="flex items-center gap-4">
              <Target className="text-purple-400 w-6 h-6" />
              <div>
                <h1 className="text-2xl font-bold text-white">Question {currentQuestionIndex + 1} of {currentQuestions.length}</h1>
                <div className="text-gray-400">
                  {streak > 1 && (
                    <span className="text-yellow-400">🔥 {streak}x Streak!</span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              {settings.timeLimit > 0 && (
                <div className="flex items-center gap-2">
                  <Clock className={`w-5 h-5 ${timeRemaining < 60 ? 'text-red-400' : 'text-purple-400'}`} />
                  <span className={`font-mono text-lg ${timeRemaining < 60 ? 'text-red-400' : 'text-white'}`}>
                    {formatTime(timeRemaining)}
                  </span>
                </div>
              )}
              <div className="text-purple-400 font-medium">
                Score: {results.filter(r => r.isCorrect).length}/{results.length}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEndQuiz}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-300 font-medium text-sm flex items-center gap-2"
              >
                <XCircle className="w-4 h-4" />
                End Quiz
              </motion.button>
            </div>
          </motion.div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-700 rounded-full h-3 mb-8 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="bg-gradient-to-r from-purple-600 to-purple-400 h-3 rounded-full transition-all duration-300"
            />
          </div>

          {/* Question */}
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 shadow-xl border border-purple-500/20"
          >
            <h2 className="text-xl text-white mb-8">{currentQuestion.question}</h2>

            <div className="space-y-4 mb-6">
              {currentQuestion.options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                    selectedAnswer === index
                      ? index === currentQuestion.correctAnswer
                        ? 'bg-gradient-to-r from-green-600 to-green-500 text-white'
                        : 'bg-gradient-to-r from-red-600 to-red-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="mr-3 text-lg font-medium">{['A', 'B', 'C', 'D'][index]}.</span>
                    {option}
                  </div>
                </motion.button>
              ))}
            </div>

            <AnimatePresence>
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-gray-600 pt-6"
                >
                  <div className={`p-4 rounded-lg ${
                    selectedAnswer === currentQuestion.correctAnswer
                      ? 'bg-green-900/30 border border-green-500/30'
                      : 'bg-red-900/30 border border-red-500/30'
                  }`}>
                    <div className="flex items-center mb-3">
                      {selectedAnswer === currentQuestion.correctAnswer ? (
                        <CheckCircle className="text-green-400 w-6 h-6 mr-2" />
                      ) : (
                        <XCircle className="text-red-400 w-6 h-6 mr-2" />
                      )}
                      <h4 className="text-lg font-medium text-white">
                        {selectedAnswer === currentQuestion.correctAnswer ? 'Correct!' : 'Not quite right'}
                      </h4>
                    </div>
                    <p className="text-gray-300 mb-4">{currentQuestion.explanation}</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={nextQuestion}
                      className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300"
                    >
                      {currentQuestionIndex < currentQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* End Quiz Confirmation Dialog */}
        <AnimatePresence>
          {showEndQuizConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 shadow-xl border border-red-500/30 max-w-md w-full"
              >
                <div className="flex items-center gap-3 mb-6">
                  <XCircle className="text-red-400 w-8 h-8" />
                  <h3 className="text-2xl font-bold text-white">End Quiz Early?</h3>
                </div>
                
                <div className="text-gray-300 mb-6">
                  <p className="mb-4">
                    Are you sure you want to end the quiz early? 
                    Your current progress will be saved and you&apos;ll see your results.
                  </p>
                  <p className="text-sm text-gray-400">
                    Current progress: {currentQuestionIndex + 1} of {currentQuestions.length} questions
                  </p>
                </div>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={confirmEndQuiz}
                    className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 font-medium"
                  >
                    End Quiz
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={cancelEndQuiz}
                    className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-all duration-300 font-medium"
                  >
                    Continue Quiz
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Footer />
      </div>
    );
  }

  if (gameState === 'results') {
    const correctAnswers = results.filter(r => r.isCorrect).length;
    const totalQuestions = results.length;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    const averageTime = results.length > 0 ? results.reduce((sum, r) => sum + r.timeSpent, 0) / results.length : 0;

    return (
      <div className="min-h-screen bg-gray-900 pt-20">
        <div className="absolute top-0 left-0 -translate-x-[54%] -translate-y-[70%] w-2/5 rounded-full aspect-square bg-purple-600/70 backdrop-filter blur-3xl opacity-50" />
        <div className="absolute bottom-0 right-0 translate-x-[54%] translate-y-[70%] w-2/5 rounded-full aspect-square bg-purple-600/70 backdrop-filter blur-3xl opacity-50" />
        
        <div className="max-w-4xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="text-8xl mb-6"
            >
              {percentage === 100 ? '🏆' : percentage >= 75 ? '🎯' : percentage >= 50 ? '📚' : '💪'}
            </motion.div>
            
            <h1 className="text-4xl font-bold text-white mb-4">Quiz Complete!</h1>
            <div className={`text-6xl font-bold mb-4 ${getScoreColor(percentage)}`}>
              {correctAnswers}/{totalQuestions}
            </div>
            <div className="text-2xl text-gray-300 mb-8">
              {percentage === 100 
                ? "Perfect! You're an ML master! 🌟" 
                : percentage >= 75 
                  ? "Excellent work! Keep it up! 💪" 
                  : percentage >= 50
                    ? "Good effort! Keep learning! 📚"
                    : "Keep practicing, you've got this! 🚀"}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-purple-500/20">
              <Trophy className="text-yellow-400 w-8 h-8 mx-auto mb-3" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{percentage}%</div>
                <div className="text-gray-400">Accuracy</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-purple-500/20">
              <Target className="text-purple-400 w-8 h-8 mx-auto mb-3" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{maxStreak}</div>
                <div className="text-gray-400">Best Streak</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-purple-500/20">
              <Clock className="text-blue-400 w-8 h-8 mx-auto mb-3" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{averageTime.toFixed(1)}s</div>
                <div className="text-gray-400">Avg Time</div>
              </div>
            </div>
          </motion.div>

          {/* Detailed Results */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 shadow-xl border border-purple-500/20 mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Detailed Results</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {results.map((result, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    result.isCorrect 
                      ? 'bg-green-900/20 border-green-500/30' 
                      : 'bg-red-900/20 border-red-500/30'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {result.isCorrect ? (
                          <CheckCircle className="text-green-400 w-5 h-5" />
                        ) : (
                          <XCircle className="text-red-400 w-5 h-5" />
                        )}
                        <span className="text-white font-medium">Question {index + 1}</span>
                        <span className="text-gray-400 text-sm">({result.timeSpent.toFixed(1)}s)</span>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">{result.question.question}</p>
                      {result.userAnswer === -1 ? (
                        <p className="text-yellow-400 text-sm">
                          {settings.timeLimit > 0 && timeRemaining === 0 
                            ? "Time ran out - no answer provided" 
                            : "Question skipped - quiz ended early"}
                        </p>
                      ) : (
                        <>
                          <p className="text-gray-400 text-sm">
                            Your answer: {result.question.options[result.userAnswer]}
                          </p>
                          {!result.isCorrect && (
                            <p className="text-green-400 text-sm">
                              Correct answer: {result.question.options[result.question.correctAnswer]}
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetQuiz}
              className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-3 rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 flex items-center gap-3"
            >
              <RotateCcw className="w-5 h-5" />
              Take Another Quiz
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  return null;
};

export default QuizPage; 