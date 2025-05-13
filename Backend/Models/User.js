import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    type: { type: String, enum: ['user', 'admin'], default: 'user', required: false },   
    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
    weight: { type: Number },
    height: { type: Number },
    activity: { type: String, enum: ['less active', 'moderately active', 'highly active'] },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('User', userSchema);
export default User;