import { FaGithub, FaTwitter } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <span className="footer-logo">FlipFrame</span>
          <p className="footer-tagline">Lightweight hosting for HTML snippets.</p>
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          <a href="/#features">Features</a>
          <a href="/#pricing">Pricing</a>
          <a href="/docs" rel="noreferrer">Docs</a>
          <a href="mailto:syntaxamit@proton.me">Contact</a>
        </nav>
        <div className="footer-social">
          <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
          <a href="https://twitter.com/" target="_blank" rel="noreferrer" aria-label="Twitter"><FaTwitter /></a>
        </div>
      </div>
      <div className="footer-legal">
        <span>© {year} FlipFrame. All rights reserved.</span>
      </div>
    </footer>
  );
}

