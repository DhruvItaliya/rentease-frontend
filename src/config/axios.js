// axios.js - Create an Axios instance and set up the interceptor

import axios from 'axios';
import BACKEND_API from '../context/BACKEND_API';
import { getStorage } from '../utils/storageUtils';


// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: BACKEND_API, // Your API base URL
    timeout: 10000, // Optional: set a timeout for requests
});

// Request interceptor to automatically attach the token
axiosInstance.interceptors.request.use(
    (config) => {
        // Get the token from localStorage (or wherever it's stored)
        const token = getStorage('token'); // Or use sessionStorage or Redux

        // If there's a token, attach it to the Authorization header
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        // Handle request error
        return Promise.reject(error);
    }
);

export default axiosInstance;
