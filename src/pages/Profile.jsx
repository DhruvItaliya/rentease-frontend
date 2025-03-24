import React, { useEffect, useState } from 'react';
import { Camera, Mail, Phone, MapPin, Calendar, Shield, Star, Package } from 'lucide-react';
import axiosInstance from '../config/axios';
import moment from 'moment';

const ProfilePage = () => {
    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(false);


    const stats = [
        { icon: <Star className="h-5 w-5 text-yellow-400" />, label: "Rating", value: user?.rating },
        { icon: <Package className="h-5 w-5 text-emerald-500" />, label: "Rentals", value: user?.rentals },
    ];

    const fetchProfiles = async () => {
        try {
            const response = await axiosInstance.get('/user/get-profile', {
                withCredentials: true
            });
            console.log('Profile:', response.data.data);
            setUser(response.data.data);
        } catch (error) {
            console.error('Error fetching sent requests:', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchProfiles();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col pt-20 items-center py-10">
            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 max-w-3xl w-full">
                <div className="text-center">
                    <div className="relative inline-block">
                        <img
                            src={user?.image}
                            alt={user?.name?.fname}
                            className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
                        />
                        <button className="absolute bottom-0 right-0 bg-emerald-500 rounded-full p-2 text-white hover:bg-emerald-600 transition-colors duration-200">
                            <Camera className="h-5 w-5" />
                        </button>
                    </div>

                    <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
                        {user?.name?.fname} {user?.name?.lname}
                        {/* {user.name} */}
                    </h2>

                    <div className="flex justify-center space-x-6 mt-4">
                        <div className="text-center">
                            <div className="flex items-center justify-center">
                                <Star className="h-5 w-5 text-yellow-400" />
                                <span className="ml-1 text-lg font-semibold text-gray-900 dark:text-white">
                                    {user?.ratings}
                                </span>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Rating</p>
                        </div>
                    </div>

                    <p className="mt-4 text-gray-600 dark:text-gray-300">
                        {user?.bio}
                    </p>

                    <div className="mt-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                        <div className="space-y-3">
                            <div className="flex items-center text-gray-600 dark:text-gray-400">
                                <Mail className="h-5 w-5 mr-3" />
                                <span>{user?.email}</span>
                            </div>
                            <div className="flex items-center text-gray-600 dark:text-gray-400">
                                <Phone className="h-5 w-5 mr-3" />
                                <span>{user?.mobile}</span>
                            </div>
                            {user?.address?.map((address, idx) => <div key={idx} className="flex items-center text-gray-600 dark:text-gray-400">
                                <MapPin className="h-5 w-5 mr-3" />
                                <span>{address.houseNo} {address.street} {address.landmark}, {address.city}, {address.state}-{address.pincode}</span>
                            </div>)}
                            <div className="flex items-center text-gray-600 dark:text-gray-400">
                                <Calendar className="h-5 w-5 mr-3" />
                                <span>Joined {moment(user?.createdAt).format('DD-MM-YYYY')}</span>
                            </div>
                        </div>
                    </div>

                    {/* <div className="mt-6">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                            Verifications
                        </h3>
                        <div className="flex flex-wrap justify-center gap-2">
                            {user.verifications.map((verification, index) => (
                                <div
                                    key={index}
                                    className="flex items-center px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full text-sm"
                                >
                                    <Shield className="h-4 w-4 mr-1" />
                                    {verification}
                                </div>
                            ))}
                        </div>
                    </div> */}
                </div>

                <div className="mt-6 flex justify-center space-x-4">
                    <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-200">
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
