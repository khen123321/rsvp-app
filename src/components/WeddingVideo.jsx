// src/components/WeddingVideo.jsx
import './WeddingVideo.css';

// ✨ Import your newly converted MP4 file here!
import myVideo from '../assets/L1.mov'; 

const WeddingVideo = () => {
  return (
    <section className="video-section">
      <div className="video-container">
        <video 
          className="looping-video"
          src={myVideo}
          autoPlay 
          loop 
          muted 
          playsInline /* Crucial for making it autoplay cleanly on iPhones */
        />
      </div>
    </section>
  );
};

export default WeddingVideo;