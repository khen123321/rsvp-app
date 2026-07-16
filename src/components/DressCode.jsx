// src/components/DressCode.jsx
import { useState, useEffect, useRef } from 'react';
import principalDressImg from '../assets/principaldress.png';
import guestDressImg from '../assets/guestdress.png';

const swatchClass = 'h-[105px] w-[105px] rounded-full border-[3px] border-[rgba(255,255,255,0.8)] shadow-[0_4px_8px_rgba(0,0,0,0.1)] transition-transform duration-200 ease-in-out hover:-translate-y-[3px] max-[480px]:h-[70px] max-[480px]:w-[70px] max-[480px]:border-2';
const contentClass = 'flex flex-col items-center text-center';
const subtitleClass = 'mb-[15px] font-georgia text-[clamp(1.05rem,2vw,1.15rem)] font-semibold tracking-[1px] text-maroon underline decoration-maroon decoration-1 underline-offset-4';
const infoClass = 'mb-[15px] mt-0 font-georgia text-[clamp(0.95rem,1.5vw,1.05rem)] leading-[1.6] text-maroon';

const DressCode = () => {
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

  const sponsorColors = ['#f0c4cb', '#c87d87', '#c1536b'];
  const guestColors = ['#d7c9b8', '#b89c82', '#5e3f2a'];

  return (
    <section
      ref={sectionRef}
      className="flex min-h-[90vh] items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat px-5 py-[clamp(80px,8vw,100px)] text-maroon max-[992px]:px-[15px] max-[992px]:py-[60px]"
      style={{ backgroundImage: `url('/bg2.png')` }}
      id="dresscode"
    >
      <div className={`flex w-full max-w-[1200px] flex-col items-center gap-[50px] transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-[30px] opacity-0'}`}>
        <div className="mb-5 text-center">
          <h2 className="m-0 flex items-center justify-center font-['Quattrocento',serif] text-[clamp(3.5rem,5vw,4.5rem)] leading-none tracking-[6px] text-maroon max-[992px]:text-5xl max-[992px]:tracking-[4px] max-[480px]:text-[2.2rem] max-[480px]:tracking-[2px]">
            DRESS<span className="ml-[-5px] translate-y-2 font-pinyon text-[clamp(4.5rem,7vw,6.5rem)] font-normal normal-case tracking-normal max-[992px]:translate-y-1 max-[992px]:text-[4rem] max-[480px]:translate-y-0.5 max-[480px]:text-5xl">Code</span>
          </h2>
        </div>

        <div className="mb-5 grid w-full grid-cols-[minmax(150px,1fr)_auto_auto_minmax(150px,1fr)] items-center gap-[clamp(20px,4vw,60px)] max-[992px]:grid-cols-1 max-[992px]:gap-10 max-[480px]:gap-[30px]">
          <div className="justify-self-end translate-x-[60px] translate-y-20 max-[992px]:order-1 max-[992px]:justify-self-center max-[992px]:translate-x-0 max-[992px]:translate-y-0">
            <img src={principalDressImg} alt="Principal Sponsor Attire" className="h-80 w-auto scale-[1.4] object-contain max-[992px]:h-60 max-[992px]:scale-100 max-[480px]:h-[200px]" />
          </div>

          <div className={`${contentClass} max-[992px]:order-2`}>
            <h3 className={subtitleClass}>PRINCIPAL SPONSORS</h3>
            <p className={infoClass}>
              Gentlemen: Traditional Beige Barong <br />
              with Brown Pants <br />
              Ladies: Long gown with these colors:
            </p>
            <div className="flex justify-center gap-[15px] max-[992px]:flex-wrap max-[480px]:gap-2.5">
              {sponsorColors.map((color) => (
                <div key={color} className={swatchClass} style={{ backgroundColor: color }} />
              ))}
            </div>
          </div>

          <div className={`${contentClass} max-[992px]:order-4`}>
            <h3 className={subtitleClass}>GUESTS</h3>
            <p className={infoClass}>
              Gentlemen: Polo or Longsleeves <br />
              Ladies: Long gown or Formal Dress <br />
              We'd love to see you in these colors:
            </p>
            <div className="flex justify-center gap-[15px] max-[992px]:flex-wrap max-[480px]:gap-2.5">
              {guestColors.map((color) => (
                <div key={color} className={swatchClass} style={{ backgroundColor: color }} />
              ))}
            </div>
          </div>

          <div className="justify-self-start translate-x-[-40px] translate-y-[-10px] max-[992px]:order-3 max-[992px]:justify-self-center max-[992px]:translate-x-0">
            <img src={guestDressImg} alt="Guest Attire" className="h-80 w-auto scale-[1.4] object-contain max-[992px]:h-60 max-[992px]:scale-100 max-[480px]:h-[200px]" />
          </div>
        </div>

        <div className="flex flex-col gap-5 text-center font-georgia [&_p]:m-0 [&_p]:text-[clamp(0.95rem,1.5vw,1.05rem)] [&_p]:leading-[1.6] [&_p]:text-maroon max-[992px]:[&_br]:hidden">
          <p>
            To help set the tone for our special day, we kindly request <u className="underline decoration-maroon decoration-1 underline-offset-[3px]">no white attire</u> <br />
            and ask that guests avoid jeans, t-shirts, and rubber shoes.
          </p>
          <p>
            As our celebration will be held in the cool climate of Bukidnon, bringing a <br />
            shawl or wrap is highly recommended for your comfort.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DressCode;
