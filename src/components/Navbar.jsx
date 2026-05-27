import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Scroll progress
      const scrollProgress = document.getElementById('scrollProgress');
      if (scrollProgress) {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + "%";
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <div className="scroll-progress" id="scrollProgress"></div>
      <header className={`navbar ${scrolled ? 'scrolled' : ''} ${isOpen ? 'menu-open' : ''}`} id="navbar">
        <div className="container navbar__inner">
          <a href="/#inicio" className="navbar__brand">
            <svg className="navbar__logo" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path d="M40 60 L100 30 L160 60 L160 140 L100 170 L40 140 Z" fill="none" stroke="currentColor" strokeWidth="8" />
              <path d="M70 85 L100 70 L130 85 L130 115 L100 130 L70 115 Z" fill="currentColor" />
              <rect x="95" y="45" width="10" height="20" fill="currentColor" transform="rotate(30 100 100)" />
            </svg>
            <span className="navbar__name">System<strong>Lab</strong></span>
          </a>

          <nav className={`navbar__nav ${isOpen ? 'open' : ''}`} id="navMenu">
            <a href="/#inicio" className="navbar__link" onClick={() => setIsOpen(false)}>Inicio</a>
            <a href="/#servicios" className="navbar__link" onClick={() => setIsOpen(false)}>Servicios</a>
            <a href="/#nosotros" className="navbar__link" onClick={() => setIsOpen(false)}>Nosotros</a>
            <a href="/#proceso" className="navbar__link" onClick={() => setIsOpen(false)}>Proceso</a>
            <a href="/portfolio" className="navbar__link" onClick={() => setIsOpen(false)}>Portafolio</a>
            <a href="/#contacto" className="navbar__link navbar__link--cta" onClick={() => setIsOpen(false)}>Cotizar Proyecto</a>
          </nav>

          <button 
            className={`navbar__toggle ${isOpen ? 'active' : ''}`} 
            id="navToggle" 
            aria-label="Abrir menú"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>
    </>
  );
}
