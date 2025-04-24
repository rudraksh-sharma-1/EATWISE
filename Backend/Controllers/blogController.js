    import Blog from "../Models/Blog.js";
    import cloudinary from "../Config/cloudinary.js";
    import { encode } from "entities"; // encode HTML entities
    import { decode } from "entities"; // Decode entities to show preview text
    import striptags from 'striptags';

    export const addBlog = async (req, res) => {
    try {
        const {category, title, blogContent } = req.body;
        
        const author = req.user._id;

        if (!title || !blogContent || !req.file) {
        return res.status(400).json({ message: "All fields including image are required" });
        }


        // Encode HTML entities in content before saving to DB
        const encodedContent = encode(blogContent); // Encode before saving

        if (!req.file.mimetype.startsWith('image/')) {
            return res.status(400).json({ message: "Only image files are allowed" });
        }
        
        // Convert image to base64 and upload to Cloudinary
        const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
        const uploadedImage = await cloudinary.uploader.upload(base64Image);

        const newBlog = new Blog({
            author,
            category,
            title,
            blogContent: encodedContent, // Save the encoded content
            featuredImage: uploadedImage.secure_url,
        });

        const savedBlog = await newBlog.save();

        res.status(201).json({
        message: "Blog created successfully",
        blog: savedBlog,
        });

    } catch (error) {
        console.error("Error adding blog:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
    };

    export const getAllBlogs = async (req, res) => {
        try {
            const blogs = await Blog.find().populate("author","fullName");
        
            const blogList = blogs.map(blog => {
              const safeContent = blog.blogContent || ""; // Ensure it’s a string
              const decodedContent = decode(safeContent); // decode HTML entities
              const plainText = striptags(decodedContent); // remove HTML tags
        
              return {
                _id: blog._id,
                title: blog.title,
                category: blog.category,
                featuredImage: blog.featuredImage,
                author: blog.author.fullName,
                preview: plainText.slice(0, 100) + '...',
              };
            });
            res.status(200).json(blogList);
        } catch (error) {
          console.error("Error fetching blogs:", error);
          res.status(500).json({ message: "Server Error", error: error.message });
        }
      };
      