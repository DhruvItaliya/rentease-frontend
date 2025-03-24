import React from 'react';
import { Calendar, MapPin, IndianRupee, Clock, CheckCircle, XCircle, MailOpen } from 'lucide-react';
import moment from 'moment';
import axiosInstance from '../config/axios';
import { toast } from 'react-toastify';

const ReceivedRequests = ({ requests = [], onRequestUpdate }) => {

    const handleApprove = (requestId) => {
        // Handle approve logic
        axiosInstance.patch(`request/approve-request`, {
            requestId: requestId
        }).then((res) => {
            toast.success('Request approved!');
            onRequestUpdate();
        }).catch((err) => {
            toast.error('Request approve failed!');
        })
    };

    const handleDecline = (requestId) => {
        // Handle decline logic
        axiosInstance.patch(`request/reject-request`, {
            requestId: requestId
        }).then((res) => {
            toast.success('Request Declined!');
            onRequestUpdate();
        }).catch((err) => {
            toast.error('Request decline failed!');
        })
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
                    onApprove={handleApprove}
                    onDecline={handleDecline}
                />
            ))}
        </div>
    );
};

const RequestCard = ({ request, onApprove, onDecline }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'approved':
            case 'done':
                return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
            case 'declined':
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
                                <span className="ml-2">
                                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
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

                        {request.message && (
                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-4">
                                <p className="text-gray-700 dark:text-gray-300">
                                    "{request.message}"
                                </p>
                            </div>
                        )}

                        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                            {request.status === 'pending' ? (
                                <div className="flex space-x-4">
                                    <button
                                        onClick={() => onApprove(request._id)}
                                        className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300"
                                    >
                                        <CheckCircle className="h-5 w-5 mr-2" />
                                        Approve Request
                                    </button>
                                    <button
                                        onClick={() => onDecline(request._id)}
                                        className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300"
                                    >
                                        <XCircle className="h-5 w-5 mr-2" />
                                        Decline Request
                                    </button>
                                </div>
                            ) : (
                                <div className="flex space-x-4">
                                    <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300">
                                        View Details
                                    </button>
                                </div>
                            )}
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
            <MailOpen className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            No Received Requests
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
            You don't have any rental requests to review at the moment.
        </p>
    </div>
);

export default ReceivedRequests;