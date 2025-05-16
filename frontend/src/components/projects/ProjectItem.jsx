import React from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from '../ui/StatusBadge';

const ProjectItem = ({ project }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <Link to={`/projects/${project._id}`} className="hover:underline">
            <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
          </Link>
          <StatusBadge status={project.status || 'Active'} />
        </div>
        
        {project.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {project.description}
          </p>
        )}
        
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>
            {new Date(project.createdAt).toLocaleDateString()}
          </span>
          <Link
            to={`/projects/${project._id}`}
            className="text-blue-500 hover:underline"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;