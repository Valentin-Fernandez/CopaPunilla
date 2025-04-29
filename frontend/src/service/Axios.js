import axios from 'axios';

// Configura la URL base de tu backend y habilita credenciales
const instance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/`, // Cambia esto según la URL de tu backend
    /* withCredentials: true, // Permite enviar y recibir cookies */
});

export default instance;
