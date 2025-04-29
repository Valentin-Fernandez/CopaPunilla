import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EquipoService from '../../../service/EquipoService.js';
import TableStatsJugadores from '../Jugadores/TableStatsJugadores.js';
import FormEditEquipo from './FormEditEquipo.js';

const EquipoDetails = () => {
    const [equipo, setEquipo] = useState(null);
    const [formEditEquipo, setFormEditEquipo] = useState(false);
    const { id } = useParams();

    const openEditEquipo = () => setFormEditEquipo(true);
    const closeEditEquipo = () => setFormEditEquipo(false);

    const getByIdEquipo = async id => {
        const response = await EquipoService.getById(id);
        setEquipo(response);
    };

    const handleEdit = async () => {
        openEditEquipo();
    };

    useEffect(() => {
        try {
            getByIdEquipo(id);
        } catch (error) {
            console.error('Error al traer el equipo:', error);
        }
    }, []);

    return (
        <div className="container mx-auto">
            {equipo ? (
                <div className="my-8 mx-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl text-primary">{equipo.nombre}</h2>
                        <div className="space-x-4">
                            <button className="bg-secundaryDark rounded-md text-primary text-sm p-2" onClick={handleEdit}>
                                Editar
                            </button>
                            <button className="bg-secundaryDark rounded-md text-primary text-sm p-2">Eliminar</button>
                        </div>
                    </div>
                    <div className="">
                        <TableStatsJugadores jugadores={equipo.jugadores} onSuccess={() => getByIdEquipo(id)} />
                    </div>
                    {/* Aquí puedes agregar más detalles del equipo */}
                </div>
            ) : (
                <p>Cargando...</p>
            )}
            {/* Aquí puedes agregar más detalles del equipo */}
            {formEditEquipo && <FormEditEquipo isOpen={openEditEquipo} onClose={closeEditEquipo} equipo={equipo} onSuccess={() => getByIdEquipo(id)} />}
        </div>
    );
};

export default EquipoDetails;
