// src/components/RsvpForm.jsx
import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const initialState = {
  fullName: '',
  guests: '1',
  attending: '',
  contactNumber: '',
  message: '',
};

const formGroupClass = 'flex flex-col [&_label]:mb-2.5 [&_label]:font-georgia [&_label]:text-[1.1rem] [&_label]:font-semibold max-md:[&_label]:text-base';
const inputClass = 'w-full rounded-lg border border-[rgba(109,7,26,0.3)] bg-white px-4 py-3.5 font-poppins text-base text-[#5C2A21] shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] outline-none transition-all duration-300 ease-in-out focus:border-maroon focus:shadow-[0_0_0_3px_rgba(109,7,26,0.1)] disabled:cursor-not-allowed disabled:bg-[#f0f0f0] disabled:opacity-60 max-md:p-3.5';
const radioInputClass = "mr-3 grid h-4 w-4 shrink-0 cursor-pointer appearance-none place-content-center border border-[#5C2A21] bg-white before:h-2.5 before:w-2.5 before:scale-0 before:bg-[#5C2A21] before:transition-transform before:duration-[120ms] before:ease-in-out before:content-[''] checked:before:scale-100 disabled:cursor-not-allowed disabled:opacity-60";
const submitBtnClass = 'self-start rounded-[50px] border-2 border-maroon bg-maroon px-10 py-3.5 font-poppins text-[0.9rem] font-bold uppercase tracking-[2px] text-white shadow-[0_8px_20px_rgba(109,7,26,0.25)] outline-none transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:enabled:-translate-y-[3px] hover:enabled:bg-transparent hover:enabled:text-maroon hover:enabled:shadow-[0_12px_25px_rgba(109,7,26,0.35)] active:enabled:translate-y-px active:enabled:shadow-[0_4px_10px_rgba(109,7,26,0.2)] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:transform-none max-md:w-full max-md:px-5 max-md:py-4';

const RsvpForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [submitStatus, setSubmitStatus] = useState('');
  const [ticketId] = useState('');
  const [submittedData] = useState(null);

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

    const styleExisting = () => {
      const canvases = document.querySelectorAll('canvas');
      canvases.forEach(forceCanvasTransparent);
    };

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

    styleExisting();

    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('closed');
  };

  return (
    <section
      className="flex min-h-[80vh] items-center justify-center bg-cream bg-cover bg-center bg-no-repeat py-[100px] text-[#5C2A21] max-md:px-[15px] max-md:py-[60px]"
      id="rsvp"
      style={{ backgroundImage: `url('/bg2.png')` }}
    >
      <div className="mx-auto flex w-[90%] max-w-[1000px] gap-[50px] bg-transparent shadow-none max-md:w-full max-md:flex-col max-md:gap-5">
        <div className="flex h-full min-w-[100px] flex-col items-center pt-2.5 max-md:min-w-full max-md:pt-0">
          <span className="m-0 font-georgia text-[1.4rem] tracking-[1px] max-md:text-[1.2rem]">Kindly</span>
          <div className="mt-5 flex flex-1 flex-col justify-between text-center font-georgia text-[10rem] leading-[0.9] max-md:mt-[-10px] max-md:flex-row max-md:gap-[15px] max-md:text-[4.5rem]">
            <span>R</span>
            <span>S</span>
            <span>V</span>
            <span>P</span>
          </div>
        </div>

        <div className="w-px border-l-2 border-dotted border-[#5C2A21] opacity-60 max-md:hidden" />

        <div className="min-w-0 flex-1 pl-2.5 max-md:flex max-md:flex-col max-md:items-center max-md:pl-0">
          {submitStatus === 'success' && submittedData ? (
            <div className="animate-[fadeIn_0.8s_ease-out_forwards]">
              <h2 className="m-0 mb-5 font-pinyon text-[4.5rem] leading-[1.1] text-[#5C2A21] max-md:mb-2.5 max-md:text-center max-md:text-[3.2rem]">
                {submittedData.attending === 'yes' ? 'Thank you so much for your response!' : "We'll miss you!"}
              </h2>

              <div className="mb-10 rounded-lg border-l-4 border-[#5C2A21] bg-[rgba(255,255,255,0.4)] p-[25px] font-poppins text-[1.05rem] leading-[1.8]">
                <p>
                  {submittedData.attending === 'yes'
                    ? 'Kindly note that your RSVP will be considered final, as we have limited seats available due to our venue capacity. Should your plans change, we would truly appreciate it if you could inform us ahead of time. Please take a screenshot of your digital ticket below.'
                    : 'Thank you for letting us know. We will miss you on our special day!'}
                </p>
                <p className="mt-[15px] font-georgia font-semibold italic">
                  {submittedData.attending === 'yes'
                    ? "We can't wait to celebrate with you! 🤍"
                    : 'With love, Angelo & Lanie 🤍'}
                </p>
              </div>

              {submittedData.attending === 'yes' && (
                <div className="relative flex max-w-[600px] overflow-hidden rounded-xl border-2 border-[#5C2A21] bg-ivory shadow-[0_10px_25px_rgba(92,42,33,0.15)] max-md:max-w-full max-md:flex-col">
                  <div className="absolute left-[65%] top-[-17px] z-[2] h-[30px] w-[30px] -translate-x-1/2 rounded-full border-2 border-[#5C2A21] bg-cream max-md:hidden" />
                  <div className="absolute bottom-[-17px] left-[65%] z-[2] h-[30px] w-[30px] -translate-x-1/2 rounded-full border-2 border-[#5C2A21] bg-cream max-md:hidden" />

                  <div className="flex flex-[65%] flex-col justify-center p-[30px] max-md:items-center max-md:px-5 max-md:py-[25px] max-md:text-center">
                    <p className="m-0 mb-[5px] font-poppins text-[0.8rem] tracking-[3px] opacity-70">ADMIT</p>
                    <h3 className="m-0 mb-[5px] font-georgia text-[2rem] uppercase">
                      {submittedData.guests}{' '}
                      {Number(submittedData.guests) > 1 ? 'GUESTS' : 'GUEST'}
                    </h3>
                    <p className="m-0 mb-[25px] font-pinyon text-[2.2rem] leading-none">{submittedData.fullName}</p>

                    <div className="flex gap-[30px] max-md:justify-center">
                      <div className="flex flex-col">
                        <span className="font-poppins text-[0.7rem] tracking-[2px] opacity-70">DATE</span>
                        <span className="font-georgia text-base font-semibold">JULY 11, 2026</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-poppins text-[0.7rem] tracking-[2px] opacity-70">TICKET ID</span>
                        <span className="font-georgia text-base font-semibold tracking-[1px] text-maroon">{ticketId}</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative left-px w-0.5 bg-[linear-gradient(to_bottom,#5C2A21_50%,transparent_50%)] bg-[length:2px_14px] bg-repeat-y max-md:left-0 max-md:h-0.5 max-md:w-full max-md:bg-[linear-gradient(to_right,#5C2A21_50%,transparent_50%)] max-md:bg-[length:14px_2px] max-md:bg-repeat-x" />

                  <div className="flex flex-[35%] flex-col items-center justify-center bg-[rgba(92,42,33,0.05)] px-5 py-[30px]">
                    <div className="mb-2.5 h-[100px] w-[100px] mix-blend-multiply [&_svg]:!h-full [&_svg]:!w-full">
                      <QRCodeSVG
                        value={`Name: ${submittedData.fullName} | ID: ${ticketId} | Guests: ${submittedData.guests}`}
                        size={100}
                        fgColor="#5C2A21"
                        bgColor="transparent"
                      />
                    </div>
                    <span className="font-poppins text-[0.75rem] font-semibold tracking-[2px]">SCAN FOR ENTRY</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="animate-[fadeIn_0.8s_ease-out_forwards]">
              <h2 className="m-0 mb-[15px] font-pinyon text-[4rem] font-normal leading-none max-md:mb-2.5 max-md:text-center max-md:text-[3.2rem]">Will you be there?</h2>

              <p className="mb-10 font-poppins text-[0.95rem] leading-[1.6] opacity-90 max-md:mb-[30px] max-md:text-justify max-md:text-[0.9rem]">
                We would be truly grateful if you could kindly confirm your attendance by completing the form below. You may also reply through our personal Facebook accounts or message HM Events at 0917-723-3000.
              </p>

              <p className="mb-2 font-poppins text-[0.95rem] italic leading-[1.6] opacity-85 max-md:text-justify max-md:text-[0.9rem]">
                Kindly note: If multiple guests are attending under one invitation, we respectfully ask that each guest fill out the RSVP form individually for proper seat allocation and coordination.
              </p>

              <p className="mt-0 mb-10 font-poppins text-[0.95rem] italic leading-[1.6] opacity-85 max-md:mb-[30px] max-md:text-justify max-md:text-[0.9rem]">
                We also kindly ask everyone to follow the number of seats allocated in your invitation. As much as we would love to accommodate everyone, we humbly request <strong>no plus ones please</strong>.
              </p>

              <form className="flex flex-col gap-[25px] max-md:w-full" onSubmit={handleSubmit}>
                <div className={formGroupClass}>
                  <label htmlFor="fullName">Full Name</label>
                  <input className={inputClass} type="text" id="fullName" name="fullName" placeholder="e.g. John Doe" value={formData.fullName} onChange={handleChange} required disabled={submitStatus === 'closed'} />
                </div>

                <div className="flex flex-col gap-2.5">
                  <p className="mb-[15px] font-georgia text-[1.1rem] font-semibold leading-[1.4] max-md:text-base">
                    Will you be able to join us as we celebrate our wedding on July 11, 2026 (Saturday) at Manolo Fortich, Bukidnon?
                  </p>

                  <label className="flex cursor-pointer items-center font-georgia text-[1.05rem] [&:has(input:disabled)]:cursor-not-allowed [&:has(input:disabled)]:opacity-60">
                    <input className={radioInputClass} type="radio" name="attending" value="yes" checked={formData.attending === 'yes'} onChange={handleChange} required disabled={submitStatus === 'closed'} />
                    <span></span>
                    Yes, we are happy to celebrate with you
                  </label>

                  <label className="flex cursor-pointer items-center font-georgia text-[1.05rem] [&:has(input:disabled)]:cursor-not-allowed [&:has(input:disabled)]:opacity-60">
                    <input className={radioInputClass} type="radio" name="attending" value="no" checked={formData.attending === 'no'} onChange={handleChange} required disabled={submitStatus === 'closed'} />
                    <span></span>
                    Sorry, we won't be able to make it
                  </label>
                </div>

                <div className={formGroupClass}>
                  <label htmlFor="contactNumber">Contact Number:</label>
                  <input className={inputClass} type="tel" id="contactNumber" name="contactNumber" placeholder="For urgent updates" value={formData.contactNumber} onChange={handleChange} required disabled={submitStatus === 'closed'} />
                </div>

                <div className={formGroupClass}>
                  <label htmlFor="message">A short message to the couple (optional but very much appreciated):</label>
                  <textarea className={`${inputClass} min-h-20 resize-y`} id="message" name="message" rows="3" value={formData.message} onChange={handleChange} disabled={submitStatus === 'closed'}></textarea>
                </div>

                <div className="mt-[15px] flex flex-col gap-2.5 max-md:w-full max-md:items-center">
                  <button type="submit" className={submitBtnClass} disabled={submitStatus === 'closed'}>
                    SUBMIT RSVP
                  </button>

                  {submitStatus === 'closed' && (
                    <p className="mt-[15px] font-poppins text-[1.05rem] font-bold text-maroon animate-[fadeIn_0.8s_ease-out_forwards]">
                      Can't submit, the wedding is already done.
                    </p>
                  )}

                  {submitStatus === 'error' && (
                    <p className="font-poppins text-[0.9rem] text-[#c62828]">Oops! Something went wrong. Please try again.</p>
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
