// src/components/SaveTheDate.jsx
import { useState, useEffect, useRef } from 'react';

import heartScribble from '../assets/heart.gif';
import logo from '../assets/logo.png';

import photo28 from '../assets/savethedate/28.svg';
import photo29 from '../assets/savethedate/29.svg';
import photo30 from '../assets/savethedate/30.svg';
import photo31 from '../assets/savethedate/31.svg';

const polaroidClass = 'absolute w-[340px] origin-bottom-left bg-white px-[15px] pb-[35px] pt-[15px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-all duration-[1200ms] ease-[cubic-bezier(0.175,0.885,0.32,1.275)] max-[850px]:!left-1/2 max-[850px]:ml-[-140px] max-[850px]:w-[280px] max-[480px]:ml-[-120px] max-[480px]:w-60 max-[480px]:px-2.5 max-[480px]:pb-[25px] max-[480px]:pt-2.5';

const SaveTheDate = () => {
  const [topIndex, setTopIndex] = useState(3);
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
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleThrow = () => {
    if (topIndex >= 0) setTopIndex(topIndex - 1);
  };

  const handleAddToCalendar = () => {
    const title = encodeURIComponent("Angelo & Lanie's Wedding");
    const details = encodeURIComponent("We can't wait to celebrate our special day with you!");
    const location = encodeURIComponent('Cagayan De Oro City, Philippines');
    const dates = '20260711T050000Z/20260711T150000Z';
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    window.open(googleCalendarUrl, '_blank');
  };

  const stackItems = [
    { id: 1, rotation: -6, left: -10, top: 15, img: photo28 },
    { id: 2, rotation: 4, left: 15, top: 5, img: photo29 },
    { id: 3, rotation: -3, left: -5, top: 10, img: photo30 },
    { id: 4, rotation: 0, left: 5, top: 5, img: photo31 },
  ];

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dates = [
    '', '', '', 1, 2, 3, 4,
    5, 6, 7, 8, 9, 10, 11,
    12, 13, 14, 15, 16, 17, 18,
    19, 20, 21, 22, 23, 24, 25,
    26, 27, 28, 29, 30, 31
  ];

  return (
    <section
      ref={sectionRef}
      className="flex justify-center overflow-hidden bg-beige bg-cover bg-center bg-no-repeat px-5 py-[100px] font-poppins max-[850px]:px-[15px] max-[850px]:py-[60px] max-[480px]:px-2.5 max-[480px]:py-[50px]"
      style={{ backgroundImage: `url('/bg2.png')` }}
    >
      <div className="flex w-full max-w-[1100px] items-center justify-center gap-[100px] max-[850px]:flex-col max-[850px]:gap-10">
        <div
          className={`relative h-[480px] w-[420px] cursor-pointer [perspective:1000px] transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] max-[850px]:mx-auto max-[850px]:h-[400px] max-[850px]:w-[300px] max-[480px]:h-[350px] max-[480px]:w-full ${isVisible ? 'translate-x-0 opacity-100 max-[850px]:translate-y-0' : '-translate-x-[60px] opacity-0 max-[850px]:translate-x-0 max-[850px]:translate-y-10'}`}
          onClick={handleThrow}
        >
          <div className={`pointer-events-none absolute left-1/2 top-1/2 z-0 transition-all duration-1000 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${topIndex < 0 ? '-translate-x-1/2 -translate-y-1/2 scale-100 opacity-100' : '-translate-x-1/2 -translate-y-1/2 scale-[0.7] opacity-0'}`}>
            <img src={logo} alt="Wedding Logo" className="h-auto w-[250px] object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.08)] max-[850px]:w-[180px] max-[480px]:w-[140px]" />
          </div>

          {stackItems.map((item, index) => {
            const isThrown = index > topIndex;
            return (
              <div
                key={item.id}
                className={`${polaroidClass} ${isThrown ? '!pointer-events-none !-translate-x-[1000px] !rotate-[-60deg] !scale-50 !opacity-0' : ''}`}
                style={{
                  transform: isThrown ? undefined : `rotate(${item.rotation}deg)`,
                  left: `${item.left}px`,
                  top: `${item.top}px`,
                  zIndex: index + 1,
                }}
              >
                <div className="aspect-square w-full overflow-hidden bg-[#eee]">
                  <img className="pointer-events-none h-full w-full object-cover" src={item.img} alt={`Couple ${item.id}`} />
                </div>
                <div className="mt-[15px] text-center text-[1.1rem] font-semibold tracking-[1px] text-maroon max-[480px]:mt-2.5 max-[480px]:text-[0.95rem]">L&A | 07.11.26</div>
              </div>
            );
          })}
          <p className="absolute bottom-[-40px] left-[42%] -translate-x-1/2 text-[0.75rem] uppercase tracking-[1px] text-maroon opacity-50 max-[850px]:left-1/2 max-[850px]:w-full max-[850px]:text-center">
            {topIndex >= 0 ? 'Click to View more' : "Can't wait!"}
          </p>
        </div>

        <div className={`text-center text-maroon transition-all delay-200 duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] max-[850px]:w-full ${isVisible ? 'translate-x-0 opacity-100 max-[850px]:translate-y-0' : 'translate-x-[60px] opacity-0 max-[850px]:translate-x-0 max-[850px]:translate-y-10'}`}>
          <h2 className="mb-0 text-[2.5rem] font-normal tracking-[6px] max-[850px]:text-[2rem] max-[850px]:tracking-[4px] max-[480px]:text-[1.6rem] max-[480px]:tracking-[3px]">SAVE THE DATE</h2>
          <h3 className="mb-[30px] text-2xl font-light tracking-[3px] max-[850px]:text-[1.2rem] max-[480px]:mb-5 max-[480px]:text-base">JULY 2026</h3>

          <div className="grid grid-cols-7 gap-x-5 gap-y-[15px] max-[850px]:gap-2.5 max-[480px]:gap-x-[5px] max-[480px]:gap-y-2">
            {days.map(day => <div key={day} className="text-[0.8rem] font-semibold lowercase max-[480px]:text-[0.7rem]">{day}</div>)}
            {dates.map((date, index) => (
              <div key={index} className={`relative flex h-[30px] items-center justify-center text-base max-[480px]:h-[25px] max-[480px]:text-[0.85rem] ${date === 11 ? 'font-bold' : ''}`}>
                {date}
                {date === 11 && (
                  <div className={`pointer-events-none absolute left-1/2 top-1/2 z-10 -ml-[30px] -mt-[30px] h-[60px] w-[60px] opacity-0 mix-blend-multiply max-[480px]:-ml-[22.5px] max-[480px]:-mt-[22.5px] max-[480px]:h-[45px] max-[480px]:w-[45px] ${isVisible ? 'animate-[popHeart_0.6s_cubic-bezier(0.175,0.885,0.32,1.275)_1.2s_forwards]' : ''}`}>
                    <img src={heartScribble} alt="Heart" className="h-full w-full object-contain" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <button className="mt-10 cursor-pointer rounded-[30px] border-2 border-maroon bg-maroon px-9 py-3 font-poppins text-[0.85rem] font-semibold uppercase tracking-[2px] text-white shadow-[0_4px_15px_rgba(109,7,26,0.2)] outline-none transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:-translate-y-[3px] hover:bg-transparent hover:text-maroon hover:shadow-[0_8px_20px_rgba(109,7,26,0.3)] active:-translate-y-px active:shadow-[0_4px_10px_rgba(109,7,26,0.2)] max-[850px]:mt-[30px] max-[850px]:w-full max-[850px]:max-w-[280px] max-[850px]:px-5 max-[850px]:py-3.5" onClick={handleAddToCalendar}>
            Add To Calendar
          </button>
        </div>
      </div>
    </section>
  );
};

export default SaveTheDate;
