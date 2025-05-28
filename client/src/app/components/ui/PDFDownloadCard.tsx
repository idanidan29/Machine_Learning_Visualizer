import React from 'react';

interface PDFDownloadCardProps {
  title: string;
  description: string;
  pdfPath: string;
  className?: string;
}

const PDFDownloadCard: React.FC<PDFDownloadCardProps> = ({
  title,
  description,
  pdfPath,
  className = '',
}) => {
  return (
    <div className={`bg-gray-900 rounded-lg p-5 sm:p-6 ${className}`}>
      <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0 sm:space-x-6">
        <div className="flex-shrink-0">
          <svg className="h-12 w-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-xl font-medium text-white mb-2">{title}</h3>
          <p className="text-gray-400 text-base">
            {description}
          </p>
        </div>
        <a
          href={pdfPath}
          download
          className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
        >
          <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download PDF
        </a>
      </div>
    </div>
  );
};

export default PDFDownloadCard; 