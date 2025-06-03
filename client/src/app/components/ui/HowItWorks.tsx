import React from 'react';

interface Step {
  number: number;
  description: string;
}

interface HowItWorksProps {
  title?: string;
  steps: Step[];
}

export default function HowItWorks({ title = "How It Works", steps }: HowItWorksProps) {
  return (
    <section id="how-it-works" className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">{title}</h2>
      <div className="space-y-6">
        <div className="bg-gray-900/50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-purple-400 mb-4">The Process</h3>
          <ol className="space-y-4 text-gray-300">
            {steps.map((step) => (
              <li key={step.number} className="flex items-start">
                <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                  {step.number}
                </span>
                <span>{step.description}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
} 