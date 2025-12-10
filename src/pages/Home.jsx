import React from 'react'
import "./home.css"
import { WrapButton } from '../components/Btn'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'

import { FaGithub, FaInstagram, FaTwitter, FaLinkedin, FaStar } from 'react-icons/fa';


function Home() {

  const navigate = useNavigate();
  const testimonials = [
    {
      name: 'Aisha Malik',
      role: 'Frontend dev @ StudioNova',
      quote: 'Flip Frame is my go-to for quick client demos. Paste, publish, send — done.',
    },
    {
      name: 'Diego Ruiz',
      role: 'Product designer',
      quote: 'I can share interactive prototypes without bugging engineering. Links load instantly.',
    },
    {
      name: 'Maya Chen',
      role: 'Hackathon mentor',
      quote: 'Students ship faster because the hosting guardrails stop the scary stuff by default.',
    },
  ];

  const handleGitHubClick = () => {
    window.open('https://github.com/Amitgajare2/Flip-Frame', '_blank');
  };

  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/amitgajare_/', '_blank');
  };

  const handleTwitterClick = () => {
    window.open('https://x.com/AmitGajare4', '_blank');
  };

  const handleLinkedInClick = () => {
    window.open('https://in.linkedin.com/in/amit-gajare-359139290?trk=people-guest_people_search-card', '_blank');
  };

  return (
    <div>
      <div className="home-wrapper">
        <div className="grid-overlay" />
        <div className="hero-container">
          <div className="hero-text">
            <h1>Flip Frame</h1>
            <h2>Instantly Share Live HTML Websites</h2>
            <p>
              Create, preview, and share live websites in seconds. Just paste your HTML code, and Flip Frame will generate a unique link you can send to anyone — no signup required to view, login required to host. Perfect for demos, experiments, or quick sharing!
            </p>
            <WrapButton className="hero-button" onClick={() => navigate('/login')} ></WrapButton>

            {/* Social Media Buttons */}
            <div className="social-buttons">
              <h3 className='btn-head'>Social Media</h3><br />
              <button
                className="social-btn github-btn"
                onClick={handleGitHubClick}
              >
                <FaGithub />
                <span>Star on GitHub</span>
                <div className="star-count">
                  <FaStar />
                  <span>3</span>
                </div>
              </button>

              <button
                className="social-btn instagram-btn"
                onClick={handleInstagramClick}
              >
                <FaInstagram />
                {/* <span>Follow on Instagram</span> */}
              </button>

              <button
                className="social-btn twitter-btn"
                onClick={handleTwitterClick}
              >
                <FaTwitter />
                {/* <span>Follow on Twitter</span> */}
              </button>

              <button
                className="social-btn linkedin-btn"
                onClick={handleLinkedInClick}
              >
                <FaLinkedin />
                {/* <span>Connect on LinkedIn</span> */}
              </button>
            </div>

            <div className="video-card">
              {/* <video  autoPlay loop muted>
                <source src="demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video> */}
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/DUV0KxkaIQU?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&loop=1&playlist=DUV0KxkaIQU"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen>
              </iframe>
            </div>

            {/* testomonial section */}
            <section className="testimonial-section" aria-labelledby="testimonial-heading">
              <div className="testimonial-header">
                <p className="section-eyebrow">Loved by builders</p>
                <h3 id="testimonial-heading">Real teams, real feedback</h3>
                <p className="testimonial-subtitle">
                  Designers, developers, and students use Flip Frame to ship HTML demos in minutes.
                </p>
              </div>
              <div className="testimonial-grid">
                {testimonials.map((item) => (
                  <article key={item.name} className="testimonial-card">
                    <div className="testimonial-avatar" aria-hidden="true">
                      {item.name.slice(0, 1)}
                    </div>
                    <div className="testimonial-body">
                      <p className="testimonial-quote">“{item.quote}”</p>
                      <p className="testimonial-name">{item.name}</p>
                      <p className="testimonial-role">{item.role}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
            <Footer />

      </div>
    </div>
  )
}

export default Home
