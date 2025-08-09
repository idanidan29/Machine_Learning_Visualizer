export const svmImplementation = `# Support Vector Machine (SVM) Implementation

import numpy as np
from sklearn.svm import SVC
from sklearn.preprocessing import StandardScaler

class SVM:
    def __init__(self, C=1.0, kernel='rbf', gamma='scale'):
        """
        Initialize SVM classifier
        
        Parameters:
        C: Regularization parameter (controls trade-off between margin and misclassification)
        kernel: Kernel function ('linear', 'rbf', 'poly', 'sigmoid')
        gamma: Kernel coefficient for 'rbf', 'poly', 'sigmoid'
        """
        self.C = C
        self.kernel = kernel
        self.gamma = gamma
        self.support_vectors = None
        self.support_vector_labels = None
        self.dual_coef = None
        self.intercept = None
        
    def fit(self, X, y):
        """
        Train the SVM classifier
        
        Parameters:
        X: Training features (n_samples, n_features)
        y: Training labels (n_samples,)
        """
        # Scale features for better performance
        self.scaler = StandardScaler()
        X_scaled = self.scaler.fit_transform(X)
        
        # Create and train SVM model
        self.model = SVC(
            C=self.C,
            kernel=self.kernel,
            gamma=self.gamma,
            random_state=42
        )
        
        self.model.fit(X_scaled, y)
        
        # Store model parameters
        self.support_vectors = self.model.support_vectors_
        self.support_vector_labels = y[self.model.support_]
        self.dual_coef = self.model.dual_coef_
        self.intercept = self.model.intercept_
        
        return self
    
    def predict(self, X):
        """
        Predict class labels for samples in X
        
        Parameters:
        X: Features to predict (n_samples, n_features)
        
        Returns:
        Predicted labels
        """
        X_scaled = self.scaler.transform(X)
        return self.model.predict(X_scaled)
    
    def decision_function(self, X):
        """
        Compute decision function values
        
        Parameters:
        X: Features to evaluate (n_samples, n_features)
        
        Returns:
        Decision function values (distance from hyperplane)
        """
        X_scaled = self.scaler.transform(X)
        return self.model.decision_function(X_scaled)
    
    def get_margin(self):
        """
        Calculate the margin of the SVM
        
        Returns:
        Margin value
        """
        if self.kernel == 'linear':
            # For linear kernel, margin = 2 / ||w||
            w = self.model.coef_[0]
            margin = 2 / np.linalg.norm(w)
            return margin
        else:
            # For non-linear kernels, margin calculation is more complex
            return "Margin calculation not straightforward for non-linear kernels"
    
    def get_support_vectors_info(self):
        """
        Get information about support vectors
        
        Returns:
        Dictionary with support vector information
        """
        return {
            'n_support_vectors': len(self.support_vectors),
            'support_vectors': self.support_vectors,
            'support_vector_labels': self.support_vector_labels,
            'dual_coefficients': self.dual_coef
        }

# Example usage
def example_usage():
    # Generate sample data
    np.random.seed(42)
    X = np.random.randn(100, 2)
    y = np.where(X[:, 0] + X[:, 1] > 0, 1, -1)
    
    # Create and train SVM
    svm = SVM(C=1.0, kernel='rbf', gamma='scale')
    svm.fit(X, y)
    
    # Make predictions
    predictions = svm.predict(X)
    
    # Get model information
    margin = svm.get_margin()
    sv_info = svm.get_support_vectors_info()
    
    print(f"Number of support vectors: {sv_info['n_support_vectors']}")
    print(f"Margin: {margin}")
    
    return svm

# Advanced SVM with custom kernel
class CustomKernelSVM:
    def __init__(self, C=1.0):
        self.C = C
        
    def rbf_kernel(self, X1, X2, gamma=1.0):
        """
        Radial Basis Function kernel
        
        K(x, y) = exp(-gamma * ||x - y||^2)
        """
        # Compute pairwise distances
        X1_norm = np.sum(X1**2, axis=1).reshape(-1, 1)
        X2_norm = np.sum(X2**2, axis=1).reshape(1, -1)
        
        K = np.exp(-gamma * (X1_norm + X2_norm - 2 * np.dot(X1, X2.T)))
        return K
    
    def polynomial_kernel(self, X1, X2, degree=3, coef0=1):
        """
        Polynomial kernel
        
        K(x, y) = (gamma * <x, y> + coef0)^degree
        """
        K = (np.dot(X1, X2.T) + coef0) ** degree
        return K
    
    def sigmoid_kernel(self, X1, X2, gamma=1.0, coef0=0):
        """
        Sigmoid kernel
        
        K(x, y) = tanh(gamma * <x, y> + coef0)
        """
        K = np.tanh(gamma * np.dot(X1, X2.T) + coef0)
        return K

# Soft margin SVM with slack variables
def soft_margin_svm_objective(w, b, xi, C, X, y):
    """
    Soft margin SVM objective function
    
    min (1/2) * ||w||^2 + C * sum(xi_i)
    subject to: y_i * (w^T * x_i + b) >= 1 - xi_i
                xi_i >= 0 for all i
    """
    margin_term = 0.5 * np.dot(w, w)
    slack_term = C * np.sum(xi)
    
    return margin_term + slack_term

# Kernel trick demonstration
def kernel_trick_example():
    """
    Demonstrate how kernel trick works for non-linear classification
    """
    # Original 2D data
    X_2d = np.array([[1, 2], [3, 4], [5, 6]])
    
    # Transform to higher dimensional space using polynomial kernel
    # φ(x) = [x1, x2, x1^2, x2^2, x1*x2]
    X_transformed = []
    for x in X_2d:
        x1, x2 = x
        phi_x = [x1, x2, x1**2, x2**2, x1*x2]
        X_transformed.append(phi_x)
    
    X_transformed = np.array(X_transformed)
    
    print("Original 2D data:")
    print(X_2d)
    print("\\nTransformed to 5D space:")
    print(X_transformed)
    
    # Kernel computation without explicit transformation
    K = polynomial_kernel(X_2d, X_2d, degree=2)
    print("\\nKernel matrix (polynomial degree 2):")
    print(K)

def polynomial_kernel(X1, X2, degree=2):
    """Simple polynomial kernel implementation"""
    return (np.dot(X1, X2.T) + 1) ** degree

if __name__ == "__main__":
    # Run examples
    svm = example_usage()
    kernel_trick_example()
`; 