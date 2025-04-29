import Partido from '../models/partido.model.js';

export default class PartidoDAO {
    static async getAll(torneoId) {
        return await Partido.find({ torneo: torneoId })
            .populate('equipoLocal', 'nombre')
            .populate('equipoVisitante', 'nombre')
            .select('equipoLocal equipoVisitante fecha fechaLiga estado golesLocal golesVisitante');
    }

    static async getById(id) {
        return await Partido.findById(id);
    }

    static async create(partido) {
        return await Partido.create(partido);
    }

    static async update(id, partido) {
        return await Partido.findByIdAndUpdate(id, partido, { new: true });
    }

    static async delete(id) {
        return await Partido.findByIdAndDelete(id);
    }

    static async countDocument() {
        return await Partido.countDocuments();
    }
}
