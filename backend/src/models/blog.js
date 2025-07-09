import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true }, // markdown content
  snippet: { type: String, required: true },
  date: { type: Date, default: Date.now },
  draft: { type: Boolean, default: false }
});

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
