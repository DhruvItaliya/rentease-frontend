import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Mail, Lock, User, Phone, Calendar, MapPin, Home, Navigation } from 'lucide-react';
import BACKEND_API from '../context/BACKEND_API';

const SignUp = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: {
      fname: '',
      lname: ''
    },
    email: '',
    password: '',
    mobile: '',
    dob: '',
    address: {
      houseNo: '',
      street: '',
      landmark: '',
      city: '',
      state: '',
      pincode: ''
    }
  });

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1: // Personal Info
        if (formData.name.fname.length < 2) {
          newErrors.fname = 'First name must be at least 2 characters';
        }
        if (formData.name.lname.length < 2) {
          newErrors.lname = 'Last name must be at least 2 characters';
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Invalid email format';
        }
        if (formData.password.length < 8) {
          newErrors.password = 'Password must be at least 8 characters';
        }
        break;

      case 2: // Contact Info
        if (!/^\d{10}$/.test(formData.mobile)) {
          newErrors.mobile = 'Mobile number must be 10 digits';
        }
        if (!formData.dob) {
          newErrors.dob = 'Date of birth is required';
        } else {
          const dobDate = new Date(formData.dob);
          const today = new Date();
          if (dobDate > today) {
            newErrors.dob = 'Date of birth cannot be in the future';
          }
        }
        break;

      case 3: // Address
        if (!formData.address.houseNo) {
          newErrors.houseNo = 'House number is required';
        }
        if (!formData.address.street) {
          newErrors.street = 'Street is required';
        }
        if (!formData.address.city) {
          newErrors.city = 'City is required';
        }
        if (!formData.address.state) {
          newErrors.state = 'State is required';
        }
        if (!/^\d{6}$/.test(formData.address.pincode)) {
          newErrors.pincode = 'Pincode must be 6 digits';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    console.log("Handle next");

    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Handle submit");
    if (validateStep(currentStep)) {
      console.log("Handle submit1");
      // Handle sign up logic here  
      try {
        console.log("Hello");
        const data = await axios.post(`${BACKEND_API}/auth/signup`, formData,
          {
            withCredentials: true
          }
        );
      }
      catch (error) {
        toast.error(error.response.data.message)
      }
    }
  };

  const handleInputChange = (e, section = null) => {
    const { name, value } = e.target;
    if (section) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [name]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const renderError = (field) => {
    return errors[field] && (
      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors[field]}</p>
    );
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="fname" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  First Name
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="fname"
                    name="fname"
                    value={formData.name.fname}
                    onChange={(e) => handleInputChange(e, 'name')}
                    className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    placeholder="First name"
                  />
                </div>
                {renderError('fname')}
              </div>
              <div>
                <label htmlFor="lname" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Last Name
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="lname"
                    name="lname"
                    value={formData.name.lname}
                    onChange={(e) => handleInputChange(e, 'name')}
                    className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    placeholder="Last name"
                  />
                </div>
                {renderError('lname')}
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>
              {renderError('email')}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
              {renderError('password')}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Mobile Number
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="1234567890"
                />
              </div>
              {renderError('mobile')}
            </div>
            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Date of Birth
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>
              {renderError('dob')}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="houseNo" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  House Number
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Home className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="houseNo"
                    name="houseNo"
                    value={formData.address.houseNo}
                    onChange={(e) => handleInputChange(e, 'address')}
                    className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    placeholder="House number"
                  />
                </div>
                {renderError('houseNo')}
              </div>
              <div>
                <label htmlFor="street" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Street
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Navigation className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="street"
                    name="street"
                    value={formData.address.street}
                    onChange={(e) => handleInputChange(e, 'address')}
                    className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    placeholder="Street name"
                  />
                </div>
                {renderError('street')}
              </div>
            </div>
            <div>
              <label htmlFor="landmark" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Landmark
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="landmark"
                  name="landmark"
                  value={formData.address.landmark}
                  onChange={(e) => handleInputChange(e, 'address')}
                  className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Near park, temple, etc."
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.address.city}
                  onChange={(e) => handleInputChange(e, 'address')}
                  className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="City"
                />
                {renderError('city')}
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.address.state}
                  onChange={(e) => handleInputChange(e, 'address')}
                  className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="State"
                />
                {renderError('state')}
              </div>
            </div>
            <div>
              <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Pincode
              </label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                value={formData.address.pincode}
                onChange={(e) => handleInputChange(e, 'address')}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                placeholder="123456"
              />
              {renderError('pincode')}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link to="/signin" className="font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300">
              Sign in
            </Link>
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between items-center mb-8">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step <= currentStep
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}
              >
                {step}
              </div>
              <span className="text-xs mt-1 text-gray-600 dark:text-gray-400">
                {step === 1 ? 'Personal' : step === 2 ? 'Contact' : 'Address'}
              </span>
            </div>
          ))}
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {renderStep()}

          <div className="flex justify-between">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="inline-flex items-center px-4 py-2 border border-emerald-600 dark:border-emerald-500 text-sm font-medium rounded-md text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:focus:ring-offset-gray-800"
              >
                Back
              </button>
            )}
            {currentStep < 3 && (
              <button
                type="button"
                onClick={handleNext}
                className="ml-auto inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:focus:ring-offset-gray-800"
              >
                Next
              </button>
            )}
            {currentStep === 3 && (
              <button
                type="submit"
                className="ml-auto inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:focus:ring-offset-gray-800"
              >
                Create Account
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;