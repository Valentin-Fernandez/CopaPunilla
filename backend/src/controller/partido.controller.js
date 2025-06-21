import PartidoRepository from '../repository/partido.repository.js';

export default class PartidoController {
    static async getAll(req, res) {
        try {
            const torneoId = req.params.id;
            const partidos = await PartidoRepository.getAll(torneoId);
            res.status(200).json(partidos);
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    }

    static async getById(req, res) {
        try {
            const partido = await PartidoRepository.getById(req.params.id);
            res.status(200).json(partido);
        } catch (error) {
            res.status(404).json({
                message: error.message,
            });
        }
    }

    static async create(req, res) {
        try {
            const torneoId = req.params.id;
            const partido = await PartidoRepository.create(req.body, torneoId);
            res.status(201).json(partido);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async update(req, res) {
        try {
            const partidoUpdate = await PartidoRepository.update(req.params.id, req.body);
            res.status(200).json(partidoUpdate);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async delete(req, res) {
        try {
            await PartidoRepository.delete(req.params.id);
            res.status(204);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async finalizar(req, res) {
        try {
            const { fase, ...partidoBody } = req.body;
            const partido = await PartidoRepository.finalizar(req.params.id, partidoBody, fase);
            res.status(200).json(partido);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}
