// src/components/PhotoGallery.jsx
import bgImage from '../assets/bgImage/bg.svg';

import img1 from '../assets/photogallery/28.svg';
import img2 from '../assets/photogallery/29.svg';
import img3 from '../assets/photogallery/30.svg';

const PhotoGallery = () => {
  const galleryImages = [img1, img2, img3];

  return (
    <section
      id="gallery"
      className="flex min-h-[80vh] w-full items-center justify-center overflow-hidden bg-maroon bg-cover bg-center bg-no-repeat px-5 py-[100px] max-[850px]:py-20"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="flex w-full max-w-[1200px] items-center justify-center gap-[60px] max-[1100px]:gap-[30px] max-[850px]:flex-col max-[850px]:gap-[50px]">
        {galleryImages.map((src, index) => (
          <div
            className="aspect-[2/3] w-80 flex-[0_0_auto] [transform:translateZ(0)] overflow-hidden rounded-[500px] shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-shadow duration-[400ms] ease-in-out [-webkit-mask-image:-webkit-radial-gradient(white,black)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.6)] hover:[&_img]:scale-[1.15] max-[1100px]:w-[260px] max-[850px]:w-[300px] max-[480px]:w-[270px]"
            key={index}
          >
            <img className="block h-full w-full scale-[1.06] object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" src={src} alt={`Couple Moment ${index + 1}`} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PhotoGallery;