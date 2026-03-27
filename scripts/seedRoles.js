import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Role from '../models/Role.js';
import connectDB from '../config/db.js';

dotenv.config();

const seedRoles = async () => {
  try {
    await connectDB();
    
    // Clear existing roles
    await Role.deleteMany({});
    
    const roles = [
      {
        name: 'admin',
        permissions: [
          'create_fruit', 'read_fruit', 'update_fruit', 'delete_fruit',
          'manage_users', 'view_reports', 'manage_roles'
        ],
        description: 'Full system access'
      },
      {
        name: 'manager',
        permissions: [
          'create_fruit', 'read_fruit', 'update_fruit', 'delete_fruit',
          'view_reports'
        ],
        description: 'Can manage fruits and view reports'
      },
      {
        name: 'user',
        permissions: [
          'read_fruit'
        ],
        description: 'Can only view fruits'
      }
    ];
    
    await Role.insertMany(roles);
    console.log('Roles seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding roles:', error);
    process.exit(1);
  }
};

seedRoles();