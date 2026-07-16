// src/components/FAQ.jsx
import { useState, useEffect, useRef } from 'react';
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
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const openAccommodationsModal = (e) => {
    e.preventDefault();

    const element = document.getElementById('wedding-details');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    document.dispatchEvent(new Event('openHotelModal'));
  };

  const faqData = [
    { q: 'WHAT TIME SHOULD I ARRIVE?', a: 'The ceremony will start at 1:00 PM. We kindly ask that you arrive at least 30 minutes before the ceremony begins so you have enough time to get settled, find your seat, and be ready as we start on time.' },
    { q: 'HOW DO I GET TO THE CEREMONY VENUE?', a: <>Guests may arrange their own transportation going to and from the venue. Travel time is approximately 1hr & 30 mins from CDO, depending on traffic, so we recommend leaving early. <br /><br /><a href="#wedding-details" onClick={(e) => scrollToSection(e, 'wedding-details')} className="ml-[5px] font-medium text-beige underline underline-offset-4 transition-[opacity,color] duration-200 hover:text-white hover:opacity-80">CLICK HERE FOR THE MAP</a></> },
    { q: 'IS THERE PARKING AVAILABLE?', a: 'Parking is available at the venue, but slots may be limited. We encourage carpooling when possible.' },
    { q: 'CAN I BRING A PLUS ONE?', a: 'As much as we’d love to accommodate everyone, we kindly request that only the guest/s named on the invitation attend due to limited space and resources.' },
    { q: 'IS THERE MOBILE SIGNAL OR WIFI AT THE VENUE?', a: 'Since our celebration will be held in a mountain area in Bukidnon, mobile signal may be limited or intermittent. We encourage guests to inform loved ones ahead of time and take this as a chance to fully disconnect and be present with us during the celebration.' },
    { q: 'WHAT SHOULD I WEAR?', a: <>We encourage guests to follow the indicated dress code to match the theme of our special day. <br /><br /><a href="#dresscode" onClick={(e) => scrollToSection(e, 'dresscode')} className="ml-[5px] font-medium text-beige underline underline-offset-4 transition-[opacity,color] duration-200 hover:text-white hover:opacity-80">CLICK HERE FOR THE DRESSCODE.</a></> },
    { q: 'ARE KIDS ALLOWED?', a: 'While we love your little ones, this will be an adults-focused celebration. We kindly discourage bringing children and hope you can enjoy a relaxed evening with us.' },
    { q: 'CAN I TAKE PHOTOS AND SHARE THEM?', a: 'Yes! After the ceremony, feel free to take photos and share them using our wedding hashtag #ANGELOtooktherightLANIEtoforever' },
    { q: 'CAN I USE MY PHONE DURING THE CEREMONY?', a: 'We’re having an unplugged ceremony, so we kindly ask everyone to keep phones and cameras away during this time. Our photographer will capture all the special moments.' },
    { q: 'HOW FAR IS THE RECEPTION VENUE FROM THE CEREMONY?', a: 'The travel time from the ceremony venue to the reception venue is approximately 30–35 minutes, depending on traffic and road conditions.' },
    { q: 'ARE THERE ACCOMMODATION OPTIONS NEARBY?', a: <>Yes! If you plan to stay overnight, we have prepared a list of nearby options. Kindly note that bookings and expenses will be at your own arrangement.<br /><br /><a href="#wedding-details" onClick={openAccommodationsModal} className="ml-[5px] font-medium text-beige underline underline-offset-4 transition-[opacity,color] duration-200 hover:text-white hover:opacity-80">CLICK HERE TO VIEW</a></> },
    { q: 'WHAT SHOULD I EXPECT WEATHER-WISE?', a: 'As our celebration will be held in the cool climate of Bukidnon, bringing a shawl or wrap is highly recommended for your comfort, especially in the evening. As Bukidnon can also experience occasional rain, we kindly suggest bringing an umbrella as a precaution.' },
    { q: 'WHAT KIND OF GIFTS DO YOU PREFER?', a: 'Your presence is already the best gift. But if you wish to give something extra, a monetary gift would be greatly appreciated.' },
    { q: 'DO I NEED TO STAY UNTIL THE END OF THE PROGRAM?', a: 'We hope you can stay and celebrate with us until the end—we’ve prepared a full program and would love to share every moment with you.' },
    { q: 'WHO CAN I CONTACT FOR QUESTIONS ON THE DAY?', a: 'For any concerns or assistance, you may reach out to our coordinator: HM Events (0917-723-3000)' }
  ];

  return (
    <section
      ref={sectionRef}
      className="flex min-h-screen items-start justify-center overflow-hidden bg-cover bg-[top_center] bg-fixed py-[120px] text-beige max-md:py-20"
      style={{ backgroundImage: `url(${bgDamask})` }}
      id="faq"
    >
      <div className={`w-[90%] max-w-[900px] transition-all duration-[1200ms] ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-[30px] opacity-0'}`}>
        <div className="mb-20 text-center">
          <h2 className="m-0 font-poppins text-[4.5rem] font-light uppercase leading-none tracking-[15px] max-md:text-[2.8rem] max-md:tracking-[8px] max-[480px]:text-[2.2rem] max-[480px]:tracking-[5px]">FAQs</h2>
          <p className="mt-[-10px] font-pinyon text-[3.5rem] font-normal max-md:text-[2.5rem] max-[480px]:text-[2.2rem]">Frequently Asked Questions</p>
        </div>

        <div className="flex flex-col border-t border-[rgba(245,245,220,0.3)]">
          {faqData.map((item, index) => {
            const active = activeIndex === index;
            return (
              <div
                key={index}
                className={`border-b border-[rgba(245,245,220,0.3)] transition-[opacity,transform,background-color] duration-[600ms] ease-out hover:bg-[rgba(255,255,255,0.03)] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}
                style={{ transitionDelay: isVisible ? `${Math.min(index + 1, 11) / 10}s` : '0s' }}
              >
                <div className="flex cursor-pointer select-none items-center justify-between px-[15px] py-[25px] max-md:px-2.5 max-md:py-5" onClick={() => toggleAccordion(index)}>
                  <span className="pr-5 font-poppins text-[1.1rem] font-medium uppercase tracking-[2px] max-md:text-[0.95rem] max-md:tracking-[1.5px]">{item.q}</span>
                  <span className="relative h-6 w-6 shrink-0">
                    <span className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[1.8rem] font-light leading-none transition-opacity duration-[350ms] ease-in-out ${active ? 'opacity-0' : 'opacity-100'}`}>+</span>
                    <span className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[1.8rem] font-light leading-none transition-opacity duration-[350ms] ease-in-out ${active ? 'opacity-100' : 'opacity-0'}`}>−</span>
                  </span>
                </div>
                <div className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${active ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-[15px] pb-[30px] pt-0">
                    <div className="m-0 font-poppins text-[1.1rem] font-light leading-[1.8] text-[rgba(245,245,220,0.85)] max-md:text-base">{item.a}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
