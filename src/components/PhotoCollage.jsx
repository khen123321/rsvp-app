// src/components/PhotoCollage.jsx
import { useState, useEffect, useRef } from 'react';

import collage29 from '../assets/photocollage/31.svg';
import collage30 from '../assets/photocollage/30.svg';
import collage31 from '../assets/photocollage/29.svg';

import ring2 from '../assets/icons/ring2.png';
import sandal from '../assets/icons/sandal.png';
import shoe from '../assets/icons/shoe.png';
import glass from '../assets/icons/glass.png';
import envelope from '../assets/icons/envelope.png';
import champaine from '../assets/icons/champaine.png';

const frameClass = 'relative shadow-[0_15px_35px_rgba(0,0,0,0.25)] transition-transform duration-[400ms] ease-in-out hover:z-20 hover:scale-[1.02]';
const photoClass = 'block h-auto w-full object-cover';
const iconBase = 'pointer-events-none absolute z-10 object-contain opacity-90 drop-shadow-[2px_4px_6px_rgba(109,7,26,0.15)]';

const PhotoCollage = () => {
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
      className={`relative bg-[url('/bg2.png')] bg-cover bg-center bg-no-repeat py-[120px] transition-all duration-[1200ms] ease-out max-md:py-20 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-[30px] opacity-0'}`}
    >
      <div className="mx-auto flex w-[85%] max-w-[1200px] items-start justify-center gap-[60px] max-[1024px]:w-[90%] max-[1024px]:flex-col max-[1024px]:items-center max-[1024px]:gap-[70px]">
        <div className="flex flex-[1.2] flex-col gap-[50px] max-[1024px]:w-full">
          <div className={`${frameClass} w-[95%] max-[1024px]:w-full`}>
            <img src={collage29} alt="Groom" className={photoClass} />
            <img src={envelope} alt="" className={`${iconBase} left-[-60px] top-[-30px] w-[140px] rotate-[-15deg] max-md:left-[-15px] max-md:w-20`} />
            <img src={sandal} alt="" className={`${iconBase} right-[-40px] top-[-40px] w-[120px] rotate-[15deg] max-md:right-[-15px] max-md:w-[75px]`} />
          </div>

          <div className={`${frameClass} ml-auto mt-[-10px] w-[85%] max-[1024px]:mx-auto max-[1024px]:mt-0 max-[1024px]:w-[90%]`}>
            <img src={collage30} alt="Couple" className={photoClass} />
            <img src={glass} alt="" className={`${iconBase} left-[-70px] top-[-80px] w-[120px] rotate-[-15deg] max-md:left-[-20px] max-md:top-[-40px] max-md:w-[70px]`} />
            <img src={shoe} alt="" className={`${iconBase} bottom-[-40px] left-[-80px] w-[140px] rotate-[5deg] max-md:bottom-[-20px] max-md:left-[-15px] max-md:w-20`} />
          </div>
        </div>

        <div className="flex flex-[0.8] justify-end pt-[50px] max-[1024px]:w-full max-[1024px]:pt-0">
          <div className={`${frameClass} mx-auto w-full max-w-[450px] max-[1024px]:w-[85%]`}>
            <img src={collage31} alt="Bride" className={photoClass} />
            <img src={ring2} alt="" className={`${iconBase} right-[-80px] top-[45%] w-[130px] translate-y-[-50%] rotate-[15deg] max-md:right-[-25px] max-md:w-[70px]`} />
            <img src={champaine} alt="" className={`${iconBase} bottom-[-40px] right-[-70px] w-[110px] rotate-[15deg] max-md:bottom-[-20px] max-md:right-[-15px] max-md:w-[65px]`} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotoCollage;
