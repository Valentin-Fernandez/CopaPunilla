import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import PartidoService from '../../../service/PartidoService.js';
import EquipoService from '../../../service/EquipoService.js';
import FormStats from './FormStats.js';
import Loading from '../../../components/Loading.js';
import Button from '../../../components/Button.js';
import { toast } from 'react-toastify';

const ResultadoDetails = () => {
    const { id } = useParams();
    const [partido, setPartido] = useState(null);
    const [equipoLocal, setEquipoLocal] = useState(null);
    const [equipoVisitante, setEquipoVisitante] = useState(null);
    const [estadisticas, setEstadisticas] = useState([]);
    const [modalOpen, setModalOpen] = useState(false); // Estado para controlar el Modal
    const [jugadorSeleccionado, setJugadorSeleccionado] = useState(null); // Jugador seleccionado
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const fase = queryParams.get('fase') || 'liga'; // Obtener el parámetro de fase

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
        setLoading(true);
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
            await PartidoService.finalizar(id, resultado, fase);
            toast.success('Partido realizado correctamente', {
                position: 'bottom-left',
                autoClose: 2000,
                hideProgressBar: false,
                theme: 'dark',
            });
            // Redirigir a torneoDetails
            navigate(`/dashboard/torneo/${partido.torneo}`);
        } catch (error) {
            console.error('Error al enviar el resultado:', error);
            toast.error('Error al enviar el partido', {
                position: 'bottom-left',
                autoClose: 2000,
                hideProgressBar: false,
                theme: 'dark',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4 text-secundary flex justify-center items-center flex-col md:my-10">
            <div className="flex gap-8 md:my-10 my-6 flex-col md:flex-row">
                {/* Información del partido */}
                {partido && (
                    <div className="flex flex-col items-center justify-center bg-primary rounded-md shadow-md p-10">
                        <h1 className="text-xl font-bold mb-4">Detalles del partido</h1>
                        <p className="text-lg font-semibold">
                            {equipoLocal?.nombre || 'Equipo Local'} <span className="text-terciary">vs</span> {equipoVisitante?.nombre || 'Equipo Visitante'}
                        </p>
                        <p className="text-sm">
                            Fecha: {new Date(partido.fecha).toLocaleDateString()} - Hora: {new Date(partido.fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                    </div>
                )}

                {/* Campos para goles */}
                <div className="flex flex-col items-center justify-center bg-primary rounded-md shadow-md p-4">
                    <h2 className="text-xl font-semibold mb-2 text-center">Goles del Partido</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-center space-x-4">
                            <label className="">{equipoLocal?.nombre}</label>
                            <input
                                type="number"
                                onChange={e => setPartido({ ...partido, golesLocal: parseInt(e.target.value) || 0 })}
                                className="w-[15%] p-1 outline-none text-terciary font-bold text-center rounded-md shadow-md bg-primary"
                            />
                        </div>
                        <div className="flex items-center justify-center space-x-4">
                            <label className="">{equipoVisitante?.nombre}</label>
                            <input
                                type="number"
                                onChange={e => setPartido({ ...partido, golesVisitante: parseInt(e.target.value) || 0 })}
                                className="w-[15%] p-1 outline-none text-terciary font-bold text-center rounded-md shadow-md bg-primary"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Select para jugadores */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2 text-center">Estadisticas de jugadores</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-base font-medium mb-1 text-center">{equipoLocal?.nombre}</label>
                        <select onChange={e => abrirModal(e.target.value, 'local')} className="bg-primary p-2 w-full rounded-md shadow-md text-secundary ">
                            <option value="">Seleccionar jugador</option>
                            {equipoLocal?.jugadores?.map(jugador => (
                                <option key={jugador._id} value={jugador._id}>
                                    {jugador.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-base font-medium mb-1 text-center">{equipoVisitante?.nombre}</label>
                        <select onChange={e => abrirModal(e.target.value, 'visitante')} className="bg-primary p-2 w-full rounded-md shadow-md text-secundary ">
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
                {estadisticas.length > 0 ? (
                    <div className="rounded-md shadow-md">
                        <table className="min-w-full bg-primary text-secundary overflow-x-auto">
                            <thead>
                                <tr>
                                    <th className="px-2 py-4 text-center font-semibold">Jugador</th>
                                    <th className="px-2 py-4 text-center font-semibold">Goles</th>
                                    <th className="px-2 py-4 text-center font-semibold">Amarilla</th>
                                    <th className="px-2 py-4 text-center font-semibold">Roja</th>
                                    <th className="px-2 py-4 text-center font-semibold">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {estadisticas.map((estadistica, index) => (
                                    <tr key={index} className="border-b border-gray-200 bg-gray-50 odd:bg-primary">
                                        <td className="px-2 py-4 text-center">{estadistica.nombre}</td>
                                        <td className="px-2 py-4 text-center">{estadistica.goles}</td>
                                        <td className="px-2 py-4 text-center">{estadistica.amarilla}</td>
                                        <td className="px-2 py-4 text-center">{estadistica.roja}</td>
                                        <td className="px-2 py-4 text-center">
                                            <button onClick={() => eliminarEstadistica(index)} className="text-red-500">
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-500">No se han cargado estadísticas aún.</p>
                )}
                <div className="my-6">
                    <Button onClick={enviarResultado} label={'Enviar'} textColor={'text-primary'} color={'bg-terciary'} full={'w-full'} disabled={loading} />
                </div>
            </div>

            {/* Modal */}
            {modalOpen && <FormStats jugador={jugadorSeleccionado} onClose={() => setModalOpen(false)} isOpen={() => setModalOpen(true)} onSave={guardarEstadisticas} />}
            {loading && <Loading />}
        </div>
    );
};

export default ResultadoDetails;
