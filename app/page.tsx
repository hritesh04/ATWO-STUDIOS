"use client";

import { useState, useEffect } from 'react';
import { useScroll, useSpring, useMotionValue, useMotionValueEvent } from 'motion/react';
import Preloader from '@/src/components/preloader';
import CustomCursor from '@/src/components/layout/custom-cursor';
import SmoothScroll from '@/src/components/layout/smooth-scroll';
import Navbar from '@/src/components/layout/navbar';
import Hero from '@/src/components/sections/hero';
import About from '@/src/components/sections/about';
import Services from '@/src/components/sections/services';
import Portfolio from '@/src/components/sections/portfolio';
import ProjectsShowcase from '@/src/components/sections/projects-showcase';
import WhyChooseUs from '@/src/components/sections/why-choose-us';
import Footer from '@/src/components/layout/footer';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { scrollY, scrollYProgress } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 60);
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [mouseX, mouseY]);

  return (
    <SmoothScroll>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <CustomCursor />
      <div className="grain-overlay" />

      <div className="relative w-full bg-off-white overflow-clip font-coolvetica-condensed selection:bg-[#D60000] selection:text-off-white">
        <Navbar loading={loading} isScrolled={isScrolled} />

        <main>
          <Hero loading={loading} smoothProgress={smoothProgress} mouseX={mouseX} mouseY={mouseY} />
          <About />
          <Services />
          <Portfolio />
          <ProjectsShowcase />
          <WhyChooseUs />
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
