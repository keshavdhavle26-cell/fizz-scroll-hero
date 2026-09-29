import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles } from 'lucide-react';
import carImage from '../assets/fizz-x1.png';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const ctaRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, scale: 0.92, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, ctaRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="cta" 
      ref={ctaRef}
      className="relative bg-black py-28 sm:py-36 px-4 sm:px-8 border-t border-white/5 overflow-hidden"
    >
      {/* Background Spotlight / Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/15 rounded-full blur-[180px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        <div 
          ref={contentRef}
          className="glass-panel p-10 sm:p-16 lg:p-20 rounded-[2.5rem] border border-white/10 relative overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)]"
        >
          {/* Subtle Car Silhouette Background */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-full max-w-3xl opacity-15 pointer-events-none">
            <img src={carImage} alt="" className="w-full h-auto object-contain" />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-cyan-400 font-subheading text-xs uppercase tracking-[0.3em] font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              RESERVE YOUR POSITION
            </div>

            <h2 className="font-heading text-3xl sm:text-5xl lg:text-7xl font-bold tracking-wider uppercase text-white mb-4">
              READY FOR <br />
              <span className="glow-cyan text-cyan-400">WHAT'S NEXT?</span>
            </h2>

            <p className="font-subheading text-base sm:text-xl tracking-[0.2em] text-gray-300 uppercase mb-10 font-medium">
              Meet the FIZZ X1.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-cyan-400 text-black font-subheading font-bold text-sm uppercase tracking-[0.2em] hover:bg-cyan-300 transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(0,240,255,0.4)] flex items-center justify-center gap-3 cursor-pointer"
              >
                <span>EXPLORE X1</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button 
                onClick={() => alert('Test Drive bookings open Q4 2026.')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/5 border border-white/15 text-white font-subheading font-semibold text-sm uppercase tracking-[0.2em] hover:bg-white/10 hover:border-cyan-400/40 transition-all cursor-pointer"
              >
                BOOK TEST DRIVE
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
