import Finanzas from '../models/finanza.model.js';

export default class FinanzasDAO {
    static async getAll(torneoId) {
        const finanzas = await Finanzas.find({ torneo: torneoId }).populate('equipos.equipo', 'nombre');
        return finanzas;
    }

    static async createFinanzaEquipo(torneoId, equipo) {
        const finanza = await Finanzas.findOneAndUpdate({ torneo: torneoId }, { $push: { equipos: equipo } }, { new: true, upsert: true });
        return finanza;
    }

    static async createFinanzaTorneo(torneoId) {
        const finanza = await Finanzas.create({ torneo: torneoId, equipos: [] });
        return finanza;
    }

    static async getFinanzaEquipo(torneoId, equipoId) {
        return Finanzas.findOne({ torneo: torneoId, 'equipos.equipo': equipoId });
    }

    static async updateFinanzaEquipo(torneoId, equipo) {
        return Finanzas.findOneAndUpdate({ torneo: torneoId, 'equipos.equipo': equipo.equipo }, { $set: { 'equipos.$.debe': equipo.debe, 'equipos.$.estado': equipo.estado } }, { new: true });
    }
}
