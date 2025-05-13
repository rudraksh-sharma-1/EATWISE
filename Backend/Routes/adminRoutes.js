import express from 'express';
import { getUsersBasicInfo, deleteUser, deleteBlog } from '../Controllers/adminController.js';
import authenticateToken from '../Middleware/authenticateToken.js';
import isAdmin from '../Middleware/isAdmin.js'; // Make sure this checks for user.type === 'admin'

const router = express.Router();

router.get('/users', authenticateToken, isAdmin, getUsersBasicInfo);
router.delete('/users/:id', authenticateToken, isAdmin, deleteUser);
router.delete('/:id', authenticateToken, isAdmin, deleteBlog);

export default router;
