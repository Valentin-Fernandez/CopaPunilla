import JugadorDAO from '../DAO/jugador.DAO.js';
import PartidoDAO from '../DAO/partido.DAO.js';
import EquipoRepository from './equipo.repository.js';
import JugadorRepository from './jugador.repository.js';
import TorneoRepository from './torneo.repository.js';

export default class PartidoRepository {
    static async getAll(torneoId) {
        try {
            return await PartidoDAO.getAll(torneoId);
        } catch (error) {
            throw new Error(`Error al obtener los partidos: ${error}`);
        }
    }

    static async getById(id) {
        try {
            const findPartido = await PartidoDAO.getById(id);
            if (!findPartido) {
                throw new Error('Partido no encontrado');
            }
            return findPartido;
        } catch (error) {
            throw new Error(`Error al obtener el partido: ${error}`);
        }
    }

    static async create(partido, torneoId, esPlayoff = false) {
        try {
            const partidoData = {
                ...partido,
                torneo: torneoId,
            };
            const newPartido = await PartidoDAO.create(partidoData);
            if (!newPartido) {
                throw new Error('Error al crear el partido');
            }
            if (!esPlayoff) {
                await TorneoRepository.update(torneoId, { $push: { partidos: newPartido._id } });
            }
            return newPartido;
        } catch (error) {
            throw new Error(`Error al crear el partido: ${error}`);
        }
    }

    static async update(id, partido) {
        try {
            const updatePartido = await PartidoDAO.update(id, partido);
            if (!updatePartido) {
                throw new Error('Error al actualizar el partido');
            }
            return updatePartido;
        } catch (error) {
            throw new Error(`Error al actualizar el partido: ${error}`);
        }
    }

    static async delete(id) {
        try {
            const deletePartido = await PartidoDAO.delete(id);
            if (!deletePartido) {
                throw new Error('Error al eliminar el partido');
            }
            return deletePartido;
        } catch (error) {
            throw new Error(`Error al eliminar el partido: ${error}`);
        }
    }

    static async finalizar(id, partidoBody, fase = 'liga') {
        try {
            // 1- Buscar el partido
            const findPartido = await PartidoDAO.getById(id);
            if (!findPartido) {
                throw new Error('Partido no encontrado');
            }

            let equipoLocal, equipoVisitante;

            if (fase === 'liga') {
                // 3- Buscar los equipos
                equipoLocal = await EquipoRepository.getById({ _id: findPartido.equipoLocal });
                if (!equipoLocal) {
                    throw new Error('Equipo local no encontrado');
                }
                equipoVisitante = await EquipoRepository.getById({ _id: findPartido.equipoVisitante });
                if (!equipoVisitante) {
                    throw new Error('Equipo visitante no encontrado');
                }

                // 4 - Actualizo estadisticas
                equipoLocal.estadisticas.golesFavor += partidoBody.golesLocal;
                equipoLocal.estadisticas.golesContra += partidoBody.golesVisitante;
                equipoLocal.estadisticas.partidosJugados += 1;
                equipoVisitante.estadisticas.golesFavor += partidoBody.golesVisitante;
                equipoVisitante.estadisticas.golesContra += partidoBody.golesLocal;
                equipoVisitante.estadisticas.partidosJugados += 1;
                equipoLocal.estadisticas.diferenciaGoles = equipoLocal.estadisticas.golesFavor - equipoLocal.estadisticas.golesContra;
                equipoVisitante.estadisticas.diferenciaGoles = equipoVisitante.estadisticas.golesFavor - equipoVisitante.estadisticas.golesContra;

                // 5 - Calcular quien gano y asignarle los puntos

                if (partidoBody.golesLocal > partidoBody.golesVisitante) {
                    equipoLocal.estadisticas.puntos += 2;
                    equipoLocal.estadisticas.partidosGanados += 1;
                    equipoVisitante.estadisticas.partidosPerdidos += 1;
                } else if (partidoBody.golesLocal < partidoBody.golesVisitante) {
                    equipoVisitante.estadisticas.puntos += 2;
                    equipoVisitante.estadisticas.partidosGanados += 1;
                    equipoLocal.estadisticas.partidosPerdidos += 1;
                } else {
                    equipoLocal.estadisticas.puntos += 1;
                    equipoVisitante.estadisticas.puntos += 1;
                    equipoLocal.estadisticas.partidosEmpatados += 1;
                    equipoVisitante.estadisticas.partidosEmpatados += 1;
                }
            }

            if (fase === 'liga' || fase === 'semifinal' || fase === 'final') {
                // 7 - Estadisticas de jugador
                for (const estadistica of partidoBody.estadisticas) {
                    const jugador = await JugadorRepository.getById(estadistica.jugador);
                    if (!jugador) {
                        throw new Error('Jugador no encontrado');
                    }

                    // Actualizar estadísticas generales del jugador
                    if (estadistica.amarilla > 1 || estadistica.roja > 0) {
                        jugador.estadisticas.tarjetasRojas += estadistica.roja || 0;
                        jugador.estadisticas.tarjetasAmarillas += estadistica.amarilla || 0;
                    } else {
                        jugador.estadisticas.tarjetasAmarillas += estadistica.amarilla || 0;
                    }
                    if (estadistica.goles && estadistica.goles > 0) {
                        jugador.estadisticas.goles += estadistica.goles;
                    }

                    // Guardar las estadísticas actualizadas del jugador
                    await JugadorRepository.update(jugador._id, jugador);
                }
            }

            // 8 - Finalizar partido
            const partidoFinish = {
                ...findPartido.toObject(),
                golesLocal: partidoBody.golesLocal,
                golesVisitante: partidoBody.golesVisitante,
                estado: 'finalizado',
                estadisticas: partidoBody.estadisticas,
            };

            // Hacer todas las escrituras/modificaciones en la base de datos
            let partidoActualizado;
            if (fase === 'liga') {
                [partidoActualizado] = await Promise.all([
                    PartidoDAO.update(id, partidoFinish),
                    EquipoRepository.update(equipoLocal._id, equipoLocal),
                    EquipoRepository.update(equipoVisitante._id, equipoVisitante),
                ]);
            } else {
                partidoActualizado = await PartidoDAO.update(id, partidoFinish);
            }

            if (fase === 'final') {
                let campeon;
                let subcampeon;
                if (partidoFinish.golesLocal > partidoFinish.golesVisitante) {
                    campeon = equipoLocal._id;
                    subcampeon = equipoVisitante._id;
                } else {
                    campeon = equipoVisitante._id;
                    subcampeon = equipoLocal._id;
                }

                // Actualizar el torneo con el campeón y subcampeón
                await TorneoRepository.update(partidoFinish.torneo, { campeon: campeon, subcampeon: subcampeon, estado: 'finalizado' });
            }

            return partidoActualizado;
        } catch (error) {
            throw new Error(`Error al finalizar el partido: ${error}`);
        }
    }
}
