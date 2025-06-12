import React from 'react';
import { Play, Clock, BookOpen, Target, Zap, Heart } from 'lucide-react';
import { Quiz } from '../types/quiz';

interface QuizSelectorProps {
  quizzes: Quiz[];
  onSelectQuiz: (quiz: Quiz) => void;
  darkMode: boolean;
}

export const QuizSelector: React.FC<QuizSelectorProps> = ({
  quizzes,
  onSelectQuiz,
  darkMode
}) => {
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'programming': return <Zap className="text-yellow-500" size={24} />;
      case 'web development': return <Target className="text-blue-500" size={24} />;
      case 'general': return <BookOpen className="text-green-500" size={24} />;
      default: return <BookOpen className="text-gray-500" size={24} />;
    }
  };

  const getDifficultyDistribution = (quiz: Quiz) => {
    const distribution = quiz.questions.reduce((acc, q) => {
      acc[q.difficulty] = (acc[q.difficulty] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return distribution;
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className={`
          text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
          bg-clip-text text-transparent animate-pulse
        `}>
          QuizzyLite
        </h1>
        
        <p className={`text-xl ${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>
          Test your knowledge with beautifully crafted quizzes
        </p>
      </div>

      {/* Quiz Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {quizzes.map((quiz) => {
          const difficultyDist = getDifficultyDistribution(quiz);
          
          return (
            <div
              key={quiz.id}
              className={`
                group p-6 rounded-3xl backdrop-blur-xl border transition-all duration-500
                ${darkMode 
                  ? 'bg-slate-900/80 border-slate-700/50 hover:bg-slate-800/90' 
                  : 'bg-white/80 border-white/20 hover:bg-white/90'
                }
                transform hover:scale-105 hover:shadow-2xl hover:-translate-y-2
                cursor-pointer shadow-xl
              `}
              onClick={() => onSelectQuiz(quiz)}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getCategoryIcon(quiz.category)}
                  <span className={`
                    px-3 py-1 rounded-full text-sm font-medium
                    ${darkMode ? 'bg-slate-800 text-slate-300' : 'bg-gray-100 text-gray-700'}
                  `}>
                    {quiz.category}
                  </span>
                </div>
                
                <div className={`
                  p-2 rounded-full transition-all duration-300 group-hover:scale-110
                  ${darkMode ? 'bg-slate-800' : 'bg-gray-100'}
                `}>
                  <Play size={16} className="text-blue-500" />
                </div>
              </div>

              {/* Title and Description */}
              <div className="mb-6">
                <h3 className={`
                  text-xl font-bold mb-2 group-hover:text-blue-500 transition-colors duration-300
                  ${darkMode ? 'text-white' : 'text-gray-800'}
                `}>
                  {quiz.title}
                </h3>
                
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                  {quiz.description}
                </p>
              </div>

              {/* Quiz Stats */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BookOpen size={16} className={darkMode ? 'text-slate-400' : 'text-gray-500'} />
                    <span className={`text-sm ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                      {quiz.questions.length} Questions
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Clock size={16} className={darkMode ? 'text-slate-400' : 'text-gray-500'} />
                    <span className={`text-sm ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                      {quiz.timePerQuestion}s each
                    </span>
                  </div>
                </div>

                {/* Difficulty Distribution */}
                <div className="flex items-center space-x-2">
                  <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                    Difficulty:
                  </span>
                  
                  <div className="flex space-x-1">
                    {difficultyDist.easy && (
                      <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                        {difficultyDist.easy} Easy
                      </span>
                    )}
                    {difficultyDist.medium && (
                      <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700">
                        {difficultyDist.medium} Medium
                      </span>
                    )}
                    {difficultyDist.hard && (
                      <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-700">
                        {difficultyDist.hard} Hard
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Start Button */}
              <button className={`
                w-full py-3 px-4 rounded-2xl font-semibold transition-all duration-300
                bg-gradient-to-r from-blue-500 to-purple-600 text-white
                transform group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-blue-500/30
                active:scale-95
              `}>
                Start Quiz
              </button>

              {/* Hover Glow Effect */}
              <div className={`
                absolute inset-0 rounded-3xl transition-opacity duration-500 opacity-0 group-hover:opacity-20
                bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-xl -z-10
              `} />
            </div>
          );
        })}
      </div>

      {/* Developer Credit */}
      <div className={`
        text-center p-8 rounded-3xl backdrop-blur-xl border transition-all duration-700 mb-8
        ${darkMode 
          ? 'bg-slate-900/60 border-slate-700/30' 
          : 'bg-white/60 border-white/30'
        }
        shadow-xl
      `}>
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className={`
            p-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 
            shadow-lg transform animate-pulse
          `}>
            <Heart className="text-white" size={20} fill="currentColor" />
          </div>
          <div className={`
            text-lg font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
            bg-clip-text text-transparent
          `}>
            Crafted with passion
          </div>
        </div>
        
        <div className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Developed by{' '}
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Siddhant Jadhav
          </span>
        </div>
        
        <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
          Beautiful, responsive quiz application with advanced animations
        </p>
      </div>

      {/* Footer */}
      <div className="text-center">
        <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
          Offline quiz app with beautiful design and smooth animations
        </p>
      </div>
    </div>
  );
};