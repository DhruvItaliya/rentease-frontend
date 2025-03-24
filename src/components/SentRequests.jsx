import React from 'react';
import { Calendar, MapPin, IndianRupee, Clock, CheckCircle, XCircle, Send, CreditCard } from 'lucide-react';
import moment from 'moment';
import axiosInstance from '../config/axios';
import { toast } from 'react-toastify';

const SentRequests = ({ requests = [], onRequestUpdate }) => {
    const handleCancelRequest = (requestId) => {
        // Handle cancel request logic
        axiosInstance.patch(`request/cancel-request`, {
            requestId: requestId
        }).then((res) => {
            toast.success('Request cancelled!');
            onRequestUpdate();
        }).catch((err) => {
            toast.error('Request cancel failed!');
        });
    };

    const handleMakePayment = (requestId) => {
        // Handle payment logic
        axiosInstance.post(`request/make-payment`,{
            requestId: requestId
        }).then((res)=>{
            window.location = res.data.data;
            toast.info('Processing payment...');
            console.log('Processing payment for request:', requestId);
        }).catch((err)=>{
            toast.error('Payment Failed');
        });
        // In a real app, you would redirect to a payment gateway or open a payment modal
    };

    if (requests.length === 0) {
        return <EmptyState />;
    }

    return (
        <div className="grid grid-cols-1 gap-6">
            {requests.map(request => (
                <RequestCard
                    key={request._id}
                    request={request}
                    onCancel={handleCancelRequest}
                    onMakePayment={handleMakePayment}
                />
            ))}
        </div>
    );
};

const RequestCard = ({ request, onCancel, onMakePayment }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'approved':
            case 'done':
                return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
            case 'rejected':
                return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
            default:
                return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'approved':
            case 'done':
                return <CheckCircle className="h-5 w-5" />;
            case 'rejected':
                return <XCircle className="h-5 w-5" />;
            default:
                return <Clock className="h-5 w-5" />;
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
                    <div className="flex-shrink-0 w-full md:w-48 h-48 mb-4 md:mb-0">
                        <img
                            src={request.product.images[0]}
                            alt={request.product.title}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                {request.product.title}
                            </h2>
                            <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                                {getStatusIcon(request.status)}
                                <span className="ml-2 capitalize">
                                    {request.status}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div className="flex items-center text-gray-600 dark:text-gray-400">
                                <MapPin className="h-5 w-5 mr-2" />
                                <span>{request.product.address.city}</span>
                            </div>
                            <div className="flex items-center text-gray-600 dark:text-gray-400">
                                <IndianRupee className="h-5 w-5 mr-2" />
                                <span>{request.priceApplied}/day</span>
                            </div>
                            <div className="flex items-center text-gray-600 dark:text-gray-400">
                                <Calendar className="h-5 w-5 mr-2" />
                                <span>{moment(request.dateRange.startDate).format('DD-MM-YYYY')} to {moment(request.dateRange.endDate).format('DD-MM-YYYY')}</span>
                            </div>
                            <div className="flex items-center text-gray-600 dark:text-gray-400">
                                <Clock className="h-5 w-5 mr-2" />
                                <span>{request.numberOfDays} days</span>
                            </div>
                        </div>

                        {/* Total price section */}
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700 dark:text-gray-300 font-medium">Total Price:</span>
                                <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">₹{request.total}</span>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                            <div className="flex space-x-4">
                                <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300">
                                    View Details
                                </button>

                                {request.status === 'pending' && (
                                    <button
                                        onClick={() => onCancel(request._id)}
                                        className="inline-flex items-center px-4 py-2 border border-red-300 dark:border-red-600 rounded-lg shadow-sm text-sm font-medium text-red-700 dark:text-red-300 bg-white dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300"
                                    >
                                        Cancel Request
                                    </button>
                                )}

                                {request.status === 'approved' && (
                                    <button
                                        onClick={() => onMakePayment(request._id)}
                                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300"
                                    >
                                        <CreditCard className="h-5 w-5 mr-2" />
                                        Make Payment
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const EmptyState = () => (
    <div className="text-center py-12">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-6 w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <Send className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            No Sent Requests
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
            You haven't sent any rental requests yet.
        </p>
    </div>
);

export default SentRequests;