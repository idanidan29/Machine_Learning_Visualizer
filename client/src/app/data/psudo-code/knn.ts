export const knnImplementation = `function KNN(train_data, test_point, k):
    # Calculate distances to all training points
    distances = []
    for train_point in train_data:
        distance = calculate_distance(test_point, train_point)
        distances.append((distance, train_point.label))
    
    # Sort distances and get k nearest neighbors
    distances.sort()
    k_nearest = distances[:k]
    
    # For classification: majority vote
    if is_classification:
        labels = [label for _, label in k_nearest]
        return most_common(labels)
    
    # For regression: average
    else:
        values = [label for _, label in k_nearest]
        return sum(values) / len(values)

function calculate_distance(point1, point2):
    # Euclidean distance
    return sqrt(sum((x1 - x2) ** 2 for x1, x2 in zip(point1, point2)))`; 