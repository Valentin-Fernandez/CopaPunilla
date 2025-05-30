import React from 'react';
import { Link } from 'react-router-dom';

const Table = ({ simplificada = false, torneo }) => {
    return (
        <div className="px-4">
            <div className="overflow-x-auto text-sm  rounded-xl shadow-md text-secundary">
                <h2 className="px-6 py-2 text-lg font-semibold ">Tabla de posiciones {!simplificada && <span className="font-extralight text-xs">{torneo.nombre}</span>}</h2>
                <table className="w-full">
                    <thead className="border-t shadow-sm border-terciary">
                        <tr className="shadow-sm">
                            {/* <th className="py-3">#</th> */}
                            <th className="py-3">Equipo</th>
                            <th className="py-3">PJ</th>
                            {!simplificada && (
                                <>
                                    <th className="py-3">PG</th>
                                    <th className="py-3">E</th>
                                    <th className="py-3">D</th>
                                    <th className="py-3">GF</th>
                                    <th className="py-3">GC</th>
                                    <th className="py-3">DG</th>
                                </>
                            )}
                            <th className="py-3">Pts</th>
                        </tr>
                    </thead>
                    <tbody className="text-base">
                        {torneo.equipos.map((equipo, index) => {
                            let style = {};
                            if (index < 2) {
                                style = { borderLeft: '4px solid #b14624' };
                            } else if (index < 6) {
                                style = { borderLeft: '4px solid #00bfff' };
                            }

                            return (
                                <tr key={equipo._id} className="shadow-sm" style={style}>
                                    {/* <td className="text-center py-3 px-2">{equipo.posicion}</td> */}
                                    <td className="text-center py-3 px-2">
                                        <Link to={`/equipo/${equipo._id}`} className="border-b border-terciary">
                                            {equipo.nombre}
                                        </Link>
                                    </td>
                                    <td className="text-center py-3 px-2">{equipo.estadisticas.partidosJugados}</td>
                                    {!simplificada && (
                                        <>
                                            <td className="text-center py-3 px-2">{equipo.estadisticas.partidosGanados}</td>
                                            <td className="text-center py-3 px-2">{equipo.estadisticas.partidosEmpatados}</td>
                                            <td className="text-center py-3 px-2">{equipo.estadisticas.partidosPerdidos}</td>
                                            <td className="text-center py-3 px-2">{equipo.estadisticas.golesFavor}</td>
                                            <td className="text-center py-3 px-2">{equipo.estadisticas.golesContra}</td>
                                            <td className="text-center py-3 px-2">{equipo.estadisticas.diferenciaGoles}</td>
                                        </>
                                    )}
                                    <td className="text-center py-3 px-2 font-bold">{equipo.estadisticas.puntos}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="flex gap-3 items-center px-6 py-4 text-xs">
                    <div className="w-3 h-3 bg-terciary rounded-full"></div>
                    <span>Semifinalistas</span>
                    <div className="w-3 h-3 bg-[#00bfff] rounded-full"></div>
                    <span>Repechaje</span>
                </div>
            </div>
        </div>
    );
};

export default Table;
