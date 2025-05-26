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
    for (let i = 0; i < count; i++) {
      newPoints.push({
        x: (Math.random() - 0.5) * 10,
        y: (Math.random() - 0.5) * 10,
        z: is2D ? 0 : (Math.random() - 0.5) * 10,
        cluster: Math.floor(Math.random() * k)
      });
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
  }, [k, is2D]);

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
      <div className="bg-gray-800/50 rounded-lg backdrop-blur-sm">
        {/* Main Controls - Always Visible */}
        <div className="flex items-center justify-between p-3 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <button
              onClick={handleStartPauseResume}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all duration-200 text-sm ${
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
              className="px-3 py-1.5 rounded-lg font-medium bg-gray-700 hover:bg-gray-600 text-white transition-all duration-200 shadow-lg shadow-gray-700/20 text-sm"
            >
              Reset
            </button>
          </div>
          <button
            onClick={() => setIsControlsExpanded(!isControlsExpanded)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <svg
              className={`w-5 h-5 text-gray-300 transform transition-transform duration-200 ${
                isControlsExpanded ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        {/* Additional Controls - Collapsible on Mobile */}
        <div className={`${isControlsExpanded ? 'block' : 'hidden'} lg:block`}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3">
            {/* Clusters Control */}
            <div className="flex items-center gap-2 bg-gray-800/50 p-2 rounded-lg">
              <label htmlFor="k-value" className="text-gray-300 font-medium text-sm whitespace-nowrap">
                Clusters (k):
              </label>
              <input
                id="k-value"
                type="number"
                min="1"
                max="8"
                value={k}
                onChange={(e) => setK(parseInt(e.target.value))}
                className="w-14 px-2 py-1 rounded-md bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-200 text-sm"
                disabled={isRunning && !isPaused}
              />
            </div>

            {/* Speed Control */}
            <div className="flex items-center gap-2 bg-gray-800/50 p-2 rounded-lg">
              <label htmlFor="speed" className="text-gray-300 font-medium text-sm whitespace-nowrap">
                Speed:
              </label>
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
            </div>

            {/* View Controls */}
            <div className="flex items-center justify-between gap-2 bg-gray-800/50 p-2 rounded-lg">
              {/* 2D/3D Toggle */}
              <div className="flex items-center gap-2">
                <span className={`text-xs font-medium transition-colors duration-200 ${!is2D ? 'text-purple-400' : 'text-gray-400'}`}>3D</span>
                <button
                  onClick={() => {
                    setIs2D(!is2D);
                    if (!is2D) {
                      const camera = document.querySelector('canvas')?.parentElement?.querySelector('canvas');
                      if (camera) {
                        camera.style.transform = 'translate3d(0px, 0px, 0px)';
                      }
                    }
                  }}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                    is2D ? 'bg-purple-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
                      is2D ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className={`text-xs font-medium transition-colors duration-200 ${is2D ? 'text-purple-400' : 'text-gray-400'}`}>2D</span>
              </div>

              {/* Auto/Step Toggle */}
              <div className="flex items-center gap-2">
                <span className={`text-xs font-medium transition-colors duration-200 ${!isStepByStep ? 'text-purple-400' : 'text-gray-400'}`}>Auto</span>
                <button
                  onClick={() => {
                    setIsStepByStep(!isStepByStep);
                    if (!isStepByStep) {
                      setIsRunning(false);
                      setIsPaused(false);
                    }
                  }}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                    isStepByStep ? 'bg-purple-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
                      isStepByStep ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className={`text-xs font-medium transition-colors duration-200 ${isStepByStep ? 'text-purple-400' : 'text-gray-400'}`}>Step</span>
              </div>
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