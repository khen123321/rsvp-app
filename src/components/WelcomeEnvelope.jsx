// src/components/WelcomeEnvelope.jsx
import { useState, useEffect } from 'react';

const petalShapes = [
  {
    width: '22px', height: '28px',
    background: 'radial-gradient(ellipse at 40% 30%, #C0203A 0%, #8B0000 55%, #4A0410 100%)',
    borderRadius: '50% 50% 55% 45% / 60% 60% 40% 40%', transformOrigin: '50% 80%'
  },
  {
    width: '14px', height: '32px',
    background: 'radial-gradient(ellipse at 35% 25%, #D63050 0%, #9B0020 50%, #5A0015 100%)',
    borderRadius: '50% 50% 45% 55% / 65% 65% 35% 35%', transformOrigin: '50% 85%'
  },
  {
    width: '26px', height: '20px',
    background: 'radial-gradient(ellipse at 50% 20%, #BA1A35 0%, #800018 60%, #3D000C 100%)',
    borderRadius: '50% 50% 30% 30% / 70% 70% 30% 30%', transformOrigin: '50% 75%',
    boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.25), inset 0 -2px 4px rgba(220,80,100,0.2)'
  },
  {
    width: '20px', height: '24px',
    background: 'radial-gradient(ellipse at 45% 35%, #CC2040 0%, #8B0000 45%, #4A0410 100%)',
    borderRadius: '55% 45% 60% 40% / 50% 65% 35% 55%', transformOrigin: '55% 80%',
    boxShadow: 'inset 2px 2px 6px rgba(255,120,140,0.15), inset -1px -1px 4px rgba(0,0,0,0.3)'
  },
  {
    width: '16px', height: '16px',
    background: 'radial-gradient(ellipse at 40% 30%, #E03560 0%, #A01030 55%, #5A0020 100%)',
    borderRadius: '60% 40% 55% 45% / 55% 55% 45% 45%', transformOrigin: '50% 70%'
  },
];

