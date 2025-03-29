import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import ProtectedAuthRoute from './routes/ProtectedAuthRoute';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyRent from './components/WhyRent';
import HowToUse from './components/HowToUse';
import Footer from './components/Footer';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import BrowseItems from './pages/BrowseItems';
import ListItem from './pages/ListItem';
import RentalsOverview from './pages/RentalsOverview';
import RequestsOverview from './pages/RequestsOverview';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import ProductDetails from './pages/ProductDetails';

function App() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <WhyRent />
              <HowToUse />
            </>
          } />
          <Route path="/signin" element={
            <ProtectedAuthRoute>
              <SignIn />
            </ProtectedAuthRoute>
          } />
          <Route path="/signup" element={
            <ProtectedAuthRoute>
              <SignUp />
            </ProtectedAuthRoute>
          } />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/browse" element={<BrowseItems />} />
          {isAuthenticated && (
            <>
              <Route path="/list-item" element={<ListItem />} />
              <Route path="/rentals" element={<RentalsOverview />} />
              <Route path="/requests" element={<RequestsOverview />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/product-details" element={<ProductDetails />} />
            </>
          )}
          <Route path="/*" element={<NotFound />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;