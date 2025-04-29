import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EquipoService from '../../service/EquipoService.js';

const EquipoDetailsHome = () => {
    const [equipo, setEquipo] = useState(null);
    const { id } = useParams();

    const getByIdEquipo = async id => {
        const response = await EquipoService.getById(id);
        setEquipo(response);
    };

    useEffect(() => {
        try {
            getByIdEquipo(id);
        } catch (error) {
            console.error('Error al traer el equipo:', error);
        }
    }, []);

    return (
        <div className="container mx-auto h-screen">
            {equipo ? (
                <div className="my-8 mx-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl text-secundaryDark">{equipo.nombre}</h2>
                    </div>
                    <div className="">
                        <table className="w-full">
                            <thead>
                                <tr className="text-secundary text-sm font-bold uppercase">
                                    <th className="p-2 text-center">Nombre</th>
                                    <th className="p-2 text-center">Goles</th>
                                    <th className="p-2 text-center">Amarillas</th>
                                    <th className="p-2 text-center">Rojas</th>
                                    <th className="p-2 text-center">Activo</th>
                                </tr>
                                {equipo.jugadores.map(jugador => (
                                    <tr key={jugador._id} className="text-secundary text-sm">
                                        <td className="p-2 text-center">{jugador.nombre}</td>
                                        <td className="p-2 text-center">{jugador.estadisticas.goles}</td>
                                        <td className="p-2 text-center">{jugador.estadisticas.tarjetasAmarillas}</td>
                                        <td className="p-2 text-center">{jugador.estadisticas.tarjetasRojas}</td>
                                        <td className="p-2 text-center">{jugador.activo ? 'Si' : 'No'}</td>
                                    </tr>
                                ))}
                            </thead>
                        </table>
                    </div>
                </div>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
};

export default EquipoDetailsHome;
