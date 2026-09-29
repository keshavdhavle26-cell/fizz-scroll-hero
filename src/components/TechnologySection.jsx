import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, Wind, Monitor } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function TechnologySection() {
  const sectionRef = useRef(null);
  const itemsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = itemsRef.current?.children;
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const technologies = [
    {
      icon: Cpu,
      title: 'Intelligent Drive',
      description: 'Adaptive driving technology designed around the road ahead. Predicts terrain, traffic telemetry, and optimizes torque distribution in real-time.',
      tag: 'NEURAL NAV',
    },
    {
      icon: Wind,
      title: 'AeroFlow',
      description: 'Aerodynamic engineering designed to reduce resistance. Active channelling flaps adjust dynamically to maximize downforce or efficiency.',
      tag: 'ACTIVE AERO',
    },
    {
      icon: Monitor,
      title: 'FIZZ OS',
      description: 'A futuristic digital driving interface. Seamless augmented reality HUD projecting spatial telemetry directly onto your field of view.',
      tag: 'SPATIAL HUD',
    },
  ];

  return (
    <section 
      id="technology" 
      ref={sectionRef}
      className="relative bg-black/90 py-24 sm:py-32 px-4 sm:px-8 border-t border-white/5 overflow-hidden"
    >
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-24 gap-6">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 rounded-full glass-pill text-cyan-400 font-subheading text-xs uppercase tracking-[0.3em] font-semibold mb-4">
              NEXT-GEN ARCHITECTURE
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold tracking-wider uppercase text-white">
              TECHNOLOGY THAT <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white">
                MOVES WITH YOU
              </span>
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-gray-400 max-w-md tracking-wide leading-relaxed">
            Integrating quantum computing telemetry, neural spatial awareness, and ultra-responsive motor drive logic.
          </p>
        </div>

        {/* 3 Tech Features Cards */}
        <div 
          ref={itemsRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {technologies.map((tech, idx) => {
            const Icon = tech.icon;
            return (
              <div 
                key={idx}
                className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 hover:border-cyan-400/50 transition-all duration-300 relative group overflow-hidden"
              >
                {/* Accent glow corner */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-bl-full blur-2xl group-hover:bg-cyan-400/20 transition-all"></div>

                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.3em] text-cyan-400/70 border border-cyan-400/20 px-3 py-1 rounded-full uppercase">
                    {tech.tag}
                  </span>
                </div>

                <h3 className="font-heading text-xl sm:text-2xl font-bold text-white tracking-wider uppercase mb-4 group-hover:text-cyan-300 transition-colors">
                  {tech.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed tracking-wide">
                  {tech.description}
                </p>

                <div className="mt-8 pt-6 border-t border-white/5 flex items-center text-xs font-subheading tracking-widest text-cyan-400 font-semibold uppercase group-hover:translate-x-1 transition-transform">
                  Explore Architecture →
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
