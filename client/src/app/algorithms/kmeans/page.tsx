"use client"
import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'

interface Point {
  x: number
  y: number
  cluster?: number
}

export default function KMeansPage() {
  const [points, setPoints] = useState<Point[]>([])
  const [clusters, setClusters] = useState<Point[]>([])
  const [k, setK] = useState(3)
  const [isRunning, setIsRunning] = useState(false)
  const [iterations, setIterations] = useState(0)

  // Initialize random points
  const initializePoints = () => {
    const newPoints: Point[] = []
    for (let i = 0; i < 100; i++) {
      newPoints.push({
        x: Math.random() * 400,
        y: Math.random() * 400,
      })
    }
    setPoints(newPoints)
    setIterations(0)
  }

  // Initialize random cluster centers
  const initializeClusters = () => {
    const newClusters: Point[] = []
    for (let i = 0; i < k; i++) {
      newClusters.push({
        x: Math.random() * 400,
        y: Math.random() * 400,
        cluster: i
      })
    }
    setClusters(newClusters)
  }

  // Calculate distance between two points
  const calculateDistance = (p1: Point, p2: Point) => {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2))
  }

  // Assign points to nearest cluster
  const assignPointsToClusters = () => {
    const newPoints = points.map(point => {
      let minDistance = Infinity
      let nearestCluster = 0

      clusters.forEach((cluster, index) => {
        const distance = calculateDistance(point, cluster)
        if (distance < minDistance) {
          minDistance = distance
          nearestCluster = index
        }
      })

      return { ...point, cluster: nearestCluster }
    })

    setPoints(newPoints)
  }

  // Update cluster centers
  const updateClusterCenters = () => {
    const newClusters = clusters.map((cluster, clusterIndex) => {
      const clusterPoints = points.filter(p => p.cluster === clusterIndex)
      if (clusterPoints.length === 0) return cluster

      const sumX = clusterPoints.reduce((sum, p) => sum + p.x, 0)
      const sumY = clusterPoints.reduce((sum, p) => sum + p.y, 0)
      const avgX = sumX / clusterPoints.length
      const avgY = sumY / clusterPoints.length

      return { x: avgX, y: avgY, cluster: clusterIndex }
    })

    setClusters(newClusters)
  }

  // Run one iteration of K-means
  const runIteration = () => {
    assignPointsToClusters()
    updateClusterCenters()
    setIterations(prev => prev + 1)
  }

  // Start/Stop the algorithm
  const toggleAlgorithm = () => {
    if (!isRunning) {
      if (points.length === 0) {
        initializePoints()
      }
      if (clusters.length === 0) {
        initializeClusters()
      }
    }
    setIsRunning(!isRunning)
  }

  // Reset the visualization
  const resetVisualization = () => {
    setPoints([])
    setClusters([])
    setIterations(0)
    setIsRunning(false)
  }

  // Run iterations when isRunning is true
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning) {
      interval = setInterval(runIteration, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning, points, clusters])

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">K-Means Clustering</h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              K-means clustering is an unsupervised learning algorithm that groups similar data points into clusters.
              Watch how the algorithm iteratively assigns points to the nearest cluster center and updates the centers.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-6">
            {/* Controls */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleAlgorithm}
                className={`px-4 py-2 rounded-md font-medium ${
                  isRunning
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
              >
                {isRunning ? 'Stop' : 'Start'}
              </button>
              <button
                onClick={resetVisualization}
                className="px-4 py-2 rounded-md font-medium bg-gray-700 hover:bg-gray-600 text-white"
              >
                Reset
              </button>
              <div className="flex items-center space-x-2">
                <label htmlFor="k-value" className="text-gray-300">
                  Number of clusters (k):
                </label>
                <input
                  id="k-value"
                  type="number"
                  min="1"
                  max="10"
                  value={k}
                  onChange={(e) => setK(parseInt(e.target.value))}
                  className="w-16 px-2 py-1 rounded-md bg-gray-800 text-white border border-gray-700"
                  disabled={isRunning}
                />
              </div>
            </div>

            {/* Visualization */}
            <div className="relative w-[400px] h-[400px] bg-gray-800 rounded-lg overflow-hidden">
              {/* Points */}
              {points.map((point, index) => (
                <div
                  key={index}
                  className="absolute w-3 h-3 rounded-full transform -translate-x-1.5 -translate-y-1.5"
                  style={{
                    left: point.x,
                    top: point.y,
                    backgroundColor: point.cluster !== undefined
                      ? `hsl(${(point.cluster * 360) / k}, 70%, 60%)`
                      : 'white'
                  }}
                />
              ))}
              {/* Cluster Centers */}
              {clusters.map((cluster, index) => (
                <div
                  key={index}
                  className="absolute w-6 h-6 rounded-full border-2 border-white transform -translate-x-3 -translate-y-3"
                  style={{
                    left: cluster.x,
                    top: cluster.y,
                    backgroundColor: `hsl(${(index * 360) / k}, 70%, 60%)`
                  }}
                />
              ))}
            </div>

            {/* Stats */}
            <div className="text-gray-300">
              Iterations: {iterations}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 