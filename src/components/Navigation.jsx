// src/components/Navigation.jsx
import './Navigation.css';
import logo from '../assets/logo.png'; 

const Navigation = () => {
  // Logic to scroll to sections smoothly
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="main-nav">
      <div className="nav-container">
        
        {/* Left Side: Logo */}
        <div className="nav-logo" onClick={() => scrollToSection('home')}>
          <img src={logo} alt="L&A Monogram" className="nav-monogram" />
        </div>

        {/* Right Side: Links */}
        <ul className="nav-links">
          <li onClick={() => scrollToSection('home')}>HOME</li>
          <li onClick={() => scrollToSection('details')}>DETAILS</li>
          <li onClick={() => scrollToSection('rsvp')}>RSVP</li>
        </ul>

      </div>
    </nav>
  );
};

export default Navigation;