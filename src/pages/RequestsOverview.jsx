import React, { useState, useEffect } from 'react';
import axiosInstance from '../config/axios';
import ReceivedRequests from '../components/ReceivedRequests';
import SentRequests from '../components/SentRequests';
import { useSearchParams } from 'react-router-dom';

const RequestsOverview = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get('tab') || 'received';
  const [activeTab, setActiveTab] = useState(tab);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 'received') {
      fetchReceivedRequests();
    } else {
      fetchSentRequests();
    }
  }, [activeTab]);

  useEffect(() => {
    setSearchParams({ tab: activeTab });
  }, [activeTab]);

  const fetchReceivedRequests = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get('/request/get-rental-request', {
        params: {
          isOwner: true,
          isDeleted: false,
          status: ['pending', 'approved', 'rejected']
        },
        withCredentials: true
      });
      console.log('Received requests:', response.data.data);
      setReceivedRequests(response.data.data);
    } catch (error) {
      console.error('Error fetching received requests:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSentRequests = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get('/request/get-rental-request', {
        params: {
          isOwner: false,
          isDeleted: false,
          status: ['pending', 'approved', 'rejected']
        },
        withCredentials: true
      });
      console.log('Sent requests:', response.data.data);
      setSentRequests(response.data.data);
    } catch (error) {
      console.error('Error fetching sent requests:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
            Rental Requests
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Manage your received and sent rental requests
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-1 shadow-md">
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveTab('received')}
                className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === 'received'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
              >
                Received Requests
              </button>
              <button
                onClick={() => setActiveTab('sent')}
                className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === 'sent'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
              >
                Sent Requests
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
            {activeTab === 'received' ? (
              <ReceivedRequests requests={receivedRequests} onRequestUpdate={fetchReceivedRequests} />
            ) : (
              <SentRequests requests={sentRequests} onRequestUpdate={fetchSentRequests} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RequestsOverview;