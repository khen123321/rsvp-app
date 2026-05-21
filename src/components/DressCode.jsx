// src/components/DressCode.jsx
import { useState, useEffect, useRef } from 'react';
import './DressCode.css';

// Background Import
import bgDamask from '../assets/bgImage/bg2.png';

// Character Illustration Imports
import principalDressImg from '../assets/principaldress.png';
import guestDressImg from '../assets/guestdress.png';

const DressCode = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const sponsorColors = ['#f0c4cb', '#c87d87', '#c1536b'];
  const guestColors = ['#d7c9b8', '#b89c82', '#5e3f2a'];

  return (
    <section 
      ref={sectionRef}
      className={`dress-section ${isVisible ? 'animate-in' : ''}`}
      style={{ backgroundImage: `url(${bgDamask})` }}
      id="dresscode"
    >
      <div className="dress-container">
        
        {/* Title Area */}
        <div className="dress-header">
          <h2 className="dress-title quattrocento-font">
            DRESS<span className="script-code">Code</span>
          </h2>
        </div>

        {/* EXACT POSITIONING LAYOUT (Grid) */}
        <div className="dress-layout">
          
          {/* 1. Far Left Image */}
          <div className="img-container left-img">
            <img src={principalDressImg} alt="Principal Sponsor Attire" className="dress-illustration" />
          </div>

          {/* 2. Center-Left Text */}
          <div className="dress-content principal-text">
            <h3 className="column-subtitle">PRINCIPAL SPONSORS</h3>
            {/* Exact wording, no bolding, exact line breaks */}
            <p className="attire-info">
              Gentlemen: Traditional Beige Barong <br />
              with Brown Pants <br />
              Ladies: Long gown with these colors:
            </p>
            <div className="color-palette">
              {sponsorColors.map((color) => (
                <div key={color} className="color-swatch" style={{ backgroundColor: color }} />
              ))}
            </div>
          </div>

          {/* 3. Center-Right Text */}
          <div className="dress-content guest-text">
            <h3 className="column-subtitle">GUESTS</h3>
            {/* Exact wording, no bolding, exact line breaks */}
            <p className="attire-info">
              Gentlemen: Polo or Longsleeves <br />
              Ladies: Long gown or Formal Dress <br />
              We'd love to see you in these colors:
            </p>
            <div className="color-palette">
              {guestColors.map((color) => (
                <div key={color} className="color-swatch" style={{ backgroundColor: color }} />
              ))}
            </div>
          </div>

          {/* 4. Far Right Image */}
          <div className="img-container right-img">
            <img src={guestDressImg} alt="Guest Attire" className="dress-illustration" />
          </div>

        </div>

        {/* Footer Notes (Exact Lining & No Bold) */}
        <div className="dress-footer">
          <p className="note-text">
            To help set the tone for our special day, we kindly request <u className="dark-underline">no white attire</u> <br />
            and ask that guests avoid jeans, t-shirts, and rubber shoes.
          </p>
          <p className="climate-text">
            As our celebration will be held in the cool climate of Bukidnon, bringing a <br />
            shawl or wrap is highly recommended for your comfort.
          </p>
        </div>

      </div>
    </section>
  );
};

export default DressCode;