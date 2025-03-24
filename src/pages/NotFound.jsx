import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full text-center">
        {/* 404 Illustration */}
        <div className="relative">
          <div className="text-[180px] font-bold leading-none tracking-tight bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
            404
          </div>
          <div className="absolute top-0 right-4 animate-bounce">
            <Search className="w-16 h-16 text-emerald-600 dark:text-emerald-400" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="mt-8 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
          Page Not Found
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Oops! The page you're looking for seems to have gone on a rental adventure.
          Let's help you find your way back.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white hover:from-emerald-700 hover:to-teal-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-6 py-3 rounded-full border border-emerald-200 dark:border-emerald-700 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transform hover:-translate-y-0.5 transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
        </div>

        {/* Quick Links */}
        <div className="mt-12">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">
            Or try these popular pages
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/browse"
              className="px-4 py-2 rounded-full bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              Browse Items
            </Link>
            <Link
              to="/list-item"
              className="px-4 py-2 rounded-full bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              List Your Item
            </Link>
            <Link
              to="/signin"
              className="px-4 py-2 rounded-full bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;