// src/components/Hero.jsx
import logo from '../assets/logo.png';

const Hero = () => {
  const heroStyle = {
    '--hero-bg': `url('/hero.webp')`,
  };

  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 py-[60px] text-center before:absolute before:inset-0 before:z-[1] before:[background-image:var(--hero-bg)] before:bg-cover before:bg-center before:bg-no-repeat before:animate-[heroBackgroundZoom_20s_ease-in-out_infinite_alternate]"
      id="home"
      style={heroStyle}
    >
      <div className="relative z-[2] flex flex-col items-center">
        <img
          src={logo}
          alt="Monogram"
          className="mb-[25px] mt-[-40px] max-w-[120px] opacity-0 animate-[fadeInDown_1.2s_ease-out_0.3s_forwards] max-[480px]:max-w-[90px]"
        />

        <p className="mb-[15px] font-['Quattrocento',serif] text-[30px] font-normal uppercase tracking-[4px] text-maroon opacity-0 animate-[fadeIn_2s_ease-out_0.8s_forwards] max-[480px]:mb-[5px] max-[480px]:text-base max-[480px]:tracking-[2px]">
          ONCE UPON A TIME BECAME A LIFETIME
        </p>

        <h1 className="m-0 font-pinyon text-[clamp(4rem,12vw,7rem)] font-normal leading-none text-maroon opacity-0 animate-[fadeInUp_1.5s_ease-out_1.2s_forwards] max-[480px]:text-[3.5rem]">
          Angelo & Lanie
        </h1>
      </div>
    </section>
  );
};

export default Hero;
