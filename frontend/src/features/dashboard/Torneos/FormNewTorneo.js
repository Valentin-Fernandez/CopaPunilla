import { useState } from 'react';
import TorneoService from '../../../service/TorneoService.js';
import Modal from '../../../components/Modal.js';

const FormNewTorneo = ({ isOpen, onClose, onSuccess }) => {
    const [nombreTorneo, setNombreTorneo] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const torneo = {
                nombre: nombreTorneo,
                fechaInicio: fechaInicio,
                fechaFin: fechaFin,
            };
            await TorneoService.create(torneo);
            alert('Torneo creado');
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Error al crear el torneo', error);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-xl font-bold mb-4 text-primary text-center">Crear Torneo</h2>
            <div className="flex flex-col items-center justify-center">
                <h5 className="text-primary">Nombre del torneo</h5>
                <input
                    placeholder="Abril 2025"
                    type="text"
                    className="placeholder-zinc-600 w-full p-2 my-2 rounded-md bg-secundaryDark outline-none text-primary"
                    value={nombreTorneo}
                    onChange={e => setNombreTorneo(e.target.value)}
                />
                <h5 className="text-primary">Fecha inicio</h5>
                <input
                    placeholder="Fecha de inicio"
                    type="date"
                    className="text-zinc-600 w-full p-2 my-2 rounded-md bg-secundaryDark outline-none "
                    value={fechaInicio}
                    onChange={e => setFechaInicio(e.target.value)}
                />
                <h5 className="text-primary">Fecha fin</h5>
                <input
                    placeholder="Fecha de fin"
                    type="date"
                    className="text-zinc-600 w-full p-2 my-2 rounded-md bg-secundaryDark outline-none "
                    value={fechaFin}
                    onChange={e => setFechaFin(e.target.value)}
                />
            </div>
            <button className="bg-terciary text-white p-2 rounded-md w-full mt-2" onClick={handleSubmit}>
                Guardar
            </button>
        </Modal>
    );
};

export default FormNewTorneo;
