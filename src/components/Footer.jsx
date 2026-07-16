const Footer = () => {
  return (
    <footer className="flex w-full items-center justify-center border-t border-[rgba(244,235,225,0.1)] bg-maroon bg-[url('/bg.svg')] bg-cover bg-center bg-no-repeat px-5 py-[15px] text-cream max-[600px]:px-[15px] max-[600px]:py-[25px]">
      <div className="flex flex-col items-center gap-1 max-[600px]:gap-2">
        <div className="flex items-center gap-3 font-poppins max-[600px]:flex-wrap max-[600px]:justify-center max-[600px]:gap-x-2 max-[600px]:gap-y-[5px]">
          <span className="font-pinyon text-2xl tracking-[1px] max-[600px]:mb-0.5 max-[600px]:w-full max-[600px]:text-center max-[600px]:text-[1.8rem]">Angelo & Lanie</span>
          <span className="text-[0.8rem] opacity-40 max-[600px]:hidden">•</span>
          <span className="text-[0.8rem] font-light uppercase tracking-[2px] max-[600px]:text-[0.75rem] max-[600px]:tracking-[1.5px]">July 11, 2026</span>
          <span className="text-[0.8rem] opacity-40">•</span>
          <span className="text-[0.8rem] font-light uppercase tracking-[2px] max-[600px]:text-[0.75rem] max-[600px]:tracking-[1.5px]">Manolo Fortich, Bukidnon</span>
        </div>

        <div>
          <p className="m-0 font-poppins text-[0.6rem] uppercase tracking-[1.5px] opacity-40 max-[600px]:mt-[5px] max-[600px]:text-[0.55rem]">Made with 🤍 for the Couple</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;