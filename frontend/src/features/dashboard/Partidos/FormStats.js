import Modal from '../../../components/Modal.js';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PartidoService from '../../../service/PartidoService.js';

const FormStats = ({ onClose, jugador, onSave, isOpen }) => {
    // Estado local para manejar las estadísticas del jugador
    const [estadistica, setEstadistica] = useState(jugador);

    // Manejar cambios en los inputs
    const handleChange = (field, value) => {
        if (value === '') {
            setEstadistica(prev => ({ ...prev, [field]: '' }));
        } else {
            // Si no, convierte el valor a número
            setEstadistica(prev => ({ ...prev, [field]: parseInt(value) || 0 }));
        }
    };

    // Guardar las estadísticas y cerrar el modal
    const handleSave = () => {
        onSave(estadistica); // Llama a la función para guardar las estadísticas
        onClose(); // Cierra el modal
    };

    return (
        <Modal onClose={onClose} isOpen={isOpen}>
            <div className="p-6">
                <h2 className="text-lg font-bold mb-4">Estadísticas de {jugador.nombre}</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-primary">Goles</label>
                    <input
                        type="number"
                        value={estadistica.goles === 0 ? '' : estadistica.goles}
                        onChange={e => handleChange('goles', parseInt(e.target.value) || 0)}
                        className="bg-transparent p-2 w-full rounded-md border border-terciary outline-none"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-primary">Tarjetas Amarillas</label>
                    <input
                        type="number"
                        value={estadistica.amarilla === 0 ? '' : estadistica.amarilla}
                        onChange={e => handleChange('amarilla', parseInt(e.target.value) || 0)}
                        className="bg-transparent p-2 w-full rounded-md border border-terciary outline-none"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-primary">Tarjetas Rojas</label>
                    <input
                        type="number"
                        value={estadistica.roja === 0 ? '' : estadistica.roja}
                        onChange={e => handleChange('roja', parseInt(e.target.value) || 0)}
                        className="bg-transparent p-2 w-full rounded-md border border-terciary outline-none"
                    />
                </div>
                <div className="flex justify-center">
                    <button onClick={handleSave} className="bg-terciary text-primary px-4 py-2 rounded-md">
                        Guardar
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default FormStats;
