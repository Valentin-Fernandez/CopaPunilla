import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../service/AuthService.js';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await AuthService.login(username, password);
            if (response) {
                // Redirigir al usuario a la página de inicio o dashboard después de iniciar sesión
                navigate('/dashboard');
            } else {
                alert('Error al iniciar sesión. Verifica tus credenciales.');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Iniciar Sesión</h1>
            <input type="text" placeholder="Usuario" value={username} onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
            <button type="submit">Iniciar Sesión</button>
        </form>
    );
};

export default Login;
