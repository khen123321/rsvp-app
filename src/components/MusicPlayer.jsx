// src/components/MusicPlayer.jsx
import { useState } from 'react';

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
    <div className="fixed bottom-[30px] right-[95px] z-[9999] cursor-pointer hover:[&>div]:scale-110 max-md:bottom-5 max-md:right-20" onClick={togglePlay}>
      <div className={`flex h-[50px] w-[50px] items-center justify-center rounded-full border-2 border-beige bg-maroon shadow-[0_4px_15px_rgba(0,0,0,0.3)] transition-all duration-300 ease-in-out max-md:h-[45px] max-md:w-[45px] ${isPlaying ? 'animate-[musicPulse_2s_infinite]' : ''}`}>
        <span className="flex items-center justify-center text-beige [&_svg]:h-[22px] [&_svg]:w-[22px] [&_svg]:text-beige [&_svg]:transition-transform [&_svg]:duration-200 max-md:[&_svg]:h-5 max-md:[&_svg]:w-5">
          {isPlaying ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
          ) : (
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