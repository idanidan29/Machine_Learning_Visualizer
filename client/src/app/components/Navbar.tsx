"use client"
import Link from 'next/link'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { LogoutModal } from './LogoutModal'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const { isAuthenticated, user, logout, openLoginModal } = useAuth()

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const handleLogoutClick = () => {
    console.log('Logout button clicked')
    setShowLogoutModal(true)
  }

  const handleLogoutConfirm = () => {
    console.log('Logout confirmed')
    logout()
    setShowLogoutModal(false)
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Logo */}
            <div className="flex-shrink-0">
              <button onClick={scrollToTop} className="text-white font-bold text-xl hover:text-purple-400 transition-colors duration-200">
                ML Visualizer
              </button>
            </div>

            {/* Center - Welcome message */}
            {isAuthenticated && (
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
                <span className="text-gray-300 text-sm">
                  Welcome, {user?.firstName}
                </span>
              </div>
            )}

            {/* Right side - Navigation */}
            <div className="flex items-center space-x-4">
              <Link 
                href="/" 
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Home
              </Link>
              
              {isAuthenticated ? (
                <button
                  onClick={handleLogoutClick}
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={openLoginModal}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Login
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                {isMenuOpen ? 'Close' : 'Menu'}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link 
                  href="/" 
                  className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                >
                  Home
                </Link>
                
                {isAuthenticated ? (
                  <div className="border-t border-gray-700 pt-2 mt-2">
                    <div className="px-3 py-2">
                      <span className="text-gray-300 text-sm">Welcome, {user?.firstName}</span>
                    </div>
                    <button
                      onClick={handleLogoutClick}
                      className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 w-full text-left"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={openLoginModal}
                    className="bg-purple-600 hover:bg-purple-700 text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 w-full text-left mt-2"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogoutConfirm}
      />
    </>
  )
} 