// src/components/Navigation.jsx
import { useState, useEffect } from 'react';
import logo from '../assets/logo.png';

const navItems = [
  ['home', 'HOME'],
  ['our-journey', 'OUR STORY'],
  ['wedding-details', 'DETAILS'],
  ['photo-collage', 'GALLERY'],
  ['faq', 'FAQS'],
  ['rsvp', 'RSVP'],
];

const Navigation = () => {
  const [navColor, setNavColor] = useState('dark');
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const darkSections = ['our-journey', 'timeline', 'entourage', 'faq'];
      let isOverDark = false;

      for (const id of darkSections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 10) {
            isOverDark = true;
            break;
          }
        }
      }
      setNavColor(isOverDark ? 'light' : 'dark');

      const allSections = ['home', 'our-journey', 'wedding-details', 'photo-collage', 'faq', 'rsvp'];
      let currentActive = null;
      let maxVisibleHeight = 0;

      for (const id of allSections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const visibleTop = Math.max(0, rect.top);
          const visibleBottom = Math.min(window.innerHeight, rect.bottom);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);

          if (visibleHeight > maxVisibleHeight && visibleHeight > 0) {
            maxVisibleHeight = visibleHeight;
            currentActive = id;
          }
        }
      }

      if (window.innerHeight + Math.round(window.scrollY) >= document.documentElement.scrollHeight - 50) {
        setActiveSection('rsvp');
      } else if (currentActive) {
        setActiveSection(currentActive);
      }
    };

    window.addEventListener('scroll', handleScroll, true);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll, true);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const lightMode = navColor === 'light';

  return (
    <nav className="fixed left-0 top-0 z-[1000] flex w-full justify-center border-b border-[rgba(245,245,220,0.15)] bg-[rgba(110,1,21,0.192)] py-[5px] backdrop-blur-xl transition-all duration-500 ease-in-out [-webkit-backdrop-filter:blur(12px)]">
      <div className="flex w-full items-center justify-between px-10 max-[992px]:px-[15px]">
        <div className="mr-5 flex shrink-0 cursor-pointer items-center" onClick={() => scrollToSection('home')}>
          <img
            src={logo}
            alt="L&A Monogram"
            className={`h-[55px] w-auto transition-[transform,filter] duration-[600ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] hover:scale-110 hover:rotate-3 max-[992px]:h-10 ${lightMode ? 'brightness-0 invert-[91%] sepia-[14%] saturate-[836%] hue-rotate-[332deg] brightness-[101%] contrast-[93%]' : ''}`}
          />
        </div>

        <ul className="m-0 flex list-none items-center gap-[25px] p-0 max-[992px]:gap-5 max-[992px]:overflow-x-auto max-[992px]:pb-[5px] max-[992px]:[-ms-overflow-style:none] max-[992px]:[scrollbar-width:none] max-[992px]:[&::-webkit-scrollbar]:hidden">
          {navItems.map(([id, label]) => {
            const active = activeSection === id;
            return (
              <li
                key={id}
                className={`relative cursor-pointer whitespace-nowrap text-[0.75rem] font-semibold uppercase tracking-[1.5px] transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] after:absolute after:bottom-[-4px] after:left-0 after:h-px after:w-0 after:bg-beige after:transition-[width] after:duration-300 after:ease-in-out hover:-translate-y-0.5 hover:text-white hover:after:w-full max-[992px]:text-[0.7rem] max-[992px]:tracking-[1px] ${lightMode ? 'text-beige after:bg-white hover:text-white hover:[text-shadow:0_0_8px_rgba(255,255,255,0.3)]' : 'text-maroon'} ${active ? '-translate-y-0.5 text-white after:w-full [text-shadow:0_0_8px_rgba(255,255,255,0.3)]' : ''}`}
                onClick={() => scrollToSection(id)}
              >
                {label}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
