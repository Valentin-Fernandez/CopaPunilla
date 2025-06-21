import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../components/Button.js';
import TorneoService from '../../../service/TorneoService.js';

const PartidosPlayoffs = ({ partidos, onSuccess }) => {
    const { id } = useParams();
    const partidosRepechaje = partidos.filter(p => p.ronda === 'repechaje');
    const partidosSemifinal = partidos.filter(p => p.ronda === 'semifinal');
    const partidoFinal = partidos.filter(p => p.ronda === 'final');

    const navigate = useNavigate();

    const handleAvanzarFase = async id => {
        try {
            await TorneoService.avanzarFase(id);

            onSuccess();
        } catch (error) {
            console.error('Error al avanzar de fase', error);
        }
    };

    const handleNavigate = (partidoId, ronda) => {
        navigate(`/dashboard/resultado/${partidoId}?fase=${ronda}`);
    };

    return (
        <div className="">
            <h2 className="text-2xl font-bold mb-4 text-primary text-center">Partidos de Playoffs</h2>
            <div className="flex justify-center mb-4">
                <Button label={'Avanzar de fase'} color={'bg-secundaryDark'} textColor={'text-primary'} onClick={() => handleAvanzarFase(id)} />
            </div>
            {partidos && partidos.length > 0 ? (
                <div>
                    <h3 className="text-xl text-center text-primary font-semibold">Repechaje</h3>
                    {partidosRepechaje.length > 0 ? (
                        partidosRepechaje.map(p => (
                            <div className="bg-secundaryDark m-4 p-4 rounded-md text-primary space-x-6 items-center justify-between flex" key={p.partido._id}>
                                <div className="text-lg">
                                    <p>{p.partido.equipoLocal.nombre}</p>
                                    <p>{p.partido.equipoVisitante.nombre}</p>
                                </div>
                                {p.partido.estado === 'pendiente' ? (
                                    <Button onClick={() => handleNavigate(p.partido._id, p.ronda)} label={'Resultado'} color={'bg-terciary'} textColor={'text-primary'} />
                                ) : (
                                    <div className="flex flex-col text-terciary font-semibold">
                                        <p>{p.partido.golesLocal}</p>
                                        <p>{p.partido.golesVisitante}</p>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div>
                            <p className="text-center text-primary mt-3">No hay partidos de cuartos</p>
                        </div>
                    )}
                    <h3 className="text-xl text-center text-primary font-semibold">Semifinal</h3>
                    {partidosSemifinal.length > 0 ? (
                        partidosSemifinal.map(p => (
                            <div className="bg-secundaryDark m-4 p-4 rounded-md text-primary space-x-6 items-center justify-between flex" key={p.partido._id}>
                                <div className="text-lg">
                                    <p>{p.partido.equipoLocal.nombre}</p>
                                    <p>{p.partido.equipoVisitante.nombre}</p>
                                </div>
                                {p.partido.estado === 'pendiente' ? (
                                    <Button onClick={() => handleNavigate(p.partido._id, p.ronda)} label={'Resultado'} color={'bg-terciary'} textColor={'text-primary'} />
                                ) : (
                                    <div className="flex flex-col text-terciary font-semibold">
                                        <p>{p.partido.golesLocal}</p>
                                        <p>{p.partido.golesVisitante}</p>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div>
                            <p className="text-center text-primary mt-3">No hay partidos de semifinales</p>
                        </div>
                    )}
                    <h3 className="text-xl text-center text-primary font-semibold">Final</h3>
                    {partidoFinal.length > 0
                        ? partidoFinal.map(p => (
                              <div className="bg-secundaryDark m-4 p-4 rounded-md text-primary space-x-6 items-center justify-between flex" key={p.partido._id}>
                                  <div className="text-lg">
                                      <p>{p.partido.equipoLocal.nombre}</p>
                                      <p>{p.partido.equipoVisitante.nombre}</p>
                                  </div>
                                  {p.partido.estado === 'pendiente' ? (
                                      <Button onClick={() => handleNavigate(p.partido._id, p.ronda)} label={'Resultado'} color={'bg-terciary'} textColor={'text-primary'} />
                                  ) : (
                                      <div className="flex flex-col text-terciary font-semibold">
                                          <p>{p.partido.golesLocal}</p>
                                          <p>{p.partido.golesVisitante}</p>
                                      </div>
                                  )}
                              </div>
                          ))
                        : null}
                </div>
            ) : null}
        </div>
    );
};

export default PartidosPlayoffs;
