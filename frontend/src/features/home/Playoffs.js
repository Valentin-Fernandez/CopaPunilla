const Playoffs = ({ partidos }) => {
    const partidosCuartos = partidos.filter(p => p.ronda === 'cuartos');
    const partidosSemifinal = partidos.filter(p => p.ronda === 'semifinal');

    return (
        <div className="">
            <h2 className="text-2xl font-bold mb-4 text-secundary text-center">
                Partidos de <span className="text-terciary">Playoffs</span>
            </h2>
            {partidos && partidos.length > 0 && (
                <div className="flex flex-col items-center justify-center">
                    <h3 className="text-xl text-center text-terciary font-semibold">Repechaje</h3>
                    {partidosCuartos.length > 0 ? (
                        partidosCuartos.map(p => (
                            <div className="bg-secundaryDark m-4 p-4 rounded-md text-primary space-x-6 items-center justify-between flex md:w-[30%] w-[90%]">
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
                            <p className="text-center text-secundary mt-3">No hay partidos de cuartos</p>
                        </div>
                    )}
                    {/* <h3 className="text-xl text-center text-secundary font-semibold">Semifinal</h3> */}
                    {partidosSemifinal.length > 0 ? (
                        partidosSemifinal.map(p => (
                            <div className="bg-secundaryDark m-4 p-4 rounded-md text-secundary space-x-6 items-center justify-between flex">
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
            )}
        </div>
    );
};

export default Playoffs;
