// src/components/WeddingDetails.jsx
import { useState, useEffect, useRef } from 'react';
import './WeddingDetails.css';

// Importing your specific local assets
import bg2 from '../assets/bgImage/bg2.png';
import place1 from '../assets/placeImage/place1.png';
import place2 from '../assets/placeImage/place2.png';

// The extracted and cleaned accommodation data
const accommodations = [
  {
    id: 1,
    name: "Mountain Pines Place (Reception Venue)",
    address: "Sitio Bagalangit Rd, Manolo Fortich, 8703 Bukidnon",
    contact: "0917 549 6406",
    fb: "https://www.facebook.com/mountainpinesplace",
    map: "https://maps.app.goo.gl/MZQW9JrVqRX53sUE7"
  },
  {
    id: 2,
    name: "Dahilayan BHL Tourist Inn",
    address: "P, 03 Dahilayan Rd, Dahilayan, Manolo Fortich, 8703 Bukidnon",
    contact: "0950 5631 398",
    fb: "https://www.facebook.com/profile.php?id=100090651740337",
    map: "https://maps.app.goo.gl/jNjFUgeukpFmC72Y9"
  },
  {
    id: 3,
    name: "Saddle Ridge Camp",
    address: "Dahilayan, Manolo Fortich, Philippines",
    contact: "0935 321 6479",
    fb: "https://www.facebook.com/profile.php?id=100089737420792",
    map: "https://maps.app.goo.gl/bgBqrCAbYgaRa9ub8"
  },
  {
    id: 4,
    name: "Pinegrove Mountain Lodge",
    address: "Dahilayan, Bukidnon, Dahilayan, Philippines",
    contact: "0917 622 3204",
    fb: "https://www.facebook.com/pinegrovedahilayan",
    map: "https://maps.app.goo.gl/HX7Kwgyfm1VTLtkY6"
  },
  {
    id: 5,
    name: "Dahilayan Forest Park Resort",
    address: "Brgy. Dahilayan, Manolo Fortich, Bukidnon 8703",
    contact: "0915 601 8476",
    fb: "https://www.facebook.com/dahilayanforestpark",
    map: "https://maps.app.goo.gl/BrQqfrMSTW3Hk4kE9"
  },
  {
    id: 6,
    name: "My Potter’s Garden",
    address: "Sitio Bagalangit Rd, Manolo Fortich, Bukidnon, Philippines",
    contact: "0917 770 1413",
    fb: "https://www.facebook.com/mypottersgarden.organicfarm",
    map: "https://maps.app.goo.gl/sC8zHdTtaLBLuaLv7"
  },
  {
    id: 7,
    name: "Kumaykay River Farm Resort",
    address: "Zone 2 Kumaykay River Farm Resort Dahilayan, Monolo Fortich, Bukidnon",
    contact: "0965 538 6268",
    fb: "https://www.facebook.com/KRFDahilayan",
    map: "https://maps.app.goo.gl/LbWQxrTmATnhPUj28"
  },
  {
    id: 8,
    name: "The White Fence Inn",
    address: "Purok 1, Mampayag, Manolo Fortich, Philippines",
    contact: "0917 716 6100",
    fb: "https://www.facebook.com/people/The-White-Fence-Inn/100089582793022/",
    map: "https://maps.app.goo.gl/Yfc83iBBLu8YqaHd6"
  },
  {
    id: 9,
    name: "Xentro Ville",
    address: "Zone 1, Dahilayan, Manolo Fortich, Bukidnon",
    contact: "0967 770 5688",
    fb: "https://www.facebook.com/xentro.ville.dahilayan/",
    map: "https://maps.app.goo.gl/GuuNgYGFemwKtdtPA"
  },
  {
    id: 10,
    name: "Mt. Pines Spring Resort",
    address: "Dahilayan Rd, Manolo Fortich, 8703 Bukidnon",
    contact: "0997 918 1713",
    fb: "https://www.facebook.com/mt.pinesspringresort/",
    map: "https://maps.app.goo.gl/KX4Z4m82gbdFbV887"
  },
  {
    id: 11,
    name: "Alina Farm Resort - One Bedroom Cabin",
    address: "P-6 Dalirig , Manolo Fortich, Philippines",
    contact: "0967 169 9189",
    fb: "https://www.facebook.com/ALINAfarmresort",
    map: "https://maps.app.goo.gl/Xqy2W4PVTZjvZPNU9"
  },
  {
    id: 12,
    name: "The Eliana Farm Resort and Villas",
    address: "Zone 4, Mapait, Diclum, Manolo Fortich, Philippines",
    contact: "0966 419 6796",
    fb: "https://www.facebook.com/theelianaresort",
    map: "https://maps.app.goo.gl/yH6bfCfRLdDPtLAb6"
  },
  {
    id: 13,
    name: "Dream Golftel by Dream Residences",
    address: "Del Monte Golf Course , Manolo Fortich, Philippines",
    contact: "0967 938 5171",
    fb: "https://www.facebook.com/smartcondobyjim",
    map: "https://maps.app.goo.gl/Kxqwnkocy6ZicHS5A"
  },
  {
    id: 14,
    name: "Concetta Inn",
    address: "Purok 13, Damilag, Manolo Fortich, Bukidnon",
    contact: "0967 459 4657",
    fb: "https://www.facebook.com/ConcettaInn",
    map: "https://maps.app.goo.gl/guaQc1VrcMFGy4R47"
  },
  {
    id: 15,
    name: "Dahilayan Alpine Village",
    address: "Dahilayan Road, Brgy. Dahilayan, Manolo Fortich, Philippines",
    contact: "0917 622 3204",
    fb: "https://www.facebook.com/dahilayanalpinevillage",
    map: "https://maps.app.goo.gl/Y1DHNaFDjPqGCxxL9"
  }
];

