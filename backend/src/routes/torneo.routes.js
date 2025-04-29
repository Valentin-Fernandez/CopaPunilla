import TorneoController from '../controller/torneo.controller.js';
import { Router } from 'express';

const router = Router();

router.get('/', TorneoController.getAll);
router.get('/destacado', TorneoController.getDestacado);
router.get('/detalles/:id', TorneoController.detalles);
router.get('/:id', TorneoController.getById);
router.post('/', TorneoController.create);
router.put('/:id', TorneoController.update);
router.put('/destacar/:id', TorneoController.setDestacado);
router.delete('/:id', TorneoController.delete);
/* Finalizar torneo -> ( cambiar el estado a finalizado, guardar campeon y subcampeon
guardar goleadores del torneo top 5 )
router.put('/:id/finalizar', TorneoController.finalizar); 
 */

export default router;
