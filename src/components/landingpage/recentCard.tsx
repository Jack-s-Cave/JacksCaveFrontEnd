import React from 'react';
import './recentCard.css';

const RecentCard = () => {
    return (
        <div className='recent-card'>
            <div className='recentC-header'>
                <p>Jun 3, 2025</p>
                <p>Daniel Rayo</p>
            </div>
            <img
                className='recent-image'
                src="https://www.patasencasa.com/sites/default/files/2024-07/meme-del-gato-riendo_0.jpg"
                alt="Imagen de ejemplo"
            />
            <h3 className='recentC-title'>Título Placeholder un poco mas largo pruebas de si pongo aun mas</h3>
            <div className='recentC-tags'>
                <p>#tags</p>
                <p>#gato</p>
                <p>#jeje</p>
                <p>#gato2</p>
                <p>#gato3</p>
                <p>#gato4</p>
            </div>
        </div>
    );
};

export default RecentCard;