const dropTransitionClosed = 'transform 1.5s cubic-bezier(0.4, 0, 0.2, 1) 0s, z-index 0s 1.5s';
const dropTransitionOpen = 'transform 1.5s cubic-bezier(0.4, 0, 0.2, 1) 1.8s, z-index 0s 1.1s';

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

  const dropStyle = { transition: isOpen ? dropTransitionOpen : dropTransitionClosed };

  return (
    <div className="flex min-h-screen cursor-pointer items-center justify-center overflow-hidden bg-[url('/bg2.png')] bg-cover bg-center bg-no-repeat [perspective:1200px]" onClick={handleEnvelopeClick}>
      {isOpen && (
        <div
          className="pointer-events-none fixed left-0 top-0 h-screen w-screen overflow-hidden"
          style={{ zIndex: isZooming ? 0 : 9999 }}
        >
          {petals.map((petal) => {
            const shape = petalShapes[petal.id % petalShapes.length];
            return (
              <div
                key={petal.id}
                className="absolute top-[-12%] opacity-0 drop-shadow-[0_3px_6px_rgba(74,4,16,0.35)] animate-[fall_linear_infinite] after:absolute after:inset-0 after:rounded-[inherit] after:bg-[linear-gradient(160deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.06)_30%,transparent_55%)]"
                style={{
                  ...shape,
                  left: petal.left,
                  animationDuration: petal.animationDuration,
                  animationDelay: petal.animationDelay,
                  '--scale': petal.scale,
                  '--sway-a': petal.swayA,
                  '--sway-b': petal.swayB,
                }}
              />
            );
          })}
        </div>
      )}

      <div className="relative h-[400px] w-[600px] translate-y-20 opacity-0 animate-[cinematicEntrance_1.5s_cubic-bezier(0.16,1,0.3,1)_forwards] max-md:h-[230px] max-md:w-[345px] max-[380px]:h-[190px] max-[380px]:w-[285px]">
        <div className={`pointer-events-none absolute bottom-[-95px] left-1/2 z-[10000] w-full -translate-x-1/2 text-center font-poppins text-[1.9rem] font-light uppercase tracking-[3px] text-[#6A0F1F] transition-opacity duration-500 ease-in-out max-md:bottom-[-50px] max-md:text-xl max-md:tracking-[2px] max-[380px]:bottom-[-95px] ${showHint ? 'animate-[pulseHint_2s_ease-in-out_infinite] opacity-100' : 'opacity-0'}`}>
          {!isOpen ? 'Click anywhere to Open' : 'Click anywhere to proceed'}
        </div>

        <div
          className={`absolute left-0 top-0 z-[1] h-full w-full rounded bg-[#6A0F1F] bg-cover bg-center [background-image:linear-gradient(to_bottom,rgba(0,0,0,0.4),rgba(0,0,0,0.1)),url('/bg.svg')] ${isOpen ? 'translate-y-[150vh]' : 'translate-y-0'}`}
          style={dropStyle}
        />

        <div className={`absolute bottom-2.5 left-[15px] right-[15px] top-2.5 z-[2] flex origin-center items-center justify-center ${isZooming ? 'pointer-events-none !z-[9999] animate-[letterZoom_1.5s_cubic-bezier(0.7,0,0.3,1)_forwards]' : ''}`}>
          <div
            className={`relative w-[96%] overflow-hidden rounded bg-[#fafafa] ${isOpen ? 'h-[90%] shadow-[0_25px_50px_rgba(0,0,0,0.18)]' : 'h-[95%] shadow-[0_2px_10px_rgba(0,0,0,0.1)]'}`}
            style={{ transition: isOpen ? 'height 1.5s cubic-bezier(0.25, 1, 0.4, 1) 1.8s, box-shadow 1.5s ease 1.8s' : 'height 1.5s cubic-bezier(0.25, 1, 0.4, 1) 0s, box-shadow 1.5s ease 0s' }}
          >
            <img src="/letter.jpg" alt="Wedding Invitation" className="h-full w-full object-cover object-top" />
            <div
              className={`pointer-events-none absolute left-0 top-0 h-full w-full bg-[linear-gradient(to_bottom,transparent_32.5%,rgba(0,0,0,0.06)_33%,transparent_33.5%,transparent_65.5%,rgba(0,0,0,0.06)_66%,transparent_66.5%)] ${isOpen ? 'opacity-0' : 'opacity-100'}`}
              style={{ transition: isOpen ? 'opacity 1.5s ease 1.8s' : 'opacity 1.5s ease 0s' }}
            />
          </div>
        </div>

        <div
          className={`absolute bottom-0 left-0 z-[3] h-full w-full rounded-b bg-[#6A0F1F] bg-cover bg-[bottom_center] shadow-[0_10px_30px_rgba(0,0,0,0.1)] [clip-path:polygon(0_100%,100%_100%,100%_0,50%_60%,0_0)] [background-image:linear-gradient(135deg,rgba(255,255,255,0.08)_0%,rgba(0,0,0,0.2)_100%),url('/bg.svg')] ${isOpen ? 'translate-y-[150vh]' : 'translate-y-0'}`}
          style={dropStyle}
        />

        <div
          className={`absolute left-0 top-0 h-[65%] w-full ${isOpen ? 'z-[1] translate-y-[150vh]' : 'z-[4] translate-y-0'}`}
          style={dropStyle}
        >
          <div
            className={`h-full w-full origin-top bg-[#6A0F1F] bg-cover bg-[top_center] drop-shadow-[0_8px_12px_rgba(0,0,0,0.15)] [clip-path:polygon(0_0,100%_0,50%_100%)] [background-image:linear-gradient(to_bottom,rgba(255,255,255,0.05),rgba(0,0,0,0.15)),url('/bg.svg')] ${isOpen ? '[transform:rotateX(180deg)]' : '[transform:rotateX(0deg)]'}`}
            style={{ transition: isOpen ? 'transform 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.5s' : 'transform 1.2s cubic-bezier(0.4, 0, 0.2, 1) 1.5s' }}
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomeEnvelope;
