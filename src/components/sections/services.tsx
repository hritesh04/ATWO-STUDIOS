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
    <section id="services" className="relative w-full h-auto lg:h-[736px] flex flex-col lg:flex-row overflow-hidden">
      {/* Left — Background image */}
      <div className="relative w-full lg:w-1/2 h-[400px] lg:h-full">
        <Image
          src="/images/services-bg.jpg"
          alt="Services visual"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      {/* Right — Red panel */}
      <div className="relative w-full lg:w-1/2 bg-primary-red px-5 md:px-10 lg:px-[55px] py-12 lg:py-[55px]">
        <SectionHeader label="SERVICES" number="03" dark className="mb-10" />

        <div className="flex flex-col gap-1 mt-4">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.name}
              className="relative text-left"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
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
                    transition={{ duration: 0.3, ease: "easeInOut" }}
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
      </div>
    </section>
  );
}
