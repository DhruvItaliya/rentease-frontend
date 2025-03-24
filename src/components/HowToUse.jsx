import React from 'react';
import { Search, MessageSquare, Calendar, Star } from 'lucide-react';

const HowToUse = () => {
  const steps = [
    {
      icon: <Search className="h-8 w-8 text-white" />,
      title: 'Find Items',
      description: 'Search for items available in your area from trusted community members.'
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-white" />,
      title: 'Connect',
      description: 'Chat with owners, ask questions, and arrange pickup or delivery.'
    },
    {
      icon: <Calendar className="h-8 w-8 text-white" />,
      title: 'Book & Pay',
      description: 'Schedule your rental period and pay securely through our platform.'
    },
    {
      icon: <Star className="h-8 w-8 text-white" />,
      title: 'Review',
      description: 'Share your experience and help build trust in our community.'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-emerald-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            How RentEase Works
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Renting made simple in four easy steps
          </p>
        </div>

        <div className="mt-16 p-6 shadow-md dark:bg-gray-800 rounded-xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-emerald-600 to-teal-500">
                    {step.icon}
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-center text-gray-600 dark:text-gray-300">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToUse;