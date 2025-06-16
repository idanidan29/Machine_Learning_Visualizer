import React, { useState, useEffect } from 'react';

interface SingleNeuronVisualizationProps {
  className?: string;
}

const SingleNeuronVisualization: React.FC<SingleNeuronVisualizationProps> = ({ className = '' }) => {
  const [inputs, setInputs] = useState<number[]>([0.5, 0.3, 0.7]);
  const [weights, setWeights] = useState<number[]>([0.2, 0.4, 0.6]);
  const [bias, setBias] = useState<number>(0.1);
  const [output, setOutput] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isTraining, setIsTraining] = useState<boolean>(false);
  const [targetOutput, setTargetOutput] = useState<number>(0.8);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [error, setError] = useState<number>(0);
  const [epoch, setEpoch] = useState<number>(0);

  const calculateOutput = () => {
    const weightedSum = inputs.reduce((sum, input, index) => sum + input * weights[index], 0) + bias;
    const activatedOutput = 1 / (1 + Math.exp(-weightedSum)); // Sigmoid activation
    setOutput(activatedOutput);
    setError(Math.abs(targetOutput - activatedOutput));
  };

  const trainNeuron = () => {
    const weightedSum = inputs.reduce((sum, input, index) => sum + input * weights[index], 0) + bias;
    const currentOutput = 1 / (1 + Math.exp(-weightedSum));
    const error = targetOutput - currentOutput;
    
    // Update weights using gradient descent
    const newWeights = weights.map((weight, index) => {
      const gradient = error * currentOutput * (1 - currentOutput) * inputs[index];
      return weight + learningRate * gradient;
    });
    
    // Update bias
    const biasGradient = error * currentOutput * (1 - currentOutput);
    const newBias = bias + learningRate * biasGradient;

    setWeights(newWeights);
    setBias(newBias);
    setEpoch(prev => prev + 1);
  };

  useEffect(() => {
    calculateOutput();
  }, [inputs, weights, bias]);

  useEffect(() => {
    let trainingInterval: NodeJS.Timeout;
    if (isTraining) {
      trainingInterval = setInterval(() => {
        trainNeuron();
      }, 500);
    }
    return () => {
      if (trainingInterval) clearInterval(trainingInterval);
    };
  }, [isTraining, inputs, targetOutput, learningRate]);

  const handleInputChange = (index: number, value: number) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
    animateCalculation();
  };

  const handleTargetChange = (value: number) => {
    setTargetOutput(value);
    setEpoch(0);
  };

  const handleLearningRateChange = (value: number) => {
    setLearningRate(value);
    setEpoch(0);
  };

  const animateCalculation = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className={`bg-gray-800 rounded-xl p-6 ${className}`}>
      <h3 className="text-xl font-semibold text-white mb-4 text-center">Single Neuron Visualization</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Controls and Neuron */}
        <div className="space-y-6">
          {/* Training Controls */}
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={() => setIsTraining(!isTraining)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  isTraining 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-green-500 hover:bg-green-600'
                }`}
              >
                {isTraining ? 'Stop Training' : 'Start Training'}
              </button>
              <div className="text-gray-300">
                Epoch: {epoch}
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="text-gray-300 text-sm mb-1 block">Target Output: {targetOutput.toFixed(2)}</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={targetOutput}
                  onChange={(e) => handleTargetChange(parseFloat(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>
              <div>
                <label className="text-gray-300 text-sm mb-1 block">Learning Rate: {learningRate.toFixed(2)}</label>
                <input
                  type="range"
                  min="0.01"
                  max="0.5"
                  step="0.01"
                  value={learningRate}
                  onChange={(e) => handleLearningRateChange(parseFloat(e.target.value))}
                  className="w-full accent-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Neuron with Bias */}
          <div className="flex flex-col items-center">
            <div className={`w-32 h-32 bg-green-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg transition-all duration-500 ${isAnimating ? 'scale-110' : ''}`}>
              <div className="text-center">
                <div className="text-sm mb-1">Output</div>
                <div className="text-2xl">{output.toFixed(3)}</div>
                <div className="text-xs mt-1">Error: {error.toFixed(3)}</div>
              </div>
            </div>
            <div className="mt-4 flex flex-col items-center">
              <div className="text-gray-400 text-sm mb-2">Bias</div>
              <div className="w-24 h-8 bg-green-400 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">
                {bias.toFixed(3)}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Inputs and Weights */}
        <div className="space-y-6">
          {/* Inputs and Weights Grid */}
          <div className="grid grid-cols-3 gap-4">
            {inputs.map((input, index) => (
              <div key={`input-weight-${index}`} className="flex flex-col items-center space-y-2">
                <div className="text-gray-400 text-sm">Input {index + 1}</div>
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg transition-all duration-300 hover:scale-105">
                  {input.toFixed(2)}
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={input}
                  onChange={(e) => handleInputChange(index, parseFloat(e.target.value))}
                  className="w-16 accent-blue-500"
                />
                <div className="w-16 h-10 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">
                  {weights[index].toFixed(3)}
                </div>
                <div className="text-gray-400 text-sm">Weight {index + 1}</div>
              </div>
            ))}
          </div>

          {/* Explanation */}
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-white mb-2">How It Learns</h4>
            <div className="text-gray-300 text-sm space-y-2">
              <p>1. Set a target output (what you want the neuron to learn)</p>
              <p>2. The neuron calculates its current output</p>
              <p>3. It adjusts weights and bias to reduce the error</p>
              <p>4. This process repeats until the output matches the target</p>
            </div>
            <div className="mt-3 p-2 bg-gray-600/50 rounded">
              <p className="text-gray-300 text-sm">
                <span className="text-green-400 font-semibold">Try it:</span> Set a target output and start training. Watch how the weights automatically adjust to make the neuron&apos;s output match the target.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleNeuronVisualization; 