import { useState, useEffect, useRef } from 'react';
import './PhotoCollage.css';

// Image Imports
import img4 from '../assets/coupleImage/img4.png'; 
import img5 from '../assets/coupleImage/img5.png'; 
import img6 from '../assets/coupleImage/img6.png'; 

// Icon Imports
import ring2 from '../assets/icons/ring2.png';
import sandal from '../assets/icons/sandal.png';
import shoe from '../assets/icons/shoe.png';
import glass from '../assets/icons/glass.png';
import envelope from '../assets/icons/envelope.png';
import champaine from '../assets/icons/champaine.png';

const PhotoCollage = () => {
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

  return (
    <section 
      ref={sectionRef}
      className={`collage-section ${isVisible ? 'animate-in' : ''}`}
    >
      <div className="collage-container">
        
        <div className="collage-left">
          {/* Top Frame: Groom */}
          <div className="collage-frame wide-frame top-frame">
            <img src={img4} alt="Groom Adjusting Cuffs" className="main-photo" />
            {/* Icons anchored near the Groom photo */}
            <img src={envelope} alt="" className="frame-icon icon-envelope" />
            <img src={sandal} alt="" className="frame-icon icon-sandal" />
          </div>

          {/* Bottom-Left Frame: Couple */}
          <div className="collage-frame small-frame bottom-left-frame">
            <img src={img5} alt="Couple Sitting" className="main-photo" />
            {/* Icons anchored near the Couple photo */}
            <img src={glass} alt="" className="frame-icon icon-glass" />
            <img src={shoe} alt="" className="frame-icon icon-shoe" />
          </div>
        </div>

        <div className="collage-right">
          {/* Vertical Frame: Bride */}
          <div className="collage-frame vertical-frame right-frame">
            <img src={img6} alt="Bride with Bouquet" className="main-photo" />
            {/* Icons anchored near the Bride photo */}
            <img src={ring2} alt="" className="frame-icon icon-rings" />
            <img src={champaine} alt="" className="frame-icon icon-champagne" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default PhotoCollage;