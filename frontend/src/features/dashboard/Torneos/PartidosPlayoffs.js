const PartidosPlayoffs = ({ partidos }) => {
    const partidosCuartos = partidos.filter(p => p.ronda === 'cuartos');
    const partidosSemifinal = partidos.filter(p => p.ronda === 'semifinal');

    return (
        <div className="">
            <h2 className="text-2xl font-bold mb-4 text-primary">Partidos de Playoffs</h2>
            {partidos && partidos.length > 0 ? (
                <div>
                    <h3 className="text-xl text-center text-primary font-semibold">Cuartos de final</h3>
                    {partidosCuartos.length > 0 ? (
                        partidosCuartos.map(p => (
                            <div className="bg-secundaryDark m-4 p-4 rounded-md text-primary space-x-6 items-center justify-between flex">
                                <div className="text-lg">
                                    <p>{p.partido.equipoLocal.nombre}</p>
                                    <p>{p.partido.equipoVisitante.nombre}</p>
                                </div>
                                {p.partido.estado === 'pendiente' ? (
                                    <p className="text-yellow-500">Pendiente</p>
                                ) : (
                                    <div className="flex flex-col">
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
                            <div className="bg-secundaryDark m-4 p-4 rounded-md text-primary space-x-6 items-center justify-between flex">
                                <div className="text-lg">
                                    <p>{p.partido.equipoLocal.nombre}</p>
                                    <p>{p.partido.equipoVisitante.nombre}</p>
                                </div>
                                {p.partido.estado === 'pendiente' ? (
                                    <p className="text-yellow-500">Pendiente</p>
                                ) : (
                                    <div className="flex flex-col">
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
                </div>
            ) : (
                <p> 'HOla </p>
            )}
        </div>
    );
};

export default PartidosPlayoffs;
