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

  const resetPoints = () => {
    setPoints([]);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw points
    points.forEach(point => {
      ctx.beginPath();
      ctx.arc(
        point.x * canvas.width,
        point.y * canvas.height,
        5,
        0,
        2 * Math.PI
      );
      ctx.fillStyle = point.class === 0 ? '#3B82F6' : '#EF4444';
      ctx.fill();
    });

    // Draw decision boundary if enabled
    if (showDecisionBoundary) {
      const resolution = 50;
      const stepX = canvas.width / resolution;
      const stepY = canvas.height / resolution;

      for (let i = 0; i < resolution; i++) {
        for (let j = 0; j < resolution; j++) {
          const x = (i + 0.5) * stepX / canvas.width;
          const y = (j + 0.5) * stepY / canvas.height;

          // Find k nearest neighbors
          const distances = points.map(point => ({
            point,
            distance: Math.sqrt(
              Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2)
            )
          }));

          distances.sort((a, b) => a.distance - b.distance);
          const kNearest = distances.slice(0, kValue);

          // Count class occurrences
          const classCounts = kNearest.reduce((acc, { point }) => {
            acc[point.class] = (acc[point.class] || 0) + 1;
            return acc;
          }, {} as Record<number, number>);

          // Determine majority class
          const majorityClass = Object.entries(classCounts).reduce(
            (max, [class_, count]) =>
              count > (max.count || 0) ? { class: Number(class_), count } : max,
            { class: 0, count: 0 }
          ).class;

          // Draw decision boundary
          ctx.fillStyle = majorityClass === 0 ? '#3B82F6' : '#EF4444';
          ctx.globalAlpha = 0.1;
          ctx.fillRect(i * stepX, j * stepY, stepX, stepY);
          ctx.globalAlpha = 1;
        }
      }
    }

    // Draw hovered point info
    if (hoveredPoint) {
      ctx.beginPath();
      ctx.arc(
        hoveredPoint.x * canvas.width,
        hoveredPoint.y * canvas.height,
        8,
        0,
        2 * Math.PI
      );
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }, [points, showDecisionBoundary, hoveredPoint, kValue]);

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
        <h2 className="text-xl font-semibold text-white">K-Nearest Neighbors Visualization</h2>
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
            onClick={resetPoints}
            className="px-4 py-2 rounded-lg transition-colors bg-gray-700 text-gray-300 hover:bg-gray-600"
          >
            Clear Points
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <label htmlFor="k-value" className="text-gray-300">
          K value:
        </label>
        <input
          id="k-value"
          type="range"
          min="1"
          max="10"
          value={kValue}
          onChange={(e) => setKValue(parseInt(e.target.value))}
          className="w-32 accent-purple-500"
        />
        <span className="text-gray-300">{kValue}</span>
      </div>

      <div className="relative bg-gray-800 rounded-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          onClick={handleCanvasClick}
          onMouseMove={handleCanvasMouseMove}
          className="w-full h-[500px] cursor-crosshair"
        />
      </div>

      {hoveredPoint && (
        <div className="absolute bg-gray-800 p-2 rounded-lg shadow-lg text-sm text-gray-300">
          Class: {hoveredPoint.class}
          <br />
          Position: ({hoveredPoint.x.toFixed(2)}, {hoveredPoint.y.toFixed(2)})
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-800 rounded-lg text-gray-300">
        <h3 className="text-lg font-semibold mb-2">Understanding K-Nearest Neighbors</h3>
        <div className="space-y-2 text-sm">
          <p>
            <span className="text-blue-400">• Blue points</span> represent Class 0, and <span className="text-red-400">• Red points</span> represent Class 1.
          </p>
          <p>
            The colored background shows the decision boundary - areas where the algorithm predicts Class 0 (blue) or Class 1 (red).
          </p>
          <p>
            How it works:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>For each point in the background, the algorithm finds the K nearest training points (K is controlled by the slider)</li>
            <li>It then counts how many points of each class are among these K neighbors</li>
            <li>The point is classified as the majority class among its K nearest neighbors</li>
            <li>This creates the decision boundary you see in the background</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default KNNVisualization; 