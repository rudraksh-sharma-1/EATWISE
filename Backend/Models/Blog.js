import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    category: {
        type: String,
      /*   enum: ['Nutrition Tips', 'Healthy Recipes', 'Fitness'], */
        required: true,
        default: 'Nutrition Tips'
    },
    title: {
        type: String,
        required: true,
    },
    blogContent: {
        type: String,
        required: true,
    },
    featuredImage: {
        type: String,
        required: true,
    }
}, { timestamps: true })

const Blog = mongoose.model('Blog', blogSchema, 'blogs')
export default Blog 