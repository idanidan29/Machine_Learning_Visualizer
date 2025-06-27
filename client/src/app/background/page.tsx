"use client"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { StickyScroll } from '../components/ui/sticky-scroll-reveal'
import { algorithms } from '../data/algorithms'

export default function BackgroundPage() {
  // Create comprehensive content for the sticky scroll component
  const pageContent = [
    // Introduction
    {
      title: "Machine Learning Algorithms",
      description: "Explore the diverse world of machine learning algorithms through interactive visualizations. From simple linear models to complex neural networks, discover how each algorithm works and when to use them.",
      content: (
        <div className="flex items-center justify-center h-full w-full">
          <div className="text-center">
            <div className="text-8xl mb-6">🤖</div>
            <h3 className="text-3xl font-bold text-white mb-4">ML Visualizer</h3>
            <p className="text-lg text-gray-300 max-w-md">
              Interactive learning platform for understanding machine learning algorithms
            </p>
          </div>
        </div>
      )
    },
    // Why ML Visualization
    {
      title: "Why Machine Learning Visualization?",
      description: "Machine learning algorithms can be complex and abstract, making them difficult to understand for students, researchers, and practitioners. Visualization bridges this gap by providing intuitive, interactive representations of how these algorithms work, their decision-making processes, and their performance characteristics.",
      content: (
        <div className="flex items-center justify-center h-full w-full">
          <div className="text-center">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-white mb-2">Visual Learning</h3>
            <p className="text-sm text-gray-300">
              Transform complex concepts into intuitive visual experiences
            </p>
          </div>
        </div>
      )
    },
    // Educational Impact
    {
      title: "Educational Impact",
      description: "Our platform provides interactive learning experiences for students and engaging teaching tools for educators. Students gain visual understanding of abstract concepts with real-time parameter adjustment and immediate feedback on algorithm behavior. Educators can demonstrate complex concepts through interactive classroom activities and assessment through visualization.",
      content: (
        <div className="flex items-center justify-center h-full w-full">
          <div className="text-center">
            <div className="text-6xl mb-4">🎓</div>
            <h3 className="text-xl font-bold text-white mb-2">Learning & Teaching</h3>
            <div className="flex gap-2 justify-center">
              <span className="px-2 py-1 text-xs bg-white/20 text-white rounded-full">Students</span>
              <span className="px-2 py-1 text-xs bg-white/20 text-white rounded-full">Educators</span>
            </div>
          </div>
        </div>
      )
    },
    // Research Applications
    {
      title: "Research Applications",
      description: "Visualization tools are essential for researchers working with machine learning algorithms. They provide insights into algorithm analysis, model interpretability, and performance optimization. Researchers can understand how algorithms behave under different conditions, make complex models more transparent, and identify opportunities for improvement.",
      content: (
        <div className="flex items-center justify-center h-full w-full">
          <div className="text-center">
            <div className="text-6xl mb-4">🔬</div>
            <h3 className="text-xl font-bold text-white mb-2">Research & Analysis</h3>
            <div className="flex gap-2 justify-center">
              <span className="px-2 py-1 text-xs bg-white/20 text-white rounded-full">Analysis</span>
              <span className="px-2 py-1 text-xs bg-white/20 text-white rounded-full">Interpretability</span>
              <span className="px-2 py-1 text-xs bg-white/20 text-white rounded-full">Optimization</span>
            </div>
          </div>
        </div>
      )
    },
    // Technology Stack
    {
      title: "Technology & Implementation",
      description: "Built with modern technologies including Next.js 14 with App Router, TypeScript for type safety, Tailwind CSS for styling, Framer Motion for animations, and D3.js for data visualization. The backend uses .NET Core API, Firebase Authentication, Firestore Database, and real-time data processing with RESTful API design.",
      content: (
        <div className="flex items-center justify-center h-full w-full">
          <div className="text-center">
            <div className="text-6xl mb-4">⚙️</div>
            <h3 className="text-xl font-bold text-white mb-2">Modern Stack</h3>
            <div className="flex gap-2 justify-center flex-wrap">
              <span className="px-2 py-1 text-xs bg-white/20 text-white rounded-full">Next.js</span>
              <span className="px-2 py-1 text-xs bg-white/20 text-white rounded-full">TypeScript</span>
              <span className="px-2 py-1 text-xs bg-white/20 text-white rounded-full">D3.js</span>
            </div>
          </div>
        </div>
      )
    },
    // Future Vision
    {
      title: "Future Vision",
      description: "This platform aims to become a comprehensive resource for machine learning education and research. Future developments include expanded algorithm coverage with reinforcement learning and deep learning architectures, interactive learning paths with adaptive difficulty, collaborative features for sharing visualizations, and real-world applications with case studies and datasets.",
      content: (
        <div className="flex items-center justify-center h-full w-full">
          <div className="text-center">
            <div className="text-6xl mb-4">🚀</div>
            <h3 className="text-xl font-bold text-white mb-2">Future Development</h3>
            <div className="flex gap-2 justify-center flex-wrap">
              <span className="px-2 py-1 text-xs bg-white/20 text-white rounded-full">Expanded Coverage</span>
              <span className="px-2 py-1 text-xs bg-white/20 text-white rounded-full">Learning Paths</span>
              <span className="px-2 py-1 text-xs bg-white/20 text-white rounded-full">Collaboration</span>
            </div>
          </div>
        </div>
      )
    },
    // Algorithm Showcase - Linear Regression
    {
      title: algorithms[0].name,
      description: algorithms[0].description,
      content: (
        <div className="flex items-center justify-center h-full w-full">
          <div className="text-center">
            <div className="text-6xl mb-4">{algorithms[0].icon}</div>
            <h3 className="text-xl font-bold text-white mb-2">{algorithms[0].name}</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {algorithms[0].categories.map((category, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 text-xs bg-white/20 text-white rounded-full"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
      )
    },
    // Algorithm Showcase - Logistic Regression
    {
      title: algorithms[1].name,
      description: algorithms[1].description,
      content: (
        <div className="flex items-center justify-center h-full w-full">
          <div className="text-center">
            <div className="text-6xl mb-4">{algorithms[1].icon}</div>
            <h3 className="text-xl font-bold text-white mb-2">{algorithms[1].name}</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {algorithms[1].categories.map((category, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 text-xs bg-white/20 text-white rounded-full"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
      )
    },
    // Algorithm Showcase - K-Means
    {
      title: algorithms[2].name,
      description: algorithms[2].description,
      content: (
        <div className="flex items-center justify-center h-full w-full">
          <div className="text-center">
            <div className="text-6xl mb-4">{algorithms[2].icon}</div>
            <h3 className="text-xl font-bold text-white mb-2">{algorithms[2].name}</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {algorithms[2].categories.map((category, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 text-xs bg-white/20 text-white rounded-full"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
      )
    },
    // Algorithm Showcase - DBSCAN
    {
      title: algorithms[3].name,
      description: algorithms[3].description,
      content: (
        <div className="flex items-center justify-center h-full w-full">
          <div className="text-center">
            <div className="text-6xl mb-4">{algorithms[3].icon}</div>
            <h3 className="text-xl font-bold text-white mb-2">{algorithms[3].name}</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {algorithms[3].categories.map((category, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 text-xs bg-white/20 text-white rounded-full"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
      )
    },
    // Algorithm Showcase - KNN
    {
      title: algorithms[4].name,
      description: algorithms[4].description,
      content: (
        <div className="flex items-center justify-center h-full w-full">
          <div className="text-center">
            <div className="text-6xl mb-4">{algorithms[4].icon}</div>
            <h3 className="text-xl font-bold text-white mb-2">{algorithms[4].name}</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {algorithms[4].categories.map((category, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 text-xs bg-white/20 text-white rounded-full"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
      )
    },
    // Algorithm Showcase - Naive Bayes
    {
      title: algorithms[5].name,
      description: algorithms[5].description,
      content: (
        <div className="flex items-center justify-center h-full w-full">
          <div className="text-center">
            <div className="text-6xl mb-4">{algorithms[5].icon}</div>
            <h3 className="text-xl font-bold text-white mb-2">{algorithms[5].name}</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {algorithms[5].categories.map((category, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 text-xs bg-white/20 text-white rounded-full"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
      )
    },
    // Algorithm Showcase - Random Forest
    {
      title: algorithms[6].name,
      description: algorithms[6].description,
      content: (
        <div className="flex items-center justify-center h-full w-full">
          <div className="text-center">
            <div className="text-6xl mb-4">{algorithms[6].icon}</div>
            <h3 className="text-xl font-bold text-white mb-2">{algorithms[6].name}</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {algorithms[6].categories.map((category, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 text-xs bg-white/20 text-white rounded-full"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
      )
    },
    // Algorithm Showcase - AdaBoost
    {
      title: algorithms[7].name,
      description: algorithms[7].description,
      content: (
        <div className="flex items-center justify-center h-full w-full">
          <div className="text-center">
            <div className="text-6xl mb-4">{algorithms[7].icon}</div>
            <h3 className="text-xl font-bold text-white mb-2">{algorithms[7].name}</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {algorithms[7].categories.map((category, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 text-xs bg-white/20 text-white rounded-full"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
      )
    },
    // Algorithm Showcase - Decision Trees
    {
      title: algorithms[8].name,
      description: algorithms[8].description,
      content: (
        <div className="flex items-center justify-center h-full w-full">
          <div className="text-center">
            <div className="text-6xl mb-4">{algorithms[8].icon}</div>
            <h3 className="text-xl font-bold text-white mb-2">{algorithms[8].name}</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {algorithms[8].categories.map((category, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 text-xs bg-white/20 text-white rounded-full"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
      )
    },
    // Algorithm Showcase - Deep Neural Networks
    {
      title: algorithms[9].name,
      description: algorithms[9].description,
      content: (
        <div className="flex items-center justify-center h-full w-full">
          <div className="text-center">
            <div className="text-6xl mb-4">{algorithms[9].icon}</div>
            <h3 className="text-xl font-bold text-white mb-2">{algorithms[9].name}</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {algorithms[9].categories.map((category, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 text-xs bg-white/20 text-white rounded-full"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        {/* Page Header */}
        <div className="pt-20 pb-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Machine Learning Background
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto px-4">
              Scroll through to explore the world of machine learning algorithms and their applications
            </p>
          </div>
        </div>

        {/* Fullscreen Sticky Scroll Content */}
        <div className="h-[calc(100vh-200px)]">
          <StickyScroll content={pageContent} />
        </div>

        <div className='mx-3'>
          <Footer/>
        </div>
      </div>
    </>
  )
} 