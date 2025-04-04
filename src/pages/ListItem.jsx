import React, { useEffect, useState } from 'react';
import { Upload, IndianRupee, Info, Tag } from 'lucide-react';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import axiosInstance from '../config/axios';
const ListItem = () => {
  const [images, setImages] = useState(null);
  const [allAddress, setAllAddress] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    dprice: 0,
    wprice: 0,
    mprice: 0,
    address: '',
    imageURLs: null,
    buyDate: '',
    rules: '',
    isAgreed: false,
    securityDeposit: 0,
    // availableFrom: '',
    // availableTo: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    console.log(files);
    setImages(files);
  };

  const handleImageSubmit = async () => {
    try {

      const imageURLs = [];
      if (images?.length === 0) {
        throw new Error("Please select an Image");
      }
      for (const image of images) {
        const res = await axiosInstance.post(`/product/upload-product-image`,
          {
            product: image
          },
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
        console.log(res);

        imageURLs.push(res.data?.data?.[0]);
      }
      console.log(imageURLs);

      if (imageURLs.length === 0) {
        throw new Error("Please upload an Image");
      }
      setFormData((prev) => ({
        ...prev,
        imageURLs
      }))
      return imageURLs;
    }
    catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const handleFormSubmit = async (e) => {
    try {
      setIsLoading(true);
      e.preventDefault();
      const imageURLs = await handleImageSubmit()
      const res = await axiosInstance.post('/product/add-product', { payload: { ...formData, imageURLs } });
      console.log(res);
      if (res.data.data) {
        toast.success("Product Uploaded Successfully!");
      }
    }
    catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
    finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, checked, type } = e.target;

    const value = type === 'checkbox' ? checked : e.target.value;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (name === 'dprice') {
      setFormData(prev => ({
        ...prev,
        ['wprice']: value * 7,
        ['mprice']: value * 30
      }));
    }
  };

  const categories = [
    "Electronics",
    "Sports",
    "Toys",
    "Tools",
    "Travel",
    "Home & Garden",
    "Fashion",
    "Books",
    "Art"
  ];

  const fetchAddress = async () => {
    try {

      const res = await axiosInstance.get(`user/get-address`)
      const allAddress = res.data.data.map((address) => {
        const { _id, houseNo, street, landmark, city, state, pincode } = address;
        return ({
          address: `${houseNo}, ${street}, ${landmark}, ${city}, ${state} - ${pincode}`,
          _id
        })
      })
      setAllAddress(allAddress)
    }
    catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  useEffect(() => {
    fetchAddress();
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            List Your Item for Rent
          </h1>
          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                  <Info className="w-5 h-5 mr-2 text-emerald-500" />
                  Basic Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Item Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      required
                      placeholder='Product title'
                      className="mt-1 h-8 text-sm pl-2 block w-full outline-none rounded-md border-gray-500 shadow-sm focus:ring-1 focus:ring-emerald-500 bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                      value={formData.title}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      required
                      className="mt-1 h-8 text-sm pl-2 outline-none block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring-1 focus:ring-emerald-500 bg-gray-100 dark:bg-gray-700 dark:text-white sm:text-sm"
                      value={formData.category}
                      onChange={handleInputChange}
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>


                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    required
                    placeholder='Enter description here'
                    className="mt-1 text-sm p-2 block w-full outline-none rounded-md border-gray-500 shadow-sm focus:ring-1 focus:ring-emerald-500 bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="availableFrom" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Purchase Date
                    </label>
                    <input
                      type="date"
                      name="buyDate"
                      id="buyDate"
                      required
                      className="mt-1 h-8 text-sm px-2 block outline-none w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring-1 focus:ring-emerald-500 bg-gray-100 dark:bg-gray-700 dark:text-white sm:text-sm"
                      value={formData.buyDate}
                      max={new Date().toISOString().split('T')[0]}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Location
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <select
                        id="address"
                        name="address"
                        required
                        className="mt-1 h-8 text-sm px-2 outline-none block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring-1 focus:ring-emerald-500 bg-gray-100 dark:bg-gray-700 dark:text-white sm:text-sm"
                        value={formData.address}
                        onChange={handleInputChange}
                      >
                        <option value="">Select a Address</option>
                        {allAddress.map(({ _id, address }, idx) => (
                          <option key={idx} value={_id}>
                            {address}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Upload Image
                    </label>
                    <div className="mt-2 relative rounded-md shadow-sm">
                      <input
                        id="images"
                        name="images"
                        type="file"
                        className="sr-only"
                        onChange={handleImageChange}
                        accept="image/*"
                        required
                      />
                      <label
                        htmlFor="images"
                        className="cursor-pointer bg-emerald-500 text-white py-1 px-4 rounded-lg hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200"
                      >
                        Choose file
                      </label>

                      <span className="text-gray-700 dark:text-gray-300 text-sm font-medium"> {images?.[0].name || 'No file choosen'}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                  <Tag className="w-5 h-5 mr-2 text-emerald-500" />
                  Pricing & Availability
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Daily Rental Price (₹)
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <IndianRupee className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        name="dprice"
                        id="dprice"
                        required
                        min="0"
                        step="0.01"
                        className="mt-1 h-8 outline-none text-sm block w-full pl-10 pr-2 rounded-md focus:ring-1 dark:border-gray-600 focus:ring-emerald-500 bg-gray-100 dark:bg-gray-700 dark:text-white sm:text-sm"
                        value={formData.dprice}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Weekly Rental Price (₹)
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <IndianRupee className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        name="wprice"
                        id="wprice"
                        required
                        min="0"
                        step="0.01"
                        className="mt-1 h-8 outline-none text-sm block w-full pl-10 pr-2 rounded-md focus:ring-1 dark:border-gray-600 focus:ring-emerald-500 bg-gray-100 dark:bg-gray-700 dark:text-white sm:text-sm"
                        value={formData.wprice}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Monthly Rental Price (₹)
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <IndianRupee className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        name="mprice"
                        id="mprice"
                        required
                        min="0"
                        step="0.01"
                        className="mt-1 h-8 outline-none text-sm block w-full pl-10 pr-2 rounded-md focus:ring-1 dark:border-gray-600 focus:ring-emerald-500 bg-gray-100 dark:bg-gray-700 dark:text-white sm:text-sm"
                        value={formData.mprice}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Security Deposit (₹)
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <IndianRupee className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        name="securityDeposit"
                        id="securityDeposit"
                        required
                        min="0"
                        step="0.01"
                        className="mt-1 h-8 outline-none text-sm block w-full pl-10 pr-2 rounded-md focus:ring-1 dark:border-gray-600 focus:ring-emerald-500 bg-gray-100 dark:bg-gray-700 dark:text-white sm:text-sm"
                        value={formData.securityDeposit}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="rules" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Rental Rules & Requirements
                  </label>
                  <textarea
                    id="rules"
                    name="rules"
                    rows={3}
                    className="mt-1 p-2 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-gray-100 dark:bg-gray-700 dark:text-white sm:text-sm transition-colors duration-200"
                    value={formData.rules}
                    onChange={handleInputChange}
                    placeholder="Any specific rules or requirements for renting this item..."
                  />
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="bg-emerald-50 dark:bg-emerald-900/30 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="isAgreed"
                      name="isAgreed"
                      type="checkbox"
                      required
                      className="h-4 w-4 accent-emerald-600 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="terms" className="text-sm text-gray-700 dark:text-gray-300">
                      I agree to the <a href="#" className="text-emerald-600 hover:text-emerald-500">Terms and Conditions</a> and understand that my item listing must comply with all local laws and regulations.
                    </label>
                  </div>
                </div>
              </div>

              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="availableFrom" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Available From
                  </label>
                  <input
                    type="date"
                    name="availableFrom"
                    id="availableFrom"
                    required
                    className="mt-1 h-8 text-sm px-2 block outline-none w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring-1 focus:ring-emerald-500 bg-gray-100 dark:bg-gray-700 dark:text-white sm:text-sm"
                    value={formData.availableFrom}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label htmlFor="availableTo" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Available To
                  </label>
                  <input
                    type="date"
                    name="availableTo"
                    id="availableTo"
                    required
                    className="mt-1 h-8 text-sm px-2 block outline-none w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring-1 focus:ring-emerald-500 bg-gray-100 dark:bg-gray-700 dark:text-white sm:text-sm"
                    value={formData.availableTo}
                    onChange={handleInputChange}
                  />
                </div>
              </div> */}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:focus:ring-offset-gray-800"
              >
                {isLoading && <Loader />}
                List Item
              </button>
            </div>
          </form>
        </div>
      </div >
    </div >
  );
};

export default ListItem;
