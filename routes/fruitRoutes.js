import express from 'express';
import  {
    getAllFruits,
    createFruit,
    updateFruit,
    deleteFruit 
} from "../controllers/fruitController.js";

const router = express.Router();

router.get('/fruits', getAllFruits);
router.post('/fruits', createFruit);
router.put('/fruits/:id', updateFruit);
router.delete('/fruits/:id', deleteFruit);

export default router;