const WeddingDetails = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 
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

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [isModalOpen]);

  return (
    <>
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
                    <a 
                      href="https://www.google.com/maps/place/Mountain+Pines+Place/@8.2086993,124.860679,17z/data=!3m1!4b1!4m6!3m5!1s0x32ffbe4000000003:0x688b0e6ef71dffef!8m2!3d8.2086993!4d124.8655499!16s%2Fg%2F11b77376nn?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D" 
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
          </div>

          {/* Travel Time Text */}
          <p className="travel-info">
              Travel time from the ceremony venue to the reception venue is approximately 30-35 minutes.
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
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="detail-btn centered-btn"
                >
                  LIST OF NEARBY HOTELS
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* THE ACCOMMODATION MODAL */}
      {isModalOpen && (
        <div className="hotel-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="hotel-modal-content" onClick={(e) => e.stopPropagation()}>
            
            <div className="hotel-modal-header">
              <h2 className="pinyon-font modal-title">Accommodations</h2>
              <p className="poppins-font modal-subtitle">in Manolo Fortich</p>
              <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>✕</button>
            </div>

            <div className="hotel-list-container">
              {accommodations.map((hotel) => (
                <div className="hotel-card" key={hotel.id}>
                  <h4 className="hotel-name">{hotel.name}</h4>
                  <div className="hotel-details">
                    <p><strong>Address:</strong> {hotel.address}</p>
                    <p><strong>Contact:</strong> {hotel.contact}</p>
                  </div>
                  <div className="hotel-links">
                    <a href={hotel.fb} target="_blank" rel="noopener noreferrer" className="hotel-link-btn fb-btn">
                      Facebook Page
                    </a>
                    <a href={hotel.map} target="_blank" rel="noopener noreferrer" className="hotel-link-btn map-btn">
                      Google Maps
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="hotel-modal-footer">
              <p>Kindly note that all bookings and related expenses will be at the guest's own arrangement and expense.</p>
            </div>
            
          </div>
        </div>
      )}
    </>
  );
};

export default WeddingDetails;