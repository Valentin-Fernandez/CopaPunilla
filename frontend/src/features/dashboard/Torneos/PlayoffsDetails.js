import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TorneoService from '../../../service/TorneoService';
import Loading from '../../../components/Loading.js';
import TeamsPlayoffs from './TeamsPlayoffs.js';
import PartidosPlayoffs from './PartidosPlayoffs.js';

const PlayoffsDetails = () => {
    const { id } = useParams();
    const [playoffs, setPlayoffs] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchPlayoffs = async id => {
        try {
            setLoading(true);
            const data = await TorneoService.getPlayoffs(id);
            setPlayoffs(data);
        } catch (error) {
            console.error('Error al obtener los playoffs', error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchPlayoffs(id);
    }, []);
    return (
        <div className="bg-terciary rounded-md p-8 mb-6 md:flex justify-around items-center">
            {playoffs && <TeamsPlayoffs teams={playoffs.faseEliminatoria.equiposClasificados} fetchPlayoffs={fetchPlayoffs} />}
            {playoffs && <PartidosPlayoffs partidos={playoffs.faseEliminatoria.partidosEliminacion} onSuccess={() => fetchPlayoffs(id)} />}
            {loading && <Loading />}
        </div>
    );
};

export default PlayoffsDetails;
