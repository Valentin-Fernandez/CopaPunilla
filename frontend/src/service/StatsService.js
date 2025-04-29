import axios from './Axios.js';

const API_URL = `${process.env.REACT_APP_API_URL}`;

const StatsService = {
    getAll: async () => {
        try {
            const response = await axios.get(`${API_URL}/stats`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getGoleadores: async id => {
        try {
            const response = await axios.get(`${API_URL}/torneos/${id}/goleadores`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default StatsService;
