"use client";

import { motion } from 'motion/react';

interface SectionHeaderProps {
  label: string;
  number: string;
  dark?: boolean;
  className?: string;
}

export default function SectionHeader({ label, number, dark = false, className = '' }: SectionHeaderProps) {
  const textColor = dark ? 'text-white' : 'text-black';
  const lineColor = dark ? 'bg-white' : 'bg-black';

  return (
    <motion.div
      className={`w-full flex flex-col ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex justify-between items-baseline pb-1">
        <span className={`text-[18px] uppercase ${textColor}`} style={{ fontFamily: '"Coolvetica Regular", Coolvetica, sans-serif' }}>{label}</span>
        <span className={`text-[18px] uppercase ${textColor}`} style={{ fontFamily: '"Coolvetica Regular", Coolvetica, sans-serif' }}>({number.replace(/[()]/g, '')})</span>
      </div>
      <div className={`w-full h-px ${lineColor}`} />
    </motion.div>
  );
}
