import { useState, useEffect, useRef } from 'react';
import heroBg from '../assets/bgImage/bg1.svg';

const tileClass = 'flex min-w-[150px] flex-col items-center rounded-[20px] border border-[rgba(255,255,255,0.3)] bg-[rgba(255,255,255,0.086)] px-[25px] py-[35px] shadow-[0_12px_30px_rgba(0,0,0,0.15)] backdrop-blur-[1px] transition-[transform,background] duration-300 ease-in-out [-webkit-backdrop-filter:blur(12px)] hover:-translate-y-2 hover:bg-[rgba(255,255,255,0.22)] max-[900px]:min-w-[90px] max-[900px]:rounded-xl max-[900px]:px-2.5 max-[900px]:py-5 max-[600px]:min-w-[70px] max-[600px]:rounded-[10px] max-[600px]:px-[5px] max-[600px]:py-[15px] max-[380px]:min-w-[60px] max-[380px]:px-0.5 max-[380px]:py-3';
const numClass = 'text-[5.5rem] font-normal leading-none opacity-0 max-[900px]:text-5xl max-[600px]:text-[2.2rem] max-[380px]:text-[1.8rem]';
const labelClass = 'mt-[15px] font-poppins text-[1.1rem] font-medium tracking-[4px] opacity-80 max-[900px]:mt-2.5 max-[900px]:text-[0.8rem] max-[900px]:tracking-[2px] max-[600px]:text-[0.6rem] max-[600px]:tracking-normal';
const separatorClass = 'pb-10 text-[4.5rem] font-light text-[rgba(109,7,26,0.5)] max-[900px]:pb-[30px] max-[900px]:text-5xl max-[600px]:mx-[-2px] max-[600px]:pb-[25px] max-[600px]:text-[2rem] max-[380px]:pb-5 max-[380px]:text-2xl';

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const targetDate = new Date('July 11, 2026 13:00:00').getTime();

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
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const animatedNumClass = `${numClass} ${isVisible ? 'animate-[numberPop_0.8s_cubic-bezier(0.175,0.885,0.32,1.275)_0.6s_forwards]' : ''}`;

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[600px] items-center justify-center overflow-hidden bg-cover bg-[center_100%] bg-no-repeat text-center text-maroon max-[900px]:h-[550px]"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className={`w-[95%] max-w-[1000px] transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h2 className="mb-[60px] font-pinyon text-[4.8rem] font-normal [text-shadow:2px_2px_8px_rgba(255,255,255,0.4)] max-[900px]:mb-10 max-[900px]:text-[3.5rem] max-[600px]:mb-[30px] max-[600px]:px-[15px] max-[600px]:text-5xl max-[380px]:text-[2.5rem]">
          Our forever begins in
        </h2>

        <div className="flex items-center justify-center gap-5 max-[900px]:gap-3 max-[600px]:gap-[5px]">
          <div className={tileClass}>
            <span className={animatedNumClass}>{timeLeft.days.toString().padStart(2, '0')}</span>
            <span className={labelClass}>DAYS</span>
          </div>

          <span className={separatorClass}>:</span>

          <div className={tileClass}>
            <span className={animatedNumClass}>{timeLeft.hours.toString().padStart(2, '0')}</span>
            <span className={labelClass}>HRS</span>
          </div>

          <span className={separatorClass}>:</span>

          <div className={tileClass}>
            <span className={animatedNumClass}>{timeLeft.minutes.toString().padStart(2, '0')}</span>
            <span className={labelClass}>MINS</span>
          </div>

          <span className={separatorClass}>:</span>

          <div className={tileClass}>
            <span className={animatedNumClass}>{timeLeft.seconds.toString().padStart(2, '0')}</span>
            <span className={labelClass}>SECS</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Countdown;
