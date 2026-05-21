// src/components/Navigation.jsx
import { useState, useEffect } from 'react';
import './Navigation.css';
import logo from '../assets/logo.png'; 

const Navigation = () => {
  const [navColor, setNavColor] = useState('dark');

  // Radar to detect which section is underneath the navbar
  useEffect(() => {
    const handleScroll = () => {
      const darkSections = ['our-journey', 'gallery', 'timeline', 'entourage', 'faq'];
      let isOverDark = false;

      for (const id of darkSections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          
          // ✨ THE FIX: Massive Hitbox! 
          // If the top of the section is above 100px (just below the navbar)
          // AND the bottom of the section hasn't completely scrolled away yet (above 0px)
          if (rect.top <= 100 && rect.bottom >= 10) {
            isOverDark = true;
            break; // Stop looking once we find one!
          }
        }
      }

      setNavColor(isOverDark ? 'light' : 'dark');
    };

    // Use 'true' to ensure the scroll is captured even if a parent container is the one scrolling
    window.addEventListener('scroll', handleScroll, true);
    handleScroll(); // Run immediately on mount

    return () => window.removeEventListener('scroll', handleScroll, true);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`main-nav ${navColor === 'light' ? 'nav-light-mode' : ''}`}>
      <div className="nav-container">
        
        {/* Left Side: Logo */}
        <div className="nav-logo" onClick={() => scrollToSection('home')}>
          <img src={logo} alt="L&A Monogram" className="nav-monogram" />
        </div>

        {/* Right Side: Links */}
        <ul className="nav-links">
          <li onClick={() => scrollToSection('home')}>HOME</li>
          <li onClick={() => scrollToSection('our-journey')}>OUR STORY</li>
          <li onClick={() => scrollToSection('wedding-details')}>DETAILS</li>
          <li onClick={() => scrollToSection('gallery')}>GALLERY</li>
          <li onClick={() => scrollToSection('faq')}>FAQS</li>
          <li onClick={() => scrollToSection('rsvp')}>RSVP</li>
        </ul>

      </div>
    </nav>
  );
};

export default Navigation;