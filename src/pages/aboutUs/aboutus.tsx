import NavBar from '../../components/navbar/navbar';
import './aboutus.css';
import { useAsociaciones } from 'hooks/useMembers';
import { MemberCard } from 'components/members/memberCard';
import ErrorMessage from 'components/common/errorMessage';
import Spinner from 'components/common/spinner';

const AboutUs = () => {
  const { years, selectedYear, setSelectedYear, members, loading, error } = useAsociaciones()
  const mostRecentYear = years[0]

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
            {selectedYear === mostRecentYear ? 'MIEMBROS ACTUALES' : `MIEMBROS ${selectedYear}`}
          </h2>

          <div className="members-grid">
            {loading
              ? <Spinner />
              : error
                ? <ErrorMessage />
                : members?.map((member) => (
                    <MemberCard key={member.id} member={member} />
                  ))
            }
          </div>
        </section>
      </div>
    </main>
  );
};

export default AboutUs;
