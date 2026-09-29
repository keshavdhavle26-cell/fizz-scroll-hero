import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FormSection() {
  const sectionRef = useRef(null);
  const compositionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        compositionRef.current?.children || [],
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.25,
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
      id="form" 
      ref={sectionRef}
      className="relative bg-[#030305] py-32 sm:py-44 px-6 sm:px-12 border-t border-white/5 overflow-hidden"
    >
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="font-mono text-xs text-cyan-400 tracking-[0.4em] uppercase mb-4">
              02 // GEOMETRY & LIGHT
            </div>
            <h2 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-[0.25em] text-white uppercase">
              PURE FORM
            </h2>
          </div>
          <span className="font-subheading text-xs text-gray-500 tracking-[0.4em] uppercase">
            ARCHITECTURAL STUDY
          </span>
        </div>

        {/* Typographic Grid Composition */}
        <div 
          ref={compositionRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-white/10"
        >
          <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 hover:border-cyan-400/30 transition-colors">
            <span className="font-mono text-xs text-cyan-400/80 block mb-6">[ 01 ]</span>
            <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-wider text-white uppercase mb-4">
              SILHOUETTE
            </h3>
            <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed tracking-wider font-light">
              Aerodynamic contours carved out of darkness. Light defines the edge; darkness provides the mass.
            </p>
          </div>

          <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 hover:border-cyan-400/30 transition-colors">
            <span className="font-mono text-xs text-cyan-400/80 block mb-6">[ 02 ]</span>
            <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-wider text-white uppercase mb-4">
              LIGHT & SHADOW
            </h3>
            <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed tracking-wider font-light">
              Reflections shift dynamically along compound curves as perspective evolves across the viewport.
            </p>
          </div>

          <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 hover:border-cyan-400/30 transition-colors">
            <span className="font-mono text-xs text-cyan-400/80 block mb-6">[ 03 ]</span>
            <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-wider text-white uppercase mb-4">
              STRUCTURE
            </h3>
            <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed tracking-wider font-light">
              Uncompromising proportions engineered for zero visual noise. Form follow motion seamlessly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
