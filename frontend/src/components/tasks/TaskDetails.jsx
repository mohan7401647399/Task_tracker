import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import Spinner from '../ui/Spinner';
import StatusBadge from '../ui/StatusBadge';

const TaskDetails = () => {
  const { projectId, taskId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await api.get(`/projects/${projectId}/tasks/${taskId}`);
        setTask(res.data.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch task');
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [projectId, taskId]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await api.delete(`/projects/${projectId}/tasks/${taskId}`);
        navigate(`/projects/${projectId}`);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to delete task');
      }
    }
  };

  if (loading) return <Spinner />;
  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (!task) return <div className="p-4">Task not found</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-2xl font-bold">{task.title}</h1>
          <div className="flex space-x-2">
            <Link
              to={`/projects/${projectId}/tasks/new`}
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

        <div className="mb-4">
          <StatusBadge status={task.status} />
        </div>

        {task.description && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-700 whitespace-pre-line">{task.description}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <h3 className="font-medium">Created</h3>
            <p>{new Date(task.createdAt).toLocaleString()}</p>
          </div>
          {task.completedAt && (
            <div>
              <h3 className="font-medium">Completed</h3>
              <p>{new Date(task.completedAt).toLocaleString()}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;