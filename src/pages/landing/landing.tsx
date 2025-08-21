import React, { useEffect, useState } from 'react';
import './landing.css';
import RecentCard from '../../components/landingpage/recentCard';
import NewsCard from '../../components/landingpage/newsCard';
import PodcastCarousel from '../../components/landingpage/podcastCarousel';

//Place Holder
const newsData = [
  {
    title: 'Primera noticia mas larga para probar la mmda de esto aaa ya puessss solo se esta haciendo mas largo',
    author: 'Diego Duarte',
    date: 'Jun 23, 2025',
    imageSrc: 'https://i.pinimg.com/236x/51/30/77/5130770e4cdec78276415c649837bef0.jpg',
    imageDescription: 'Fig 2. Gatito feliz al sol porque dio un pencazo, propername placename blah blah blah',
  },
  {
    title: 'Segunda noticia',
    author: 'Sofía Rayo',
    date: 'Jun 22, 2025',
    imageSrc: 'https://i.pinimg.com/736x/a0/f6/d8/a0f6d8722e2ca13e433591c68bc5401f.jpg',
    imageDescription: 'Fig 2. Gato pensativo alabado sea',
  },
  {
    title: 'Tercera noticia',
    author: 'Carlos Luna',
    date: 'Jun 21, 2025',
    imageSrc: 'https://i.imgflip.com/4/34tt3s.jpg',
    imageDescription: 'Fig 1. Gato con corbata haciendo una pose siu',
  },
];

const videoList = [
  {
    thumbnail: 'https://img.youtube.com/vi/zlSbBsJYFGA/maxresdefault.jpg',
    title: 'Desarrollar videojuegos en Guatemala | EP 1 Dennis Aldana',
    date: 'Sept 19, 2024'
  },
  {
    thumbnail: 'https://img.youtube.com/vi/6guzh_QQKJA/maxresdefault.jpg',
    title: '¿Cómo ser estudiante y trabajar al mismo tiempo? | EP 2 Ludwing Cano',
    date: 'Oct 17, 2024'
  },
  {
    thumbnail: 'https://img.youtube.com/vi/qVDqPct6b_k/maxresdefault.jpg',
    title: 'Así piensan los contratistas en IT | #ep3 Alberto Suriano nos cuenta su experiencia al conseguir',
    date: 'Nov 28, 2024'
  }
];

type NavBarProps = {
    isLandingPage?: boolean;
}

const LandingPage: React.FC<NavBarProps> = ({ isLandingPage }) => {
    return(
        <>  <div className='landing-page'>
                <div className='landing-subSection'>
                    <div className='landing-subT-section'>
                        <h1 className='landing-subT'>RECIENTES</h1>
                        <button className='see-more'>Ver Más <strong>+</strong></button>
                    </div>
                    <div className='landing-recent-section'>
                        <RecentCard
                            date="Oct 30, 2024"
                            author="Francis Aguilar"
                            title="Título Placeholder un poco más largo para pruebas"
                            imageSrc="https://www.patasencasa.com/sites/default/files/2024-07/meme-del-gato-riendo_0.jpg"
                            tags={['tags', 'gato', 'jeje', 'gato2', 'gato3', 'gato4']}
                        />
                        <RecentCard
                            date="Jun 3, 2025"
                            author="Gustavo Gonzales"
                            title="Título Placeholder un poco más largo para pruebas"
                            imageSrc="https://www.patasencasa.com/sites/default/files/2024-07/meme-del-gato-riendo_0.jpg"
                            tags={['Sanitas', 'Teconologia', 'Videojuegos', 'gato2', 'gato3', 'gato4']}
                        />
                        <RecentCard
                            date="Jun 3, 2025"
                            author="Daniel Rayo"
                            title="Título Placeholder un poco más largo para pruebas un poco mas por si acaso"
                            imageSrc="https://www.patasencasa.com/sites/default/files/2024-07/meme-del-gato-riendo_0.jpg"
                            tags={['tags', 'gato', 'jeje', 'gato2', 'gato3', 'gato4', 'prueba']}
                        />
                        <RecentCard
                            date="Jun 3, 2025"
                            author="María Martinez"
                            title="Título Placeholder un poco más largo para pruebas"
                            imageSrc="https://www.patasencasa.com/sites/default/files/2024-07/meme-del-gato-riendo_0.jpg"
                            tags={['tags', 'gato', 'jeje', 'gato2', 'gato3', 'gato4']}
                        />
                        <RecentCard
                            date="Feb 17, 2025"
                            author="Diego Duarte"
                            title="Título Placeholder un poco más largo para pruebas"
                            imageSrc="https://www.patasencasa.com/sites/default/files/2024-07/meme-del-gato-riendo_0.jpg"
                            tags={['tags', 'gato', 'jeje', 'gato2', 'gato3', 'gato4']}
                        />
                        <RecentCard
                            date="Abr 7, 2025"
                            author="Sebastian Huertas"
                            title="Título Placeholder un poco más largo para pruebas"
                            imageSrc="https://www.patasencasa.com/sites/default/files/2024-07/meme-del-gato-riendo_0.jpg"
                            tags={['tags', 'gato', 'jeje', 'gato2', 'gato3', 'gato4']}
                        />
                    </div>
                </div>
                <div className='landing-subSection'>
                    <div className='landing-subT-section'>
                        <h1 className='landing-subT'>AECCTI NEWS</h1>
                        <button className='see-more'>Ver Más <strong>+</strong></button>
                    </div>
                    <div className='landing-news-section'>
                        <NewsCard newsList={newsData} />
                    </div>
                </div>
                <div className='landing-subSection'>
                    <div className='landing-subT-section'>
                        <h1 className='landing-subT'>PODCAST ENTERATE!</h1>
                        <button className='see-more'>Ver Más <strong>+</strong></button>
                    </div>
                    <PodcastCarousel videos={videoList} />
                    <div className='landing-podcast-section'>
                        
                    </div>
                </div>
                <footer> Made with<strong> REACT </strong>by actual live dragons</footer>
            </div>
            
        </>
    );
}

export default LandingPage;