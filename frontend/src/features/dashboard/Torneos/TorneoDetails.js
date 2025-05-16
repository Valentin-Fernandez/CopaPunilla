import { useEffect, useState } from 'react';
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

const TorneoDetails = () => {
    const { id } = useParams();
    const [torneo, setTorneo] = useState(null);
    const [equipoForm, setEquipoForm] = useState(false);
    const [jugadorForm, setJugadorForm] = useState(false);
    const [partidoForm, setPartidoForm] = useState(false);
    const [partidos, setPartidos] = useState(false);

    const openEquipoForm = () => setEquipoForm(true);
    const closeEquipoForm = () => setEquipoForm(false);
    const openJugadorForm = () => setJugadorForm(true);
    const closeJugadorForm = () => setJugadorForm(false);
    const openPartidoForm = () => setPartidoForm(true);
    const closePartidoForm = () => setPartidoForm(false);
    const openPartidos = () => setPartidos(true);
    const closePartidos = () => setPartidos(false);

    const fetchTorneoId = async id => {
        try {
            const data = await TorneoService.getTorneoDetails(id);
            setTorneo(data);
        } catch (error) {
            console.error('Error al obtener el ID', error);
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
                            <div className="flex justify-between items-center">
                                <div>
                                    <h4 className="font-bold text-2xl">
                                        Torneo {torneo.nombre} <span className="font-light text-sm">{torneo.estado}</span>
                                    </h4>
                                    <p className="text-base font-light">
                                        {torneo.fechaInicio} / {torneo.fechaFin}
                                    </p>
                                    <p className="text-base font-light mb-4">Fase: {torneo.faseEliminatoria.activo ? 'Playoffs' : 'Liga'}</p>
                                </div>
                            </div>
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
        </>
    );
};

export default TorneoDetails;
