"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import { Volume2Icon, VolumeXIcon } from 'lucide-react';

interface ShowcaseProject {
  name: string;
  year: string;
  image: string;
  video: string
}

const PROJECTS: ShowcaseProject[] = [
  { name: 'GULLY', year: '2025', image: '/images/project-gully.jpg', video:'https://res.cloudinary.com/dcmbfe9at/video/upload/q_auto/f_auto/v1778690313/gully_ugoyg5.mp4' },
  { name: 'BLUORNG', year: '2025', image: '/images/project-enola-2.jpg',video:'https://res.cloudinary.com/tg2nyis2/video/upload/q_auto/f_auto/v1783605155/bluorngXatwo_1_1_drqcrn.mp4' },
  { name: 'TROPICAL ESTATE', year: '2025', image: '/images/project-prada.jpg', video:'https://res.cloudinary.com/dcmbfe9at/video/upload/q_auto/f_auto/v1778690337/kerala_home_ukmfyi.mp4' },
  { name: 'ORNATE FLESH', year: '2025', image: '/images/project-ornate.jpg',video:'https://res.cloudinary.com/dcmbfe9at/video/upload/q_auto/f_auto/v1778690343/ornate_foc5ic.mp4' },
  { name: 'WRANGLER', year: '2025', image: '/images/project-prada.jpg',video:'https://res.cloudinary.com/tg2nyis2/video/upload/q_auto/f_auto/v1783604529/FINAL_AD_WRANGLER_vezxve.mp4' },
];

function Card({ project, i, progress, range}: { project: ShowcaseProject; i: number; progress: any; range: number[]}) {
  const container = useRef(null);
  
  const sinkY = 180 - (i * 80);
  const y = useTransform(progress, 
    [range[0], range[1], range[2], range[3]], 
    [700, 30, 30, sinkY]
  );
  
  const scale = useTransform(progress,
    [range[0], range[1], range[2], range[3]],
    [1, 1, 1, 0.8]
  );

  const opacity = 1;

  const [isMuted, setIsMuted] = useState(true);

  return (
    <div key={project.name} ref={container} className=" h-[80vh] md:h-[120vh] w-full md:w-[90%] flex items-start justify-center sticky top-0 pointer-events-none pt-28">
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
        <div className="relative w-full aspect-[1039/578] overflow-hidden rounded-xl lg:rounded-3xl shadow-2xl">
        {
          project.video !== "" ?
          <>
          <video 
            src={project.video}
            autoPlay
            muted={isMuted}
            loop
            playsInline
            className="w-full h-full object-cover"
            />
            <button 
              onClick={()=>setIsMuted(!isMuted)}
              className="absolute top-4 right-4 md:top-8 md:right-8 z-20 p-2 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-sm transition-all group"
            >
              {isMuted ? (
                <VolumeXIcon className='text-white' size={30} />
              ) : (
                <Volume2Icon className='text-white' size={30} />
              )}
            </button>
          </>
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
  const projectsContainer = useRef(null);
  const { scrollYProgress } = useScroll({
    target: projectsContainer,
    offset: ['start start', 'end end']
  });

  return (
    <section className="relative w-full bg-black pt-[80vh]">
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
      <div ref={projectsContainer} className="relative z-10 w-full px-5 md:px-10 flex flex-col items-center md:pb-18">
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
