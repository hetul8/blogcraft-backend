import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../state/AuthContext';

function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow mb-8">
      <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-xl font-bold text-gray-800 hover:text-blue-600">BlogCraft</Link>
          <Link to="/admin/panel" className="text-gray-600 hover:text-blue-600">Admin</Link>
        </div>
        <div>
          {token ? (
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">Logout</button>
          ) : (
            <Link to="/admin/login" className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 