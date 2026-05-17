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

// ✨ Import the Interactive Envelope!
import WelcomeEnvelope from './components/WelcomeEnvelope';

// Import the music directly here for the Welcome Screen
import bgMusic from './assets/bg-music.mp3';

import './index.css';

const Home = () => {
  const [hasEntered, setHasEntered] = useState(false);
  const audioRef = useRef(null);

  // This is passed to the Envelope. It runs when the animation is complete or skipped.
  const handleEnterSite = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(err => console.log("Audio play failed:", err));
    }
    setHasEntered(true);
  };

  return (
    <>
      {/* Hidden Audio Element */}
      <audio ref={audioRef} src={bgMusic} loop />

      {/* 1. Show the Envelope Animation if they haven't entered yet */}
      {!hasEntered && (
        <WelcomeEnvelope onEnter={handleEnterSite} />
      )}

      {/* 2. Show the main website once they enter */}
      {hasEntered && (
        <div className="main-wrapper fade-in-site">
          {/* We pass a prop to MusicPlayer so it knows the music is already playing! */}
          <MusicPlayer initialPlaying={true} externalAudioRef={audioRef} />
          
          <Navigation />
          <Hero />
          <SaveTheDate />
          <PhotoGallery /> 
          <Countdown />
          <OurJourney />
          <div id="details"><WeddingDetails /></div>
          <EventTimeline />
          <DressCode />
          <Entourage />
          <PhotoCollage />
          <FAQ />
          <RsvpForm />
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