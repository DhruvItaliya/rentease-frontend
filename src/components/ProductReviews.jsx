import React, { useState } from 'react';
import { Star, ThumbsUp, MessageSquare, Image as ImageIcon, ChevronDown, ChevronUp } from 'lucide-react';
import moment from 'moment';
import { toast } from 'react-toastify';
import { getStorage } from '../utils/storageUtils';
import axiosInstance from '../config/axios';

const ProductReviews = ({ reviews = [], productId, setReviews }) => {
    const [sortBy, setSortBy] = useState('recent');
    const [filterRating, setFilterRating] = useState('all');
    const [showAllReviews, setShowAllReviews] = useState(false);
    const userData = getStorage('userData')

    const calculateAverageRating = () => {
        if (reviews.length === 0) return 0;
        const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
        return (sum / reviews.length).toFixed(1);
    };

    const getRatingDistribution = () => {
        const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        reviews.forEach(review => {
            distribution[review.rating]++;
        });
        return distribution;
    };

    const sortReviews = (reviewsToSort) => {
        switch (sortBy) {
            case 'recent':
                return [...reviewsToSort].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            case 'helpful':
                return [...reviewsToSort].sort((a, b) => b.helpfulCount - a.helpfulCount);
            case 'rating-high':
                return [...reviewsToSort].sort((a, b) => b.rating - a.rating);
            case 'rating-low':
                return [...reviewsToSort].sort((a, b) => a.rating - b.rating);
            default:
                return reviewsToSort;
        }
    };

    const filterReviews = () => {
        let filtered = [...reviews];
        if (filterRating !== 'all') {
            filtered = filtered.filter(review => review.rating === parseInt(filterRating));
        }
        return sortReviews(filtered);
    };

    const displayedReviews = filterReviews();
    const visibleReviews = showAllReviews ? displayedReviews : displayedReviews.slice(0, 5);
    const distribution = getRatingDistribution();

    const handleHelpfulClick = async (reviewId) => {
        try {
            const res = await axiosInstance.patch(`review/helpful-vote/${reviewId}`, {}, { withCredentials: true })
            console.log(res?.data?.data)
            const newReviews = reviews.map((review) => {
                if (review._id === reviewId) return {
                    ...review,
                    helpfulCount: ++review.helpfulCount,
                    helpfulUsers: [...review.helpfulUsers, res?.data?.data],

                };
                return review;
            })
            console.log(newReviews)
            setReviews(newReviews)
        }
        catch (err) {
            toast.error('Something Went Wrong!');
        }
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Customer Reviews</h2>

            {/* Overall Rating Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="flex items-center space-x-4">
                    <div className="text-5xl font-bold text-gray-900 dark:text-white">{calculateAverageRating()}</div>
                    <div>
                        <div className="flex items-center mb-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={`h-5 w-5 ${star <= calculateAverageRating()
                                        ? 'text-yellow-400 fill-yellow-400'
                                        : 'text-gray-300 dark:text-gray-600'
                                        }`}
                                />
                            ))}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Based on {reviews.length} reviews</p>
                    </div>
                </div>

                {/* Rating Distribution */}
                <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center">
                            <button
                                onClick={() => setFilterRating(filterRating === String(rating) ? 'all' : String(rating))}
                                className="flex items-center space-x-2 min-w-[60px] hover:text-emerald-600 dark:hover:text-emerald-400"
                            >
                                <span className='dark:text-gray-400 text-gray-600'>{rating}</span>
                                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            </button>
                            <div className="flex-1 mx-4 h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                                <div
                                    className="h-2 rounded-full bg-emerald-500"
                                    style={{
                                        width: `${(distribution[rating] / reviews.length) * 100}%`
                                    }}
                                />
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[40px]">
                                {distribution[rating]}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Filters and Sort */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center space-x-4">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="rounded-lg border-gray-300 dark:border-gray-600 p-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-emerald-500 focus:border-emerald-500"
                    >
                        <option value="recent">Most Recent</option>
                        <option value="helpful">Most Helpful</option>
                        <option value="rating-high">Highest Rating</option>
                        <option value="rating-low">Lowest Rating</option>
                    </select>
                </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
                {visibleReviews?.map((review) => {
                    const isVoted = review?.helpfulUsers?.includes(userData?._id)
                    return (
                        <div key={review._id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <div className="flex items-center mb-2">
                                        <img
                                            src={review.user.avatar || `https://ui-avatars.com/api/?name=${review.user.name.fname}`}
                                            alt={review.user.name.fname}
                                            className="w-10 h-10 rounded-full mr-3"
                                        />
                                        <div>
                                            <h4 className="font-medium text-gray-900 dark:text-white">{review.user.name.fname} {review.user.name.lname}</h4>
                                            <div className="flex items-center space-x-2">
                                                <div className="flex">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <Star
                                                            key={star}
                                                            className={`h-4 w-4 ${star <= review.rating
                                                                ? 'text-yellow-400 fill-yellow-400'
                                                                : 'text-gray-300 dark:text-gray-600'
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                                    {moment(review.createdAt).fromNow()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <p className="text-gray-700 dark:text-gray-300 mb-4">{review.review}</p>

                            {/* Review Images */}
                            {/* {review.images && review.images.length > 0 && (
                            <div className="flex space-x-2 mb-4">
                                {review.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`Review ${index + 1}`}
                                        className="w-20 h-20 rounded-lg object-cover"
                                    />
                                ))}
                            </div>
                        )} */}

                            {/* Review Actions */}
                            <div className="flex items-center space-x-2 text-sm">
                                <button onClick={() => handleHelpfulClick(review._id)} disabled={isVoted} className={`flex items-center space-x-1 text-gray-600 dark:text-gray-400 ${isVoted ? 'cursor-not-allowed' : 'hover:text-emerald-600 dark:hover:text-emerald-400'}`}>
                                    <ThumbsUp className={`h-4 w-4 ${isVoted ? 'fill-yellow-500 text-yellow-500' : ''}`} />
                                    <span>Helpful ({review.helpfulCount || 0})</span>
                                </button>
                                {isVoted && <span className='text-green-600'>Thanks for voting!</span>}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Show More Button */}
            {displayedReviews.length > 5 && (
                <button
                    onClick={() => setShowAllReviews(!showAllReviews)}
                    className="mt-6 w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                    {showAllReviews ? (
                        <>
                            <ChevronUp className="h-5 w-5 mr-2" />
                            Show Less
                        </>
                    ) : (
                        <>
                            <ChevronDown className="h-5 w-5 mr-2" />
                            Show More Reviews
                        </>
                    )}
                </button>
            )}
        </div>
    );
};

export default ProductReviews;