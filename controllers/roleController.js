import Role from '../models/Role.js';
import User from '../models/User.js';

// Update role permissions
export const updateRolePermissions = async (req, res) => {
  try {
    const { roleId } = req.params;
    const { permissions } = req.body;
    
    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }
    
    role.permissions = permissions;
    await role.save();
    
    res.json({ message: 'Role permissions updated', role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete role
export const deleteRole = async (req, res) => {
  try {
    const { roleId } = req.params;
    
    // Check if any users have this role
    const usersWithRole = await User.findOne({ role: roleId });
    if (usersWithRole) {
      return res.status(400).json({ 
        error: 'Cannot delete role. Users are assigned to this role.' 
      });
    }
    
    await Role.findByIdAndDelete(roleId);
    res.json({ message: 'Role deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};