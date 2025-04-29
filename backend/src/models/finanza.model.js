import mongoose from 'mongoose';

const finanzaSchema = new mongoose.Schema({
    torneo: { type: mongoose.Schema.Types.ObjectId, ref: 'Torneo', required: true },
    equipos: [
        {
            equipo: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipo' },
            monto: { type: Number, required: true },
            debe: { type: Number, default: 0 },
            estado: { type: String, enum: ['pendiente', 'pagado'], default: 'pendiente' },
        },
    ],
});

const Finanzas = mongoose.model('Finanzas', finanzaSchema);
export default Finanzas;
