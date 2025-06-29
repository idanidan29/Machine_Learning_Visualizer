"use client"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { StickyScroll } from '../components/ui/sticky-scroll-reveal'
import { categories } from '../data/algorithms'

export default function BackgroundPage() {
  // Create content focused on ML categories
  const categoryContent = [
    // Introduction to ML Categories
    {
      title: "Machine Learning Categories",
      description: "Machine learning algorithms can be organized into different categories based on their learning approach and the type of problems they solve. Understanding these categories helps in choosing the right algorithm for your specific use case and provides a framework for learning machine learning systematically.",
      content: (
        <div className="flex items-center justify-center h-full w-full">
          <div className="text-center">
            <div className="text-8xl mb-6">🤖</div>
            <h3 className="text-3xl font-bold text-white mb-4">ML Categories</h3>
            <p className="text-lg text-gray-300 max-w-md">
              Understanding the different types of machine learning
            </p>
          </div>
        </div>
      )
    },
    // Supervised Learning
    {
      title: "Supervised Learning",
      description: "Supervised learning is the most common type of machine learning where algorithms learn from labeled training data. The algorithm is provided with input-output pairs and learns to map inputs to outputs. This category includes both classification (predicting categories) and regression (predicting continuous values) problems. Examples include predicting house prices, classifying emails as spam/not spam, or recognizing handwritten digits.",
      content: (
        <div className="flex items-center justify-center h-full w-full">
          <div className="text-center">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-white mb-2">Supervised Learning</h3>
            <p className="text-sm text-gray-300 mb-4">
              Learning from labeled examples
            </p>
            <div className="flex gap-2 justify-center flex-wrap">
              <span className="px-2 py-1 text-xs bg-white/20 text-white rounded-full">Classification</span>
              <span className="px-2 py-1 text-xs bg-white/20 text-white rounded-full">Regression</span>
              <span className="px-2 py-1 text-xs bg-white/20 text-white rounded-full">Labeled Data</span>
            </div>
          </div>
        </div>
      )
    },
    // Unsupervised Learning
    {
      title: "Unsupervised Learning",
      description: "Unsupervised learning algorithms work with unlabeled data and find hidden patterns or structures in the data. These algorithms don't have a specific target to predict but instead discover interesting patterns, groupings, or relationships in the data. Common applications include customer segmentation, anomaly detection, dimensionality reduction, and market basket analysis.",
      content: (
        <div className="flex items-center justify-center h-full w-full">
          <div className="text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-white mb-2">Unsupervised Learning</h3>
            <p className="text-sm text-gray-300 mb-4">
              Discovering patterns in unlabeled data
            </p>
            <div className="flex gap-2 justify-center flex-wrap">
              <span className="px-2 py-1 text-xs bg-white/20 text-white rounded-full">Clustering</span>
              <span className="px-2 py-1 text-xs bg-white/20 text-white rounded-full">Dimensionality</span>
              <span className="px-2 py-1 text-xs bg-white/20 text-white rounded-full">Patterns</span>
            </div>
          </div>
        </div>
      )
    },
    // Classification
    {
      title: "Classification",
      description: "Classification algorithms predict discrete categories or classes for given inputs. They learn to assign labels to data points based on their features. Classification can be binary (two classes like spam/not spam) or multi-class (multiple classes like different types of animals). These algorithms are widely used in image recognition, text classification, medical diagnosis, and fraud detection.",
      content: (
        <div className="flex items-center justify-center h-full w-full">
          <div className="text-center">
            <div className="text-6xl mb-4">🏷️</div>
            <h3 className="text-xl font-bold text-white mb-2">Classification</h3>
            <p className="text-sm text-gray-300 mb-4">
              Predicting discrete categories
            </p>
            <div className="flex gap-2 justify-center flex-wrap">
              <span className="px-2 py-1 text-xs bg-white/20 text-white rounded-full">Binary</span>
              <span className="px-2 py-1 text-xs bg-white/20 text-white rounded-full">Multi-class</span>
              <span className="px-2 py-1 text-xs bg-white/20 text-white rounded-full">Categories</span>
            </div>
          </div>
        </div>
      )
    },
    // Regression
    {
      title: "Regression",
      description: "Regression algorithms predict continuous numerical values based on input features. They model the relationship between dependent and independent variables to make predictions. Regression is used for forecasting sales, predicting house prices, estimating stock values, analyzing trends, and any scenario where you need to predict a continuous outcome. Linear regression is the most fundamental algorithm in this category.",
      content: (
        <div className="flex items-center justify-center h-full w-full">
          <div className="text-center">
            <div className="text-6xl mb-4">📈</div>
            <h3 className="text-xl font-bold text-white mb-2">Regression</h3>
            <p className="text-sm text-gray-300 mb-4">
              Predicting continuous values
            </p>
            <div className="flex gap-2 justify-center flex-wrap">
              <span className="px-2 py-1 text-xs bg-white/20 text-white rounded-full">Linear</span>
              <span className="px-2 py-1 text-xs bg-white/20 text-white rounded-full">Polynomial</span>
              <span className="px-2 py-1 text-xs bg-white/20 text-white rounded-full">Forecasting</span>
            </div>
          </div>
        </div>
      )
    },
    // Clustering
    {
      title: "Clustering",
      description: "Clustering algorithms group similar data points together based on their features, without any prior knowledge of the groups. They identify natural groupings in the data, making it useful for customer segmentation, image segmentation, document organization, and anomaly detection. Popular clustering algorithms include K-means, DBSCAN, and hierarchical clustering, each with different approaches to defining similarity and forming clusters.",
      content: (
        <div className="flex items-center justify-center h-full w-full">
          <div className="text-center">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-white mb-2">Clustering</h3>
            <p className="text-sm text-gray-300 mb-4">
              Grouping similar data points
            </p>
            <div className="flex gap-2 justify-center flex-wrap">
              <span className="px-2 py-1 text-xs bg-white/20 text-white rounded-full">K-means</span>
              <span className="px-2 py-1 text-xs bg-white/20 text-white rounded-full">DBSCAN</span>
              <span className="px-2 py-1 text-xs bg-white/20 text-white rounded-full">Segmentation</span>
            </div>
          </div>
        </div>
      )
    },
    // Ensemble Methods
    {
      title: "Ensemble Methods",
      description: "Ensemble methods combine multiple machine learning models to improve overall performance and reduce overfitting. They work on the principle that a group of weak learners can create a strong learner. Common ensemble techniques include bagging (Random Forest), boosting (AdaBoost, Gradient Boosting), and stacking. These methods are particularly effective for complex problems and often achieve state-of-the-art performance in competitions.",
      content: (
        <div className="flex items-center justify-center h-full w-full">
          <div className="text-center">
            <div className="text-6xl mb-4">🌲</div>
            <h3 className="text-xl font-bold text-white mb-2">Ensemble Methods</h3>
            <p className="text-sm text-gray-300 mb-4">
              Combining multiple models
            </p>
            <div className="flex gap-2 justify-center flex-wrap">
              <span className="px-2 py-1 text-xs bg-white/20 text-white rounded-full">Bagging</span>
              <span className="px-2 py-1 text-xs bg-white/20 text-white rounded-full">Boosting</span>
              <span className="px-2 py-1 text-xs bg-white/20 text-white rounded-full">Stacking</span>
            </div>
          </div>
        </div>
      )
    },
    // Deep Learning
    {
      title: "Deep Learning",
      description: "Deep learning is a subset of machine learning that uses artificial neural networks with multiple layers to model and understand complex patterns in data. These networks are inspired by the human brain and can automatically learn hierarchical representations from raw data. Deep learning has revolutionized fields like computer vision, natural language processing, speech recognition, and autonomous systems. Popular architectures include Convolutional Neural Networks (CNNs), Recurrent Neural Networks (RNNs), and Transformers.",
      content: (
        <div className="flex items-center justify-center h-full w-full">
          <img 
            src="/deepLearning.jpg" 
            alt="Deep Learning"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      )
    }
  ];

  // Debug log
  console.log('Category content:', categoryContent);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        {/* Page Header */}
        <div className="pt-20 pb-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Machine Learning Categories
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto px-4">
              Explore the different types of machine learning and understand when to use each approach
            </p>
          </div>
        </div>

        {/* Fullscreen Sticky Scroll Content */}
        <div className="h-[calc(100vh-200px)]">
          {categoryContent && categoryContent.length > 0 ? (
            <StickyScroll content={categoryContent} />
          ) : (
            <div className="text-white text-center p-8">Loading content...</div>
          )}
        </div>

        <div className='mx-3'>
          <Footer/>
        </div>
      </div>
    </>
  )
} 