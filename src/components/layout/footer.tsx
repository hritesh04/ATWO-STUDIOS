"use client";

import { motion } from 'motion/react';

export default function Footer() {
  return (
    <footer id="contact-us" className="relative w-full bg-white overflow-hidden">
      {/* CTA Section */}
      <div className="px-5 md:px-10 lg:px-[138px] pt-16 lg:pt-20">
        <motion.p
          className="font-coolvetica text-[48px] text-primary-red max-w-[440px]"
          style={{ lineHeight: 'normal', letterSpacing: '0' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          YOU SCROLLED THIS FAR FOR A REASON — LET&apos;S TALK.
        </motion.p>
      </div>

      {/* Links row */}
      <motion.div
        className="flex flex-wrap items-center gap-6 md:gap-0 md:justify-between px-5 md:px-10 lg:px-[138px] mt-16 lg:mt-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <a href="#" className="font-coolvetica text-[22px] text-primary-red hover:opacity-70 transition-opacity" data-hover>
          BOOK A CALL
        </a>
        <a href="mailto:ATWOSTUDIOS@CONTACT.COM" className="font-coolvetica text-[22px] text-primary-red underline hover:opacity-70 transition-opacity" data-hover>
          ATWOSTUDIOS@CONTACT.COM
        </a>
        <a href="#" className="font-coolvetica text-[22px] text-primary-red hover:opacity-70 transition-opacity" data-hover>
          PORTFOLIO
        </a>
        <a href="#" className="font-coolvetica text-[22px] text-primary-red hover:opacity-70 transition-opacity" data-hover>
          INSTAGRAM
        </a>
      </motion.div>

      {/* Giant branding text */}
      <motion.div
        className="w-full mt-16 lg:mt-20 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <h2
          className="text-[33.5vw] text-black leading-[0.8] whitespace-nowrap select-none w-full text-center"
          style={{
            fontFamily: '"Coolvetica Heavy Compressed", "Coolvetica Compressed", "Coolvetica", sans-serif',
            letterSpacing: '-0.02em'
          }}
        >
          ATWO STUDIOS
        </h2>
      </motion.div>

      {/* Bottom bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-5 md:px-10 lg:px-[138px] py-8 lg:py-10">
        <span className="font-coolvetica text-[22px] text-primary-red">
          TERMS & CONDITIONS
        </span>
        <span className="font-coolvetica text-[22px] text-primary-red">
          ©2026 ATWO
        </span>
        <span className="font-coolvetica text-[22px] text-primary-red">
          PRIVACY
        </span>
      </div>
    </footer>
  );
}
