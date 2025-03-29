import React, { useState } from 'react';
import { Star, X, Upload, Camera, Trash2 } from 'lucide-react';
import axiosInstance from '../config/axios';

const ReviewModal = ({ isOpen, onClose, rental }) => {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [review, setReview] = useState('');
    const [images, setImages] = useState([]);
    const [imageURLs, setImageURLs] = useState([]);

    if (!isOpen) return null;

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages([...images, ...files]);

        const newImageURLs = files.map(file => URL.createObjectURL(file));
        setImageURLs([...imageURLs, ...newImageURLs]);
    };

    const removeImage = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        const newImageURLs = imageURLs.filter((_, i) => i !== index);
        setImages(newImages);
        setImageURLs(newImageURLs);
    };

    const handleSubmit = async (productId, rentId, e) => {
        console.log(rental)
        e.preventDefault();
        // Handle review submission logic here
        await axiosInstance.post(`review/add-product-review`, {
            payload: {
                productId,
                rentId,
                rating,
                review
            }
        }, { withCredentials: true })
        console.log({ rating, review, images });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="absolute top-0 right-0 pt-4 pr-4">
                        <button
                            onClick={onClose}
                            className="bg-white dark:bg-gray-800 rounded-full p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="px-4 pt-5 pb-4 sm:p-6">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                    Rate Your Experience
                                </h3>

                                <form onSubmit={(e) => handleSubmit(rental.product._id, rental._id, e)} className="space-y-6">
                                    {/* Product Info */}
                                    <div className="flex items-center space-x-4">
                                        <img
                                            src={rental?.product?.images[0]}
                                            alt={rental?.product?.title}
                                            className="w-16 h-16 rounded-lg object-cover"
                                        />
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                {rental?.product?.title}
                                            </h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Rented from {rental?.owner?.name?.fname} {rental?.owner?.name?.lname}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Star Rating */}
                                    <div className="flex flex-col items-center">
                                        <div className="flex space-x-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    className="focus:outline-none transition-transform transform hover:scale-110"
                                                    onMouseEnter={() => setHoveredRating(star)}
                                                    onMouseLeave={() => setHoveredRating(0)}
                                                    onClick={() => setRating(star)}
                                                >
                                                    <Star
                                                        className={`h-8 w-8 ${star <= (hoveredRating || rating)
                                                            ? 'fill-yellow-400 text-yellow-400'
                                                            : 'text-gray-300 dark:text-gray-600'
                                                            }`}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                        <p className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                                            {rating === 0
                                                ? "Select your rating"
                                                : rating === 5
                                                    ? "Excellent!"
                                                    : rating === 4
                                                        ? "Very Good!"
                                                        : rating === 3
                                                            ? "Good"
                                                            : rating === 2
                                                                ? "Fair"
                                                                : "Poor"}
                                        </p>
                                    </div>

                                    {/* Review Text */}
                                    <div>
                                        <label htmlFor="review" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Write your review
                                        </label>
                                        <textarea
                                            id="review"
                                            rows={4}
                                            className="w-full py-1 px-2 rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
                                            placeholder="Share your experience with this rental..."
                                            value={review}
                                            onChange={(e) => setReview(e.target.value)}
                                        />
                                    </div>

                                    {/* Image Upload
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Add Photos
                                        </label>
                                        <div className="grid grid-cols-4 gap-4">
                                            {imageURLs.map((url, index) => (
                                                <div key={index} className="relative group">
                                                    <img
                                                        src={url}
                                                        alt={`Upload ${index + 1}`}
                                                        className="h-20 w-20 rounded-lg object-cover"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeImage(index)}
                                                        className="absolute top-1 right-1 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            ))}
                                            {imageURLs.length < 4 && (
                                                <label className="h-20 w-20 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors">
                                                    <Camera className="h-6 w-6 text-gray-400" />
                                                    <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">Add Photo</span>
                                                    <input
                                                        type="file"
                                                        className="hidden"
                                                        accept="image/*"
                                                        onChange={handleImageChange}
                                                        multiple
                                                    />
                                                </label>
                                            )}
                                        </div>
                                        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                            You can upload up to 4 photos
                                        </p>
                                    </div> */}

                                    {/* Submit Button */}
                                    <div className="flex justify-end space-x-3">
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-200"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={!rating || !review.trim()}
                                            className="px-4 py-2 border border-transparent rounded-lg text-white bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                                        >
                                            Submit Review
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewModal;