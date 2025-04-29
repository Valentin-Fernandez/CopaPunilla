import JugadorDAO from '../DAO/jugador.DAO.js';
import EquipoRepository from './equipo.repository.js';

export default class JugadorRepository {
    static async getAll() {
        try {
            return await JugadorDAO.getAll();
        } catch (error) {
            throw new Error(`Error al obtener los jugadores: ${error}`);
        }
    }

    static async getById(id) {
        try {
            const jugador = await JugadorDAO.getById(id);
            if (!jugador) {
                throw new Error(`Jugador con ID: ${id} no encontrado`);
            }
            return jugador;
        } catch (error) {
            throw new Error(`Error al obtener el jugador: ${error}`);
        }
    }

    static async create(jugador) {
        try {
            const newJugador = await JugadorDAO.create(jugador);
            console.log('newJugador', newJugador);
            if (!jugador) {
                throw new Error(`Error al crear el jugador`);
            }
            // Llamar a Equipo.Repository para actualizar el equipo con el nuevo jugador
            await EquipoRepository.addJugador(jugador.equipo, newJugador._id);
            return newJugador;
        } catch (error) {
            throw new Error(`Error al crear el jugador: ${error}`);
        }
    }

    static async update(id, jugador) {
        try {
            const jugadorUpdate = await JugadorDAO.update(id, jugador);
            if (!jugadorUpdate) {
                throw new Error(`Jugador con ID: ${id} no encontrado`);
            }
            return jugadorUpdate;
        } catch (error) {
            throw new Error(`Error al actualizar el jugador: ${error}`);
        }
    }

    static async delete(id) {
        try {
            const jugador = await JugadorDAO.update(id, { activo: false });
            if (!jugador) {
                throw new Error(`Jugador con ID: ${id} no encontrado`);
            }
            return jugador;
        } catch (error) {
            throw new Error(`Error al eliminar el jugador: ${error}`);
        }
    }
}
