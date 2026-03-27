import express from 'express';
import  {
    getAllFruits,
    createFruit,
    updateFruit,
    deleteFruit 
} from "../controllers/fruitController.js";
import { protect, adminOnly } from '../middleware/protect.js';

const router = express.Router();

router.get('/fruits', getAllFruits);
router.post('/fruits', protect, adminOnly, createFruit);
router.put('/fruits/:id', protect, adminOnly, updateFruit);
router.delete('/fruits/:id', protect, adminOnly, deleteFruit);

export default router;