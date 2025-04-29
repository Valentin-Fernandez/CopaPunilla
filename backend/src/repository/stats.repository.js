import JugadorDAO from '../DAO/jugador.DAO.js';
import EquipoDAO from '../DAO/equipo.DAO.js';
import TorneoDAO from '../DAO/torneo.DAO.js';
import PartidoDAO from '../DAO/partido.DAO.js';

export default class StatsRepository {
    static async getAll() {
        try {
            const countJugador = await JugadorDAO.countDocument();
            const countEquipo = await EquipoDAO.countDocument();
            const countTorneo = await TorneoDAO.countDocument();
            const countPartido = await PartidoDAO.countDocument();

            const totals = {
                jugadores: countJugador,
                equipos: countEquipo,
                torneos: countTorneo,
                partidos: countPartido,
            };

            return totals;
        } catch (error) {
            throw error;
        }
    }

    static async getGoleadores(id) {
        try {
            const goleadores = await JugadorDAO.getGoleadores(id);
            return goleadores;
        } catch (error) {
            throw error;
        }
    }
}
