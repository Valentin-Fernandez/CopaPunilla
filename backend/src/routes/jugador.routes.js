import JugadorController from '../controller/jugador.controller.js';
import { Router } from 'express';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/equipos/:id/jugadores', JugadorController.getAll);
router.get('/jugadores/:id', JugadorController.getById);
router.post('/equipos/:id/jugadores', protect, JugadorController.create);
router.put('/jugadores/:id', protect, JugadorController.update);
router.delete('/jugadores/:id', protect, JugadorController.delete);

export default router;
