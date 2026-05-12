"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import SectionHeader from '@/src/components/ui/section-header';

const SERVICES = [
  { name: 'CREATIVE DIRECTION' , header:"Ideas first. Everything else follows.",description:" We shape the concept, tone, and visual language behind every project before a single frame exists.", bullets:["Campaign Ideation", "Visual Storytelling","Concept Development","Creative Consulting","Mood boards & Direction"]},
  { name: 'BRAND IDENTITY', header:"Defining how a brand looks, feels, and communicates visually.", description:"We build visual systems and campaign aesthetics that give brands a distinct and memorable presence.",bullets:[ "Brand Visual Identity","Campaign Aesthetics","Product Visual Language","Brand Guidelines","Marketing Visual Systems"]},
  { name: 'VISUAL PRODUCTION', header:"From concept to finished visuals.", description:"We create advertising films, marketing visuals, and animations designed to capture attention and elevate brands.",bullets:["Advertising Films","Marketing Content","Digital Campaign Visuals","Product Visuals","Animation & Motion"]},
  { name: 'CINEMATICS', header:"Where ideas become cinematic experiences.", description:"Concept-driven storytelling that explores bold visuals, narratives, and experimental creative directions.", bullets:["Short Films","Conceptual Visuals","Experimental Storytelling", "Artistic Projects", "Culture & Music Visuals"]},
  { name: 'CONCEPT LAB', header:"Where we explore ideas that don’t follow a brief.", bullets:["Experimental Concepts","Spec Campaigns", "Visual Experiments", "Cultural Projects", "Unconventional Storytelling"] },
];

export default function Services() {
  const [expandedService, setExpandedService] = useState<string | null>(null);

  return (
    <section id="services" className="relative w-full h-auto lg:h-[736px] flex flex-col lg:flex-row overflow-hidden bg-primary-red">
      {/* Left — Background image */}
      <motion.div 
        className="relative h-[400px] lg:h-full overflow-hidden"
        initial={{ width: "100%" }}
        whileInView={{ width: "50%" }}
        viewport={{ amount: 0.3 }}
        transition={{ type: "tween", duration: 1.2, ease: [0.7, 0.5, 1, 1] }}
      >
        <Image
          src="/images/services-bg.jpg"
          alt="Services visual"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Right — Red panel */}
      <motion.div 
        className="relative h-full bg-primary-red px-5 md:px-10 lg:px-[55px] py-12 lg:py-[55px]"
        initial={{ flexBasis: "0%", opacity: 0, x: 100 }}
        whileInView={{ flexBasis: "50%", opacity: 1, x: 0 }}
        viewport={{ amount: 0.2 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <SectionHeader label="SERVICES" number="03" dark className="mb-10" />

        <div className="flex flex-col gap-1 mt-4">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.name}
              className="relative text-left"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              // viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 1.2 + (i * 0.1), ease: [0.22, 1, 0.36, 1] }}
            >
              <span 
                className="text-[66px] text-white leading-[0.9] cursor-pointer"
                style={{ fontFamily: '"Coolvetica Regular", Coolvetica, sans-serif' }}
                onClick={() => setExpandedService(expandedService === service.name ? null : service.name)}
              >
                {service.name}
              </span>
              <span 
                className="text-[20px] text-white ml-2 align-super bg-transparent relative -top-[12px] cursor-pointer"
                onClick={() => setExpandedService(expandedService === service.name ? null : service.name)}
              >
                ✦
              </span>
              <AnimatePresence>
                {expandedService === service.name && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    style={{ overflow: "hidden" }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <div className='grid md:grid-cols-3 gap-8 justify-between m-4 overflow-hidden'>
                      <div className='col-span-2'>
                        {service.header && <p className='text-white text-3xl'>{service.header}</p>}
                        {service.description && <p className='text-white text-[20px] mt-2'>{service.description}</p>}
                      </div>
                      <div className=''>
                        {service.bullets?.map((bullet, i) => (
                          <p key={i} className='text-white text-[20px]'>✓ {bullet}</p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
