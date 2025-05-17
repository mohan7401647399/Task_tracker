import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { path: '/dashboard', label: 'Dashboard', icon: '🏠' },
    { path: '/projects', label: 'Projects', icon: '📁' }
  ];

  return (
    <div className="w-64 bg-gray-800 text-white h-screen fixed left-0 top-0 pt-16">
      <div className="p-4">
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`flex items-center p-2 rounded-md hover:bg-gray-700 transition duration-200 ${
                  location.pathname === link.path ? 'bg-gray-700' : ''
                }`}
              >
                <span className="mr-2">{link.icon}</span>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;