// middleware/isAdmin.js
import User from '../Models/User.js';

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id); // ✅ change from req.user.id to req.user._id

    if (!user || user.type !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: 'Server error checking admin status' });
  }
};

export default isAdmin;
