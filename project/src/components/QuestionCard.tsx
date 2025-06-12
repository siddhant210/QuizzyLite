import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { Question } from '../types/quiz';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  timePerQuestion: number;
  onAnswer: (selectedAnswer: number, timeSpent: number) => void;
  darkMode: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  timePerQuestion,
  onAnswer,
  darkMode
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(timePerQuestion);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    if (timeRemaining > 0 && !isAnswered) {
      const timer = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && !isAnswered) {
      handleAnswer(null);
    }
  }, [timeRemaining, isAnswered]);

  const handleAnswer = (answer: number | null) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answer);
    setIsAnswered(true);
    const timeSpent = timePerQuestion - timeRemaining;
    
    // Delay before calling onAnswer to show selection
    setTimeout(() => {
      onAnswer(answer ?? -1, timeSpent);
    }, 1500);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'from-green-500 to-emerald-500';
      case 'medium': return 'from-yellow-500 to-orange-500';
      case 'hard': return 'from-red-500 to-pink-500';
      default: return 'from-blue-500 to-purple-500';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return <CheckCircle2 size={16} />;
      case 'medium': return <AlertCircle size={16} />;
      case 'hard': return <XCircle size={16} />;
      default: return <AlertCircle size={16} />;
    }
  };

  const progress = ((timePerQuestion - timeRemaining) / timePerQuestion) * 100;
  const progressColor = timeRemaining <= 5 ? 'from-red-500 to-red-600' : 'from-blue-500 to-purple-600';

  return (
    <div className={`
      w-full max-w-4xl mx-auto p-8 rounded-3xl backdrop-blur-xl border transition-all duration-700
      ${darkMode 
        ? 'bg-slate-900/80 border-slate-700/50 shadow-2xl shadow-slate-900/50' 
        : 'bg-white/80 border-white/20 shadow-2xl shadow-blue-500/10'
      }
      transform hover:scale-[1.02] hover:shadow-3xl
    `}>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <span className={`
            px-4 py-2 rounded-full text-sm font-semibold
            ${darkMode ? 'bg-slate-800 text-slate-300' : 'bg-gray-100 text-gray-700'}
          `}>
            Question {questionNumber} of {totalQuestions}
          </span>
          
          <div className={`
            flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium
            bg-gradient-to-r ${getDifficultyColor(question.difficulty)} text-white
          `}>
            {getDifficultyIcon(question.difficulty)}
            <span className="capitalize">{question.difficulty}</span>
          </div>
        </div>

        <div className={`
          flex items-center space-x-3 px-4 py-2 rounded-2xl
          ${darkMode ? 'bg-slate-800/50' : 'bg-gray-50/50'}
          ${timeRemaining <= 5 ? 'animate-pulse' : ''}
        `}>
          <Clock size={20} className={timeRemaining <= 5 ? 'text-red-500' : 'text-blue-500'} />
          <span className={`font-mono text-lg font-bold ${timeRemaining <= 5 ? 'text-red-500' : ''}`}>
            {timeRemaining}s
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className={`
        w-full h-2 rounded-full mb-8 overflow-hidden
        ${darkMode ? 'bg-slate-800' : 'bg-gray-200'}
      `}>
        <div 
          className={`h-full bg-gradient-to-r ${progressColor} transition-all duration-1000 ease-out rounded-full`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question */}
      <div className="mb-8">
        <h2 className={`
          text-2xl md:text-3xl font-bold leading-relaxed
          ${darkMode ? 'text-white' : 'text-gray-800'}
        `}>
          {question.question}
        </h2>
      </div>

      {/* Options */}
      <div className="space-y-4">
        {question.options.map((option, index) => {
          let buttonStyle = '';
          
          if (isAnswered) {
            if (index === question.correctAnswer) {
              buttonStyle = 'bg-gradient-to-r from-green-500 to-emerald-500 text-white transform scale-105 shadow-lg shadow-green-500/30';
            } else if (index === selectedAnswer && index !== question.correctAnswer) {
              buttonStyle = 'bg-gradient-to-r from-red-500 to-red-600 text-white transform scale-105 shadow-lg shadow-red-500/30';
            } else {
              buttonStyle = darkMode 
                ? 'bg-slate-800/50 text-slate-400 border-slate-700' 
                : 'bg-gray-100/50 text-gray-500 border-gray-300';
            }
          } else {
            buttonStyle = darkMode
              ? 'bg-slate-800/30 hover:bg-slate-700/50 text-white border-slate-600 hover:border-slate-500'
              : 'bg-white/50 hover:bg-white/80 text-gray-800 border-gray-200 hover:border-gray-300';
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={isAnswered}
              className={`
                w-full p-6 rounded-2xl border-2 text-left font-medium transition-all duration-300
                ${buttonStyle}
                ${!isAnswered ? 'hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]' : ''}
                backdrop-blur-sm
              `}
            >
              <div className="flex items-center">
                <span className={`
                  w-8 h-8 rounded-full flex items-center justify-center mr-4 text-sm font-bold
                  ${isAnswered && index === question.correctAnswer 
                    ? 'bg-white/20' 
                    : isAnswered && index === selectedAnswer && index !== question.correctAnswer
                    ? 'bg-white/20'
                    : darkMode ? 'bg-slate-700' : 'bg-gray-200'
                  }
                `}>
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="text-lg">{option}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {isAnswered && question.explanation && (
        <div className={`
          mt-6 p-6 rounded-2xl border backdrop-blur-sm transform animate-in slide-in-from-bottom-4 duration-500
          ${darkMode 
            ? 'bg-slate-800/50 border-slate-700/50 text-slate-300' 
            : 'bg-blue-50/50 border-blue-200/50 text-gray-700'
          }
        `}>
          <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Explanation:
          </h4>
          <p className="leading-relaxed">{question.explanation}</p>
        </div>
      )}
    </div>
  );
};