export const dbscanQuiz = [
  {
    question: "What are the two main parameters of DBSCAN?",
    options: [
      "eps and minPts",
      "k and distance",
      "radius and density",
      "threshold and neighbors"
    ],
    correctAnswer: 0,
    explanation: "DBSCAN uses two parameters: eps (the maximum distance between points in a neighborhood) and minPts (the minimum number of points required to form a core point)."
  },
  {
    question: "What type of points are neither core points nor border points?",
    options: [
      "Cluster points",
      "Noise points",
      "Edge points",
      "Center points"
    ],
    correctAnswer: 1,
    explanation: "Noise points are points that are neither core points nor border points. They are outliers in the dataset."
  },
  {
    question: "What is the main advantage of DBSCAN over K-means?",
    options: [
      "Faster computation",
      "No need to specify number of clusters",
      "Better for high-dimensional data",
      "More accurate results"
    ],
    correctAnswer: 1,
    explanation: "DBSCAN does not require specifying the number of clusters beforehand, unlike K-means, which needs the number of clusters to be defined."
  },
  {
    question: "What is the time complexity of DBSCAN in the worst case?",
    options: [
      "O(n)",
      "O(n log n)",
      "O(n²)",
      "O(n³)"
    ],
    correctAnswer: 2,
    explanation: "The time complexity of DBSCAN in the worst case is O(n²), where n is the number of data points, due to the need to compute distances between all points."
  }
]; 