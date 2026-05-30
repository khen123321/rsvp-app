// src/components/SaveTheDate.jsx
import { useState, useEffect, useRef } from 'react';
import './SaveTheDate.css';

// --- Asset Imports ---
import bgDamask from '../assets/bgImage/bg2.png'; 
import heartScribble from '../assets/heart.gif'; 
import logo from '../assets/logo.png'; // ✨ NEW: Logo import

// Your custom SVG photos!
import photo28 from '../assets/savethedate/28.svg';
import photo29 from '../assets/savethedate/29.svg';
import photo30 from '../assets/savethedate/30.svg';
import photo31 from '../assets/savethedate/31.svg';

const SaveTheDate = () => {
  // Starts at 3 because we now have exactly 4 photos (index 0, 1, 2, 3)
  const [topIndex, setTopIndex] = useState(3);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Triggers the entrance animation when the user scrolls down to this section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); 
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Handles clicking the photos to throw them away
  const handleThrow = () => {
    if (topIndex >= 0) setTopIndex(topIndex - 1);
  };

  // Generates the Google Calendar invite link
  const handleAddToCalendar = () => {
    const title = encodeURIComponent("Angelo & Lanie's Wedding");
    const details = encodeURIComponent("We can't wait to celebrate our special day with you!");
    const location = encodeURIComponent("Cagayan De Oro City, Philippines");
    // Format: YYYYMMDDTHHMMSSZ
    const dates = "20260711T050000Z/20260711T150000Z";
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    window.open(googleCalendarUrl, '_blank');
  };

  // Exactly 4 custom photos.
  const stackItems = [
    { id: 1, rotation: -6, left: -10, top: 15, img: photo28 },
    { id: 2, rotation: 4, left: 15, top: 5, img: photo29 },
    { id: 3, rotation: -3, left: -5, top: 10, img: photo30 },
    { id: 4, rotation: 0, left: 5, top: 5, img: photo31 }, // The top photo
  ];

  // Calendar setup for July 2026 (Starts on a Wednesday)
  const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const dates = [
    "", "", "", 1, 2, 3, 4,
    5, 6, 7, 8, 9, 10, 11,
    12, 13, 14, 15, 16, 17, 18,
    19, 20, 21, 22, 23, 24, 25,
    26, 27, 28, 29, 30, 31
  ];

  return (
    <section 
      ref={sectionRef} 
      className={`save-the-date ${isVisible ? 'animate-in' : ''}`} 
      style={{ 
        backgroundImage: `url(${bgDamask})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="std-container">
        
        {/* LEFT SIDE: Interactive Polaroid Stack */}
        <div className="std-photos" onClick={handleThrow}>
          
          {/* ✨ NEW: Logo container hidden underneath the polaroids */}
          <div className={`std-logo-container ${topIndex < 0 ? 'revealed' : ''}`}>
            <img src={logo} alt="Wedding Logo" className="std-logo" />
          </div>

          {stackItems.map((item, index) => {
            const isThrown = index > topIndex;
            return (
              <div 
                key={item.id} 
                className={`polaroid ${isThrown ? 'thrown' : ''}`}
                style={{
                  transform: isThrown ? undefined : `rotate(${item.rotation}deg)`,
                  left: `${item.left}px`,
                  top: `${item.top}px`,
                  // Add +1 to ensure they stay above the newly added logo container (z-index 0)
                  zIndex: index + 1 
                }}
              >
                <div className="photo-frame">
                  <img src={item.img} alt={`Couple ${item.id}`} />
                </div>
                <div className="photo-caption">L&A | 07.11.26</div>
              </div>
            );
          })}
          <p className="tap-hint">{topIndex >= 0 ? "Click to View more" : "Can't wait!"}</p>
        </div>

        {/* RIGHT SIDE: Calendar & Details */}
        <div className="std-content">
          <h2 className="std-title">SAVE THE DATE</h2>
          <h3 className="std-month">JULY 2026</h3>
          
          <div className="calendar-grid">
            {days.map(day => <div key={day} className="calendar-day-label">{day}</div>)}
            {dates.map((date, index) => (
              <div key={index} className={`calendar-date ${date === 11 ? 'marked-date' : ''}`}>
                {date}
                {/* The animated heart outline only renders on the 11th */}
                {date === 11 && (
                  <div className="heart-circle">
                    <img src={heartScribble} alt="Heart" className="heart-img" />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <button className="add-calendar-btn" onClick={handleAddToCalendar}>
            Add To Calendar
          </button>
          
        </div>
      </div>
    </section>
  );
};

export default SaveTheDate;