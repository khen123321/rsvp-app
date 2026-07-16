// src/components/WeddingDetails.jsx
import { useState, useEffect, useRef } from 'react';

// Importing your specific local assets
import bg2 from '../assets/bgImage/bg2.png';
import place1 from '../assets/placeImage/place1.png';
import place2 from '../assets/placeImage/place2.png';

// The extracted and cleaned accommodation data


const cardClass = 'flex-1 border-[1.5px] border-maroon bg-[rgba(255,255,255,0.05)] p-10 max-[1100px]:w-full max-[1100px]:max-w-[600px]';
const titleClass = 'm-0 mb-[30px] flex flex-nowrap items-center justify-center font-poppins uppercase leading-[1.2]';
const scriptCapClass = 'font-pinyon text-[5rem] font-normal leading-[0.8] text-maroon max-[600px]:pr-[5px] max-[600px]:text-[3.5rem]';
const serifTextClass = 'whitespace-nowrap font-poppins text-[2.2rem] font-normal tracking-[4px] max-[600px]:text-[1.3rem] max-[600px]:tracking-[2px]';
const venueNameClass = 'mb-2 text-left font-poppins text-[1.3rem] font-medium';
const venueSubClass = 'mb-[30px] text-left font-poppins text-[1.1rem] font-light leading-[1.4]';
const cardBottomClass = 'flex items-end gap-[25px] max-[1100px]:flex-col max-[1100px]:items-center';
const detailBtnClass = 'inline-block cursor-pointer whitespace-nowrap rounded-[30px] border-2 border-maroon bg-maroon px-6 py-3 text-center font-poppins text-[0.85rem] font-semibold uppercase tracking-[2px] text-white no-underline shadow-[0_4px_15px_rgba(109,7,26,0.2)] outline-none transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:-translate-y-[3px] hover:bg-transparent hover:text-maroon hover:shadow-[0_8px_20px_rgba(109,7,26,0.3)] active:-translate-y-px active:shadow-[0_4px_10px_rgba(109,7,26,0.2)] max-[1100px]:w-full max-[1100px]:max-w-[290px] max-[1100px]:px-5 max-[1100px]:py-3.5 max-[600px]:max-w-full max-[600px]:whitespace-normal max-[600px]:px-5 max-[600px]:py-3 max-[600px]:text-[0.75rem] max-[600px]:leading-[1.4] max-[600px]:tracking-[1px]';

