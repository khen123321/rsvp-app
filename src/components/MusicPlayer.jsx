// src/components/MusicPlayer.jsx
import { useState } from 'react';
import './MusicPlayer.css';

const MusicPlayer = ({ initialPlaying, externalAudioRef }) => {
  const [isPlaying, setIsPlaying] = useState(initialPlaying);

  const togglePlay = (e) => {
    e.stopPropagation(); 
    
    if (isPlaying) {
      externalAudioRef.current.pause();
    } else {
      externalAudioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="music-player" onClick={togglePlay}>
      <div className={`music-btn ${isPlaying ? 'playing' : ''}`}>
        <span className="music-icon">
          {isPlaying ? (
            /* Pause SVG Icon */
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
          ) : (
            /* Music Note SVG Icon */
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18V5l12-2v13"></path>
              <circle cx="6" cy="18" r="3"></circle>
              <circle cx="18" cy="16" r="3"></circle>
            </svg>
          )}
        </span>
      </div>
    </div>
  );
};

export default MusicPlayer;