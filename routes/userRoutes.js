import express from 'express';
import { protect } from '../middleware/auth.js';
import { checkPermission } from '../middleware/rbac.js';

const router = express.Router();

// Example of a protected route with specific permission
router.get('/profile', protect, async (req, res) => {
  res.json({ user: req.user });
});

// Example of permission-based access
router.post('/fruit', 
  protect, 
  checkPermission('create_fruit'), 
  async (req, res) => {
    // Your fruit creation logic here
    res.json({ message: 'Fruit created!' });
  }
);

export default router;