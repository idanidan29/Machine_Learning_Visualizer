/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
'use client';

import React, { useEffect, useState, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  class: number;
}

export default function NaiveBayesVisualization() {
  const [points, setPoints] = useState<Point[]>([]);
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [showDecisionBoundary, setShowDecisionBoundary] = useState(true);
  const [showProbabilityContours, setShowProbabilityContours] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState<Point | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate initial data
  useEffect(() => {
    generateInitialData();
  }, []);

  const generateInitialData = () => {
    const newPoints: Point[] = [];
    
    // Generate Class 0 points (blue)
    for (let i = 0; i < 30; i++) {
      newPoints.push({
        x: 0.2 + Math.random() * 0.2,
        y: 0.2 + Math.random() * 0.2,
        class: 0
      });
    }
    
    // Generate Class 1 points (red)
    for (let i = 0; i < 30; i++) {
      newPoints.push({
        x: 0.6 + Math.random() * 0.2,
        y: 0.6 + Math.random() * 0.2,
        class: 1
      });
    }
    
    setPoints(newPoints);
  };

  const calculateProbability = (x: number, y: number, classLabel: number): number => {
    const classPoints = points.filter(p => p.class === classLabel);
    const totalDistance = classPoints.reduce((sum, p) => {
      const dx = x - p.x;
      const dy = y - p.y;
      return sum + Math.exp(-(dx * dx + dy * dy) * 10);
    }, 0);
    return totalDistance / classPoints.length;
  };

  // Draw visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw probability contours if enabled
    if (showProbabilityContours && selectedClass !== null) {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const px = x / canvas.width;
          const py = y / canvas.height;
          
          const probability = calculateProbability(px, py, selectedClass);
          const intensity = Math.min(255, Math.floor(probability * 255));
          
          const idx = (y * canvas.width + x) * 4;
          data[idx] = selectedClass === 0 ? 59 : 239;     // R
          data[idx + 1] = selectedClass === 0 ? 130 : 68; // G
          data[idx + 2] = selectedClass === 0 ? 246 : 68; // B
          data[idx + 3] = intensity;
        }
      }
      ctx.putImageData(imageData, 0, 0);
    }

    // Draw decision boundary if enabled
    if (showDecisionBoundary) {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const px = x / canvas.width;
          const py = y / canvas.height;
          
          const prob0 = calculateProbability(px, py, 0);
          const prob1 = calculateProbability(px, py, 1);
          
          const idx = (y * canvas.width + x) * 4;
          if (Math.abs(prob0 - prob1) < 0.1) {
            data[idx] = 255;
            data[idx + 1] = 255;
            data[idx + 2] = 255;
            data[idx + 3] = 50;
          }
        }
      }
      ctx.putImageData(imageData, 0, 0);
    }

    // Draw points
    points.forEach(point => {
      const x = point.x * canvas.width;
      const y = point.y * canvas.height;
      
      // Draw point
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, 2 * Math.PI);
      ctx.fillStyle = point.class === 0 ? '#3B82F6' : '#EF4444';
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw hover effect
      if (hoveredPoint === point) {
        ctx.beginPath();
        ctx.arc(x, y, 12, 0, 2 * Math.PI);
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 3;
        ctx.stroke();
      }
    });
  }, [points, selectedClass, showDecisionBoundary, showProbabilityContours, hoveredPoint]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Add new point
    const newPoint: Point = {
      x,
      y,
      class: selectedClass ?? 0
    };

    setPoints([...points, newPoint]);
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Find closest point
    const closestPoint = points.reduce((closest, point) => {
      const distance = Math.sqrt(
        Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2)
      );
      return distance < closest.distance ? { point, distance } : closest;
    }, { point: null as Point | null, distance: Infinity });

    if (closestPoint.distance < 0.05) {
      setHoveredPoint(closestPoint.point);
    } else {
      setHoveredPoint(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h2 className="text-xl font-semibold text-white">Naive Bayes Visualization</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedClass(selectedClass === 0 ? null : 0)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedClass === 0
                ? 'bg-blue-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Class 0
          </button>
          <button
            onClick={() => setSelectedClass(selectedClass === 1 ? null : 1)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedClass === 1
                ? 'bg-red-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Class 1
          </button>
          <button
            onClick={() => setShowDecisionBoundary(!showDecisionBoundary)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              showDecisionBoundary
                ? 'bg-green-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Decision Boundary
          </button>
          <button
            onClick={() => setShowProbabilityContours(!showProbabilityContours)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              showProbabilityContours
                ? 'bg-purple-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Probability Contours
          </button>
          <button
            onClick={generateInitialData}
            className="px-4 py-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          className="w-full h-[500px] bg-gray-900 rounded-lg"
          onClick={handleCanvasClick}
          onMouseMove={handleCanvasMouseMove}
          onMouseLeave={() => setHoveredPoint(null)}
        />
        
        {hoveredPoint && (
          <div className="absolute bg-gray-800 text-white p-4 rounded-lg shadow-lg"
               style={{
                 left: hoveredPoint.x * 100 + '%',
                 top: hoveredPoint.y * 100 + '%',
                 transform: 'translate(-50%, -120%)'
               }}>
            <h3 className="font-semibold mb-2">Point Details</h3>
            <p>Class: {hoveredPoint.class}</p>
            <p>Probability Class 0: {(calculateProbability(hoveredPoint.x, hoveredPoint.y, 0) * 100).toFixed(1)}%</p>
            <p>Probability Class 1: {(calculateProbability(hoveredPoint.x, hoveredPoint.y, 1) * 100).toFixed(1)}%</p>
          </div>
        )}
      </div>

      <div className="text-gray-300 text-sm space-y-2">
        <p className="mt-2">Try these steps to understand better:</p>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Click "Reset" to start with random points</li>
          <li>Toggle "Decision Boundary" to see where classes are equally likely</li>
          <li>Select a class and toggle "Probability Contours" to see its probability distribution</li>
          <li>Hover over points to see their probabilities for each class</li>
          <li>Add new points by clicking on the plot</li>
        </ol>
      </div>
    </div>
  );
} 