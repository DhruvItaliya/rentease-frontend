import React, { useContext } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Hero = () => {
  const { isAutheticated } = useContext(AuthContext);
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-emerald-100 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32">
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-gray-900 dark:text-white sm:text-7xl">
          Rent Anything{' '}
          <span className="relative whitespace-nowrap">
            <span className="relative bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              From Anyone
            </span>
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
          Connect with people in your community to rent items you need or share things you own.
          Save money, reduce waste, and help your neighbors.
        </p>

        {/* Search Bar */}
        <div className="mt-8 max-w-2xl mx-auto">
          <div className="flex items-center bg-white dark:bg-gray-700 rounded-full shadow-lg p-2">
            <Search className="h-5 w-5 text-gray-400 dark:text-gray-300 ml-3" />
            <input
              type="text"
              placeholder="What would you like to rent?"
              className="flex-1 px-4 py-2 bg-transparent focus:outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
            <button className="px-6 py-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white hover:from-emerald-700 hover:to-teal-600">
              Search
            </button>
          </div>
        </div>

        <div className="mt-10 flex justify-center gap-x-6">
          <Link
            to="/browse"
            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white hover:from-emerald-700 hover:to-teal-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Browse Items
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          {isAutheticated && <Link
            to="/list-item"
            className="inline-flex items-center px-6 py-3 rounded-full border border-emerald-400 dark:border-emerald-700 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transform hover:-translate-y-0.5 transition-all duration-200"
          >
            List Your Item
          </Link>}
        </div>
      </div>
    </div>
  );
};

export default Hero;