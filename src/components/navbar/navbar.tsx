import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './navbar.css';

type NavBarProps = {
    isLandingPage?: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ isLandingPage }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase();
            if (key === 'b') navigate('/blog');
            else if (key === 'p') navigate('/podcast');
            else if (key === 'n') navigate('/aboutus');
        };

        window.addEventListener('keydown', handleKeyPress);

        // Cleanup para remover el listener cuando el componente se desmonte
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [navigate]);

    return (
        <nav className='nav-bar'>
            <div className="nav-left">
                <img 
                    className="header-logo" 
                    src="https://raw.githubusercontent.com/Jack-s-Cave/Assets/refs/heads/main/Icons/logo-text.svg" 
                    alt="Logo"
                    onClick={() => navigate('/')}
                />
            </div>
            <ul className="nav-right">
                <li className='nav-bar-item' onClick={() => navigate('/blog')}>[B] Blog</li>
                <li className='nav-bar-item' onClick={() => navigate('/podcast')}>[P] Podcast</li>
                <li className='nav-bar-item' onClick={() => navigate('/aboutus')}>[N] Nosotros</li>
            </ul>
        </nav>
    );
}

export default NavBar;
