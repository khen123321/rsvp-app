// src/components/Navigation.jsx
import { useState, useEffect } from 'react';
import './Navigation.css';
import logo from '../assets/logo.png'; 

const Navigation = () => {
  const [navColor, setNavColor] = useState('dark');
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      // 1. Color Radar 
      const darkSections = ['our-journey', 'timeline', 'entourage', 'faq'];
      let isOverDark = false;

      for (const id of darkSections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 10) {
            isOverDark = true;
            break;
          }
        }
      }
      setNavColor(isOverDark ? 'light' : 'dark');

      // 2. ✨ THE "STICKY MEMORY" VISIBILITY RADAR ✨
      const allSections = ['home', 'our-journey', 'wedding-details', 'photo-collage', 'faq', 'rsvp'];
      
      let currentActive = null; // ✨ THE FIX: Removed the 'home' fallback!
      let maxVisibleHeight = 0; 

      for (const id of allSections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          
          const visibleTop = Math.max(0, rect.top);
          const visibleBottom = Math.min(window.innerHeight, rect.bottom);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);

          // Only count it if it's actually taking up space on the screen
          if (visibleHeight > maxVisibleHeight && visibleHeight > 0) {
            maxVisibleHeight = visibleHeight;
            currentActive = id;
          }
        }
      }
      
      // Force RSVP to highlight if we hit the absolute bottom of the page
      if (window.innerHeight + Math.round(window.scrollY) >= document.documentElement.scrollHeight - 50) {
        setActiveSection('rsvp');
      } else if (currentActive) {
        // ✨ THE FIX: Only update the highlight if a tracked section is ACTUALLY visible!
        // If we are in an untracked gap (like Dress Code), it ignores this and keeps the previous highlight.
        setActiveSection(currentActive);
      }
    };

    window.addEventListener('scroll', handleScroll, true);
    handleScroll(); 

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
          <li 
            className={activeSection === 'home' ? 'active' : ''} 
            onClick={() => scrollToSection('home')}
          >HOME</li>
          
          <li 
            className={activeSection === 'our-journey' ? 'active' : ''} 
            onClick={() => scrollToSection('our-journey')}
          >OUR STORY</li>
          
          <li 
            className={activeSection === 'wedding-details' ? 'active' : ''} 
            onClick={() => scrollToSection('wedding-details')}
          >DETAILS</li>
          
          <li 
            className={activeSection === 'photo-collage' ? 'active' : ''} 
            onClick={() => scrollToSection('photo-collage')}
          >GALLERY</li>
          
          <li 
            className={activeSection === 'faq' ? 'active' : ''} 
            onClick={() => scrollToSection('faq')}
          >FAQS</li>
          
          <li 
            className={activeSection === 'rsvp' ? 'active' : ''} 
            onClick={() => scrollToSection('rsvp')}
          >RSVP</li>
        </ul>

      </div>
    </nav>
  );
};

export default Navigation;