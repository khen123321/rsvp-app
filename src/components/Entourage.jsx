// src/components/Entourage.jsx
import { useState, useEffect, useRef } from 'react';
import './Entourage.css';

// Asset Imports
import bgDamask from '../assets/bgImage/bg.png';

// --- HELPER COMPONENT (Text-Only Grid) ---
const EntourageList = ({ title, members }) => {
  return (
    <div className="entourage-group">
      <h3 className="group-label poppins-font">{title}</h3>
      <div className="names-grid">
        {members.map((name, index) => (
          <p key={index} className="name-p poppins-font">{name}</p>
        ))}
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
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

  // Entourage Data
  const ninangs = ["Nancy C. Alave", "Estrelita J. Arroyo", "Imie L. Atienza", "Melba F. Caga-anan", "Marybeth O. Diaz", "Olga M. Eblacas", "Baby A. Guangco", "Lourdes A. Rubin", "Teresa S. Tingson", "Jowena M. Mauricio", "Irene K. Brinas"];
  const ninongs = ["Greogorio P. Alave", "Elpedio Arroyo", "Percival A. Atienza", "Joseph R. Caga-anan", "Enesus E. Diaz", "Anthony L. Eblacas", "Dennis S. Guangco", "Armando C. Rubin", "Dennis Allan Poe L. Tingson"];
  const groomsmen = ["Michael Jess M. Vidal", "Joemari Sanchez", "PCpt Reczon A. Talines", "1Lt Jayson T. Macalong", "Childrome M. Kionisala", "Ralph Vincent C. Adaya", "Kirk Z. Dumago", "PCpl Judy Gleen P. Vicente", "Melvin A. Villanueva"];
  const bridesmaids = ["Hannah Joyce Y. Parojinog", "Mariel A. Faelnar", "Nissi Grace U. Jumawan", "Princess Dianne U. Sumastre", "Stacey Denise A. Guangco", "Engr. Sam E. Ducto", "Chesmon Jan T. Hao"];

  return (
    <section 
      ref={sectionRef}
      className={`entourage-section ${isVisible ? 'animate-in' : ''}`}
      style={{ backgroundImage: `url(${bgDamask})` }}
      id="entourage"
    >
      <div className="entourage-container">
        
        <div className="entourage-header">
          <h2 className="entourage-names pinyon-font">Caidic - Vidal</h2>
          <p className="nuptials-tag poppins-font">NUPTIALS</p>
        </div>

        <div className="parents-grid">
          <div className="parent-block">
            <h4 className="role-title">PARENTS OF THE GROOM</h4>
            <p className="name-p">Nenita G. Vidal</p>
            <p className="name-p">Exudio A. Vidal</p>
          </div>
          <div className="parent-block">
            <h4 className="role-title">PARENTS OF THE BRIDE</h4>
            <p className="name-p">Nenita M. Caidic</p>
            <p className="name-p">TSG Ludelon B. Caidic PA (Ret) (†)</p>
          </div>
        </div>

        <div className="main-divider">
          <h3 className="pinyon-font">Principal Sponsors</h3>
        </div>

        <EntourageList title="NINONGS" members={ninongs} />
        <EntourageList title="NINANGS" members={ninangs} />

        <div className="major-roles-row">
          <div className="major-card text-only">
            <h4 className="role-title">BEST MAN</h4>
            <p className="name-p highlight-name">Hon. Rey Anthony S. Sulatan</p>
          </div>
          <div className="major-card text-only">
            <h4 className="role-title">MAID OF HONOR</h4>
            <p className="name-p highlight-name">Erika Toni M. Eblacas</p>
          </div>
        </div>

        <EntourageList title="GROOMSMEN" members={groomsmen} />
        <EntourageList title="BRIDESMAIDS & BRIDESMEN" members={bridesmaids} />

        <div className="main-divider">
          <h3 className="pinyon-font">Secondary Sponsors</h3>
        </div>

        <div className="secondary-grid">
          <div className="sponsor-item">
            <h4 className="role-title">CANDLE SPONSORS</h4>
            <p className="name-p">Gretchen A. Caidic <br/>&<br/> Jefrey M. Caidic</p>
          </div>
          <div className="sponsor-item">
            <h4 className="role-title">CORD SPONSORS</h4>
            <p className="name-p">Melan A. Caidic <br/>&<br/> Bryan M. Caidic</p>
          </div>
          <div className="sponsor-item">
            <h4 className="role-title">VEIL SPONSORS</h4>
            <p className="name-p">Jessalyn M. Vidal <br/>&<br/> Michael Phillip G. Vidal</p>
          </div>
        </div>

        <div className="children-grid">
          <div className="child-item">
            <h4 className="role-title">RING BEARER</h4>
            <p className="name-p">Agustineus Francis G. Vidal</p>
          </div>
          <div className="child-item">
            <h4 className="role-title">COIN BEARER</h4>
            <p className="name-p">Grey A. Caidic</p>
          </div>
          <div className="child-item">
            <h4 className="role-title">BIBLE BEARER</h4>
            <p className="name-p">Nelu Blue A. Caidic</p>
          </div>
          <div className="child-item full-width">
            <h4 className="role-title">FLOWER GIRLS</h4>
            <p className="name-p">Brianna Miel A. Caidic</p>
            <p className="name-p">Briella Mae A. Caidic</p>
            <p className="name-p">Princess Michaella Jessa M. Vidal</p>
            <p className="name-p">Princess Jessy Michelle M. Vidal</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Entourage;