import mongoose from 'mongoose';

const torneoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    fechaInicio: { type: Date, required: true },
    fechaFin: { type: Date, required: true },
    estado: { type: String, enum: ['activo', 'finalizado', 'pausado'], default: 'activo' },
    equipos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Equipo' }],
    partidos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Partido' }],
    finanzas: { type: mongoose.Schema.Types.ObjectId, ref: 'Finanzas' },

    faseEliminatoria: {
        activo: { type: Boolean, default: false },
        equiposClasificados: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Equipo' }],
        partidosEliminacion: [
            {
                ronda: { type: String, enum: ['octavos', 'cuartos', 'semifinal', 'final'] },
                partido: { type: mongoose.Schema.Types.ObjectId, ref: 'Partido' },
            },
        ],
    },

    destacado: { type: Boolean, default: false },
    campeon: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipo' },
    subcampeon: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipo' },
});

const Torneo = mongoose.model('Torneo', torneoSchema);
export default Torneo;
