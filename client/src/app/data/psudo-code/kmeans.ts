export const kmeansImplementation = `function KMeans(data, k):
    # Initialize k centroids randomly
    centroids = random_points(data, k)
    
    while not converged:
        # Assign points to nearest centroid
        clusters = [[] for _ in range(k)]
        for point in data:
            nearest_centroid = find_nearest_centroid(point, centroids)
            clusters[nearest_centroid].append(point)
        
        # Update centroids
        new_centroids = []
        for cluster in clusters:
            if cluster:
                new_centroid = calculate_mean(cluster)
                new_centroids.append(new_centroid)
        
        # Check convergence
        if centroids == new_centroids:
            converged = True
        else:
            centroids = new_centroids
    
    return clusters, centroids`; 