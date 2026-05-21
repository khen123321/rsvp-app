// src/App.jsx
import { useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import all your existing components
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import SaveTheDate from './components/SaveTheDate';
import PhotoGallery from './components/PhotoGallery'; 
import Countdown from './components/Countdown';
import OurJourney from './components/OurJourney'; 
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
          
          {/* NOTICE: The wrappers for gallery, timeline, and faq are gone 
              because those IDs are now safely inside the components themselves! */}
          <div id="home"><Hero /></div>
          <SaveTheDate />
          <PhotoGallery /> 
          <Countdown />
          <div id="our-journey"><OurJourney /></div>
          <div id="wedding-details"><WeddingDetails /></div>
          <EventTimeline />
          <div id="dresscode"><DressCode /></div>
          <div id="entourage"><Entourage /></div>
          <PhotoCollage />
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
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;