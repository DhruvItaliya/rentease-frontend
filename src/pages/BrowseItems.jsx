import React, { useEffect, useState } from 'react';
import { Search, Star, MapPin, Calendar, PackageSearch, Sliders, Heart, Shapes } from 'lucide-react';
import { toast } from 'react-toastify';
import axiosInstance from '../config/axios';
import RentModal from '../components/RentModal';
import { Link } from 'react-router-dom';
import { getStorage } from '../utils/storageUtils';

const BrowseItems = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [items, setItems] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [wishlistProducts, setWishlistProducts] = useState(new Set());
  const userData = getStorage('userData');

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      fetchItems();
    }, 1000);
    return () => clearTimeout(timeOutId);
  }, [selectedCategory, searchQuery]);

  function formatDate(dateString) {
    const date = new Date(dateString);

    // Get day, month, and year
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' }); // Get short month name (e.g., Jan, Feb)
    const year = date.getFullYear();

    // Get the ordinal suffix for the day
    const ordinal = (n) => {
      if (n > 3 && n < 21) return 'th'; // Special case for 11th to 13th
      switch (n % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };

    // Format and return the final string
    return `${day}${ordinal(day)} ${month} ${year}`;
  }

  const fetchItems = async () => {
    setIsLoading(true);
    const params = selectedCategory === 'all' ? { category: null } : { category: selectedCategory };
    if (searchQuery) {
      params.searchTerm = searchQuery;
    }
    try {
      const { data } = await axiosInstance.get(`/product/get-products`, {
        params,
        withCredentials: true
      });
      if (userData) {
        const wishlist = await axiosInstance.get(`/product/get-wishlist`, {},
          {
            withCredentials: true
          });
        setWishlistProducts(new Set(wishlist.data.data));
      }
      setItems(data.data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = async (productId) => {
    try {
      const res = await axiosInstance.patch(`/product/like/${productId}`, {}, { withCredentials: true });
      if (res.data.added)
        setWishlistProducts(prev => (new Set([...prev, productId])))
      else {
        setWishlistProducts(prev => {
          const updatedSet = new Set(prev);
          updatedSet.delete(productId);  // Remove the productId from the Set
          return updatedSet;
        });
      }
    }
    catch (error) {
      toast.error('Something went wrong!');
    }
  }

  const categories = [
    "all",
    "Electronics",
    "Sports",
    "Tools",
    "Home & Garden",
    "Fashion",
    "Books",
    "Music",
    "Art"
  ];

  const LoadingCard = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    </div>
  );

  const NoResultsFound = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-full p-8 mb-6 shadow-inner">
        <PackageSearch className="w-20 h-20 text-emerald-600 dark:text-emerald-400" />
      </div>
      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
        No Items Found
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-8 text-lg">
        {searchQuery
          ? `We couldn't find any items matching "${searchQuery}"`
          : "No items available in this category yet"}
      </p>
      <div className="space-y-6 text-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Try these suggestions:</p>
        <ul className="space-y-3 text-left">
          <li className="flex items-center text-gray-700 dark:text-gray-300">
            <span className="h-2 w-2 rounded-full bg-emerald-500 mr-3"></span>
            Using more general search terms
          </li>
          <li className="flex items-center text-gray-700 dark:text-gray-300">
            <span className="h-2 w-2 rounded-full bg-teal-500 mr-3"></span>
            Checking different categories
          </li>
          <li className="flex items-center text-gray-700 dark:text-gray-300">
            <span className="h-2 w-2 rounded-full bg-cyan-500 mr-3"></span>
            Removing any filters
          </li>
        </ul>
        <div className="pt-6">
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white hover:from-emerald-700 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      {/* Hero Section with Search */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
            Discover Amazing Items to Rent
          </h1>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="What would you like to rent?"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex space-x-2">
                <select
                  className="block w-full pl-3 pr-10 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
                <button className="p-3 rounded-xl bg-emerald-500 text-white hover:bg-emerald-700 transition-colors duration-200">
                  <Sliders className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <LoadingCard key={n} />
            ))}
          </div>
        ) : items && items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => (
              <div
                key={item._id}
                className="group bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative h-48">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <div className="bg-white dark:bg-gray-800 rounded-full px-3 py-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400 shadow-lg">
                      ₹{item.pricePerDay}/day
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-2 flex space-x-2">
                    <button onClick={() => handleLike(item._id)} className="p-2 bg-white dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 shadow-lg transition-colors duration-200">
                      <Heart className={`h-4 w-4 ${wishlistProducts.has(item._id) ? 'fill-red-500 text-red-500' : ''}`} />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Shapes className="h-4 w-4 mr-2" />
                      {item.category}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <MapPin className="h-4 w-4 mr-2" />
                      {`${item.address.city}, ${item.address.state}`}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="h-4 w-4 mr-2" />
                      Buy Date : {formatDate(item.buyDate)}
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                        {item.rating} · by {item.owner.name.fname} {item.owner.name.lname}
                      </span>
                    </div>
                  </div>
                  <div className='grid grid-cols-2 gap-2'>
                    <Link to={`/product-details`} state={{ productId: item._id }}>
                      <button
                        className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white font-medium py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:focus:ring-offset-gray-800"
                      >
                        View Details
                      </button>
                    </Link>
                    <button
                      onClick={() => {
                        setSelectedItem(item);
                        setIsModalOpen(true);
                      }}
                      className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white font-medium py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:focus:ring-offset-gray-800"
                    >
                      Rent Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <NoResultsFound />
        )}
      </div>
      {
        isModalOpen && selectedItem && (
          <RentModal
            item={selectedItem}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        )
      }
    </div >
  );
};

export default BrowseItems;