import React, { useState, useEffect, useRef, useMemo, JSX } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as d3 from 'd3';
import classNames from 'classnames';

// Types for data and tree nodes
export type DataPoint = {
  x: number;
  y: number;
  label: 0 | 1;
};

export type DecisionTreeVisualizerProps = {
  data?: DataPoint[];
  maxDepth?: number;
  minSamplesSplit?: number;
  autoPlay?: boolean;
  animationSpeed?: number; // ms per step
};

// Utility: Generate synthetic 2D data
function generateSyntheticData(n = 100): DataPoint[] {
  const data: DataPoint[] = [];
  for (let i = 0; i < n; i++) {
    const x = d3.randomNormal(50, 15)();
    const y = d3.randomNormal(50, 15)();
    // Simple rule: label 1 if x + y > 100, else 0
    const label = x + y > 100 ? 1 : 0;
    data.push({ x, y, label });
  }
  return data;
}

// Entropy calculation
function entropy(points: DataPoint[]): number {
  if (points.length === 0) return 0;
  const count0 = points.filter(p => p.label === 0).length;
  const count1 = points.length - count0;
  const p0 = count0 / points.length;
  const p1 = count1 / points.length;
  let ent = 0;
  if (p0 > 0) ent -= p0 * Math.log2(p0);
  if (p1 > 0) ent -= p1 * Math.log2(p1);
  return ent;
}

// Find best split for a set of points using information gain (entropy reduction)
function findBestSplit(points: DataPoint[]): {
  axis: 'x' | 'y';
  threshold: number;
  entropy: number;
  left: DataPoint[];
  right: DataPoint[];
  entropyLeft: number;
  entropyRight: number;
  infoGain: number;
} | null {
  if (points.length < 2) return null;
  let bestInfoGain = -Infinity;
  let bestAxis: 'x' | 'y' = 'x';
  let bestThreshold = 0;
  let bestLeft: DataPoint[] = [];
  let bestRight: DataPoint[] = [];
  let bestEntropyLeft = 0;
  let bestEntropyRight = 0;
  let bestEntropy = 0;

  const parentEntropy = entropy(points);

  for (const axis of ['x', 'y'] as const) {
    const sorted = [...points].sort((a, b) => a[axis] - b[axis]);
    for (let i = 1; i < sorted.length; i++) {
      const threshold = (sorted[i - 1][axis] + sorted[i][axis]) / 2;
      const left = sorted.filter(p => p[axis] <= threshold);
      const right = sorted.filter(p => p[axis] > threshold);
      if (left.length === 0 || right.length === 0) continue;
      const entropyLeft = entropy(left);
      const entropyRight = entropy(right);
      const weightedEntropy = (left.length * entropyLeft + right.length * entropyRight) / points.length;
      const infoGain = parentEntropy - weightedEntropy;
      if (infoGain > bestInfoGain) {
        bestInfoGain = infoGain;
        bestAxis = axis;
        bestThreshold = threshold;
        bestLeft = left;
        bestRight = right;
        bestEntropyLeft = entropyLeft;
        bestEntropyRight = entropyRight;
        bestEntropy = parentEntropy;
      }
    }
  }
  if (bestLeft.length === 0 || bestRight.length === 0) return null;
  return {
    axis: bestAxis,
    threshold: bestThreshold,
    entropy: bestEntropy,
    left: bestLeft,
    right: bestRight,
    entropyLeft: bestEntropyLeft,
    entropyRight: bestEntropyRight,
    infoGain: bestInfoGain,
  };
}

// Tree node type
interface TreeNode {
  id: number;
  depth: number;
  points: DataPoint[];
  split?: {
    axis: 'x' | 'y';
    threshold: number;
    gini: number;
    giniLeft: number;
    giniRight: number;
  };
  left?: TreeNode;
  right?: TreeNode;
  isLeaf: boolean;
  label?: 0 | 1;
}

