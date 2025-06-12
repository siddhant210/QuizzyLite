import React from 'react';
import { Trophy, Target, Clock, RotateCcw, CheckCircle2, XCircle, Award } from 'lucide-react';
import { QuizResult, Quiz } from '../types/quiz';

interface ResultsCardProps {
  result: QuizResult;
  quiz: Quiz;
  onRetry: () => void;
  onNewQuiz: () => void;
  darkMode: boolean;
}

export const ResultsCard: React.FC<ResultsCardProps> = ({
  result,
  quiz,
  onRetry,
  onNewQuiz,
  darkMode
}) => {
  const percentage = Math.round((result.totalScore / result.totalQuestions) * 100);
  const averageTimePerQuestion = Math.round(result.totalTimeSpent / result.totalQuestions);
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-500';
    if (score >= 60) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  const getPerformanceMessage = (score: number) => {
    if (score >= 90) return { message: "Outstanding! You're a true expert!", icon: <Award className="text-yellow-400" size={24} /> };
    if (score >= 80) return { message: "Excellent work! Keep it up!", icon: <Trophy className="text-yellow-500" size={24} /> };
    if (score >= 70) return { message: "Good job! You're on the right track!", icon: <Target className="text-blue-500" size={24} /> };
    if (score >= 60) return { message: "Not bad! Room for improvement.", icon: <CheckCircle2 className="text-green-500" size={24} /> };
    return { message: "Keep practicing! You'll get better!", icon: <RotateCcw className="text-orange-500" size={24} /> };
  };

  const performance = getPerformanceMessage(percentage);

  return (
    <div className={`
      w-full max-w-4xl mx-auto p-8 rounded-3xl backdrop-blur-xl border transition-all duration-700
      ${darkMode 
        ? 'bg-slate-900/80 border-slate-700/50 shadow-2xl shadow-slate-900/50' 
        : 'bg-white/80 border-white/20 shadow-2xl shadow-blue-500/10'
      }
      transform hover:scale-[1.01]
    `}>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className={`
            p-4 rounded-full bg-gradient-to-r ${getScoreColor(percentage)}
            shadow-lg transform animate-bounce
          `}>
            <Trophy className="text-white" size={32} />
          </div>
        </div>
        
        <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Quiz Complete!
        </h2>
        
        <p className={`text-lg ${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>
          {quiz.title}
        </p>
      </div>

      {/* Score Display */}
      <div className={`
        text-center mb-8 p-8 rounded-2xl border backdrop-blur-sm
        ${darkMode ? 'bg-slate-800/50 border-slate-700/50' : 'bg-gray-50/50 border-gray-200/50'}
      `}>
        <div className="flex justify-center items-center mb-4">
          <div className={`
            text-6xl font-bold bg-gradient-to-r ${getScoreColor(percentage)} 
            bg-clip-text text-transparent animate-pulse
          `}>
            {percentage}%
          </div>
        </div>
        
        <div className="flex items-center justify-center space-x-2 mb-2">
          {performance.icon}
          <span className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {performance.message}
          </span>
        </div>
        
        <p className={`text-lg ${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>
          {result.totalScore} out of {result.totalQuestions} questions correct
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className={`
          p-6 rounded-2xl text-center backdrop-blur-sm border
          ${darkMode ? 'bg-slate-800/30 border-slate-700/50' : 'bg-white/30 border-white/20'}
        `}>
          <Target className={`mx-auto mb-3 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} size={24} />
          <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {result.totalScore}/{result.totalQuestions}
          </div>
          <div className={`text-sm ${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>
            Correct Answers
          </div>
        </div>

        <div className={`
          p-6 rounded-2xl text-center backdrop-blur-sm border
          ${darkMode ? 'bg-slate-800/30 border-slate-700/50' : 'bg-white/30 border-white/20'}
        `}>
          <Clock className={`mx-auto mb-3 ${darkMode ? 'text-purple-400' : 'text-purple-500'}`} size={24} />
          <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {averageTimePerQuestion}s
          </div>
          <div className={`text-sm ${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>
            Avg. Time
          </div>
        </div>

        <div className={`
          p-6 rounded-2xl text-center backdrop-blur-sm border
          ${darkMode ? 'bg-slate-800/30 border-slate-700/50' : 'bg-white/30 border-white/20'}
        `}>
          <Trophy className={`mx-auto mb-3 ${darkMode ? 'text-yellow-400' : 'text-yellow-500'}`} size={24} />
          <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {percentage >= 80 ? 'A' : percentage >= 60 ? 'B' : 'C'}
          </div>
          <div className={`text-sm ${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>
            Grade
          </div>
        </div>
      </div>

      {/* Question Review */}
      <div className="mb-8">
        <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Question Review
        </h3>
        
        <div className="space-y-3">
          {result.attempts.map((attempt, index) => {
            const question = quiz.questions[index];
            return (
              <div
                key={index}
                className={`
                  p-4 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-[1.01]
                  ${attempt.isCorrect 
                    ? darkMode 
                      ? 'bg-green-900/20 border-green-700/50' 
                      : 'bg-green-50/50 border-green-200/50'
                    : darkMode 
                      ? 'bg-red-900/20 border-red-700/50' 
                      : 'bg-red-50/50 border-red-200/50'
                  }
                `}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {attempt.isCorrect ? (
                      <CheckCircle2 className="text-green-500" size={20} />
                    ) : (
                      <XCircle className="text-red-500" size={20} />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        Q{index + 1}: {question.question}
                      </p>
                      <span className={`text-sm px-2 py-1 rounded ${darkMode ? 'bg-slate-700 text-slate-300' : 'bg-gray-100 text-gray-600'}`}>
                        {attempt.timeSpent}s
                      </span>
                    </div>
                    
                    <div className="text-sm space-y-1">
                      {attempt.selectedAnswer !== null && attempt.selectedAnswer >= 0 && (
                        <p className={`${attempt.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                          Your answer: {question.options[attempt.selectedAnswer]}
                        </p>
                      )}
                      {attempt.selectedAnswer === null && (
                        <p className="text-red-600">No answer selected (time expired)</p>
                      )}
                      {!attempt.isCorrect && (
                        <p className="text-green-600">
                          Correct answer: {question.options[question.correctAnswer]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onRetry}
          className={`
            flex-1 flex items-center justify-center space-x-2 py-4 px-6 rounded-2xl font-semibold
            transition-all duration-300 transform hover:scale-105 active:scale-95
            bg-gradient-to-r from-blue-500 to-purple-600 text-white
            hover:shadow-lg hover:shadow-blue-500/30
          `}
        >
          <RotateCcw size={20} />
          <span>Retry Quiz</span>
        </button>
        
        <button
          onClick={onNewQuiz}
          className={`
            flex-1 flex items-center justify-center space-x-2 py-4 px-6 rounded-2xl font-semibold
            transition-all duration-300 transform hover:scale-105 active:scale-95
            ${darkMode 
              ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-600' 
              : 'bg-white hover:bg-gray-50 text-gray-800 border border-gray-200'
            }
            hover:shadow-lg
          `}
        >
          <Trophy size={20} />
          <span>Try Another Quiz</span>
        </button>
      </div>
    </div>
  );
};