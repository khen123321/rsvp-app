// src/components/OurJourney.jsx
import { useState, useEffect, useRef } from 'react';
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
      className="flex items-center justify-center overflow-hidden bg-maroon bg-cover bg-center bg-no-repeat py-[clamp(40px,10vw,100px)]"
      style={{ backgroundImage: `url(${bgImage})` }}
      id="our-journey"
    >
      <div className={`w-full max-w-[1500px] text-center transition-all duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="mb-[clamp(30px,5vw,50px)] flex flex-col items-center">
          <img
            src={leafIcon}
            alt="leaf icon"
            className={`mb-5 mt-[-40px] h-auto w-[clamp(250px,30vw,550px)] drop-shadow-[0_4px_8px_rgba(0,0,0,0.2)] transition-all delay-[400ms] duration-1000 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${isVisible ? 'scale-100 opacity-100' : 'scale-[0.4] opacity-0'}`}
          />

          <h2 className="relative z-[1] m-0 font-poppins text-[clamp(2.5rem,6vw,3.8rem)] font-light uppercase leading-none tracking-[clamp(4px,2vw,8px)] text-beige">
            OUR JOURNEY <br />
            <span className="relative z-[2] mt-[clamp(-45px,-4vw,-20px)] block font-pinyon text-[clamp(3.5rem,10vw,5rem)] font-normal normal-case tracking-[2px] text-beige [text-shadow:2px_2px_4px_rgba(109,7,26,0.3)]">
              Together
            </span>
          </h2>
        </div>

        <div className="mx-auto mt-2.5 max-w-[1200px] px-[clamp(20px,5vw,40px)] font-poppins font-light text-beige [&_p]:clear-both [&_p]:mb-[clamp(30px,4vw,40px)] [&_p]:text-justify [&_p]:text-[clamp(1rem,1.5vw,1.25rem)] [&_p]:leading-[2.2] [&_p]:opacity-95 [&_p]:[text-justify:inter-word] [&_p]:first-letter:float-left [&_p]:first-letter:mr-[15px] [&_p]:first-letter:mb-[-10px] [&_p]:first-letter:mt-[-5px] [&_p]:first-letter:font-pinyon [&_p]:first-letter:text-[clamp(4rem,8vw,6rem)] [&_p]:first-letter:font-normal [&_p]:first-letter:leading-none [&_p]:first-letter:text-beige [&_p]:first-letter:[text-shadow:2px_2px_4px_rgba(0,0,0,0.2)]">
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
