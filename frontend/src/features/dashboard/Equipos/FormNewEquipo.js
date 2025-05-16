import { useState } from 'react';
import EquipoService from '../../../service/EquipoService.js';
import Modal from '../../../components/Modal.js';
import Loading from '../../../components/Loading.js';
import { toast } from 'react-toastify';

const FormNewEquipo = ({ isOpen, onClose, torneoId, onSuccess }) => {
    const [newEquipo, setNewEquipo] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        try {
            const equipo = {
                nombre: newEquipo,
                torneo: torneoId,
            };
            await EquipoService.create(equipo);
            onSuccess();
            onClose();
            toast.success('Equipo creado correctamente', {
                position: 'bottom-left',
                autoClose: 2000,
                hideProgressBar: false,
                theme: 'dark',
            });
        } catch (error) {
            console.error('Error al crear el equipo', error);
            toast.error('Error al crear el equipo', {
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
                <button type="submit" className="bg-terciary text-white p-2 rounded-md w-full" disabled={loading}>
                    Guardar
                </button>
            </form>
            {loading && <Loading />}
        </Modal>
    );
};

export default FormNewEquipo;
