// src/components/WelcomeEnvelope.jsx
import { useState, useEffect } from 'react';
import './WelcomeEnvelope.css';
import letterImg from '../assets/letter.jpg';

const WelcomeEnvelope = ({ onEnter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [petals, setPetals] = useState([]);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleEnvelopeClick = () => {
    if (isAnimating || isZooming) return;

    if (!isOpen) {
      setShowHint(false);
      
      const generatedPetals = Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 6 + 5}s`,
        animationDelay: `${Math.random() * 6}s`,
        scale: Math.random() * 0.7 + 0.5,
        swayA: `${(Math.random() - 0.5) * 40}px`,
        swayB: `${(Math.random() - 0.5) * 40}px`,
      }));

      setPetals(generatedPetals);
      setIsOpen(true);
      setIsAnimating(true);
      
      setTimeout(() => {
        setIsAnimating(false);
        setShowHint(true); 
      }, 3300);

    } else {
      setShowHint(false);
      setIsAnimating(true);
      setIsZooming(true);
      
      setTimeout(() => {
        if (onEnter) onEnter();
      }, 1500); 
    }
  };

  return (
    <div className="scene-container" onClick={handleEnvelopeClick}>
      
      {isOpen && (
        <div
          className="petals-container"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: isZooming ? 0 : 9999, 
            pointerEvents: 'none',
            overflow: 'hidden',
          }}
        >
          {petals.map((petal) => (
            <div
              key={petal.id}
              className="petal"
              style={{
                left: petal.left,
                animationDuration: petal.animationDuration,
                animationDelay: petal.animationDelay,
                '--scale': petal.scale,
                '--sway-a': petal.swayA,
                '--sway-b': petal.swayB,
              }}
            />
          ))}
        </div>
      )}

      {/* --- THE ENVELOPE --- */}
      <div className={`envelope-wrapper ${isOpen ? 'is-open' : ''}`}>
        
        <div className={`click-hint ${!showHint ? 'is-hidden' : ''}`}>
          {!isOpen ? "Click anywhere to Open" : "Click anywhere to proceed"}
        </div>

        <div className="envelope-back drop-down" />

        <div className={`letter-wrapper ${isZooming ? 'is-zooming' : ''}`}>
          <div className="letter">
            <img
              src={letterImg}
              alt="Wedding Invitation"
              className="letter-image"
            />
            <div className="fold-creases" />
          </div>
        </div>

        <div className="envelope-front drop-down" />

        <div className="envelope-flap-wrapper drop-down">
          <div className="envelope-flap" />
        </div>
      </div>

    </div>
  );
};

export default WelcomeEnvelope;