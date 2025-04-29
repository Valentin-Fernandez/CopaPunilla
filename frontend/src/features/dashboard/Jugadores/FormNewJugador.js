import { useState } from 'react';
import JugadorService from '../../../service/JugadorService.js';
import Modal from '../../../components/Modal.js';

const FormNewJugador = ({ isOpen, torneoId, equipos, onClose }) => {
    const [newJugador, setNewJugador] = useState('');
    const [dni, setDni] = useState('');
    const [selectEquipo, setSelectEquipo] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const jugador = {
                nombre: newJugador,
                equipo: selectEquipo,
                torneo: torneoId,
                ...(dni && { dni: dni }),
            };
            await JugadorService.create(jugador);
            onClose();
        } catch (error) {
            console.error('Error al crear el jugador');
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-xl font-bold mb-4 text-primary text-center">Crear nuevo jugador</h2>

            <select className="border p-2 w-full my-4 border-terciary rounded-md outline-none bg-transparent text-zinc-500" value={selectEquipo} onChange={e => setSelectEquipo(e.target.value)}>
                <option value="" disabled>
                    Selecciona un equipo
                </option>
                {equipos?.map(equipo => (
                    <option key={equipo.id} value={equipo.id}>
                        {equipo.nombre}
                    </option>
                ))}
            </select>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre del jugador"
                    className="border p-2 w-full mb-4 border-terciary rounded-md outline-none bg-transparent placeholder:text-zinc-500"
                    value={newJugador}
                    onChange={e => setNewJugador(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="DNI del jugador"
                    className="border p-2 w-full mb-4 border-terciary rounded-md outline-none bg-transparent placeholder:text-zinc-500"
                    value={dni}
                    onChange={e => setDni(e.target.value)}
                />
                <button type="submit" className="bg-terciary text-white p-2 rounded-md w-full">
                    Guardar
                </button>
            </form>
        </Modal>
    );
};

export default FormNewJugador;
