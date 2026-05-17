import { useState, useEffect, useRef } from 'react';
import './Countdown.css';
import heroBg from '../assets/bgImage/bg1.png';

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // 1. Intersection Observer Logic: Triggers the animation only when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Runs animation only once
        }
      },
      { threshold: 0.2 } // Adjust this to trigger earlier or later
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 2. Timer Logic: Counts down to July 11, 2026
  useEffect(() => {
    const targetDate = new Date('July 11, 2026 00:00:00').getTime();
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`countdown-section ${isVisible ? 'animate-in' : ''}`}
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="countdown-container">
        <h2 className="countdown-title">Our forever begins in</h2>
        
        <div className="timer-display">
          {/* Day Tile */}
          <div className="timer-block glass-tile">
            <span className="time-num">
              {timeLeft.days.toString().padStart(2, '0')}
            </span>
            <span className="time-label">DAYS</span>
          </div>
          
          <span className="separator">:</span>
          
          {/* Hour Tile */}
          <div className="timer-block glass-tile">
            <span className="time-num">
              {timeLeft.hours.toString().padStart(2, '0')}
            </span>
            <span className="time-label">HRS</span>
          </div>
          
          <span className="separator">:</span>
          
          {/* Minute Tile */}
          <div className="timer-block glass-tile">
            <span className="time-num">
              {timeLeft.minutes.toString().padStart(2, '0')}
            </span>
            <span className="time-label">MINS</span>
          </div>
          
          <span className="separator">:</span>
          
          {/* Second Tile */}
          <div className="timer-block glass-tile">
            <span className="time-num">
              {timeLeft.seconds.toString().padStart(2, '0')}
            </span>
            <span className="time-label">SECS</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Countdown;