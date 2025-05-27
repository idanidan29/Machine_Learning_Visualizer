import { Question } from './decisionTree';
import { decisionTreeQuestions } from './decisionTree';
import { naiveBayesQuestions } from './naiveBayes';
import { kMeansQuestions } from './kMeans';

export type AlgorithmType = 'decision-tree' | 'naive-bayes' | 'k-means';

export const quizData: Record<AlgorithmType, {
  questions: Question[];
  title: string;
}> = {
  'decision-tree': {
    questions: decisionTreeQuestions,
    title: 'Decision Tree Quiz'
  },
  'naive-bayes': {
    questions: naiveBayesQuestions,
    title: 'Naive Bayes Quiz'
  },
  'k-means': {
    questions: kMeansQuestions,
    title: 'K-Means Clustering Quiz'
  }
}; 