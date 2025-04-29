import { Router } from 'express';
import StatsController from '../controller/stats.controller.js';

const router = Router();

router.get('/stats', StatsController.getAll);
router.get('/torneos/:id/goleadores', StatsController.getGoleadores);

export default router;
