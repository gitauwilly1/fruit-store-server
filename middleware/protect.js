import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

export const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const token = authHeader.substring(7);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Populate the role field with permissions
        req.user = await User.findById(decoded.id)
            .select('-password')
            .populate('role');
            
        if (!req.user) {
            return res.status(401).json({ error: 'User not found' });
        }
        
        next();
    } catch (error) {
        res.status(401).json({ error: 'Not authorized to access this route, Invalid token' });
    }
};