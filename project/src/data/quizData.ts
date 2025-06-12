import { Quiz } from '../types/quiz';

export const quizData: Quiz[] = [
  {
    id: 'javascript-fundamentals',
    title: 'JavaScript Fundamentals',
    description: 'Test your knowledge of core JavaScript concepts',
    category: 'Programming',
    timePerQuestion: 30,
    questions: [
      {
        id: 1,
        question: 'Which of the following is NOT a JavaScript data type?',
        options: ['String', 'Boolean', 'Float', 'Undefined'],
        correctAnswer: 2,
        difficulty: 'easy',
        explanation: 'JavaScript has Number type (which includes integers and floats), but not a separate Float type.'
      },
      {
        id: 2,
        question: 'What does the "this" keyword refer to in JavaScript?',
        options: ['The global object', 'The current function', 'The object that owns the method', 'The parent object'],
        correctAnswer: 2,
        difficulty: 'medium',
        explanation: 'The "this" keyword refers to the object that is currently executing the function or method.'
      },
      {
        id: 3,
        question: 'Which method is used to add an element to the end of an array?',
        options: ['push()', 'pop()', 'shift()', 'unshift()'],
        correctAnswer: 0,
        difficulty: 'easy',
        explanation: 'The push() method adds one or more elements to the end of an array and returns the new length.'
      },
      {
        id: 4,
        question: 'What is the difference between "==" and "===" operators?',
        options: ['No difference', '"==" checks type, "===" checks value', '"==" checks value, "===" checks type and value', 'Both check type and value'],
        correctAnswer: 2,
        difficulty: 'medium',
        explanation: '"==" performs type coercion and compares values, while "===" compares both type and value without coercion.'
      },
      {
        id: 5,
        question: 'Which of the following is a closure in JavaScript?',
        options: ['A function that calls itself', 'A function with access to outer scope variables', 'A function without parameters', 'A function that returns nothing'],
        correctAnswer: 1,
        difficulty: 'hard',
        explanation: 'A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has returned.'
      }
    ]
  },
  {
    id: 'react-basics',
    title: 'React Fundamentals',
    description: 'Essential React concepts and patterns',
    category: 'Web Development',
    timePerQuestion: 25,
    questions: [
      {
        id: 6,
        question: 'What is JSX in React?',
        options: ['A new JavaScript framework', 'A syntax extension for JavaScript', 'A CSS preprocessor', 'A testing library'],
        correctAnswer: 1,
        difficulty: 'easy',
        explanation: 'JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files.'
      },
      {
        id: 7,
        question: 'Which hook is used to manage state in functional components?',
        options: ['useEffect', 'useState', 'useContext', 'useReducer'],
        correctAnswer: 1,
        difficulty: 'easy',
        explanation: 'useState is the React hook used to add state to functional components.'
      },
      {
        id: 8,
        question: 'When does useEffect run by default?',
        options: ['Only on mount', 'Only on unmount', 'After every render', 'Before every render'],
        correctAnswer: 2,
        difficulty: 'medium',
        explanation: 'useEffect runs after every completed render by default, both after the initial render and after every update.'
      },
      {
        id: 9,
        question: 'What is the purpose of React keys?',
        options: ['To encrypt data', 'To help React identify which items have changed', 'To style components', 'To handle events'],
        correctAnswer: 1,
        difficulty: 'medium',
        explanation: 'Keys help React identify which items have changed, are added, or are removed, enabling efficient re-rendering.'
      },
      {
        id: 10,
        question: 'What is prop drilling in React?',
        options: ['Creating holes in components', 'Passing props through multiple component layers', 'Drilling props into the DOM', 'A React debugging technique'],
        correctAnswer: 1,
        difficulty: 'hard',
        explanation: 'Prop drilling refers to the process of passing data through multiple component layers to reach a deeply nested component.'
      }
    ]
  },
  {
    id: 'general-knowledge',
    title: 'General Knowledge',
    description: 'Test your general knowledge across various topics',
    category: 'General',
    timePerQuestion: 20,
    questions: [
      {
        id: 11,
        question: 'Which planet is known as the Red Planet?',
        options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
        correctAnswer: 1,
        difficulty: 'easy',
        explanation: 'Mars is called the Red Planet due to iron oxide (rust) on its surface, giving it a reddish appearance.'
      },
      {
        id: 12,
        question: 'What is the capital of Australia?',
        options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'],
        correctAnswer: 2,
        difficulty: 'medium',
        explanation: 'Canberra is the capital city of Australia, located in the Australian Capital Territory.'
      },
      {
        id: 13,
        question: 'Who painted the Mona Lisa?',
        options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Michelangelo'],
        correctAnswer: 2,
        difficulty: 'easy',
        explanation: 'The Mona Lisa was painted by Leonardo da Vinci between 1503 and 1519.'
      },
      {
        id: 14,
        question: 'What is the largest ocean on Earth?',
        options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
        correctAnswer: 3,
        difficulty: 'easy',
        explanation: 'The Pacific Ocean is the largest ocean, covering about one-third of the Earth\'s surface.'
      },
      {
        id: 15,
        question: 'In which year did World War II end?',
        options: ['1944', '1945', '1946', '1947'],
        correctAnswer: 1,
        difficulty: 'medium',
        explanation: 'World War II ended in 1945 with the surrender of Japan in September.'
      }
    ]
  }
];