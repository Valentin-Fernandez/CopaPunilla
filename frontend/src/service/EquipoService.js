import axios from './Axios.js';
const API_URL = `${process.env.REACT_APP_API_URL}`;

const EquipoService = {
    create: async equipo => {
        try {
            await axios.post(`${API_URL}/torneos/${equipo.torneo}/equipos`, equipo);
        } catch (error) {
            throw error;
        }
    },

    getById: async id => {
        try {
            const response = await axios.get(`${API_URL}/equipos/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    update: async (id, equipo) => {
        try {
            await axios.put(`${API_URL}/equipos/${id}`, equipo);
        } catch (error) {
            throw error;
        }
    },
};

export default EquipoService;
