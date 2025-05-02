import { Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import { FaGlobeAmericas, FaList, FaBookmark, FaBars, FaSignOutAlt } from 'react-icons/fa'
import { useState } from 'react'
import { useAuth } from '../context/authContext'
import { doSignOut } from '../firebase/auth'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { userLoggedIn } = useAuth()

  const handleSignOut = async () => {
    try {
      await doSignOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg py-4 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link 
          to="/countries" 
          className="text-2xl font-bold text-gray-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
        >
          <span className="flex items-center gap-2">
            🌍 <span className="hidden sm:inline">Explore Countries</span>
          </span>
        </Link>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <FaBars className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/countries" 
            className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-200"
          >
            <span>Countries</span>
          </Link>
          
          {userLoggedIn && (
            <>
              <Link 
                to="/favorites" 
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-200"
              >
                <span>Favorites</span>
              </Link>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-red-500 dark:hover:text-red-400 transition-all duration-200"
              >
                <FaSignOutAlt className="h-5 w-5" />
                <span>Sign Out</span>
              </button>
            </>
          )}
          
          {!userLoggedIn && (
            <Link 
              to="/login" 
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-200"
            >
              <span>Sign In</span>
            </Link>
          )}
          
          <ThemeToggle />
        </nav>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 shadow-lg md:hidden">
            <nav className="flex flex-col p-4 space-y-2">
              <Link 
                to="/countries" 
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>Countries</span>
              </Link>
              
              {userLoggedIn && (
                <>
                  <Link 
                    to="/favorites" 
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>Favorites</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-red-500 dark:hover:text-red-400 transition-all duration-200 w-full text-left"
                  >
                    <FaSignOutAlt className="h-5 w-5" />
                    <span>Sign Out</span>
                  </button>
                </>
              )}
              
              {!userLoggedIn && (
                <Link 
                  to="/login" 
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>Sign In</span>
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header