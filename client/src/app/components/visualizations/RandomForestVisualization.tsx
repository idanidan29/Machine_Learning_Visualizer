import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Types
interface Point {
  x: number;
  y: number;
}

type Feature = 'x' | 'y';

interface TreeNode {
  id: number;
  feature: Feature | 'leaf';
  threshold: number;
  left?: TreeNode;
  right?: TreeNode;
  prediction?: number;
}

interface Tree {
  root: TreeNode;
}

const COLORS = {
  class0: '#4ECDC4', // Turquoise
  class1: '#FF6B6B', // Coral
  background: '#18181b',
  grid: '#27272a',
  text: '#fff',
  accent: '#9810fa', // Theme purple
  highlight: '#FFD93D', // Yellow highlight
  node: {
    root: '#9810fa', // Theme purple
    leaf: {
      class0: '#4ECDC4', // Turquoise
      class1: '#FF6B6B', // Coral
    }
  },
  button: {
    primary: '#9810fa', // Theme purple
    hover: '#7a0dc7', // Darker theme purple
  }
};

const WIDTH = 340;
const HEIGHT = 340;

const RandomForestVisualization: React.FC = () => {
  // State
  const [trees, setTrees] = useState<Tree[]>([]);
  const [testPoint, setTestPoint] = useState<Point>({ x: 0, y: 0 });
  const [votes, setVotes] = useState<number[]>([]);
  const [winner, setWinner] = useState<number | null>(null);
  const [numTrees, setNumTrees] = useState(3);

  // Initialize trees
  useEffect(() => {
    generateForest();
  }, [numTrees]);

  // Generate a random forest
  const generateForest = () => {
    const newTrees: Tree[] = [];
    for (let i = 0; i < numTrees; i++) {
      newTrees.push(makeTree());
    }
    setTrees(newTrees);
  };

  // Make a simple random tree
  function makeTree(): Tree {
    const feature: Feature = Math.random() > 0.5 ? 'x' : 'y';
    const threshold = (Math.random() - 0.5) * 10;
    
    // Create meaningful predictions based on the feature and threshold
    const leftPrediction = feature === 'x' 
      ? (threshold < 0 ? 1 : 0)  // If x threshold is negative, left side predicts 1
      : (threshold > 0 ? 1 : 0); // If y threshold is positive, left side predicts 1
    
    const rightPrediction = 1 - leftPrediction; // Opposite of left prediction
    
    return {
      root: {
        id: Math.random(),
        feature,
        threshold,
        left: {
          id: Math.random(),
          feature: 'leaf',
          threshold: 0,
          prediction: leftPrediction,
        },
        right: {
          id: Math.random(),
          feature: 'leaf',
          threshold: 0,
          prediction: rightPrediction,
        },
      },
    };
  }

  // Handle test point input
  const handleTestPoint = () => {
    const treeVotes = trees.map(tree => {
      let node = tree.root;
      while (node.feature !== 'leaf') {
        node = testPoint[node.feature] <= node.threshold ? node.left! : node.right!;
      }
      return node.prediction!;
    });
    setVotes(treeVotes);
    const count0 = treeVotes.filter(v => v === 0).length;
    const count1 = treeVotes.filter(v => v === 1).length;
    setWinner(count1 > count0 ? 1 : 0);
  };

  // Draw a stylized tree as SVG
  function drawTree(tree: Tree, idx: number): React.ReactElement {
    const { root } = tree;
    const cx = WIDTH / 2;
    const cy = 60;
    const yStep = 60;
    const xStep = 60;
    return (
      <svg width={WIDTH} height={HEIGHT / 2} className="bg-gray-900 rounded-lg shadow-lg">
        {/* Root node */}
        <circle cx={cx} cy={cy} r={22} fill={COLORS.node.root} stroke="#fff" strokeWidth={2} />
        <text x={cx} y={cy - 26} textAnchor="middle" fontSize={16} fill="#fff">
          {root.feature === 'x' ? 'x' : 'y'}
          <tspan fontSize={12} dx={4} dy={-4}>≤</tspan>
          {root.threshold.toFixed(1)}
        </text>
        {/* Edges */}
        <line x1={cx} y1={cy + 22} x2={cx - xStep} y2={cy + yStep - 22} stroke="#fff" strokeWidth={2} />
        <line x1={cx} y1={cy + 22} x2={cx + xStep} y2={cy + yStep - 22} stroke="#fff" strokeWidth={2} />
        {/* Left leaf */}
        <circle cx={cx - xStep} cy={cy + yStep} r={18} fill={root.left!.prediction! > 0.5 ? COLORS.node.leaf.class1 : COLORS.node.leaf.class0} stroke="#fff" strokeWidth={2} />
        <text x={cx - xStep} y={cy + yStep + 5} textAnchor="middle" fontSize={14} fill="#18181b">
          {root.left!.prediction! > 0.5 ? '1' : '0'}
        </text>
        {/* Right leaf */}
        <circle cx={cx + xStep} cy={cy + yStep} r={18} fill={root.right!.prediction! > 0.5 ? COLORS.node.leaf.class1 : COLORS.node.leaf.class0} stroke="#fff" strokeWidth={2} />
        <text x={cx + xStep} y={cy + yStep + 5} textAnchor="middle" fontSize={14} fill="#18181b">
          {root.right!.prediction! > 0.5 ? '1' : '0'}
        </text>
        {/* Highlight path if test point */}
        {votes.length > 0 && root.feature !== 'leaf' && (
          (() => {
            const highlight: React.ReactElement[] = [];
            if (testPoint[root.feature] <= root.threshold) {
              // Left
              highlight.push(
                <motion.line
                  key="hl"
                  x1={cx}
                  y1={cy + 22}
                  x2={cx - xStep}
                  y2={cy + yStep - 22}
                  stroke={COLORS.highlight}
                  strokeWidth={5}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.2 }}
                />
              );
              highlight.push(
                <motion.circle
                  key="hlc"
                  cx={cx - xStep}
                  cy={cy + yStep}
                  r={22}
                  fill="none"
                  stroke={COLORS.highlight}
                  strokeWidth={4}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.2 + 0.2 }}
                />
              );
            } else {
              // Right
              highlight.push(
                <motion.line
                  key="hr"
                  x1={cx}
                  y1={cy + 22}
                  x2={cx + xStep}
                  y2={cy + yStep - 22}
                  stroke={COLORS.highlight}
                  strokeWidth={5}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.2 }}
                />
              );
              highlight.push(
                <motion.circle
                  key="hrc"
                  cx={cx + xStep}
                  cy={cy + yStep}
                  r={22}
                  fill="none"
                  stroke={COLORS.highlight}
                  strokeWidth={4}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.2 + 0.2 }}
                />
              );
            }
            return highlight;
          })()
        )}
      </svg>
    );
  }

  // Draw votes
  function drawVotes() {
    return (
      <div className="flex justify-center gap-8 mt-2">
        {votes.map((v, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6 + i * 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold shadow-lg ${v === 1 ? 'bg-[#FF6B6B] text-white' : 'bg-[#4ECDC4] text-gray-900'}`}>{v}</div>
            <div className="text-xs text-gray-400 mt-1">Tree {i + 1}</div>
          </motion.div>
        ))}
      </div>
    );
  }

  // Draw winner
  function drawWinner() {
    if (winner === null) return null;
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2 }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1.5rem' }}
      >
        <div className={`px-8 py-4 rounded-2xl text-3xl font-extrabold shadow-2xl ${winner === 1 ? 'bg-[#FF6B6B] text-white' : 'bg-[#4ECDC4] text-gray-900'}`}
          style={{ border: `4px solid ${COLORS.highlight}`, boxShadow: `0 0 40px ${COLORS.highlight}55` }}>
          Winner: {winner}
        </div>
        <div className="mt-2 text-lg text-gray-300">(Majority vote)</div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h2 className="text-2xl font-bold text-white">Random Forest Voting Demo</h2>
      </div>

      {/* Controls */}
      <div className="bg-gray-800 rounded-lg p-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Number of Trees: {numTrees}
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={numTrees}
              onChange={(e) => setNumTrees(parseInt(e.target.value))}
              className="w-full accent-[#9810fa]"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              X Coordinate: {testPoint.x.toFixed(1)}
            </label>
            <input
              type="range"
              min="-5"
              max="5"
              step="0.1"
              value={testPoint.x}
              onChange={(e) => setTestPoint(prev => ({ ...prev, x: parseFloat(e.target.value) }))}
              className="w-full accent-[#9810fa]"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Y Coordinate: {testPoint.y.toFixed(1)}
            </label>
            <input
              type="range"
              min="-5"
              max="5"
              step="0.1"
              value={testPoint.y}
              onChange={(e) => setTestPoint(prev => ({ ...prev, y: parseFloat(e.target.value) }))}
              className="w-full accent-[#9810fa]"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleTestPoint}
            className="px-6 py-2 rounded-lg bg-[#9810fa] hover:bg-[#7a0dc7] text-white transition-colors text-lg font-semibold"
          >
            Test Point
          </button>
        </div>
      </div>

      {/* Trees and voting */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-row gap-6 justify-center flex-wrap">
          {trees.map((tree, i) => (
            <div key={i} className="flex flex-col items-center">
              {drawTree(tree, i)}
              <div className="mt-2 text-gray-300 font-semibold">Tree {i + 1}</div>
            </div>
          ))}
        </div>
        {votes.length > 0 && drawVotes()}
        {drawWinner()}
      </div>
    </div>
  );
};

export default RandomForestVisualization;
