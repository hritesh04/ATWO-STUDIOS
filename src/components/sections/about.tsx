"use client";

import { motion } from 'motion/react';
import Image from 'next/image';
import SectionHeader from '@/src/components/ui/section-header';

export default function About() {
  return (
    <section id="about" className="relative w-full min-h-[736px] bg-white">
      <div className="px-5 md:px-10 lg:px-[75px] pt-12 lg:pt-[48px] relative z-10">
        <SectionHeader label="ABOUT US" number="02" />
      </div>

      <div className="flex flex-col lg:flex-row w-full min-h-[660px] pb-12 lg:pb-0">
        {/* Image first in DOM = paints first = behind text */}
        <motion.div
          className="relative lg:absolute lg:right-0 lg:top-0 lg:bottom-0 w-full lg:w-[50%] h-[500px] lg:h-full order-2 lg:order-none"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/images/about-model.jpg"
            alt="ATWO Studios creative direction"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-top"
          />
        </motion.div>

        {/* Text second in DOM = paints on top = can blend with image */}
        <div className="relative px-5 md:px-10 lg:px-[75px] pt-[30px] lg:pt-[30px] lg:w-[55%] order-1 lg:order-none">
          <motion.h2
            className="text-[clamp(80px,12vw,160px)] leading-[0.839] text-white whitespace-nowrap relative"
            style={{
              fontFamily: '"Coolvetica Regular", Coolvetica, sans-serif',
              mixBlendMode: 'difference',
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            INSIDE<br />ATWO STUDIOS
          </motion.h2>

          <motion.p
            className="font-medium text-[20px] text-black leading-[1.02] mt-[80px] max-w-[484px] text-left"
            style={{ fontFamily: 'var(--font-dm-sans), "DM Sans", sans-serif', letterSpacing: '-0.01em' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Ideas run the show. We create ads, films, and brand visuals that look like full productions – minus the rented studios, camera, crews and production chaos. We are less interested in how things are traditionally done and more obsessed with how far an idea can go. The results feel like a real shoot. The Process? Let&apos;s just say it&apos;s unconventional.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
