import React, { useEffect, useState } from 'react';
import { useAuth } from '../state/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BlogForm from '../components/BlogForm';

const API = import.meta.env.VITE_API_URL;

function AdminPanel() {
  const { token, logout } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return navigate('/admin/login');
    fetchBlogs();
    // eslint-disable-next-line
  }, [token]);

  const fetchBlogs = async () => {
    const res = await axios.get(`${API}/api/blogs`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setBlogs(res.data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this blog?')) return;
    await axios.delete(`${API}/api/blogs/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchBlogs();
  };

  const handleEdit = (blog) => {
    setEditing(blog);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditing(null);
    fetchBlogs();
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <button onClick={logout} className="text-red-500 hover:underline">Logout</button>
      </div>
      <button onClick={handleAdd} className="mb-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add New Blog</button>
      {showForm && (
        <BlogForm blog={editing} token={token} onClose={handleFormClose} />
      )}
      <div className="space-y-4">
        {blogs.map(blog => (
          <div key={blog._id} className="p-4 bg-white rounded shadow flex justify-between items-center">
            <div>
              <div className="font-semibold text-lg">{blog.title}</div>
              <div className="text-gray-400 text-sm">{new Date(blog.date).toLocaleDateString()}</div>
            </div>
            <div className="space-x-2">
              <button onClick={() => handleEdit(blog)} className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500">Edit</button>
              <button onClick={() => handleDelete(blog._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPanel; 