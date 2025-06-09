import React from 'react';

interface FeatureCardProps {
  emoji: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ emoji, title, description }) => {
  return (
    <div className="group relative h-[200px]">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
      <div className="relative bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-purple-500/50 transition-all duration-300 h-full flex flex-col">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl transform group-hover:scale-110 transition-transform duration-300">{emoji}</span>
          <h3 className="text-white font-medium text-lg">{title}</h3>
        </div>
        <p className="text-sm text-gray-400 leading-relaxed flex-grow">{description}</p>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
      </div>
    </div>
  );
};

export default FeatureCard; 