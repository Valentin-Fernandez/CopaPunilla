import axios from './Axios.js';
const API_URL = `${process.env.REACT_APP_API_URL}`;

const PartidoService = {
    create: async partido => {
        try {
            await axios.post(`${API_URL}/torneos/${partido.torneo}/partidos`, partido);
        } catch (error) {
            throw error;
        }
    },

    getAll: async torneoId => {
        try {
            const response = await axios.get(`${API_URL}/torneos/${torneoId}/partidos`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getById: async id => {
        try {
            const response = await axios.get(`${API_URL}/partidos/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    finalizar: async (id, partido, fase) => {
        try {
            await axios.post(`${API_URL}/partidos/${id}/finalizar`, { ...partido, fase });
        } catch (error) {
            throw error;
        }
    },
};

export default PartidoService;
