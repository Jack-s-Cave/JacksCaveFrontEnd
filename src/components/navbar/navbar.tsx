import React from 'react';
import { useNavigate } from 'react-router-dom';
import './navbar.css';

type NavBarProps = {
    isLandingPage?: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ isLandingPage }) => {
    const navigate = useNavigate();

    return (
        <nav className='nav-bar'>
            <ul>
                <li
                    className='nav-bar-item'
                    onClick={() => navigate('/blog')}
                >
                    [B] Blog
                </li>
                <li
                    className='nav-bar-item'
                    onClick={() => navigate('/podcast')}
                >
                    [P] Podcast
                </li>
                <li
                    className='nav-bar-item'
                    onClick={() => navigate('/aboutus')}
                >
                    [N] Nosotros
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
