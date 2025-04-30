import { useState } from 'react';
import PartidoService from '../../../service/PartidoService.js';
import Modal from '../../../components/Modal.js';
import Loading from '../../../components/Loading.js';

const FormNewPartido = ({ isOpen, onClose, torneoId, equipos }) => {
    const [selectEquipoLocal, setSelectEquipoLocal] = useState('');
    const [selectEquipoVisitante, setSelectEquipoVisitante] = useState('');
    const [selectFechaLiga, setSelectFechaLiga] = useState('');
    const [selectFecha, setSelectFecha] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        try {
            const partido = {
                torneo: torneoId,
                equipoLocal: selectEquipoLocal,
                equipoVisitante: selectEquipoVisitante,
                fecha: selectFecha,
                fechaLiga: selectFechaLiga,
            };
            await PartidoService.create(partido);
            alert('Partido creado');
            onClose();
        } catch (error) {
            console.error('Error al crear el partido', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-xl font-bold mb-4 text-primary text-center">Crear partido</h2>
            {loading && <Loading message="Creando partido..." />}
            <select
                className="border p-2 w-full my-4 border-terciary rounded-md outline-none text-zinc-500 bg-transparent"
                value={selectEquipoLocal}
                onChange={e => setSelectEquipoLocal(e.target.value)}
            >
                <option value="" disabled>
                    Selecciona equipo Local
                </option>
                {equipos?.map(equipo => (
                    <option key={equipo.id} value={equipo.id}>
                        {equipo.nombre}
                    </option>
                ))}
            </select>
            <select
                className="border p-2 w-full my-4 border-terciary rounded-md outline-none text-zinc-500 bg-transparent"
                value={selectEquipoVisitante}
                onChange={e => setSelectEquipoVisitante(e.target.value)}
            >
                <option value="" disabled>
                    Selecciona equipo visitante
                </option>
                {equipos?.map(equipo => (
                    <option key={equipo.id} value={equipo.id}>
                        {equipo.nombre}
                    </option>
                ))}
            </select>
            <input
                type="datetime-local"
                className="border p-2 w-full my-4 border-terciary rounded-md outline-none text-zinc-500 bg-transparent"
                onChange={e => setSelectFecha(e.target.value)}
                value={selectFecha}
            />
            <select className="border p-2 w-full my-4 border-terciary rounded-md outline-none text-zinc-500 bg-transparent" onChange={e => setSelectFechaLiga(e.target.value)} value={selectFechaLiga}>
                <option value="" disabled>
                    Fecha liga
                </option>
                {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                    <option key={num} value={num}>
                        {num}
                    </option>
                ))}
            </select>
            <button className="bg-terciary text-white p-2 rounded-md w-full" onClick={handleSubmit} disabled={loading}>
                Guardar
            </button>
        </Modal>
    );
};

export default FormNewPartido;
