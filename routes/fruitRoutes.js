import express from 'express';
import  {
    getAllFruits,
    createFruit,
    updateFruit,
    deleteFruit 
} from "../controllers/fruitController.js";
import {protect} from '../middleware/protect.js';

const router = express.Router();

router.get('/fruits', getAllFruits);
router.post('/fruits', protect, createFruit);
router.put('/fruits/:id', protect, updateFruit);
router.delete('/fruits/:id', protect, deleteFruit);

export default router;