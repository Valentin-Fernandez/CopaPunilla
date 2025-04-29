import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PartidoService from '../../../service/PartidoService.js';
import EquipoService from '../../../service/EquipoService.js';
import FormStats from './FormStats.js';

const ResultadoDetails = () => {
    const { id } = useParams();
    const [partido, setPartido] = useState(null);
    const [equipoLocal, setEquipoLocal] = useState(null);
    const [equipoVisitante, setEquipoVisitante] = useState(null);
    const [estadisticas, setEstadisticas] = useState([]);
    const [modalOpen, setModalOpen] = useState(false); // Estado para controlar el Modal
    const [jugadorSeleccionado, setJugadorSeleccionado] = useState(null); // Jugador seleccionado

    const fetchPartido = async () => {
        try {
            const response = await PartidoService.getById(id);
            setPartido(response);
        } catch (error) {
            console.error('Error al obtener los detalles del partido:', error);
        }
    };

    const fetchEquipos = async () => {
        try {
            const equipoLocalFetched = await EquipoService.getById(partido.equipoLocal);
            const equipoVisitanteFetched = await EquipoService.getById(partido.equipoVisitante);
            setEquipoLocal({
                _id: equipoLocalFetched._id,
                nombre: equipoLocalFetched.nombre,
                jugadores: equipoLocalFetched.jugadores,
            });
            setEquipoVisitante({
                _id: equipoVisitanteFetched._id,
                nombre: equipoVisitanteFetched.nombre,
                jugadores: equipoVisitanteFetched.jugadores,
            });
        } catch (error) {
            console.error('Error al obtener los equipos:', error);
        }
    };

    useEffect(() => {
        fetchPartido();
    }, [id]);

    useEffect(() => {
        if (partido) {
            fetchEquipos();
        }
    }, [partido]);

    const eliminarEstadistica = index => {
        setEstadisticas(prev => prev.filter((_, i) => i !== index));
    };

    // Abrir el Modal al seleccionar un jugador
    const abrirModal = (jugadorId, equipo) => {
        const jugador = equipo === 'local' ? equipoLocal.jugadores.find(j => j._id === jugadorId) : equipoVisitante.jugadores.find(j => j._id === jugadorId);

        if (jugador) {
            setJugadorSeleccionado({ jugadorId: jugador._id, nombre: jugador.nombre, equipo, goles: 0, amarilla: 0, roja: 0 });
            setModalOpen(true);
        }
    };

    // Guardar las estadísticas del jugador
    const guardarEstadisticas = estadistica => {
        setEstadisticas(prev => {
            const existe = prev.find(e => e.jugadorId === estadistica.jugadorId);
            if (existe) {
                return prev.map(e => (e.jugadorId === estadistica.jugadorId ? estadistica : e));
            } else {
                return [...prev, estadistica];
            }
        });
        setModalOpen(false); // Cerrar el Modal
    };

    const enviarResultado = async () => {
        try {
            const resultado = {
                golesLocal: partido.golesLocal,
                golesVisitante: partido.golesVisitante,
                estadisticas: estadisticas.map(({ jugadorId, goles, amarilla, roja }) => ({
                    jugador: jugadorId,
                    goles,
                    amarilla,
                    roja,
                })),
            };
            await PartidoService.finalizar(id, resultado);
            alert('Resultado enviado con éxito');
        } catch (error) {
            console.error('Error al enviar el resultado:', error);
        }
    };

    return (
        <div className="container mx-auto p-4 text-primary flex justify-center items-center flex-col">
            <h1 className="text-xl font-bold mb-4">Detalles del Resultado</h1>

            {/* Información del partido */}
            {partido && (
                <div className="mb-6 text-center">
                    <p className="text-lg font-semibold">
                        {equipoLocal?.nombre || 'Equipo Local'} vs {equipoVisitante?.nombre || 'Equipo Visitante'}
                    </p>
                    <p className="text-sm">
                        Fecha: {new Date(partido.fecha).toLocaleDateString()} - Hora: {new Date(partido.fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                </div>
            )}

            {/* Campos para goles */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2 text-center">Goles del Partido</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Goles Equipo Local</label>
                        <input
                            type="number"
                            onChange={e => setPartido({ ...partido, golesLocal: parseInt(e.target.value) || 0 })}
                            className="bg-transparent p-2 w-full rounded-md border border-terciary outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Goles Equipo Visitante</label>
                        <input
                            type="number"
                            onChange={e => setPartido({ ...partido, golesVisitante: parseInt(e.target.value) || 0 })}
                            className="bg-transparent p-2 w-full rounded-md border border-terciary outline-none"
                        />
                    </div>
                </div>
            </div>

            {/* Select para jugadores */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Cargar Estadísticas a Jugadores</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Equipo Local</label>
                        <select onChange={e => abrirModal(e.target.value, 'local')} className="bg-secundary p-2 w-full rounded-md border border-terciary text-primary">
                            <option value="">Seleccionar jugador</option>
                            {equipoLocal?.jugadores?.map(jugador => (
                                <option key={jugador._id} value={jugador._id}>
                                    {jugador.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Equipo Visitante</label>
                        <select onChange={e => abrirModal(e.target.value, 'visitante')} className="bg-secundary p-2 w-full rounded-md border border-terciary text-primary">
                            <option value="">Seleccionar jugador</option>
                            {equipoVisitante?.jugadores?.map(jugador => (
                                <option key={jugador._id} value={jugador._id}>
                                    {jugador.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Mostrar estadísticas cargadas */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2 text-center">Estadísticas Cargadas</h2>
                {estadisticas.length > 0 ? (
                    estadisticas.map((estadistica, index) => (
                        <div key={index} className="flex justify-between items-center p-2 rounded-md mb-2 bg-secundaryDark">
                            {/* Nombre y equipo */}
                            <div className="w-1/3 text-center">
                                <p className="font-medium">{estadistica.nombre}</p>
                                <p className="text-sm text-gray-500">{estadistica.equipo === 'local' ? 'Equipo Local' : 'Equipo Visitante'}</p>
                            </div>

                            {/* Estadísticas */}
                            <div className="w-1/3 text-center">
                                <p>{`Goles: ${estadistica.goles}`}</p>
                                <p>{`Amarillas: ${estadistica.amarilla}`}</p>
                                <p>{`Rojas: ${estadistica.roja}`}</p>
                            </div>

                            {/* Botón eliminar */}
                            <div className="w-1/3 text-center">
                                <button onClick={() => eliminarEstadistica(index)} className="bg-terciary text-white p-2 rounded-md">
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No se han cargado estadísticas aún.</p>
                )}
            </div>

            <button onClick={enviarResultado} className="bg-terciary rounded-md p-2">
                Enviar resultado
            </button>

            {/* Modal */}
            {modalOpen && <FormStats jugador={jugadorSeleccionado} onClose={() => setModalOpen(false)} isOpen={() => setModalOpen(true)} onSave={guardarEstadisticas} />}
        </div>
    );
};

export default ResultadoDetails;
