import axios from './Axios.js';
const API_URL = `${process.env.REACT_APP_API_URL}`;

const JugadorService = {
    create: async jugador => {
        try {
            await axios.post(`${API_URL}/equipos/${jugador.equipo}/jugadores`, jugador);
        } catch (error) {
            throw error;
        }
    },

    update: async (jugador, id) => {
        try {
            await axios.put(`${API_URL}//jugadores/${id}`, jugador);
        } catch (error) {
            throw error;
        }
    },

    delete: async id => {
        try {
            await axios.delete(`${API_URL}/jugadores/${id}`);
        } catch (error) {
            throw error;
        }
    },
};

export default JugadorService;
