import React from 'react';

interface FormulaProps {
  title: string;
  formula: string;
  variables: {
    name: string;
    description: string;
  }[];
  gradient?: 'purple-blue' | 'blue-purple';
}

const Formula: React.FC<FormulaProps> = ({ title, formula, variables, gradient = 'purple-blue' }) => {
  const gradientClass = gradient === 'purple-blue' 
    ? 'from-purple-900/30 to-blue-900/30' 
    : 'from-blue-900/30 to-purple-900/30';

  return (
    <div className={`bg-gradient-to-r ${gradientClass} p-6 rounded-xl`}>
      <h3 className="text-lg font-medium text-purple-400 mb-4">{title}</h3>
      <div className="flex justify-center items-center">
        <div className="text-white text-lg sm:text-xl font-mono bg-gray-900/50 p-4 rounded-lg">
          {formula}
        </div>
      </div>
      <p className="text-gray-300 text-sm sm:text-base mt-4">
        Where:
      </p>
      <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm sm:text-base ml-4">
        {variables.map((variable, index) => (
          <li key={index}>{variable.name} is {variable.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default Formula; 