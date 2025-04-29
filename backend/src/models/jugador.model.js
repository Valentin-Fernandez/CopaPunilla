import mongoose from 'mongoose';

const jugadorSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    equipo: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipo', required: true },
    torneo: { type: mongoose.Schema.Types.ObjectId, ref: 'Torneo', required: true },
    dni: { type: String },
    estadisticas: {
        goles: { type: Number, default: 0 },
        tarjetasAmarillas: { type: Number, default: 0 },
        tarjetasRojas: { type: Number, default: 0 },
    },
    activo: { type: Boolean, default: true },
});

const Jugador = mongoose.model('Jugador', jugadorSchema);
export default Jugador;
