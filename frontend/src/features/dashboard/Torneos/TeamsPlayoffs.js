import { useState } from 'react';
import Button from '../../../components/Button.js';
import { MdDelete } from 'react-icons/md';
import TorneoService from '../../../service/TorneoService.js';
import { useParams } from 'react-router-dom';
import ConfirmModal from '../../../components/ConfirmModal.js';
import { toast } from 'react-toastify';

const TeamsPlayoffs = ({ teams, fetchPlayoffs }) => {
    const { id } = useParams();
    const [teamSelected, setTeamSelected] = useState(null);
    const [confirmModal, setConfirmModal] = useState(false);

    const handleClick = id => {
        setTeamSelected(id);
        setConfirmModal(true);
    };

    const handleConfirm = async () => {
        try {
            await TorneoService.deleteEquipoPlayoffs(id, teamSelected);
            setTeamSelected(null);
            setConfirmModal(false);
            fetchPlayoffs(id);
            toast.success('Equipo eliminado correctamente', {
                position: 'bottom-left',
                autoClose: 2000,
                hideProgressBar: false,
                theme: 'dark',
            });
        } catch (error) {
            console.error('Error al eliminar el equipo de playoffs', error);
            toast.error('Error al eliminar el equipo de playoffs', {
                position: 'bottom-left',
                autoClose: 2000,
                hideProgressBar: false,
                theme: 'dark',
            });
        }
    };

    const handleCloseModal = () => {
        setTeamSelected(null);
        setConfirmModal(false);
    };

    return (
        <div className="">
            <h2 className="text-2xl font-bold mb-4 text-primary text-center">Equipos clasificados a Playoffs</h2>
            {teams && (
                <div>
                    {teams.length > 0 && (
                        <div className="">
                            {teams.map(equipos => (
                                <div className="bg-secundaryDark m-4 flex p-3 rounded-md text-primary space-x-2 items-center justify-between">
                                    <div className="flex space-x-2 items-center">
                                        <p className="font-bold text-xl text-terciary">{equipos.posicion}</p>
                                        <h3 className="font-semibold text-lg">{equipos.equipo.nombre}</h3>
                                    </div>
                                    <Button label={<MdDelete />} color={'bg-secundary'} textColor={'text-terciary'} onClick={() => handleClick(equipos.equipo._id)} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
            <ConfirmModal message={`¿Estas seguro que quieres eliminar el equipo de playoffs?`} isOpen={confirmModal} onClose={handleCloseModal} onConfirm={handleConfirm} onSuccess={() => {}} />
        </div>
    );
};

export default TeamsPlayoffs;
