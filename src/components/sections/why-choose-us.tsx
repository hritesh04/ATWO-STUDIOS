"use client";

import { motion } from 'motion/react';
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
  return (
    <section id="why-choose-us" className="relative w-full bg-black h-[300vh] md:h-[450vh]">
      {/* Sticky Background Video & Title */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        <video
          src="/videos/why-us.mp4"
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

        {/* Sticky Title */}
        <div className="absolute inset-0 flex flex-col justify-start px-5 md:px-10 lg:px-[75px] pt-[22vh] z-10">
          <motion.h2
            className="font-coolvetica text-[clamp(40px,10vw,121px)] leading-[0.839] text-white tracking-tight"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            WHY CHOOSE US?
          </motion.h2>
        </div>
      </div>

      {/* Content container that scrolls over sticky video */}
      <div className="relative z-20 w-full -mt-[100vh] pt-[60vh] pb-[20vh]">
        <div className="px-5 md:px-10 lg:px-[75px]">
          {/* Cards alternating left and right */}
          <div className="flex flex-col gap-40 md:gap-64 lg:gap-80 max-w-[1300px] w-full mx-auto">
            {FEATURES.map((feature, i) => {
              const isRight = i % 2 !== 1;
              return (
                <motion.div
                  key={feature.title}
                  className={`bg-black/90 backdrop-blur-md border border-white/10 w-full md:w-[45%] lg:w-[40%] p-8 lg:p-8 flex flex-col ${isRight ? 'md:self-end' : 'md:self-start'}`}
                  style={{ minHeight: 400 }}
                  initial={{ opacity: 0, y: 200 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ margin: '-100px' }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="font-coolvetica text-white text-[50px] leading-none mb-4">✦</span>
                  <h3 className="font-[var(--font-dm-sans)] font-medium text-[clamp(22px,2vw,28px)] text-white leading-tight tracking-tight mb-6">
                    {feature.title}
                  </h3>
                  <div className="w-full h-px bg-white/30 mb-6" />
                  <p className="font-[var(--font-dm-sans)] text-[clamp(14px,1.2vw,18px)] text-white/80 leading-relaxed tracking-tight">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
