// src/components/FAQ.jsx
import { useState, useEffect, useRef } from 'react';
import './FAQ.css';

// Asset Import
import bgDamask from '../assets/bgImage/bg.svg';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
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

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const scrollToSection = (e, targetId) => {
    e.preventDefault(); 
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  const openAccommodationsModal = (e) => {
    e.preventDefault();
    
    // 1. Smooth scroll to the Wedding Details section
    const element = document.getElementById('wedding-details');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // 2. Dispatch a custom event to tell WeddingDetails.jsx to open its modal
    document.dispatchEvent(new Event('openHotelModal'));
  };

  const faqData = [
    {
      q: "WHAT TIME SHOULD I ARRIVE?",
      a: "The ceremony will start at 1:00 PM. We kindly ask that you arrive at least 30 minutes before the ceremony begins so you have enough time to get settled, find your seat, and be ready as we start on time."
    },
    {
      q: "HOW DO I GET TO THE CEREMONY VENUE?",
      a: (
        <>
          Guests may arrange their own transportation going to and from the venue. Travel time is approximately 1hr & 30 mins from CDO, depending on traffic, so we recommend leaving early. <br/><br/>
          <a href="#wedding-details" onClick={(e) => scrollToSection(e, 'wedding-details')} className="faq-inline-link">CLICK HERE FOR THE MAP</a>
        </>
      )
    },
    {
      q: "IS THERE PARKING AVAILABLE?",
      a: "Parking is available at the venue, but slots may be limited. We encourage carpooling when possible."
    },
    {
      q: "CAN I BRING A PLUS ONE?",
      a: "As much as we’d love to accommodate everyone, we kindly request that only the guest/s named on the invitation attend due to limited space and resources."
    },
    {
      q: "IS THERE MOBILE SIGNAL OR WIFI AT THE VENUE?",
      a: "Since our celebration will be held in a mountain area in Bukidnon, mobile signal may be limited or intermittent. We encourage guests to inform loved ones ahead of time and take this as a chance to fully disconnect and be present with us during the celebration."
    },
    {
      q: "WHAT SHOULD I WEAR?",
      a: (
        <>
          We encourage guests to follow the indicated dress code to match the theme of our special day. <br/><br/>
          <a href="#dresscode" onClick={(e) => scrollToSection(e, 'dresscode')} className="faq-inline-link">CLICK HERE FOR THE DRESSCODE.</a>
        </>
      )
    },
    {
      q: "ARE KIDS ALLOWED?",
      a: "While we love your little ones, this will be an adults-focused celebration. We kindly discourage bringing children and hope you can enjoy a relaxed evening with us."
    },
    {
      q: "CAN I TAKE PHOTOS AND SHARE THEM?",
      a: "Yes! After the ceremony, feel free to take photos and share them using our wedding hashtag #ANGELOtooktherightLANIEtoforever"
    },
    {
      q: "CAN I USE MY PHONE DURING THE CEREMONY?",
      a: "We’re having an unplugged ceremony, so we kindly ask everyone to keep phones and cameras away during this time. Our photographer will capture all the special moments."
    },
    {
      q: "HOW FAR IS THE RECEPTION VENUE FROM THE CEREMONY?",
      a: "The travel time from the ceremony venue to the reception venue is approximately 30–35 minutes, depending on traffic and road conditions."
    },
    {
      q: "ARE THERE ACCOMMODATION OPTIONS NEARBY?",
      a: (
        <>
          Yes! If you plan to stay overnight, we have prepared a list of nearby options. Kindly note that bookings and expenses will be at your own arrangement.<br/><br/>
          <a href="#wedding-details" onClick={openAccommodationsModal} className="faq-inline-link">CLICK HERE TO VIEW</a>
        </>
      )
    },
    {
      q: "WHAT SHOULD I EXPECT WEATHER-WISE?",
      a: "As our celebration will be held in the cool climate of Bukidnon, bringing a shawl or wrap is highly recommended for your comfort, especially in the evening. As Bukidnon can also experience occasional rain, we kindly suggest bringing an umbrella as a precaution."
    },
    {
      q: "WHAT KIND OF GIFTS DO YOU PREFER?",
      a: "Your presence is already the best gift. But if you wish to give something extra, a monetary gift would be greatly appreciated."
    },
    {
      q: "DO I NEED TO STAY UNTIL THE END OF THE PROGRAM?",
      a: "We hope you can stay and celebrate with us until the end—we’ve prepared a full program and would love to share every moment with you."
    },
    {
      q: "WHO CAN I CONTACT FOR QUESTIONS ON THE DAY?",
      a: "For any concerns or assistance, you may reach out to our coordinator: HM Events (0917-723-3000)"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className={`faq-section ${isVisible ? 'animate-in' : ''}`}
      style={{ backgroundImage: `url(${bgDamask})` }}
      id="faq"
    >
      <div className="faq-container">
        <div className="faq-header">
          <h2 className="faq-title">FAQs</h2>
          <p className="faq-subtitle">Frequently Asked Questions</p>
        </div>

        <div className="faq-list">
          {faqData.map((item, index) => (
            <div 
              key={index} 
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            >
              <div 
                className="faq-question" 
                onClick={() => toggleAccordion(index)}
              >
                <span>{item.q}</span>
                {/* ✨ NEW: The icon wrapper that allows the smooth CSS cross-fade! */}
                <span className="faq-icon-wrapper">
                  <span className="icon-plus">+</span>
                  <span className="icon-minus">−</span>
                </span>
              </div>
              <div className="faq-answer">
                <div className="faq-answer-content">
                   <div className="faq-text-wrapper">{item.a}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;