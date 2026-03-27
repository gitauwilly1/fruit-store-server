import express from 'express';
import { protect } from '../middleware/auth.js';
import { checkRole, checkPermission } from '../middleware/rbac.js';
import { getAllUsers, assignRole, createRole, getAllRoles } from '../controllers/adminController.js';
import { updateRolePermissions, deleteRole } from '../controllers/roleController.js';

const router = express.Router();

// All admin routes require authentication and admin role
router.use(protect);
router.use(checkRole('admin'));

// User management
router.get('/users', getAllUsers);
router.post('/assign-role', assignRole);

// Role management
router.get('/roles', getAllRoles);
router.post('/roles', createRole);
router.put('/roles/:roleId/permissions', updateRolePermissions);
router.delete('/roles/:roleId', deleteRole);

export default router;