// Build the tree and record the sequence of splits for animation
function buildTree(
  points: DataPoint[],
  maxDepth: number,
  minSamplesSplit: number,
  depth = 0,
  nodeId = { current: 0 },
  splitSequence: any[] = []
): TreeNode {
  const id = nodeId.current++;
  const ent = entropy(points);
  const label = points.length > 0 ? (points.filter(p => p.label === 1).length >= points.length / 2 ? 1 : 0) : 0;
  if (
    depth >= maxDepth ||
    points.length < minSamplesSplit ||
    ent === 0
  ) {
    return { id, depth, points, isLeaf: true, label };
  }
  const split = findBestSplit(points);
  if (!split) {
    return { id, depth, points, isLeaf: true, label };
  }
  splitSequence.push({
    nodeId: id,
    depth,
    axis: split.axis,
    threshold: split.threshold,
    entropy: split.entropy,
    entropyLeft: split.entropyLeft,
    entropyRight: split.entropyRight,
    infoGain: split.infoGain,
    leftCount: split.left.length,
    rightCount: split.right.length,
    points,
    left: split.left,
    right: split.right,
  });
  const left = buildTree(split.left, maxDepth, minSamplesSplit, depth + 1, nodeId, splitSequence);
  const right = buildTree(split.right, maxDepth, minSamplesSplit, depth + 1, nodeId, splitSequence);
  return {
    id,
    depth,
    points,
    split: {
      axis: split.axis,
      threshold: split.threshold,
      gini: 0, // not used
      giniLeft: 0,
      giniRight: 0,
    },
    left,
    right,
    isLeaf: false,
  };
}

// Map data to SVG coordinates
function getScales(data: DataPoint[], width: number, height: number) {
  const xExtent = d3.extent(data, (d: DataPoint) => d.x) as [number, number];
  const yExtent = d3.extent(data, (d: DataPoint) => d.y) as [number, number];
  const xScale = d3.scaleLinear().domain(xExtent).range([40, width - 20]);
  const yScale = d3.scaleLinear().domain(yExtent).range([height - 30, 20]);
  return { xScale, yScale };
}

