import EquipoController from '../controller/equipo.controller.js';
import { Router } from 'express';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/torneos/:id/equipos', EquipoController.getAll);
router.get('/equipos/:id', EquipoController.getById);
router.post('/torneos/:id/equipos', protect, EquipoController.create);
router.put('/equipos/:id', EquipoController.update);
router.delete('/equipos/:id/:id', EquipoController.delete);
/*router.post('/:id/jugador', EquipoController.agregarJugador) Agregar jugador
router.delete('/:id/jugador/:id', EquipoController.eliminarJugador Eliminar jugador */

export default router;
