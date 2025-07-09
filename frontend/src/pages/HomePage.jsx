import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const API = import.meta.env.VITE_API_URL;

function HomePage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`${API}/api/blogs`)
      .then(res => {
        if (Array.isArray(res.data)) setBlogs(res.data);
        else setBlogs([]);
        setLoading(false);
      })
      .catch(() => {
        setBlogs([]);
        setError('Failed to load blogs.');
        setLoading(false);
      });
  }, []);

  const description = 'Read the latest posts on BlogCraft, a modern blogging platform.';
  const canonicalUrl = window.location.origin + '/';

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <Helmet>
        <title>BlogCraft - Modern Blogging Platform</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content="BlogCraft - Modern Blogging Platform" />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
      </Helmet>
      <h1 className="text-4xl font-bold mb-8 text-center">BlogCraft</h1>
      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-center text-red-500 mb-4">{error}</div>}
      {Array.isArray(blogs) && blogs.length === 0 && !loading && !error && (
        <div className="text-center text-gray-500">No blogs found.</div>
      )}
      <div className="space-y-8">
        {Array.isArray(blogs) && blogs.map(blog => (
          <Link to={`/blog/${blog._id}`} key={blog._id} className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
            <p className="text-gray-600 mb-2">{blog.snippet}</p>
            <div className="text-sm text-gray-400">{new Date(blog.date).toLocaleDateString()}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage; 