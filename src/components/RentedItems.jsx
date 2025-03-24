// import React from 'react';
// import { Calendar, MapPin, Phone, Mail, Star, ArrowRight, Package, IndianRupee } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import moment from 'moment';
// import axiosInstance from '../config/axios';

// const RentedItems = ({ rentals = [], onRequestUpdate }) => {
//     if (rentals.length === 0) {
//         return <EmptyState type="rented" />;
//     }

//     const handleReturn = async (requestId) => {
//         try {
//             const response = await axiosInstance.patch('/request/return-product', null, {
//                 params: {
//                     requestId
//                 },
//                 withCredentials: true
//             });
//             onRequestUpdate();
//         } catch (error) {
//             console.error('Error returning product:', error);
//         }
//     }

//     return (
//         <div className="grid grid-cols-1 gap-6">
//             {rentals.map((rental) => (
//                 <RentalCard key={rental._id} rental={rental} handleReturn={handleReturn} />
//             ))}
//         </div>
//     );
// };

// const RentalCard = ({ rental, handleReturn }) => {
//     const getStatusBadge = (status) => {
//         const styles = {
//             done: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
//             returned: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
//         };

//         return (
//             <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status]}`}>
//                 {status.charAt(0).toUpperCase() + status.slice(1)}
//             </span>
//         );
//     };
//     return (
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
//             <div className="p-6">
//                 <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
//                     <div className="flex-shrink-0 w-full md:w-48 h-48 mb-4 md:mb-0">
//                         <img
//                             src={rental.product.images[0]}
//                             alt={rental.title}
//                             className="w-full h-full object-cover rounded-lg"
//                         />
//                     </div>

//                     <div className="flex-1">
//                         <div className="flex items-center justify-between mb-4">
//                             <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//                                 {rental?.product?.title}
//                             </h2>
//                             {getStatusBadge(rental.status)}
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//                             <div className="flex items-center text-gray-600 dark:text-gray-400">
//                                 <MapPin className="h-5 w-5 mr-2" />
//                                 <span>{rental?.product?.address?.houseNo} {rental?.product?.address?.street} {rental?.product?.address?.landmark}, {rental.product.address.city}, {rental.product.address.state}-{rental.product.address.pincode}</span>
//                             </div>
//                             <div className="flex items-center text-gray-600 dark:text-gray-400">
//                                 <IndianRupee className="h-5 w-5 mr-2" />
//                                 <span>${rental.priceApplied}/day</span>
//                             </div>
//                             <div className="flex items-center text-gray-600 dark:text-gray-400">
//                                 <Calendar className="h-5 w-5 mr-2" />
//                                 <span>{moment(rental?.dateRange?.startDate).format('DD-MM-YYYY')} to {moment(rental?.dateRange?.endDate).format('DD-MM-YYYY')}</span>
//                             </div>
//                         </div>

//                         <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 mb-2">
//                             <div className="flex items-center">
//                                 <div className="text-lg font-semibold text-gray-900 dark:text-white">
//                                     Total: ₹ {rental.total}
//                                 </div>
//                             </div>

//                             <div className="flex space-x-4">
//                                 {rental.status != 'returned' && (
//                                     <button onClick={handleReturn} className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300">
//                                         <Package className="h-5 w-5 mr-2" />
//                                         Return Item
//                                     </button>
//                                 )}
//                             </div>
//                         </div>
//                         <div className="flex items-center justify-between mb-1">
//                             <h2 className="text-xl font-bold text-gray-900 dark:text-white">
//                                 Owner Details
//                             </h2>
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
//                             <div className="flex items-center text-gray-600 dark:text-gray-400">
//                                 <Star className="h-5 w-5 mr-2 text-yellow-400" />
//                                 <span>{rental.owner.name.fname} {rental.owner.name.lname}</span>
//                             </div>
//                             <div className="flex items-center text-gray-600 dark:text-gray-400">
//                                 <Phone className="h-5 w-5 mr-2" />
//                                 <span>{rental.owner.mobile}</span>
//                             </div>
//                             <div className="flex items-center text-gray-600 dark:text-gray-400">
//                                 <Mail className="h-5 w-5 mr-2" />
//                                 <span>{rental.owner.email}</span>
//                             </div>
//                         </div>
//                         <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
//                             <button className="bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transform transition-all duration-300 ease-in-out hover:bg-yellow-700 hover:scale-105 focus:outline-none">
//                                 Leave a Review
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// };

