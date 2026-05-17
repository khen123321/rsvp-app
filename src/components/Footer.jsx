import './Footer.css';

const Footer = () => {
  return (
    <footer className="wedding-footer-slim">
      <div className="footer-slim-container">
        
        {/* Main Branding Line */}
        <div className="footer-main-row">
          <span className="footer-names-mini">Lanie & Angelo</span>
          <span className="footer-dot">•</span>
          <span className="footer-date-mini">July 11, 2026</span>
          <span className="footer-dot">•</span>
          <span className="footer-location-mini">Bukidnon</span>
        </div>

        {/* Small Attribution Line */}
        <div className="footer-sub-row">
          <p className="footer-tagline">Made with 🤍 for the Couple</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;