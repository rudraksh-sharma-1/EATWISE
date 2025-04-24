import express from 'express';
import { addBlog, getAllBlogs, getBlogById } from '../Controllers/blogController.js';
import authenticateToken from '../Middleware/authenticateToken.js';
import upload from '../Middleware/upload.js'; // Assuming you have a middleware for handling file uploads

const router = express.Router();

router.post('/add',authenticateToken, upload.single("image"), addBlog);
router.get('/all', getAllBlogs);
router.get("/blog/:id", getBlogById);

export default router;
