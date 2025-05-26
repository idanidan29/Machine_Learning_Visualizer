export interface Point {
  x: number;
  y: number;
  cluster?: number;
}

export interface Cluster {
  centroid: Point;
  points: Point[];
} 