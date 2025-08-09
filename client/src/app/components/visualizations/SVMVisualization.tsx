'use client';

import React, { useState, useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  label: number;
}

type SVMVisualizationProps = object

const SVMVisualization: React.FC<SVMVisualizationProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const [hyperplane, setHyperplane] = useState<{ w: number[]; b: number } | null>(null);
  const [isTraining, setIsTraining] = useState(false);
  const [margin] = useState<number>(0.15);
  const [showDecisionRegions, setShowDecisionRegions] = useState(false);

  // Generate sample data with better separation
  useEffect(() => {
    generateData();
  }, []);

  const generateData = () => {
    const newPoints: Point[] = [];
    
    // Generate class 1 points (top-left) - more concentrated
    for (let i = 0; i < 20; i++) {
      newPoints.push({
        x: Math.random() * 0.25 + 0.1,  // More concentrated in top-left
        y: Math.random() * 0.25 + 0.65,  // Higher up
        label: 1
      });
    }
    
    // Generate class -1 points (bottom-right) - more concentrated
    for (let i = 0; i < 20; i++) {
      newPoints.push({
        x: Math.random() * 0.25 + 0.65,  // More concentrated in bottom-right
        y: Math.random() * 0.25 + 0.1,   // Lower down
        label: -1
      });
    }
    
    setPoints(newPoints);
    // Reset hyperplane and decision regions when new data is generated
    setHyperplane(null);
    setShowDecisionRegions(false);
  };

  // Calculate the optimal hyperplane using a simplified SVM algorithm
  const calculateOptimalHyperplane = (points: Point[]) => {
    // Separate points by class
    const class1Points = points.filter(p => p.label === 1);
    const class2Points = points.filter(p => p.label === -1);
    
    // Calculate centroids of each class
    const centroid1 = {
      x: class1Points.reduce((sum, p) => sum + p.x, 0) / class1Points.length,
      y: class1Points.reduce((sum, p) => sum + p.y, 0) / class1Points.length
    };
    
    const centroid2 = {
      x: class2Points.reduce((sum, p) => sum + p.x, 0) / class2Points.length,
      y: class2Points.reduce((sum, p) => sum + p.y, 0) / class2Points.length
    };
    
    // Calculate the direction vector between centroids
    const dx = centroid2.x - centroid1.x;
    const dy = centroid2.y - centroid1.y;
    
    // The normal vector to the separating line (perpendicular to the line connecting centroids)
    const w = [dy, -dx]; // Perpendicular vector
    
    // Normalize the weight vector
    const norm = Math.sqrt(w[0] * w[0] + w[1] * w[1]);
    w[0] = w[0] / norm;
    w[1] = w[1] / norm;
    
    // Calculate the midpoint between centroids
    const midpoint = {
      x: (centroid1.x + centroid2.x) / 2,
      y: (centroid1.y + centroid2.y) / 2
    };
    
    // Calculate bias so that the hyperplane passes through the midpoint
    const b = -(w[0] * midpoint.x + w[1] * midpoint.y);
    
    // Fine-tune the hyperplane to maximize margin
    let bestW = [...w];
    let bestB = b;
    let maxMargin = 0;
    
    // Try different orientations to find the one with maximum margin
    for (let angle = -Math.PI/6; angle <= Math.PI/6; angle += Math.PI/36) {
      const cos_a = Math.cos(angle);
      const sin_a = Math.sin(angle);
      
      // Rotate the normal vector
      const testW = [
        w[0] * cos_a - w[1] * sin_a,
        w[0] * sin_a + w[1] * cos_a
      ];
      
      // Recalculate bias for the rotated normal
      const testB = -(testW[0] * midpoint.x + testW[1] * midpoint.y);
      
      // Calculate minimum distance to hyperplane for all points
      let minDistance = Infinity;
      for (const point of points) {
        const distance = Math.abs(testW[0] * point.x + testW[1] * point.y + testB) / 
                        Math.sqrt(testW[0] * testW[0] + testW[1] * testW[1]);
        minDistance = Math.min(minDistance, distance);
      }
      
      // Check if all points are correctly classified
      let correctClassification = true;
      for (const point of points) {
        const decision = testW[0] * point.x + testW[1] * point.y + testB;
        if ((point.label === 1 && decision <= 0) || (point.label === -1 && decision >= 0)) {
          correctClassification = false;
          break;
        }
      }
      
      // Update best hyperplane if this one has larger margin and correct classification
      if (correctClassification && minDistance > maxMargin) {
        maxMargin = minDistance;
        bestW = [...testW];
        bestB = testB;
      }
    }
    
    return { w: bestW, b: bestB };
  };

  // Improved SVM training with actual calculation
  const trainSVM = () => {
    setIsTraining(true);
    
    // Simulate training delay
    setTimeout(() => {
      // Calculate optimal hyperplane based on actual data
      const optimalHyperplane = calculateOptimalHyperplane(points);
      
      setHyperplane(optimalHyperplane);
      setShowDecisionRegions(true);
      setIsTraining(false);
    }, 1500);
  };

  // Draw the visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set background
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw decision regions if available
    if (hyperplane && showDecisionRegions) {
      drawDecisionRegions(ctx, hyperplane, canvas.width, canvas.height);
    }

    // Draw grid
    drawGrid(ctx, canvas.width, canvas.height);

    // Draw points
    points.forEach(point => {
      drawPoint(ctx, point, canvas.width, canvas.height);
    });

    // Draw hyperplane and margin
    if (hyperplane) {
      drawHyperplane(ctx, hyperplane, canvas.width, canvas.height);
      drawMargin(ctx, hyperplane, margin, canvas.width, canvas.height);
    }

    // Draw support vectors
    if (hyperplane) {
      drawSupportVectors(ctx, points, hyperplane, canvas.width, canvas.height);
    }
  }, [points, hyperplane, margin, showDecisionRegions]);

  const drawDecisionRegions = (ctx: CanvasRenderingContext2D, hyperplane: { w: number[]; b: number }, width: number, height: number) => {
    const { w, b } = hyperplane;
    
    // Create a semi-transparent overlay for decision regions
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;
    
    for (let i = 0; i < width; i += 2) {
      for (let j = 0; j < height; j += 2) {
        const x = i / width;
        const y = 1 - j / height;
        
        // Calculate decision function value
        const decision = w[0] * x + w[1] * y + b;
        
        const pixelIndex = (j * width + i) * 4;
        
        if (decision > 0) {
          // Class 1 region (green tint)
          data[pixelIndex] = 16;     // R
          data[pixelIndex + 1] = 185; // G
          data[pixelIndex + 2] = 129; // B
          data[pixelIndex + 3] = 30;  // A (transparency)
        } else {
          // Class -1 region (red tint)
          data[pixelIndex] = 239;     // R
          data[pixelIndex + 1] = 68;  // G
          data[pixelIndex + 2] = 68;  // B
          data[pixelIndex + 3] = 30;  // A (transparency)
        }
        
        // Fill adjacent pixels for smoother appearance
        if (i + 1 < width) {
          const adjacentIndex = (j * width + i + 1) * 4;
          data[adjacentIndex] = data[pixelIndex];
          data[adjacentIndex + 1] = data[pixelIndex + 1];
          data[adjacentIndex + 2] = data[pixelIndex + 2];
          data[adjacentIndex + 3] = data[pixelIndex + 3];
        }
        if (j + 1 < height) {
          const belowIndex = ((j + 1) * width + i) * 4;
          data[belowIndex] = data[pixelIndex];
          data[belowIndex + 1] = data[pixelIndex + 1];
          data[belowIndex + 2] = data[pixelIndex + 2];
          data[belowIndex + 3] = data[pixelIndex + 3];
        }
      }
    }
    
    ctx.putImageData(imageData, 0, 0);
  };

  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 0.5;
    
    // Vertical lines
    for (let x = 0; x <= width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    // Horizontal lines
    for (let y = 0; y <= height; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  const drawPoint = (ctx: CanvasRenderingContext2D, point: Point, width: number, height: number) => {
    const x = point.x * width;
    const y = (1 - point.y) * height;
    
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, 2 * Math.PI); // Larger points for better visibility
    
    if (point.label === 1) {
      ctx.fillStyle = '#10b981'; // Green for class 1
    } else {
      ctx.fillStyle = '#ef4444'; // Red for class -1
    }
    
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const drawHyperplane = (ctx: CanvasRenderingContext2D, hyperplane: { w: number[]; b: number }, width: number, height: number) => {
    const { w, b } = hyperplane;
    
    // Calculate two points on the hyperplane
    const x1 = 0;
    const y1 = (-b - w[0] * x1) / w[1];
    
    const x2 = 1;
    const y2 = (-b - w[0] * x2) / w[1];
    
    // Convert to canvas coordinates
    const canvasX1 = x1 * width;
    const canvasY1 = (1 - y1) * height;
    const canvasX2 = x2 * width;
    const canvasY2 = (1 - y2) * height;
    
    // Draw hyperplane with thicker line
    ctx.strokeStyle = '#8b5cf6';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(canvasX1, canvasY1);
    ctx.lineTo(canvasX2, canvasY2);
    ctx.stroke();
    
    // Add arrow to show direction
    const midX = (canvasX1 + canvasX2) / 2;
    const midY = (canvasY1 + canvasY2) / 2;
    
    // Calculate perpendicular vector for arrow
    const perpX = -w[1];
    const perpY = w[0];
    const length = Math.sqrt(perpX * perpX + perpY * perpY);
    
    if (length > 0) {
      const arrowLength = 25;
      const arrowX = midX + (perpX / length) * arrowLength;
      const arrowY = midY + (perpY / length) * arrowLength;
      
      ctx.fillStyle = '#8b5cf6';
      ctx.beginPath();
      ctx.arc(arrowX, arrowY, 5, 0, 2 * Math.PI);
      ctx.fill();
    }
  };

  const drawMargin = (ctx: CanvasRenderingContext2D, hyperplane: { w: number[]; b: number }, margin: number, width: number, height: number) => {
    const { w, b } = hyperplane;
    
    // Calculate margin boundaries
    const margin1 = b + margin;
    const margin2 = b - margin;
    
    // Calculate two points on each margin boundary
    const x1 = 0;
    const y1_1 = (-margin1 - w[0] * x1) / w[1];
    const y1_2 = (-margin2 - w[0] * x1) / w[1];
    
    const x2 = 1;
    const y2_1 = (-margin1 - w[0] * x2) / w[1];
    const y2_2 = (-margin2 - w[0] * x2) / w[1];
    
    // Convert to canvas coordinates
    const canvasX1 = x1 * width;
    const canvasY1_1 = (1 - y1_1) * height;
    const canvasY1_2 = (1 - y1_2) * height;
    const canvasX2 = x2 * width;
    const canvasY2_1 = (1 - y2_1) * height;
    const canvasY2_2 = (1 - y2_2) * height;
    
    // Draw margin boundaries with better visibility
    ctx.strokeStyle = '#8b5cf6';
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 8]);
    
    // Upper margin
    ctx.beginPath();
    ctx.moveTo(canvasX1, canvasY1_1);
    ctx.lineTo(canvasX2, canvasY2_1);
    ctx.stroke();
    
    // Lower margin
    ctx.beginPath();
    ctx.moveTo(canvasX1, canvasY1_2);
    ctx.lineTo(canvasX2, canvasY2_2);
    ctx.stroke();
    
    ctx.setLineDash([]);
  };

  const drawSupportVectors = (ctx: CanvasRenderingContext2D, points: Point[], hyperplane: { w: number[]; b: number }, width: number, height: number) => {
    const { w, b } = hyperplane;
    
    points.forEach(point => {
      // Calculate distance to hyperplane
      const distance = Math.abs(w[0] * point.x + w[1] * point.y + b) / Math.sqrt(w[0] * w[0] + w[1] * w[1]);
      
      // If point is close to the margin, it's a support vector
      if (distance < 0.08) { // Tighter threshold for better identification
        const x = point.x * width;
        const y = (1 - point.y) * height;
        
        // Draw support vector indicator with better visibility
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(x, y, 15, 0, 2 * Math.PI);
        ctx.stroke();
        
        // Add "SV" label
        ctx.fillStyle = '#fbbf24';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('SV', x, y + 5);
      }
    });
  };

  const resetVisualization = () => {
    setHyperplane(null);
    setShowDecisionRegions(false);
    generateData();
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={trainSVM}
          disabled={isTraining}
          className="px-6 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 text-white rounded-lg font-medium transition-colors"
        >
          {isTraining ? 'Training...' : 'Train SVM'}
        </button>
        
        <button
          onClick={resetVisualization}
          className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
        >
          Reset
        </button>
        
        <button
          onClick={generateData}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          New Data
        </button>
      </div>

      {/* Canvas */}
      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          className="border-2 border-gray-600 rounded-lg bg-gray-800"
        />
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          <span className="text-gray-300">Class 1</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>
          <span className="text-gray-300">Class -1</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-500 rounded-full border-2 border-white"></div>
          <span className="text-gray-300">Hyperplane</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded-full border-2 border-white"></div>
          <span className="text-gray-300">Support Vectors</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-2 bg-green-500 opacity-40 border border-white"></div>
          <span className="text-gray-300">Class 1 Region</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-2 bg-red-500 opacity-40 border border-white"></div>
          <span className="text-gray-300">Class -1 Region</span>
        </div>
      </div>
    </div>
  );
};

export default SVMVisualization; 