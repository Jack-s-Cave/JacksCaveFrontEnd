import './siteFooter.css';
import { DEVELOPERS, SPECIAL_THANKS } from 'data/credits';

const SiteFooter = () => {
  return (
    <footer className="site-footer">
      <p>
        <span className="site-footer-label">Reconocimiento especial a los desarrolladores:</span>{' '}
        {DEVELOPERS.join(' · ')}{' '}
        <span className="site-footer-aside">(en orden de contribución)</span>
      </p>
      <p>
        <span className="site-footer-label">Agradecimiento especial a</span>{' '}
        {SPECIAL_THANKS.map((thanks, index) => (
          <span key={thanks.name}>
            {index > 0 && ', y a '}
            {thanks.name}, {thanks.note}
          </span>
        ))}
        . Sin su apoyo este proyecto no habría sido posible.
      </p>
    </footer>
  );
};

export default SiteFooter;
