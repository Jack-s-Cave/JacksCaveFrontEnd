import { useEffect, useState } from 'react';
import './cave.css';

type MousePosition = {
    x: number;
    y: number;
}

const Cave = () => {
    const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);
    
    const [images, setImages] = useState({
        inside: '/cave_imgs/IN.svg',
        middle: '/cave_imgs/MID.svg',
        outside: '/cave_imgs/OUT.svg'
    });

    // Detectar modo dark/light
    useEffect(() => {
        const updateImages = (e?: MediaQueryListEvent) => {
            const darkMode = e ? e.matches : window.matchMedia('(prefers-color-scheme: dark)').matches;

            setImages({
                inside: darkMode ? '/cave_imgs/IN-dark.svg' : '/cave_imgs/IN-light.svg',
                middle: darkMode ? '/cave_imgs/MID-dark.svg' : '/cave_imgs/MID-light.svg',
                outside: darkMode ? '/cave_imgs/OUT-dark.svg' : '/cave_imgs/OUT-light.svg',
            });
        };

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        // Set inicial
        updateImages();

        // Escuchar cambios de tema
        mediaQuery.addEventListener('change', updateImages);

        return () => {
            mediaQuery.removeEventListener('change', updateImages);
        };
    }, []);

    // Mouse y resize
    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setMousePosition({ x: event.clientX, y: event.clientY });
        };

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setWindowHeight(window.innerHeight);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const moveElement = (_element: string, sensitivity: number = 10) => {
        const moveX = (mousePosition.x - window.innerWidth / 2) / sensitivity;
        const moveY = (mousePosition.y - window.innerHeight / 2) / sensitivity;

        if (windowWidth > 768) {            
            return `translateY(-50%) translate(${moveX}px, ${moveY}px)`;
        } else {
            // Mobile small screens
            if (windowWidth / windowHeight >= 1) {                
                return `translate(0%, -50%)`;            
            }
            return `translate(-50%, -50%)`;    
        }
    };

    return (
        <div className='cave-wrapper'>
            <div className='cave-text'>
                <h1 className='cave-tittle'>JACK'S CAVE</h1>
                <h5 className='cave-subtittle'>El lugar de tecnología para dragones</h5>
            </div>
                
            <img
                className='cave-inside'
                src={images.inside}
                alt="Inside"
                style={{ transform: moveElement('inside', 50) }}
            />
            <img
                className='cave-middle'
                src={images.middle}
                alt="Middle"
                style={{ transform: moveElement('middle', 80) }}
            />
            
            <div className='cave-outside-wrapper'>
                <img
                    className='cave-outside'
                    src={images.outside}
                    alt="Outside"
                />
            </div>            
        </div>
    );
};

export default Cave;
