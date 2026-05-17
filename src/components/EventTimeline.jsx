import { useState, useEffect, useRef } from 'react';
import './EventTimeline.css';

// Asset Imports
import bgDamask from '../assets/bgImage/bg.png';
import ringIcon from '../assets/icons/ring.png'; 
import cocktailIcon from '../assets/icons/cocktail.png'; 
import archIcon from '../assets/icons/arch.png'; 
import dinnerIcon from '../assets/icons/dinner.png'; 
import partyIcon from '../assets/icons/party.png'; 

const EventTimeline = () => {
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

  const events = [
    { time: "1:00PM", title: "Wedding Ceremony", icon: ringIcon },
    { time: "3:30PM", title: "Cocktail Hour", icon: cocktailIcon },
    { time: "5:00PM", title: "Grand Entrance", icon: archIcon },
    { time: "6:00PM", title: "Dinner", icon: dinnerIcon },
    { time: "8:00PM", title: "Party", icon: partyIcon }
  ];

  return (
    <section 
      ref={sectionRef}
      className={`timeline-section ${isVisible ? 'animate-in' : ''}`}
      style={{ backgroundImage: `url(${bgDamask})` }}
    >
      <div className="timeline-container">
        
        {/* Left Side: Fixed Title Area */}
        <div className="timeline-left">
          <h2 className="timeline-main-title">
            TIMELINE <br />
            <span className="script-of">of</span> EVENTS
          </h2>
          <p className="timeline-date-display">JULY 11, 2026</p>
        </div>

        {/* Right Side: ZigZag Timeline Area */}
        <div className="timeline-right">
          <div className="vertical-line-path">
            <div className="diamond-end top"></div>
            <div className="diamond-end bottom"></div>
          </div>

          {events.map((event, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div 
                key={index} 
                className={`timeline-row ${isLeft ? 'row-left' : 'row-right'}`}
                style={{ '--index': index }}
              >
                <div className="event-item-wrapper">
                  <div className="event-text-group">
                    <span className="event-time-tag">{event.time}</span>
                    <p className="event-name-tag">{event.title}</p>
                  </div>
                  
                  <div className="icon-connector-group">
                    <img src={event.icon} alt={event.title} className="event-graphic" />
                    <div className="horizontal-connector"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default EventTimeline;