import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TorneoService from '../../../service/TorneoService.js';
import FormNewTorneo from './FormNewTorneo.js';
import SetDestacarTorneo from './SetDestacarTorneo.js';

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
        <div className="">
            <div className="flex items-center justify-center">
                <button onClick={openTorneoForm} className="p-4 bg-terciary rounded-md text-primary text-xl">
                    Crear torneo
                </button>
            </div>
            <h2 className="text-center font-bold text-xl text-secundary">Torneos</h2>
            <div className="container mx-auto md:w-[50%]">
                {torneos?.map(torneo => (
                    <div key={torneo._id} className="bg-secundary shadow-md rounded-md m-4 p-6 text-primary flex justify-between items-center">
                        <div>
                            <h3 className="font-semibold text-xl">
                                {torneo.nombre} <span className="text-xs font-medium">{torneo.estado}</span>
                            </h3>
                            <p className="font-medium text-xs">
                                {torneo.fechaInicio} / {torneo.fechaFin}
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="p-2 bg-terciary text-primary rounded-md" onClick={() => handleTorneoClick(torneo._id)}>
                                Ver detalles
                            </button>
                            <SetDestacarTorneo torneoId={torneo._id} isDestacado={torneo.destacado} onSuccess={fetchTorneos} />
                        </div>
                    </div>
                ))}
            </div>
            {torneoForm && <FormNewTorneo isOpen={torneoForm} onClose={closeTorneoForm} onSuccess={fetchTorneos} />}
        </div>
    );
};

export default Torneos;
