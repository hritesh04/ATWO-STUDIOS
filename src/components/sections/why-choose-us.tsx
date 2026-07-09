"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import SectionHeader from '@/src/components/ui/section-header';

interface FeatureCard {
  title: string;
  description: string;
}

const FEATURES: FeatureCard[] = [
  {
    title: 'Idea-First Approach',
    description: 'Great visuals start with great thinking. At A2, every project begins with a strong idea before anything else takes shape.',
  },
  {
    title: 'Production Without Production',
    description: 'No rented studios. No camera crews. We create visuals that feel like full productions — without the usual production chaos.',
  },
  {
    title: 'Creative Direction Focus',
    description: "Tools are accessible to everyone. Direction isn't. We focus on shaping ideas, storytelling, and visual language that make brands stand out.",
  },
  {
    title: 'Fast & Flexible',
    description: 'Without traditional production barriers, ideas move faster. We turn concepts into finished visuals quickly and efficiently.',
  },
];

export default function WhyChooseUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of the entire section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Animate the title out of view in the first 18% of scroll
  const titleOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.18], [0, -80]);
  const titleScale = useTransform(scrollYProgress, [0, 0.18], [1, 0.95]);

  return (
    <section 
      ref={containerRef}
      id="why-choose-us" 
      className="relative w-full bg-black h-[400vh]"
    >
      {/* Sticky Background Video & Title */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        <video
          src="https://res.cloudinary.com/dcmbfe9at/video/upload/q_auto/f_auto/v1778690282/why-us_irb2hb.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        
        {/* Header overlay */}
        <div className="absolute top-0 left-0 w-full px-5 md:px-10 lg:px-[75px] pt-12 lg:pt-[62px] z-20 mix-blend-difference">
          <SectionHeader label="BENEFITS" number="05" dark />
        </div>

        {/* Sticky Title (Scroll linked animations on outer div) */}
        <motion.div 
          style={{ opacity: titleOpacity, y: titleY, scale: titleScale, transformOrigin: 'left center' }}
          className="absolute inset-0 flex flex-col justify-start px-5 md:px-10 lg:px-[75px] pt-[22vh] z-40 pointer-events-none"
        >
          <motion.h2
            className="font-coolvetica text-[clamp(40px,10vw,121px)] leading-[0.839] text-white tracking-tight"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            WHY CHOOSE US?
          </motion.h2>
        </motion.div>
      </div>

      {/* Content container that scrolls over sticky video */}
      <div className="relative z-20 w-full -mt-[100vh] pt-[60vh] pb-[20vh]">
        <div className="px-5 md:px-10 lg:px-[75px]">
          {/* Cards alternating left and right */}
          <div className="flex flex-col gap-60 max-w-[1300px] w-full mx-auto items-center">
            {FEATURES.map((feature, i) => (
              <FeatureCard key={feature.title} feature={feature} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, i }: { feature: FeatureCard; i: number }) {
  const cardRef = useRef(null);
  
  // Track scroll progress of the individual card
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center", "end start"]
  });

  // Entrance and exit scroll transforms (fading out earlier between 0.55 and 0.85)
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.45, 0.85], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.35], [100, 0]);
  
  const isRight = i % 2 !== 1;
  const xStart = isRight ? 120 : -120;
  const rotateStart = isRight ? 4 : -4;

  const x = useTransform(scrollYProgress, [0, 0.25, 0.45, 0.85], [xStart, 0, 0, xStart * 1.5]);
  const rotate = useTransform(scrollYProgress, [0, 0.25, 0.45, 0.85], [rotateStart, 0, 0, -rotateStart * 0.5]);

  return (
    <div 
      ref={cardRef} 
      className={`w-[80%] md:w-[30%] ${isRight ? 'md:self-end' : 'md:self-start'}`}
    >
      <motion.div
        className="bg-black/80 backdrop-blur-md border border-white/10 p-6 flex flex-col gap-4 rounded-xl shadow-2xl"
        style={{ 
          minHeight: 440, 
          opacity, 
          y, 
          x, 
          rotate 
        }}
        whileHover={{ 
          scale: 1.03, 
          borderColor: 'rgba(255, 255, 255, 0.3)',
          boxShadow: '0 20px 40px -15px rgba(255, 255, 255, 0.08)'
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 300, 
          damping: 20 
        }}
      >
        <div className="flex gap-4 items-center justify-center pt-2">
          <span className="font-coolvetica text-[40px] leading-none text-center text-white">✦</span>
          <h3 className="font-[var(--font-dm-sans)] font-medium text-[clamp(22px,2vw,28px)] leading-tight tracking-tight text-white">
            {feature.title}
          </h3>
        </div>
        
        <div className="w-full h-px bg-white/20 my-2" />
        
        <div className="font-[var(--font-dm-sans)] font-normal text-lg leading-relaxed text-zinc-300 text-center p-4 flex-grow flex items-center justify-center">
          {feature.description}
        </div>
      </motion.div>
    </div>
  );
}
