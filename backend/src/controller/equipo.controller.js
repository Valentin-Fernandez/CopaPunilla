import EquipoRepository from '../repository/equipo.repository.js';

export default class EquipoController {
    static async getAll(req, res) {
        try {
            const torneoId = req.params.id;
            if (!torneoId) {
                return res.status(400).json({ error: 'ID de torneo no proporcionado' });
            }
            const equipos = await EquipoRepository.getAll(torneoId);
            res.json(equipos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const equipo = await EquipoRepository.getById(req.params.id);
            res.json(equipo);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    static async create(req, res) {
        try {
            const torneoId = req.params.id;
            if (!torneoId) {
                return res.status(400).json({ error: 'ID de torneo no proporcionado' });
            }
            const newEquipo = await EquipoRepository.create(torneoId, req.body);
            res.status(201).json(newEquipo);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const updatedEquipo = await EquipoRepository.update(req.params.id, req.body);
            res.json(updatedEquipo);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            await EquipoRepository.delete(req.params.id);
            res.status(204);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
