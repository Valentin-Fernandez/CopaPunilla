import { useState } from 'react';
import TorneoService from '../../../service/TorneoService.js';
import Modal from '../../../components/Modal.js';
import { toast } from 'react-toastify';
import Loading from '../../../components/Loading.js';

const FormNewTorneo = ({ isOpen, onClose, onSuccess }) => {
    const [nombreTorneo, setNombreTorneo] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        try {
            const torneo = {
                nombre: nombreTorneo,
                fechaInicio: fechaInicio,
                fechaFin: fechaFin,
            };
            await TorneoService.create(torneo);
            onSuccess();
            onClose();
            toast.success('Torneo creado correctamente', {
                position: 'bottom-right',
                autoClose: 2000,
                hideProgressBar: false,
                theme: 'dark',
            });
        } catch (error) {
            console.error('Error al crear el torneo', error);
            toast.error('Error al crear el torneo', {
                position: 'bottom-right',
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
            <h2 className="text-xl font-bold mb-4 text-primary text-center">Crear Torneo</h2>
            <div className="flex flex-col items-center justify-center">
                <h5 className="text-primary">Nombre del torneo</h5>
                <input
                    type="text"
                    className="placeholder-zinc-600 w-full p-2 my-2 rounded-md bg-secundaryDark outline-none text-primary"
                    value={nombreTorneo}
                    onChange={e => setNombreTorneo(e.target.value)}
                />
                <h5 className="text-primary">Fecha inicio</h5>
                <input
                    placeholder="Fecha de inicio"
                    type="date"
                    className="w-full p-2 my-2 rounded-md bg-secundaryDark outline-none "
                    value={fechaInicio}
                    onChange={e => setFechaInicio(e.target.value)}
                />
                <h5 className="text-primary">Fecha fin</h5>
                <input placeholder="Fecha de fin" type="date" className="w-full p-2 my-2 rounded-md bg-secundaryDark outline-none " value={fechaFin} onChange={e => setFechaFin(e.target.value)} />
            </div>
            <button className="bg-terciary text-white p-2 rounded-md w-full mt-2" onClick={handleSubmit} disabled={loading}>
                Guardar
            </button>
            {loading && <Loading />}
        </Modal>
    );
};

export default FormNewTorneo;
