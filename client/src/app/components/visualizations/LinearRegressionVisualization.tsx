import React, { useRef, useState } from 'react';
import { useSpring, useSprings, animated, config } from '@react-spring/web';

// Utility to calculate regression line (least squares)
function calculateRegression(points: { x: number; y: number }[]) {
  const n = points.length;
  if (n === 0) return { slope: 0, intercept: 0 };
  const sumX = points.reduce((acc, p) => acc + p.x, 0);
  const sumY = points.reduce((acc, p) => acc + p.y, 0);
  const sumXY = points.reduce((acc, p) => acc + p.x * p.y, 0);
  const sumX2 = points.reduce((acc, p) => acc + p.x * p.x, 0);
  const meanX = sumX / n;
  const meanY = sumY / n;
  const denominator = sumX2 - sumX * meanX;
  if (denominator === 0) return { slope: 0, intercept: meanY };
  const slope = (sumXY - sumX * meanY) / denominator;
  const intercept = meanY - slope * meanX;
  return { slope, intercept };
}

// Utility to calculate R^2 (coefficient of determination)
function calculateR2(points: { x: number; y: number }[], slope: number, intercept: number) {
  const n = points.length;
  if (n < 2) return 1;
  const meanY = points.reduce((acc, p) => acc + p.y, 0) / n;
  let ssTot = 0;
  let ssRes = 0;
  for (const p of points) {
    const yPred = slope * p.x + intercept;
    ssTot += (p.y - meanY) ** 2;
    ssRes += (p.y - yPred) ** 2;
  }
  if (ssTot === 0) return 1;
  return 1 - ssRes / ssTot;
}

// Initial single dot in the center
function getInitialPoints() {
  return [
    { x: 10, y: 11 },
  ];
}

const WIDTH = 700;
const HEIGHT = 400;
const PADDING = 40;
const X_MIN = 0;
const X_MAX = 20;
const Y_MIN = 0;
const Y_MAX = 22;

function scaleX(x: number) {
  return PADDING + ((x - X_MIN) / (X_MAX - X_MIN)) * (WIDTH - 2 * PADDING);
}
function scaleY(y: number) {
  // SVG y=0 is top, so invert
  return HEIGHT - PADDING - ((y - Y_MIN) / (Y_MAX - Y_MIN)) * (HEIGHT - 2 * PADDING);
}
function unscaleX(px: number) {
  return X_MIN + ((px - PADDING) / (WIDTH - 2 * PADDING)) * (X_MAX - X_MIN);
}
function unscaleY(py: number) {
  return Y_MIN + ((HEIGHT - PADDING - py) / (HEIGHT - 2 * PADDING)) * (Y_MAX - Y_MIN);
}

const PURPLE = '#a259ec';

const DOT_RADIUS = 8;

