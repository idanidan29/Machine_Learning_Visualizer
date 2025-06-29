import React, { useState, useRef, useEffect } from 'react';


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

interface DeepNeuralNetworksVisualizationProps {
  hideExplanation?: boolean;
}

// Simplified network configuration
const WIDTH = 1200;
const HEIGHT = 500;
const LAYER_SPACING = 250;
const NEURON_SPACING = 80;
const BASE_NEURON_RADIUS = 25;
const LAYER_COUNT = 4;
const NEURONS_PER_LAYER = [3, 6, 6, 2];
const LEFT_OFFSET = (WIDTH - (LAYER_COUNT - 1) * LAYER_SPACING) / 2;
const VERTICAL_OFFSET = 80; // New offset for moving network down

const LAYER_NAMES = ['Input', 'Hidden 1', 'Hidden 2', 'Output'];
const LAYER_COLORS = ['#4CAF50', '#2196F3', '#9C27B0', '#FF9800'];

// Single pattern for focused visualization
const DEMO_PATTERN = { inputs: [0.3, 0.6, 0.9], target: 0.7 };

const DeepNeuralNetworksVisualization: React.FC<DeepNeuralNetworksVisualizationProps> = ({ hideExplanation = false }) => {
  const [neurons, setNeurons] = useState<Neuron[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [isTraining] = useState(true);
  const [, setEpoch] = useState(0);
  const [, setLoss] = useState(0);
  const [, setAccuracy] = useState(0);
  const animationFrameRef = useRef<number | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Input Layer",
      description: "Receives data and passes it forward",
      color: "text-green-400",
      layer: 0
    },
    {
      title: "Hidden Layer 1",
      description: "Identifies basic patterns",
      color: "text-blue-400",
      layer: 1
    },
    {
      title: "Hidden Layer 2",
      description: "Combines patterns into features",
      color: "text-purple-400",
      layer: 2
    },
    {
      title: "Output Layer",
      description: "Produces final results",
      color: "text-orange-400",
      layer: 3
    }
  ];

  // Initialize network
  useEffect(() => {
    const newNeurons: Neuron[] = [];
    const newConnections: Connection[] = [];

    // Create neurons
    for (let layer = 0; layer < LAYER_COUNT; layer++) {
      const layerNeurons = NEURONS_PER_LAYER[layer];
      const layerWidth = LEFT_OFFSET + LAYER_SPACING * layer;
      const totalHeight = (layerNeurons - 1) * NEURON_SPACING;
      const startY = (HEIGHT - totalHeight) / 2;

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
    setIsInitialized(true);
  }, []);

  // Forward propagation
  const forwardPropagate = (inputs: number[]) => {
    if (!isInitialized || neurons.length === 0) return [];

    const newNeurons = [...neurons];
    
    // Set input layer activations
    for (let i = 0; i < NEURONS_PER_LAYER[0]; i++) {
      const inputNeuron = newNeurons[i];
      if (inputNeuron) {
        inputNeuron.activation = inputs[i];
      }
    }

    // Propagate through hidden layers
    for (let layer = 1; layer < LAYER_COUNT; layer++) {
      const layerStart = NEURONS_PER_LAYER.slice(0, layer).reduce((a, b) => a + b, 0);
      const layerNeurons = NEURONS_PER_LAYER[layer];
      
      for (let i = 0; i < layerNeurons; i++) {
        const neuronIndex = layerStart + i;
        const neuron = newNeurons[neuronIndex];
        if (!neuron) continue;

        let sum = 0;
        connections
          .filter(conn => conn.to === neuron.id)
          .forEach(conn => {
            const fromNeuron = newNeurons.find(n => n.id === conn.from);
            if (fromNeuron) {
              sum += fromNeuron.activation * conn.weight;
            }
          });
        
        // Apply sigmoid activation with a small random noise to ensure changes
        const noise = (Math.random() - 0.5) * 0.01;
        neuron.activation = 1 / (1 + Math.exp(-sum)) + noise;
      }
    }

    setNeurons(newNeurons);
    return newNeurons.slice(-NEURONS_PER_LAYER[LAYER_COUNT - 1]).map(n => n.activation);
  };

  // Training loop
  const train = () => {
    if (!isTraining || !isInitialized || neurons.length === 0) return;

    // Forward propagation
    const outputArr = forwardPropagate(DEMO_PATTERN.inputs);
    if (outputArr.length === 0) return;

    const error = outputArr.map(o => DEMO_PATTERN.target - o);
    const newLoss = error.reduce((acc, e) => acc + e * e, 0) / error.length;
    
    // Calculate accuracy (how close we are to target)
    const newAccuracy = Math.max(0, 100 * (1 - newLoss));
    
    setLoss(newLoss);
    setAccuracy(newAccuracy);
    setEpoch(prev => prev + 1);
    
    // Backpropagation with adaptive learning rate
    const baseLearningRate = 0.1;
    const learningRate = baseLearningRate * (1 - newAccuracy / 100); // Decrease learning rate as accuracy improves
    const newConnections = [...connections];
    const newNeurons = [...neurons];
    
    // Calculate gradients and update weights
    for (let layer = LAYER_COUNT - 1; layer > 0; layer--) {
      const layerStart = NEURONS_PER_LAYER.slice(0, layer).reduce((a, b) => a + b, 0);
      const layerNeurons = NEURONS_PER_LAYER[layer];
      
      for (let i = 0; i < layerNeurons; i++) {
        const neuronIndex = layerStart + i;
        const neuron = newNeurons[neuronIndex];
        if (!neuron) continue;
        
        let errorGradient: number;
        if (layer === LAYER_COUNT - 1) {
          errorGradient = error[i] * neuron.activation * (1 - neuron.activation);
        } else {
          errorGradient = 0;
          connections
            .filter(conn => conn.from === neuron.id)
            .forEach(conn => {
              const toNeuron = newNeurons.find(n => n.id === conn.to);
              if (toNeuron) {
                errorGradient += toNeuron.activation * (1 - toNeuron.activation) * conn.weight;
              }
            });
        }
        
        // Update weights with momentum
        connections
          .filter(conn => conn.to === neuron.id)
          .forEach(conn => {
            const fromNeuron = newNeurons.find(n => n.id === conn.from);
            if (fromNeuron) {
              const weightGradient = errorGradient * fromNeuron.activation;
              const connIndex = newConnections.findIndex(c => c.from === conn.from && c.to === conn.to);
              if (connIndex !== -1) {
                // Add momentum to weight updates
                const momentum = 0.9; // Momentum factor
                const weightChange = learningRate * weightGradient;
                newConnections[connIndex] = {
                  ...newConnections[connIndex],
                  weight: newConnections[connIndex].weight + weightChange + momentum * weightChange
                };
              }
            }
          });

        // Update neuron activation
        let sum = 0;
        newConnections
          .filter(conn => conn.to === neuron.id)
          .forEach(conn => {
            const fromNeuron = newNeurons.find(n => n.id === conn.from);
            if (fromNeuron) {
              sum += fromNeuron.activation * conn.weight;
            }
          });
        neuron.activation = 1 / (1 + Math.exp(-sum));
      }
    }
    
    // Update state with new values
    setConnections(newConnections);
    setNeurons(newNeurons);
    
    // Schedule next training iteration
    setTimeout(() => {
      animationFrameRef.current = requestAnimationFrame(train);
    }, 200);
  };

  // Reset training

  useEffect(() => {
    if (isTraining && isInitialized) {
      animationFrameRef.current = requestAnimationFrame(train);
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isTraining, isInitialized]);

  return (
    <div className="flex flex-col items-center w-full p-6 bg-gray-900 min-h-screen">

      {/* Network Visualization */}
      <div className="w-full flex justify-center items-center">
        <div className="relative" style={{ 
          width: WIDTH,
          height: HEIGHT,
          margin: '0 auto'
        }}>
          {/* Step Guide */}
          {!hideExplanation && (
            <div className="absolute top-0 left-0 right-0 flex justify-center pt-5">
              <div className="bg-gray-800/90 backdrop-blur-sm rounded-lg p-3 shadow-xl border border-gray-700 w-[600px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full ${steps[currentStep].color.replace('text-', 'bg-')}`} />
                    <h3 className={`text-base font-semibold ${steps[currentStep].color}`}>
                      {steps[currentStep].title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-gray-300 text-sm">
                      {steps[currentStep].description}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setCurrentStep(prev => (prev > 0 ? prev - 1 : prev))}
                        className="p-1 rounded-lg hover:bg-gray-700/50 transition-colors disabled:opacity-50 disabled:hover:bg-transparent"
                        disabled={currentStep === 0}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <div className="flex gap-1.5 pt-1.5">
                        {steps.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentStep(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              index === currentStep 
                                ? 'bg-blue-500 scale-125' 
                                : 'bg-gray-600 hover:bg-gray-500'
                            }`}
                          />
                        ))}
                      </div>
                      <button
                        onClick={() => setCurrentStep(prev => (prev < steps.length - 1 ? prev + 1 : prev))}
                        className="p-1 rounded-lg hover:bg-gray-700/50 transition-colors disabled:opacity-50 disabled:hover:bg-transparent"
                        disabled={currentStep === steps.length - 1}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

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
                y={40}
                textAnchor="middle"
                fill={layer === steps[currentStep].layer ? "#9C27B0" : "#fff"}
                fontSize={18}
                fontWeight="bold"
                className="transition-colors duration-300"
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
                  y1={fromNeuron.y + VERTICAL_OFFSET}
                  x2={toNeuron.x}
                  y2={toNeuron.y + VERTICAL_OFFSET}
                  stroke="#4a4a6a"
                  strokeWidth={1.5}
                  opacity={0.6}
                  className="transition-all duration-300"
                />
              );
            })}

            {/* Neurons */}
            {neurons.map((neuron) => {
              const radius = BASE_NEURON_RADIUS * (0.5 + neuron.activation * 0.5);
              const isCurrentLayer = neuron.layer === steps[currentStep].layer;
              
              return (
                <g key={neuron.id}>
                  <circle
                    cx={neuron.x}
                    cy={neuron.y + VERTICAL_OFFSET}
                    r={radius}
                    fill={LAYER_COLORS[neuron.layer]}
                    stroke={isCurrentLayer ? "#fff" : "#4a4a6a"}
                    strokeWidth={isCurrentLayer ? 3 : 2}
                    style={{
                      filter: isCurrentLayer ? 'drop-shadow(0 0 12px rgba(255, 255, 255, 0.4))' : 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.2))'
                    }}
                    className="transition-all duration-300"
                  />
                  <text
                    x={neuron.x}
                    y={neuron.y + VERTICAL_OFFSET}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#fff"
                    fontSize={12}
                    fontWeight="bold"
                  >
                    {neuron.activation.toFixed(2)}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default DeepNeuralNetworksVisualization; 