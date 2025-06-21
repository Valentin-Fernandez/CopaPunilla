const Playoffs = ({ partidos }) => {
    const partidosCuartos = partidos.filter(p => p.ronda === 'repechaje');
    const partidosSemifinal = partidos.filter(p => p.ronda === 'semifinal');
    const partidosTercerPuesto = partidos.filter(p => p.ronda === 'tercer puesto');
    const partidoFinal = partidos.filter(p => p.ronda === 'final');

    return (
        <div className="">
            <h2 className="text-2xl font-bold mb-4 text-secundary text-center">
                Partidos de <span className="text-terciary">Playoffs</span>
            </h2>
            {partidos && partidos.length > 0 && (
                <div className="flex flex-col md:flex-row items-center justify-center">
                    {partidosCuartos.length > 0 ? (
                        <div className="flex flex-col">
                            <h3 className="text-xl text-center text-terciary font-semibold">Repechaje</h3>
                            {partidosCuartos.map(p => (
                                <div className="bg-secundaryDark m-2 w-64 h-24 p-8 rounded-md text-primary space-x-6 items-center justify-between flex ">
                                    <div className="text-lg">
                                        <p>{p.partido.equipoLocal.nombre}</p>
                                        <p>{p.partido.equipoVisitante.nombre}</p>
                                    </div>
                                    {p.partido.estado === 'pendiente' ? (
                                        <p className="text-yellow-500">Pendiente</p>
                                    ) : (
                                        <div className="flex flex-col text-terciary font-semibold">
                                            <p>{p.partido.golesLocal}</p>
                                            <p>{p.partido.golesVisitante}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : null}
                    {partidosSemifinal.length > 0 ? (
                        <div className="flex flex-col">
                            <h3 className="text-xl text-center text-terciary font-semibold">Semifinal</h3>
                            {partidosSemifinal.map(p => (
                                <div className="bg-secundaryDark m-2 w-64 h-24 p-8 rounded-md text-primary space-x-6 items-center justify-between flex " key={p.partido._id}>
                                    <div className="text-lg">
                                        <p>{p.partido.equipoLocal.nombre}</p>
                                        <p>{p.partido.equipoVisitante.nombre}</p>
                                    </div>
                                    {p.partido.estado === 'pendiente' ? (
                                        <p className="text-yellow-500">Pendiente</p>
                                    ) : (
                                        <div className="flex flex-col text-terciary font-semibold">
                                            <p>{p.partido.golesLocal}</p>
                                            <p>{p.partido.golesVisitante}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : null}
                    {partidosTercerPuesto.length > 0 ? (
                        <div className="flex flex-col">
                            {partidosTercerPuesto.length > 0 ? (
                                <div className="flex flex-col">
                                    <h3 className="text-xl text-center text-terciary font-semibold">Tercer puesto</h3>
                                    <div className="text-center text-secundary font-semibold text-sm">
                                        <p>{new Date(partidosTercerPuesto[0].partido.fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' })}</p>
                                    </div>
                                    <div className="bg-secundaryDark m-2 w-64 h-24 p-8 rounded-md text-primary space-x-6 items-center justify-between flex" key={partidosTercerPuesto[0].partido._id}>
                                        <div className="text-lg">
                                            <p>{partidosTercerPuesto[0].partido.equipoLocal.nombre}</p>
                                            <p>{partidosTercerPuesto[0].partido.equipoVisitante.nombre}</p>
                                        </div>
                                        {partidosTercerPuesto[0].partido.estado === 'pendiente' ? (
                                            <p className="text-yellow-500">Pendiente</p>
                                        ) : (
                                            <div className="flex flex-col text-terciary font-semibold">
                                                <p>{partidosTercerPuesto[0].partido.golesLocal}</p>
                                                <p>{partidosTercerPuesto[0].partido.golesVisitante}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    ) : null}
                    {partidoFinal.length > 0 ? (
                        <div className="flex flex-col">
                            <h3 className="text-xl text-center text-terciary font-semibold">Final</h3>
                            {/* Dia y hora */}
                            <div className="text-center text-secundary font-semibold text-sm">
                                <p>{new Date(partidoFinal[0].partido.fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' })}</p>
                            </div>
                            {partidoFinal.map(p => (
                                <div className="bg-secundaryDark m-2 w-64 h-24 p-8 rounded-md text-primary space-x-6 items-center justify-between flex" key={p.partido._id}>
                                    <div className="text-lg">
                                        <p>{p.partido.equipoLocal.nombre}</p>
                                        <p>{p.partido.equipoVisitante.nombre}</p>
                                    </div>
                                    {p.partido.estado === 'pendiente' ? (
                                        <p className="text-yellow-500">Pendiente</p>
                                    ) : (
                                        <div className="flex flex-col text-terciary font-semibold">
                                            <p>{p.partido.golesLocal}</p>
                                            <p>{p.partido.golesVisitante}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    );
};

export default Playoffs;
