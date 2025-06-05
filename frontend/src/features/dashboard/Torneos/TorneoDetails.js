import { use, useEffect, useState } from 'react';
import TorneoService from '../../../service/TorneoService.js';
import FormNewEquipo from '../Equipos/FormNewEquipo.js';
import FormNewJugador from '../Jugadores/FormNewJugador.js';
import FormNewPartido from '../Partidos/FormNewPartido.js';
import { useParams } from 'react-router-dom';
import EquiposList from '../Equipos/EquiposList.js';
import { FaLongArrowAltDown } from 'react-icons/fa';
import { FaLongArrowAltUp } from 'react-icons/fa';
import PartidosDetails from '../Partidos/PartidosDetails.js';
import Button from '../../../components/Button.js';
import { FaCircle } from 'react-icons/fa6';
import { FaGear } from 'react-icons/fa6';
import AjustesTorneo from './AjustesTorneo.js';
import PlayoffsSelect from './PlayoffsSelect.js';
import PlayoffsDetails from './PlayoffsDetails.js';

const TorneoDetails = () => {
    const { id } = useParams();
    const [torneo, setTorneo] = useState(null);
    const [equipoForm, setEquipoForm] = useState(false);
    const [jugadorForm, setJugadorForm] = useState(false);
    const [partidoForm, setPartidoForm] = useState(false);
    const [partidos, setPartidos] = useState(false);
    const [ajustesModal, setAjustesModal] = useState(false);
    const [playoffsModal, setPlayoffsModal] = useState(false);
    const [playoffsActivated, setPlayoffsActivated] = useState(false);

    const openEquipoForm = () => setEquipoForm(true);
    const closeEquipoForm = () => setEquipoForm(false);
    const openJugadorForm = () => setJugadorForm(true);
    const closeJugadorForm = () => setJugadorForm(false);
    const openPartidoForm = () => setPartidoForm(true);
    const closePartidoForm = () => setPartidoForm(false);
    const openPartidos = () => setPartidos(true);
    const closePartidos = () => setPartidos(false);
    const openAjustes = () => setAjustesModal(true);
    const closeAjustes = () => setAjustesModal(false);
    const openPlayoffs = () => setPlayoffsModal(true);
    const closePlayoffs = () => setPlayoffsModal(false);

    const fetchTorneoId = async id => {
        try {
            const data = await TorneoService.getTorneoDetails(id);
            setTorneo(data);
        } catch (error) {
            console.error('Error al obtener el Torneo', error);
        }
    };

    useEffect(() => {
        fetchTorneoId(id);
    }, []);

    return (
        <>
            <div className="mt-4">
                <div className="container mx-auto rounded-lg">
                    {torneo && (
                        <div className="p-8 text-secundary">
                            <div className="flex justify-between items-center my-2">
                                <div>
                                    <h4 className="font-bold text-2xl">Torneo {torneo.nombre}</h4>
                                    <p className="text-base font-light">
                                        {torneo.fechaInicio} / {torneo.fechaFin}
                                    </p>
                                    <p className="text-base font-light mb-4">
                                        Fase: <span className="font-semibold text-terciary">{torneo.faseEliminatoria.activo ? 'Playoffs' : 'Liga'}</span>
                                    </p>
                                </div>
                                <div className="flex md:flex-row flex-col items-center justify-center gap-1 md:gap-4">
                                    <div className="">
                                        {torneo.estado === 'activo' ? (
                                            <div className="flex items-center gap-2 p-3 shadow-md rounded-md">
                                                <FaCircle className="text-green-500" />
                                                <span className="text-green-500 font-bold"> Activo</span>
                                            </div>
                                        ) : torneo.estado === 'finalizado' ? (
                                            <div className="flex items-center gap-2 p-3 shadow-md rounded-md">
                                                <FaCircle className="text-red-500" />
                                                <span className="text-red-500 font-bold"> Finalizado</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 p-3 shadow-md rounded-md">
                                                <FaCircle className="text-yellow-500" />
                                                <span className="text-yellow-500 font-bold"> Pausado</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center justify-center w-12 h-12 shadow-md rounded-md" onClick={openAjustes}>
                                        <FaGear className="text-terciary" />
                                    </div>
                                </div>
                            </div>
                            {/* ACA VIENEN LOS PLAYOFFS */}
                            {(torneo.faseEliminatoria.activo || playoffsActivated) && <PlayoffsDetails />}
                            <div>
                                <div className="flex justify-center gap-6 mb-6">
                                    <Button onClick={openEquipoForm} color={'bg-secundaryDark'} textColor={'text-primary'} label={'Crear equipo'} />
                                    <Button onClick={openJugadorForm} color={'bg-secundaryDark'} textColor={'text-primary'} label={'Crear jugador'} />
                                    <Button onClick={openPartidoForm} color={'bg-secundaryDark'} textColor={'text-primary'} label={'Crear partido'} />
                                </div>
                                <EquiposList equipos={torneo.equipos} />
                                {/* Partidos */}
                                <div className=" bg-terciary rounded-md p-4 mt-6 mb-6">
                                    <div className="flex justify-between items-center">
                                        <h4 className="font-bold text-2xl text-primary">Partidos</h4>
                                        {partidos ? (
                                            <FaLongArrowAltUp className="text-primary text-xl" onClick={closePartidos} />
                                        ) : (
                                            <FaLongArrowAltDown className="text-primary text-xl" onClick={openPartidos} />
                                        )}
                                    </div>
                                    {partidos && <PartidosDetails />}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {equipoForm && <FormNewEquipo onClose={closeEquipoForm} isOpen={openEquipoForm} torneoId={id} onSuccess={() => fetchTorneoId(id)} />}
            {jugadorForm && (
                <FormNewJugador
                    onClose={closeJugadorForm}
                    isOpen={openJugadorForm}
                    torneoId={id}
                    equipos={torneo.equipos.map(equipo => ({
                        id: equipo._id,
                        nombre: equipo.nombre,
                    }))}
                />
            )}
            {partidoForm && (
                <FormNewPartido
                    onClose={closePartidoForm}
                    isOpen={openPartidoForm}
                    torneoId={id}
                    equipos={torneo.equipos.map(equipo => ({
                        id: equipo._id,
                        nombre: equipo.nombre,
                    }))}
                />
            )}
            {ajustesModal && <AjustesTorneo isOpen={openAjustes} onClose={closeAjustes} openPlayoffs={openPlayoffs} activePlayoffs={torneo.faseEliminatoria.activo} />}
            {playoffsModal && (
                <PlayoffsSelect
                    isOpen={openPlayoffs}
                    onClose={closePlayoffs}
                    onPlayoffsActivated={() => {
                        setPlayoffsActivated(true);
                    }}
                />
            )}
        </>
    );
};

export default TorneoDetails;
