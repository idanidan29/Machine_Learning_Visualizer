import React, { useState, useRef, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';

interface Neuron {
  id: string;
  layer: number;
  x: number;
  y: number;
  activation: number;
}

interface Connection {
  from: string;
  to: string;
  weight: number;
}

// Simplified network configuration
const WIDTH = 1200;
const HEIGHT = 500;
const LAYER_SPACING = 250;
const NEURON_SPACING = 80;
const NEURON_RADIUS = 25;
const LAYER_COUNT = 4;
const NEURONS_PER_LAYER = [3, 6, 6, 2]; // More neurons: 3 inputs, 6 hidden1, 6 hidden2, 2 outputs
const LEFT_OFFSET = (WIDTH - (LAYER_COUNT - 1) * LAYER_SPACING) / 2; // Center the network horizontally

const LAYER_NAMES = ['Input', 'Hidden 1', 'Hidden 2', 'Output'];
const LAYER_COLORS = ['#4CAF50', '#2196F3', '#9C27B0', '#FF9800']; // Green, Blue, Purple, Orange

const DeepNeuralNetworksVisualization: React.FC = () => {
  const [neurons, setNeurons] = useState<Neuron[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [isTraining, setIsTraining] = useState(false);
  const [epoch, setEpoch] = useState(0);
  const [loss, setLoss] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [accuracyHistory, setAccuracyHistory] = useState<number[]>([]);
  const [inputValues, setInputValues] = useState<number[]>([0.5, 0.5, 0.5]); // Updated for 3 inputs
  const [targetValue, setTargetValue] = useState(0.7);
  const animationFrameRef = useRef<number | null>(null);
  const [trainingSpeed, setTrainingSpeed] = useState(100); // ms between iterations
  const [isPaused, setIsPaused] = useState(false);

  // Initialize network
  useEffect(() => {
    const newNeurons: Neuron[] = [];
    const newConnections: Connection[] = [];

    // Create neurons
    for (let layer = 0; layer < LAYER_COUNT; layer++) {
      const layerNeurons = NEURONS_PER_LAYER[layer];
      const layerWidth = LEFT_OFFSET + LAYER_SPACING * layer;
      const totalHeight = (layerNeurons - 1) * NEURON_SPACING;
      const startY = (HEIGHT - totalHeight) / 2; // Center neurons vertically

      for (let i = 0; i < layerNeurons; i++) {
        const y = startY + i * NEURON_SPACING;
        const id = `n${layer}-${i}`;
        newNeurons.push({
          id,
          layer,
          x: layerWidth,
          y,
          activation: 0
        });

        // Create connections to next layer
        if (layer < LAYER_COUNT - 1) {
          const nextLayerNeurons = NEURONS_PER_LAYER[layer + 1];
          for (let j = 0; j < nextLayerNeurons; j++) {
            newConnections.push({
              from: id,
              to: `n${layer + 1}-${j}`,
              weight: Math.random() * 2 - 1
            });
          }
        }
      }
    }
    setNeurons(newNeurons);
    setConnections(newConnections);
  }, []);

  // Forward propagation
  const forwardPropagate = () => {
    const newNeurons = [...neurons];
    // Set input layer activations
    for (let i = 0; i < NEURONS_PER_LAYER[0]; i++) {
      newNeurons[i].activation = inputValues[i];
    }
    // Propagate through hidden layers
    for (let layer = 1; layer < LAYER_COUNT; layer++) {
      const layerStart = NEURONS_PER_LAYER.slice(0, layer).reduce((a, b) => a + b, 0);
      const layerNeurons = NEURONS_PER_LAYER[layer];
      for (let i = 0; i < layerNeurons; i++) {
        const neuronIndex = layerStart + i;
        let sum = 0;
        // Sum weighted inputs from previous layer
        connections
          .filter(conn => conn.to === newNeurons[neuronIndex].id)
          .forEach(conn => {
            const fromNeuron = newNeurons.find(n => n.id === conn.from);
            if (fromNeuron) {
              sum += fromNeuron.activation * conn.weight;
            }
          });
        // Apply ReLU activation
        newNeurons[neuronIndex].activation = Math.max(0, sum);
      }
    }
    setNeurons(newNeurons);
    return newNeurons.slice(-NEURONS_PER_LAYER[LAYER_COUNT - 1]).map(n => n.activation);
  };

  // Training loop
  const train = () => {
    if (!isTraining || isPaused) return;
    const outputArr = forwardPropagate();
    const error = outputArr.map(o => targetValue - o);
    const newLoss = error.reduce((acc, e) => acc + e * e, 0) / error.length;
    
    // Calculate accuracy (how close the output is to the target)
    const newAccuracy = 100 * (1 - Math.min(1, Math.abs(error[0])));
    setAccuracy(newAccuracy);
    setAccuracyHistory(prev => {
      const newHistory = [...prev, newAccuracy];
      return newHistory.slice(-50); // Keep last 50 points
    });
    
    setLoss(newLoss);
    setEpoch(prev => prev + 1);
    
    // Update weights (simplified)
    const newConnections = connections.map(conn => ({
      ...conn,
      weight: conn.weight + 0.01 * error[0] * (Math.random() - 0.5)
    }));
    setConnections(newConnections);
    
    // Add delay between iterations
    setTimeout(() => {
      animationFrameRef.current = requestAnimationFrame(train);
    }, trainingSpeed);
  };

  // Reset training
  const resetTraining = () => {
    setEpoch(0);
    setLoss(0);
    setAccuracy(0);
    setAccuracyHistory([]);
    // Reset weights
    const newConnections = connections.map(conn => ({
      ...conn,
      weight: Math.random() * 2 - 1
    }));
    setConnections(newConnections);
  };

  useEffect(() => {
    if (isTraining) {
      animationFrameRef.current = requestAnimationFrame(train);
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isTraining]);

  return (
    <div className="flex flex-col items-center w-full p-6 bg-gray-900 min-h-screen">
      {/* Controls */}
      <div className="mb-8 w-full max-w-3xl flex flex-col gap-6 bg-gray-800 p-6 rounded-xl shadow-lg">
        <div className="flex flex-wrap gap-8 justify-center">
          {inputValues.map((val, idx) => (
            <div className="flex flex-col gap-2" key={idx}>
              <label className="text-white text-sm font-semibold">Input {idx + 1}:</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={val}
                onChange={e => setInputValues(inputValues.map((v, i) => i === idx ? parseFloat(e.target.value) : v))}
                className="w-32 accent-green-500"
              />
              <span className="text-green-400 text-sm">{val.toFixed(1)}</span>
            </div>
          ))}
          <div className="flex flex-col gap-2">
            <label className="text-white text-sm font-semibold">Target:</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={targetValue}
              onChange={e => setTargetValue(parseFloat(e.target.value))}
              className="w-32 accent-orange-500"
            />
            <span className="text-orange-400 text-sm">{targetValue.toFixed(1)}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-center items-center">
          <div className="flex flex-col gap-2">
            <label className="text-white text-sm font-semibold">Training Speed:</label>
            <input
              type="range"
              min="50"
              max="500"
              step="50"
              value={trainingSpeed}
              onChange={e => setTrainingSpeed(parseInt(e.target.value))}
              className="w-32 accent-blue-500"
            />
            <span className="text-blue-400 text-sm">{trainingSpeed}ms</span>
          </div>

          <div className="flex gap-4">
            <button
              className={`px-6 py-3 rounded-lg ${
                isTraining 
                  ? (isPaused ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-red-600 hover:bg-red-700')
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white font-semibold transition shadow-lg hover:shadow-xl`}
              onClick={() => {
                if (isTraining) {
                  setIsPaused(!isPaused);
                } else {
                  setIsTraining(true);
                  setIsPaused(false);
                }
              }}
            >
              {isTraining ? (isPaused ? '▶️ Resume' : '⏸️ Pause') : '▶️ Start Training'}
            </button>
            <button
              className="px-6 py-3 rounded-lg bg-gray-600 hover:bg-gray-700 text-white font-semibold transition shadow-lg hover:shadow-xl"
              onClick={resetTraining}
            >
              🔄 Reset
            </button>
          </div>
        </div>
      </div>

      {/* Network Visualization */}
      <div className="w-full flex justify-center items-center">
        <div className="relative" style={{ 
          width: WIDTH,
          height: HEIGHT,
          margin: '0 auto'
        }}>
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            style={{
              display: 'block',
              background: '#1a1a2e',
              borderRadius: 16,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}
          >
            {/* Layer Labels */}
            {Array.from({ length: LAYER_COUNT }).map((_, layer) => (
              <text
                key={layer}
                x={LEFT_OFFSET + layer * LAYER_SPACING}
                y={0}
                textAnchor="middle"
                fill="#fff"
                fontSize={18}
                fontWeight="bold"
              >
                {LAYER_NAMES[layer]}
              </text>
            ))}

            {/* Connections */}
            {connections.map((conn, i) => {
              const fromNeuron = neurons.find(n => n.id === conn.from);
              const toNeuron = neurons.find(n => n.id === conn.to);
              if (!fromNeuron || !toNeuron) return null;
              return (
                <line
                  key={i}
                  x1={fromNeuron.x}
                  y1={fromNeuron.y}
                  x2={toNeuron.x}
                  y2={toNeuron.y}
                  stroke="#4a4a6a"
                  strokeWidth={1.5}
                  opacity={0.6}
                />
              );
            })}

            {/* Neurons */}
            {neurons.map((neuron, i) => (
              <g key={neuron.id}>
                <circle
                  cx={neuron.x}
                  cy={neuron.y}
                  r={NEURON_RADIUS}
                  fill={LAYER_COLORS[neuron.layer]}
                  stroke="#fff"
                  strokeWidth={2}
                  style={{
                    filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.2))'
                  }}
                />
                <text
                  x={neuron.x}
                  y={neuron.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#fff"
                  fontSize={12}
                  fontWeight="bold"
                >
                  {neuron.activation.toFixed(2)}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* Training Info */}
      <div className="mt-8 w-full max-w-3xl flex justify-between items-center gap-4">
        <div className="bg-gray-800 rounded-xl p-4 flex-1 text-center">
          <div className="text-sm text-gray-400">Epoch</div>
          <div className="text-2xl font-bold text-blue-400">{epoch}</div>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 flex-1 text-center">
          <div className="text-sm text-gray-400">Loss</div>
          <div className="text-2xl font-bold text-red-400">{loss.toFixed(4)}</div>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 flex-1 text-center">
          <div className="text-sm text-gray-400">Accuracy</div>
          <div className="text-2xl font-bold text-green-400">{accuracy.toFixed(1)}%</div>
        </div>
      </div>

      {/* Accuracy Graph */}
      <div className="mt-8 w-full max-w-3xl bg-gray-800 rounded-xl p-4">
        <div className="text-sm text-gray-400 mb-2">Accuracy Over Time</div>
        <div className="h-32 relative">
          <svg width="100%" height="100%" className="rounded-lg">
            <defs>
              <linearGradient id="accuracyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4CAF50" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#4CAF50" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            {/* Background grid */}
            <g className="text-gray-600">
              {[0, 25, 50, 75, 100].map((y) => (
                <g key={y}>
                  <line
                    x1="0"
                    y1={`${100 - y}%`}
                    x2="100%"
                    y2={`${100 - y}%`}
                    stroke="currentColor"
                    strokeWidth="0.5"
                    strokeDasharray="4"
                  />
                  <text
                    x="2%"
                    y={`${100 - y}%`}
                    className="text-xs"
                    fill="currentColor"
                  >
                    {y}%
                  </text>
                </g>
              ))}
            </g>
            {/* Accuracy line */}
            <path
              d={accuracyHistory.map((acc, i) => {
                const x = (i / (accuracyHistory.length - 1 || 1)) * 100;
                const y = 100 - acc;
                return `${i === 0 ? 'M' : 'L'} ${x}% ${y}%`;
              }).join(' ')}
              fill="none"
              stroke="#4CAF50"
              strokeWidth="2"
            />
            {/* Gradient fill */}
            <path
              d={`${accuracyHistory.map((acc, i) => {
                const x = (i / (accuracyHistory.length - 1 || 1)) * 100;
                const y = 100 - acc;
                return `${i === 0 ? 'M' : 'L'} ${x}% ${y}%`;
              }).join(' ')} L 100% 100% L 0% 100% Z`}
              fill="url(#accuracyGradient)"
              stroke="none"
              opacity="0.3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default DeepNeuralNetworksVisualization; 