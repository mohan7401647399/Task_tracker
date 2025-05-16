import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center max-w-md px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Task Tracker</h1>
        <p className="text-lg text-gray-600 mb-8">
          Manage your projects and tasks efficiently with our simple yet powerful task tracking system.
        </p>
        <div className="space-x-4">
          <Link
            to="/register"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="bg-white hover:bg-gray-100 text-gray-800 px-6 py-3 rounded-lg font-medium border border-gray-300"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;