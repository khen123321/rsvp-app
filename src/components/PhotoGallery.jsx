// src/components/PhotoGallery.jsx
import './PhotoGallery.css';
import bgImage from '../assets/bgImage/bg.png'; 
import img1 from '../assets/coupleImage/img1.png';
import img2 from '../assets/coupleImage/img2.png';
import img3 from '../assets/coupleImage/img3.png';

const PhotoGallery = () => {
  // Duplicating the images array creates the seamless infinite loop
  const carouselImages = [img1, img2, img3, img1, img2, img3,img1, img2, img3, img1, img2, img3,img1, img2, img3, img1, img2, img3];

  return (
    <section 
      className="photo-gallery" 
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="carousel-wrapper">
        <div className="carousel-track">
          {carouselImages.map((src, index) => (
            <div className="gallery-item" key={index}>
              <img src={src} alt={`Couple Moment ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery;