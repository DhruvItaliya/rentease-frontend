import React, { useState } from 'react';
import { Calendar, X, Shield, CreditCard, Info } from 'lucide-react';
import axiosInstance from '../config/axios';
import { toast } from 'react-toastify';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RentModal = ({ item, isOpen, onClose }) => {
    const [rentalDates, setRentalDates] = useState([null, null]);
    const [rentalStartDate, rentalEndDate] = rentalDates;

    const [agreed, setAgreed] = useState(false);
    const serviceFee = item.pricePerDay * 0.1;

    // Function to check if a date is within a booked range
    const isDateDisabled = (date) => {

        return item.bookedSlots.some(range => date >= range.startDate && date <= range.endDate);
    };


    if (!isOpen) return null;

    const calculateTotal = () => {
        if (!rentalStartDate || !rentalEndDate) return { baseAmount: 0, totalAmount: serviceFee };
        const start = new Date(rentalStartDate);
        const end = new Date(rentalEndDate);
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
        let totalAmount = 0;
        if (days < 7) {
            totalAmount = item.pricePerDay * days;
        }
        else if (days < 30) {
            totalAmount = item.pricePerWeek * (days) / 7;
        }
        else {
            totalAmount = item.pricePerMonth * (days) / 30;
        }
        console.log(totalAmount);

        return { baseAmount: totalAmount, totalAmount: totalAmount + serviceFee + (item.securityDeposit || 0) };
    };

    const getRateInfo = () => {
        return `Daily Rate: ₹${item.pricePerDay}/day\nWeekly Rate: ₹${item.pricePerWeek}/week\nMonthly Rate: ₹${item.pricePerMonth}/month\n\nRates are calculated based on rental duration:\n• 1-6 days: Daily rate applies\n• 7-30 days: Weekly rate applies\n•29+ days: Monthly rate applies`;
    };

    const handleDateChange = (update) => {
        if (update && update.length === 2) {
            const [start, end] = update;
            // Check if the selected range overlaps with any booked slot
            console.log(start)
            const isOverlapping = item.bookedSlots.some((slot) => (start <= new Date(slot.startDate) && end >= new Date(slot.endDate)));

            if (isOverlapping) {
                toast.error("Selected range overlaps with an unavailable date.");
                return; // Prevent state update
            }
            setRentalDates(update);
        } else {
            setRentalDates(update);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axiosInstance.post('/request/makeRequest', {
            productId: item._id,
            startDate: rentalStartDate,
            endDate: rentalEndDate,
        })
        toast.success('Rental request sent successfully');
        console.log('Rental request submitted:', { item, rentalDates });
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
                        <div className="text-center sm:text-left">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                Rent {item.title}
                            </h3>

                            <div className="bg-emerald-50 dark:bg-emerald-900/30 rounded-lg p-4 mb-6">
                                <div className="flex items-center">
                                    <Shield className="h-6 w-6 text-emerald-600 dark:text-emerald-400 mr-2" />
                                    <p className="text-sm text-emerald-700 dark:text-emerald-300">
                                        This rental is protected by our Rental Protection Guarantee
                                    </p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Select Dates
                                        </label>
                                        <div className="mt-1 relative">
                                            <DatePicker
                                                selected={rentalStartDate}
                                                onChange={(update) => { handleDateChange(update) }}

                                                startDate={rentalStartDate}
                                                endDate={rentalEndDate}
                                                selectsRange
                                                placeholderText="DD - MM - YYYY"
                                                dateFormat="dd-MM-yyyy"
                                                minDate={new Date()}
                                                excludeDateIntervals={item.bookedSlots.map((date) => ({ start: date.startDate, end: date.endDate }))}
                                                className="block w-full pl-2 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                                            Rate
                                            <div className="group relative">
                                                <Info className="h-4 w-4 cursor-help text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                                                <div className="absolute top-1/2 left-full ml-2 -translate-y-1/2 hidden group-hover:block w-64 p-2 bg-gray-900 dark:bg-gray-800 text-white text-xs rounded-lg shadow-lg whitespace-pre-line">
                                                    {getRateInfo()}
                                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2 border-8 border-transparent border-r-gray-900 dark:border-r-gray-800"></div>
                                                </div>
                                            </div>

                                        </span>
                                        <span className="text-gray-900 dark:text-white font-medium">₹{calculateTotal().baseAmount}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Security Deposit</span>
                                        <span className="text-gray-900 dark:text-white font-medium">₹{item.securityDeposit || 0}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Service Fee</span>
                                        <span className="text-gray-900 dark:text-white font-medium">₹{serviceFee}</span>
                                    </div>
                                    <div className="pt-3 border-t border-gray-200 dark:border-gray-600">
                                        <div className="flex justify-between">
                                            <span className="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
                                            <span className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
                                                ₹{calculateTotal().totalAmount}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="terms"
                                            name="terms"
                                            type="checkbox"
                                            required
                                            checked={agreed}
                                            onChange={(e) => setAgreed(e.target.checked)}
                                            className="h-4 w-4 accent-emerald-600 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                                        />
                                    </div>
                                    <div className="ml-3">
                                        <label htmlFor="terms" className="text-sm text-gray-700 dark:text-gray-300">
                                            I agree to the rental terms and conditions, including the security deposit and return policy.
                                        </label>
                                    </div>
                                </div>

                                <div className="flex flex-col space-y-4">
                                    <button
                                        type="submit"
                                        disabled={!agreed}
                                        className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02]"
                                    >
                                        <CreditCard className="h-5 w-5 mr-2" />
                                        Make a Request
                                    </button>
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="w-full px-6 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 rounded-lg transition-colors duration-200"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RentModal;