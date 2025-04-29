import PartidoController from '../controller/partido.controller.js';
import { Router } from 'express';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/torneos/:id/partidos', PartidoController.getAll);
router.get('/partidos/:id', PartidoController.getById);
router.post('/torneos/:id/partidos', protect, PartidoController.create);
router.put('/partidos/:id', protect, PartidoController.update);
router.delete('/partidos/:id', protect, PartidoController.delete);
router.post('/partidos/:id/finalizar', protect, PartidoController.finalizar);

export default router;
