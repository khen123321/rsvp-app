// src/components/OurJourney.jsx
import { useState, useEffect, useRef } from 'react';
import './OurJourney.css';
import bgImage from '../assets/bgImage/bg.svg';
import leafIcon from '../assets/leaf.svg';

const OurJourney = () => {
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
      className={`journey-section ${isVisible ? 'animate-in' : ''}`}
      style={{ backgroundImage: `url(${bgImage})` }}
      id="our-journey"
    >
      <div className="journey-container">
        <div className="journey-header">
          <img src={leafIcon} alt="leaf icon" className="journey-leaf" />
          
          <h2 className="journey-title">
            OUR JOURNEY <br />
            <span className="script-font">Together</span>
          </h2>
        </div>

        <div className="journey-text">
          <p>
            Some love stories don't really start with anything big. Ours began with a simple hello in 2018 that slowly turned into something we never expected. By January 1, 2019, while everyone was busy celebrating the New Year and making resolutions, we were already starting our own....choosing each other.
          </p>

          <p>
            Through the years, we've grown together, faced ups and downs, celebrated little wins and big milestones, and built a love based on trust, patience, and real friendship. We've shared a lot of firsts, gone on trips, tried new food, explored new places, and even worked on small business ideas together. More than anything, we just love doing life together, whether it's simple days or big adventures.
          </p>

          <p>
            What makes our relationship special is how real and easy it feels. We don't need anything fancy. We just enjoy each other's company, whether we're out exploring or just staying in and talking about life. We've learned to be patient, understand each other more, and grow as a team. Over time, we also realized we're not just partners, but best friends. Someone to laugh with, plan with, dream with, and even be quiet with. Life feels lighter and better when we're together, and that's something we're always grateful for. On October 10, 2025, he asked a question that changed everything in the best way and of course, it was a yes.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OurJourney;