import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Role from '../models/Role.js';
import dotenv from 'dotenv';

dotenv.config();

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Get default role (user)
        const defaultRole = await Role.findOne({ name: 'user' });
        if (!defaultRole) {
            return res.status(500).json({ error: 'Default role not found. Please run seed script.' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the user with role
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            role: defaultRole._id
        });

        // Generate a token
        const token = generateToken(user._id);

        // Return the user and token
        res.status(201).json({ 
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: defaultRole.name
            }, 
            token 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists with role populated
        const user = await User.findOne({ email }).populate('role');
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Generate a token
        const token = generateToken(user._id);

        // Return the user and token
        res.json({ 
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role.name,
                permissions: user.role.permissions
            }, 
            token 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};