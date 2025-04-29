import StatsRepository from '../repository/stats.repository.js';

export default class StatsController {
    static async getAll(req, res) {
        try {
            const totals = await StatsRepository.getAll();
            res.status(200).json(totals);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getGoleadores(req, res) {
        const { id } = req.params;
        try {
            const goleadores = await StatsRepository.getGoleadores(id);
            res.status(200).json(goleadores);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}
