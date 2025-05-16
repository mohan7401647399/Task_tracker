import React from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from '../ui/StatusBadge';

const TaskItem = ({ task }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-200">
      <div className="flex justify-between items-start">
        <Link 
          to={`/tasks/${task._id}`} 
          className="hover:underline font-medium"
        >
          {task.title}
        </Link>
        <StatusBadge status={task.status} />
      </div>
      
      {task.description && (
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">
          {task.description}
        </p>
      )}
      
      <div className="mt-3 flex justify-between items-center text-sm text-gray-500">
        <span>
          {new Date(task.createdAt).toLocaleDateString()}
        </span>
        <Link
          to={`/tasks/${task._id}`}
          className="text-blue-500 hover:underline"
        >
          View
        </Link>
      </div>
    </div>
  );
};

export default TaskItem;