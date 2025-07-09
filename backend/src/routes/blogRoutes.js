import express from 'express';
import Blog from '../models/blog.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET /api/blogs - fetch all published blogs, sorted by date desc
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({ draft: false }).sort({ date: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/blogs/:id - fetch single blog
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog || blog.draft) return res.status(404).json({ error: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(404).json({ error: 'Blog not found' });
  }
});

// POST /api/blogs - create new blog (admin only)
router.post('/', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { title, body, snippet, draft } = req.body;
    const blog = new Blog({ title, body, snippet, draft });
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(400).json({ error: 'Invalid blog data' });
  }
});

// PUT /api/blogs/:id - update blog (admin only)
router.put('/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { title, body, snippet, draft } = req.body;
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, body, snippet, draft },
      { new: true, runValidators: true }
    );
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(400).json({ error: 'Invalid blog data' });
  }
});

// DELETE /api/blogs/:id - delete blog (admin only)
router.delete('/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json({ message: 'Blog deleted' });
  } catch (err) {
    res.status(404).json({ error: 'Blog not found' });
  }
});

export default router; 