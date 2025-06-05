import TorneoController from '../controller/torneo.controller.js';

import { Router } from 'express';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', TorneoController.getAll);
router.get('/destacado', TorneoController.getDestacado);
router.get('/detalles/:id', TorneoController.detalles);
router.get('/:id', TorneoController.getById);
router.post('/', protect, TorneoController.create);
router.put('/:id', protect, TorneoController.update);
router.put('/destacar/:id', protect, TorneoController.setDestacado);
router.delete('/:id', protect, TorneoController.delete);
/* Finalizar torneo -> ( cambiar el estado a finalizado, guardar campeon y subcampeon
guardar goleadores del torneo top 5 )
router.put('/:id/finalizar', TorneoController.finalizar); 
 */

// Activar playoffs y guardar los equipos que van a playoffs
router.put('/:id/playoffs', protect, TorneoController.playoffs);
// Obtener los playoffs de un torneo
router.get('/:id/playoffs', protect, TorneoController.getPlayoffs);
// Agregar un equipo a los playoffs
router.post('/:id/playoffs/equipo', protect, TorneoController.addEquipoPlayoffs);
router.delete('/:id/playoffs/equipo/:equipoId', protect, TorneoController.removeEquipoPlayoffs);
// Crear cruces
router.post('/:id/playoffs/cruces', protect, TorneoController.createCruces);
export default router;
