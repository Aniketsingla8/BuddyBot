import express from 'express';
import { protect } from '../middlewares/auth.js';
import { getAllPlans, purchasePlan } from '../controllers/creditController.js';

const creditRouter = express.Router();

creditRouter.get('/plan', protect, getAllPlans);
creditRouter.post('/purchase', protect, purchasePlan);

export default creditRouter;