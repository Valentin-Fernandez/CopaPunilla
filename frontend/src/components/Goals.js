import { useEffect, useState } from 'react';
import StatsService from '../service/StatsService';

const Goals = ({ torneoId }) => {
    const [jugadores, setJugadores] = useState([]);

    useEffect(() => {
        const fetchJugadores = async () => {
            try {
                const response = await StatsService.getGoleadores(torneoId);
                setJugadores(response);
            } catch (error) {
                console.error('Error fetching jugadores:', error);
            }
        };
        fetchJugadores();
    }, [torneoId]);

    return (
        <div className="mt-10 sm:mt-0">
            <div className="flex items-center justify-center">
                <div className="rounded-xl shadow-lg text-sm text-secundary">
                    <h2 className="px-6 py-2 text-base font-semibold ">Tabla de goleadores</h2>
                    <table className="shadow-md w-full">
                        <thead className="border-t shadow-sm border-terciary">
                            <tr className="shadow-sm">
                                {/* <th className="py-3">#</th> */}
                                <th className="p-4">Jugador</th>
                                <th className="p-4">Goles</th>
                            </tr>
                        </thead>
                        <tbody className="text-base">
                            {jugadores.map(jugador => (
                                <tr key={jugador._id} className="shadow-sm">
                                    {/* <td className="text-center py-3 px-2">{jugador.posicion}</td> */}
                                    <td className="text-center p-4">{jugador.nombre}</td>
                                    <td className="text-center p-4">{jugador.estadisticas.goles}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Goals;
