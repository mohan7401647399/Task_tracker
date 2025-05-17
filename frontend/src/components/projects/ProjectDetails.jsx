import  { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import TaskList from '../tasks/TaskList';
import Spinner from '../ui/Spinner';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/projects/${id}`);
        setProject(res.data.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError('Failed to load project');
      }
    };

    fetchProject();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this project? All tasks will be deleted too!')) {
      try {
        await api.delete(`/projects/${id}`);
        navigate('/projects'); // Redirect to projects list after deletion
      } catch (err) {
        setError('Failed to delete project');
      }
    }
  };

  if (loading) return <Spinner />;
  if (!project) return <div className="container mx-auto p-4">Project not found</div>;

  return (
    <div className="container mx-auto p-4">
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-2xl font-bold">{project.title}</h1>
          <div className="flex space-x-2">
            <Link
              to={`/projects/${id}/edit`}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
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