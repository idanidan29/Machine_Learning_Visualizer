import React from 'react';

interface UseCase {
  title: string;
  items: string[];
}

interface WhenToUseProps {
  idealUseCases: UseCase;
  keyAdvantages: UseCase;
}

export default function WhenToUse({ idealUseCases, keyAdvantages }: WhenToUseProps) {
  return (
    <section id="when-to-use" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">When to Use</h2>
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-900/50 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-purple-400 mb-4">{idealUseCases.title}</h3>
            <ul className="space-y-3 text-gray-300">
              {idealUseCases.items.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-purple-400 mr-2">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-900/50 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-purple-400 mb-4">{keyAdvantages.title}</h3>
            <ul className="space-y-3 text-gray-300">
              {keyAdvantages.items.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-purple-400 mr-2">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
} 