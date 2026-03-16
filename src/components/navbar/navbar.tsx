import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './navbar.css';

type NavBarProps = {
    isLandingPage?: boolean;
    centerComponent?: React.ReactNode;
}

const NavBar = ({ isLandingPage, centerComponent }: NavBarProps ) => {
    const navigate = useNavigate();
    const [logo, setLogo] = useState(''); 

    //Deteccion de modo claro
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
            if (key === 'b') navigate('/blogs');
            else if (key === 'p') navigate('/podcast');
            else if (key === 'n') navigate('/aboutus');
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [navigate]);

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
            {centerComponent}
            <ul className="nav-right">
                <li className='nav-bar-item' onClick={() => navigate('/blogs')}>[B] Blog</li>
                <li className='nav-bar-item' onClick={() => navigate('/podcast')}>[P] Podcast</li>
                <li className='nav-bar-item' onClick={() => navigate('/aboutus')}>[N] Nosotros</li>
            </ul>
        </nav>
    );
}

export default NavBar;
