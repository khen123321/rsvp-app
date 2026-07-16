// src/components/Entourage.jsx
import { useState, useEffect, useRef } from 'react';
import bgDamask from '../assets/bgImage/bg.svg';

const splitRowClass = 'grid w-full grid-cols-2 items-start gap-[clamp(15px,5vw,200px)]';
const sponsorsGridClass = 'flex w-full flex-col gap-[5px]';
const sponsorPairClass = 'grid w-full grid-cols-2 items-start gap-[clamp(15px,5vw,200px)]';
const roleClass = 'm-0 mb-3 font-georgia text-[clamp(0.85rem,1.5vw,1.05rem)] font-bold uppercase tracking-[2px] text-[#e8dcb8]';
const nameClass = 'm-0 break-words font-georgia text-[clamp(0.9rem,1.8vw,1.1rem)] font-normal leading-[1.3] text-beige';
const centerBlockClass = 'mb-[30px] w-full text-center';
const scriptTitleClass = 'm-0 mb-10 text-center font-pinyon text-[clamp(3rem,6vw,4.5rem)] font-normal text-[#e8dcb8] [text-shadow:1px_1px_4px_rgba(0,0,0,0.2)]';

const Entourage = () => {
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

  const ninangs = [
    'Mrs. Nancy C. Alave', 'Mrs. Estrelita T. Arroyo', 'Mrs. Imie L. Atienza',
    'Mrs. Melba F. Caga-anan', 'Mrs. Jacquefil V. Daclag', 'Mrs. Jennilyn Parulan Degoma',
    'Mrs. Marybeth O. Diaz', 'Mrs. Olga M. Eblacas', 'Mrs. Eythel Dee Gan Foronda',
    'Mrs. Baby A. Guangco', 'Mrs. Sheila B. Lumbatan', 'Dr. Nanette A. Libot',
    'Mrs. Irene K. Brinas', 'Mrs. Rosemary D. Ortizano', 'Mrs. Preceline E. Ortizano',
    'Ms. Gabrielle Frances R. Figuracion', 'Mrs. Lourdes A. Rubin', 'Mrs. Mariel Jean P. Schmith',
    'Mrs. Maria Theresa S. Sulatan', 'Mrs. Jagilyn P. Agolito', 'Mrs. Teresa S. Tingson',
    'Mrs. Marites P. Vicente', 'Ms. Andria Lois M. Linaac', 'Mrs. Maria Theresa Nanaman Larrazabal',
    'Dr. Hochille Mae B. Uy', 'Mrs. Jowena Mauricio'
  ];

  const ninongs = [
    'SSG Greogorio P. Alave, PA (RET)', 'MSG Elpedio T. Arroyo, PA (RET)', 'MSG Percival A. Atienza, PA (RET)',
    '2Lt Joseph R. Caga-anan, PA (RET)', 'Engr. Jonathan S. Daclag', 'Engr. Bryan Anthony Degoma',
    'Mr. Enesus E. Diaz', 'SPO2 Anthony L. Eblacas, PNP (RET)', 'Mr. Arnold Foronda',
    'Mr. Dennis S. Guangco', 'Mr. Mark Kenneth Jalapadan', 'Engr. Allan Libot',
    'Hon. Audy Maagad', 'Mr. Lolito J. Ortizano', 'Mr. Danilo J. Ortizano',
    'Coll. Miguel Oscar Antonio F. Pizarro', 'Mr. Armando C. Rubin', 'Mr. Benjamin James Schmith',
    'Hon. Renato S. Sulatan Jr.', 'Arch. Mark M. Tejada', 'SPO3 Dennis Allan Poe L. Tingson, PNP (RET)',
    'Mr. Jimmy P. Vicente', 'Arch. Jethro A. Villarojo', 'MGen. Ronald Conde Villanueva, AFP (RET)',
    'Hon. Rainer Joaquin V. Uy'
  ];

  const groomsmen = [
    'Mr. Ralph Vincent C. Adaya', 'Mr. Kirk Z. Dumago', 'Mr. Childrome M. Kionisala',
    '1Lt Jayson T. Macalong', 'Mr. Joemari Sanchez', 'PCpt Reczon A. Talines',
    'PCpl Judy Gleen P. Vicente', 'Mr. Michael Jess M. Vidal', 'Mr. Melvin A. Villanueva'
  ];

  const bridesmaids = [
    'Engr. Sam E. Ducto', 'Ms. Mariel A. Faelnar', 'Ms. Stacey Denise A. Guangco',
    'Mr. Chesmon Jan T. Hao', 'Ms. Nissi Grace U. Jumawan', 'Ms. Hannah Joyce Y. Parojinog',
    'Mrs. Princess Dianne U. Sumastre'
  ];

  const petalsLeft = ['Ms. Rinoa Raine P. Agolito', 'Brianna Miel A. Caidic', 'Briella Mae A. Caidic'];
  const petalsRight = ['Ms. Yuna A. Capati', 'Princess Michaella Jessa M. Vidal', 'Princess Jessy Michelle M. Vidal'];

  return (
    <section
      ref={sectionRef}
      className="flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat py-[clamp(60px,10vw,100px)] text-beige"
      style={{ backgroundImage: `url(${bgDamask})` }}
      id="entourage"
    >
      <div className={`mx-auto w-[92%] max-w-[1000px] transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="mb-[clamp(40px,8vw,60px)] text-center">
          <h2 className="m-0 font-pinyon text-[clamp(3.5rem,8vw,5.5rem)] tracking-[2px] [text-shadow:2px_2px_8px_rgba(0,0,0,0.3)]">Vidal-Caidic</h2>
          <p className="mt-[clamp(-10px,-1vw,-5px)] font-georgia text-[clamp(1.2rem,3vw,1.6rem)] tracking-[clamp(4px,1vw,6px)] opacity-90">Nuptials</p>
        </div>

        <div className={`${splitRowClass} mb-10`}>
          <div className="min-w-0 text-right">
            <h4 className={roleClass}>PARENTS OF THE GROOM</h4>
            <p className={nameClass}>P/Maj. Exudio A. Vidal, PNP (Ret)<br />Mrs. Nenita G. Vidal</p>
          </div>
          <div className="min-w-0 text-left">
            <h4 className={roleClass}>PARENTS OF THE BRIDE</h4>
            <p className={nameClass}>TSG Ludelon B. Caidic PA (Ret) †<br />Mrs. Nenita M. Caidic</p>
          </div>
        </div>

        <div className={`${centerBlockClass} !mb-[60px]`}>
          <h4 className={roleClass}>OFFICIATING PRIEST</h4>
          <p className={nameClass}>Rev. Fr. Fermin P. Tan Jr., SSJV</p>
        </div>

        <h3 className={scriptTitleClass}>Principal Sponsors</h3>

        <div className={sponsorsGridClass}>
          {ninangs.map((ninang, index) => (
            <div className={sponsorPairClass} key={index}>
              <p className={`${nameClass} text-right`}>{ninongs[index] || ''}</p>
              <p className={`${nameClass} text-left`}>{ninang}</p>
            </div>
          ))}
        </div>

        <div className="mt-20"></div>
        <h3 className={`${scriptTitleClass} !mb-[50px]`}>The Entourage</h3>

        <div className={splitRowClass}>
          <div className="min-w-0 text-right">
            <h4 className={roleClass}>BEST MAN</h4>
            <p className={nameClass}>Hon. Rey Anthony S. Sulatan</p>
          </div>
          <div className="min-w-0 text-left">
            <h4 className={roleClass}>MAID OF HONOR</h4>
            <p className={nameClass}>Ms. Erika Toni M. Eblacas</p>
          </div>
        </div>

        <div className={`${splitRowClass} mt-[30px]`}>
          <div className="min-w-0 text-right">
            <h4 className={roleClass}>GROOM'S TEAM</h4>
            {groomsmen.map((name, i) => <p key={i} className={nameClass}>{name}</p>)}
          </div>
          <div className="min-w-0 text-left">
            <h4 className={roleClass}>BRIDE'S SQUAD</h4>
            {bridesmaids.map((name, i) => <p key={i} className={nameClass}>{name}</p>)}
          </div>
        </div>

        <div className={`${centerBlockClass} mt-10`}>
          <h4 className={roleClass}>CANDLE</h4>
          <p className={nameClass}>Mr. Jefrey M. Caidic<br />Mrs. Gretchen A. Caidic</p>
        </div>

        <div className={`${splitRowClass} mt-5`}>
          <div className="min-w-0 text-right">
            <h4 className={roleClass}>VEIL</h4>
            <p className={nameClass}>Mr. Michael Phillip G. Vidal<br />Mrs. Jessalyn M. Vidal</p>
          </div>
          <div className="min-w-0 text-left">
            <h4 className={roleClass}>CORD</h4>
            <p className={nameClass}>Mr. Bryan M. Caidic<br />Mrs. Melan A. Caidic</p>
          </div>
        </div>

        <div className={`${centerBlockClass} mt-10`}>
          <h4 className={roleClass}>RING SECURITY</h4>
          <p className={nameClass}>Mr. Agustineus Francis G. Vidal</p>
        </div>

        <div className={`${splitRowClass} mt-5`}>
          <div className="min-w-0 text-right">
            <h4 className={roleClass}>COIN BEARER</h4>
            <p className={nameClass}>Grey A. Caidic</p>
          </div>
          <div className="min-w-0 text-left">
            <h4 className={roleClass}>BIBLE BEARER</h4>
            <p className={nameClass}>Nelu Blue A. Caidic</p>
          </div>
        </div>

        <div className={`${centerBlockClass} mt-10`}>
          <h4 className={roleClass}>PETALS & BLOOMS</h4>
          <div className={`${sponsorsGridClass} mt-2.5`}>
            {petalsLeft.map((name, index) => (
              <div className={sponsorPairClass} key={index}>
                <p className={`${nameClass} text-right`}>{name}</p>
                <p className={`${nameClass} text-left`}>{petalsRight[index]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Entourage;
