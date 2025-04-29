import PartidoController from '../controller/partido.controller.js';
import { Router } from 'express';

const router = Router();

router.get('/torneos/:id/partidos', PartidoController.getAll);
router.get('/partidos/:id', PartidoController.getById);
router.post('/torneos/:id/partidos', PartidoController.create);
router.put('/partidos/:id', PartidoController.update);
router.delete('/partidos/:id', PartidoController.delete);
router.post('/partidos/:id/finalizar', PartidoController.finalizar);

export default router;
