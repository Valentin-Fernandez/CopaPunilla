import TorneoRepository from '../repository/torneo.repository.js';

export default class TorneoController {
    static async getAll(req, res) {
        try {
            const torneos = await TorneoRepository.getAll();
            res.json(torneos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const { id } = req.params;
            const torneo = await TorneoRepository.getById(id);
            res.json(torneo);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    static async create(req, res) {
        try {
            const torneo = await TorneoRepository.create(req.body);
            res.status(201).json(torneo);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const torneo = await TorneoRepository.update(id, req.body);
            res.json(torneo);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            const torneo = await TorneoRepository.delete(id);
            res.json({ message: 'Torneo finalizado', torneo });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getDestacado(req, res) {
        try {
            const torneoDestacado = await TorneoRepository.getDestacado();
            res.json(torneoDestacado);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    static async setDestacado(req, res) {
        try {
            const { id } = req.params;
            await TorneoRepository.setDestacado(id);
            res.json({ message: 'Torneo destacado actualizado' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async detalles(req, res) {
        try {
            const { id } = req.params;
            const torneo = await TorneoRepository.detalles(id);
            res.json(torneo);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    static async playoffs(req, res) {
        try {
            const { id } = req.params;
            const torneoReq = req.body;
            const torneo = await TorneoRepository.playoffs(id, torneoReq);
            res.json(torneo);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getPlayoffs(req, res) {
        try {
            const { id } = req.params;
            const torneoPlayoffs = await TorneoRepository.getPlayoffs(id);
            res.json(torneoPlayoffs);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    static async addEquipoPlayoffs(req, res) {
        try {
            const { id } = req.params;
            const { equipoId } = req.body;
            await TorneoRepository.addEquipoPlayoffs(id, equipoId);
            res.json({ message: 'Equipo agregado correctamente a los playoffs' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async removeEquipoPlayoffs(req, res) {
        try {
            const { id, equipoId } = req.params;
            await TorneoRepository.removeEquipoPlayoffs(id, equipoId);
            res.json({ message: 'Equipo eliminado correctamente de los playoffs' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async createCruces(req, res) {
        try {
            const { id } = req.params;
            await TorneoRepository.createCruces(id);
            res.json({ message: 'Cruces creados correctamente' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
