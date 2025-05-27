'use client';

import React, { useState } from 'react';

interface Section {
  id: string;
  title: string;
  icon: string;
}

interface TableOfContentsProps {
  sections: Section[];
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function TableOfContents({ sections, activeSection, setActiveSection }: TableOfContentsProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Table of Contents Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed bottom-6 right-6 z-50 lg:hidden bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-colors duration-200"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Mobile Table of Contents Drawer */}
      <div
        className={`fixed inset-0 bg-gray-900/80 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div
          className={`fixed right-0 top-0 h-full w-64 bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 h-full flex flex-col">
            <h3 className="text-lg font-semibold text-white mb-4">Contents</h3>
            <nav className="space-y-2 overflow-y-auto flex-1 pr-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                    activeSection === section.id
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <span className="text-lg">{section.icon}</span>
                  <span className="font-medium">{section.title}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Desktop Table of Contents */}
      <div className="hidden lg:block fixed top-24 left-4 w-64">
        <div className="bg-gray-800 rounded-xl shadow-xl p-4 max-h-[calc(100vh-8rem)] flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-4">Contents</h3>
          <nav className="space-y-1 overflow-y-auto flex-1 pr-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                  activeSection === section.id
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <span className="text-lg">{section.icon}</span>
                <span className="font-medium">{section.title}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
} 