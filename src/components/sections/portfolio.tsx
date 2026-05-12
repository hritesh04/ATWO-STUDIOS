"use client";

import { motion } from 'motion/react';
import Image from 'next/image';
import SectionHeader from '@/src/components/ui/section-header';
import GlassmorphicPill from '@/src/components/ui/glassmorphic-pill';

interface Project {
  title: string;
  image: string;
  tags: string[];
}

const PROJECTS: Project[] = [
  {
    title: 'Prada — Tailored Luxury Campaign',
    image: '/images/demo-prada.jpg',
    tags: ['Luxury', 'Fashion', 'Creative Direction'],
  },
  {
    title: 'Rhode — Beauty Campaign',
    image: '/images/demo-rhode.jpg',
    tags: ['Beauty', 'Skin', 'Commercial'],
  },
  {
    title: 'Ornate Flesh — Artistic Campaign',
    image: '/images/demo-ornate-1.jpg',
    tags: ['Concept', 'Experimental', 'Form', 'Styling'],
  },
  {
    title: 'Kartik Research — Sustainable Fashion Campaign',
    image: '/images/demo-ornate-2.jpg',
    tags: ['Sustainable', 'Textile', 'Narrative'],
  },
];

export default function Portfolio() {
  return (
    <section id="work" className="relative w-full bg-white py-10 lg:py-[40px]">
      <div className="px-5 md:px-10 lg:px-[75px]">
        <SectionHeader label="PORTFOLIO" number="04" />

        {/* Heading area */}
        <div className="relative mt-8 lg:mt-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-0 mb-10 lg:mb-16">
          <motion.h2
            className="text-[12vw] lg:text-[216.4px] leading-[0.839] text-black select-none"
            style={{
              fontFamily: '"Coolvetica Regular", Coolvetica, sans-serif',
              letterSpacing: '-0.01em'
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            OUR<br />WORK
          </motion.h2>

          <motion.p
            className="font-normal text-[20px] text-black leading-normal max-w-[282px] text-left"
            style={{ fontFamily: 'var(--font-dm-sans), "DM Sans", sans-serif', letterSpacing: '-0.03em' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Looks like a production circus happened here. Plot twist : It didn&apos;t.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={i}
              className="relative w-full aspect-[634/511] overflow-hidden group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay content */}
              <div className="absolute inset-0 flex flex-col justify-between p-5 lg:p-[30px]">
                {/* Top row */}
                <div className="flex items-start justify-between">
                  <span
                    style={{
                      fontFamily: 'var(--font-dm-sans), "DM Sans", sans-serif',
                      fontWeight: 300,
                      fontSize: '21.36px',
                      lineHeight: '38.4px',
                      letterSpacing: '-0.51px',
                      color: 'white',
                    }}
                  >
                    {project.title}
                  </span>
                  <span className="font-coolvetica text-white text-base">✦</span>
                </div>

                {/* Bottom tags */}
                <div className="flex gap-2 flex-wrap">
                  {project.tags.map((tag) => (
                    <GlassmorphicPill key={tag} label={tag} />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
