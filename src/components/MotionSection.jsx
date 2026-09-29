import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MotionSection() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current?.children || [],
        { opacity: 0, y: 40, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="motion" 
      ref={sectionRef}
      className="relative bg-[#050507] py-32 sm:py-44 px-6 sm:px-12 border-t border-white/5 overflow-hidden"
    >
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={textRef} className="space-y-12">
          {/* Header Tag */}
          <div className="flex items-center gap-4 font-mono text-xs text-cyan-400 tracking-[0.4em] uppercase">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            01 // MOTION & VELOCITY
          </div>

          {/* Large Typographic Statement */}
          <h2 className="font-heading text-4xl sm:text-6xl lg:text-8xl font-bold tracking-[0.2em] text-white uppercase leading-tight">
            KINETIC <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-200 to-white">
              TRAJECTORY
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-white/10">
            <p className="font-sans text-sm sm:text-base text-gray-400 leading-relaxed tracking-wider font-light">
              Motion is not merely displacement across coordinates. It is the continuous dialogue between momentum, inertia, and visual persistence.
            </p>
            <p className="font-sans text-sm sm:text-base text-gray-400 leading-relaxed tracking-wider font-light">
              By translating physical mass into digital velocity, FIZZ examines how scroll dynamics reshape spatial awareness.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
