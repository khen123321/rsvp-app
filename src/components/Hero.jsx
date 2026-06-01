// src/components/Hero.jsx
import './Hero.css';
import logo from '../assets/logo.png';

const Hero = () => {
  //   FIX: Pass the public image path directly to the CSS variable
  const heroStyle = {
    '--hero-bg': `url('/hero.webp')`
  };

  return (
    <section className="hero" id="home" style={heroStyle}>
      <div className="hero-content">
        <img src={logo} alt="Monogram" className="hero-logo-animate" />
        
        {/* Tagline goes first */}
        <p className="hero-subtitle-animate">ONCE UPON A TIME BECAME A LIFETIME</p>
        
        {/* Names are back! */}
        <h1 className="hero-title-animate">Angelo & Lanie</h1>
      </div>
    </section>
  );
};

export default Hero;