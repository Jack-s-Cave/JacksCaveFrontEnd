import { useEffect, useState } from 'react';
import './errorMessage.css';

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="error-message-container">
      <img
        className="error-message-icon"
        src={isDark ? '/logos/jacks-icon-dark.svg' : '/logos/jacks-icon-light.svg'}
        alt=""
        aria-hidden="true"
      />
      <p className="error-message-text">
        {message ?? 'No se pudo cargar el contenido'}
      </p>
      <p className="error-message-subtext">
        Verifica tu conexión o intenta más tarde
      </p>
    </div>
  );
};

export default ErrorMessage;
