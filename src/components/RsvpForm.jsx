// src/components/RsvpForm.jsx
import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import confetti from 'canvas-confetti';
import './RsvpForm.css';
import bgDamask from '../assets/bgImage/bg2.png';

// Set guests to default '1' in the background since they are RSVPing individually
const initialState = {
  fullName: '',
  guests: '1', 
  attending: '',
  contactNumber: '',
  message: '',
};

const RsvpForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [ticketId, setTicketId] = useState('');
  const [submittedData, setSubmittedData] = useState(null);
  
  const scriptURL = 'https://script.google.com/macros/s/AKfycbznkiN0O6QaZO4EOeSTenStE-LILt7mxMOP8pfldsGQIedc-_OwTTKoe5q8jKJjJOi0/exec';

  // Watch for canvas creation and force transparent background
  useEffect(() => {
    const forceCanvasTransparent = (canvas) => {
      canvas.style.cssText = `
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 100% !important;
        pointer-events: none !important;
        z-index: 999999 !important;
        background: transparent !important;
        background-color: transparent !important;
      `;
    };

    // Style existing canvases
    const styleExisting = () => {
      const canvases = document.querySelectorAll('canvas');
      canvases.forEach(forceCanvasTransparent);
    };

    // Watch for new canvases being added to the DOM
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeName === 'CANVAS') {
            forceCanvasTransparent(node);
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Style any existing canvases
    styleExisting();

    // Cleanup
    return () => observer.disconnect();
  }, []);

  const fireConfetti = () => {
    const colors = ['#6D071A', '#5C2A21', '#F4EBE1', '#FDF9F0', '#C9A84C'];
    
    confetti({
      particleCount: 160,
      spread: 90,
      origin: { y: 0.6 },
      colors,
    });
    
    setTimeout(() => {
      confetti({ 
        particleCount: 80, 
        angle: 60, 
        spread: 55, 
        origin: { x: 0 }, 
        colors 
      });
      confetti({ 
        particleCount: 80, 
        angle: 120, 
        spread: 55, 
        origin: { x: 1 }, 
        colors 
      });
    }, 250);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    const generatedId = 'RSVP-' + Math.random().toString(36).substring(2, 8).toUpperCase();

    const formToSubmit = new FormData();
    formToSubmit.append('fullName', formData.fullName);
    formToSubmit.append('guests', formData.guests);
    formToSubmit.append('attending', formData.attending);
    formToSubmit.append('contactNumber', formData.contactNumber);
    formToSubmit.append('message', formData.message);
    formToSubmit.append('ticketId', generatedId);

    try {
      await fetch(scriptURL, {
        method: 'POST',
        body: formToSubmit,
        mode: 'no-cors',
      });

      setTicketId(generatedId);
      setSubmittedData(formData);
      setSubmitStatus('success');

      if (formData.attending === 'yes') {
        setTimeout(() => fireConfetti(), 300);
      }

    } catch (err) {
      console.error(err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="rsvp-section"
      id="rsvp"
      style={{
        backgroundImage: `url(${bgDamask})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="rsvp-container">

        {/* Left vertical RSVP */}
        <div className="rsvp-left">
          <span className="kindly-text">Kindly</span>
          <div className="rsvp-vertical-text">
            <span>R</span>
            <span>S</span>
            <span>V</span>
            <span>P</span>
          </div>
        </div>

        <div className="rsvp-divider" />

        <div className="rsvp-right">

          {submitStatus === 'success' && submittedData ? (

            <div className="success-view animate-fade-in">
              <h2 className="success-title">
                {submittedData.attending === 'yes' ? "Thank you so much for your response!" : "We'll miss you!"}
              </h2>

              <div className="success-message">
                <p>
                  {submittedData.attending === 'yes'
                    ? "Kindly note that your RSVP will be considered final, as we have limited seats available due to our venue capacity. Should your plans change, we would truly appreciate it if you could inform us ahead of time. Please take a screenshot of your digital ticket below."
                    : "Thank you for letting us know. We will miss you on our special day!"}
                </p>
                <p className="success-footer">
                  {submittedData.attending === 'yes'
                    ? "We can't wait to celebrate with you! 🤍"
                    : "With love, Angelo & Lanie 🤍"}
                </p>
              </div>

              {submittedData.attending === 'yes' && (
                <div className="digital-ticket">
                  <div className="ticket-cutout-top" />
                  <div className="ticket-cutout-bottom" />

                  <div className="ticket-left">
                    <p className="ticket-label">ADMIT</p>
                    <h3 className="ticket-guests">
                      {submittedData.guests}{' '}
                      {Number(submittedData.guests) > 1 ? 'GUESTS' : 'GUEST'}
                    </h3>
                    <p className="ticket-name">{submittedData.fullName}</p>

                    <div className="ticket-details">
                      <div className="detail-col">
                        <span className="detail-label">DATE</span>
                        <span className="detail-value">JULY 11, 2026</span>
                      </div>
                      <div className="detail-col">
                        <span className="detail-label">TICKET ID</span>
                        <span className="detail-value id-value">{ticketId}</span>
                      </div>
                    </div>
                  </div>

                  <div className="ticket-divider" />

                  <div className="ticket-right">
                    <div className="qr-code">
                      <QRCodeSVG
                        value={`Name: ${submittedData.fullName} | ID: ${ticketId} | Guests: ${submittedData.guests}`}
                        size={100}
                        fgColor="#5C2A21"
                        bgColor="transparent"
                      />
                    </div>
                    <span className="scan-text">SCAN FOR ENTRY</span>
                  </div>
                </div>
              )}
            </div>

          ) : (

            <div className="animate-fade-in">
              <h2 className="rsvp-title">Will you be there?</h2>
              
              {/* General instructions */}
              <p className="rsvp-description">
                We would be truly grateful if you could kindly confirm your attendance by completing the form below. You may also reply through our personal Facebook accounts or message HM Events at 0917-723-3000.
              </p>

              {/* ✨ FIRST NOTE: Tucked closer to the bottom one */}
              <p className="rsvp-description" style={{ fontStyle: 'italic', opacity: 0.85, marginBottom: '8px' }}>
                Kindly note: If multiple guests are attending under one invitation, we respectfully ask that each guest fill out the RSVP form individually for proper seat allocation and coordination.
              </p>

              {/* ✨ SECOND NOTE: Tucked closer to the top one */}
<p className="rsvp-description" style={{ fontStyle: 'italic', opacity: 0.85, marginTop: '0' }}>
  We also kindly ask everyone to follow the number of seats allocated in your invitation. As much as we would love to accommodate everyone, we humbly request <strong>no plus ones please</strong>.
</p>

              <form className="rsvp-form" onSubmit={handleSubmit}>

                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input type="text" id="fullName" name="fullName" placeholder="e.g. John Doe" value={formData.fullName} onChange={handleChange} required disabled={isSubmitting} />
                </div>

                <div className="form-group radio-group">
                  <p className="radio-question">
                    Will you be able to join us as we celebrate our wedding on July 11, 2026 (Saturday) at Manolo Fortich, Bukidnon?
                  </p>

                  <label className="radio-label">
                    <input type="radio" name="attending" value="yes" checked={formData.attending === 'yes'} onChange={handleChange} required disabled={isSubmitting} />
                    <span className="custom-radio"></span>
                    Yes, we are happy to celebrate with you
                  </label>

                  <label className="radio-label">
                    <input type="radio" name="attending" value="no" checked={formData.attending === 'no'} onChange={handleChange} required disabled={isSubmitting} />
                    <span className="custom-radio"></span>
                    Sorry, we won't be able to make it
                  </label>
                </div>

                <div className="form-group">
                  <label htmlFor="contactNumber">Contact Number:</label>
                  <input type="tel" id="contactNumber" name="contactNumber" placeholder="For urgent updates" value={formData.contactNumber} onChange={handleChange} required disabled={isSubmitting} />
                </div>

                <div className="form-group">
                  <label htmlFor="message">A short message to the couple (optional but very much appreciated):</label>
                  <textarea id="message" name="message" rows="3" value={formData.message} onChange={handleChange} disabled={isSubmitting}></textarea>
                </div>

                <div className="submit-container">
                  <button type="submit" className="submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? 'SUBMITTING...' : 'SUBMIT RSVP'}
                  </button>
                  {submitStatus === 'error' && (
                    <p className="status-message error">Oops! Something went wrong. Please try again.</p>
                  )}
                </div>
              </form>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default RsvpForm;