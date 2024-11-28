import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="text-center p-6 md:p-8 bg-white rounded-lg shadow-xl max-w-lg w-full">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          Welcome to the Home Page
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-600">
          This is where your journey begins.
        </p>
      </div>
    </div>
  );
};

export default Home;
