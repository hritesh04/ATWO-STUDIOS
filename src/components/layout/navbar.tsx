"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { TextRoll } from '@/src/components/ui/text-roll';

function MagneticLink({ children, className, href, postNav }: { children: string | React.ReactNode; className?: string; href?: string, postNav?: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const [key, setKey] = useState(0);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!href || !href.startsWith('#')) return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // setTimeout(() => {
      //   postNav?.();
      // }, 400)
    }
  };

  return (
    <a
      href={href || '#'}
      className={`nav-magnetic ${className || ''}`}
      onClick={handleClick}
      onMouseEnter={() => { setIsHovered(true); setKey(k => k + 1); }}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? (
        typeof children === 'string' ? <TextRoll key={key} duration={0.25}>{children}</TextRoll> : children
      ) : (
        typeof children === 'string' ? <span>{children}</span> : children
      )}
    </a>
  );
}

interface NavbarProps {
  loading: boolean;
  isScrolled: boolean;
}

export default function Navbar({ loading, isScrolled }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <motion.nav
      className={`fixed z-[100] flex flex-col transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] top-[30px] md:top-[50px] left-1/2 -translate-x-1/2 w-[calc(100%-40px)] md:w-[calc(100%-122px)] max-w-[1318px]
        ${!isScrolled
          ? 'bg-off-white/70 backdrop-blur-md px-6 py-4 rounded-[24px] shadow-[0_8px_32px_rgba(26,26,26,0.1)] border border-off-black/5 md:bg-transparent md:px-0 md:py-0 md:rounded-none md:shadow-none md:border-transparent md:backdrop-blur-none'
          : 'bg-off-white/70 backdrop-blur-md px-6 py-4 md:px-10 md:py-5 rounded-[24px] shadow-[0_8px_32px_rgba(26,26,26,0.1)] border border-off-black/5'
        }`}
      initial={{ y: -100, opacity: 0 }}
      animate={!loading ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center w-full justify-between transition-all duration-500">
        <MagneticLink href="#hero">
        <Image
          src="/images/a2-logo.png"
          alt="ATWO Studios Logo"
          width={30}
          height={24}
          className="w-auto h-[24px] object-contain shrink-0"
          referrerPolicy="no-referrer"
          />
        </MagneticLink>

        <div className={`hidden md:flex flex-grow items-center transition-all duration-500 ${isScrolled ? 'justify-evenly px-4 xl:px-8' : 'justify-start'}`}>
          <div className={`hidden md:block text-off-black text-[24px] tracking-wide transition-all duration-500 ${isScrolled ? '' : 'ml-6 md:ml-12'}`}>
            <MagneticLink href="#about-us">ABOUT US</MagneticLink>
          </div>
          <div className={`hidden md:block text-off-black text-[24px] tracking-wide transition-all duration-500 ${isScrolled ? '' : 'ml-8'}`}>
            <MagneticLink href="#work">WORK</MagneticLink>
          </div>
          <div className={`transition-all duration-500 ${isScrolled ? 'hidden' : 'flex-grow'}`} />
          <div className="hidden md:block text-off-black text-[24px] tracking-wide transition-all duration-500">
            <MagneticLink href="#services">SERVICES</MagneticLink>
          </div>
        </div>

        <div className={`hidden md:flex items-center shrink-0 text-off-black text-[24px] tracking-wide transition-all duration-500 ${isScrolled ? '' : 'ml-8'}`}>
          <MagneticLink href="#contact-us">CONTACT US</MagneticLink>
        </div>

        <div className="md:hidden flex items-center shrink-0">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-off-black p-1 focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden w-full flex flex-col items-center gap-4 pb-2"
          >
            {['ABOUT US', 'WORK', 'SERVICES', 'CONTACT US'].map((item) => (
              <div key={item} className="text-off-black text-[24px] tracking-wide w-full text-center py-2 rounded-lg transition-colors">
                <MagneticLink href={`#${item.toLowerCase().replace(' ', '-')}`}
                postNav={()=>setIsMobileMenuOpen(false)}
                >{item}</MagneticLink>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
