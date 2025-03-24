import React, { useState } from 'react';
import {
    LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import {
    TrendingUp, Users, Package, ArrowUp, ArrowDown,
    Calendar, Star, ShoppingBag, Activity, Filter, IndianRupee
} from 'lucide-react';

const Dashboard = () => {
    const [dateRange, setDateRange] = useState([new Date(), new Date()]);
    const [timeFilter, setTimeFilter] = useState('monthly');
    const [categoryFilter, setCategoryFilter] = useState('all');

    // Mock data for charts
    const revenueData = {
        weekly: [
            { period: 'Mon', revenue: 1200 },
            { period: 'Tue', revenue: 1400 },
            { period: 'Wed', revenue: 1100 },
            { period: 'Thu', revenue: 1600 },
            { period: 'Fri', revenue: 1800 },
            { period: 'Sat', revenue: 2100 },
            { period: 'Sun', revenue: 1900 },
        ],
        monthly: [
            { period: 'Jan', revenue: 2400 },
            { period: 'Feb', revenue: 1398 },
            { period: 'Mar', revenue: 9800 },
            { period: 'Apr', revenue: 3908 },
            { period: 'May', revenue: 4800 },
            { period: 'Jun', revenue: 3800 },
        ],
        yearly: [
            { period: '2020', revenue: 24000 },
            { period: '2021', revenue: 35000 },
            { period: '2022', revenue: 48000 },
            { period: '2023', revenue: 52000 },
            { period: '2024', revenue: 58000 },
        ],
    };

    const categoryTrendsData = {
        weekly: [
            { period: 'Sun', Electronics: 400, Sports: 240, Tools: 320, Home: 280 },
            { period: 'Mon', Electronics: 300, Sports: 380, Tools: 280, Home: 250 },
            { period: 'Tue', Electronics: 450, Sports: 420, Tools: 340, Home: 300 },
            { period: 'Wed', Electronics: 500, Sports: 380, Tools: 420, Home: 280 },
            { period: 'Thu', Electronics: 470, Sports: 450, Tools: 380, Home: 320 },
            { period: 'Fri', Electronics: 520, Sports: 480, Tools: 400, Home: 350 },
            { period: 'Sat', Electronics: 520, Sports: 480, Tools: 400, Home: 350 },
        ],
        monthly: [
            { period: 'Jan', Electronics: 400, Sports: 240, Tools: 320, Home: 280 },
            { period: 'Feb', Electronics: 300, Sports: 380, Tools: 280, Home: 250 },
            { period: 'Mar', Electronics: 450, Sports: 420, Tools: 340, Home: 300 },
            { period: 'Apr', Electronics: 500, Sports: 380, Tools: 420, Home: 280 },
            { period: 'May', Electronics: 470, Sports: 450, Tools: 380, Home: 320 },
            { period: 'Jun', Electronics: 520, Sports: 480, Tools: 400, Home: 350 },
        ],
        yearly: [
            { period: '2020', Electronics: 400, Sports: 240, Tools: 320, Home: 280 },
            { period: '2021', Electronics: 300, Sports: 380, Tools: 280, Home: 250 },
            { period: '2022', Electronics: 450, Sports: 420, Tools: 340, Home: 300 },
            { period: '2023', Electronics: 500, Sports: 380, Tools: 420, Home: 280 },
            { period: '2024', Electronics: 470, Sports: 450, Tools: 380, Home: 320 },
            { period: '2025', Electronics: 520, Sports: 480, Tools: 400, Home: 350 },
        ],
    }

    const rentalTrendsData = [
        { date: '1/3', active: 4000, completed: 2400 },
        { date: '2/3', active: 3000, completed: 1398 },
        { date: '3/3', active: 2000, completed: 9800 },
        { date: '4/3', active: 2780, completed: 3908 },
        { date: '5/3', active: 1890, completed: 4800 },
        { date: '6/3', active: 2390, completed: 3800 },
    ];

    const ratingDistribution = [
        { rating: '5★', count: 45 },
        { rating: '4★', count: 30 },
        { rating: '3★', count: 15 },
        { rating: '2★', count: 7 },
        { rating: '1★', count: 3 },
    ];

    const categoryData = [
        { name: 'Electronics', value: 400 },
        { name: 'Sports', value: 300 },
        { name: 'Tools', value: 300 },
        { name: 'Home', value: 200 },
    ];

    const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'];

    const statsData = {
        weekly: [
            { title: 'Total Revenue', value: '₹5,678', change: '+2.1%', isPositive: true, period: 'Weekly', icon: <IndianRupee className="h-6 w-6" /> },
            { title: 'Active Rentals', value: '48', change: '+5.6%', isPositive: true, period: 'Weekly', icon: <ShoppingBag className="h-6 w-6" /> },
            { title: 'Total Users', value: '567', change: '+4.2%', isPositive: true, period: 'Weekly', icon: <Users className="h-6 w-6" /> },
            { title: 'Avg. Rating', value: '4.7', change: '-0.1%', isPositive: false, period: 'Weekly', icon: <Star className="h-6 w-6" /> },
        ],
        monthly: [
            { title: 'Total Revenue', value: '₹23,456', change: '+12.5%', isPositive: true, period: 'Monthly', icon: <IndianRupee className="h-6 w-6" /> },
            { title: 'Active Rentals', value: '156', change: '+8.2%', isPositive: true, period: 'Monthly', icon: <ShoppingBag className="h-6 w-6" /> },
            { title: 'Total Users', value: '2,345', change: '+15.3%', isPositive: true, period: 'Monthly', icon: <Users className="h-6 w-6" /> },
            { title: 'Avg. Rating', value: '4.8', change: '-0.2%', isPositive: false, period: 'Monthly', icon: <Star className="h-6 w-6" /> },
        ],
        yearly: [
            { title: 'Total Revenue', value: '₹280,000', change: '+20.5%', isPositive: true, period: 'Yearly', icon: <IndianRupee className="h-6 w-6" /> },
            { title: 'Active Rentals', value: '1,890', change: '+12.3%', isPositive: true, period: 'Yearly', icon: <ShoppingBag className="h-6 w-6" /> },
            { title: 'Total Users', value: '28,900', change: '+22.1%', isPositive: true, period: 'Yearly', icon: <Users className="h-6 w-6" /> },
            { title: 'Avg. Rating', value: '4.9', change: '+0.1%', isPositive: true, period: 'Yearly', icon: <Star className="h-6 w-6" /> },
        ],
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-8">
                    {/* Header with Filters */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Dashboard Overview
                            </h1>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                Track your rental business performance and insights
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex items-center bg-white dark:bg-gray-800 py-1 px-2 rounded-lg shadow-md w-full sm:w-auto">
                                <Filter className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                                <select
                                    value={timeFilter}
                                    onChange={(e) => setTimeFilter(e.target.value)}
                                    className="bg-transparent border-none outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-600 dark:text-gray-400 px-2 py-1 rounded-lg"
                                >
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                    <option value="yearly">Yearly</option>
                                </select>
                            </div>
                        </div>

                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {statsData[timeFilter].map((stat, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="p-2 bg-emerald-100 dark:bg-emerald-500/30 rounded-lg">
                                        {stat.icon}
                                    </div>
                                    <span className={`text-sm font-medium flex items-center ${stat.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                        {stat.isPositive ? (
                                            <ArrowUp className="h-4 w-4 mr-1" />
                                        ) : (
                                            <ArrowDown className="h-4 w-4 mr-1" />
                                        )}
                                        {stat.change}
                                    </span>
                                </div>
                                <p className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">
                                    {stat.value}
                                </p>
                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                    {stat.title}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {stat.period} {/* This will display "Monthly", "Weekly", or "Yearly" */}
                                </p>
                            </div>
                        ))}

                    </div>

                    {/* Charts Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Revenue Trend */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Revenue Trend
                            </h2>
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart data={revenueData[timeFilter]}>
                                    <defs>
                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="period" />
                                    <YAxis />
                                    <Tooltip />
                                    <Area
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="#10B981"
                                        fillOpacity={1}
                                        fill="url(#colorRevenue)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Category Trends */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Category Trends
                                </h2>
                                <select
                                    value={categoryFilter}
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                    className="bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg text-sm p-1 text-gray-600 dark:text-gray-400"
                                >
                                    <option value="all">All Categories</option>
                                    <option value="Electronics">Electronics</option>
                                    <option value="Sports">Sports</option>
                                    <option value="Tools">Tools</option>
                                    <option value="Home">Home</option>
                                </select>
                            </div>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={categoryTrendsData[timeFilter]}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="period" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    {categoryFilter === 'all' ? (
                                        Object.keys(categoryTrendsData[timeFilter][0])
                                            .filter(key => key !== 'period')
                                            .map((category, index) => (
                                                <Line
                                                    key={category}
                                                    type="monotone"
                                                    dataKey={category}
                                                    stroke={COLORS[index]}
                                                    strokeWidth={2}
                                                />
                                            ))
                                    ) : (
                                        <Line
                                            type="monotone"
                                            dataKey={categoryFilter}
                                            stroke={COLORS[0]}
                                            strokeWidth={2}
                                        />
                                    )}
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Rental Trends */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Rental Status
                            </h2>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={rentalTrendsData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="active"
                                        name="Active Rentals"
                                        stroke="#10B981"
                                        strokeWidth={2}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="completed"
                                        name="Completed Rentals"
                                        stroke="#3B82F6"
                                        strokeWidth={2}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Category Distribution */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Category Distribution
                            </h2>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={categoryData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {categoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Rating Distribution */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Rating Distribution
                            </h2>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={ratingDistribution}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="rating" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="count" fill="#10B981" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
