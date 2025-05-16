import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TorneoService from '../../../service/TorneoService.js';
import FormNewTorneo from './FormNewTorneo.js';
import SetDestacarTorneo from './SetDestacarTorneo.js';
import Button from '../../../components/Button.js';

const Torneos = () => {
    const [torneos, setTorneos] = useState([]);
    const [torneoForm, setTorneoForm] = useState(false);
    const navigate = useNavigate();

    const fetchTorneos = async () => {
        try {
            const response = await TorneoService.getAll();
            setTorneos(response);
        } catch (error) {
            console.error('Error fetching torneos:', error);
        }
    };

    useEffect(() => {
        fetchTorneos();
    }, []);

    const handleTorneoClick = id => {
        navigate(`/dashboard/torneo/${id}`);
    };

    const openTorneoForm = () => setTorneoForm(true);
    const closeTorneoForm = () => setTorneoForm(false);

    return (
        <div className="shadow-md rounded-md py-12 bg-secundary text-primary mx-4 md:mx-0">
            <h2 className="text-center font-bold text-3xl mb-4 ">Torneos</h2>
            <div className="flex items-center justify-center">
                <Button onClick={openTorneoForm} textColor={'text-primary'} label={'Crear torneo'} color={'bg-secundaryDark'} />
            </div>
            <div className={torneos.length > 1 ? 'grid md:grid-cols-2 md:gap-6 md:mx-auto md:w-[70%] mx-4' : 'flex justify-center md:mx-auto mx-4'}>
                {torneos?.map(torneo => (
                    <div key={torneo._id} className={torneos.length === 1 ? 'p-8 my-4 bg-secundaryDark rounded-md md:w-[50%] w-[90%]' : 'p-8 my-4 bg-secundaryDark rounded-md'}>
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-xl">
                                    {torneo.nombre} <span className="text-xs font-medium">{torneo.estado}</span>
                                </h3>
                                <p className="font-medium text-xs text-terciary">
                                    {torneo.fechaInicio} / {torneo.fechaFin}
                                </p>
                            </div>
                            <div>
                                <SetDestacarTorneo torneoId={torneo._id} isDestacado={torneo.destacado} onSuccess={fetchTorneos} />
                            </div>
                        </div>
                        <div className="mt-6">
                            <Button onClick={() => handleTorneoClick(torneo._id)} textColor={'text-terciary'} label={'Ver detalles'} color={'bg-secundary'} full={'w-full'} />
                        </div>
                    </div>
                ))}
            </div>
            {torneoForm && <FormNewTorneo isOpen={torneoForm} onClose={closeTorneoForm} onSuccess={fetchTorneos} />}
        </div>
    );
};

export default Torneos;