const accommodations = [
  {
    id: 1,
    name: "Mountain Pines Place (Reception Venue)",
    address: "Sitio Bagalangit Rd, Manolo Fortich, 8703 Bukidnon",
    contact: "0917 549 6406",
    fb: "https://www.facebook.com/mountainpinesplace",
    map: "https://maps.app.goo.gl/MZQW9JrVqRX53sUE7"
  },
  {
    id: 2,
    name: "Dahilayan BHL Tourist Inn",
    address: "P, 03 Dahilayan Rd, Dahilayan, Manolo Fortich, 8703 Bukidnon",
    contact: "0950 5631 398",
    fb: "https://www.facebook.com/profile.php?id=100090651740337",
    map: "https://maps.app.goo.gl/jNjFUgeukpFmC72Y9"
  },
  {
    id: 3,
    name: "Saddle Ridge Camp",
    address: "Dahilayan, Manolo Fortich, Philippines",
    contact: "0935 321 6479",
    fb: "https://www.facebook.com/profile.php?id=100089737420792",
    map: "https://maps.app.goo.gl/bgBqrCAbYgaRa9ub8"
  },
  {
    id: 4,
    name: "Pinegrove Mountain Lodge",
    address: "Dahilayan, Bukidnon, Dahilayan, Philippines",
    contact: "0917 622 3204",
    fb: "https://www.facebook.com/pinegrovedahilayan",
    map: "https://maps.app.goo.gl/HX7Kwgyfm1VTLtkY6"
  },
  {
    id: 5,
    name: "Dahilayan Forest Park Resort",
    address: "Brgy. Dahilayan, Manolo Fortich, Bukidnon 8703",
    contact: "0915 601 8476",
    fb: "https://www.facebook.com/dahilayanforestpark",
    map: "https://maps.app.goo.gl/BrQqfrMSTW3Hk4kE9"
  },
  {
    id: 6,
    name: "My Potterâ€™s Garden",
    address: "Sitio Bagalangit Rd, Manolo Fortich, Bukidnon, Philippines",
    contact: "0917 770 1413",
    fb: "https://www.facebook.com/mypottersgarden.organicfarm",
    map: "https://maps.app.goo.gl/sC8zHdTtaLBLuaLv7"
  },
  {
    id: 7,
    name: "Kumaykay River Farm Resort",
    address: "Zone 2 Kumaykay River Farm Resort Dahilayan, Monolo Fortich, Bukidnon",
    contact: "0965 538 6268",
    fb: "https://www.facebook.com/KRFDahilayan",
    map: "https://maps.app.goo.gl/LbWQxrTmATnhPUj28"
  },
  {
    id: 8,
    name: "The White Fence Inn",
    address: "Purok 1, Mampayag, Manolo Fortich, Philippines",
    contact: "0917 716 6100",
    fb: "https://www.facebook.com/people/The-White-Fence-Inn/100089582793022/",
    map: "https://maps.app.goo.gl/Yfc83iBBLu8YqaHd6"
  },
  {
    id: 9,
    name: "Xentro Ville",
    address: "Zone 1, Dahilayan, Manolo Fortich, Bukidnon",
    contact: "0967 770 5688",
    fb: "https://www.facebook.com/xentro.ville.dahilayan/",
    map: "https://maps.app.goo.gl/GuuNgYGFemwKtdtPA"
  },
  {
    id: 10,
    name: "Mt. Pines Spring Resort",
    address: "Dahilayan Rd, Manolo Fortich, 8703 Bukidnon",
    contact: "0997 918 1713",
    fb: "https://www.facebook.com/mt.pinesspringresort/",
    map: "https://maps.app.goo.gl/KX4Z4m82gbdFbV887"
  },
  {
    id: 11,
    name: "Alina Farm Resort - One Bedroom Cabin",
    address: "P-6 Dalirig , Manolo Fortich, Philippines",
    contact: "0967 169 9189",
    fb: "https://www.facebook.com/ALINAfarmresort",
    map: "https://maps.app.goo.gl/Xqy2W4PVTZjvZPNU9"
  },
  {
    id: 12,
    name: "The Eliana Farm Resort and Villas",
    address: "Zone 4, Mapait, Diclum, Manolo Fortich, Philippines",
    contact: "0966 419 6796",
    fb: "https://www.facebook.com/theelianaresort",
    map: "https://maps.app.goo.gl/yH6bfCfRLdDPtLAb6"
  },
  {
    id: 13,
    name: "Dream Golftel by Dream Residences",
    address: "Del Monte Golf Course , Manolo Fortich, Philippines",
    contact: "0967 938 5171",
    fb: "https://www.facebook.com/smartcondobyjim",
    map: "https://maps.app.goo.gl/Kxqwnkocy6ZicHS5A"
  },
  {
    id: 14,
    name: "Concetta Inn",
    address: "Purok 13, Damilag, Manolo Fortich, Bukidnon",
    contact: "0967 459 4657",
    fb: "https://www.facebook.com/ConcettaInn",
    map: "https://maps.app.goo.gl/guaQc1VrcMFGy4R47"
  },
  {
    id: 15,
    name: "Dahilayan Alpine Village",
    address: "Dahilayan Road, Brgy. Dahilayan, Manolo Fortich, Philippines",
    contact: "0917 622 3204",
    fb: "https://www.facebook.com/dahilayanalpinevillage",
    map: "https://maps.app.goo.gl/Y1DHNaFDjPqGCxxL9"
  }
];

