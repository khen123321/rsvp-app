// src/components/WeddingDetails.jsx
import { useState, useEffect, useRef } from 'react';
import './WeddingDetails.css';

// Importing your specific local assets
import bg2 from '../assets/bgImage/bg2.png';
import place1 from '../assets/placeImage/place1.png';
import place2 from '../assets/placeImage/place2.png';

const WeddingDetails = () => {
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`details-section ${isVisible ? 'animate-in' : ''}`}
      style={{ backgroundImage: `url(${bg2})` }}
    >
      <div className="details-container">
        
        {/* Top Row: Ceremony & Reception */}
        <div className="venue-row">
          
          {/* Ceremony Card */}
          <div className="venue-card ceremony-card">
            <h3 className="card-title">
              <span className="script-cap pinyon-font">C</span>
              <span className="serif-text poppins-font">EREMONY</span>
            </h3>
            <div className="card-content">
              <p className="venue-name">Sacred Heart of Jesus Chapel</p>
              <p className="venue-sub">Camp Fabia, Manolo Fortich, Bukidnon</p>
              
              <div className="card-bottom">
                <img src={place1} alt="Ceremony Venue" className="venue-img" />
                <div className="btn-group">
                  {/* UPDATED: Added Google Maps link and target="_blank" */}
                  <a 
                    href="https://maps.app.goo.gl/ZfTbBebwB8KiEVVZ6" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="detail-btn"
                  >
                    CLICK HERE TO VIEW MAP
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Reception Card */}
          <div className="venue-card reception-card">
            <h3 className="card-title">
              <span className="script-cap pinyon-font">R</span>
              <span className="serif-text poppins-font">ECEPTION</span>
            </h3>
            <div className="card-content">
              <p className="venue-name">Marquee, Mountain Pines Place</p>
              <p className="venue-sub">Sitio Bagalangit Rd., Manolo Fortich, Bukidnon</p>
              
              <div className="card-bottom">
                <img src={place2} alt="Reception Venue" className="venue-img" />
                <div className="btn-group">
                  <a href="#" className="detail-btn">CLICK HERE TO VIEW MAP</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Travel Time Text */}
        <p className="travel-info">
          Travel time from the ceremony venue to the reception is approximately 30-35 minutes.
        </p>

        {/* Bottom Row: Accommodation */}
        <div className="accommodation-row">
          <div className="accommodation-card">
            <h3 className="card-title">
              <span className="script-cap pinyon-font">A</span>
              <span className="serif-text poppins-font">CCOMMODATION</span>
            </h3>
            <div className="accommodation-content">
              <p>
                Should you wish to stay overnight, please click the button below for nearby 
                accommodation options and contact details. Kindly note that all bookings 
                and related expenses will be at the guest's own arrangement and expense.
              </p>
              <a href="#" className="detail-btn centered-btn">LIST OF NEARBY HOTELS</a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WeddingDetails;