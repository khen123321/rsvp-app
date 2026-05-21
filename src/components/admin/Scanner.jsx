import { useState, useEffect, useCallback, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import './Scanner.css';

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
          setScanResult({
            status: 'invalid',
            message: 'Guest is marked as Not Attending.',
          });
        }
      } else {
        setScanResult({
          status: 'invalid',
          message: `Ticket ID ${cleanCode} not found in database.`,
        });
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
      scanner.clear().catch((err) =>
        console.error('Failed to clear scanner', err)
      );
    };
  }, [verifyGuest]);

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!manualCode) return;
    verifyGuest(manualCode);
  };

  return (
    <div className="scanner-page">
      <div className="scanner-grid">
        {/* Camera */}
        <section className="scanner-card scanner-camera-box">
          <h2 className="scanner-title">Scan Guest Ticket</h2>
          <div id="qr-reader" className="scanner-reader"></div>
        </section>

        {/* Manual entry */}
        <section className="scanner-card manual-entry-box">
          <p className="scanner-hint">
            Camera not working? Enter the ticket code manually:
          </p>
          <form onSubmit={handleManualSubmit} className="manual-form">
            <input
              type="text"
              placeholder="e.g., RSVP-A7B2X9"
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
              className="manual-input"
              autoComplete="off"
              inputMode="text"
            />
            <button type="submit" className="manual-btn">
              Verify
            </button>
          </form>
        </section>
      </div>

      {/* Result MODAL */}
      {scanResult && (
        <div className="scanner-modal-overlay" onClick={() => setScanResult(null)}>
          <div
            className={`scanner-modal-content ${
              scanResult.status === 'valid' ? 'modal-valid' : 'modal-invalid'
            }`}
            onClick={(e) => e.stopPropagation()} /* Prevent clicks inside from closing it */
            role="dialog"
            aria-modal="true"
          >
            {scanResult.status === 'valid' ? (
              <>
                <h2 className="result-heading result-heading-valid">
                  ✅ Access Granted
                </h2>
                <h3 className="result-name">{scanResult.guest.name}</h3>
                <p className="result-count">
                  +{scanResult.guest.guestsCount} Total Guests
                </p>
                <p className="result-id">ID: {scanResult.guest.id}</p>
              </>
            ) : (
              <>
                <h2 className="result-heading result-heading-invalid">
                  ❌ Access Denied
                </h2>
                <p className="result-message">{scanResult.message}</p>
              </>
            )}
            <button
              onClick={() => setScanResult(null)}
              className="result-next-btn"
            >
              Scan Next Guest
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scanner;