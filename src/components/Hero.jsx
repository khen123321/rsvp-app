// C:\Users\khen\rsvp-app\src\components\Hero.jsx
import './Hero.css';
import logo from '../assets/logo.png';
import heroBg from "../assets/bgImage/hero.webp";

const Hero = () => {
  // Pass the image as a CSS variable to the new background layer
  const heroStyle = {
    '--hero-bg': `url(${heroBg})`
  };

  return (
    <section className="hero" id="home" style={heroStyle}>
      {/* This wrapper helps us group the content for the reveal */}
      <div className="hero-content">
        <img src={logo} alt="Monogram" className="hero-logo-animate" />
        
        <h1 className="hero-title-animate">Lanie & Angelo</h1>
        
        <p className="hero-subtitle-animate">ARE GETTING MARRIED</p>
      </div>
    </section>
  );
};

export default Hero;