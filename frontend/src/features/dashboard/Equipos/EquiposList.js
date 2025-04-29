import { CiEdit } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';

const EquiposList = ({ equipos }) => {
    const navigate = useNavigate();

    const handleClickEquipo = id => {
        navigate(`/dashboard/equipo/${id}`);
    };

    return (
        <div className="md:grid md:grid-cols-3 md:gap-4">
            {equipos.map(equipo => (
                <div className="flex items-center justify-between p-4 bg-secundaryDark shadow-md rounded-md mb-4" key={equipo._id}>
                    <h2 key={equipo._id} className="text-base text-primary">
                        {equipo.nombre}
                    </h2>
                    <div className="flex items-center justify-center gap-2">
                        <button className="bg-secundary rounded-lg p-3" onClick={() => handleClickEquipo(equipo._id)}>
                            <CiEdit className="text-terciary text-lg" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EquiposList;
