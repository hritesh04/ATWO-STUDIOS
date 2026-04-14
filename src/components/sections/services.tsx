"use client";

import { motion } from 'motion/react';
import Image from 'next/image';
import SectionHeader from '@/src/components/ui/section-header';

const SERVICES = [
  { name: 'CREATIVE DIRECTION' },
  { name: 'BRAND IDENTITY' },
  { name: 'VISUAL PRODUCTION' },
  { name: 'CINEMATICS' },
  { name: 'CONCEPT LAB' },
];

export default function Services() {
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
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <span 
                className="text-[66px] text-white leading-[0.9]"
                style={{ fontFamily: '"Coolvetica Regular", Coolvetica, sans-serif' }}
              >
                {service.name}
              </span>
              <span 
                className="text-[20px] text-white ml-2 align-super bg-transparent relative -top-[12px]"
              >
                ✦
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
