import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import TorneoRoutes from './routes/torneo.routes.js';
import EquipoRoutes from './routes/equipo.routes.js';
import PartidoRoutes from './routes/partido.routes.js';
import JugadorRoutes from './routes/jugador.routes.js';
import StatsRoutes from './routes/stats.routes.js';
import UserRoutes from './routes/users.router.js';
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cookieParser());
// Configuración de CORS
app.use(
    cors({
        origin: process.env.CORS_ORIGIN, // Permite solicitudes desde este origen
        credentials: true, // Permite el envío de cookies y encabezados de autorización
    }),
);
app.use('/api/auth', UserRoutes);
app.use('/api/torneos', TorneoRoutes);
app.use('/api', EquipoRoutes);
app.use('/api', PartidoRoutes);
app.use('/api', JugadorRoutes);
app.use('/api', StatsRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Conexion a la base de datos
const URL_DB = process.env.MONGO_URL;
/* const URL_DB = 'mongodb://127.0.0.1:27017/torneo'; */

const connectDB = async () => {
    try {
        await mongoose.connect(URL_DB);
        console.log('Conectado a la DB');
    } catch (error) {
        console.error('Error al conectarse a la DB', error);
    }
};

connectDB();
