import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../service/AuthService.js';
import Copa from '../assets/copaserranaicon.png';

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
        <div className="flex items-center justify-center h-screen bg-secundaryDark">
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
                <img src={Copa} className="w-[15%] md:w-[10%]"></img>
                <h1 className="font-bold text-terciary text-center text-xl mb-4">Iniciar Sesión</h1>
                <input
                    type="text"
                    placeholder="Usuario"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="outline-none bg-transparent border border-terciary rounded-md p-2 mb-4 text-primary"
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="outline-none bg-transparent border border-terciary rounded-md p-2 mb-4 text-primary"
                />
                <button type="submit" className="bg-terciary rounded-md p-2 text-primary">
                    Iniciar
                </button>
            </form>
        </div>
    );
};

export default Login;
