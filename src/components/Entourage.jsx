// src/components/Entourage.jsx
import { useState, useEffect, useRef } from 'react';
import './Entourage.css';

import bgDamask from '../assets/bgImage/bg.svg';

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

  // --- Data ---
  const ninangs = [
    "Mrs. Nancy C. Alave", "Mrs. Estrelita T. Arroyo", "Mrs. Imie L. Atienza", 
    "Mrs. Melba F. Caga-anan", "Mrs. Jacquefil V. Daclag", "Mrs. Jennilyn Parulan Degoma", 
    "Mrs. Marybeth O. Diaz", "Mrs. Olga M. Eblacas", "Mrs. Eythel Dee Gan Foronda", 
    "Mrs. Baby A. Guangco", "Mrs. Sheila B. Lumbatan", "Dr. Nanette A. Libot", 
    "Mrs. Irene K. Brinas", "Mrs. Rosemary D. Ortizano", "Mrs. Preceline E. Ortizano", 
    "Ms. Gabrielle Frances R. Figuracion", "Mrs. Lourdes A. Rubin", "Mrs. Mariel Jean P. Schmith", 
    "Mrs. Maria Theresa S. Sulatan", "Mrs. Jagilyn P. Agolito", "Mrs. Teresa S. Tingson", 
    "Mrs. Marites P. Vicente", "Ms. Andria Lois M. Linaac", "Mrs. Maria Theresa Nanaman Larrazabal", 
    "Dr. Hochille Mae B. Uy", "Mrs. Jowena Mauricio"
  ];

  const ninongs = [
    "SSG Greogorio P. Alave, PA (RET)", "MSG Elpedio T. Arroyo, PA (RET)", "MSG Percival A. Atienza, PA (RET)", 
    "2Lt Joseph R. Caga-anan, PA (RET)", "Engr. Jonathan S. Daclag", "Engr. Bryan Anthony Degoma", 
    "Mr. Enesus E. Diaz", "SPO2 Anthony L. Eblacas, PNP (RET)", "Mr. Arnold Foronda", 
    "Mr. Dennis S. Guangco", "Mr. Mark Kenneth Jalapadan", "Engr. Allan Libot", 
    "Hon. Audy Maagad", "Mr. Lolito J. Ortizano", "Mr. Danilo J. Ortizano", 
    "Coll. Miguel Oscar Antonio F. Pizarro", "Mr. Armando C. Rubin", "Mr. Benjamin James Schmith", 
    "Hon. Renato S. Sulatan Jr.", "Arch. Mark M. Tejada", "SPO3 Dennis Allan Poe L. Tingson, PNP (RET)", 
    "Mr. Jimmy P. Vicente", "Arch. Jethro A. Villarojo", "MGen. Ronald Conde Villanueva, AFP (RET)", 
    "Hon. Rainer Joaquin V. Uy"
  ];

  const groomsmen = [
    "Mr. Ralph Vincent C. Adaya", "Mr. Kirk Z. Dumago", "Mr. Childrome M. Kionisala", 
    "1Lt Jayson T. Macalong", "Mr. Joemari Sanchez", "PCpt Reczon A. Talines", 
    "PCpl Judy Gleen P. Vicente", "Mr. Michael Jess M. Vidal", "Mr. Melvin A. Villanueva"
  ];

  const bridesmaids = [
    "Engr. Sam E. Ducto", "Ms. Mariel A. Faelnar", "Ms. Stacey Denise A. Guangco", 
    "Mr. Chesmon Jan T. Hao", "Ms. Nissi Grace U. Jumawan", "Ms. Hannah Joyce Y. Parojinog", 
    "Mrs. Princess Dianne U. Sumastre"
  ];

  const petalsLeft = ["Ms. Rinoa Raine P. Agolito", "Brianna Miel A. Caidic", "Briella Mae A. Caidic"];
  const petalsRight = ["Ms. Yuna A. Capati", "Princess Michaella Jessa M. Vidal", "Princess Jessy Michelle M. Vidal"];

  return (
    <section 
      ref={sectionRef}
      className={`entourage-section ${isVisible ? 'animate-in' : ''}`}
      style={{ backgroundImage: `url(${bgDamask})` }}
      id="entourage"
    >
      <div className="entourage-container">
        
        {/* === HEADER === */}
        <div className="entourage-header">
          <h2 className="entourage-names pinyon-font">Vidal-Caidic</h2>
          <p className="nuptials-tag">Nuptials</p>
        </div>

        {/* === PARENTS === */}
        <div className="invite-split-row" style={{ marginBottom: '40px' }}>
          <div className="invite-col align-right">
            <h4 className="invite-role">PARENTS OF THE GROOM</h4>
            <p className="invite-name">Mrs. Nenita G. Vidal<br/>P/Maj. Exudio A. Vidal, PNP (Ret)</p>
          </div>
          <div className="invite-col align-left">
            <h4 className="invite-role">PARENTS OF THE BRIDE</h4>
            <p className="invite-name">Mrs. Nenita M. Caidic<br/>TSG Ludelon B. Caidic PA (Ret) (†)</p>
          </div>
        </div>

        {/* === OFFICIANT === */}
        <div className="invite-center-block" style={{ marginBottom: '60px' }}>
          <h4 className="invite-role">OFFICIATING PRIEST</h4>
          <p className="invite-name">Rev. Fr. Fermin P. Tan Jr., SSJV</p>
        </div>

        {/* === PRINCIPAL SPONSORS (✨ THE FIX: Mapped Row-by-Row) === */}
        <h3 className="section-script-title pinyon-font">Principal Sponsors</h3>
        
        <div className="sponsors-grid-container">
          {ninongs.map((ninong, index) => (
            <div className="sponsor-pair-row" key={index}>
              <p className="invite-name align-right">{ninong}</p>
              <p className="invite-name align-left">{ninangs[index]}</p>
            </div>
          ))}
        </div>

        {/* === THE ENTOURAGE === */}
        {/* ✨ ADDED: marginTop here pushes the entire Entourage section down */}
        <div className="invite-divider" style={{ marginTop: '80px' }}></div>
        <h3 className="section-script-title pinyon-font" style={{ marginBottom: '50px' }}>
          The Entourage
        </h3>
        {/* Best Man / Maid of Honor */}
        <div className="invite-split-row">
          <div className="invite-col align-right">
            <h4 className="invite-role">BEST MAN</h4>
            <p className="invite-name">Hon. Rey Anthony S. Sulatan</p>
          </div>
          <div className="invite-col align-left">
            <h4 className="invite-role">MAID OF HONOR</h4>
            <p className="invite-name">Erika Toni M. Eblacas</p>
          </div>
        </div>

        {/* Groom's Team / Bride's Squad */}
        <div className="invite-split-row" style={{ marginTop: '30px' }}>
          <div className="invite-col align-right">
            <h4 className="invite-role">GROOM'S TEAM</h4>
            {groomsmen.map((name, i) => <p key={i} className="invite-name">{name}</p>)}
          </div>
          <div className="invite-col align-left">
            <h4 className="invite-role">BRIDE'S SQUAD</h4>
            {bridesmaids.map((name, i) => <p key={i} className="invite-name">{name}</p>)}
          </div>
        </div>

        {/* Candle */}
        <div className="invite-center-block" style={{ marginTop: '40px' }}>
          <h4 className="invite-role">CANDLE</h4>
          <p className="invite-name">Mrs. Gretchen A. Caidic<br/>Mr. Jefrey M. Caidic</p>
        </div>

        {/* Veil / Cord */}
        <div className="invite-split-row" style={{ marginTop: '20px' }}>
          <div className="invite-col align-right">
            <h4 className="invite-role">VEIL</h4>
            <p className="invite-name">Mrs. Jessalyn M. Vidal<br/>Mr. Michael Phillip G. Vidal</p>
          </div>
          <div className="invite-col align-left">
            <h4 className="invite-role">CORD</h4>
            <p className="invite-name">Mrs. Melan A. Caidic<br/>Mr. Bryan M. Caidic</p>
          </div>
        </div>

        {/* Ring Security */}
        <div className="invite-center-block" style={{ marginTop: '40px' }}>
          <h4 className="invite-role">RING SECURITY</h4>
          <p className="invite-name">Mr. Agustineus Francis G. Vidal</p>
        </div>

        {/* Coin / Bible */}
        <div className="invite-split-row" style={{ marginTop: '20px' }}>
          <div className="invite-col align-right">
            <h4 className="invite-role">COIN BEARER</h4>
            <p className="invite-name">Grey A. Caidic</p>
          </div>
          <div className="invite-col align-left">
            <h4 className="invite-role">BIBLE BEARER</h4>
            <p className="invite-name">Nelu Blue A. Caidic</p>
          </div>
        </div>

        {/* Petals & Blooms */}
        <div className="invite-center-block" style={{ marginTop: '40px' }}>
          <h4 className="invite-role">PETALS & BLOOMS</h4>
          <div className="sponsors-grid-container" style={{ marginTop: '10px' }}>
            {petalsLeft.map((name, index) => (
              <div className="sponsor-pair-row" key={index}>
                <p className="invite-name align-right">{name}</p>
                <p className="invite-name align-left">{petalsRight[index]}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Entourage;