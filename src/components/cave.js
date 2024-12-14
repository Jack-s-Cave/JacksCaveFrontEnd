import React, { useEffect, useState } from 'react';
import './cave.css';

const Cave = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event) => {
            setMousePosition({
                x: event.clientX,
                y: event.clientY
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Clean up the event listener
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const moveElement = (element, sensitivity = 10) => {
        const moveX = (mousePosition.x - window.innerWidth / 2) / sensitivity;
        const moveY = (mousePosition.y - window.innerHeight / 2) / sensitivity;
        return `translate(${moveX}px, ${moveY}px)`;
    };

    return (
        <>    
        <div className='cave-wrapper'>
            <div className='cave-text'>
                <h1 className='cave-tittle'>JACK'S CAVE</h1>
                <h5 className='cave-subtittle'>El lugar de tecnología para dragones</h5>
            </div>

            <img
                className='cave-inside'
                src="/cave_imgs/IN.svg"
                alt="Inside"
                style={{ transform: `translateY(-50%) ${moveElement('inside', 50)}` }}
            />
            <img
                className='cave-middle'
                src="/cave_imgs/MID.svg"
                alt="Middle"
                style={{ transform: `translateY(-50%) ${moveElement('middle', 80)}` }}
            />
            <div className='cave-outside-wrapper'>
                <img className='cave-outside' src="/cave_imgs/OUT.svg" alt="Outside" />
            </div>            
        </div>
        
        </>
    );
};

export default Cave;