import React, { useEffect, useState } from 'react';
import './navbar.css';

const NavBar = ({isLandingPage}) => {
    return(
        <>
        <nav className='nav-bar'>
            <ul>
                <li className='nav-bar-item'>[B] Blog</li>
                <li className='nav-bar-item'>[P] Podcast</li>
                <li className='nav-bar-item'>[N] Nosotros</li>
            </ul> 
        </nav>
        </>
    );
}

export default NavBar;