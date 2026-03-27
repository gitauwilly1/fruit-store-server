import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: ['admin', 'manager', 'user'] 
  },
  permissions: [{
    type: String,
    enum: [
      'create_fruit', 'read_fruit', 'update_fruit', 'delete_fruit',
      'manage_users', 'view_reports', 'manage_roles'
    ]
  }],
  description: {
    type: String,
    default: ''
  }
}, { timestamps: true });

export default mongoose.model("Role", roleSchema);