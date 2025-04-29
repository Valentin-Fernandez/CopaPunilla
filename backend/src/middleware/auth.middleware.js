import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'No autorizado' });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido' });
    }
};
