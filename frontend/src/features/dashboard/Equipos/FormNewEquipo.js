import { useState } from 'react';
import EquipoService from '../../../service/EquipoService.js';
import Modal from '../../../components/Modal.js';

const FormNewEquipo = ({ isOpen, onClose, torneoId, onSuccess }) => {
    const [newEquipo, setNewEquipo] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const equipo = {
                nombre: newEquipo,
                torneo: torneoId,
            };
            await EquipoService.create(equipo);
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Error al crear el equipo', error);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-xl font-bold mb-4 text-primary">Crear Nuevo Equipo</h2>

            {/* Formulario */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre del equipo"
                    className="border p-2 w-full mb-4 border-terciary rounded-md outline-none bg-transparent text-primary placeholder:text-zinc-500"
                    value={newEquipo}
                    onChange={e => setNewEquipo(e.target.value)}
                />
                <button type="submit" className="bg-terciary text-white p-2 rounded-md w-full">
                    Guardar
                </button>
            </form>
        </Modal>
    );
};

export default FormNewEquipo;
