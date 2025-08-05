import React from 'react';
import { FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.5 }}
      className="h-screen bg-black text-white font-sans relative overflow-hidden"
    >
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,_#4b556320_1px,_transparent_1px),linear-gradient(to_bottom,_#4b556320_1px,_transparent_1px)] bg-[size:40px_40px] z-0" />

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4">
          <div className="font-bold text-xl">Flip Frame</div>
          <button
            onClick={() => navigate('/code')}
            className="px-4 py-2 rounded-md bg-white text-black hover:bg-gray-200 font-bold"
          >
            Start
          </button>
        </header>

        {/* Hero */}
        <section className="text-center flex-grow flex flex-col justify-center px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Turn{' '}
              <span className="bg-white text-black px-3 py-1 italic rounded">HTML</span>
              <br />
              Into Live Sites ⚡ Instant previews.
              <br />
              Shareable links.{' '}
              <span className="underline italic">Zero setup.</span>
            </h1>
          </div>

          {/* Socials & GitHub */}
          <div className="mt-12 flex justify-center items-center gap-6 flex-wrap">
            {/* GitHub Button */}
            <a
              href="https://github.com/YOUR_REPO"
              target="_blank"
              rel="noopener noreferrer"
              className="items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-transform duration-200 group relative animate-rainbow cursor-pointer border-0 bg-[linear-gradient(#fff,#fff),linear-gradient(#fff_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,hsl(0,100%,63%),hsl(90,100%,63%),hsl(210,100%,63%),hsl(195,100%,63%),hsl(270,100%,63%))] bg-[length:200%] text-black [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent] px-4 py-2 inline-flex hover:scale-105 active:scale-95"
            >
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" viewBox="0 0 438.549 438.549" fill="#000">
                  <path d="M409.132 114.573..." />
                </svg>
                Star on GitHub
              </div>
              <div className="ml-2 flex items-center gap-1 text-sm">
                ⭐ <span>11</span>
              </div>
            </a>

            {/* Socials */}
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 text-2xl">
              <FaLinkedin />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-500 text-2xl">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-500 text-2xl">
              <FaTwitter />
            </a>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default HomePage;
