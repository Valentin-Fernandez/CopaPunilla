import EquipoDAO from '../DAO/equipo.DAO.js';
import TorneoRepository from './torneo.repository.js';

export default class EquipoRepository {
    static async getAll(torneoId) {
        try {
            return await EquipoDAO.getAll(torneoId);
        } catch (error) {
            throw new Error(`Error al obtener los equipos: ${error}`);
        }
    }

    static async getById(id) {
        try {
            const equipo = await EquipoDAO.getById(id);
            if (!equipo) {
                throw new Error(`Equipo con ID: ${id} no encontrado`);
            }
            return equipo;
        } catch (error) {
            throw new Error(`Error al obtener el equipo: ${error}`);
        }
    }

    static async create(id, equipo) {
        try {
            const newEquipo = await EquipoDAO.create(equipo);
            if (!equipo) {
                throw new Error(`Error al crear el equipo`);
            }
            const torneoUpdate = await TorneoRepository.update(id, { $push: { equipos: newEquipo._id } });
            if (!torneoUpdate) {
                throw new Error(`Error al asociar el equipo al torneo con ID: ${equipo.torneo}`);
            }
            return newEquipo;
        } catch (error) {
            throw new Error(`Error al crear el equipo: ${error}`);
        }
    }

    static async update(id, equipo) {
        try {
            const equipoUpdate = await EquipoDAO.update(id, equipo);
            if (!equipoUpdate) {
                throw new Error(`Equipo con ID: ${id} no encontrado`);
            }
            return equipoUpdate;
        } catch (error) {
            throw new Error(`Error al actualizar el equipo: ${error}`);
        }
    }

    static async delete(id) {
        try {
            const equipo = await EquipoDAO.delete(id);
            if (!equipo) {
                throw new Error(`Equipo con ID: ${id} no encontrado`);
            }
            return equipo;
        } catch (error) {
            throw new Error(`Error al eliminar el equipo: ${error}`);
        }
    }

    static async addJugador(id, jugador) {
        try {
            const equipoUpdate = await EquipoDAO.update(id, { $push: { jugadores: jugador } });
            if (!equipoUpdate) {
                throw new Error(`Equipo con ID: ${id} no encontrado`);
            }
            return equipoUpdate;
        } catch (error) {
            throw new Error(`Error al agregar el jugador al equipo: ${error}`);
        }
    }
}
