import React, { useEffect, useState } from 'react';
import './cave.css';

const Cave = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

    useEffect(() => {
        const handleMouseMove = (event) => {
            setMousePosition({
                x: event.clientX,
                y: event.clientY
            });
        };

        const handleResize = () => {
            setWindowWidth(window.innerWidth); // Update window width on resize
            setWindowHeight(window.innerHeight);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize)

        // Clean up the event listener
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const moveElement = (element, sensitivity = 10) => {
        
        const moveX = (mousePosition.x - window.innerWidth / 2) / sensitivity;
        const moveY = (mousePosition.y - window.innerHeight / 2) / sensitivity;
        if (windowWidth > 768){            
            return `translateY(-50%) translate(${moveX}px, ${moveY}px)`;

        }else{
            // This is for small mobile screens
            if (windowWidth/windowHeight >= 1) {                
                return `translate(0%, -50%)`;            
            }

            return `translate(-50%, -50%)`;    
        }
        
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
                    style={{ transform: `${moveElement('inside', 50)}` }}
                />
                <img
                    className='cave-middle'
                    src="/cave_imgs/MID.svg"
                    alt="Middle"
                    style={{ transform: `${moveElement('middle', 80)}` }}
                />
            
            <div className='cave-outside-wrapper'>
                <img className='cave-outside' src="/cave_imgs/OUT.svg" alt="Outside" />
            </div>            
        </div>
        
        </>
    );
};

export default Cave;