"use client"
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { algorithms, categories } from '../data/algorithms'
// import { useAuth } from '../contexts/AuthContext'

export default function AlgorithmFilter() {
  // const { isAuthenticated, openLoginModal } = useAuth()
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['all'])
  const [searchQuery, setSearchQuery] = useState('')

  // Add effect to check for empty results
  useEffect(() => {
    const hasResults = algorithms.some(algorithm => {
      const matchesCategory = selectedCategories.includes('all') || 
        algorithm.categories.some(category => selectedCategories.includes(category))
      const matchesSearch = searchQuery === '' || 
        algorithm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        algorithm.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })

    if (!hasResults && !selectedCategories.includes('all')) {
      setSelectedCategories(['all'])
    }
  }, [selectedCategories, searchQuery])

  const handleCategoryClick = (categoryId: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (categoryId === 'all') {
      setSelectedCategories(['all'])
    } else {
      setSelectedCategories(prev => {
        const newCategories = prev.filter(cat => cat !== 'all')
        if (prev.includes(categoryId)) {
          return newCategories.filter(cat => cat !== categoryId)
        } else {
          return [...newCategories, categoryId]
        }
      })
    }
  }

  const handleAlgorithmClick = (algorithmPath: string, e: React.MouseEvent) => {
    e.preventDefault();
    
    // Remove authentication requirement - allow direct navigation
    // if (!isAuthenticated) {
    //   openLoginModal();
    //   return;
    // }
    
    // Navigate directly to the algorithm page
    window.location.href = algorithmPath;
  }

  const filteredAlgorithms = algorithms
    .filter(algorithm => {
      const matchesCategory = selectedCategories.includes('all') || 
        algorithm.categories.some(category => selectedCategories.includes(category))
      const matchesSearch = searchQuery === '' || 
        algorithm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        algorithm.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
    .sort((a, b) => {
      if (selectedCategories.includes('all')) return 0;
      
      const aMatches = a.categories.filter(cat => selectedCategories.includes(cat)).length;
      const bMatches = b.categories.filter(cat => selectedCategories.includes(cat)).length;
      
      if (bMatches !== aMatches) {
        return bMatches - aMatches; // Sort in descending order
      }
      return 0; // Maintain original order if matches are equal
    });

  return (
    <div id="algorithms-section" className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 min-h-[800px]">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Explore ML Algorithms
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-gray-300">
              Select an algorithm to visualize and understand its behavior
            </p>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="mt-6 sm:mt-8 max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search algorithms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-200 text-sm sm:text-base"
              />
              <svg
                className="absolute right-3 top-2.5 h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-2 sm:gap-4">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  onClick={(e) => handleCategoryClick(category.id, e)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200
                    ${selectedCategories.includes(category.id)
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  type="button"
                >
                  {category.name}
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Selected Category Description */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="mt-3 sm:mt-4 text-center">
            <p className="text-gray-400 text-xs sm:text-sm">
              {categories.find(cat => cat.id === selectedCategories[0])?.description}
            </p>
          </div>
        </motion.div>

        {/* Algorithm Cards */}
        <div className="mt-8 sm:mt-12 grid gap-4 sm:gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 min-h-[500px] relative">
          <AnimatePresence mode="popLayout">
            {filteredAlgorithms.map((algorithm, index) => (
              <motion.div
                key={algorithm.name}
                layout
                layoutId={`card-${algorithm.name}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ 
                  layout: { duration: 0.3, ease: "easeInOut" },
                  opacity: { duration: 0.3 },
                  y: { duration: 0.3 },
                  delay: index * 0.05,
                  ease: "easeOut"
                }}
                style={{ 
                  position: 'relative',
                  width: '100%',
                  height: '220px'
                }}
              >
                <div
                  onClick={(e) => handleAlgorithmClick(algorithm.path, e)}
                  className="group relative bg-gray-800 rounded-xl p-4 sm:p-6 hover:bg-gray-700 transition-colors duration-300 flex flex-col h-full w-full overflow-hidden cursor-pointer"
                >
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                      <span className="text-3xl sm:text-4xl block flex-shrink-0">
                        {algorithm.icon}
                      </span>
                    </motion.div>
                    <div className="flex-grow min-w-0">
                      <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-purple-400 transition-colors duration-300 truncate">
                        {algorithm.name}
                      </h3>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {algorithm.categories.map(category => (
                          <span key={category} className="text-[10px] sm:text-xs text-purple-400 bg-purple-900/30 px-1.5 sm:px-2 py-0.5 rounded-full">
                            {categories.find(cat => cat.id === category)?.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex-grow flex flex-col justify-between">
                    <p className="mt-3 sm:mt-4 text-sm text-gray-300 line-clamp-3 leading-relaxed">
                      {algorithm.description}
                    </p>
                    <div className="mt-3 sm:mt-4 pt-2">
                      <motion.div 
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                      >
                        <div className="flex items-center text-purple-400 group-hover:text-purple-300 transition-colors duration-300 inline-flex">
                          <span className="text-xs sm:text-sm font-medium">Learn more</span>
                          <motion.svg
                            className="ml-1.5 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            whileHover={{ x: 2 }}
                            transition={{ duration: 0.2 }}
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </motion.svg>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* No Results Message */}
        <AnimatePresence>
          {filteredAlgorithms.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-center mt-8 sm:mt-12">
                <p className="text-gray-400 text-sm sm:text-lg">
                  No algorithms found in this category.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
} 
