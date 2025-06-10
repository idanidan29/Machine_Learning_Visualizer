/* eslint-disable react-hooks/exhaustive-deps */
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
  isNoise?: boolean;
}

interface DBSCANParams {
  eps: number;
  minPts: number;
}

const PointSphere: React.FC<{ 
  position: [number, number, number]; 
  color: string;
  is2D: boolean;
  isNoise?: boolean;
}> = ({ position, color, is2D, isNoise }) => {
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
  const [is2D, setIs2D] = useState<boolean>(true);
  const [isStepByStep, setIsStepByStep] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [clusterCount, setClusterCount] = useState<number>(0);
  const [noiseCount, setNoiseCount] = useState<number>(0);

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
    // Generate points in clusters
    for (let i = 0; i < count; i++) {
      // Create 3 distinct clusters
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

  const runDBSCAN = () => {
    const newPoints = [...points];
    let clusterId = 0;
    let noiseCount = 0;

    for (let i = 0; i < newPoints.length; i++) {
      if (newPoints[i].cluster !== undefined) continue;

      const neighbors = getNeighbors(newPoints[i], newPoints);
      
      if (neighbors.length < minPts) {
        newPoints[i].cluster = -1; // Mark as noise
        newPoints[i].isNoise = true;
        noiseCount++;
        continue;
      }

      // Start a new cluster
      clusterId++;
      newPoints[i].cluster = clusterId - 1;

      // Expand the cluster
      const seedSet = new Set(neighbors);
      seedSet.delete(i);

      while (seedSet.size > 0) {
        const currentPoint = Array.from(seedSet)[0];
        seedSet.delete(currentPoint);

        if (newPoints[currentPoint].cluster === -1) {
          newPoints[currentPoint].cluster = clusterId - 1;
          newPoints[currentPoint].isNoise = false;
        }

        if (newPoints[currentPoint].cluster !== undefined) continue;

        newPoints[currentPoint].cluster = clusterId - 1;
        const currentNeighbors = getNeighbors(newPoints[currentPoint], newPoints);

        if (currentNeighbors.length >= minPts) {
          currentNeighbors.forEach(neighbor => {
            if (newPoints[neighbor].cluster === undefined) {
              seedSet.add(neighbor);
            }
          });
        }
      }
    }

    setPoints(newPoints);
    setClusterCount(clusterId);
    setNoiseCount(noiseCount);
    setShowClusters(true);
  };

  useEffect(() => {
    setPoints(generateRandomPoints(100));
    setShowClusters(false);
    setClusterCount(0);
    setNoiseCount(0);
  }, [is2D]);

  const handleStartPauseResume = () => {
    if (isStepByStep) {
      runDBSCAN();
    } else {
      if (!isRunning && !isPaused) {
        setIsRunning(true);
        setIsPaused(false);
        runDBSCAN();
      } else if (isRunning && !isPaused) {
        setIsPaused(true);
      } else if (isPaused) {
        setIsPaused(false);
      }
    }
  };

  const handleReset = () => {
    setPoints(generateRandomPoints(100));
    setShowClusters(false);
    setClusterCount(0);
    setNoiseCount(0);
    setIsRunning(false);
    setIsPaused(false);
  };

  return (
    <div className="space-y-4">
      {/* Control Panel */}
      <div className="bg-gray-800/50 rounded-lg backdrop-blur-sm">
        {/* Main Controls */}
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
                ? 'Run DBSCAN'
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
        </div>

        {/* Parameters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3">
          {/* Epsilon Control */}
          <div className="flex items-center gap-2 bg-gray-800/50 p-2 rounded-lg">
            <label htmlFor="eps-value" className="text-gray-300 font-medium text-sm whitespace-nowrap">
              Epsilon (ε):
            </label>
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
            <span className="text-gray-300 text-sm">{eps.toFixed(1)}</span>
          </div>

          {/* MinPts Control */}
          <div className="flex items-center gap-2 bg-gray-800/50 p-2 rounded-lg">
            <label htmlFor="minpts-value" className="text-gray-300 font-medium text-sm whitespace-nowrap">
              MinPts:
            </label>
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
            <span className="text-gray-300 text-sm">{minPts}</span>
          </div>

          {/* View Controls */}
          <div className="flex items-center gap-2 bg-gray-800/50 p-2 rounded-lg">
            <label htmlFor="view-mode" className="text-gray-300 font-medium text-sm whitespace-nowrap">
              View:
            </label>
            <button
              onClick={() => setIs2D(!is2D)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                is2D
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              2D
            </button>
            <button
              onClick={() => setIs2D(!is2D)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                !is2D
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              3D
            </button>
          </div>
        </div>
      </div>

      {/* Visualization Canvas */}
      <div className="relative bg-gray-800 rounded-lg overflow-hidden shadow-xl" style={{ height: '500px' }}>
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
      <div className="flex flex-wrap justify-center items-center gap-4 text-gray-300 bg-gray-800/50 p-3 rounded-lg backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse"></span>
          <span className="font-medium text-sm">Clusters: {clusterCount}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-gray-600 animate-pulse"></span>
          <span className="font-medium text-sm">Noise Points: {noiseCount}</span>
        </div>
        {isPaused && !isStepByStep && (
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
            <span className="font-medium text-sm">Paused</span>
          </div>
        )}
      </div>

      {/* Information Panel */}
      <div className="bg-gray-800/50 rounded-lg p-4 text-gray-300">
        <h3 className="text-lg font-semibold mb-2">How DBSCAN Works</h3>
        <div className="space-y-2 text-sm">
          <p>DBSCAN (Density-Based Spatial Clustering of Applications with Noise) is a clustering algorithm that:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Groups points that are closely packed together (density-based)</li>
            <li>Marks points that lie alone in low-density regions as outliers</li>
            <li>Doesn't require specifying the number of clusters beforehand</li>
            <li>Can find clusters of arbitrary shapes</li>
          </ul>
          <p className="mt-2">Parameters:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Epsilon (ε):</strong> Maximum distance between points to be considered neighbors</li>
            <li><strong>MinPts:</strong> Minimum number of points required to form a cluster</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DBSCANVisualization;
