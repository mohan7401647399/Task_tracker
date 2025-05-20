
const StatusBadge = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'Not Started':
        return 'bg-gray-200 text-gray-800';
      case 'In Progress':
        return 'bg-blue-200 text-blue-800';
      case 'Completed':
        return 'bg-green-200 text-green-800';
      case 'On Hold':
        return 'bg-yellow-200 text-yellow-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor()}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;