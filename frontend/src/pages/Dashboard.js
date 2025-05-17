import { Link } from 'react-router-dom';
import ProjectList from '../components/projects/ProjectList';
import { useEffect, useState } from 'react';
import api from '../utils/api';

const Dashboard = () => {
  const [projectCount, setProjectCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectCount = async () => {
      try {
        const res = await api.get('/projects');
        setProjectCount(res.data.count);
      } catch (err) {
        console.error('Failed to fetch project count', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectCount();
  }, []);

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link 
          to="/projects/new" 
          className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded ${
            projectCount >= 4 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={(e) => {
            if (projectCount >= 4) {
              e.preventDefault();
              alert('You have reached the maximum of 4 projects');
            }
          }}
        >
          New Project
        </Link>
      </div>
      
      <div className="mb-4 text-sm text-gray-600">
        Projects: {projectCount}/4
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">My Projects</h2>
        <ProjectList />
      </div>
    </div>
  );
};

export default Dashboard;