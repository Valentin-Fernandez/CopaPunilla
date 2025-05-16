import AppRouter from './router.js';
import { ToastContainer } from 'react-toastify';

function App() {
    return (
        <div className="bg-primary">
            <AppRouter />
            <ToastContainer />
        </div>
    );
}

export default App;
