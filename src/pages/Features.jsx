import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBolt, FaShieldAlt, FaLink, FaCode, FaCloudUploadAlt, FaClipboardCheck, FaMobileAlt } from 'react-icons/fa';
import './Features.css';
import { WrapButton } from '../components/Btn';
import Footer from '../components/Footer';

function Features() {
  const navigate = useNavigate();

  const featureCards = [
    { icon: <FaCloudUploadAlt />, title: 'Paste & publish', text: 'Drop in HTML/CSS/JS and get a live link instantly. No build step or deploy queues.' },
    { icon: <FaShieldAlt />, title: 'Safer hosting', text: 'We block risky tags (iframes/objects) and javascript: URLs before publishing.' },
    { icon: <FaBolt />, title: 'Fast previews', text: 'Sandboxed previews open in milliseconds with blob-backed iframes for reliable script execution.' },
    { icon: <FaLink />, title: 'Shareable links', text: 'Every snippet gets a short URL you can copy, open, or send—viewers don’t need an account.' },
    { icon: <FaClipboardCheck />, title: 'Smart limits', text: 'Built-in rate limiting and a 3-site cap keep your workspace tidy and prevent spam.' },
    { icon: <FaMobileAlt />, title: 'Responsive UI', text: 'Dashboards and docs stay usable on phones with touch-friendly controls.' },
  ];

  const steps = [
    'Sign up or log in to your dashboard.',
    'Paste valid HTML/CSS/JS and hit Publish.',
    'Share the generated link—viewers see your page in a sandbox.',
  ];

  return (
    <div className="features-page">
      <div className="grid-overlay" />
      <div className="features-content">
        <header className="features-hero">
          <p className="features-eyebrow">Product tour</p>
          <h1>Everything you need to host live HTML snippets.</h1>
          <p className="features-lead">
            FlipFrame keeps publishing simple: paste, publish, share. Safety checks, rate limits,
            and responsive UI are all built in—so you can demo ideas without setup.
          </p>
          <div className="features-actions">
            <WrapButton className="features-primary" onClick={() => navigate('/login')}>
              Try the dashboard
            </WrapButton>
            <button className="features-ghost-btn" onClick={() => navigate('/docs')}>
              View docs
            </button>
          </div>
          <div className="features-meta">
            <div className="meta-pill">No viewer login</div>
            <div className="meta-pill">Sandboxed previews</div>
            <div className="meta-pill">3 snippets per account</div>
          </div>
        </header>

        <section className="features-grid">
          {featureCards.map(card => (
            <article key={card.title} className="feature-card">
              <div className="feature-icon" aria-hidden>{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </section>

        <section className="features-cta">
          <div className="cta-text">
            <p className="section-eyebrow">How it works</p>
            <h2>Ship your snippet in 3 steps</h2>
            <ol>
              {steps.map(step => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <p className="cta-note">
              Snippets render from your HTML inside a sandboxed iframe with CSP rules that allow scripts and forms
              while keeping viewers safe.
            </p>
          </div>
          <div className="cta-card">
            <div className="cta-icon" aria-hidden><FaCode /></div>
            <h3>Zero-config hosting</h3>
            <p>Bring your own HTML/CSS/JS—no bundlers, no builds, just paste and publish.</p>
            <WrapButton className="cta-btn" onClick={() => navigate('/login')}>
              Start now
            </WrapButton>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Features;
