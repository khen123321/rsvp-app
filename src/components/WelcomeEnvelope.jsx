import { useState } from 'react';
import './WelcomeEnvelope.css';
import letterImg from '../assets/letter.png';

const WelcomeEnvelope = ({
  envelopeColor = '#6A0F1F',
  onEnter
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [petals, setPetals] = useState([]);

  const handleEnvelopeClick = () => {
    if (isAnimating || isZooming) return;

    if (!isOpen) {
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
      setTimeout(() => setIsAnimating(false), 3300);

    } else {
      setIsAnimating(true);
      setIsZooming(true);
      setTimeout(() => {
        if (onEnter) onEnter();
      }, 1500);
    }
  };

  return (
    <div className="scene-container">

      {/*
        --- PETALS: sibling of envelope-wrapper, NOT inside it ---
        position: fixed here is relative to the VIEWPORT (full screen coverage)
        because envelope-wrapper's animation was trapping fixed children inside it.
        
        zIndex logic:
          - isZooming = false → 9999: petals float in FRONT of everything
          - isZooming = true  → 0:    petals fall BEHIND the zooming letter
      */}
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
      <div
        className={`envelope-wrapper ${isOpen ? 'is-open' : ''}`}
        onClick={handleEnvelopeClick}
      >
        <div
          className="envelope-back drop-down"
          style={{ backgroundColor: envelopeColor }}
        />

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

        <div
          className="envelope-front drop-down"
          style={{ backgroundColor: envelopeColor }}
        />

        <div className="envelope-flap-wrapper drop-down">
          <div
            className="envelope-flap"
            style={{ backgroundColor: envelopeColor }}
          />
        </div>
      </div>

    </div>
  );
};

export default WelcomeEnvelope;