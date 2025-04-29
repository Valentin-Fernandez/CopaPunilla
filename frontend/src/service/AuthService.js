import axios from './Axios.js';
const API_URL = `${process.env.REACT_APP_API_URL}`;

const AuthService = {
    checkAuth: async () => {
        try {
            const response = await axios.get(`${API_URL}/auth/check`, { withCredentials: true });
            if (response.status === 200) {
                return true; // Usuario autenticado
            }
            return false; // Usuario no autenticado
        } catch (error) {
            throw error;
        }
    },

    login: async (username, password) => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, { username, password }, { withCredentials: true });
            if (response.status === 200) {
                return response.data; // Devuelve los datos del usuario autenticado
            }
            throw new Error('Error en la autenticación');
        } catch (error) {
            throw error;
        }
    },
};

export default AuthService;
