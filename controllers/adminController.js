import User from '../models/User.js';
import Role from '../models/Role.js';

// Get all users (admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').populate('role');
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Assign role to user (admin only)
export const assignRole = async (req, res) => {
  try {
    const { userId, roleId } = req.body;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }
    
    user.role = roleId;
    await user.save();
    
    res.json({ message: 'Role assigned successfully', user: await user.populate('role') });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new role (admin only)
export const createRole = async (req, res) => {
  try {
    const { name, permissions, description } = req.body;
    
    const roleExists = await Role.findOne({ name });
    if (roleExists) {
      return res.status(400).json({ error: 'Role already exists' });
    }
    
    const role = await Role.create({ name, permissions, description });
    res.status(201).json({ role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all roles
export const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.json({ roles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};