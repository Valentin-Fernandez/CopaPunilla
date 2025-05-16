import { useState } from 'react';
import FormEditJugador from './FormEditJugador.js';
import ConfirmModal from '../../../components/ConfirmModal.js';
import JugadorService from '../../../service/JugadorService.js';

const TableStatsJugadores = ({ jugadores, onSuccess }) => {
    const [selectJugador, setSelectJugador] = useState(null);
    const [formEditJugador, setFormEditJugador] = useState(false);
    const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

    const openFormEditJugador = () => setFormEditJugador(true);
    const closeFormEditJugador = () => setFormEditJugador(false);

    const openConfirmDeleteModal = () => setOpenConfirmDelete(true);
    const closeConfirmDeleteModal = () => setOpenConfirmDelete(false);

    const handleEditClick = jugador => {
        setSelectJugador(jugador);
        openFormEditJugador();
    };

    const handleDeleteClick = id => {
        setSelectJugador(id);
        openConfirmDeleteModal();
    };

    const deleteJugador = async id => {
        try {
            await JugadorService.delete(id);
            onSuccess();
        } catch (error) {
            console.error('Error deleting jugador:', error);

            closeConfirmDeleteModal();
        }
    };

    return (
        <div className="overflow-x-auto bg-primary rounded-md shadow-md">
            <table className="w-full">
                <thead>
                    <tr className=" text-secundary text-sm font-bold uppercase">
                        <th className="p-2 text-center">Nombre</th>
                        <th className="p-2 text-center">Goles</th>
                        <th className="p-2 text-center">Amarillas</th>
                        <th className="p-2 text-center">Rojas</th>
                        <th className="p-2 text-center">Activo</th>
                        <th className="p-2 text-center">Acciones</th>
                    </tr>
                    {jugadores.map(jugador => (
                        <tr key={jugador._id} className=" text-secundary text-sm bg-gray-50 odd:bg-primary">
                            <td className="p-2 text-center">{jugador.nombre}</td>
                            <td className="p-2 text-center">{jugador.estadisticas.goles}</td>
                            <td className="p-2 text-center">{jugador.estadisticas.tarjetasAmarillas}</td>
                            <td className="p-2 text-center">{jugador.estadisticas.tarjetasRojas}</td>
                            <td className="p-2 text-center">{jugador.activo ? 'Si' : 'No'}</td>
                            <td className="p-2 text-center space-x-2 flex justify-center">
                                <button className="bg-secundaryDark rounded-md text-primary text-sm p-2" onClick={() => handleEditClick(jugador)}>
                                    Editar
                                </button>
                                <button className="bg-secundaryDark rounded-md text-primary text-sm p-2" onClick={() => handleDeleteClick(jugador._id)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </thead>
            </table>
            {formEditJugador && <FormEditJugador isOpen={openFormEditJugador} onClose={closeFormEditJugador} jugador={selectJugador} onSuccess={onSuccess} />}
            {openConfirmDelete && (
                <ConfirmModal
                    isOpen={openConfirmDelete}
                    onClose={closeConfirmDeleteModal}
                    onConfirm={() => deleteJugador(selectJugador)}
                    onSuccess={onSuccess}
                    message={'Estas seguro que quieres eliminar a un Jugador?'}
                />
            )}
        </div>
    );
};

export default TableStatsJugadores;
