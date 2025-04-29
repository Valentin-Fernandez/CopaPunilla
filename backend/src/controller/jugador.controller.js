import JugadorRepository from '../repository/jugador.repository.js';

export default class JugadorController {
    static async getAll(req, res) {
        try {
            const jugadores = await JugadorRepository.getAll();
            res.status(200).json(jugadores);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const jugador = await JugadorRepository.getById(req.params.id);
            res.status(200).json(jugador);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async create(req, res) {
        try {
            const newJugador = await JugadorRepository.create(req.body);
            res.status(201).json(newJugador);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const jugadorUpdate = await JugadorRepository.update(req.params.id, req.body);
            res.status(200).json(jugadorUpdate);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const jugador = await JugadorRepository.delete(req.params.id);
            res.status(200).json(jugador);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
