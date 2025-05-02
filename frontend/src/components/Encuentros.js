import { useEffect, useState } from 'react';
import PartidoService from '../service/PartidoService.js';

const Encuentros = ({ torneoId }) => {
    const [partidos, setPartidos] = useState([]);
    const [fechaLigaSeleccionada, setFechaLigaSeleccionada] = useState(1);

    useEffect(() => {
        const fetchPartidos = async () => {
            try {
                const data = await PartidoService.getAll(torneoId);
                setPartidos(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPartidos();
    }, [torneoId]);

    const partidosFiltrados = fechaLigaSeleccionada ? partidos.filter(partido => partido.fechaLiga === parseInt(fechaLigaSeleccionada)) : partidos;

    return (
        <div className="bg-terciary py-16">
            <div className="container mx-auto flex items-center justify-center flex-col bg-terciary">
                <div className="w-[70%] rounded-xl shadow-lg text-sm text-primary bg-secundary">
                    <h2 className="px-6 py-2 text-base font-bold text-terciary ">Encuentros</h2>
                    <div className="w-[50%] mx-auto">
                        <select
                            id="fechaLiga"
                            className="bg-secundary p-2 w-full rounded-md text-primary outline-none border-2 border-secundaryDark"
                            value={fechaLigaSeleccionada}
                            onChange={e => setFechaLigaSeleccionada(e.target.value)}
                        >
                            <option value="">Todas las fechas</option>
                            {[...Array(7).keys()].map(num => (
                                <option key={num + 1} value={num + 1}>
                                    Fecha {num + 1}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        {partidosFiltrados.length > 0 ? (
                            partidosFiltrados.map(partido => (
                                <div key={partido._id} className="shadow-md p-2">
                                    <h2 className="px-6 py-2 text-base font-semibold">
                                        {partido.estado === 'finalizado' ? (
                                            <p className="text-center font-bold text-lg">
                                                {partido.equipoLocal.nombre} {partido.golesLocal} <span className="text-terciary">vs</span> {partido.golesVisitante} {partido.equipoVisitante.nombre}
                                            </p>
                                        ) : (
                                            <p className="text-center font-bold text-lg">
                                                {partido.equipoLocal.nombre} <span className="text-terciary">vs</span> {partido.equipoVisitante.nombre}
                                            </p>
                                        )}
                                    </h2>
                                    <div className="flex justify-around px-6 py-2">
                                        <p>{new Date(partido.fecha).toLocaleDateString()}</p>
                                        {partido.estado === 'finalizado' ? (
                                            <p className="text-terciary font-light capitalize">{partido.estado}</p>
                                        ) : (
                                            <p className="text-terciary font-light capitalize">{partido.estado}</p>
                                        )}
                                        <p className="text-terciary font-bold">{new Date(partido.fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center m-4">
                                <h2 className="text-terciary">No hay partidos disponibles</h2>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Encuentros;
