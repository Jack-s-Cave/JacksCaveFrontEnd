import React, { useEffect, useState } from 'react';
import './cave.css';

const Cave = (props) => {
    return (    
    <div className='cave-wrapper'>
        
        <img className='cave-inside' src="/cave_imgs/IN.svg" alt="Inside" />
        <img className='cave-middle' src="/cave_imgs/MID.svg" alt="Middle" />
        
        <div className='cave-outside-wrapper' >
            <img className='cave-outside' src="/cave_imgs/OUT.svg" alt="Outside" />
        </div>        
    </div>    
    );
};

export default Cave;