import { useEffect, useState } from 'react';
import Modal from '../../../components/Modal.js';
import { useParams } from 'react-router-dom';
import TorneoService from '../../../service/TorneoService.js';
import Button from '../../../components/Button.js';
import { toast } from 'react-toastify';
import Loading from '../../../components/Loading.js';

const PlayoffsSelect = ({ isOpen, onClose, onPlayoffsActivated }) => {
    const { id } = useParams();
    const [torneo, setTorneo] = useState(null);
    const [seleccionados, setSeleccionados] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTorneoDetails = async () => {
            try {
                const data = await TorneoService.getDetalles(id);
                setTorneo(data);
            } catch (error) {
                console.error('Error al obtener los detalles del torneo', error);
            }
        };

        fetchTorneoDetails();
    }, []);

    const handleSeleccionar = equipoId => {
        setSeleccionados(prevSeleccionads => {
            if (prevSeleccionads.includes(equipoId)) {
                return prevSeleccionads.filter(id => id !== equipoId);
            } else {
                return [...prevSeleccionads, equipoId];
            }
        });
    };

    const handleSubmit = async () => {
        setLoading(true);
        if (seleccionados.length < 4) {
            toast.error('Error al crear el torneo', {
                position: 'bottom-right',
                autoClose: 2000,
                hideProgressBar: false,
                theme: 'dark',
            });
            setLoading(false);
            return;
        }

        try {
            const equiposClasificados = seleccionados.map((equipoId, index) => ({
                equipo: equipoId,
                posicion: index + 1,
            }));
            const torneoData = {
                faseEliminatoria: {
                    activo: true,
                    equiposClasificados,
                },
            };
            await TorneoService.activarPlayoffs(id, torneoData);
            toast.success('Playoffs activado correctamente', {
                position: 'bottom-right',
                autoClose: 2000,
                hideProgressBar: false,
                theme: 'dark',
            });
            onPlayoffsActivated();
            onClose();
        } catch (error) {
            console.error('Error al activar los playoffs', error);
            toast.error('Error al activar los playoffs', {
                position: 'bottom-right',
                autoClose: 2000,
                hideProgressBar: false,
                theme: 'dark',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="p-4">
                <h2 className="text-primary text-xl text-center">
                    Selecciona equipos a <span className="text-terciary font-semibold">clasificar!</span>
                </h2>

                {torneo && torneo.equipos.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                            {torneo.equipos.map(equipo => (
                                <div className="p-3 bg-secundaryDark rounded-md text-primary">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={seleccionados.includes(equipo._id)}
                                            onChange={() => handleSeleccionar(equipo._id)}
                                            className="mx-2 accent-terciary transition cursor-pointer rounded w-5 h-5"
                                        />
                                        <span className="text-lg">{equipo.nombre}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button label={'Enviar'} full={'w-full'} color={'bg-terciary'} textColor={'text-primary'} disabled={loading} onClick={handleSubmit} />
                    </>
                ) : (
                    <p className="text-center text-primary">Cargando equipos del torneo...</p>
                )}
            </div>
            {loading && <Loading />}
        </Modal>
    );
};

export default PlayoffsSelect;
