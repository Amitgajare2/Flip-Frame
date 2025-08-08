import React from 'react'
import "./home.css"
import { WrapButton } from '../components/Btn'
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion";
import { FaGithub, FaInstagram, FaTwitter, FaLinkedin, FaStar } from 'react-icons/fa';


const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] };


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
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={transition}>
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
              <motion.button 
                className="social-btn github-btn"
                onClick={handleGitHubClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <FaGithub />
                <span>Star on GitHub</span>
                <div className="star-count">
                  <FaStar />
                  <span>3</span>
                </div>
              </motion.button>

              <motion.button 
                className="social-btn instagram-btn"
                onClick={handleInstagramClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <FaInstagram />
                {/* <span>Follow on Instagram</span> */}
              </motion.button>

              <motion.button 
                className="social-btn twitter-btn"
                onClick={handleTwitterClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <FaTwitter />
                {/* <span>Follow on Twitter</span> */}
              </motion.button>

              <motion.button 
                className="social-btn linkedin-btn"
                onClick={handleLinkedInClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <FaLinkedin />
                {/* <span>Connect on LinkedIn</span> */}
              </motion.button>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  )
}

export default Home
