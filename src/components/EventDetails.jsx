import { useState, useEffect, useRef } from 'react';

import bgDamask from '../assets/bgImage/bg.svg';
import ringIcon from '../assets/icons/ring.png';
import cocktailIcon from '../assets/icons/cocktail.png';
import archIcon from '../assets/icons/arch.png';
import dinnerIcon from '../assets/icons/dinner.png';
import partyIcon from '../assets/icons/party.png';

const rowBase = 'mb-[clamp(15px,3vw,30px)] flex w-full translate-y-5 scale-95 opacity-0 max-[600px]:mb-5';
const wrapperBase = 'relative flex w-1/2 items-center';
const textClass = 'mx-[clamp(10px,2vw,20px)] flex flex-col max-[480px]:mx-2';
const iconGroupClass = 'relative flex h-[clamp(40px,8vw,80px)] w-[clamp(40px,8vw,80px)] shrink-0 items-center justify-center max-[600px]:h-[45px] max-[600px]:w-[45px] max-[480px]:h-8 max-[480px]:w-8';
const connectorOffset = 'calc(clamp(15px, 4vw, 40px) * -1)';

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
    { time: '1:00 PM', title: 'Wedding Ceremony', icon: ringIcon },
    { time: '4:00 PM', title: 'Cocktail Hour', icon: cocktailIcon },
    { time: '5:00 PM', title: 'Grand Entrance', icon: archIcon },
    { time: '6:00 PM', title: 'Dinner', icon: dinnerIcon },
    { time: '8:00 PM', title: 'Party', icon: partyIcon }
  ];

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="flex justify-center overflow-hidden bg-maroon bg-cover bg-center py-[clamp(60px,10vw,120px)] text-beige max-[900px]:px-[15px] max-[900px]:py-[60px] max-[480px]:px-[5px] max-[480px]:py-10"
      style={{ backgroundImage: `url(${bgDamask})` }}
    >
      <div className="flex w-[90%] max-w-[1000px] items-start justify-center gap-20 max-[900px]:flex-col max-[900px]:items-center max-[900px]:gap-5">
        <div className="flex-[0_1_auto] pt-5 max-[900px]:mb-10 max-[900px]:pt-0 max-[900px]:text-center">
          <h2 className="m-0 font-poppins text-[clamp(3.2rem,6vw,5rem)] font-light leading-none tracking-[clamp(6px,2vw,12px)] [text-shadow:2px_2px_8px_rgba(0,0,0,0.2)] max-[900px]:text-[3.5rem] max-[900px]:tracking-[4px] max-[600px]:text-[2.8rem]">
            TIMELINE <br />
            <span className="mr-[15px] align-middle font-pinyon text-[clamp(3rem,5vw,4.5rem)] lowercase tracking-normal max-[600px]:text-[2.5rem]">of</span> EVENTS
          </h2>
          <p className="mt-[clamp(20px,4vw,40px)] font-poppins text-[clamp(1rem,2vw,1.5rem)] tracking-[clamp(4px,1vw,6px)] opacity-90">JULY 11, 2026</p>
        </div>

        <div className="relative w-full flex-[0_1_550px] py-10 max-[900px]:flex-none max-[900px]:p-0">
          <div className={`absolute left-1/2 top-0 h-0 w-0.5 -translate-x-1/2 bg-beige opacity-60 ${isVisible ? 'animate-[drawLine_2.5s_linear_forwards]' : ''}`}>
            <div className={`absolute left-1/2 top-[-6px] h-3 w-3 -translate-x-1/2 rotate-45 bg-beige opacity-0 ${isVisible ? 'animate-[fadeDiamond_0.3s_ease_forwards]' : ''}`}></div>
            <div className={`absolute bottom-[-6px] left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-beige opacity-0 ${isVisible ? 'animate-[fadeDiamond_0.3s_ease_forwards]' : ''}`}></div>
          </div>

          {events.map((event, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div
                key={index}
                className={`${rowBase} ${isLeft ? 'justify-start' : 'justify-end'} ${isVisible ? 'animate-[popUpStagger_0.6s_cubic-bezier(0.34,1.56,0.64,1)_forwards]' : ''}`}
                style={{ animationDelay: isVisible ? `${0.3 + index * 0.45}s` : '0s' }}
              >
                <div className={`${wrapperBase} ${isLeft ? 'flex-row justify-end pr-[clamp(15px,4vw,40px)] max-[480px]:pr-[15px]' : 'flex-row-reverse justify-end pl-[clamp(15px,4vw,40px)] max-[480px]:pl-[15px]'}`}>
                  <div className={`${textClass} ${isLeft ? 'text-right' : 'text-left'}`}>
                    <span className="font-poppins text-[clamp(1.1rem,2.5vw,1.6rem)] font-semibold text-[#e8dcb8] max-[600px]:text-[1.1rem] max-[480px]:text-[0.9rem]">{event.time}</span>
                    <p className="m-0 whitespace-normal font-poppins text-[clamp(0.85rem,2vw,1.5rem)] font-light leading-[1.2] max-[600px]:text-[0.9rem] max-[480px]:break-words max-[480px]:text-[0.75rem]">{event.title}</p>
                  </div>

                  <div className={iconGroupClass}>
                    <img src={event.icon} alt={event.title} className="h-full w-full object-contain brightness-0 saturate-100 invert-[95%] sepia-[10%] saturate-[500%] hue-rotate-[3deg]" />
                    <div className="absolute top-1/2 h-[1.5px] w-[clamp(15px,4vw,40px)] bg-beige opacity-60" style={isLeft ? { right: connectorOffset } : { left: connectorOffset }}></div>
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