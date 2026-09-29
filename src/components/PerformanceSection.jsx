import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Gauge, BatteryCharging } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function PerformanceSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: Gauge,
      category: 'PERFORMANCE',
      value: '2.8s',
      subtitle: '0–100 KM/H',
      description: 'Instant torque vectoring powered by quad independent high-output axial flux electric motors.',
    },
    {
      icon: BatteryCharging,
      category: 'RANGE',
      value: '720 KM',
      subtitle: 'MAX RANGE',
      description: 'Solid-state architecture paired with next-generation thermal energy recovery system.',
    },
    {
      icon: Zap,
      category: 'EFFICIENCY',
      value: '98%',
      subtitle: 'ENERGY EFFICIENCY',
      description: 'Ultra-low drag coefficient active aerodynamics designed to minimize kinetic drag loss.',
    },
  ];

  return (
    <section 
      id="performance" 
      ref={sectionRef} 
      className="relative bg-black py-24 sm:py-32 px-4 sm:px-8 border-t border-white/5 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <span className="inline-block px-4 py-1.5 rounded-full glass-pill text-cyan-400 font-subheading text-xs uppercase tracking-[0.3em] font-semibold mb-4 shadow-[0_0_15px_rgba(0,240,255,0.15)]">
            PURE DYNAMICS
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold tracking-wider uppercase text-white mb-6">
            ENGINEERED FOR <span className="glow-cyan text-cyan-400">MOMENTUM.</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-gray-400 tracking-wide leading-relaxed">
            Every element of the FIZZ X1 is designed around efficiency, speed and intelligent movement.
          </p>
        </div>

        {/* 3 Feature Cards */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
        >
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 hover:border-cyan-400/40 transition-all duration-500 group flex flex-col justify-between hover:-translate-y-2 glow-card"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-subheading text-xs tracking-[0.3em] text-cyan-400 uppercase font-bold">
                      {item.category}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20 group-hover:border-cyan-400/50 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="font-heading text-4xl sm:text-5xl font-bold text-white tracking-wider glow-cyan group-hover:scale-105 transition-transform origin-left">
                      {item.value}
                    </div>
                    <div className="font-subheading text-xs tracking-[0.2em] text-gray-300 uppercase mt-2 font-semibold">
                      {item.subtitle}
                    </div>
                  </div>
                </div>

                <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed border-t border-white/5 pt-6 mt-6">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
