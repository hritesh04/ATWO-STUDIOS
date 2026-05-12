"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';

interface ShowcaseProject {
  name: string;
  year: string;
  image: string;
  video: string
}

const PROJECTS: ShowcaseProject[] = [
  { name: 'GULLY', year: '2025', image: '/images/project-gully.jpg', video:'/videos/gully.mp4' },
  { name: 'ENOLA', year: '2025', image: '/images/project-enola-2.jpg',video:'/videos/enola.mp4' },
  { name: 'PRADA', year: '2025', image: '/images/project-prada.jpg',video:'' },
  { name: 'ORNATE FLESH', year: '2025', image: '/images/project-ornate.jpg',video:'/videos/ornate.mp4' },
];

function Card({ project, i, progress, range }: { project: ShowcaseProject; i: number; progress: any; range: number[] }) {
  const container = useRef(null);
  
  const sinkY = 180 - (i * 60);
  const y = useTransform(progress, 
    [range[0], range[1], range[2], range[3]], 
    [700, 30, 30, sinkY]
  );
  
  const scale = useTransform(progress,
    [range[0], range[1], range[2], range[3]],
    [1, 1, 1, 0.6]
  );

  const opacity = 1;

  return (
    <div key={project.name} ref={container} className="h-[120vh] w-full flex items-start justify-center sticky top-0 pointer-events-none">
      <motion.div
        style={{ scale, y, opacity, top: '12vh' }}
        className="flex flex-col w-full lg:flex-row items-start gap-6 lg:gap-0 lg:min-h-[578px] p-6 rounded-[24px] lg:rounded-[40px] pointer-events-auto"
      >
        {/* Left caption */}
        <div className="w-full lg:w-[15%] flex flex-col justify-start pt-0 lg:pt-2 shrink-0">
          <h3 className="font-[var(--font-inter)] font-medium text-[clamp(24px,2vw,32px)] text-white tracking-tight leading-tight">
            {project.name}
          </h3>
          <div className="w-full h-[3px] bg-medium-gray mt-4 mb-2" />
          <span className="font-[var(--font-inter)] font-medium text-lg text-medium-gray tracking-tight">
            {project.year}
          </span>
        </div>

        {/* Right image */}
        <div className="relative w-full aspect-[1039/578] overflow-hidden rounded-xl lg:rounded-2xl shadow-2xl">
        {
          project.video !== "" ?
          <video 
            src={project.video}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
          :
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(max-width: 1024px) 100vw, 85vw"
            className="object-cover"
          />
        }
        </div>
      </motion.div>
    </div>
  );
}

export default function ProjectsShowcase() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  return (
    <section ref={container} className="relative w-full bg-black pt-[80vh]">
      {/* Atmospheric background image */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="sticky top-0 left-0 w-full h-screen">
          <Image
            src="/images/project-bg.jpg"
            alt="Projects atmosphere"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black" />
        </div>
      </div>

      {/* Project entries */}
      <div className="relative z-10 w-full px-5 md:px-10 flex flex-col items-center">
        {PROJECTS.map((project, i) => {
          const step = 1 / PROJECTS.length;
          const start = i * step;
          const end = (i + 1) * step;
          
          const range = [
            Math.max(0, start - step * 0.5),
            start,
            end - step * 0.5,
            end
          ];
          
          return (
            <Card 
              key={project.name} 
              project={project} 
              i={i} 
              progress={scrollYProgress} 
              range={range}
            />
          );
        })}
      </div>
    </section>
  );
}
