import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';
import { WrapButton } from '../components/Btn';
import Footer from '../components/Footer';

function NotFound({
  title = 'Page not found',
  message = "The page you're looking for doesn't exist or has been moved.",
  ctaLabel = 'Back to Home',
  ctaHref = '/'
}) {
  const navigate = useNavigate();

  return (
    <div className="notfound-page">
      <div className="grid-overlay" />
      <div className="notfound-content">
        <p className="notfound-eyebrow">404</p>
        <h1>{title}</h1>
        <p className="notfound-text">{message}</p>
        <div className="notfound-actions">
          <WrapButton className="notfound-btn" onClick={() => navigate(ctaHref)}>
            {ctaLabel}
          </WrapButton>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default NotFound;