// const EmptyState = ({ type }) => (
//     <div className="text-center py-12">
//         <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-6 w-24 h-24 flex items-center justify-center mx-auto mb-6">
//             <Package className="h-12 w-12 text-gray-400" />
//         </div>
//         <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
//             No Rented Items
//         </h3>
//         <p className="text-gray-600 dark:text-gray-400">
//             You haven't rented any items to others yet.
//         </p>
//         <Link
//             to="/list-item"
//             className="mt-6 inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300"
//         >
//             List Your First Item
//             <ArrowRight className="h-5 w-5 ml-2" />
//         </Link>
//     </div>
// );

// export default RentedItems;

import React from 'react';
import { Calendar, MapPin, Phone, Mail, Star, ArrowRight, Package, IndianRupee } from 'lucide-react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import axiosInstance from '../config/axios';
import { useState } from 'react';
import ReviewModal from './ReviewModal';

const RentedItems = ({ rentals = [], onRequestUpdate }) => {
    if (rentals.length === 0) {
        return <EmptyState type="rented" />;
    }

    const handleReturn = async (requestId) => {
        try {
            const response = await axiosInstance.patch('/request/return-product', null, {
                params: {
                    requestId
                },
                withCredentials: true
            });
            onRequestUpdate();
        } catch (error) {
            console.error('Error returning product:', error);
        }
    }

    return (
        <div className="grid grid-cols-1 gap-6">
            {rentals.map((rental) => (
                <RentalCard key={rental._id} rental={rental} handleReturn={handleReturn} />
            ))}
        </div>
    );
};

const RentalCard = ({ rental, handleReturn }) => {
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

    const getStatusBadge = (status) => {
        const styles = {
            done: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
            returned: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
        };

        return (
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status]}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };
    return (
        <>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
                        <div className="flex-shrink-0 w-full md:w-48 h-48 mb-4 md:mb-0">
                            <img
                                src={rental.product.images[0]}
                                alt={rental.title}
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {rental?.product?.title}
                                </h2>
                                {getStatusBadge(rental.status)}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="flex items-center text-gray-600 dark:text-gray-400">
                                    <MapPin className="h-5 w-5 mr-2" />
                                    <span>{rental?.product?.address?.houseNo} {rental?.product?.address?.street} {rental?.product?.address?.landmark}, {rental.product.address.city}, {rental.product.address.state}-{rental.product.address.pincode}</span>
                                </div>
                                <div className="flex items-center text-gray-600 dark:text-gray-400">
                                    <IndianRupee className="h-5 w-5 mr-2" />
                                    <span>{rental.priceApplied}/day</span>
                                </div>
                                <div className="flex items-center text-gray-600 dark:text-gray-400">
                                    <Calendar className="h-5 w-5 mr-2" />
                                    <span>{moment(rental?.dateRange?.startDate).format('DD-MM-YYYY')} to {moment(rental?.dateRange?.endDate).format('DD-MM-YYYY')}</span>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 mb-4">
                                <div className="flex items-center">
                                    <div className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Total: ₹ {rental.total}
                                    </div>
                                </div>

                                <div className="flex space-x-4">
                                    {rental.status != 'returned' && (
                                        <button onClick={handleReturn} className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300">
                                            <Package className="h-5 w-5 mr-2" />
                                            Return Item
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center justify-between mb-1">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                    Owner Details
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                                <div className="flex items-center text-gray-600 dark:text-gray-400">
                                    <Star className="h-5 w-5 mr-2 text-yellow-400" />
                                    <span>{rental.owner.name.fname} {rental.owner.name.lname}</span>
                                </div>
                                <div className="flex items-center text-gray-600 dark:text-gray-400">
                                    <Phone className="h-5 w-5 mr-2" />
                                    <span>{rental.owner.mobile}</span>
                                </div>
                                <div className="flex items-center text-gray-600 dark:text-gray-400">
                                    <Mail className="h-5 w-5 mr-2" />
                                    <span>{rental.owner.email}</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                                <button
                                    onClick={() => setIsReviewModalOpen(true)}
                                    className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transform transition-all duration-300 ease-in-out hover:from-yellow-600 hover:to-yellow-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                                >
                                    Leave a Review
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ReviewModal
                isOpen={isReviewModalOpen}
                onClose={() => setIsReviewModalOpen(false)}
                rental={rental}
            />
        </>
    )
};

const EmptyState = ({ type }) => (
    <div className="text-center py-12">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-6 w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <Package className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            No Rented Items
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
            You haven't rented any items to others yet.
        </p>
        <Link
            to="/list-item"
            className="mt-6 inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300"
        >
            List Your First Item
            <ArrowRight className="h-5 w-5 ml-2" />
        </Link>
    </div>
);

export default RentedItems;