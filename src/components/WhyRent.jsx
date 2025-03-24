import React from 'react';
import { IndianRupee, Users, Shield, Heart } from 'lucide-react';

const WhyRent = () => {
  const benefits = [
    {
      icon: <IndianRupee className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />,
      title: 'Extra Income',
      description: 'Turn your unused items into a steady stream of income by renting them out.'
    },
    {
      icon: <Users className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />,
      title: 'Community Building',
      description: 'Connect with neighbors and build a stronger, more sharing community.'
    },
    {
      icon: <Shield className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />,
      title: 'Safe & Secure',
      description: 'Verified users, secure payments, and insurance coverage for peace of mind.'
    },
    {
      icon: <Heart className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />,
      title: 'Sustainable Living',
      description: 'Reduce waste and environmental impact through the sharing economy.'
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Why Choose RentEase?
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Join our community of sharers and renters
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="relative p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="inline-flex p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/30">
                  {benefit.icon}
                </div>
              </div>
              <div className="mt-8 text-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{benefit.title}</h3>
                <p className="mt-4 text-gray-600 dark:text-gray-300">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyRent;