import { Link, Outlet } from 'react-router-dom';
import Icon from '../assets/copaserranaicon.png';
import { RiAccountCircleFill } from 'react-icons/ri';

const Navbar = () => {
    return (
        <div className="">
            <nav className="shadow-md p-4 mb-10">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/">
                        <img src={Icon} className="max-w-12"></img>
                    </Link>
                    <div className="flex space-x-4 font-bold text-lg text-secundary">
                        <Link to="/" className="border-b border-terciary">
                            Inicio
                        </Link>
                    </div>
                    <div className="text-2xl text-terciary">
                        <RiAccountCircleFill />
                    </div>
                </div>
            </nav>

            <Outlet />
        </div>
    );
};

export default Navbar;
