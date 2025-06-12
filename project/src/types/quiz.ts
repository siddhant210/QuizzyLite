export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  timePerQuestion: number; // in seconds
  category: string;
}

export interface QuizAttempt {
  questionId: number;
  selectedAnswer: number | null;
  isCorrect: boolean;
  timeSpent: number;
}

export interface QuizResult {
  quizId: string;
  attempts: QuizAttempt[];
  totalScore: number;
  totalQuestions: number;
  completedAt: Date;
  totalTimeSpent: number;
}