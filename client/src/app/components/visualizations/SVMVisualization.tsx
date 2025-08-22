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
  const [hyperplane, setHyperplane] = useState<{ w: number[]; b: number; margin: number; supportVectors: Point[] } | null>(null);
  const [isTraining, setIsTraining] = useState(false);
  const [calculatedMargin, setCalculatedMargin] = useState<number>(0);
  const [showDecisionRegions, setShowDecisionRegions] = useState(false);

  // Generate sample data with better separation
  useEffect(() => {
    generateData();
  }, []);

  const generateData = () => {
    const newPoints: Point[] = [];
    
    // Generate class 1 points (bottom-left) - left group starting lower
    for (let i = 0; i < 18; i++) {
      newPoints.push({
        x: Math.random() * 0.25 + 0.1,   // Left side
        y: Math.random() * 0.25 + 0.1,   // Lower position
        label: 1
      });
    }
    
    // Add a few class 1 points closer to the boundary to ensure support vectors
    for (let i = 0; i < 2; i++) {
      newPoints.push({
        x: Math.random() * 0.15 + 0.3,   // Closer to boundary
        y: Math.random() * 0.15 + 0.3,   // Closer to boundary
        label: 1
      });
    }
    
    // Generate class -1 points (top-right) - right group starting higher
    for (let i = 0; i < 18; i++) {
      newPoints.push({
        x: Math.random() * 0.25 + 0.65,  // Right side
        y: Math.random() * 0.25 + 0.65,  // Higher position
        label: -1
      });
    }
    
    // Add a few class -1 points closer to the boundary to ensure support vectors
    for (let i = 0; i < 2; i++) {
      newPoints.push({
        x: Math.random() * 0.15 + 0.55,  // Closer to boundary
        y: Math.random() * 0.15 + 0.55,  // Closer to boundary
        label: -1
      });
    }
    
    setPoints(newPoints);
    // Reset hyperplane and decision regions when new data is generated
    setHyperplane(null);
    setShowDecisionRegions(false);
    setCalculatedMargin(0);
  };

  // Calculate the optimal hyperplane using proper SVM algorithm
  const calculateOptimalHyperplane = (points: Point[]) => {
    // Separate points by class
    const class1Points = points.filter(p => p.label === 1);
    const class2Points = points.filter(p => p.label === -1);
    
    if (class1Points.length === 0 || class2Points.length === 0) {
      return null;
    }
    
    // Find the optimal hyperplane by finding the line that maximizes the minimum distance
    // to points of both classes (this is the true SVM objective)
    
    let bestW: number[] = [0, 0];
    let bestB = 0;
    let maxMargin = 0;
    let bestSupportVectors: Point[] = [];
    
    // Instead of trying all angles, we'll use a more intelligent approach:
    // Consider all possible lines defined by pairs of points from different classes
    
    for (let i = 0; i < class1Points.length; i++) {
      for (let j = 0; j < class2Points.length; j++) {
        const p1 = class1Points[i];
        const p2 = class2Points[j];
        
        // Create a line perpendicular to the line connecting these two points
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        
        if (Math.abs(dx) < 0.001 && Math.abs(dy) < 0.001) continue; // Skip if points are too close
        
        // Normal vector (perpendicular to the line connecting the points)
        const normal = [-dy, dx];
        const norm = Math.sqrt(normal[0] * normal[0] + normal[1] * normal[1]);
        if (norm === 0) continue;
        
        const w = [normal[0] / norm, normal[1] / norm];
        
        // Find the optimal position for this orientation by maximizing the margin
        // Project all points onto this direction
        const projections = points.map(point => ({
          projection: w[0] * point.x + w[1] * point.y,
          point: point
        }));
        
        // Separate projections by class
        const proj1 = projections.filter(p => p.point.label === 1).map(p => p.projection);
        const proj2 = projections.filter(p => p.point.label === -1).map(p => p.projection);
        
        // Find the boundaries
        const maxProj2 = Math.max(...proj2);
        const minProj1 = Math.min(...proj1);
        
        // Check if this orientation can separate the classes
        if (minProj1 > maxProj2) {
          // Calculate the margin
          const margin = (minProj1 - maxProj2) / 2;
          
          if (margin > maxMargin) {
            maxMargin = margin;
            bestW = [...w];
            
            // Position the hyperplane at the midpoint
            const optimalProjection = (minProj1 + maxProj2) / 2;
            bestB = -optimalProjection;
            
            // Find support vectors for this configuration
            const supportVectors: Point[] = [];
            const tolerance = 0.02;
            
            // Find support vectors from class 1 (points with minimum projection)
            projections.forEach(p => {
              if (p.point.label === 1 && Math.abs(p.projection - minProj1) < tolerance) {
                supportVectors.push(p.point);
              }
            });
            
            // Find support vectors from class -1 (points with maximum projection)
            projections.forEach(p => {
              if (p.point.label === -1 && Math.abs(p.projection - maxProj2) < tolerance) {
                supportVectors.push(p.point);
              }
            });
            
            bestSupportVectors = supportVectors;
          }
        }
      }
    }
    
    // If we still haven't found a good hyperplane, try the convex hull approach
    if (maxMargin === 0) {
      // Find the closest pair of points between the two classes
      let minDistance = Infinity;
      let closestPair: [Point, Point] | null = null;
      
      for (const p1 of class1Points) {
        for (const p2 of class2Points) {
          const distance = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
          if (distance < minDistance) {
            minDistance = distance;
            closestPair = [p1, p2];
          }
        }
      }
      
      if (closestPair) {
        const [p1, p2] = closestPair;
        
        // The optimal hyperplane is perpendicular to the line connecting these closest points
        // and passes through their midpoint
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const norm = Math.sqrt(dx * dx + dy * dy);
        
        if (norm > 0) {
          // Normal vector pointing from class -1 to class 1
          bestW = [dx / norm, dy / norm];
          
          // Midpoint between the closest points
          const midX = (p1.x + p2.x) / 2;
          const midY = (p1.y + p2.y) / 2;
          
          bestB = -(bestW[0] * midX + bestW[1] * midY);
          maxMargin = minDistance / 2;
          
          // These closest points are the support vectors
          bestSupportVectors = [p1, p2];
        }
      }
    }
    
    return { w: bestW, b: bestB, margin: maxMargin, supportVectors: bestSupportVectors };
  };

  // Improved SVM training with actual calculation
  const trainSVM = () => {
    setIsTraining(true);
    
    // Simulate training delay
    setTimeout(() => {
      // Calculate optimal hyperplane based on actual data
      const optimalHyperplane = calculateOptimalHyperplane(points);
      
      if (optimalHyperplane) {
        setHyperplane(optimalHyperplane);
        setCalculatedMargin(optimalHyperplane.margin);
        setShowDecisionRegions(true);
      }
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
      drawMargin(ctx, hyperplane, calculatedMargin, canvas.width, canvas.height);
    }

    // Draw support vectors
    if (hyperplane && hyperplane.supportVectors) {
      drawSupportVectorsFromHyperplane(ctx, hyperplane.supportVectors, canvas.width, canvas.height);
    }
  }, [points, hyperplane, calculatedMargin, showDecisionRegions]);

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

  const drawSupportVectorsFromHyperplane = (ctx: CanvasRenderingContext2D, supportVectors: Point[], width: number, height: number) => {
    supportVectors.forEach(point => {
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
    });
  };


  const resetVisualization = () => {
    setHyperplane(null);
    setShowDecisionRegions(false);
    setCalculatedMargin(0);
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

      {/* SVM Information */}
      {hyperplane && (
        <div className="bg-gray-800 rounded-lg p-4 mx-auto max-w-md">
          <h3 className="text-lg font-semibold text-white mb-2">SVM Results</h3>
          <div className="space-y-2 text-sm text-gray-300">
            <div className="flex justify-between">
              <span>Margin:</span>
              <span className="text-purple-400 font-mono">{calculatedMargin.toFixed(4)}</span>
            </div>
            <div className="flex justify-between">
              <span>Support Vectors:</span>
              <span className="text-yellow-400 font-mono">{hyperplane.supportVectors?.length || 0}</span>
            </div>
            {hyperplane.supportVectors && (
              <div className="flex justify-between text-xs">
                <span className="ml-4">Class 1:</span>
                <span className="text-green-400 font-mono">
                  {hyperplane.supportVectors.filter(sv => sv.label === 1).length}
                </span>
              </div>
            )}
            {hyperplane.supportVectors && (
              <div className="flex justify-between text-xs">
                <span className="ml-4">Class -1:</span>
                <span className="text-red-400 font-mono">
                  {hyperplane.supportVectors.filter(sv => sv.label === -1).length}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Weight Vector:</span>
              <span className="text-blue-400 font-mono">
                [{hyperplane.w[0].toFixed(3)}, {hyperplane.w[1].toFixed(3)}]
              </span>
            </div>
            <div className="flex justify-between">
              <span>Bias:</span>
              <span className="text-green-400 font-mono">{hyperplane.b.toFixed(3)}</span>
            </div>
          </div>
        </div>
      )}

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