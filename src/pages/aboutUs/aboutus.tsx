import NavBar from '../../components/navbar/navbar';
import { useState } from 'react';
import './aboutus.css';
import { useMembers } from 'hooks/useMembers';

const AboutUs = () => {
  const { currentMembers, previousMembers, loading, error } = useMembers()

  const years = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011];
  const [selectedYear, setSelectedYear] = useState(2024)

  const associationInfo = {
    name: "AECCTI",
    subtitle1: "UNA ASOCIACIÓN",
    subtitle2: "DE ESTUDIANTES",
    logo: null, // Se cargará de la DB
    description: "Descripción de la asociación que se cargará desde la base de datos..."
  };

  return (
    <main>
      <NavBar />
      <div className="about-us">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-top">
              <div className="logo-section">
                <h1 className="aeccti-title">{associationInfo.name}</h1>
                <h2 className="association-subtitle">{associationInfo.subtitle1}</h2>
                <div className="last-line">
                  <span className="de-text">DE</span>
                  <span className="estudiantes-text">ESTUDIANTES</span>
                </div>
              </div>
              {/* POSIBLE BUG EN EL FUTURO */}
              <div className="logo-placeholder">
                <span>Imagen Asociacion (bonitos y gorditos)</span>
              </div>
            </div>

            <div className="hero-description">
              <p>{associationInfo.description}</p>
            </div>
          </div>
        </section>

        {/* Years Navigation */}
        <section className="years-section">
          <div className="years-nav">
            {years.map((year) => (
              <button 
                key={year} 
                className={`year-btn ${year === selectedYear ? 'active' : ''}`}
                onClick={() => setSelectedYear(year)}
              >
                {year}
              </button>
            ))}
          </div>
        </section>

        {/* Members Section */}
        <section className="members-section">        
          <h2 className="members-title">
            {selectedYear === 2024 ? 'MIEMBROS ACTUALES' : `MIEMBROS ${selectedYear}`}
          </h2>

          <div className="members-grid">
            {(selectedYear === 2024 ? currentMembers : previousMembers).map((member) => (
              <div key={member.id} className="member-card">
                <div className="member-image">
                  {/* Placeholder para imagen del miembro */}
                  <div className="image-placeholder">
                    <span>Foto</span>
                  </div>
                </div>
                <div className="member-info">
                  <h3 className="member-name">{member.name}</h3>
                  <p className="member-description">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default AboutUs;
