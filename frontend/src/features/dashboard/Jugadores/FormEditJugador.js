import { useState } from 'react';
import Modal from '../../../components/Modal';
import JugadorService from '../../../service/JugadorService.js';
import { useParams } from 'react-router-dom';

const FormEditJugador = ({ isOpen, onClose, jugador, onSuccess }) => {
    const [nombre, setNombre] = useState(null);
    const [dni, setDni] = useState(null);
    const [goles, setGoles] = useState(null);
    const [tarjetasAmarillas, setTarjetasAmarillas] = useState(null);
    const [tarjetasRojas, setTarjetasRojas] = useState(null);
    const { equipoId } = useParams();

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const jugadorEdit = {
                ...(nombre && { nombre }), // Si el nombre fue modificado, inclúyelo
                ...(dni && { dni }), // Si el DNI fue modificado, inclúyelo
                estadisticas: {
                    goles: goles !== null ? goles : jugador.estadisticas.goles, // Mantén el valor original si no se modifica
                    tarjetasAmarillas: tarjetasAmarillas !== null ? tarjetasAmarillas : jugador.estadisticas.tarjetasAmarillas,
                    tarjetasRojas: tarjetasRojas !== null ? tarjetasRojas : jugador.estadisticas.tarjetasRojas,
                },
            };
            await JugadorService.update(jugadorEdit, jugador._id);
            alert('Jugador editado correctamente');
            onClose();
            onSuccess(equipoId);
        } catch (error) {
            console.error('Error al editar el jugador:', error);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-xl font-bold mb-4 text-primary text-center">Editar Jugador</h2>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <input
                    type="text"
                    className="border p-2  my-4 border-terciary rounded-md outline-none text-primary bg-transparent"
                    placeholder={`Nombre ${jugador.nombre}`}
                    onChange={e => setNombre(e.target.value)}
                />
                <input
                    type="number"
                    value={jugador.dni}
                    className="border p-2  my-4 border-terciary rounded-md outline-none text-primary bg-transparent"
                    placeholder={`DNI: ${jugador.dni}`}
                    onChange={e => setDni(e.target.value)}
                />
                <input
                    type="number"
                    className="border p-2  my-4 border-terciary rounded-md outline-none text-primary bg-transparent"
                    placeholder={`Goles ${jugador.estadisticas.goles}`}
                    onChange={e => setGoles(e.target.value)}
                />
                <input
                    type="number"
                    className="border p-2  my-4 border-terciary rounded-md outline-none text-primary bg-transparent"
                    placeholder={`Amarillas ${jugador.estadisticas.tarjetasAmarillas}`}
                    onChange={e => setTarjetasAmarillas(e.target.value)}
                />
                <input
                    type="number"
                    className="border p-2  my-4 border-terciary rounded-md outline-none text-primary bg-transparent"
                    placeholder={`Rojas ${jugador.estadisticas.tarjetasRojas}`}
                    onChange={e => setTarjetasRojas(e.target.value)}
                />
                <button type="submit" className="bg-terciary text-white p-2 rounded-md w-full">
                    Guardar
                </button>
            </form>
        </Modal>
    );
};

export default FormEditJugador;
