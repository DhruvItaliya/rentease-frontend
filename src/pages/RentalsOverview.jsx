import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import RentedItems from '../components/RentedItems';
import LentItems from '../components/LentItems';
import axiosInstance from '../config/axios';

const RentalsOverview = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get('tab') || 'lent';
  const [activeTab, setActiveTab] = useState(tab);
  const [rentedItems, setRentedItems] = useState([]);
  const [lentItems, setLentItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 'rented') {
      fetchRentedItems();
    } else {
      fetchLentItems();
    }
  }, [activeTab]);

  useEffect(() => {
    setSearchParams({ tab: activeTab });
  }, [activeTab]);

  const fetchRentedItems = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get('/request/get-rental-request', {
        params: {
          isOwner: false,
          isDeleted: false,
          status: ['done', 'returned'],
        },
        withCredentials: true
      });
      console.log('Sent requests:', response.data.data);
      setRentedItems(response.data.data);
    } catch (error) {
      console.error('Error fetching sent requests:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLentItems = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get('/request/get-rental-request', {
        params: {
          isOwner: true,
          isDeleted: false,
          status: ['done', 'returned']
        },
        withCredentials: true
      });
      setLentItems(response.data.data);
    } catch (error) {
      console.error('Error fetching received requests:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
            My Items
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Manage your rented and lent items
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-1 shadow-md">
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveTab('lent')}
                className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === 'lent'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
              >
                Lent Items
              </button>
              <button
                onClick={() => setActiveTab('rented')}
                className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === 'rented'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
              >
                Rented Items
              </button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        ) : (
          <>
            {activeTab === 'rented' && (
              <RentedItems rentals={rentedItems} onRequestUpdate={fetchRentedItems} />
            )}
            {activeTab === 'lent' && (
              <LentItems rentals={lentItems} onRequestUpdate={fetchLentItems} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RentalsOverview;