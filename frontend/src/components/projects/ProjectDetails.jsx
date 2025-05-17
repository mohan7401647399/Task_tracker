import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../utils/api';
import TaskList from '../tasks/TaskList';
import Spinner from '../ui/Spinner';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`${process.env.REACT_APP_API_URL}/projects/${id}`);
        setProject(res.data.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) return <Spinner />;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-2xl font-bold">{project.title}</h1>
          <Link
            to={`/projects/${id}/edit`}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Edit
          </Link>
        </div>
        
        {project.description && (
          <p className="text-gray-700 mb-4">{project.description}</p>
        )}
        
        <div className="text-sm text-gray-500">
          Created: {new Date(project.createdAt).toLocaleDateString()}
        </div>
      </div>


{/* Tasks section */}

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Tasks</h2>
        <Link
          to={`/projects/${id}/tasks/new`}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
        >
          Add Task
        </Link>
      </div>

      <TaskList projectId={id} />
    </div>
  );
};

export default ProjectDetails;