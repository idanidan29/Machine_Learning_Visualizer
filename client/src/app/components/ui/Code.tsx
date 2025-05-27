import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CheckIcon, ClipboardIcon } from '@heroicons/react/24/outline';

interface CodeProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
}

const Code: React.FC<CodeProps> = ({
  code,
  language = 'typescript',
  showLineNumbers = true,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className={`relative group ${className}`}>
      {/* Copy button */}
      <button
        onClick={handleCopy}
        className="absolute right-2 top-2 p-2 rounded-md bg-gray-700/50 hover:bg-gray-600/50 
                 text-gray-300 hover:text-white transition-colors duration-200
                 opacity-0 group-hover:opacity-100 focus:opacity-100"
        title="Copy to clipboard"
      >
        {copied ? (
          <CheckIcon className="w-5 h-5 text-green-400" />
        ) : (
          <ClipboardIcon className="w-5 h-5" />
        )}
      </button>

      {/* Code block */}
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        showLineNumbers={showLineNumbers}
        customStyle={{
          margin: 0,
          borderRadius: '0.5rem',
          padding: '1rem',
          fontSize: '0.875rem',
          lineHeight: '1.5',
        }}
        lineNumberStyle={{
          minWidth: '2.5em',
          paddingRight: '1em',
          color: '#6b7280',
          userSelect: 'none',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default Code; 