const LinearRegressionVisualization: React.FC = () => {
  const [points, setPoints] = useState(getInitialPoints());
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const { slope, intercept } = calculateRegression(points);
  const r2 = calculateR2(points, slope, intercept);

  // Calculate line endpoints for the regression line
  const x1 = X_MIN;
  const y1 = slope * x1 + intercept;
  const x2 = X_MAX;
  const y2 = slope * x2 + intercept;

  // For prediction: next x = max(x) + 1
  const maxX = points.length > 0 ? Math.max(...points.map(p => p.x)) : 0;
  const nextX = maxX + 1;
  const nextY = slope * nextX + intercept;

  // Animations for regression line
  const lineSpring = useSpring({
    x1: scaleX(x1),
    y1: scaleY(y1),
    x2: scaleX(x2),
    y2: scaleY(y2),
    config: config.stiff
  });

  // Animations for points and error bars using useSprings
  const springs = useSprings(
    points.length,
    points.map((p) => {
      const yPred = slope * p.x + intercept;
      return {
        cx: scaleX(p.x),
        cy: scaleY(p.y),
        cyPred: scaleY(yPred),
        config: config.stiff,
      };
    })
  );

  // Animation for R^2 bar
  const r2Spring = useSpring({
    width: `${Math.max(0, Math.min(1, r2)) * 100}%`,
    background: r2 > 0.8 
  ? 'linear-gradient(90deg, #a259ec, #1e3a8a)'  // dark blue instead of green
  : r2 > 0.5 
    ? 'linear-gradient(90deg, #a259ec, #f9ea8f)' 
    : 'linear-gradient(90deg, #a259ec, #ff6b6b)',
config: config.stiff
  });

  // Add point on click (if not clicking on a dot)
  function handleSvgClick(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
    if (dragIndex !== null) return; // Don't add while dragging
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    // Check if click is on an existing dot
    for (let i = 0; i < points.length; i++) {
      const dotX = scaleX(points[i].x);
      const dotY = scaleY(points[i].y);
      if (Math.hypot(dotX - px, dotY - py) < DOT_RADIUS + 4) {
        return;
      }
    }
    const x = Math.max(X_MIN, Math.min(X_MAX, unscaleX(px)));
    const y = Math.max(Y_MIN, Math.min(Y_MAX, unscaleY(py)));
    setPoints([...points, { x, y }]);
  }

  function handleReset() {
    setPoints(getInitialPoints());
  }

  // Drag logic
  function handlePointerDown(e: React.PointerEvent<SVGCircleElement>, idx: number) {
    setDragIndex(idx);
    (e.target as SVGElement).setPointerCapture(e.pointerId);
  }
  function handlePointerMove(e: React.PointerEvent<SVGSVGElement>) {
    if (dragIndex === null) return;
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const x = Math.max(X_MIN, Math.min(X_MAX, unscaleX(px)));
    const y = Math.max(Y_MIN, Math.min(Y_MAX, unscaleY(py)));
    setPoints((pts) => pts.map((pt, i) => (i === dragIndex ? { x, y } : pt)));
  }
  function handlePointerUp() {
    setDragIndex(null);
  }

  // Draw axes ticks
  const xTicks = Array.from({ length: X_MAX / 2 + 1 }, (_, i) => i * 2);
  const yTicks = Array.from({ length: Y_MAX / 5 + 1 }, (_, i) => i * 5);

  return (
    <div className="flex flex-col items-center">
      {/* R^2 bar and Reset button */}
      <div className="mb-2 w-full flex flex-col items-center">
        <div className="flex items-center gap-4 w-full max-w-xl">
          <div className="flex-1">
            <div className="bg-gray-800 rounded-lg px-4 py-2 flex flex-col gap-1 shadow relative overflow-hidden">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-white font-semibold">R²:</span>
                <span className="text-purple-300 font-mono text-lg">{r2.toFixed(4)}</span>
              </div>
              <div className="w-full h-3 bg-gray-700 rounded relative overflow-hidden">
                <animated.div style={{ ...r2Spring, height: '100%', borderRadius: 6, position: 'absolute', left: 0, top: 0 }} />
              </div>
            </div>
          </div>
          <button
            className="px-4 py-2 rounded bg-purple-600 text-white font-semibold hover:bg-purple-700 transition whitespace-nowrap"
            onClick={handleReset}
          >
            Reset Graph
          </button>
        </div>
      </div>
      <svg
        ref={svgRef}
        width={WIDTH}
        height={HEIGHT}
        style={{ background: '#101727', borderRadius: 12, boxShadow: '0 2px 8px #0002', cursor: dragIndex === null ? 'crosshair' : 'grabbing' }}
        onClick={handleSvgClick}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* Axes */}
        <line x1={scaleX(X_MIN)} y1={scaleY(Y_MIN)} x2={scaleX(X_MIN)} y2={scaleY(Y_MAX)} stroke="#fff" strokeWidth={2} />
        <line x1={scaleX(X_MIN)} y1={scaleY(Y_MIN)} x2={scaleX(X_MAX)} y2={scaleY(Y_MIN)} stroke="#fff" strokeWidth={2} />
        {/* X ticks */}
        {xTicks.map((x) => (
          <g key={x}>
            <line x1={scaleX(x)} y1={scaleY(Y_MIN)} x2={scaleX(x)} y2={scaleY(Y_MIN) + 6} stroke="#fff" />
            <text x={scaleX(x)} y={scaleY(Y_MIN) + 20} fontSize={14} textAnchor="middle" fill="#fff">{x}</text>
          </g>
        ))}
        {/* Y ticks */}
        {yTicks.map((y) => (
          <g key={y}>
            <line x1={scaleX(X_MIN) - 6} y1={scaleY(y)} x2={scaleX(X_MIN)} y2={scaleY(y)} stroke="#fff" />
            <text x={scaleX(X_MIN) - 12} y={scaleY(y) + 5} fontSize={14} textAnchor="end" fill="#fff">{y}</text>
          </g>
        ))}
        {/* Regression line (animated) */}
        <animated.line
          x1={lineSpring.x1}
          y1={lineSpring.y1}
          x2={lineSpring.x2}
          y2={lineSpring.y2}
          stroke={PURPLE}
          strokeWidth={3}
        />
        {/* Error bars and Points (animated) */}
        {springs.map((spring, i) => (
          <g key={i}>
            {/* Error bar (vertical line from point to regression line) */}
            <animated.line
              x1={spring.cx}
              y1={spring.cy}
              x2={spring.cx}
              y2={spring.cyPred}
              stroke="#ff6b6b"
              strokeWidth={2}
              opacity={0.8}
            />
            {/* Data point (draggable) */}
            <animated.circle
              cx={spring.cx}
              cy={spring.cy}
              r={DOT_RADIUS}
              fill={PURPLE}
              stroke="#fff"
              strokeWidth={2}
              style={{ cursor: 'grab' }}
              onPointerDown={(e) => handlePointerDown(e, i)}
            />
          </g>
        ))}
      </svg>
      <div className="mt-4 flex flex-col items-center gap-2 w-full max-w-xl">
        <div className="mt-2 text-white text-sm">
          <span className="font-semibold">Next prediction:</span> For x = {nextX.toFixed(2)}, y = {nextY.toFixed(2)}
        </div>
      </div>
      <div className="mt-2 text-white text-sm">Click anywhere on the graph to add a new data point. Drag a dot to move it. The regression line will update automatically.</div>
    </div>
  );
};

export default LinearRegressionVisualization;

