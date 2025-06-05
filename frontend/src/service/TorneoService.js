import axios from './Axios.js';
const API_URL = `${process.env.REACT_APP_API_URL}/torneos`;

const TorneoService = {
    getAll: async () => {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getById: async id => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    create: async torneo => {
        try {
            const response = await axios.post(API_URL, torneo);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    setDestacado: async id => {
        try {
            await axios.put(`${API_URL}/destacar/${id}`);
        } catch (error) {
            throw error;
        }
    },

    getTorneoDetails: async id => {
        try {
            const response = await axios.get(`${API_URL}/detalles/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getAllDestacado: async () => {
        try {
            const response = await axios.get(`${API_URL}/destacado`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getDetalles: async id => {
        try {
            const response = await axios.get(`${API_URL}/detalles/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    activarPlayoffs: async (id, torneo) => {
        try {
            const response = await axios.put(`${API_URL}/${id}/playoffs`, torneo);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getPlayoffs: async id => {
        try {
            const response = await axios.get(`${API_URL}/${id}/playoffs`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteEquipoPlayoffs: async (id, equipoId) => {
        try {
            await axios.delete(`${API_URL}/${id}/playoffs/equipo/${equipoId}`);
        } catch (error) {
            throw error;
        }
    },
};

export default TorneoService;
