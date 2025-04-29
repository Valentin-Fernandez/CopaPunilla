import UserRepository from '../repository/user.repository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default class UsersController {
    static async registerUser(req, res) {
        const { username, password } = req.body;
        try {
            const existingUser = await UserRepository.getUserByUsername(username);
            if (existingUser) {
                return res.status(400).json({ message: 'El usuario ya existe' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await UserRepository.createUser(username, hashedPassword);
            return res.status(201).json({ message: 'Usuario creado', user: newUser.username });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async loginUser(req, res) {
        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
            throw new Error('JWT_SECRET no está definido en las variables de entorno');
        }
        const { username, password } = req.body;
        try {
            const user = await UserRepository.getUserByUsername(username);
            if (!user) {
                return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
            }
            const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 3600000, // 1 hour
            });
            return res.status(200).json({ message: 'Inicio de sesión exitoso' });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}
