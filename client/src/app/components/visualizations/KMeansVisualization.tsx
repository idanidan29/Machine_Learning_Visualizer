/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface Point {
  x: number;
  y: number;
  z: number;
  cluster?: number;
}

interface Centroid {
  x: number;
  y: number;
  z: number;
  color: string;
}

const PointSphere: React.FC<{ 
  position: [number, number, number]; 
  color: string;
  is2D: boolean;
}> = ({ position, color, is2D }) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.25, 16, 16]} />
      <meshStandardMaterial 
        color={color} 
        emissive={color}
        emissiveIntensity={0.2}
        metalness={0.3}
        roughness={0.4}
      />
    </mesh>
  );
};

const CentroidSphere: React.FC<{ 
  position: [number, number, number]; 
  color: string;
  is2D: boolean;
}> = ({ position, color, is2D }) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial 
        color={color} 
        emissive={color} 
        emissiveIntensity={0.5}
        metalness={0.5}
        roughness={0.2}
      />
    </mesh>
  );
};

const Scene: React.FC<{
  points: Point[];
  centroids: Centroid[];
  colors: string[];
  showClusters: boolean;
  is2D: boolean;
}> = ({ points, centroids, colors, showClusters, is2D }) => {
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
            ? colors[point.cluster % colors.length]
            : '#ffffff'}
          is2D={is2D}
        />
      ))}
      {centroids.map((centroid, index) => (
        <CentroidSphere
          key={`centroid-${index}`}
          position={[
            centroid.x, 
            centroid.y, 
            is2D ? 0.1 : centroid.z
          ]}
          color={centroid.color}
          is2D={is2D}
        />
      ))}
    </>
  );
};

