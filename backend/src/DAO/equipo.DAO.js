import Equipo from '../models/equipo.model.js';

export default class EquipoDAO {
    static async getAll(torneoId) {
        return await Equipo.find({ torneo: torneoId }).select('nombre estadisticas');
    }

    static async getById(id) {
        return await Equipo.findById(id).populate('jugadores');
    }

    static async create(equipo) {
        return await Equipo.create(equipo);
    }

    static async update(id, equipo) {
        return await Equipo.findByIdAndUpdate(id, equipo, { new: true });
    }

    static async delete(id) {
        return await Equipo.findByIdAndDelete(id);
    }

    static async countDocument() {
        return await Equipo.countDocuments();
    }
}
