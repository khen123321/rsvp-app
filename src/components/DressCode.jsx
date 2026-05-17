import { useState, useEffect, useRef } from 'react';
import './DressCode.css';

// Using the same damask background for consistency
import bgDamask from '../assets/bgImage/bg2.png';

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

  // Your provided Hex Colors
  const sponsorColors = ['#f0c4cb', '#c87d87', '#c1536b'];
  const guestColors = ['#d7c9b8', '#b89c82', '#5e3f2a'];

  return (
    <section 
      ref={sectionRef}
      className={`dress-section ${isVisible ? 'animate-in' : ''}`}
      style={{ backgroundImage: `url(${bgDamask})` }}
    >
      <div className="dress-container">
        
        {/* Title Area */}
        <div className="dress-header">
          <h2 className="dress-title">
            DRESS <span className="script-code">Code</span>
          </h2>
        </div>

        {/* Two Column Layout */}
        <div className="dress-columns">
          
          {/* Principal Sponsors Column */}
          <div className="dress-column">
            <h3 className="column-subtitle">PRINCIPAL SPONSORS</h3>
            <div className="attire-info">
              <p><strong>Gentlemen:</strong> Traditional Beige Barong <br /> with Brown Pants</p>
              <p><strong>Ladies:</strong> Long gown with these colors:</p>
            </div>
            <div className="color-palette">
              {sponsorColors.map((color) => (
                <div 
                  key={color} 
                  className="color-swatch" 
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Guests Column */}
          <div className="dress-column">
            <h3 className="column-subtitle">GUESTS</h3>
            <div className="attire-info">
              <p><strong>Gentlemen:</strong> Polo or Longsleeves</p>
              <p><strong>Ladies:</strong> Long gown or Formal Dress</p>
              <p>We'd love to see you in these colors:</p>
            </div>
            <div className="color-palette">
              {guestColors.map((color) => (
                <div 
                  key={color} 
                  className="color-swatch" 
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

        </div>

        {/* Footer Notes */}
        <div className="dress-footer">
          <p className="note-text">
            To help set the tone for our special day, we kindly request <u>no white attire</u> <br />
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