import Table from '../components/Table.js';
import Goals from '../components/Goals.js';
import Encuentros from '../components/Encuentros.js';
import Footer from '../components/Footer.js';
import TorneoService from '../service/TorneoService.js';
import { useEffect, useState } from 'react';
import Playoffs from '../features/home/Playoffs.js';

const Home = () => {
    const [torneo, setTorneo] = useState(null);
    useEffect(() => {
        const fetchTorneos = async () => {
            try {
                const data = await TorneoService.getAllDestacado();
                setTorneo(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchTorneos();
    }, []);

    return (
        <div className="">
            {torneo && (
                <div className="container mx-auto p-8 ">
                    <Playoffs partidos={torneo.faseEliminatoria.partidosEliminacion} />
                </div>
            )}
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 items-center md:my-20 my-10">
                {/* Tabla principal (ocupa 2 columnas en pantallas medianas y grandes) */}
                {torneo && (
                    <div className="md:col-span-2">
                        <Table torneo={torneo} />
                    </div>
                )}
                {/* Tabla de goleadores (ocupa 1 columna) */}
                {torneo && (
                    <div className="md:col-span-1">
                        <Goals torneoId={torneo._id} />
                    </div>
                )}
            </div>
            {/* Encuentros debajo de las tablas */}
            {torneo && <Encuentros torneoId={torneo._id} />}
            <Footer />
        </div>
    );
};

export default Home;
