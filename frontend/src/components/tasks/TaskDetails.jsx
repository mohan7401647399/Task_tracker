import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import Spinner from '../ui/Spinner';
import StatusBadge from '../ui/StatusBadge';

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await api.get(`/tasks/${id}`);
        setTask(res.data.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleDelete = async () => {
    try {
      await api.delete(`/tasks/${id}`);
      navigate(`/projects/${task.project}`);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-2xl font-bold">{task.title}</h1>
          <div className="flex space-x-2">
            <Link
              to={`/tasks/${id}/edit`}
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