const KMeansVisualization: React.FC = () => {
  const [points, setPoints] = useState<Point[]>([]);
  const [centroids, setCentroids] = useState<Centroid[]>([]);
  const [k, setK] = useState<number>(3);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [iteration, setIteration] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(1000);
  const [showClusters, setShowClusters] = useState<boolean>(false);
  const [is2D, setIs2D] = useState<boolean>(false);
  const [isStepByStep, setIsStepByStep] = useState<boolean>(false);
  const [isControlsExpanded, setIsControlsExpanded] = useState<boolean>(true);
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
    const initialClusters = 4; // Fixed number of clusters for point generation
    
    switch (shape) {
      case 'clusters':
        // Generate points in distinct clusters
        for (let i = 0; i < count; i++) {
          const cluster = Math.floor(i / (count / initialClusters));
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.random() * 2;
          const centerX = (cluster - (initialClusters - 1) / 2) * 5;
          const centerY = 0;
          
          newPoints.push({
            x: centerX + Math.cos(angle) * radius,
            y: centerY + Math.sin(angle) * radius,
            z: is2D ? 0 : (Math.random() - 0.5) * 2,
            cluster: Math.floor(Math.random() * k)
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
            cluster: Math.floor(Math.random() * k)
          });
        }
        break;

      case 'rings':
        // Generate points in concentric rings
        for (let i = 0; i < count; i++) {
          const angle = Math.random() * Math.PI * 2;
          const radius = 2 + Math.floor(i / (count / initialClusters)) * 3;
          const noise = (Math.random() - 0.5) * 0.5;
          
          newPoints.push({
            x: Math.cos(angle) * (radius + noise),
            y: Math.sin(angle) * (radius + noise),
            z: is2D ? 0 : (Math.random() - 0.5) * 0.5,
            cluster: Math.floor(Math.random() * k)
          });
        }
        break;

      case 'noise':
        // Generate points with high noise to show K-means clustering
        for (let i = 0; i < count; i++) {
          if (i < count * 0.7) {
            // 70% of points in clusters
            const cluster = Math.floor(i / (count * 0.7 / initialClusters));
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * 1.5;
            const centerX = (cluster - (initialClusters - 1) / 2) * 6;
            const centerY = 0;
            
            newPoints.push({
              x: centerX + Math.cos(angle) * radius,
              y: centerY + Math.sin(angle) * radius,
              z: is2D ? 0 : (Math.random() - 0.5) * 0.5,
              cluster: Math.floor(Math.random() * k)
            });
          } else {
            // 30% of points as noise
            newPoints.push({
              x: (Math.random() - 0.5) * 15,
              y: (Math.random() - 0.5) * 15,
              z: is2D ? 0 : (Math.random() - 0.5) * 0.5,
              cluster: Math.floor(Math.random() * k)
            });
          }
        }
        break;
    }
    
    return newPoints;
  };

  const initializeCentroids = (k: number) => {
    const newCentroids: Centroid[] = [];
    for (let i = 0; i < k; i++) {
      newCentroids.push({
        x: (Math.random() - 0.5) * 10,
        y: (Math.random() - 0.5) * 10,
        z: is2D ? 0 : (Math.random() - 0.5) * 10,
        color: colors[i % colors.length],
      });
    }
    return newCentroids;
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

  const assignClusters = (points: Point[], centroids: Centroid[]) => {
    return points.map(point => {
      let minDistance = Infinity;
      let cluster = 0;

      centroids.forEach((centroid, index) => {
        const distance = calculateDistance(point, { x: centroid.x, y: centroid.y, z: centroid.z });
        if (distance < minDistance) {
          minDistance = distance;
          cluster = index;
        }
      });

      return { ...point, cluster };
    });
  };

  const updateCentroids = (points: Point[], centroids: Centroid[]) => {
    return centroids.map((centroid, index) => {
      const clusterPoints = points.filter(p => p.cluster === index);
      if (clusterPoints.length === 0) return centroid;

      const sumX = clusterPoints.reduce((sum, p) => sum + p.x, 0);
      const sumY = clusterPoints.reduce((sum, p) => sum + p.y, 0);
      const sumZ = clusterPoints.reduce((sum, p) => sum + p.z, 0);
      const count = clusterPoints.length;

      return {
        ...centroid,
        x: sumX / count,
        y: sumY / count,
        z: is2D ? 0 : sumZ / count,
      };
    });
  };

  useEffect(() => {
    setPoints(generateRandomPoints(100));
    setCentroids(initializeCentroids(k));
    setShowClusters(true);
  }, [k, is2D, shape]);

  const runIteration = () => {
    if ((!isRunning && !isStepByStep) || isPaused) return;

    const newPoints = assignClusters(points, centroids);
    const newCentroids = updateCentroids(newPoints, centroids);

    setPoints(newPoints);
    setCentroids(newCentroids);
    setIteration(prev => prev + 1);
    setShowClusters(true);

    if (isStepByStep) {
      setIsRunning(false);
    }
  };

  useEffect(() => {
    if (isRunning && !isStepByStep && !isPaused) {
      const interval = setInterval(runIteration, speed);
      return () => clearInterval(interval);
    }
  }, [isRunning, points, centroids, speed, isStepByStep, isPaused]);

  const handleStartPauseResume = () => {
    if (isStepByStep) {
      runIteration();
    } else {
      if (!isRunning && !isPaused) {
        // Starting for the first time
        setIsRunning(true);
        setIsPaused(false);
        setIteration(0);
        setShowClusters(true);
      } else if (isRunning && !isPaused) {
        // Pausing
        setIsPaused(true);
      } else if (isPaused) {
        // Resuming
        setIsPaused(false);
      }
    }
  };

  const handleReset = () => {
    setPoints(generateRandomPoints(100));
    setCentroids(initializeCentroids(k));
    setIteration(0);
    setShowClusters(false);
    setIsRunning(false);
    setIsPaused(false);
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
              {isStepByStep 
                ? 'Next Step'
                : isRunning && !isPaused 
                  ? 'Pause' 
                  : isPaused 
                    ? 'Resume' 
                    : 'Start'}
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

          {/* Clusters Control */}
          <div className="flex flex-col gap-1.5 bg-gray-800/50 p-2 rounded-lg border border-gray-700/50">
            <label htmlFor="k-value" className="text-gray-300 font-medium text-xs flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Clusters (k)
            </label>
            <div className="flex items-center gap-1.5">
              <input
                id="k-value"
                type="range"
                min="1"
                max="8"
                step="1"
                value={k}
                onChange={(e) => setK(parseInt(e.target.value))}
                className="flex-1 accent-purple-600"
                disabled={isRunning && !isPaused}
              />
              <span className="text-gray-300 text-xs font-mono bg-gray-900/50 px-1 py-0.5 rounded min-w-[1.5rem] text-center">{k}</span>
            </div>
          </div>

          {/* Speed Control */}
          <div className="flex flex-col gap-1.5 bg-gray-800/50 p-2 rounded-lg border border-gray-700/50">
            <label htmlFor="speed" className="text-gray-300 font-medium text-xs flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Speed
            </label>
            <div className="flex items-center gap-1.5">
              <input
                id="speed"
                type="range"
                min="100"
                max="2000"
                step="100"
                value={speed}
                onChange={(e) => setSpeed(parseInt(e.target.value))}
                className="flex-1 accent-purple-600"
                disabled={isStepByStep}
              />
              <span className="text-gray-300 text-xs font-mono bg-gray-900/50 px-1 py-0.5 rounded min-w-[2.5rem] text-center">{speed}</span>
            </div>
          </div>

          {/* Mode Control */}
          <div className="flex flex-col gap-1.5 bg-gray-800/50 p-2 rounded-lg border border-gray-700/50">
            <label className="text-gray-300 font-medium text-xs flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Mode
            </label>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  setIsStepByStep(!isStepByStep);
                  if (!isStepByStep) {
                    setIsRunning(false);
                    setIsPaused(false);
                  }
                }}
                className={`flex-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                  isStepByStep
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Step
              </button>
              <button
                onClick={() => {
                  setIsStepByStep(!isStepByStep);
                  if (!isStepByStep) {
                    setIsRunning(false);
                    setIsPaused(false);
                  }
                }}
                className={`flex-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                  !isStepByStep
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Auto
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Visualization Canvas */}
      <div className="relative w-full h-[400px] bg-gray-900 rounded-lg overflow-hidden">
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
            centroids={centroids}
            colors={colors}
            showClusters={showClusters}
            is2D={is2D}
          />
        </Canvas>
      </div>

      {/* Status Bar */}
      <div className="flex flex-wrap justify-center items-center gap-4 text-gray-300 bg-gray-800/50 p-3 rounded-lg backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse"></span>
          <span className="font-medium text-sm">Iteration: {iteration}</span>
        </div>
        {isPaused && !isStepByStep && (
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
            <span className="font-medium text-sm">Paused</span>
          </div>
        )}
        {isStepByStep && (
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="font-medium text-sm">Step Mode</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default KMeansVisualization;