import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import './navbar.css';

type NavBarProps = {
    isSearchBar?: boolean;
}

type ArticleResult = {
    id: number;
    Titulo: string;
    Descripcion: string;
    fecha_de_publicacion: string;
    author_profile?: {
        nombre: string;
    }
}

const NavBar: React.FC<NavBarProps> = ({ isSearchBar }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [logo, setLogo] = useState('');
    
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<ArticleResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const searchWrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const setLogoBasedOnTheme = (e?: MediaQueryListEvent) => {
            const darkModeOn = e ? e.matches : window.matchMedia('(prefers-color-scheme: dark)').matches;
            setLogo(darkModeOn ? '/logos/jacks-text-dark.svg' : '/logos/jacks-text-light.svg');
        };

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setLogoBasedOnTheme();
        mediaQuery.addEventListener('change', setLogoBasedOnTheme);

        return () => {
            mediaQuery.removeEventListener('change', setLogoBasedOnTheme);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target as Node)) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase();
            // if (key === 'b') navigate('/blog');
            // else if (key === 'p') navigate('/podcast');
            // else if (key === 'n') navigate('/aboutus');
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [navigate]);

    const handleSearch = async () => {
        if (!searchTerm.trim()) return;

        setIsSearching(true);
        setShowResults(false);

        try {
            const response = await fetch(
                `http://localhost:1337/api/article-mds?filters[$or][0][Titulo][$containsi]=${searchTerm}&filters[$or][1][author_profile][nombre][$containsi]=${searchTerm}&populate=*`
            );

            const data: { data: ArticleResult[] } = await response.json();
            console.log('Resultados:', data.data); 
            setSearchResults(data.data || []);
            setShowResults(true);
        } catch (error) {
            console.error('Error buscando artículos:', error);
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const goToArticle = (articleId: number) => {
        navigate(`/blogpost/${articleId}`);
        setShowResults(false);
        setSearchTerm('');
    };

    const showSearchBar = ['/blog', '/blogpost', '/author'].some(path => 
        location.pathname.startsWith(path)
    );

    return (
        <nav className='nav-bar'>
            <div className="nav-left">
                <img 
                    className="header-logo" 
                    src={logo} 
                    alt="Logo"
                    onClick={() => navigate('/')}
                />
            </div>

            {showSearchBar && (
                <div className="search-bar-wrapper" ref={searchWrapperRef}>
                    <div className='search-bar-section'>
                        <button 
                            className='search-button'
                            onClick={handleSearch}
                            disabled={isSearching}
                        >
                            <FaSearch />
                        </button>
                        <input 
                            className='input-section' 
                            type="text" 
                            placeholder={isSearching ? 'Buscando...' : 'Buscar...'}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={isSearching}
                        />
                    </div>

                    {showResults && (
                        <div className="search-results-container">
                            {searchResults.length === 0 ? (
                                <div className="no-results">
                                    No se encontraron resultados para "{searchTerm}"
                                </div>
                            ) : (
                                <>
                                    <div className="results-header">
                                        {searchResults.length} resultado{searchResults.length !== 1 ? 's' : ''}
                                    </div>
                                    {searchResults.map((article) => (
                                        <div
                                            key={article.id}
                                            onClick={() => goToArticle(article.id)}
                                            className="result-item"
                                        >
                                            <div className="result-title">
                                                {article.Titulo}
                                            </div>
                                            <div className="result-metadata">
                                                <span>
                                                    {article.author_profile?.nombre || 'Anónimo'}
                                                </span>
                                                <span>
                                                    {new Date(article.fecha_de_publicacion).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    )}
                </div>
            )}

            <ul className="nav-right">
                <li className='nav-bar-item' onClick={() => navigate('/blog')}>[B] Blog</li>
                <li className='nav-bar-item' onClick={() => navigate('/podcast')}>[P] Podcast</li>
                <li className='nav-bar-item' onClick={() => navigate('/aboutus')}>[N] Nosotros</li>
            </ul>
        </nav>
    );
}

export default NavBar;