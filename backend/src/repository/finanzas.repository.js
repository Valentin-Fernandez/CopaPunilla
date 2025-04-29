import FinanzasDAO from '../DAO/finanzas.DAO.js';

export default class FinanzasRepository {
    static async getAll(torneoId) {
        try {
            const finanzas = await FinanzasDAO.getAllFinanzas(torneoId);
            if (!finanzas) {
                throw new Error('No se encontraron finanzas para el torneo especificado.');
            }
            return finanzas;
        } catch (error) {
            throw new Error('Error: ' + error.message);
        }
    }

    static async createFinanzaTorneo(torneoId) {
        try {
            const finanzaTorneo = await FinanzasDAO.createFinanzaTorneo(torneoId);
            if (!finanzaTorneo) {
                throw new Error('No se pudo crear la finanza para el torneo especificado.');
            }
            return finanzaTorneo;
        } catch (error) {
            throw new Error('Error: ' + error.message);
        }
    }

    static async createFinanzaEquipo(torneoId, equipoId, monto) {
        try {
            const finanzas = await FinanzasDAO.createFinanzaEquipo(torneoId, { equipo: equipoId, monto, debe: monto });
            if (!finanzas) {
                throw new Error('No se pudo crear la finanza para el equipo especificado.');
            }
        } catch (error) {
            throw new Error('Error: ' + error.message);
        }
    }

    static async updateFinanzaEquipo(torneoId, equipoId, pago) {
        try {
            const equipo = await FinanzasDAO.getFinanzaEquipo(torneoId, equipoId);
            if (!equipo) {
                throw new Error('No se encontró el equipo especificado.');
            }
            equipo.debe -= pago;
            equipo.estado = equipo.debe <= 0 ? 'pagado' : 'pendiente';
            const finanza = await FinanzasDAO.updateFinanzaEquipo(torneoId, equipo);
            if (!finanza) {
                throw new Error('No se pudo actualizar la finanza del equipo especificado.');
            }
        } catch (error) {
            throw new Error('Error: ' + error.message);
        }
    }
}
