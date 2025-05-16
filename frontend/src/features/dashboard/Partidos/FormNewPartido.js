import { useState } from 'react';
import PartidoService from '../../../service/PartidoService.js';
import Modal from '../../../components/Modal.js';
import Loading from '../../../components/Loading.js';
import { toast } from 'react-toastify';

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

            onClose();
            toast.success('Partido creado correctamente', {
                position: 'bottom-left',
                autoClose: 2000,
                hideProgressBar: false,
                theme: 'dark',
            });
        } catch (error) {
            console.error('Error al crear el partido', error);
            toast.error('Error al crear el partido', {
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
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-xl font-bold mb-4 text-primary text-center">Crear partido</h2>
            <h5 className="text-primary text-center">Equipo Local</h5>
            <select className="border p-2 w-full my-4 border-terciary rounded-md outline-none text-primary bg-secundary" value={selectEquipoLocal} onChange={e => setSelectEquipoLocal(e.target.value)}>
                <option value="" disabled>
                    Selecciona equipo local
                </option>
                {equipos?.map(equipo => (
                    <option key={equipo.id} value={equipo.id}>
                        {equipo.nombre}
                    </option>
                ))}
            </select>
            <h5 className="text-primary text-center">Equipo Visitante</h5>
            <select
                className="border p-2 w-full my-4 border-terciary rounded-md outline-none text-primary bg-secundary"
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
            <h5 className="text-primary text-center">Fecha partido</h5>
            <input
                type="datetime-local"
                className="border p-2 w-full my-4 border-terciary rounded-md outline-none text-primary bg-secundary"
                onChange={e => setSelectFecha(e.target.value)}
                value={selectFecha}
            />
            <h5 className="text-primary text-center">Fecha liga</h5>
            <select className="border p-2 w-full my-4 border-terciary rounded-md outline-none text-primary bg-secundary" onChange={e => setSelectFechaLiga(e.target.value)} value={selectFechaLiga}>
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
            {loading && <Loading />}
        </Modal>
    );
};

export default FormNewPartido;
