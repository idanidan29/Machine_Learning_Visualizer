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
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshStandardMaterial color={color} />
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
      <sphereGeometry args={[0.4, 32, 32]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
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
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      {is2D && (
        <mesh position={[0, 0, -0.3]}>
          <planeGeometry args={[20, 20]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      )}
      {points.map((point, index) => (
        <PointSphere
          key={`point-${index}`}
          position={[
            point.x - 5, 
            point.y - 5, 
            is2D ? -0.1 : point.z - 5
          ]}
          color={showClusters && point.cluster !== undefined 
            ? colors[point.cluster % colors.length]
            : '#666666'}
          is2D={is2D}
        />
      ))}
      {centroids.map((centroid, index) => (
        <CentroidSphere
          key={`centroid-${index}`}
          position={[
            centroid.x - 5, 
            centroid.y - 5, 
            is2D ? 0 : centroid.z - 5
          ]}
          color={centroid.color}
          is2D={is2D}
        />
      ))}
      {!is2D && <gridHelper args={[20, 20]} />}
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

  const colors = [
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#96CEB4',
    '#FFEEAD',
    '#D4A5A5',
    '#9B59B6',
    '#3498DB',
  ];

  const generateRandomPoints = (count: number) => {
    const newPoints: Point[] = [];
    for (let i = 0; i < count; i++) {
      newPoints.push({
        x: Math.random() * 10,
        y: Math.random() * 10,
        z: is2D ? 0 : Math.random() * 10, // Set z to 0 in 2D mode
      });
    }
    return newPoints;
  };

  const initializeCentroids = (k: number) => {
    const newCentroids: Centroid[] = [];
    for (let i = 0; i < k; i++) {
      newCentroids.push({
        x: Math.random() * 10,
        y: Math.random() * 10,
        z: is2D ? 0 : Math.random() * 10, // Set z to 0 in 2D mode
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
        z: is2D ? 5 : sumZ / count, // Keep z at 5 in 2D mode
      };
    });
  };

  useEffect(() => {
    setPoints(generateRandomPoints(100));
    setCentroids(initializeCentroids(k));
    setShowClusters(false);
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
    <div className="flex flex-col items-center gap-6 p-8 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-wrap gap-6 mb-6">
            <div className="flex-1 min-w-[200px]">
              <label htmlFor="k-value" className="block text-sm font-medium text-gray-700 mb-2">
                Number of Clusters (K)
              </label>
              <input
                id="k-value"
                type="number"
                min="2"
                max="8"
                value={k}
                onChange={(e) => setK(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label htmlFor="speed" className="block text-sm font-medium text-gray-700 mb-2">
                Animation Speed
              </label>
              <div className="flex items-center gap-3">
                <input
                  id="speed"
                  type="range"
                  min="100"
                  max="2000"
                  step="100"
                  value={speed}
                  onChange={(e) => setSpeed(parseInt(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  disabled={isStepByStep}
                />
                <span className="text-sm font-medium text-gray-600 min-w-[60px]">{speed}ms</span>
              </div>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label htmlFor="dimension" className="block text-sm font-medium text-gray-700 mb-2">
                Visualization Mode
              </label>
              <select
                id="dimension"
                value={is2D ? "2D" : "3D"}
                onChange={(e) => setIs2D(e.target.value === "2D")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value="2D">2D View</option>
                <option value="3D">3D View</option>
              </select>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Execution Mode
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setIsStepByStep(false);
                    setIsRunning(false);
                    setIsPaused(false);
                  }}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                    !isStepByStep
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Continuous
                </button>
                <button
                  onClick={() => {
                    setIsStepByStep(true);
                    setIsRunning(false);
                    setIsPaused(false);
                  }}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                    isStepByStep
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Step by Step
                </button>
              </div>
            </div>
            <div className="flex gap-4 flex-1 min-w-[200px]">
              <button
                onClick={handleStartPauseResume}
                className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
                  isPaused
                    ? 'bg-green-500 hover:bg-green-600 text-white'
                    : isRunning
                      ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                {isStepByStep 
                  ? 'Next Step'
                  : isPaused
                    ? 'Resume'
                    : isRunning
                      ? 'Pause'
                      : 'Start Clustering'}
              </button>
              <button
                onClick={handleReset}
                className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-all"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Clustering Visualization</h2>
            <div className="text-sm font-medium text-gray-600">
              Iteration: <span className="text-blue-600">{iteration}</span>
            </div>
          </div>
          <div className="w-full aspect-square border border-gray-200 rounded-lg overflow-hidden">
            <Canvas>
              <PerspectiveCamera 
                makeDefault 
                position={is2D ? [0, 0, 20] : [15, 15, 15]} 
                fov={is2D ? 45 : 75}
                near={0.1}
                far={1000}
              />
              <OrbitControls 
                enableDamping 
                dampingFactor={0.05}
                maxPolarAngle={is2D ? Math.PI / 2 : Math.PI}
                minPolarAngle={is2D ? Math.PI / 2 : 0}
                maxDistance={is2D ? 30 : 50}
                minDistance={is2D ? 10 : 5}
                enableRotate={!is2D}
                enablePan={true}
                enableZoom={true}
              />
              <Scene 
                points={points} 
                centroids={centroids} 
                colors={colors} 
                showClusters={showClusters}
                is2D={is2D}
              />
              {!is2D && <gridHelper args={[20, 20]} />}
            </Canvas>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Controls</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Navigation</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                {is2D ? (
                  <>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Right click + drag: Pan view
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Scroll: Zoom in/out
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Left click + drag: Rotate view
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Right click + drag: Pan view
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Scroll: Zoom in/out
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      In 3D mode, you can rotate to see the depth
                    </li>
                  </>
                )}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Legend</h4>
              <div className="grid grid-cols-2 gap-2">
                {colors.slice(0, k).map((color, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-sm text-gray-600">Cluster {index + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KMeansVisualization; 