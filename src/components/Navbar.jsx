import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Search, Package, PlusCircle, Sun, Moon, LogOut, User, LogIn, Bell } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="fixed w-full z-50 shadow-sm bg-white/80 dark:bg-gray-950/80 backdrop-blur-md transition-colors duration-200 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <NavLink to="/" className={({ isActive }) => isActive ? "flex items-center space-x-2 text-emerald-600" : "flex items-center space-x-2"}>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                RentEase
              </span>
            </NavLink>

            <div className="flex items-center space-x-4">
              <NavLink to="/" className={({ isActive }) => isActive ? "text-emerald-600 dark:text-emerald-400" : "text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400"}>Home</NavLink>
              <NavLink to="/browse" className={({ isActive }) => isActive ? "text-emerald-600 dark:text-emerald-400" : "text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400"}>Browse Items</NavLink>
              {isAuthenticated && <NavLink to="/list-item" className={({ isActive }) => isActive ? "text-emerald-600 dark:text-emerald-400" : "text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400"}>List Your Item</NavLink>}
              {isAuthenticated && <NavLink to="/rentals" className={({ isActive }) => isActive ? "text-emerald-600 dark:text-emerald-400" : "text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400"}>Rentals</NavLink>}
              {isAuthenticated && <NavLink to="/requests" className={({ isActive }) => isActive ? "text-emerald-600 dark:text-emerald-400" : "text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400"}>Requests</NavLink>}
              {isAuthenticated && <NavLink to="/dashboard" className={({ isActive }) => isActive ? "text-emerald-600 dark:text-emerald-400" : "text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400"}>Dashboard</NavLink>}
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              {isAuthenticated && (
                <NavLink
                  to='/profile'
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white hover:from-emerald-700 hover:to-teal-600"
                >
                  <User className="w-4 h-4" />
                </NavLink>
              )}
              {isAuthenticated ? (
                <button
                  onClick={() => { logout(); navigate('/') }}
                  className="inline-flex items-center px-4 py-2 rounded-md bg-gradient-to-r from-emerald-600 to-teal-500 text-white hover:from-emerald-700 hover:to-teal-600"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              ) : (
                <NavLink
                  to="/signin"
                  className="inline-flex items-center px-4 py-2 rounded-md bg-gradient-to-r from-emerald-600 to-teal-500 text-white hover:from-emerald-700 hover:to-teal-600"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md transition-colors duration-200 md:hidden">
        <div className="px-4 h-16 flex items-center justify-between">
          <NavLink to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              RentEase
            </span>
          </NavLink>
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            {isAuthenticated && (
              <NavLink
                to="/requests"
                className={({ isActive }) =>
                  `p-2 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-700 dark:text-gray-200'}`
                }
              >
                <Bell className="h-5 w-5" />
              </NavLink>
            )}
            {isAuthenticated && (
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `p-2 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-700 dark:text-gray-200'
                  }`
                }
              >
                <User className="h-6 w-6" />
              </NavLink>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 md:hidden">
        <div className="px-4 py-2">
          <div className="flex items-center justify-around">
            <NavLink
              to="/browse"
              className={({ isActive }) =>
                `flex flex-col items-center p-2 ${isActive
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-gray-700 dark:text-gray-400'
                }`
              }
            >
              <Search className="h-6 w-6" />
              <span className="text-xs mt-1">Browse</span>
            </NavLink>
            {isAuthenticated && (
              <NavLink
                to="/requests"
                className={({ isActive }) =>
                  `flex flex-col items-center p-2 ${isActive
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-gray-700 dark:text-gray-400'
                  }`
                }
              >
                <Package className="h-6 w-6" />
                <span className="text-xs mt-1">Requests</span>
              </NavLink>
            )}
            {isAuthenticated && (
              <NavLink
                to="/list-item"
                className={({ isActive }) =>
                  `flex flex-col items-center p-2 ${isActive
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-gray-700 dark:text-gray-400'
                  }`
                }
              >
                <PlusCircle className="h-6 w-6" />
                <span className="text-xs mt-1">List Item</span>
              </NavLink>
            )}
            {isAuthenticated && (
              <NavLink
                to="/rentals"
                className={({ isActive }) =>
                  `flex flex-col items-center p-2 ${isActive
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-gray-700 dark:text-gray-400'
                  }`
                }
              >
                <Package className="h-6 w-6" />
                <span className="text-xs mt-1">Rentals</span>
              </NavLink>
            )}
            {isAuthenticated ? (
              <button
                onClick={() => { logout(); navigate('/') }}
                className={`flex flex-col items-center p-2 text-gray-700 dark:text-gray-400`}
              >
                <LogOut className="h-6 w-6" />
                <span className="text-xs mt-1">Sign Out</span>
              </button>
            ) : (
              <NavLink
                to="/signin"
                className={
                  ({ isActive }) =>
                    `flex flex-col items-center p-2 ${isActive
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-gray-700 dark:text-gray-400'
                    }`
                }
              >
                <LogIn className="h-6 w-6" />
                <span className="text-xs mt-1">Sign In</span>
              </NavLink>
            )}
          </div>
        </div>
      </nav >
    </>
  );
};

export default Navbar;