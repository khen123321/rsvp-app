import { useState, useEffect, useCallback, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const cardClass = 'rounded-[14px] border border-[#e6e8ec] bg-white p-5 shadow-[0_1px_2px_rgba(11,18,32,0.04)] max-[640px]:rounded-xl max-[640px]:p-4';
const manualInputClass = 'min-w-0 flex-[1_1_220px] rounded-lg border border-[#d4d8df] bg-[#fafbfc] px-3.5 py-3 text-base uppercase text-[#0b1220] outline-none transition-[border-color,box-shadow,background] duration-150 ease-in-out focus:border-[#0b1220] focus:bg-white focus:shadow-[0_0_0_3px_rgba(11,18,32,0.08)] max-[640px]:w-full max-[640px]:flex-auto';

const Scanner = ({ guests }) => {
  const [scanResult, setScanResult] = useState(null);
  const [manualCode, setManualCode] = useState('');
  const scannerRef = useRef(null);

  const verifyGuest = useCallback(
    (codeToVerify) => {
      const cleanCode = codeToVerify.trim().toUpperCase();
      const foundGuest = guests.find((g) => g.id === cleanCode);

      if (foundGuest) {
        if (foundGuest.isAttending) {
          setScanResult({ status: 'valid', guest: foundGuest });
        } else {
          setScanResult({ status: 'invalid', message: 'Guest is marked as Not Attending.' });
        }
      } else {
        setScanResult({ status: 'invalid', message: `Ticket ID ${cleanCode} not found in database.` });
      }

      setManualCode('');
    },
    [guests]
  );

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('qr-reader', {
      qrbox: { width: 200, height: 200 },
      fps: 10,
      rememberLastUsedCamera: true,
    });
    scannerRef.current = scanner;

    scanner.render(
      (decodedText) => verifyGuest(decodedText),
      () => {}
    );

    return () => {
      scanner.clear().catch((err) => console.error('Failed to clear scanner', err));
    };
  }, [verifyGuest]);

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!manualCode) return;
    verifyGuest(manualCode);
  };

  const valid = scanResult?.status === 'valid';

  return (
    <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-6 px-5 pb-12 pt-6 box-border max-[640px]:gap-4 max-[640px]:px-3.5 max-[640px]:pb-8 max-[640px]:pt-4 max-[420px]:px-2.5 max-[420px]:pb-6 max-[420px]:pt-3">
      <div className="grid grid-cols-[1.2fr_1fr] items-start gap-5 max-[900px]:grid-cols-1">
        <section className={cardClass}>
          <h2 className="m-0 mb-4 text-center text-[1.15rem] font-semibold text-[#0b1220] max-[640px]:text-[1.05rem] max-[420px]:text-base">Scan Guest Ticket</h2>
          <div
            id="qr-reader"
            className="relative mx-auto aspect-square w-full max-w-[360px] overflow-hidden rounded-xl bg-[#0b1220] max-[640px]:max-w-[280px] max-[420px]:max-w-60 [&_video]:!h-full [&_video]:!w-full [&_video]:rounded-xl [&_video]:object-cover [&_canvas]:!h-full [&_canvas]:!w-full [&_canvas]:rounded-xl [&_canvas]:object-cover [&_img]:h-auto [&_img]:max-w-full [&_button]:!m-1 [&_button]:!cursor-pointer [&_button]:!rounded-lg [&_button]:!border [&_button]:!border-[#d4d8df] [&_button]:!bg-[#fafbfc] [&_button]:!px-3 [&_button]:!py-2 [&_button]:!text-[0.9rem] [&_button]:!text-[#0b1220] [&_a]:!m-1 [&_a]:!cursor-pointer [&_a]:!rounded-lg [&_a]:!border [&_a]:!border-[#d4d8df] [&_a]:!bg-[#fafbfc] [&_a]:!px-3 [&_a]:!py-2 [&_a]:!text-[0.9rem] [&_a]:!text-[#0b1220] [&_select]:w-full [&_select]:max-w-full [&_select]:rounded-lg [&_select]:border [&_select]:border-[#d4d8df] [&_select]:p-2 [&_select]:text-[0.9rem] max-[420px]:[&_button]:!my-1 max-[420px]:[&_button]:!w-full max-[420px]:[&_a]:!my-1 max-[420px]:[&_a]:!w-full"
          ></div>
        </section>

        <section className={cardClass}>
          <p className="m-0 mb-3 text-center text-[0.95rem] text-[#475063] max-[420px]:text-[0.9rem]">Camera not working? Enter the ticket code manually:</p>
          <form onSubmit={handleManualSubmit} className="flex flex-wrap justify-center gap-2.5 max-[640px]:flex-col">
            <input type="text" placeholder="e.g., RSVP-A7B2X9" value={manualCode} onChange={(e) => setManualCode(e.target.value)} className={manualInputClass} autoComplete="off" inputMode="text" />
            <button type="submit" className="min-h-11 cursor-pointer rounded-lg border border-[#0b1220] bg-[#0b1220] px-5 py-3 text-[0.95rem] font-semibold text-white transition-[background,transform] duration-150 hover:bg-[#1a2334] active:translate-y-px max-[640px]:w-full max-[640px]:flex-auto">
              Verify
            </button>
          </form>
        </section>
      </div>

      {scanResult && (
        <div className="fixed left-0 top-0 z-[99999] flex h-screen w-screen items-center justify-center bg-[rgba(11,18,32,0.7)] p-5 backdrop-blur" onClick={() => setScanResult(null)}>
          <div className={`w-full max-w-[400px] rounded-2xl px-6 py-8 text-center shadow-[0_10px_40px_rgba(0,0,0,0.25)] animate-[modal-pop_0.3s_cubic-bezier(0.175,0.885,0.32,1.275)] motion-reduce:animate-none max-[640px]:px-5 max-[640px]:py-6 ${valid ? 'border-2 border-[#b9e6cf] bg-[#e8f7f0]' : 'border-2 border-[#f5c2c8] bg-[#fdecee]'}`} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            {valid ? (
              <>
                <h2 className="m-0 mb-4 text-[1.6rem] text-[#0d9b6c] max-[640px]:text-[1.4rem]">✅ Access Granted</h2>
                <h3 className="m-0 text-[1.3rem] font-bold text-[#0b1220] max-[640px]:text-[1.2rem]">{scanResult.guest.name}</h3>
                <p className="mb-1.5 mt-3 text-[1.2rem] font-bold text-[#0d9b6c] max-[640px]:text-[1.1rem]">+{scanResult.guest.guestsCount} Total Guests</p>
                <p className="m-0 break-all text-[0.95rem] text-[#475063]">ID: {scanResult.guest.id}</p>
              </>
            ) : (
              <>
                <h2 className="m-0 mb-4 text-[1.6rem] text-[#d7263d] max-[640px]:text-[1.4rem]">❌ Access Denied</h2>
                <p className="m-0 px-2.5 text-[1.1rem] font-medium text-[#0b1220]">{scanResult.message}</p>
              </>
            )}
            <button onClick={() => setScanResult(null)} className="mt-6 min-h-11 w-full cursor-pointer rounded-lg border border-[#d4d8df] bg-white px-6 py-3 text-base font-semibold text-[#0b1220] shadow-[0_2px_6px_rgba(0,0,0,0.05)] transition-colors duration-150 hover:bg-[#f6f7f9]">
              Scan Next Guest
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scanner;
