"use client";

import { motion } from 'motion/react';
import Image from 'next/image';

interface ShowcaseProject {
  name: string;
  year: string;
  image: string;
}

const PROJECTS: ShowcaseProject[] = [
  { name: 'GULLY', year: '2025', image: '/images/project-gully.jpg' },
  { name: 'ENOLA', year: '2025', image: '/images/project-enola-2.jpg' },
  { name: 'PRADA', year: '2025', image: '/images/project-prada.jpg' },
  { name: 'ORNATE FLESH', year: '2025', image: '/images/project-ornate.jpg' },
];

export default function ProjectsShowcase() {
  return (
    <section className="relative w-full bg-black overflow-hidden h-[200vh] md:h-[350vh]">
      {/* Top atmospheric image */}
      <div className="relative w-full h-[300px] md:h-[500px] lg:h-[611px]">
        <Image
          src="/images/project-bg.jpg"
          alt="Projects atmosphere"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Project entries */}
      <div className="absolute top-5 md:top-50 left-0 w-full h-full px-5 md:px-10 lg:px-[87px] py-12 lg:py-0 flex flex-col gap-22 md:max-w-[85%]">
        {PROJECTS.map((project, i) => (
          <motion.div
            key={project.name}
            className="flex flex-col lg:flex-row items-start gap-6 lg:gap-0 lg:mb-0 lg:min-h-[578px]"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Left caption */}
            <div className="w-full lg:w-[15%] flex flex-col justify-start pt-0 lg:pt-2 shrink-0">
              <h3 className="font-[var(--font-inter)] font-medium text-[clamp(20px,1.7vw,24px)] text-white tracking-tight leading-tight">
                {project.name}
              </h3>
              <div className="w-full h-[3px] bg-medium-gray mt-3 mb-2" />
              <span className="font-[var(--font-inter)] font-medium text-lg text-medium-gray tracking-tight">
                {project.year}
              </span>
            </div>

            {/* Right image */}
            <div className="relative w-full lg:w-[85%] aspect-[1039/578] overflow-hidden">
              <Image
                src={project.image}
                alt={project.name}
                fill
                sizes="(max-width: 1024px) 100vw, 85vw"
                className="object-cover"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
