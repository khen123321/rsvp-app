// src/components/WeddingVideo.jsx
import myVideo from '../assets/L1.mov';

const WeddingVideo = () => {
  return (
    <section className="flex w-full items-center justify-center bg-[url('/bg.svg')] bg-cover bg-center bg-no-repeat px-5 py-20 max-[850px]:px-[15px] max-[850px]:py-[50px]">
      <div className="w-full max-w-[1200px] overflow-hidden rounded-2xl border border-[rgba(109,7,26,0.1)] text-[0] leading-[0] shadow-[0_20px_50px_rgba(109,7,26,0.15)] max-[850px]:rounded-xl">
        <video
          className="pointer-events-none h-auto max-h-[85vh] w-full object-cover"
          src={myVideo}
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
    </section>
  );
};

export default WeddingVideo;