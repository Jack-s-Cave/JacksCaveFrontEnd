import React, { useEffect, useState } from 'react';
import './landing.css';
import RecentCard from '../components/landingpage/recentCard';


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
                        <RecentCard />
                        <RecentCard />
                        <RecentCard />
                        <RecentCard />
                        <RecentCard />
                        <RecentCard />
                    </div>
                </div>
                <div className='landing-subSection'>
                    <div className='landing-subT-section'>
                        <h1 className='landing-subT'>AECCTI NEWS</h1>
                        <button className='see-more'>Ver Más <strong>+</strong></button>
                    </div>
                    <div className='landing-news-section'>
                        
                    </div>
                </div>
                <div className='landing-subSection'>
                    <div className='landing-subT-section'>
                        <h1 className='landing-subT'>PODCAST ENTERATE!</h1>
                        <button className='see-more'>Ver Más <strong>+</strong></button>
                    </div>
                    <div className='landing-podcast-section'>
                        
                    </div>
                </div>
                <footer> Made with<strong> REACT </strong>by actual live dragons</footer>
            </div>
            
        </>
    );
}

export default LandingPage;