import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Helmet } from 'react-helmet';

function BlogPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`/api/blogs/${id}`).then(res => setBlog(res.data));
  }, [id]);

  if (!blog) return <div className="text-center py-16">Loading...</div>;

  const description = blog.snippet || blog.body.slice(0, 150);
  const canonicalUrl = window.location.origin + '/blog/' + blog._id;

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <Helmet>
        <title>{blog.title} | BlogCraft</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
      </Helmet>
      <Link to="/" className="text-blue-600 hover:underline">← Back to Home</Link>
      <h1 className="text-4xl font-bold mb-4 mt-4">{blog.title}</h1>
      <div className="text-gray-400 text-sm mb-8">{new Date(blog.date).toLocaleDateString()}</div>
      <article className="prose prose-lg">
        <ReactMarkdown>{blog.body}</ReactMarkdown>
      </article>
    </div>
  );
}

export default BlogPage; 