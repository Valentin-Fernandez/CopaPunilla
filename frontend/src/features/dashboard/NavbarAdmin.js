import React, { useState } from 'react';
import Logo from '../../assets/copaserranaicon.png';

const NavbarAdmin = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-secundaryDark p-4">
            <div className="container mx-auto flex justify-between items-center">
                <img src={Logo} className="w-10"></img>
                <div className="text-primary text-lg font-bold">Dashboard</div>
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-white focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden bg-secundaryDark mt-2 flex flex-col items-center">
                    <a href="/" className="text-base text-primary mb-2">
                        Inicio
                    </a>
                </div>
            )}
        </nav>
    );
};

export default NavbarAdmin;
