import JugadorController from '../controller/jugador.controller.js';
import { Router } from 'express';

const router = Router();

router.get('/equipos/:id/jugadores', JugadorController.getAll);
router.get('/jugadores/:id', JugadorController.getById);
router.post('/equipos/:id/jugadores', JugadorController.create);
router.put('/jugadores/:id', JugadorController.update);
router.delete('/jugadores/:id', JugadorController.delete);

export default router;