// Main component
const DecisionTreeVisualizer: React.FC<DecisionTreeVisualizerProps> = ({
  data: propData,
  maxDepth = 3,
  minSamplesSplit = 2,
  autoPlay = false,
  animationSpeed = 1200,
}) => {
  // Data setup
  const [data, setData] = useState<DataPoint[] | null>(propData ?? null);
  const [splitStep, setSplitStep] = useState(0);
  const [playing, setPlaying] = useState(autoPlay);
  const [hoveredTreeNode, setHoveredTreeNode] = useState<number | undefined>(undefined);
  const splitSequence = useRef<any[]>([]);

  // Initialize data if not provided
  useEffect(() => {
    if (!propData) {
      setData(generateSyntheticData(120));
    }
  }, [propData]);

  // Build tree
  const tree = useMemo(() => {
    if (!data) return null;
    splitSequence.current = [];
    const nodeId = { current: 0 };
    const t = buildTree(data, maxDepth, minSamplesSplit, 0, nodeId, splitSequence.current);
    return t;
  }, [data, maxDepth, minSamplesSplit]);

  // Animation auto-play
  useEffect(() => {
    if (!playing || !data) return;
    if (splitStep >= splitSequence.current.length) return;
    const timer = setTimeout(() => {
      setSplitStep(s => Math.min(s + 1, splitSequence.current.length));
    }, animationSpeed);
    return () => clearTimeout(timer);
  }, [playing, splitStep, animationSpeed, data]);

  // Find points for hovered node
  const hoveredPoints = useMemo(() => {
    if (hoveredTreeNode == null || !tree) return null;
    // Traverse tree to find node
    function findNode(node: TreeNode | undefined): TreeNode | undefined {
      if (!node) return undefined;
      if (node.id === hoveredTreeNode) return node;
      return findNode(node.left) || findNode(node.right);
    }
    return findNode(tree)?.points ?? null;
  }, [hoveredTreeNode, tree]);

  // SVG scales
  const width = 420, height = 340;
  const { xScale, yScale } = useMemo(() => {
    if (!data) return { xScale: null, yScale: null };
    return getScales(data, width, height);
  }, [data]);

  // Current split info
  const currentSplit = splitSequence.current[splitStep - 1];
  const highlightedPoints: DataPoint[] = currentSplit ? currentSplit.points : data;

  // Controls
  const handleNext = () => setSplitStep(s => Math.min(s + 1, splitSequence.current.length));
  const handlePrev = () => setSplitStep(s => Math.max(s - 1, 0));
  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => setSplitStep(Number(e.target.value));
  const handlePlay = () => setPlaying(p => !p);

  // Helper: Draw splitting line
  function renderSplitLine(split: any) {
    if (!split || !xScale || !yScale) return null;
    if (split.axis === 'x') {
      const x = xScale(split.threshold);
      return <line x1={x} y1={20} x2={x} y2={height - 30} stroke="#f59e42" strokeDasharray="6 3" strokeWidth={2} />;
    } else {
      const y = yScale(split.threshold);
      return <line x1={40} y1={y} x2={width - 20} y2={y} stroke="#f59e42" strokeDasharray="6 3" strokeWidth={2} />;
    }
  }

  // Helper: Draw points
  function renderPoints(points: DataPoint[], highlight: boolean) {
    if (!xScale || !yScale) return null;
    return points.map((p, i) => (
      <motion.circle
        key={i}
        cx={xScale(p.x)}
        cy={yScale(p.y)}
        r={highlight ? 7 : 5}
        fill={p.label === 1 ? '#2563eb' : '#f59e42'}
        stroke={highlight ? '#fbbf24' : '#fff'}
        strokeWidth={highlight ? 2.5 : 1}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      />
    ));
  }

  // Helper: Draw tree diagram recursively
  function renderTree(
    node: TreeNode,
    x: number,
    y: number,
    xStep: number,
    yStep: number,
    highlightId?: number
  ): JSX.Element {
    const isHighlighted = highlightId === node.id;
    const nodeColor = node.isLeaf ? (node.label === 1 ? '#2563eb' : '#f59e42') : '#64748b';
    return (
      <g key={node.id}>
        {/* Node circle */}
        <circle
          cx={x}
          cy={y}
          r={18}
          fill={nodeColor}
          stroke={isHighlighted ? '#fbbf24' : '#fff'}
          strokeWidth={isHighlighted ? 4 : 2}
          style={{ cursor: 'pointer' }}
          onMouseEnter={() => setHoveredTreeNode(node.id)}
          onMouseLeave={() => setHoveredTreeNode(undefined)}
        />
        {/* Node label */}
        <text x={x} y={y +35} textAnchor="middle" fontSize={node.isLeaf ? 15 : 13} fill="#fff">
          {node.isLeaf ? `Class ${node.label}` : `${node.split?.axis} ≤ ${node.split?.threshold.toFixed(2)}`}
        </text>
        {/* Children and connecting lines */}
        {node.left && (
          <>
            <line x1={x} y1={y + 18} x2={x - xStep} y2={y + yStep - 18} stroke="#64748b" strokeWidth={2} />
            {renderTree(node.left, x - xStep, y + yStep, xStep / 1.5, yStep, highlightId)}
          </>
        )}
        {node.right && (
          <>
            <line x1={x} y1={y + 18} x2={x + xStep} y2={y + yStep - 18} stroke="#64748b" strokeWidth={2} />
            {renderTree(node.right, x + xStep, y + yStep, xStep / 1.5, yStep, highlightId)}
          </>
        )}
      </g>
    );
  }

  // Early return if data is not ready
  if (!data || !tree || !xScale || !yScale) {
    return <div>Loading...</div>;
  }

  // --- Render ---
  return (
    <div className="flex flex-col w-full" style={{ background: 'rgb(17, 24, 39)' }}>
      {/* Visualization area */}
      <div className="flex flex-col md:flex-row">
        {/* Left: Data plot */}
        <div className="bg-gray-800 p-4 flex flex-col items-center">
          <svg width={width} height={height} className="bg-gray-900 rounded">
            {/* Axes */}
            <g>
              <text x={width / 2} y={height - 5} textAnchor="middle" fontSize={13} fill="#64748b">x</text>
              <text x={15} y={height / 2} textAnchor="middle" fontSize={13} fill="#64748b" transform={`rotate(-90 15,${height / 2})`}>y</text>
            </g>
            {/* All points (faded) */}
            <g opacity={0.18}>{renderPoints(data, false)}</g>
            {/* Highlighted points (current split or hovered node) */}
            <g>{renderPoints(hoveredPoints ?? highlightedPoints, true)}</g>
            {/* Splitting line (if any) */}
            <g>{renderSplitLine(currentSplit)}</g>
          </svg>
          {/* Tooltip/sidebar for split info */}
          <div className="mt-3 w-[340px] min-h-[20px] bg-gray-900 rounded p-2 text-sm text-white">
            {currentSplit ? (
              <>
                <div className="font-semibold mb-1">Split: <span className="text-blue-600">{currentSplit.axis} ≤ {currentSplit.threshold.toFixed(2)}</span></div>
                <div>Entropy before: <span className="font-mono">{currentSplit.entropy.toFixed(3)}</span></div>
                <div>Entropy left: <span className="font-mono">{currentSplit.entropyLeft.toFixed(3)}</span> ({currentSplit.leftCount} pts)</div>
                <div>Entropy right: <span className="font-mono">{currentSplit.entropyRight.toFixed(3)}</span> ({currentSplit.rightCount} pts)</div>
                <div>Info gain: <span className="font-mono">{currentSplit.infoGain.toFixed(3)}</span></div>
              </>
            ) : (
              <div className="text-slate-400">No split yet. Press &quot;Next Split&quot; to begin.</div>
            )}
          </div>
        </div>
        {/* Right: Tree diagram */}
        <div className="bg-gray-800 p-4 flex flex-col items-center w-full">
          <svg width={340} height={height} className="bg-gray-900 rounded">
            {renderTree(tree, 170, 30, 80, 80, hoveredTreeNode)}
          </svg>
          <div className="text-xs text-slate-400 mt-2">Hover a node to highlight its region</div>
        </div>
      </div>

      {/* Controls - now spans full width */}
      <div className="bg-gray-800 p-4 border-t border-gray-700">
        <div className="max-w-4xl mx-auto">
          {/* Controls */}
          <div className="flex items-center justify-center gap-3 mb-2">
            <button
              className="px-3 py-1 rounded bg-slate-200 hover:bg-slate-300 text-slate-700"
              onClick={handlePrev}
              disabled={splitStep === 0}
            >Previous Split</button>
            <button
              className="px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white"
              onClick={handleNext}
              disabled={splitStep === splitSequence.current.length}
            >Next Split</button>
            <button
              className={classNames(
                'px-3 py-1 rounded',
                playing ? 'bg-orange-400 hover:bg-orange-500 text-white' : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
              )}
              onClick={handlePlay}
            >{playing ? 'Pause' : 'Play'}</button>
          </div>
          <div className="flex items-center gap-2 w-full">
            <input
              type="range"
              min={0}
              max={splitSequence.current.length}
              value={splitStep}
              onChange={handleSlider}
              className="w-full accent-blue-500"
            />
            <span className="text-xs text-slate-500">{splitStep}/{splitSequence.current.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecisionTreeVisualizer;

// ---
// Major blocks:
// 1. Data generation: generateSyntheticData()
// 2. Split computation: findBestSplit(), giniImpurity(), buildTree()
// 3. Animation & controls: useState/useEffect for step, play, slider
// 4. Rendering: SVG for plot & tree, framer-motion for point animation, Tailwind for styling
// ---
