// src/components/RsvpForm.jsx
import { useState } from 'react';
import './RsvpForm.css';
// 1. Added the background image import
import bgDamask from '../assets/bgImage/bg2.png'; 

const RsvpForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    guests: '',
    attending: '',
    contactNumber: '',
    message: ''
  });

  // UI States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(''); // 'success' or 'error'
  const [ticketId, setTicketId] = useState('');
  const [submittedData, setSubmittedData] = useState(null); // To display on the ticket

  const scriptURL = 'https://script.google.com/macros/s/AKfycbznkiN0O6QaZO4EOeSTenStE-LILt7mxMOP8pfldsGQIedc-_OwTTKoe5q8jKJjJOi0/exec';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(''); 

    // 1. Generate a random Ticket ID (e.g., RSVP-A7B2X9)
    const generatedId = 'RSVP-' + Math.random().toString(36).substring(2, 8).toUpperCase();

    // 2. Package the data for Google Sheets
    const formToSubmit = new FormData();
    formToSubmit.append('fullName', formData.fullName);
    formToSubmit.append('guests', formData.guests);
    formToSubmit.append('attending', formData.attending);
    formToSubmit.append('contactNumber', formData.contactNumber);
    formToSubmit.append('message', formData.message);
    formToSubmit.append('ticketId', generatedId); // Sends the generated ID to your sheet

    try {
      // 3. Send to Google Sheets
      await fetch(scriptURL, {
        method: 'POST',
        body: formToSubmit,
        mode: 'no-cors' 
      });

      // 4. Save data for the ticket and show success screen
      setTicketId(generatedId);
      setSubmittedData(formData);
      setSubmitStatus('success');
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      className="rsvp-section" 
      id="rsvp"
      // 2. Applied the background image inline to the main section wrapper
      style={{ 
        backgroundImage: `url(${bgDamask})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="rsvp-container">
        
        {/* Left Column: Vertical Text */}
        <div className="rsvp-left">
          <span className="kindly-text">Kindly</span>
          <div className="rsvp-vertical-text">
            <span>R</span>
            <span>S</span>
            <span>V</span>
            <span>P</span>
          </div>
        </div>

        {/* Vertical Dotted Divider */}
        <div className="rsvp-divider"></div>

        {/* Right Column: Dynamic Content Area */}
        <div className="rsvp-right">
          
          {/* Conditional Rendering: Show Ticket if Success, otherwise show Form */}
          {submitStatus === 'success' ? (
            
            <div className="success-view animate-fade-in">
              <h2 className="success-title">Thank you so much for your response!</h2>
              
              <div className="success-message">
                <p>
                  Kindly note that your RSVP will be considered final, as we have limited seats available due to our venue capacity. Should your plans change, we would truly appreciate it if you could inform us ahead of time.
                </p>
                <p className="success-footer">
                  Thank you so much for your understanding and support. We can’t wait to celebrate with you! 🤍
                </p>
              </div>

              {/* Only show the ticket if they are actually attending */}
              {submittedData.attending === 'yes' && (
                <div className="digital-ticket">
                  <div className="ticket-cutout-top"></div>
                  <div className="ticket-cutout-bottom"></div>
                  
                  <div className="ticket-left">
                    <p className="ticket-label">ADMIT</p>
                    <h3 className="ticket-guests">{submittedData.guests} {submittedData.guests > 1 ? 'GUESTS' : 'GUEST'}</h3>
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

                  <div className="ticket-divider"></div>

                  <div className="ticket-right">
                    {/* Generates a live QR code based on the Ticket ID */}
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${ticketId}&color=5C2A21&bgcolor=FDF9F0`} 
                      alt="RSVP QR Code" 
                      className="qr-code"
                    />
                    <span className="scan-text">SCAN FOR ENTRY</span>
                  </div>
                </div>
              )}
            </div>

          ) : (
            
            /* The RSVP Form */
            <>
              <h2 className="rsvp-title">Will you be there?</h2>
              <p className="rsvp-description">
                We would be truly grateful if you could kindly confirm your attendance by completing the form below. You may also reply through our personal Facebook accounts or message HM Events at 0917-723-3000.
              </p>

              <form className="rsvp-form" onSubmit={handleSubmit}>
                
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required disabled={isSubmitting} />
                </div>

                <div className="form-group">
                  <label htmlFor="guests">Number of Guests Attending (including yourself):</label>
                  <input type="number" id="guests" name="guests" min="1" value={formData.guests} onChange={handleChange} required disabled={isSubmitting} />
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
                  <input type="tel" id="contactNumber" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required disabled={isSubmitting} />
                </div>

                <div className="form-group">
                  <label htmlFor="message">A short message to the couple (optional but very much appreciated):</label>
                  <textarea id="message" name="message" rows="3" value={formData.message} onChange={handleChange} disabled={isSubmitting}></textarea>
                </div>

                <div className="submit-container">
                  <button type="submit" className="submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
                  </button>
                  {submitStatus === 'error' && (
                    <p className="status-message error">Oops! Something went wrong. Please try again.</p>
                  )}
                </div>
              </form>
            </>
          )}

        </div>
      </div>
    </section>
  );
};

export default RsvpForm;