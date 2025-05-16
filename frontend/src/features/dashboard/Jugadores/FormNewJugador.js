import { useState } from 'react';
import JugadorService from '../../../service/JugadorService.js';
import Modal from '../../../components/Modal.js';
import Loading from '../../../components/Loading.js';
import { toast } from 'react-toastify';

const FormNewJugador = ({ isOpen, torneoId, equipos, onClose }) => {
    const [newJugador, setNewJugador] = useState('');
    const [dni, setDni] = useState('');
    const [selectEquipo, setSelectEquipo] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        try {
            const jugador = {
                nombre: newJugador,
                equipo: selectEquipo,
                torneo: torneoId,
                ...(dni && { dni: dni }),
            };
            await JugadorService.create(jugador);
            onClose();
            toast.success('Jugador creado correctamente', {
                position: 'bottom-left',
                autoClose: 2000,
                hideProgressBar: false,
                theme: 'dark',
            });
        } catch (error) {
            console.error('Error al crear el jugador');
            toast.error('Error al crear el jugador', {
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
            <h2 className="text-xl font-bold mb-4 text-primary text-center">Crear nuevo jugador</h2>
            <h5 className="text-primary text-center">Equipo</h5>
            <select className="border p-2 w-full my-4 border-terciary rounded-md outline-none bg-secundary text-primary" value={selectEquipo} onChange={e => setSelectEquipo(e.target.value)}>
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
                <h5 className="text-primary text-center mb-3">Nombre</h5>
                <input
                    type="text"
                    placeholder="Nombre del jugador"
                    className="border p-2 w-full mb-4 border-terciary rounded-md outline-none bg-transparent text-primary placeholder:text-zinc-500"
                    value={newJugador}
                    onChange={e => setNewJugador(e.target.value)}
                />
                <h5 className="text-primary text-center mb-3">DNI</h5>
                <input
                    type="text"
                    placeholder="DNI del jugador"
                    className="border p-2 w-full mb-4 border-terciary rounded-md outline-none bg-transparent text-primary placeholder:text-zinc-500"
                    value={dni}
                    onChange={e => setDni(e.target.value)}
                />
                <button type="submit" className="bg-terciary text-white p-2 rounded-md w-full" disabled={loading}>
                    Guardar
                </button>
            </form>
            {loading && <Loading />}
        </Modal>
    );
};

export default FormNewJugador;
