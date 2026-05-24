import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import ArrowCircle from './components/ArrowCircle';
import Layout from './components/Layout';
import Pillars from './pages/Pillars';
import Thesis from './pages/Thesis';
import WhatWeLookFor from './pages/WhatWeLookFor';
import Network from './pages/Network';
import PortfolioCompanies from './pages/PortfolioCompanies';
import GithubStars from './pages/GithubStars';
import Methodology from './pages/Methodology';

const forestImages = [
  'https://images.unsplash.com/photo-1502058665739-cc9a8769fb1e?fit=crop&w=1080&q=80',
  'https://images.unsplash.com/photo-1486707471592-8e7eb7e36f78?fit=crop&w=1080&q=80',
  'https://images.unsplash.com/photo-1490100667990-4fced8021649?fit=crop&w=1080&q=80',
  'https://images.unsplash.com/photo-1465326117523-6450112b60b2?fit=crop&w=1080&q=80',
  'https://images.unsplash.com/photo-1496156298940-6902fc34e55d?fit=crop&w=1080&q=80',
  'https://images.unsplash.com/photo-1631257114315-24a694751517?fit=crop&w=1080&q=80',
];

const navItems = [
  { to: '/pillars', label: 'Our Principles' },
  { to: '/thesis', label: 'Vertical AGI Thesis' },
  { to: '/what-we-look-for', label: 'What We Look For' },
];

function Home() {
  useEffect(() => {
    document.title = 'Linea Ventures';
  }, []);

  return (
    <div
      className="relative overflow-hidden flex flex-col"
      style={{ backgroundColor: '#0a2828', minHeight: '100vh' }}
    >
      {/* Arrow circle — desktop only, absolute positioned */}
      <div className="absolute right-16 top-1/2 -translate-y-1/2 hidden md:block">
        <ArrowCircle size={540} />
      </div>

      {/* Brand */}
      <header className="px-8 md:px-16 pt-10 md:pt-12">
        <span className="text-xs font-bold tracking-widest uppercase text-white/50">
          Linea Ventures
        </span>
      </header>

      {/* Main content — vertically centered in remaining space */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-16 pb-12 md:pb-16">

        {/* LINEA animated text */}
        <div
          className="overflow-hidden mb-8 md:mb-10"
          style={{ width: 'min(560px, 100%)', height: 'min(160px, 28vw)' }}
        >
          <div
            className="relative w-full h-full"
            style={{
              WebkitMaskImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 160"><text x="0" y="130" text-anchor="start" font-size="140" font-weight="400" letter-spacing="8" font-family="Montserrat, sans-serif" fill="white">LINEA</text></svg>')`,
              maskImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 160"><text x="0" y="130" text-anchor="start" font-size="140" font-weight="400" letter-spacing="8" font-family="Montserrat, sans-serif" fill="white">LINEA</text></svg>')`,
              WebkitMaskSize: '100% 100%',
              maskSize: '100% 100%',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
            }}
          >
            <motion.div
              className="absolute flex h-full"
              animate={{ x: ['0px', '-2400px'] }}
              transition={{ duration: 180, repeat: Infinity, ease: 'linear' }}
              style={{ width: '4800px', top: 0, left: 0 }}
            >
              {[...forestImages, ...forestImages].map((img, index) => (
                <div
                  key={index}
                  className="h-full"
                  style={{
                    width: '600px',
                    backgroundImage: `url(${img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    flexShrink: 0,
                  }}
                />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/15 mb-8" style={{ width: 'min(560px, 100%)' }} />

        {/* Nav links */}
        <nav className="flex flex-col gap-4">
          {navItems.map(({ to, label }, i) => (
            <Link
              key={to}
              to={to}
              className="flex items-center gap-4 group w-fit"
            >
              <span className="text-white/30 text-xs font-mono tabular-nums">0{i + 1}</span>
              <span className="text-white/60 group-hover:text-white transition-colors duration-200 text-sm font-medium tracking-wide">
                {label}
              </span>
              <span className="w-0 group-hover:w-5 h-px bg-white/50 transition-all duration-300 ease-out" />
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<Layout />}>
          <Route path="/pillars" element={<Pillars />} />
          <Route path="/thesis" element={<Thesis />} />
          <Route path="/what-we-look-for" element={<WhatWeLookFor />} />
          <Route path="/network" element={<Network />} />
          <Route path="/portfolio-companies" element={<PortfolioCompanies />} />
          <Route path="/methodology" element={<Methodology />} />
          <Route path="/github-stars" element={<GithubStars />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
