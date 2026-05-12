"use client";

import { motion } from 'motion/react';
import Image from 'next/image';
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
    <section id="why-choose-us" className="relative w-full bg-black overflow-hidden h-[220vh] md:h-[270vh]">
      {/* Top background image */}
      <div className="relative w-full h-full">
        <Image
          src="/images/why-choose-bg.jpg"
          alt="Why choose us atmosphere"
          fill
          sizes="100vw"
          className="object-cover"
        />
        {/* Header overlay */}
        <div className="absolute top-0 left-0 w-full px-5 md:px-10 lg:px-[75px] pt-12 lg:pt-[62px] z-10 mix-blend-difference">
          <SectionHeader label="BENEFITS" number="05" dark />
        </div>
      </div>

      {/* Content */}
      <div className="px-5 md:px-10 lg:px-[75px] py-12 lg:py-16 absolute top-15 left-0 w-full">
        <motion.h2
          className="font-coolvetica text-[clamp(40px,10vw,121px)] leading-[0.839] text-black tracking-tight mb-12 lg:mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          WHY CHOOSE US?
        </motion.h2>

        {/* Cards alternating left and right */}
        <div className="flex flex-col gap-12 lg:gap-24 max-w-[1300px] w-full mx-auto">
          {FEATURES.map((feature, i) => {
            const isRight = i % 2 === 0;
            return (
              <motion.div
                key={feature.title}
                className={`bg-black border border-white/10 w-full md:w-[45%] lg:w-[40%] p-8 lg:p-12 flex flex-col ${isRight ? 'md:self-end' : 'md:self-start'}`}
                style={{ minHeight: 380 }}
                initial={{ opacity: 0, y: 200 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: '-100px' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
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
    </section>
  );
}
