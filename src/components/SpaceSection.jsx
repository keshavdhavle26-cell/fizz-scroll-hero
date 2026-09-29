import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function SpaceSection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section 
      id="space" 
      ref={sectionRef}
      className="relative bg-[#020204] py-36 sm:py-48 px-6 sm:px-12 border-t border-white/5 overflow-hidden"
    >
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[180px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        <div ref={contentRef} className="space-y-8">
          <div className="font-mono text-xs text-cyan-400 tracking-[0.4em] uppercase">
            03 // SPATIAL RELEASE
          </div>

          <h2 className="font-heading text-4xl sm:text-7xl lg:text-8xl font-bold tracking-[0.3em] uppercase text-white leading-tight">
            INFINITE <br />
            <span className="glow-cyan text-cyan-400">SPACE.</span>
          </h2>

          <p className="font-subheading text-xs sm:text-base tracking-[0.4em] text-gray-400 uppercase max-w-xl mx-auto font-light">
            An interactive motion study presented by FIZZ.
          </p>

          <div className="pt-8">
            <button 
              onClick={scrollToTop}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/15 text-white font-subheading text-xs uppercase tracking-[0.3em] hover:bg-white/10 hover:border-cyan-400/50 transition-all group cursor-pointer"
            >
              <span>REPLAY EXPERIENCE</span>
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform text-cyan-400" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
