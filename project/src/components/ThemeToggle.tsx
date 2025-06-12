import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  darkMode: boolean;
  toggleTheme: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ darkMode, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className={`
        relative p-3 rounded-2xl transition-all duration-500 ease-in-out transform hover:scale-110
        ${darkMode 
          ? 'bg-gradient-to-br from-slate-800 to-slate-900 text-yellow-400 shadow-lg shadow-slate-800/50' 
          : 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30'
        }
        hover:shadow-2xl active:scale-95
        backdrop-blur-sm border border-white/10
      `}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        <Sun 
          className={`absolute transition-all duration-500 transform ${
            darkMode ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
          }`}
          size={20}
        />
        <Moon 
          className={`absolute transition-all duration-500 transform ${
            darkMode ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
          }`}
          size={20}
        />
      </div>
      
      {/* Glow effect */}
      <div className={`
        absolute inset-0 rounded-2xl transition-opacity duration-500
        ${darkMode 
          ? 'opacity-75 bg-gradient-to-br from-yellow-400/20 to-orange-500/20' 
          : 'opacity-75 bg-gradient-to-br from-blue-400/20 to-purple-500/20'
        }
        blur-xl -z-10
      `} />
    </button>
  );
};