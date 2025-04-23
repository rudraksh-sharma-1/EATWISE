import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../Controllers/authControllers.js';
import authenticateToken from '../Middleware/authenticateToken.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authenticateToken, getUserProfile);

export default router;