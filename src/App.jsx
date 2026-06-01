// src/App.jsx
import { useState, useRef, useEffect } from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import all your existing components
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import SaveTheDate from './components/SaveTheDate';
import PhotoGallery from './components/PhotoGallery'; 
import Countdown from './components/Countdown';
import OurJourney from './components/OurJourney'; 
import WeddingVideo from './components/WeddingVideo'; 
import WeddingDetails from './components/WeddingDetails'; 
import EventTimeline from './components/EventTimeline'; 
import DressCode from './components/DressCode'; 
import Entourage from './components/Entourage'; 
import PhotoCollage from './components/PhotoCollage'; 
import FAQ from './components/FAQ'; 
import RsvpForm from './components/RsvpForm';
import Chatbot from './components/Chatbot'; 
import Footer from './components/Footer';
import MusicPlayer from './components/MusicPlayer';
import Admin from './components/admin/Admin'; 
import WelcomeEnvelope from './components/WelcomeEnvelope';

import bgMusic from './assets/bg-music.mp3';
import './index.css';

const Home = () => {
  const [hasEntered, setHasEntered] = useState(false);
  const audioRef = useRef(null);

  const handleEnterSite = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(err => console.log("Audio play failed:", err));
    }
    setHasEntered(true);
  };

  return (
    <>
      <audio ref={audioRef} src={bgMusic} loop />

      {!hasEntered && (
        <WelcomeEnvelope onEnter={handleEnterSite} />
      )}

      {hasEntered && (
        <div className="main-wrapper fade-in-site">
          <MusicPlayer initialPlaying={true} externalAudioRef={audioRef} />
          
          <Navigation />
          
          <div id="home"><Hero /></div>
          <SaveTheDate />
          <PhotoGallery /> 
          <Countdown />
          <div id="our-journey"><OurJourney /></div>
          
          <WeddingVideo />
          
          <div id="wedding-details"><WeddingDetails /></div>
          <EventTimeline />
          <div id="dresscode"><DressCode /></div>
          <div id="entourage"><Entourage /></div>
          
          {/* ✨ THE FIX: Added the style to stop the zero-height ghost bug! */}
          <div id="photo-collage" style={{ minHeight: '100vh', overflow: 'hidden' }}>
            <PhotoCollage />
          </div>
          
          <div id="faq"><FAQ /></div>
          <div id="rsvp"><RsvpForm /></div>
          
          <Chatbot />
          <Footer />
        </div>
      )}
    </>
  );
};

function App() {
  // THE MAGIC FIX: Injects global canvas transparency on app load
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      canvas {
        background: transparent !important;
        background-color: transparent !important;
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;