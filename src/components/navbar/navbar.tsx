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
                <div>
                    <img className="header-logo" src="https://raw.githubusercontent.com/Jack-s-Cave/Assets/refs/heads/main/Icons/logo-text.svg" alt="Logo"></img>
                </div>
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
