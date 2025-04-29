import Torneo from '../models/torneo.model.js';

export default class TorneoDAO {
    static async getAll() {
        return Torneo.find().select('nombre fechaInicio fechaFin estado destacado');
    }
    static async getById(id) {
        return Torneo.findById(id)
            .populate({ path: 'equipos', select: 'nombre _id estadisticas' })
            .populate({ path: 'partidos', select: 'equipoLocal equipoVisitante golesLocal golesVisitante fecha fechaLiga estado' });
    }
    static async create(torneo) {
        return Torneo.create(torneo);
    }
    static async update(id, torneo) {
        return Torneo.findByIdAndUpdate(id, torneo, { new: true });
    }
    static async delete(id) {
        return Torneo.findByIdAndDelete(id);
    }

    static async countDocument() {
        return await Torneo.countDocuments();
    }

    static async getDestacado() {
        const torneo = await Torneo.findOne({ destacado: true })
            .populate({ path: 'equipos', select: 'nombre _id estadisticas' })
            .populate({ path: 'partidos', select: 'equipoLocal equipoVisitante golesLocal golesVisitante fecha fechaLiga estado' });

        if (torneo && torneo.equipos.length > 0) {
            torneo.equipos = torneo.equipos.sort((a, b) => b.estadisticas.puntos - a.estadisticas.puntos);
        }
        return torneo;
    }

    static async setDestacado(id) {
        await Torneo.updateMany({}, { destacado: false });
        return Torneo.findByIdAndUpdate(id, { destacado: true });
    }

    static async detalles(id) {
        return Torneo.findById(id).select('-partidos').populate({ path: 'equipos', select: 'nombre _id' });
        /* .populate({ path: 'finanzas', select: 'ingresos egresos' }); */
    }
}
