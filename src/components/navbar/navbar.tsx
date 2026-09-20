import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './navbar.css';

type NavBarProps = {
  isLandingPage?: boolean;
  centerComponent?: React.ReactNode;
}

const NavBar = ({ isLandingPage, centerComponent }: NavBarProps) => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Inicializar tema desde localStorage o preferencia del sistema
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const dark = saved ? saved === 'dark' : prefersDark;
    setIsDark(dark);
    document.documentElement.classList.toggle('dark', dark);
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    document.documentElement.classList.toggle('dark', newDark);
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
  };

  const logo = isDark
    ? '/logos/jacks-text-dark.svg'
    : '/logos/jacks-text-light.svg';

  // Listener para teclas
  useEffect(() => {
    const isTypingTarget = (target: EventTarget | null) => {
      const el = target as HTMLElement | null;
      if (!el) return false;
      const tag = el.tagName;
      return tag === 'INPUT' || tag === 'TEXTAREA' || el.isContentEditable;
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      if (isTypingTarget(e.target)) return;
      const key = e.key.toLowerCase();
      if (key === 'b') navigate('/blogs');
      else if (key === 'p') navigate('/podcast');
      else if (key === 'n') navigate('/aboutus');
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [navigate]);

  const navTo = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <nav className='nav-bar'>
      <div className="nav-left">
        <img
            className="header-logo"
            src={logo}
            alt="Logo"
            onClick={() => navTo('/')}
        />
      </div>
      {centerComponent && <div className="nav-center">{centerComponent}</div>}
      <ul className={`nav-right ${isMenuOpen ? 'open' : ''}`}>
        <li className='nav-bar-item theme-toggle' onClick={toggleTheme}>
          {isDark ? <img className="light-bulb-logo-dark" src="/logos/light-bulb.svg" alt="Cambiar tema"/> : <img className="light-bulb-logo" src="/logos/light-bulb.svg" alt="Cambiar tema"/>}
        </li>
        <li className='nav-bar-item' onClick={() => navTo('/blogs')}>[B] Blog</li>
        <li className='nav-bar-item' onClick={() => navTo('/podcast')}>[P] Podcast</li>
        <li className='nav-bar-item' onClick={() => navTo('/aboutus')}>[N] Nosotros</li>
      </ul>
      <button
        className={`nav-hamburger ${isMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Abrir menú"
        aria-expanded={isMenuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  );
}

export default NavBar;
