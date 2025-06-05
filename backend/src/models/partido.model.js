import mongoose from 'mongoose';

const partidoSchema = new mongoose.Schema({
    torneo: { type: mongoose.Schema.Types.ObjectId, ref: 'Torneo', required: true },
    equipoLocal: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipo', required: true },
    equipoVisitante: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipo', required: true },
    golesLocal: { type: Number, default: 0 },
    golesVisitante: { type: Number, default: 0 },
    fechaLiga: { type: Number },
    fecha: { type: Date },
    estado: { type: String, enum: ['pendiente', 'jugado'], default: 'pendiente' },
    estadisticas: [
        {
            jugador: { type: mongoose.Schema.Types.ObjectId, ref: 'Jugador' },
            goles: { type: Number, default: 0 },
            amarilla: { type: Number, default: 0 },
            roja: { type: Number, default: 0 },
        },
    ],
});

const Partido = mongoose.model('Partido', partidoSchema);
export default Partido;
