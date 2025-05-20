import { useContext } from 'react';
import AlertContext from '../../context/alertContext';

const Alert = () => {
  const { alert } = useContext(AlertContext);

  if (!alert) return null;

  const alertClasses = {
    error: 'bg-red-100 border-red-400 text-red-700',
    success: 'bg-green-100 border-green-400 text-green-700',
    info: 'bg-blue-100 border-blue-400 text-blue-700'
  };

  return (
    <div
      className={`${alertClasses[alert.type]} border-l-4 p-4 fixed top-4 right-4 z-50 max-w-sm`}
      role="alert"
    >
      <p className="font-bold">{alert.type.toUpperCase()}</p>
      <p>{alert.message}</p>
    </div>
  );
};

export default Alert;