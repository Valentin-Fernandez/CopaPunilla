import Table from '../components/Table.js';
import Goals from '../components/Goals.js';
import Encuentros from '../components/Encuentros.js';
import Footer from '../components/Footer.js';
import TorneoService from '../service/TorneoService.js';
import { useEffect, useState } from 'react';

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
            {torneo && <Table torneo={torneo} />}
            {torneo && <Goals torneoId={torneo._id} />}
            {torneo && <Encuentros torneoId={torneo._id} />}
            <Footer />
        </div>
    );
};

export default Home;
