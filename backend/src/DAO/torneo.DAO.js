import Torneo from '../models/torneo.model.js';

export default class TorneoDAO {
    static async getAll() {
        return Torneo.find().select('nombre fechaInicio fechaFin estado destacado');
    }
    static async getById(id) {
        return Torneo.findById(id)
            .populate({ path: 'equipos', select: 'nombre _id estadisticas' })
            .populate({ path: 'partidos', select: 'equipoLocal equipoVisitante golesLocal golesVisitante fecha fechaLiga estado' });
    }
    static async create(torneo) {
        return Torneo.create(torneo);
    }
    static async update(id, torneo) {
        return Torneo.findByIdAndUpdate(id, torneo, { new: true });
    }
    static async delete(id) {
        return Torneo.findByIdAndDelete(id);
    }

    static async countDocument() {
        return await Torneo.countDocuments();
    }

    static async getDestacado() {
        const torneo = await Torneo.findOne({ destacado: true })
            .populate({ path: 'equipos', select: 'nombre _id estadisticas' })
            .populate({ path: 'partidos', select: 'equipoLocal equipoVisitante golesLocal golesVisitante fecha fechaLiga estado' })
            .populate({
                path: 'faseEliminatoria.partidosEliminacion.partido',
                select: 'equipoLocal equipoVisitante golesLocal golesVisitante estado fecha',
                populate: [
                    { path: 'equipoLocal', select: 'nombre' },
                    { path: 'equipoVisitante', select: 'nombre' },
                ],
            });

        if (torneo && torneo.equipos.length > 0) {
            torneo.equipos = torneo.equipos.sort((a, b) => {
                if (b.estadisticas.puntos !== a.estadisticas.puntos) {
                    return b.estadisticas.puntos - a.estadisticas.puntos;
                }

                return (b.estadisticas.diferenciaGoles || 0) - (a.estadisticas.diferenciaGoles || 0);
            });
        }
        return torneo;
    }

    static async setDestacado(id) {
        await Torneo.updateMany({}, { destacado: false });
        return Torneo.findByIdAndUpdate(id, { destacado: true });
    }

    static async detalles(id) {
        const torneo = await Torneo.findById(id).select('-partidos').populate({ path: 'equipos', select: 'nombre _id estadisticas.puntos estadisticas.diferenciaGoles' });
        /* .populate({ path: 'finanzas', select: 'ingresos egresos' }); */

        // Retornar los equipos ordenados por puntos
        if (torneo && torneo.equipos.length > 0) {
            // Ordenar los equipos por puntos y diferencia de goles
            torneo.equipos = torneo.equipos.sort((a, b) => {
                if (b.estadisticas.puntos !== a.estadisticas.puntos) {
                    return b.estadisticas.puntos - a.estadisticas.puntos;
                }
                return (b.estadisticas.diferenciaGoles || 0) - (a.estadisticas.diferenciaGoles || 0);
            });
        }

        return torneo;
    }

    static async playoffs(id) {
        const torneo = await Torneo.findById(id)
            .select('faseEliminatoria')
            .populate([
                { path: 'faseEliminatoria.equiposClasificados.equipo', select: 'nombre' },
                {
                    path: 'faseEliminatoria.partidosEliminacion.partido',
                    select: 'equipoLocal equipoVisitante golesLocal golesVisitante estado',
                    populate: [
                        { path: 'equipoLocal', select: 'nombre' },
                        { path: 'equipoVisitante', select: 'nombre' },
                    ],
                },
            ]);
        return torneo;
    }
}
