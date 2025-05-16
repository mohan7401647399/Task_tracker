import React from 'react';
import { Link } from 'react-router-dom';
import ProjectList from '../components/projects/ProjectList';

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link 
          to="/projects/new" 
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          New Project
        </Link>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">My Projects</h2>
        <ProjectList />
      </div>
    </div>
  );
};

export default Dashboard;