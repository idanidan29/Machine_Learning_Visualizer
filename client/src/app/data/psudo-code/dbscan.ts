export const dbscanImplementation = `function DBSCAN(data, eps, minPts):
    # Initialize clusters and visited points
    clusters = []
    visited = set()
    
    # For each point in the dataset
    for point in data:
        if point in visited:
            continue
            
        visited.add(point)
        neighbors = get_neighbors(point, data, eps)
        
        # If point has enough neighbors, start a new cluster
        if len(neighbors) >= minPts:
            cluster = []
            clusters.append(expand_cluster(point, neighbors, cluster, visited, data, eps, minPts))
    
    return clusters

function expand_cluster(point, neighbors, cluster, visited, data, eps, minPts):
    cluster.append(point)
    
    # Process all neighbors
    for neighbor in neighbors:
        if neighbor not in visited:
            visited.add(neighbor)
            new_neighbors = get_neighbors(neighbor, data, eps)
            
            # If neighbor has enough neighbors, add its neighbors to the cluster
            if len(new_neighbors) >= minPts:
                neighbors.extend(new_neighbors)
        
        # Add neighbor to cluster if not already in another cluster
        if neighbor not in cluster:
            cluster.append(neighbor)
    
    return cluster

function get_neighbors(point, data, eps):
    neighbors = []
    for other in data:
        if distance(point, other) <= eps:
            neighbors.append(other)
    return neighbors`; 