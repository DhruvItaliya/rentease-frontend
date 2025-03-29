import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Calendar, MapPin, IndianRupee, Package, Info, Star } from 'lucide-react';
import ProductReviews from '../components/ProductReviews';
import RentModal from '../components/RentModal';
import axiosInstance from '../config/axios';

const ProductDetails = () => {
    const location = useLocation();
    const { productId } = location.state;
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {
        const fetchProductAndReviews = async () => {
            try {
                console.log(productId)
                // Mock data based on your MongoDB structure
                const productData = await axiosInstance.get(`product/get-product-by-id/${productId}`, {}, { withCredentials: true })
                console.log(productData)
                setProduct(productData.data.data);
                const reviewData = await axiosInstance.get(`review/get-product-reviews`, { params: { productId }, withCredentials: true })
                console.log(reviewData)
                setReviews(reviewData.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product details:', error);
                setLoading(false);
            }
        };

        fetchProductAndReviews();
    }, [productId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            {product ? <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Product Details */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                            {/* Product Image */}
                            <div className="relative">
                                <img
                                    src={product.images[0]}
                                    alt={product.title}
                                    className="w-full h-[400px] object-cover rounded-lg"
                                />
                                {product.isAvailable && (
                                    <span className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                        Available
                                    </span>
                                )}
                            </div>

                            {/* Product Info */}
                            <div className="space-y-6">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                        {product.title}
                                    </h1>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {product.description}
                                    </p>
                                </div>

                                {/* Pricing */}
                                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 dark:text-gray-400">Daily Rate</span>
                                        <span className="text-lg font-semibold text-gray-900 dark:text-white">
                                            ₹{product.pricePerDay}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 dark:text-gray-400">Weekly Rate</span>
                                        <span className="text-lg font-semibold text-gray-900 dark:text-white">
                                            ₹{product.pricePerWeek}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 dark:text-gray-400">Monthly Rate</span>
                                        <span className="text-lg font-semibold text-gray-900 dark:text-white">
                                            ₹{product.pricePerMonth}
                                        </span>
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="space-y-4">
                                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                                        <Calendar className="h-5 w-5 mr-2" />
                                        <span>Purchase Date: {new Date(product.buyDate).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                                        <MapPin className="h-5 w-5 mr-2" />
                                        <span>
                                            {product.address.city}, {product.address.state} - {product.address.pincode}
                                        </span>
                                    </div>
                                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                                        <Package className="h-5 w-5 mr-2" />
                                        <span>Category: {product.category}</span>
                                    </div>
                                </div>

                                {/* Owner Info */}
                                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                        Owner Information
                                    </h3>
                                    <div className="space-y-2">
                                        <p className="text-gray-600 dark:text-gray-400">
                                            {product.owner.name.fname} {product.owner.name.lname}
                                        </p>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex space-x-4">
                                    <button onClick={() => setIsModalOpen(true)} className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-3 px-6 rounded-lg hover:from-emerald-700 hover:to-teal-600 transition-all duration-200 font-medium">
                                        Rent Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Reviews Section */}
                    {reviews.length > 0 ? <div className="mt-12">
                        <ProductReviews reviews={reviews} productId={productId} setReviews={setReviews} />
                    </div> :
                        <div className="mt-12">
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center text-2xl dark:text-gray-400 text-gray-600">
                                Be the first Person to make Review
                            </div>
                        </div>}
                </div>
            </div> :
                <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 text-white text-center text-3xl">
                    Product Not Found!
                </div>
            }

            {isModalOpen && product && (
                <RentModal
                    item={product}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </>
    );
};

export default ProductDetails;