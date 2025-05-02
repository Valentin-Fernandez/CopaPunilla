import UsersController from '../controller/users.controller.js';

import { Router } from 'express';
import { protect } from '../middleware/auth.middleware.js';
const router = Router();

/* router.post('/register', UsersController.registerUser); */
router.post('/login', UsersController.loginUser);
// Ruta para verificar si el usuario está logueado
router.get('/check', protect, (req, res) => {
    res.status(200).json({ message: 'Usuario autenticado', user: req.user });
});

export default router;
