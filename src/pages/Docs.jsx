import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShieldAlt, FaBolt, FaExternalLinkAlt, FaClipboardCheck, FaQuestionCircle } from 'react-icons/fa';
import './Docs.css';
import { WrapButton } from '../components/Btn';
import Footer from '../components/Footer';

function Docs() {
  const navigate = useNavigate();

  const quickSteps = [
    'Create an account or log in.',
    'Paste valid HTML/CSS/JS into the dashboard form.',
    'Click Publish to generate a shareable link like https://flipframe.app/abcd1234.',
    'Copy or open the link to view the hosted page in an isolated sandbox.'
  ];

  const guardrails = [
    { icon: <FaShieldAlt />, title: 'Safe by default', text: 'Dangerous tags such as embedded iframes/objects are blocked before publish.' },
    { icon: <FaBolt />, title: 'Rate limited', text: 'One submission every 2 seconds prevents accidental spam.' },
    { icon: <FaClipboardCheck />, title: '3-site cap', text: 'Host up to 3 live snippets per account to keep things tidy.' },
  ];

  const faqs = [
    { q: 'Can I use external assets?', a: 'Yes. Link to public CSS/JS/CDN files as usual. We only block javascript:/vbscript: URLs.' },
    { q: 'Is my code sandboxed?', a: 'Preview pages render inside a sandboxed iframe with an allowlist for scripts, forms, and popups.' },
    { q: 'What if my HTML is rejected?', a: 'Ensure the content contains valid tags, stays under 500KB, and avoids blocked patterns like raw iframes.' },
  ];

  const sampleHtml = `<!doctype html>
<html>
  <head>
    <title>FlipFrame Demo</title>
    <style>
      body { font-family: system-ui; padding: 24px; background: #f5f5f5; }
      .card { background: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 8px 30px rgba(0,0,0,0.08); }
      button { background: #FF7167; color: #fff; border: none; padding: 10px 14px; border-radius: 8px; cursor: pointer; }
      button:hover { background: #DD594D; }
    </style>
  </head>
  <body>
    <div class="card">
      <h2>Hello from FlipFrame</h2>
      <p>Everything on this page is hosted from the HTML you pasted.</p>
      <button onclick="alert('Deployed in seconds!')">Click me</button>
    </div>
  </body>
</html>`;

  return (
    <div className="docs-page">
      <div className="grid-overlay" />
      <div className="docs-content">
        <header className="docs-hero">
          <p className="docs-eyebrow">Documentation</p>
          <h1>Host, preview, and share HTML in minutes.</h1>
          <p className="docs-lead">
            FlipFrame turns any HTML/CSS/JS snippet into a live, shareable link with built-in safety checks.
            No servers to manage—just paste, publish, and send.
          </p>
          <div className="docs-actions">
            <WrapButton className="docs-primary" onClick={() => navigate('/')}>
              Start Hosting
            </WrapButton>
            {/* <a
              className="docs-ghost-btn"
              href="https://github.com/Amitgajare2/Flip-Frame"
              target="_blank"
              rel="noreferrer"
            >
              <FaExternalLinkAlt aria-hidden />
              <span>View on GitHub</span>
            </a> */}
          </div>
          <div className="docs-meta">
            <div className="meta-pill">Live share links</div>
            <div className="meta-pill">Sandboxed previews</div>
            <div className="meta-pill">No viewer login</div>
          </div>
        </header>

        <main className="docs-grid" id="docs">
          <section className="docs-card highlight">
            <div className="section-head">
              <p className="section-eyebrow">Quick start</p>
              <h2>Ship your first snippet</h2>
            </div>
            <ol className="steps-list">
              {quickSteps.map((step, idx) => (
                <li key={step} className="steps-item">
                  <span className="step-number">{idx + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <div className="inline-note">
              Tip: use <code>window.location.origin/your-id</code> to share the live preview with anyone.
            </div>
          </section>

          <section className="docs-card">
            <div className="section-head">
              <p className="section-eyebrow">Safety & limits</p>
              <h2>What we check</h2>
            </div>
            <div className="feature-grid">
              {guardrails.map(item => (
                <div key={item.title} className="feature-card">
                  <div className="feature-icon" aria-hidden>{item.icon}</div>
                  <div>
                    <p className="feature-title">{item.title}</p>
                    <p className="feature-text">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="docs-card">
            <div className="section-head">
              <p className="section-eyebrow">Example</p>
              <h2>Copy-paste ready HTML</h2>
            </div>
            <pre className="code-block" aria-label="Sample HTML code">
              <code>{sampleHtml}</code>
            </pre>
          </section>

          <section className="docs-card">
            <div className="section-head">
              <p className="section-eyebrow">FAQ</p>
              <h2>Common questions</h2>
            </div>
            <ul className="faq-list">
              {faqs.map(item => (
                <li key={item.q} className="faq-item">
                  <div className="faq-icon" aria-hidden><FaQuestionCircle /></div>
                  <div>
                    <p className="faq-question">{item.q}</p>
                    <p className="faq-answer">{item.a}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Docs;
