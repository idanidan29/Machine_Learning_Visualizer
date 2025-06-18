export interface Badge {
  id: string;
  badgeType: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  earnedAt: string;
  progress: number;
  requiredProgress: number;
  isCompleted: boolean;
}

export interface UserProgress {
  totalQuizzesCompleted: number;
  perfectScores: number;
  totalScore: number;
  totalQuestionsAnswered: number;
  algorithmQuizCounts: Record<string, number>;
  currentStreak: number;
  longestStreak: number;
  badges: Badge[];
}

export interface QuizCompletion {
  algorithmType: string;
  score: number;
  totalQuestions: number;
  isPerfectScore: boolean;
  streak: number;
}

export interface BadgeNotification {
  badge: Badge;
  show: boolean;
} 