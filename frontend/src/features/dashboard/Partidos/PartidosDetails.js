import PartidoService from '../../../service/PartidoService.js';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../components/Button.js';

const PartidosDetails = () => {
    const { id } = useParams();
    const [partidos, setPartidos] = useState([]);
    const [fechaLigaSeleccionada, setFechaLigaSeleccionada] = useState(1);
    const navigate = useNavigate();

    const handleResultadoClick = resultadoId => {
        navigate(`/dashboard/resultado/${resultadoId}`);
    };

    const fetchPartidos = async () => {
        try {
            const response = await PartidoService.getAll(id);
            setPartidos(response);
        } catch (error) {
            console.error('Error fetching partidos:', error);
        }
    };

    useEffect(() => {
        fetchPartidos();
    }, []);

    const partidosFiltrados = fechaLigaSeleccionada ? partidos.filter(partido => partido.fechaLiga === parseInt(fechaLigaSeleccionada)) : partidos;

    return (
        <>
            <div className="my-4">
                <div className="flex items-center justify-center">
                    <select
                        id="fechaLiga"
                        className="bg-secundary px-4 py-2 rounded-md text-primary outline-none border-2 border-secundaryDark"
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
            </div>

            {partidosFiltrados.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 gap-2 md:w-[60%] md:mx-auto">
                    {partidosFiltrados.map(partido => (
                        <div className="bg-secundary rounded-md my-4 text-primary p-6 flex flex-col justify-center items-center">
                            <div className="flex justify-center items-center font-bold text-xl">
                                {partido.estado === 'finalizado' ? (
                                    <p>
                                        {partido.equipoLocal.nombre} <span className="text-terciary">{partido.golesLocal}</span> vs <span className="text-terciary">{partido.golesVisitante}</span>{' '}
                                        {partido.equipoVisitante.nombre}
                                    </p>
                                ) : (
                                    <p>
                                        {partido.equipoLocal.nombre} <span className="text-terciary">vs</span> {partido.equipoVisitante.nombre}
                                    </p>
                                )}
                            </div>
                            <p className="text-center text-base">Fecha: {new Date(partido.fecha).toLocaleDateString()}</p>
                            <p className="text-center text-base">Hora: {new Date(partido.fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                            {partido.estado === 'pendiente' ? (
                                <div className="flex items-center justify-center mt-2">
                                    <Button onClick={() => handleResultadoClick(partido._id)} color={'bg-secundaryDark'} textColor={'text-primary'} label={'Resultado'} />
                                </div>
                            ) : (
                                <p className="text-sm text-terciary">Finalizado</p>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center mt-4">
                    <h2>No hay partidos disponibles</h2>
                </div>
            )}
        </>
    );
};

export default PartidosDetails;
