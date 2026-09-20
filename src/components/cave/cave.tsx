import { useEffect, useState } from 'react';
import './cave.css';

type MousePosition = {
  x: number;
  y: number;
}

const CAVE_IMAGES = {
  dark: {
    inside:  '/cave_imgs/IN-dark.svg',
    middle:  '/cave_imgs/MID-dark.svg',
    outside: '/cave_imgs/OUT-dark.svg',
  },
  light: {
    inside:  '/cave_imgs/IN-light.svg',
    middle:  '/cave_imgs/MID-light.svg',
    outside: '/cave_imgs/OUT-light.svg',
  }
}

const Cave = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) =>
      setMousePosition({ x: e.clientX, y: e.clientY });
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

  const images = isDark ? CAVE_IMAGES.dark : CAVE_IMAGES.light;

  const moveElement = (sensitivity: number = 10) => {
    const moveX = (mousePosition.x - window.innerWidth / 2) / sensitivity;
    const moveY = (mousePosition.y - window.innerHeight / 2) / sensitivity;
    if (windowWidth > 768) {
      return `translateY(-50%) translate(${moveX}px, ${moveY}px)`;
    }
    return windowWidth / windowHeight >= 1
      ? `translate(0%, -50%)`
      : `translate(-50%, -50%)`;
  };

  return (
    <div className='cave-wrapper'>
      <div className='cave-text'>
        <h1 className='cave-tittle'>JACK'S CAVE</h1>
        <h5 className='cave-subtittle'>El lugar de tecnología para dragones</h5>
      </div>
      <img className='cave-inside'   src={images.inside}  alt="Inside"   style={{ transform: moveElement(50) }} />
      <img className='cave-middle'   src={images.middle}  alt="Middle"   style={{ transform: moveElement(80) }} />
      <div className='cave-outside-wrapper'>
        <img className='cave-outside' src={images.outside} alt="Outside" />
      </div>
    </div>
  );
};

export default Cave;
