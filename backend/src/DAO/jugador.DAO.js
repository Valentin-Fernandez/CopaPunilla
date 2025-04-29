import Jugador from '../models/jugador.model.js';

export default class JugadorDAO {
    static async getAll() {
        return await Jugador.find();
    }

    static async getById(id) {
        return await Jugador.findById(id);
    }

    static async create(jugador) {
        return await Jugador.create(jugador);
    }

    static async update(id, jugador) {
        return await Jugador.findByIdAndUpdate(id, jugador, { new: true });
    }

    static async delete(id) {
        return await Jugador.findById(id);
    }

    static async countDocument() {
        return await Jugador.countDocuments();
    }

    static async getGoleadores(id) {
        return await Jugador.find({ torneo: id }).sort({ 'estadisticas.goles': -1 }).limit(10);
    }
}
