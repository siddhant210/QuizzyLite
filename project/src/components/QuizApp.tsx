import React, { useState, useCallback } from 'react';
import { QuizSelector } from './QuizSelector';
import { QuestionCard } from './QuestionCard';
import { ResultsCard } from './ResultsCard';
import { ThemeToggle } from './ThemeToggle';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { quizData } from '../data/quizData';
import { Quiz, QuizAttempt, QuizResult } from '../types/quiz';

type GameState = 'selection' | 'playing' | 'results';

export const QuizApp: React.FC = () => {
  const [darkMode, setDarkMode] = useLocalStorage('quizzy-dark-mode', false);
  const [gameState, setGameState] = useState<GameState>('selection');
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const toggleTheme = useCallback(() => {
    setDarkMode(prev => !prev);
  }, [setDarkMode]);

  const selectQuiz = useCallback((quiz: Quiz) => {
    setCurrentQuiz(quiz);
    setCurrentQuestionIndex(0);
    setAttempts([]);
    setQuizResult(null);
    setGameState('playing');
  }, []);

  const handleAnswer = useCallback((selectedAnswer: number, timeSpent: number) => {
    if (!currentQuiz) return;

    const currentQuestion = currentQuiz.questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    const attempt: QuizAttempt = {
      questionId: currentQuestion.id,
      selectedAnswer: selectedAnswer >= 0 ? selectedAnswer : null,
      isCorrect,
      timeSpent
    };

    const newAttempts = [...attempts, attempt];
    setAttempts(newAttempts);

    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Quiz completed
      const totalScore = newAttempts.filter(a => a.isCorrect).length;
      const totalTimeSpent = newAttempts.reduce((sum, a) => sum + a.timeSpent, 0);

      const result: QuizResult = {
        quizId: currentQuiz.id,
        attempts: newAttempts,
        totalScore,
        totalQuestions: currentQuiz.questions.length,
        completedAt: new Date(),
        totalTimeSpent
      };

      setQuizResult(result);
      setGameState('results');
    }
  }, [currentQuiz, currentQuestionIndex, attempts]);

  const retryQuiz = useCallback(() => {
    if (currentQuiz) {
      selectQuiz(currentQuiz);
    }
  }, [currentQuiz, selectQuiz]);

  const selectNewQuiz = useCallback(() => {
    setGameState('selection');
    setCurrentQuiz(null);
    setCurrentQuestionIndex(0);
    setAttempts([]);
    setQuizResult(null);
  }, []);

  const backgroundClass = darkMode
    ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
    : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50';

  return (
    <div className={`min-h-screen transition-all duration-700 ${backgroundClass} relative overflow-hidden`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`
          absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 blur-3xl
          ${darkMode ? 'bg-blue-500' : 'bg-purple-300'}
          animate-pulse
        `} />
        <div className={`
          absolute -bottom-32 -left-32 w-64 h-64 rounded-full opacity-20 blur-3xl
          ${darkMode ? 'bg-purple-500' : 'bg-blue-300'}
          animate-pulse
        `} style={{ animationDelay: '1s' }} />
        <div className={`
          absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl
          ${darkMode ? 'bg-pink-500' : 'bg-indigo-300'}
          animate-pulse
        `} style={{ animationDelay: '2s' }} />
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {gameState === 'selection' && (
          <QuizSelector
            quizzes={quizData}
            onSelectQuiz={selectQuiz}
            darkMode={darkMode}
          />
        )}

        {gameState === 'playing' && currentQuiz && (
          <div className="flex justify-center items-center min-h-screen">
            <QuestionCard
              question={currentQuiz.questions[currentQuestionIndex]}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={currentQuiz.questions.length}
              timePerQuestion={currentQuiz.timePerQuestion}
              onAnswer={handleAnswer}
              darkMode={darkMode}
            />
          </div>
        )}

        {gameState === 'results' && quizResult && currentQuiz && (
          <div className="flex justify-center items-center min-h-screen">
            <ResultsCard
              result={quizResult}
              quiz={currentQuiz}
              onRetry={retryQuiz}
              onNewQuiz={selectNewQuiz}
              darkMode={darkMode}
            />
          </div>
        )}
      </div>
    </div>
  );
};