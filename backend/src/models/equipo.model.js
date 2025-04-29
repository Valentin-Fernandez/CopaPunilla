import mongoose from 'mongoose';

const equipoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    torneo: { type: mongoose.Schema.Types.ObjectId, ref: 'Torneo' },
    jugadores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Jugador' }],

    estadisticas: {
        puntos: { type: Number, default: 0 },
        partidosJugados: { type: Number, default: 0 },
        partidosGanados: { type: Number, default: 0 },
        partidosEmpatados: { type: Number, default: 0 },
        partidosPerdidos: { type: Number, default: 0 },
        golesFavor: { type: Number, default: 0 },
        golesContra: { type: Number, default: 0 },
        diferenciaGoles: { type: Number, default: 0 },
    },
});

const Equipo = mongoose.model('Equipo', equipoSchema);

export default Equipo;
