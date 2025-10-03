import React from 'react';
import './aboutus.css';

// Interfaces de TypeScript
interface Member {
  id: number;
  nombre: string;
  Cargo: string;
  year_estudiante: string;
  curriculum: string;
  foto?: {
    data?: {
      attributes?: {
        url: string;
      };
    };
  };
}

interface Association {
  id: number;
  documentId: string;
  year: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Miembro?: Member[];
}

const AboutUs: React.FC = () => {
  // ==================== HOOKS ====================
  const [associations, setAssociations] = React.useState<Association[]>([]);
  const [selectedYear, setSelectedYear] = React.useState<number | null>(null);
  const [loading, setLoading] = React.useState(true);

  // ==================== EFFECTS ====================
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:1337/api/asociaciones?sort[0]=year:desc&populate[Miembro][populate][foto][fields][0]=url');
        const data: { data: Association[] } = await response.json();
        
        if (data.data && data.data.length > 0) {
          setAssociations(data.data);
          setSelectedYear(data.data[0].year);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ==================== COMPUTED VALUES ====================
  const availableYears = associations
    .filter(assoc => assoc.year)
    .map(assoc => assoc.year)
    .sort((a, b) => b - a);

  const currentAssociation = associations.find(assoc => assoc.year === selectedYear);
  const members = currentAssociation?.Miembro || [];

  /* ADD TO ORDER TO TYPE OF MEMBER  */
  
  // ==================== HELPER FUNCTIONS ====================
  const getImageUrl = (member: Member): string | null => {
    if (member.foto?.data?.attributes?.url) {
      const url = member.foto.data.attributes.url;
      return url.startsWith('http') ? url : `http://localhost:1337${url}`;
    }
    return null;
  };

  // ==================== CONSTANTS ====================
  const associationInfo = {
    name: "AECCTI",
    subtitle1: "UNA ASOCIACIÓN",
    subtitle2: "DE ESTUDIANTES",
    description: "La Asociación de Estudiantes de Ciencias de la Computación y Tecnologías de la Información (AECCTI) es una organización estudiantil dedicada a representar y apoyar a los estudiantes de nuestra carrera."
  };

  // ==================== EARLY RETURNS ====================
  if (loading) {
    return (
      <div className="about-us">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '50vh',
          fontSize: '1.2rem',
          color: 'var(--primary-color1)'
        }}>
          Cargando datoooos...
        </div>
      </div>
    );
  }

  if (associations.length === 0) {
    return (
      <div className="about-us">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '50vh',
          fontSize: '1.2rem',
          color: '#666',
          textAlign: 'center'
        }}>
          <div>
            <p>No hay datos de asociaciones disponibles</p>
            <p style={{ fontSize: '0.9rem', marginTop: '1rem' }}>
              Verifica que el servidor Strapi esté ejecutándose en localhost:1337
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ==================== MAIN RENDER ====================
  return (
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
      {availableYears.length > 0 && (
        <section className="years-section">
          <div className="years-nav">
            {availableYears.map((year) => (
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
      )}

      {/* Members Section */}
      <section className="members-section">        
        <h2 className="members-title">
          MIEMBROS {selectedYear}
        </h2>
        
        {members.length > 0 ? (
          <div className="members-grid">
            {members.map((member: Member) => (
              <div key={member.id} className="member-card">
                <div className="member-image">
                  {getImageUrl(member) ? (
                    <img 
                      src={getImageUrl(member)!} 
                      alt={member.nombre}
                      style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '4px solid var(--primary-color3)'
                      }}
                    />
                  ) : (
                    <div className="image-placeholder">
                      <span>Foto</span>
                    </div>
                  )}
                </div>
                <div className="member-info">
                  <h3 className="member-name">
                    {member.nombre}
                    {member.Cargo && (
                      <div style={{
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        color: 'var(--primary-color4)',
                        marginTop: '0.3rem'
                      }}>
                        {member.Cargo}
                      </div>
                    )}
                    {member.year_estudiante && (
                      <div style={{
                        fontSize: '0.8rem',
                        fontWeight: '400',
                        color: '#666',
                        marginTop: '0.2rem'
                      }}>
                        {member.year_estudiante}
                      </div>
                    )}
                  </h3>
                  <p className="member-description">
                    {member.curriculum || 'Sin información disponible'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem',
            color: '#666',
            fontSize: '1.1rem'
          }}>
            No hay miembros registrados para el año {selectedYear}
          </div>
        )}
      </section>
    </div>
  );
};

export default AboutUs;