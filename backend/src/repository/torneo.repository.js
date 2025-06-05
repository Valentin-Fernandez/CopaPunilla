import TorneoDAO from '../DAO/torneo.DAO.js';
import Torneo from '../models/torneo.model.js';
import FinanzasRepository from './finanzas.repository.js';
import PartidoRepository from './partido.repository.js';

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

    static async playoffs(id, torneo) {
        try {
            const torneoUpdate = await TorneoDAO.update(id, {
                $set: {
                    'faseEliminatoria.activo': torneo.faseEliminatoria.activo,
                    'faseEliminatoria.equiposClasificados': torneo.faseEliminatoria.equiposClasificados,
                },
            });

            if (!torneoUpdate) {
                throw new Error(`Torneo con ID: ${id} no encontrado`);
            }
            return torneoUpdate;
        } catch (error) {
            throw new Error(`Error al activar los playoffs: ${error}`);
        }
    }

    static async getPlayoffs(id) {
        try {
            const torneo = await TorneoDAO.playoffs(id);
            if (!torneo) {
                throw new Error(`Torneo con ID: ${id} no encontrado`);
            }
            return torneo;
        } catch (error) {
            throw new Error(`Error al obtener los playoffs del torneo: ${error}`);
        }
    }

    static async addEquipoPlayoffs(id, equipo) {
        try {
            const torneo = await TorneoDAO.playoffs(id);
            if (!torneo) {
                throw new Error(`Torneo con ID: ${id} no encontrado`);
            }
            const equipoExiste = torneo.faseEliminatoria.equiposClasificados.some(e => e.equipo._id.toString() === equipo.toString());
            if (equipoExiste) {
                throw new Error('El equipo ya está en los playoffs');
            }
            torneo.faseEliminatoria.equiposClasificados.push({ equipo, posicion: torneo.faseEliminatoria.equiposClasificados.length + 1 });
            await TorneoDAO.update(id, {
                $set: {
                    'faseEliminatoria.equiposClasificados': torneo.faseEliminatoria.equiposClasificados,
                },
            });
            return torneo;
        } catch (error) {
            throw new Error(`Error al agregar el equipo a los playoffs: ${error}`);
        }
    }

    static async removeEquipoPlayoffs(id, equipoId) {
        try {
            const torneo = await TorneoDAO.playoffs(id);
            if (!torneo) {
                throw new Error(`Torneo con ID: ${id} no encontrado`);
            }
            const equipoIndex = torneo.faseEliminatoria.equiposClasificados.findIndex(e => e.equipo._id.toString() === equipoId.toString());
            if (equipoIndex === -1) {
                throw new Error('El equipo no está en los playoffs');
            }
            torneo.faseEliminatoria.equiposClasificados.splice(equipoIndex, 1);
            torneo.faseEliminatoria.equiposClasificados = torneo.faseEliminatoria.equiposClasificados.sort((a, b) => a.posicion - b.posicion).map((e, index) => ({ ...e, posicion: index + 1 }));
            await TorneoDAO.update(id, {
                $set: {
                    'faseEliminatoria.equiposClasificados': torneo.faseEliminatoria.equiposClasificados,
                },
            });
            return torneo;
        } catch (error) {
            throw new Error(`Error al eliminar el equipo de los playoffs: ${error}`);
        }
    }

    static async createCruces(idTorneo) {
        try {
            const torneo = await TorneoDAO.playoffs(idTorneo);
            if (!torneo) {
                throw new Error(`Torneo con ID: ${idTorneo} no encontrado`);
            }
            if (!torneo.faseEliminatoria.activo) {
                throw new Error('Los playoffs no están activos');
            }
            const equiposClasificados = torneo.faseEliminatoria.equiposClasificados;
            // 1. Tomar los partidos por Ronda
            const partidosEliminacion = torneo.faseEliminatoria.partidosEliminacion;
            const cuartos = partidosEliminacion.filter(p => p.ronda === 'cuartos');
            const semifinales = partidosEliminacion.filter(p => p.ronda === 'semifinal');
            const final = partidosEliminacion.filter(p => p.ronda === 'final');
            // 2. Crear los cruces

            // Cuartos de final
            if (cuartos.length === 0) {
                // Buscar el equipo de la 3era posicion y 6ta posicion
                console.log('Creando cruces de cuartos de final');
                const equipo3 = equiposClasificados.find(e => e.posicion === 3);

                const equipo6 = equiposClasificados.find(e => e.posicion === 6);
                const primerCruce = {
                    equipoLocal: String(equipo3.equipo._id),
                    equipoVisitante: String(equipo6.equipo._id),
                };
                console.log('Primer cruce:', primerCruce);
                // Buscar el equipo de la 4ta posicion y 5ta posicion
                const equipo4 = equiposClasificados.find(e => e.posicion === 4);
                const equipo5 = equiposClasificados.find(e => e.posicion === 5);
                const segundoCruce = {
                    equipoLocal: String(equipo4.equipo._id),
                    equipoVisitante: String(equipo5.equipo._id),
                };
                console.log('Segundo cruce:', segundoCruce);
                // Crear los partidos de cuartos
                const partido1 = await PartidoRepository.create(primerCruce, idTorneo, true);
                const partido2 = await PartidoRepository.create(segundoCruce, idTorneo, true);
                console.log('Partidos de cuartos creados:', partido1);

                // Actualizar los partidos de la fase eliminatoria
                torneo.faseEliminatoria.partidosEliminacion.push({ ronda: 'cuartos', partido: partido1._id }, { ronda: 'cuartos', partido: partido2._id });

                await torneo.save();
                return;
            }

            // Semifinal
            // Validar si los cuartos de final ya fueron jugados
            const cuartosJugados = cuartos.every(p => p.partido.estado === 'finalizado');
            if (cuartosJugados && semifinales.length === 0) {
                // Averiguar quien gano en cada cruce
                const cruce1 = cuartos[0].partido;
                const cruce2 = cuartos[1].partido;
                const ganadorCruce1 = null;
                const ganadorCruce2 = null;
                if (cruce1.golesLocal > cruce1.golesVisitante) {
                    ganadorCruce1 = cruce1.equipoLocal;
                } else ganadorCruce1 = cruce1.equipoVisitante;
                if (cruce2.golesLocal > cruce2.golesVisitante) {
                    ganadorCruce2 = cruce2.equipoLocal;
                } else ganadorCruce2 = cruce2.equipoVisitante;

                // Crear los partidos de semifinal
                const equipo1 = equiposClasificados.find(e => e.posicion === 1);
                const equipo2 = equiposClasificados.find(e => e.posicion === 2);
                const semifinal1 = {
                    equipoLocal: equipo1,
                    equipoVisitante: ganadorCruce2,
                };
                const semifinal2 = {
                    equipoLocal: equipo2,
                    equipoVisitante: ganadorCruce1,
                };

                const partido1 = await PartidoRepository.create(semifinal1, idTorneo, true);
                const partido2 = await PartidoRepository.create(semifinal2, idTorneo, true);
                // Actualizar los partidos de la fase eliminatoria
                torneo.faseEliminatoria.partidosEliminacion.push({ ronda: 'semifinal', partido: partido1._id }, { ronda: 'semifinal', partido: partido2._id });
                await torneo.save();
                return;
            }
        } catch (error) {
            throw new Error(`Error al crear los cruces de playoffs: ${error}`);
        }
    }
}
