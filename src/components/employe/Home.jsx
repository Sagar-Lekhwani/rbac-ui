import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-lg">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Welcome to the Home Page
        </h1>
        <p className="text-xl text-gray-600">
          This is where your journey begins.
        </p>
      </div>
    </div>
  );
};

export default Home;
