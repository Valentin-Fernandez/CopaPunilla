import { FaRegStar } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';
import TorneoService from '../../../service/TorneoService.js';

const SetDestacarTorneo = ({ torneoId, isDestacado, onSuccess }) => {
    const handleDestacar = async () => {
        if (isDestacado) {
            return;
        }

        try {
            await TorneoService.setDestacado(torneoId);
            onSuccess();
        } catch (error) {
            console.error('Error setting tournament as featured:', error);
        }
    };

    return <div>{isDestacado ? <FaStar className="text-terciary text-xl" onClick={handleDestacar} /> : <FaRegStar className="text-terciary text-xl" onClick={handleDestacar} />}</div>;
};

export default SetDestacarTorneo;
