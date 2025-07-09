import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL;

function BlogForm({ blog, token, onClose }) {
  const [title, setTitle] = useState(blog ? blog.title : '');
  const [body, setBody] = useState(blog ? blog.body : '');
  const [snippet, setSnippet] = useState(blog ? blog.snippet : '');
  const [draft, setDraft] = useState(blog ? blog.draft : false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setBody(blog.body);
      setSnippet(blog.snippet);
      setDraft(blog.draft);
    }
  }, [blog]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (blog) {
        await axios.put(`${API}/api/blogs/${blog._id}`, { title, body, snippet, draft }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${API}/api/blogs`, { title, body, snippet, draft }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      onClose();
    } catch (err) {
      setError('Error saving blog');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-8">
      <h2 className="text-xl font-bold mb-4">{blog ? 'Edit Blog' : 'Add New Blog'}</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <input
        type="text"
        placeholder="Title"
        className="w-full mb-3 p-2 border rounded"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Body (Markdown supported)"
        className="w-full mb-3 p-2 border rounded h-40"
        value={body}
        onChange={e => setBody(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Snippet"
        className="w-full mb-3 p-2 border rounded"
        value={snippet}
        onChange={e => setSnippet(e.target.value)}
        required
      />
      <label className="flex items-center mb-4">
        <input
          type="checkbox"
          className="mr-2"
          checked={draft}
          onChange={e => setDraft(e.target.checked)}
        />
        Save as draft
      </label>
      <div className="flex space-x-2">
        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {loading ? 'Saving...' : 'Save'}
        </button>
        <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
      </div>
    </form>
  );
}

export default BlogForm; 