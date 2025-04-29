import { useState } from 'react';
import Modal from '../../../components/Modal.js';
import EquipoService from '../../../service/EquipoService.js';
import { useParams } from 'react-router-dom';

const FormEditEquipo = ({ isOpen, onClose, equipo, onSuccess }) => {
    const [nombre, setNombre] = useState(null);
    const [puntos, setPuntos] = useState(null);
    const [partidosJugados, setPartidosJugados] = useState(null);
    const [partidosGanados, setPartidosGanados] = useState(null);
    const [partidosPerdidos, setPartidosPerdidos] = useState(null);
    const [partidosEmpatados, setPartidosEmpatados] = useState(null);
    const [golesFavor, setGolesFavor] = useState(null);
    const [golesContra, setGolesContra] = useState(null);
    const [diferenciaGoles, setDiferenciaGoles] = useState(null);
    const { equipoId } = useParams();

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const equipoEditado = {
                ...(nombre && { nombre }),
                estadisticas: {
                    puntos: puntos !== null ? puntos : equipo.estadisticas.puntos,
                    partidosJugados: partidosJugados !== null ? partidosJugados : equipo.estadisticas.partidosJugados,
                    partidosGanados: partidosGanados !== null ? partidosGanados : equipo.estadisticas.partidosGanados,
                    partidosPerdidos: partidosPerdidos !== null ? partidosPerdidos : equipo.estadisticas.partidosPerdidos,
                    partidosEmpatados: partidosEmpatados !== null ? partidosEmpatados : equipo.estadisticas.partidosEmpatados,
                    golesFavor: golesFavor !== null ? golesFavor : equipo.estadisticas.golesFavor,
                    golesContra: golesContra !== null ? golesContra : equipo.estadisticas.golesContra,
                    diferenciaGoles: diferenciaGoles !== null ? diferenciaGoles : equipo.estadisticas.diferenciaGoles,
                },
            };
            await EquipoService.update(equipo._id, equipoEditado);
            alert('Equipo editado correctamente');
            onSuccess(equipoId);
            onClose();
        } catch (error) {
            console.error('Error al editar el equipo:', error);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="flex flex-col justify-center items-center h-full">
                <h2 className="text-xl text-primary mb-4">Editar Equipo</h2>
                <form className="w-full max-w-md" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder={`Equipo: ${equipo.nombre}`}
                        className="border p-2 w-full mb-4 border-terciary rounded-md outline-none bg-transparent text-primary placeholder:text-zinc-500"
                        onChange={e => setNombre(e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder={`Puntos: ${equipo.estadisticas.puntos}`}
                        className="border p-2 w-full mb-4 border-terciary rounded-md outline-none bg-transparent text-primary placeholder:text-zinc-500"
                        value={puntos}
                        onChange={e => setPuntos(e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder={`Partidos Jugados: ${equipo.estadisticas.partidosJugados}`}
                        className="border p-2 w-full mb-4 border-terciary rounded-md outline-none bg-transparent text-primary placeholder:text-zinc-500"
                        value={partidosJugados}
                        onChange={e => setPartidosJugados(e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder={`Partidos Ganados: ${equipo.estadisticas.partidosGanados}`}
                        className="border p-2 w-full mb-4 border-terciary rounded-md outline-none bg-transparent text-primary placeholder:text-zinc-500"
                        value={partidosGanados}
                        onChange={e => setPartidosGanados(e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder={`Partidos Perdidos: ${equipo.estadisticas.partidosPerdidos}`}
                        className="border p-2 w-full mb-4 border-terciary rounded-md outline-none bg-transparent text-primary placeholder:text-zinc-500"
                        value={partidosPerdidos}
                        onChange={e => setPartidosPerdidos(e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder={`Partidos Empatados: ${equipo.estadisticas.partidosEmpatados}`}
                        className="border p-2 w-full mb-4 border-terciary rounded-md outline-none bg-transparent text-primary placeholder:text-zinc-500"
                        value={partidosEmpatados}
                        onChange={e => setPartidosEmpatados(e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder={`Goles a Favor: ${equipo.estadisticas.golesFavor}`}
                        className="border p-2 w-full mb-4 border-terciary rounded-md outline-none bg-transparent text-primary placeholder:text-zinc-500"
                        value={golesFavor}
                        onChange={e => setGolesFavor(e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder={`Goles en Contra: ${equipo.estadisticas.golesContra}`}
                        className="border p-2 w-full mb-4 border-terciary rounded-md outline-none bg-transparent text-primary placeholder:text-zinc-500"
                        value={golesContra}
                        onChange={e => setGolesContra(e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder={`Diferencia de Goles: ${equipo.estadisticas.diferenciaGoles}`}
                        className="border p-2 w-full mb-4 border-terciary rounded-md outline-none bg-transparent text-primary placeholder:text-zinc-500"
                        value={diferenciaGoles}
                        onChange={e => setDiferenciaGoles(e.target.value)}
                    />

                    {/* Agrega más campos según sea necesario */}
                    <button type="submit" className="bg-terciary text-white p-2 rounded-md w-full">
                        Guardar
                    </button>
                </form>
            </div>
        </Modal>
    );
};

export default FormEditEquipo;
