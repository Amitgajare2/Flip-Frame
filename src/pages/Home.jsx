import React from 'react'
import "./home.css"
import { WrapButton } from '../components/Btn'
import { useNavigate } from 'react-router-dom'

import { FaGithub, FaInstagram, FaTwitter, FaLinkedin, FaStar } from 'react-icons/fa';


function Home() {

  const navigate = useNavigate();

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

          </div>
        </div>

      </div>
    </div>
  )
}

export default Home
