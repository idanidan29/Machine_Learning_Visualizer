import React from 'react';

interface PageHeaderProps {
  title: string;
  description: string;
  quizSectionId?: string;
  onQuizClick?: () => void;
}

export default function PageHeader({ 
  title, 
  description, 
  quizSectionId = 'quiz',
  onQuizClick 
}: PageHeaderProps) {
  const handleQuizClick = () => {
    if (onQuizClick) {
      onQuizClick();
    } else {
      const section = document.getElementById(quizSectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="text-center mb-8 transition-all duration-1000 ease-out transform opacity-100 translate-y-0">
      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
        {title}
      </h1>
      <p className="text-gray-300 max-w-2xl mx-auto mb-6 px-4">
        {description}
      </p>
      <button
        onClick={handleQuizClick}
        className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors duration-200 shadow-lg shadow-purple-600/20 hover:shadow-purple-600/30"
      >
        Test Your Knowledge
        <svg
          className="ml-2 w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </button>
    </div>
  );
} 