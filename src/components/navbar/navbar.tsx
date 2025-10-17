import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import './navbar.css';

type NavBarProps = {
    isSearchBar?: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ isSearchBar }) => {
    const navigate = useNavigate();
    const location = useLocation(); // <-- Hook para saber la ruta actual
    const [logo, setLogo] = useState(''); 

    //Detección de modo claro
    useEffect(() => {
        const setLogoBasedOnTheme = (e?: MediaQueryListEvent) => {
            const darkModeOn = e ? e.matches : window.matchMedia('(prefers-color-scheme: dark)').matches;
            setLogo(darkModeOn ? '/logos/jacks-text-dark.svg' : '/logos/jacks-text-light.svg');
        };

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setLogoBasedOnTheme();
        mediaQuery.addEventListener('change', setLogoBasedOnTheme);

        return () => {
            mediaQuery.removeEventListener('change', setLogoBasedOnTheme);
        };
    }, []);

    // Listener para teclas
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase();
            if (key === 'b') navigate('/blog');
            else if (key === 'p') navigate('/podcast');
            else if (key === 'n') navigate('/aboutus');
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [navigate]);

    // Rutas donde queremos mostrar la barra de búsqueda
    const showSearchBar = ['/blog', '/blogpost', '/author'].includes(location.pathname);

    return (
        <nav className='nav-bar'>
            <div className="nav-left">
                <img 
                    className="header-logo" 
                    src={logo} 
                    alt="Logo"
                    onClick={() => navigate('/')}
                />
            </div>

            {showSearchBar && (
                <div className='search-bar-section'>
                    <button className='search-button'>
                        <FaSearch />
                    </button>
                    <input className='input-section' type="text" placeholder='Buscar...'></input>
                </div>
            )}

            <ul className="nav-right">
                <li className='nav-bar-item' onClick={() => navigate('/blog')}>[B] Blog</li>
                <li className='nav-bar-item' onClick={() => navigate('/podcast')}>[P] Podcast</li>
                <li className='nav-bar-item' onClick={() => navigate('/aboutus')}>[N] Nosotros</li>
            </ul>
        </nav>
    );
}

export default NavBar;