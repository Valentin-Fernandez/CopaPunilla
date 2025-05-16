import Elencuentro from '../assets/elencuentro.png';
import Cuevabar from '../assets/cuevabarsponsor.png';

const Footer = () => {
    return (
        <div className="bg-secundary text-primary p-4 text-center flex items-center justify-center flex-col mt-auto">
            <div className="flex items-center flex-col justify-center">
                <h2 className="text-lg">Sponsored By</h2>
                <div className="flex items-center justify-center">
                    <img src={Elencuentro} className="max-w-16" alt="El Encuentro"></img>
                    <img src={Cuevabar} className="max-w-16" alt="Cueva Bar"></img>
                </div>
            </div>
            <footer className="text-sm">
                <p>© 2025 Copa Punilla. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default Footer;