const WeddingDetails = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [isModalOpen]);

  return (
    <>
      <section 
        ref={sectionRef}
        className="flex items-center justify-center bg-cover bg-center bg-no-repeat py-20 text-maroon"
        style={{ backgroundImage: `url(${bg2})` }}
      >
        <div className={`flex w-[90%] max-w-[1400px] flex-col gap-10 transition-all duration-[1200ms] ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-[30px] opacity-0'}`}>
          
          {/* Top Row: Ceremony & Reception */}
          <div className="flex justify-center gap-10 max-[1100px]:flex-col max-[1100px]:items-center">
            
            {/* Ceremony Card */}
            <div className={cardClass}>
              <h3 className={titleClass}>
                <span className={`${scriptCapClass} pr-[15px]`}>C</span>
                <span className={serifTextClass}>EREMONY</span>
              </h3>
              <div className="card-content">
                <p className={venueNameClass}>Sacred Heart of Jesus Chapel</p>
                <p className={venueSubClass}>Camp Fabia, Manolo Fortich, Bukidnon</p>
                
                <div className={cardBottomClass}>
                  <img src={place1} alt="Ceremony Venue" className="h-[180px] w-80 border border-maroon object-cover max-[1100px]:h-auto max-[1100px]:w-full" />
                  <div className="flex grow flex-col gap-3 max-[1100px]:w-full">
                    <a 
                      href="https://maps.app.goo.gl/ZfTbBebwB8KiEVVZ6" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={detailBtnClass}
                    >
                      CLICK HERE TO VIEW MAP
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Reception Card */}
            <div className={cardClass}>
              <h3 className={titleClass}>
                <span className={`${scriptCapClass} pr-[15px]`}>R</span>
                <span className={serifTextClass}>ECEPTION</span>
              </h3>
              <div className="card-content">
                <p className={venueNameClass}>Marquee, Mountain Pines Place</p>
                <p className={venueSubClass}>Sitio Bagalangit Rd., Manolo Fortich, Bukidnon</p>
                
                <div className={cardBottomClass}>
                  <img src={place2} alt="Reception Venue" className="h-[180px] w-80 border border-maroon object-cover max-[1100px]:h-auto max-[1100px]:w-full" />
                  <div className="flex grow flex-col gap-3 max-[1100px]:w-full">
                    <a 
                      href="https://www.google.com/maps/place/Mountain+Pines+Place/@8.2086993,124.860679,17z/data=!3m1!4b1!4m6!3m5!1s0x32ffbe4000000003:0x688b0e6ef71dffef!8m2!3d8.2086993!4d124.8655499!16s%2Fg%2F11b77376nn?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={detailBtnClass}
                    >
                      CLICK HERE TO VIEW MAP
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Travel Time Text */}
          <p className="mx-auto my-5 w-full text-center font-poppins text-[1.1rem] font-light italic text-[rgba(109,7,26,0.8)]">
              Travel time from the ceremony venue to the reception venue is approximately 30-35 minutes.
          </p>

          {/* Bottom Row: Accommodation */}
          <div className="flex w-full justify-center">
            <div className={`${cardClass} max-w-[900px]`}>
              <h3 className={titleClass}>
                <span className={`${scriptCapClass} mt-[15px] pr-5 max-[600px]:mt-0 max-[600px]:pr-[5px]`}>A</span>
                <span className={serifTextClass}>CCOMMODATION</span>
              </h3>
              <div className="flex flex-col items-center font-poppins text-[1.15rem] font-light leading-[2] [&_p]:m-0 [&_p]:w-full [&_p]:text-justify [&_p]:hyphens-auto [&_p]:[text-justify:inter-word]">
                <p>
                  Should you wish to stay overnight, please click the button below for nearby 
                  accommodation options and contact details. Kindly note that all bookings 
                  and related expenses will be at the guest's own arrangement and expense.
                </p>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className={`${detailBtnClass} mx-auto mt-[25px] block w-fit self-center`}
                >
                  LIST OF NEARBY HOTELS
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* THE ACCOMMODATION MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-[rgba(109,7,26,0.5)] p-5 opacity-100 backdrop-blur-md [-webkit-backdrop-filter:blur(6px)] animate-[modalFadeIn_0.3s_ease]" onClick={() => setIsModalOpen(false)}>
          <div className="flex max-h-[85vh] w-full max-w-[750px] flex-col overflow-hidden rounded-2xl border border-[rgba(109,7,26,0.2)] bg-[#fdfbf7] shadow-[0_20px_60px_rgba(0,0,0,0.3)] animate-[slideUpFade_0.4s_cubic-bezier(0.16,1,0.3,1)] max-[600px]:max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            
            <div className="relative shrink-0 border-b border-[rgba(109,7,26,0.1)] bg-[#fdfbf7] px-[30px] pb-5 pt-[30px] text-center max-[600px]:px-5 max-[600px]:pb-[15px] max-[600px]:pt-[25px]">
              <h2 className="m-0 font-pinyon text-[3.5rem] leading-[0.8] text-maroon max-[600px]:text-[2.5rem]">Accommodations</h2>
              <p className="m-0 mt-[15px] font-poppins text-[0.95rem] uppercase tracking-[4px] text-maroon opacity-80">in Manolo Fortich</p>
              <button className="absolute right-[25px] top-5 cursor-pointer border-0 bg-transparent p-2.5 text-2xl text-maroon transition-transform duration-200 hover:scale-110 hover:rotate-90" onClick={() => setIsModalOpen(false)}>âœ•</button>
            </div>

            <div className="flex flex-col gap-5 overflow-y-auto bg-[rgba(0,0,0,0.01)] px-[30px] py-[25px] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-[10px] [&::-webkit-scrollbar-thumb]:bg-[rgba(109,7,26,0.2)] hover:[&::-webkit-scrollbar-thumb]:bg-[rgba(109,7,26,0.5)] max-[600px]:px-5 max-[600px]:py-[15px]">
              {accommodations.map((hotel) => (
                <div className="rounded-xl border border-[rgba(109,7,26,0.15)] bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:border-[rgba(109,7,26,0.3)] hover:shadow-[0_8px_24px_rgba(109,7,26,0.08)] max-[600px]:p-[15px]" key={hotel.id}>
                  <h4 className="m-0 mb-3 font-poppins text-xl font-semibold text-maroon">{hotel.name}</h4>
                  <div className="[&_p]:my-1.5 [&_p]:font-poppins [&_p]:text-[0.95rem] [&_p]:leading-[1.5] [&_p]:text-[#444] [&_strong]:font-semibold [&_strong]:text-maroon">
                    <p><strong>Address:</strong> {hotel.address}</p>
                    <p><strong>Contact:</strong> {hotel.contact}</p>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <a href={hotel.fb} target="_blank" rel="noopener noreferrer" className="rounded-[30px] border border-[rgba(109,7,26,0.2)] bg-[rgba(109,7,26,0.05)] px-5 py-2.5 font-poppins text-[0.75rem] font-semibold uppercase tracking-[1px] text-maroon no-underline transition-all duration-200 hover:bg-[rgba(109,7,26,0.1)] max-[600px]:w-full max-[600px]:whitespace-normal max-[600px]:text-center max-[600px]:leading-[1.4]">
                      Facebook Page
                    </a>
                    <a href={hotel.map} target="_blank" rel="noopener noreferrer" className="rounded-[30px] border border-maroon bg-maroon px-5 py-2.5 font-poppins text-[0.75rem] font-semibold uppercase tracking-[1px] text-white no-underline transition-all duration-200 hover:bg-transparent hover:text-maroon max-[600px]:w-full max-[600px]:whitespace-normal max-[600px]:text-center max-[600px]:leading-[1.4]">
                      Google Maps
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="shrink-0 border-t border-[rgba(109,7,26,0.1)] bg-[#fdfbf7] px-[30px] py-5 text-center max-[600px]:px-5 max-[600px]:py-[15px]">
              <p className="m-0 text-center font-poppins text-[0.85rem] italic leading-[1.4] text-[#888]">Kindly note that all bookings and related expenses will be at the guest's own arrangement and expense.</p>
            </div>
            
          </div>
        </div>
      )}
    </>
  );
};

export default WeddingDetails;