import TorneoDAO from '../DAO/torneo.DAO.js';
import FinanzasRepository from './finanzas.repository.js';

export default class TorneoRepository {
    static async getAll() {
        try {
            const torneos = await TorneoDAO.getAll();
            const torneoConFecha = torneos.map(torneo => ({
                ...torneo.toObject(),
                fechaInicio: torneo.fechaInicio.toISOString().split('T')[0],
                fechaFin: torneo.fechaFin.toISOString().split('T')[0],
            }));
            return torneoConFecha;
        } catch (error) {
            throw new Error(`Error al obtener los torneos: ${error}`);
        }
    }

    static async getById(id) {
        try {
            let torneo = await TorneoDAO.getById(id);
            torneo = {
                ...torneo.toObject(),
                fechaInicio: torneo.fechaInicio.toISOString().split('T')[0],
                fechaFin: torneo.fechaFin.toISOString().split('T')[0],
            };
            if (!torneo) {
                throw new Error('Torneo no encontrado');
            }
            return torneo;
        } catch (error) {
            throw new Error(`Error al obtener el torneo: ${error}`);
        }
    }

    static async create(torneoBody) {
        try {
            const torneo = await TorneoDAO.create(torneoBody);
            if (!torneo) {
                throw new Error('Error al crear el torneo');
            }
            const finanza = await FinanzasRepository.createFinanzaTorneo(torneo._id);
            if (!finanza) {
                throw new Error('Error al crear la finanza del torneo');
            }
            return torneo;
        } catch (error) {
            throw new Error(`Error al crear el torneo: ${error}`);
        }
    }

    static async update(id, torneo) {
        try {
            const torneoUpdate = await TorneoDAO.update(id, torneo);
            if (!torneoUpdate) {
                throw new Error(`Torneo con ID: ${id} no encontrado`);
            }
            return torneoUpdate;
        } catch (error) {
            throw new Error(`Error al actualizar el torneo: ${error}`);
        }
    }

    static async delete(id) {
        try {
            const torneoFinalizado = await TorneoDAO.update(id, { estado: 'finalizado' });
            if (!torneoFinalizado) {
                throw new Error(`Torneo con ID: ${id} no encontrado`);
            }
            return torneoFinalizado;
        } catch (error) {
            throw new Error(`Error al eliminar el torneo: ${error}`);
        }
    }

    static async getDestacado() {
        try {
            const torneoDestacado = await TorneoDAO.getDestacado();
            if (!torneoDestacado) {
                throw new Error('No hay torneo destacado');
            }
            return torneoDestacado;
        } catch (error) {
            throw new Error(`Error al obtener el torneo destacado: ${error}`);
        }
    }

    static async setDestacado(torneoId) {
        try {
            const torneo = await TorneoDAO.setDestacado(torneoId);
            if (!torneo) {
                throw new Error('No se pudo establecer el torneo destacado');
            }
        } catch (error) {
            throw new Error(`Error al establecer el torneo destacado: ${error}`);
        }
    }

    static async detalles(id) {
        try {
            let torneoDetalles = await TorneoDAO.detalles(id);
            torneoDetalles = {
                ...torneoDetalles.toObject(),
                fechaInicio: torneoDetalles.fechaInicio.toISOString().split('T')[0],
                fechaFin: torneoDetalles.fechaFin.toISOString().split('T')[0],
            };
            if (!torneoDetalles) {
                throw new Error('No se encontraron detalles del torneo');
            }
            return torneoDetalles;
        } catch (error) {
            throw new Error(`Error al obtener los detalles del torneo: ${error}`);
        }
    }
}
