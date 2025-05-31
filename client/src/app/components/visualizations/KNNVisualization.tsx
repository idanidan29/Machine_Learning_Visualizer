import React, { useRef, useState, useEffect } from 'react';

interface Point {
  x: number;
  y: number;
  class: number;
}

interface KNNVisualizationProps {
  k?: number;
}

const KNNVisualization: React.FC<KNNVisualizationProps> = ({ k = 3 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [points, setPoints] = useState<Point[]>(() => {
    // Generate 10 random points for each class
    const initialPoints: Point[] = [];
    for (let i = 0; i < 10; i++) {
      initialPoints.push({
        x: Math.random(),
        y: Math.random(),
        class: 0
      });
      initialPoints.push({
        x: Math.random(),
        y: Math.random(),
        class: 1
      });
    }
    return initialPoints;
  });
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [showDecisionBoundary, setShowDecisionBoundary] = useState(true);
  const [hoveredPoint, setHoveredPoint] = useState<Point | null>(null);
  const [kValue, setKValue] = useState(k);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);
  const [nearestNeighbors, setNearestNeighbors] = useState<Point[]>([]);

  const resetPoints = () => {
    setPoints([]);
    setNearestNeighbors([]);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw decision boundary if enabled
    if (showDecisionBoundary) {
      const resolution = 50;
      const stepX = canvas.width / resolution;
      const stepY = canvas.height / resolution;

      for (let i = 0; i < resolution; i++) {
        for (let j = 0; j < resolution; j++) {
          const x = (i + 0.5) * stepX / canvas.width;
          const y = (j + 0.5) * stepY / canvas.height;

          const distances = points.map(point => ({
            point,
            distance: Math.sqrt(
              Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2)
            )
          }));

          distances.sort((a, b) => a.distance - b.distance);
          const kNearest = distances.slice(0, kValue);

          const classCounts = kNearest.reduce((acc, { point }) => {
            acc[point.class] = (acc[point.class] || 0) + 1;
            return acc;
          }, {} as Record<number, number>);

          const majorityClass = Object.entries(classCounts).reduce(
            (max, [class_, count]) =>
              count > (max.count || 0) ? { class: Number(class_), count } : max,
            { class: 0, count: 0 }
          ).class;

          ctx.fillStyle = majorityClass === 0 ? 'rgba(59, 130, 246, 0.1)' : 'rgba(239, 68, 68, 0.1)';
          ctx.fillRect(i * stepX, j * stepY, stepX, stepY);
        }
      }
    }

    // Draw points
    points.forEach(point => {
      ctx.beginPath();
      ctx.arc(
        point.x * canvas.width,
        point.y * canvas.height,
        6,
        0,
        2 * Math.PI
      );
      ctx.fillStyle = point.class === 0 ? '#3B82F6' : '#EF4444';
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    // Draw nearest neighbors connections
    if (mousePosition && nearestNeighbors.length > 0) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1;
      nearestNeighbors.forEach(neighbor => {
        ctx.beginPath();
        ctx.moveTo(mousePosition.x * canvas.width, mousePosition.y * canvas.height);
        ctx.lineTo(neighbor.x * canvas.width, neighbor.y * canvas.height);
        ctx.stroke();
      });
    }

    // Draw hovered point info
    if (hoveredPoint) {
      ctx.beginPath();
      ctx.arc(
        hoveredPoint.x * canvas.width,
        hoveredPoint.y * canvas.height,
        10,
        0,
        2 * Math.PI
      );
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 3;
      ctx.stroke();
    }
  }, [points, showDecisionBoundary, hoveredPoint, kValue, mousePosition, nearestNeighbors]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    if (selectedClass !== null) {
      const newPoint: Point = {
        x,
        y,
        class: selectedClass
      };
      setPoints([...points, newPoint]);
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });

    // Find k nearest neighbors
    const distances = points.map(point => ({
      point,
      distance: Math.sqrt(
        Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2)
      )
    }));

    distances.sort((a, b) => a.distance - b.distance);
    setNearestNeighbors(distances.slice(0, kValue).map(d => d.point));

    // Find closest point for hover effect
    const closestPoint = distances[0];
    if (closestPoint && closestPoint.distance < 0.05) {
      setHoveredPoint(closestPoint.point);
    } else {
      setHoveredPoint(null);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <h2 className="text-xl font-bold text-white">K-Nearest Neighbors</h2>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setSelectedClass(selectedClass === 0 ? null : 0)}
            className={`px-3 py-1.5 rounded-lg transition-colors text-sm ${
              selectedClass === 0
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Class 0
          </button>
          <button
            onClick={() => setSelectedClass(selectedClass === 1 ? null : 1)}
            className={`px-3 py-1.5 rounded-lg transition-colors text-sm ${
              selectedClass === 1
                ? 'bg-red-500 text-white shadow-lg'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Class 1
          </button>
          <button
            onClick={() => setShowDecisionBoundary(!showDecisionBoundary)}
            className={`px-3 py-1.5 rounded-lg transition-colors text-sm ${
              showDecisionBoundary
                ? 'bg-green-500 text-white shadow-lg'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Decision Boundary
          </button>
          <button
            onClick={resetPoints}
            className="px-3 py-1.5 rounded-lg transition-colors text-sm bg-gray-700 text-gray-300 hover:bg-gray-600"
          >
            Clear Points
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <label htmlFor="k-value" className="text-gray-300 text-sm font-medium">
          K:
        </label>
        <input
          id="k-value"
          type="range"
          min="1"
          max="10"
          value={kValue}
          onChange={(e) => setKValue(parseInt(e.target.value))}
          className="w-24 accent-purple-500"
        />
        <span className="text-gray-300 text-sm font-medium">{kValue}</span>
      </div>

      <div className="relative bg-gray-800 rounded-lg overflow-hidden shadow-xl">
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          onClick={handleCanvasClick}
          onMouseMove={handleCanvasMouseMove}
          className="w-full h-[500px] cursor-crosshair"
        />
        {mousePosition && nearestNeighbors.length > 0 && (
          <div className="absolute top-4 right-4 bg-gray-800 p-3 rounded-lg shadow-lg text-sm text-gray-300">
            <div className="font-medium mb-1">Nearest Neighbors:</div>
            <div className="space-y-1">
              {nearestNeighbors.map((point, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${point.class === 0 ? 'bg-blue-500' : 'bg-red-500'}`} />
                  <span>Class {point.class}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 p-4 bg-gray-800 rounded-lg text-gray-300 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-500 mt-1" />
              <p className="text-sm">Blue points represent Class 0</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500 mt-1" />
              <p className="text-sm">Red points represent Class 1</p>
            </div>
            <div className="bg-gray-700 p-3 rounded-lg">
              <h4 className="font-semibold mb-2 text-white text-sm">How it works:</h4>
              <ol className="list-decimal pl-4 space-y-1 text-sm">
                <li>Move your mouse over the canvas to see the K nearest neighbors</li>
                <li>The algorithm finds the K closest points to your cursor</li>
                <li>It counts how many points of each class are among these K neighbors</li>
                <li>The position is classified as the majority class</li>
              </ol>
            </div>
          </div>
          <div className="bg-gray-700 p-3 rounded-lg">
            <h4 className="font-semibold mb-2 text-white text-sm">Try it yourself:</h4>
            <ol className="list-decimal pl-4 space-y-1 text-sm">
              <li>Select a class (0 or 1) using the buttons above</li>
              <li>Click on the canvas to add points</li>
              <li>Adjust the K value to see how it affects the decision boundary</li>
              <li>Toggle the decision boundary to see classification regions</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KNNVisualization; 