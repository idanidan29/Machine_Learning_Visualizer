'use client';

import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface Point {
  x: number;
  y: number;
  class: number;
  probability?: number;
  features?: { [key: string]: number };
}

interface ClassBoundary {
  points: THREE.Vector2[];
  color: string;
  probability?: number;
}

const PointSphere: React.FC<{ 
  position: [number, number, number]; 
  color: string;
  probability?: number;
  size?: number;
}> = ({ position, color, probability, size = 0.25 }) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial 
        color={color} 
        emissive={color}
        emissiveIntensity={0.2}
        metalness={0.3}
        roughness={0.4}
        transparent={probability !== undefined}
        opacity={probability !== undefined ? 0.5 + (probability * 0.5) : 1}
      />
    </mesh>
  );
};

const ProbabilitySurface: React.FC<{
  points: Point[];
  resolution: number;
  showClass: number;
}> = ({ points, resolution, showClass }) => {
  const vertices: number[] = [];
  const colors: number[] = [];
  const indices: number[] = [];

  // Create a grid of points
  for (let i = 0; i < resolution; i++) {
    for (let j = 0; j < resolution; j++) {
      const x = (i / (resolution - 1) - 0.5) * 10;
      const y = (j / (resolution - 1) - 0.5) * 10;
      
      // Calculate probability at this point
      const probability = calculateProbabilityAtPoint(x, y, points, showClass);
      
      // Ensure all values are valid numbers
      if (!isNaN(probability)) {
        vertices.push(x, y, probability * 2); // Scale height for visibility
        
        // Color based on probability
        const color = new THREE.Color(showClass === 0 ? '#FF6B6B' : '#4ECDC4');
        color.multiplyScalar(0.5 + probability * 0.5);
        colors.push(color.r, color.g, color.b);
      } else {
        // Fallback values if probability is NaN
        vertices.push(x, y, 0);
        const color = new THREE.Color(showClass === 0 ? '#FF6B6B' : '#4ECDC4');
        colors.push(color.r, color.g, color.b);
      }
    }
  }

  // Create triangles only if we have valid vertices
  if (vertices.length > 0) {
    for (let i = 0; i < resolution - 1; i++) {
      for (let j = 0; j < resolution - 1; j++) {
        const a = i * resolution + j;
        const b = a + 1;
        const c = a + resolution;
        const d = c + 1;

        // Only add triangles if all vertices are valid
        if (a < vertices.length / 3 && b < vertices.length / 3 && 
            c < vertices.length / 3 && d < vertices.length / 3) {
          indices.push(a, b, c);
          indices.push(b, d, c);
        }
      }
    }
  }

  return (
    <mesh>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={vertices.length / 3}
          array={new Float32Array(vertices)}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={new Float32Array(colors)}
          itemSize={3}
        />
        <bufferAttribute
          attach="index"
          count={indices.length}
          array={new Uint32Array(indices)}
          itemSize={1}
        />
      </bufferGeometry>
      <meshStandardMaterial
        vertexColors
        transparent
        opacity={0.5}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const calculateProbabilityAtPoint = (x: number, y: number, points: Point[], targetClass: number): number => {
  const classPoints = points.filter(p => p.class === targetClass);
  const otherClassPoints = points.filter(p => p.class !== targetClass);

  // Handle edge cases
  if (classPoints.length === 0) return 0;

  // Calculate mean and standard deviation for each class
  const classMean = {
    x: classPoints.reduce((sum, p) => sum + p.x, 0) / classPoints.length,
    y: classPoints.reduce((sum, p) => sum + p.y, 0) / classPoints.length
  };

  // Add small epsilon to prevent division by zero
  const epsilon = 1e-10;
  const classStd = {
    x: Math.sqrt(classPoints.reduce((sum, p) => sum + Math.pow(p.x - classMean.x, 2), 0) / classPoints.length) + epsilon,
    y: Math.sqrt(classPoints.reduce((sum, p) => sum + Math.pow(p.y - classMean.y, 2), 0) / classPoints.length) + epsilon
  };

  // Calculate probability using Gaussian distribution
  const probability = (1 / (2 * Math.PI * classStd.x * classStd.y)) *
    Math.exp(-0.5 * (
      Math.pow(x - classMean.x, 2) / Math.pow(classStd.x, 2) +
      Math.pow(y - classMean.y, 2) / Math.pow(classStd.y, 2)
    ));

  // Ensure probability is a valid number and within [0,1] range
  return Math.min(Math.max(probability * 100, 0), 1);
};

const Scene: React.FC<{
  points: Point[];
  boundaries: ClassBoundary[];
  showProbabilities: boolean;
  showProbabilitySurface: boolean;
  selectedClass: number;
}> = ({ points, boundaries, showProbabilities, showProbabilitySurface, selectedClass }) => {
  return (
    <>
      <ambientLight intensity={0.7} />
      <pointLight position={[10, 10, 10]} intensity={1.2} />
      <pointLight position={[-10, -10, -10]} intensity={0.8} />
      
      {showProbabilitySurface && (
        <ProbabilitySurface
          points={points}
          resolution={50}
          showClass={selectedClass}
        />
      )}

      {points.map((point, index) => (
        <PointSphere
          key={`point-${index}`}
          position={[point.x, point.y, 0]}
          color={point.class === 0 ? '#FF6B6B' : '#4ECDC4'}
          probability={showProbabilities ? point.probability : undefined}
          size={point.class === selectedClass ? 0.3 : 0.25}
        />
      ))}

      {boundaries.map((boundary, index) => (
        <mesh key={`boundary-${index}`}>
          <shapeGeometry args={[new THREE.Shape(boundary.points)]} />
          <meshBasicMaterial 
            color={boundary.color} 
            transparent 
            opacity={0.2} 
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </>
  );
};

const NaiveBayesVisualization: React.FC = () => {
  const [points, setPoints] = useState<Point[]>([]);
  const [boundaries, setBoundaries] = useState<ClassBoundary[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [showProbabilities, setShowProbabilities] = useState<boolean>(false);
  const [showProbabilitySurface, setShowProbabilitySurface] = useState<boolean>(false);
  const [selectedClass, setSelectedClass] = useState<number>(0);
  const [iteration, setIteration] = useState<number>(0);

  const generateRandomPoints = (count: number) => {
    const newPoints: Point[] = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      // Generate points in two distinct clusters
      const class_ = Math.random() < 0.5 ? 0 : 1;
      newPoints.push({ 
        x, 
        y, 
        class_,
        features: {
          feature1: x,
          feature2: y
        }
      });
    }
    return newPoints;
  };

  const calculateClassBoundaries = (points: Point[]) => {
    // Calculate decision boundary based on probability distributions
    const class0Points = points.filter(p => p.class === 0);
    const class1Points = points.filter(p => p.class === 1);

    const boundary0: ClassBoundary = {
      points: [
        new THREE.Vector2(-5, -5),
        new THREE.Vector2(0, -5),
        new THREE.Vector2(0, 5),
        new THREE.Vector2(-5, 5),
      ],
      color: '#FF6B6B'
    };

    const boundary1: ClassBoundary = {
      points: [
        new THREE.Vector2(0, -5),
        new THREE.Vector2(5, -5),
        new THREE.Vector2(5, 5),
        new THREE.Vector2(0, 5),
      ],
      color: '#4ECDC4'
    };

    return [boundary0, boundary1];
  };

  const calculateProbabilities = (points: Point[]) => {
    return points.map(point => {
      const class0Prob = calculateProbabilityAtPoint(point.x, point.y, points, 0);
      const class1Prob = calculateProbabilityAtPoint(point.x, point.y, points, 1);
      const totalProb = class0Prob + class1Prob;
      
      return {
        ...point,
        probability: point.class === 0 ? class0Prob / totalProb : class1Prob / totalProb
      };
    });
  };

  useEffect(() => {
    const newPoints = generateRandomPoints(100);
    setPoints(newPoints);
    setBoundaries(calculateClassBoundaries(newPoints));
  }, []);

  const handleStartPauseResume = () => {
    if (!isRunning) {
      setIsRunning(true);
      setShowProbabilities(true);
      setShowProbabilitySurface(true);
      setPoints(calculateProbabilities(points));
    } else {
      setIsRunning(false);
      setShowProbabilities(false);
      setShowProbabilitySurface(false);
    }
  };

  const handleReset = () => {
    const newPoints = generateRandomPoints(100);
    setPoints(newPoints);
    setBoundaries(calculateClassBoundaries(newPoints));
    setShowProbabilities(false);
    setShowProbabilitySurface(false);
    setIsRunning(false);
    setIteration(0);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-4 p-4 bg-gray-800/50 rounded-lg backdrop-blur-sm">
        <button
          onClick={handleStartPauseResume}
          className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
            isRunning
              ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/20'
              : 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-600/20'
          }`}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-2 rounded-md font-medium bg-gray-700 hover:bg-gray-600 text-white transition-all duration-200 shadow-lg shadow-gray-700/20"
        >
          Reset
        </button>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setSelectedClass(0)}
            className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
              selectedClass === 0
                ? 'bg-red-600 text-white'
                : 'bg-gray-700 text-gray-300'
            }`}
          >
            Class 0
          </button>
          <button
            onClick={() => setSelectedClass(1)}
            className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
              selectedClass === 1
                ? 'bg-teal-600 text-white'
                : 'bg-gray-700 text-gray-300'
            }`}
          >
            Class 1
          </button>
        </div>
      </div>

      <div className="relative w-full h-[400px] bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
        <Canvas>
          <PerspectiveCamera 
            makeDefault 
            position={[0, 0, 15]} 
            fov={50}
          />
          <OrbitControls 
            enablePan={true} 
            enableZoom={true} 
            enableRotate={false}
            dampingFactor={0.05}
            rotateSpeed={0.5}
            minDistance={15}
            maxDistance={30}
          />
          <Scene
            points={points}
            boundaries={boundaries}
            showProbabilities={showProbabilities}
            showProbabilitySurface={showProbabilitySurface}
            selectedClass={selectedClass}
          />
        </Canvas>
      </div>

      <div className="flex justify-center items-center space-x-4 text-gray-300 bg-gray-800/50 p-4 rounded-lg backdrop-blur-sm">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-purple-600 animate-pulse"></span>
          <span className="font-medium">Iteration: {iteration}</span>
        </div>
        {showProbabilities && (
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
            <span className="font-medium">Showing Probabilities</span>
          </div>
        )}
        {showProbabilitySurface && (
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="font-medium">Showing Probability Surface</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NaiveBayesVisualization; 