/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';


interface Point {
  x: number;
  y: number;
  z: number;
  cluster?: number;
  isNoise?: boolean;
}


const PointSphere: React.FC<{ 
  position: [number, number, number]; 
  color: string;
  is2D: boolean;
  isNoise?: boolean;
}> = ({ position, color, isNoise }) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.25, 16, 16]} />
      <meshStandardMaterial 
        color={color} 
        emissive={color}
        emissiveIntensity={0.2}
        metalness={0.3}
        roughness={0.4}
        transparent={isNoise}
        opacity={isNoise ? 0.5 : 1}
      />
    </mesh>
  );
};

const Scene: React.FC<{
  points: Point[];
  colors: string[];
  showClusters: boolean;
  is2D: boolean;
  eps: number;
}> = ({ points, colors, showClusters, is2D, eps }) => {
  return (
    <>
      <ambientLight intensity={0.7} />
      <pointLight position={[10, 10, 10]} intensity={1.2} />
      <pointLight position={[-10, -10, -10]} intensity={0.8} />
      
      {points.map((point, index) => (
        <PointSphere
          key={`point-${index}`}
          position={[
            point.x, 
            point.y, 
            is2D ? 0 : point.z
          ]}
          color={showClusters && point.cluster !== undefined 
            ? point.isNoise 
              ? '#666666'  // Gray for noise points
              : colors[point.cluster % colors.length]
            : '#ffffff'}
          is2D={is2D}
          isNoise={point.isNoise}
        />
      ))}

      {/* Draw eps radius for the first point (for visualization) */}
      {points.length > 0 && (
        <mesh position={[points[0].x, points[0].y, is2D ? 0.1 : points[0].z]}>
          <ringGeometry args={[eps - 0.1, eps, 32]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
        </mesh>
      )}
    </>
  );
};

const DBSCANVisualization: React.FC = () => {
  const [points, setPoints] = useState<Point[]>([]);
  const [eps, setEps] = useState<number>(1.5);
  const [minPts, setMinPts] = useState<number>(3);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [showClusters, setShowClusters] = useState<boolean>(false);
  const [is2D, setIs2D] = useState<boolean>(false);
  const [stepDelay, setStepDelay] = useState<number>(25);
  const [clusterCount, setClusterCount] = useState<number>(0);
  const [noiseCount, setNoiseCount] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [, setSteps] = useState<Point[][]>([]);
  const [currentPointIndex, setCurrentPointIndex] = useState<number>(0);
  const [currentSeedSet, setCurrentSeedSet] = useState<Set<number>>(new Set());
  const [currentClusterId, setCurrentClusterId] = useState<number>(0);
  const [shape, setShape] = useState<string>('clusters');

  const colors = [
    '#FF6B6B', // Bright Coral
    '#4ECDC4', // Turquoise
    '#FFD93D', // Bright Yellow
    '#95E1D3', // Mint
    '#FF8B94', // Salmon Pink
    '#A8E6CF', // Light Mint
    '#FFB6B9', // Light Pink
    '#6C5CE7', // Bright Purple
  ];

  const generateRandomPoints = (count: number) => {
    const newPoints: Point[] = [];
    
    switch (shape) {
      case 'clusters':
        // Generate points in 3 distinct clusters
        for (let i = 0; i < count; i++) {
          const cluster = Math.floor(i / (count / 3));
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.random() * 2;
          const centerX = (cluster - 1) * 5;
          const centerY = 0;
          
          newPoints.push({
            x: centerX + Math.cos(angle) * radius,
            y: centerY + Math.sin(angle) * radius,
            z: is2D ? 0 : (Math.random() - 0.5) * 2,
          });
        }
        break;

      case 'moon':
        // Generate points in a crescent moon shape
        for (let i = 0; i < count; i++) {
          const angle = Math.random() * Math.PI;
          const radius = 5 + Math.random() * 2;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          newPoints.push({
            x: x + (Math.random() - 0.5) * 0.5,
            y: y + (Math.random() - 0.5) * 0.5,
            z: is2D ? 0 : (Math.random() - 0.5) * 0.5,
          });
        }
        break;

      case 'rings':
        // Generate points in concentric rings with proportional distribution
        const ringCount = 2;
        const baseRadius = 2;
        const ringSpacing = 3;
        
        // Calculate points per ring based on circumference
        const pointsPerRing = Array.from({ length: ringCount }, (_, i) => {
          const radius = baseRadius + i * ringSpacing;
          const circumference = 2 * Math.PI * radius;
          return Math.floor((circumference / (2 * Math.PI * baseRadius)) * (count / ringCount));
        });
        
        // Adjust total points to match desired count
        const totalPoints = pointsPerRing.reduce((sum, points) => sum + points, 0);
        const scaleFactor = count / totalPoints;
        const scaledPointsPerRing = pointsPerRing.map(points => Math.floor(points * scaleFactor));
        
        for (let ring = 0; ring < ringCount; ring++) {
          const radius = baseRadius + ring * ringSpacing;
          const ringPoints = scaledPointsPerRing[ring];
          
          for (let i = 0; i < ringPoints; i++) {
            const angle = Math.random() * Math.PI * 2;
            const noise = (Math.random() - 0.5) * 0.2;
            
            newPoints.push({
              x: Math.cos(angle) * (radius + noise),
              y: Math.sin(angle) * (radius + noise),
              z: is2D ? 0 : (Math.random() - 0.5) * 0.5,
            });
          }
        }
        break;

      case 'noise':
        // Generate points with high noise to show DBSCAN's noise detection
        for (let i = 0; i < count; i++) {
          if (i < count * 0.7) {
            // 70% of points in clusters
            const cluster = Math.floor(i / (count * 0.7 / 2));
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * 1.5;
            const centerX = (cluster - 0.5) * 6;
            const centerY = 0;
            
            newPoints.push({
              x: centerX + Math.cos(angle) * radius,
              y: centerY + Math.sin(angle) * radius,
              z: is2D ? 0 : (Math.random() - 0.5) * 0.5,
            });
          } else {
            // 30% of points as noise
            newPoints.push({
              x: (Math.random() - 0.5) * 15,
              y: (Math.random() - 0.5) * 15,
              z: is2D ? 0 : (Math.random() - 0.5) * 0.5,
            });
          }
        }
        break;
    }
    
    return newPoints;
  };

  const calculateDistance = (p1: Point, p2: Point) => {
    if (is2D) {
      return Math.sqrt(
        Math.pow(p2.x - p1.x, 2) +
        Math.pow(p2.y - p1.y, 2)
      );
    }
    return Math.sqrt(
      Math.pow(p2.x - p1.x, 2) +
      Math.pow(p2.y - p1.y, 2) +
      Math.pow(p2.z - p1.z, 2)
    );
  };

  const getNeighbors = (point: Point, points: Point[]): number[] => {
    return points
      .map((p, index) => ({ point: p, index }))
      .filter(({ point: p }) => calculateDistance(point, p) <= eps)
      .map(({ index }) => index);
  };

  const initializeDBSCAN = () => {
    const newPoints = [...points];
    setSteps([[...newPoints]]);
    setCurrentPointIndex(0);
    setCurrentSeedSet(new Set());
    setCurrentClusterId(0);
    setCurrentStep(0);
    setClusterCount(0);
    setNoiseCount(0);
    setShowClusters(true);
  };

  const takeNextStep = () => {
    if (currentPointIndex >= points.length) {
      setIsRunning(false);
      return;
    }

    const newPoints = [...points];
    let newNoiseCount = noiseCount;
    let newClusterId = currentClusterId;
    let newSeedSet = new Set(currentSeedSet);
    let newPointIndex = currentPointIndex;

    // If we're processing a seed set
    if (newSeedSet.size > 0) {
      const currentPoint = Array.from(newSeedSet)[0];
      newSeedSet.delete(currentPoint);

      if (newPoints[currentPoint].cluster === -1) {
        newPoints[currentPoint].cluster = newClusterId - 1;
        newPoints[currentPoint].isNoise = false;
      }

      if (newPoints[currentPoint].cluster === undefined) {
        newPoints[currentPoint].cluster = newClusterId - 1;
        const currentNeighbors = getNeighbors(newPoints[currentPoint], newPoints);

        if (currentNeighbors.length >= minPts) {
          currentNeighbors.forEach(neighbor => {
            if (newPoints[neighbor].cluster === undefined) {
              newSeedSet.add(neighbor);
            }
          });
        }
      }
    } else {
      // Process next unvisited point
      if (newPoints[newPointIndex].cluster !== undefined) {
        newPointIndex++;
        setCurrentPointIndex(newPointIndex);
        setPoints(newPoints);
        setSteps(prev => [...prev, [...newPoints]]);
        setCurrentStep(prev => prev + 1);
        return;
      }

      const neighbors = getNeighbors(newPoints[newPointIndex], newPoints);
      
      if (neighbors.length < minPts) {
        newPoints[newPointIndex].cluster = -1;
        newPoints[newPointIndex].isNoise = true;
        newNoiseCount++;
      } else {
        newClusterId++;
        newPoints[newPointIndex].cluster = newClusterId - 1;
        newSeedSet = new Set(neighbors);
        newSeedSet.delete(newPointIndex);
      }
      newPointIndex++;
    }

    setPoints(newPoints);
    setSteps(prev => [...prev, [...newPoints]]);
    setCurrentPointIndex(newPointIndex);
    setCurrentSeedSet(newSeedSet);
    setCurrentClusterId(newClusterId);
    setNoiseCount(newNoiseCount);
    setClusterCount(newClusterId);
    setCurrentStep(prev => prev + 1);
  };

  useEffect(() => {
    if (isRunning && !isPaused) {
      const timer = setTimeout(() => {
        takeNextStep();
      }, stepDelay);
      return () => clearTimeout(timer);
    }
  }, [isRunning, isPaused, currentStep]);

  // Generate points when component mounts or shape changes
  useEffect(() => {
    setPoints(generateRandomPoints(shape === 'rings' ? 400 : 100));
    handleReset();
  }, [shape]);

  const handleStartPauseResume = () => {
    if (!isRunning && !isPaused) {
      setIsRunning(true);
      setIsPaused(false);
      initializeDBSCAN();
    } else if (isRunning && !isPaused) {
      setIsPaused(true);
    } else if (isPaused) {
      setIsPaused(false);
    }
  };

  const handleReset = () => {
    setPoints(generateRandomPoints(100));
    setShowClusters(false);
    setClusterCount(0);
    setNoiseCount(0);
    setIsRunning(false);
    setIsPaused(false);
    setCurrentStep(0);
    setSteps([]);
    setCurrentPointIndex(0);
    setCurrentSeedSet(new Set());
    setCurrentClusterId(0);
  };

  return (
    <div className="space-y-4">
      {/* Control Panel */}
      <div className="bg-gray-800/50 rounded-lg backdrop-blur-sm shadow-xl border border-gray-700/50">
        {/* Main Controls */}
        <div className="flex flex-wrap items-center justify-center p-3 border-b border-gray-700/50 gap-2">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={handleStartPauseResume}
              className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 text-sm flex items-center gap-2 ${
                isRunning && !isPaused
                  ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/20'
                  : 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-600/20'
              }`}
            >
              {isRunning && !isPaused ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                  Pause
                </>
              ) : isPaused ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  </svg>
                  Resume
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  </svg>
                  Start
                </>
              )}
            </button>
            <button
              onClick={handleReset}
              className="px-5 py-2.5 rounded-lg font-medium bg-gray-700 hover:bg-gray-600 text-white transition-all duration-200 shadow-lg shadow-gray-700/20 text-sm flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset
            </button>
            <div className="flex items-center gap-1.5 bg-gray-800/50 px-3 py-2 rounded-lg border border-gray-700/50">
              <button
                onClick={() => setIs2D(!is2D)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                  is2D
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                2D
              </button>
              <button
                onClick={() => setIs2D(!is2D)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                  !is2D
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                3D
              </button>
            </div>
          </div>
        </div>

        {/* Parameters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 p-2">
          {/* Shape Selector */}
          <div className="flex flex-col gap-1.5 bg-gray-800/50 p-2 rounded-lg border border-gray-700/50">
            <label className="text-gray-300 font-medium text-xs flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
              Shape
            </label>
            <select
              value={shape}
              onChange={(e) => setShape(e.target.value)}
              className="bg-gray-700 text-gray-300 rounded-md px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-purple-600"
              disabled={isRunning && !isPaused}
            >
              <option value="clusters">Clusters</option>
              <option value="moon">Crescent Moon</option>
              <option value="rings">Concentric Rings</option>
              <option value="noise">Noisy Clusters</option>
            </select>
          </div>

          {/* Epsilon Control */}
          <div className="flex flex-col gap-1.5 bg-gray-800/50 p-2 rounded-lg border border-gray-700/50">
            <label htmlFor="eps-value" className="text-gray-300 font-medium text-xs flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Epsilon (ε)
            </label>
            <div className="flex items-center gap-1.5">
              <input
                id="eps-value"
                type="range"
                min="0.5"
                max="3"
                step="0.1"
                value={eps}
                onChange={(e) => setEps(parseFloat(e.target.value))}
                className="flex-1 accent-purple-600"
                disabled={isRunning && !isPaused}
              />
              <span className="text-gray-300 text-xs font-mono bg-gray-900/50 px-1 py-0.5 rounded min-w-[2rem] text-center">{eps.toFixed(1)}</span>
            </div>
          </div>

          {/* MinPts Control */}
          <div className="flex flex-col gap-1.5 bg-gray-800/50 p-2 rounded-lg border border-gray-700/50">
            <label htmlFor="minpts-value" className="text-gray-300 font-medium text-xs flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              MinPts
            </label>
            <div className="flex items-center gap-1.5">
              <input
                id="minpts-value"
                type="range"
                min="2"
                max="10"
                step="1"
                value={minPts}
                onChange={(e) => setMinPts(parseInt(e.target.value))}
                className="flex-1 accent-purple-600"
                disabled={isRunning && !isPaused}
              />
              <span className="text-gray-300 text-xs font-mono bg-gray-900/50 px-1 py-0.5 rounded min-w-[1.5rem] text-center">{minPts}</span>
            </div>
          </div>

          {/* Step Controls */}
          <div className="flex flex-col gap-1.5 bg-gray-800/50 p-2 rounded-lg border border-gray-700/50">
            <label htmlFor="step-delay" className="text-gray-300 font-medium text-xs flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Step Delay
            </label>
            <div className="flex items-center gap-1.5">
              <input
                id="step-delay"
                type="range"
                min="25"
                max="300"
                step="25"
                value={stepDelay}
                onChange={(e) => setStepDelay(parseInt(e.target.value))}
                className="flex-1 accent-purple-600"
                disabled={isRunning && !isPaused}
              />
              <span className="text-gray-300 text-xs font-mono bg-gray-900/50 px-1 py-0.5 rounded min-w-[2rem] text-center">{stepDelay}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visualization Canvas */}
      <div className="relative bg-gray-900 rounded-lg overflow-hidden shadow-xl border border-gray-700/50" style={{ height: '500px' }}>
        <Canvas>
          <PerspectiveCamera 
            makeDefault 
            position={is2D ? [0, 0, 20] : [0, 0, 15]} 
            fov={is2D ? 50 : 75}
          />
          <OrbitControls 
            enablePan={true} 
            enableZoom={true} 
            enableRotate={!is2D}
            dampingFactor={0.05}
            rotateSpeed={0.5}
            minDistance={is2D ? 15 : 5}
            maxDistance={is2D ? 30 : 30}
          />
          <Scene
            points={points}
            colors={colors}
            showClusters={showClusters}
            is2D={is2D}
            eps={eps}
          />
        </Canvas>
      </div>

      {/* Status Bar */}
      <div className="flex flex-wrap justify-center items-center gap-4 text-gray-300 bg-gray-800/50 p-4 rounded-lg backdrop-blur-sm border border-gray-700/50">
        <div className="flex items-center gap-2 bg-gray-900/50 px-3 py-1.5 rounded-lg">
          <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse"></span>
          <span className="font-medium text-sm">Clusters: {clusterCount}</span>
        </div>
        <div className="flex items-center gap-2 bg-gray-900/50 px-3 py-1.5 rounded-lg">
          <span className="w-2 h-2 rounded-full bg-gray-600 animate-pulse"></span>
          <span className="font-medium text-sm">Noise Points: {noiseCount}</span>
        </div>
        <div className="flex items-center gap-2 bg-gray-900/50 px-3 py-1.5 rounded-lg">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          <span className="font-medium text-sm">Step: {currentStep + 1}</span>
        </div>
        {isPaused && (
          <div className="flex items-center gap-2 bg-gray-900/50 px-3 py-1.5 rounded-lg">
            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
            <span className="font-medium text-sm">Paused</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DBSCANVisualization;
