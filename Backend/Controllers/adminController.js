import User from "../Models/User.js"; // Assuming you have a User model
import Blog from "../Models/Blog.js";

 export const getUsersBasicInfo = async (req, res) => {
    try {
      const users = await User.find().select('fullName email blogs');
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };

// Example: Delete a user
   export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
      // Step 1: Find the user
      const user = await User.findById(id);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      // Step 2: Delete all blogs created by the user
      await Blog.deleteMany({ _id: { $in: user.blogs } });
  
      // Step 3: Delete the user
      await User.findByIdAndDelete(id);
  
      res.json({ message: 'User and associated blogs deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user and blogs', error });
    }
  };

 export const deleteBlog = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Step 1: Find the blog by ID
      const blog = await Blog.findById(id);
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
  
      // Step 2: Remove the blog reference from the user's blogs array
      await User.findByIdAndUpdate(blog.author, {
        $pull: { blogs: blog._id }
      });
  
      // Step 3: Delete the blog document
      await Blog.findByIdAndDelete(id);
  
      res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting blog', error });
    }
  };

