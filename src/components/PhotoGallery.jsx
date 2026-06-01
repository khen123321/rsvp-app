// src/components/PhotoGallery.jsx
import './PhotoGallery.css';
import bgImage from '../assets/bgImage/bg.svg'; 

// Imported your new SVG graphics
import img1 from '../assets/photogallery/28.svg';
import img2 from '../assets/photogallery/29.svg';
import img3 from '../assets/photogallery/30.svg';

const PhotoGallery = () => {
  // Just your 3 stunning images, no duplicates!
  const galleryImages = [img1, img2, img3];

  return (
    <section 
      id="gallery" /*   STILL HAS THE MAGIC FIX   */
      className="photo-gallery" 
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="gallery-wrapper">
        {galleryImages.map((src, index) => (
          <div className="gallery-item" key={index}>
            <img src={src} alt={`Couple Moment ${index + 1}`} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PhotoGallery;