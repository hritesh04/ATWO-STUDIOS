"use client";

import { useState } from "react";
import { motion } from "motion/react";
import BookCallModal from "@/src/components/ui/BookCallModal";

export default function Footer() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <footer
        id="contact-us"
        className="relative w-full bg-white overflow-hidden"
      >
        {/* CTA Section */}
        <div className="px-5 md:px-10 lg:px-[138px] pt-16 lg:pt-20">
          <motion.p
            className="font-coolvetica text-[48px] text-primary-red max-w-[440px]"
            style={{ lineHeight: "normal", letterSpacing: "0" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            YOU SCROLLED THIS FAR FOR A REASON — LET&apos;S TALK.
          </motion.p>
        </div>

        {/* Links row */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 items-center pr-10 md:px-10 lg:px-34.5 mt-16 lg:mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <a
            href="#"
            className="font-coolvetica text-[22px] text-primary-red hover:opacity-70 transition-opacity whitespace-nowrap text-center md:text-left"
            data-hover
          >
            BOOK A CALL
          </a>
          <a
            href="mailto:contact@atwostudios.com"
            className="font-coolvetica text-[22px] text-primary-red underline hover:opacity-70 transition-opacity md:text-left"
            data-hover
          >
            contact@atwostudios.com
          </a>
          <a
            href="https://www.linkedin.com/company/atwo-studios/"
            target="blank"
            className="font-coolvetica text-[22px] text-primary-red hover:opacity-70 transition-opacity text-center"
            data-hover
          >
            LINKEDIN
          </a>
          <a
            href="https://www.instagram.com/atwo.io?igsh=dWh6Z3I2am10b3U0&utm_source=qr"
            target="blank"
            className="font-coolvetica text-[22px] text-primary-red hover:opacity-70 transition-opacity text-center md:text-right"
            data-hover
          >
            INSTAGRAM
          </a>
        </motion.div>

        {/* Giant branding text */}
        <div className="w-full mt-16 lg:mt-20 overflow-hidden whitespace-nowrap">
          <motion.div
            className="flex w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[1, 2, 3, 4].map((i) => (
              <h2
                key={i}
                className="text-[33.5vw] text-black leading-[0.8] whitespace-nowrap select-none px-8"
                style={{
                  fontFamily:
                    '"Coolvetica Heavy Compressed", "Coolvetica Compressed", "Coolvetica", sans-serif',
                  letterSpacing: "-0.02em",
                }}
              >
                ATWO STUDIOS
              </h2>
            ))}
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-5 md:px-10 lg:px-[138px] py-8 lg:py-10">
          <span className="font-coolvetica text-[22px] text-primary-red">
            TERMS & CONDITIONS
          </span>
          <span className="font-coolvetica text-[22px] text-primary-red">
            ©2026 ATWO
          </span>
          <span className="font-coolvetica text-[22px] text-primary-red">
            PRIVACY
          </span>
        </div>
      </footer>

      {/* Booking Modal */}
      <BookCallModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </>
  );
}
