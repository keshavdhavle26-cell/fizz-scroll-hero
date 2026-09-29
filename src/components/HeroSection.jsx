import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import carImage from '../assets/fizz-x1.png';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const containerRef = useRef(null);
  const pinSectionRef = useRef(null);
  
  // Element refs
  const headlineRef = useRef(null);
  const brandSubRef = useRef(null);
  const motionFormSpaceRef = useRef(null);
  
  // 3D Car & Lighting refs
  const perspectiveStageRef = useRef(null);
  const carWrapperRef = useRef(null);
  const ambientGlowRef = useRef(null);
  const shadowRef = useRef(null);

  // Scroll phase text refs
  const phase1TextRef = useRef(null);
  const phase2TextRef = useRef(null);
  const phase3TextRef = useRef(null);

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // ----------------------------------------------------
      // 1. INTRO ENTRANCE ANIMATION
      // ----------------------------------------------------
      const introTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      const letters = headlineRef.current?.querySelectorAll('.letter');

      introTl
        .fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 1 })
        .fromTo(
          letters,
          { opacity: 0, y: 40, filter: 'blur(8px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, stagger: 0.03 },
          '-=0.5'
        )
        .fromTo(
          brandSubRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.6'
        )
        .fromTo(
          carWrapperRef.current,
          { opacity: 0, scale: 0.8, y: 60, rotateX: 15, rotateY: -10 },
          { opacity: 1, scale: 1, y: 0, rotateX: 0, rotateY: 0, duration: 1.4, ease: 'power2.out' },
          '-=0.8'
        )
        .fromTo(
          motionFormSpaceRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.4'
        );

      // Continuous subtle idle floating animation (3D weightlessness)
      gsap.to(carWrapperRef.current, {
        y: '-=12',
        rotateX: 2.5,
        rotateZ: -1.2,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // ----------------------------------------------------
      // 2. PINNED MULTI-AXIS 3D SCROLL TIMELINE
      // ----------------------------------------------------
      const mm = gsap.matchMedia();

      // Desktop Screens (min-width: 768px)
      mm.add('(min-width: 768px)', () => {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: pinSectionRef.current,
            start: 'top top',
            end: '+=3400',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          }
        });

        // --------------------------------------------------
        // STAGE 1 -> STAGE 2 (0% to 30% Scroll)
        // Headline moves up/fades; car drifts 3D forward-right with pitch/yaw tilt
        // --------------------------------------------------
        scrollTl
          .to(headlineRef.current, { y: -160, opacity: 0, scale: 0.9, filter: 'blur(6px)', duration: 2.5 }, 0)
          .to(brandSubRef.current, { y: -100, opacity: 0, duration: 2 }, 0)
          .to(motionFormSpaceRef.current, { y: 80, opacity: 0, duration: 2 }, 0)
          
          // 3D Spatial transformation matrix scrub
          .to(carWrapperRef.current, {
            xPercent: 22,
            yPercent: -4,
            scale: 0.92,
            rotateY: -16, // 3D Yaw rotation
            rotateX: 9,   // 3D Pitch tilt
            rotateZ: -2.5,// 3D Roll
            duration: 3,
            ease: 'power1.inOut'
          }, 0)
          .to(ambientGlowRef.current, {
            xPercent: 15,
            scale: 1.3,
            opacity: 0.4,
            duration: 3
          }, 0);

        // --------------------------------------------------
        // STAGE 2 -> STAGE 3 (30% to 55% Scroll)
        // Car sweeps in 3D arc to center-left, rotating counter-angle; "FORM" typography enters
        // --------------------------------------------------
        scrollTl
          .to(carWrapperRef.current, {
            xPercent: -18,
            yPercent: 2,
            scale: 0.96,
            rotateY: 18,  // Reverses 3D angle
            rotateX: -7,
            rotateZ: 3,
            duration: 3.5,
            ease: 'power1.inOut'
          }, 3)
          .fromTo(
            phase1TextRef.current,
            { opacity: 0, scale: 0.8, filter: 'blur(10px)' },
            { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 2, ease: 'power2.out' },
            3.2
          )
          .to(phase1TextRef.current, { opacity: 0, y: -60, filter: 'blur(8px)', duration: 1.8 }, 5.8);

        // --------------------------------------------------
        // STAGE 3 -> STAGE 4 (55% to 80% Scroll)
        // Car centers gracefully in 3D space, leveling out; "MOTION" composition reveals
        // --------------------------------------------------
        scrollTl
          .to(carWrapperRef.current, {
            xPercent: 0,
            yPercent: 0,
            scale: 1.05,
            rotateY: -6,
            rotateX: 4,
            rotateZ: 0,
            duration: 3.5,
            ease: 'power1.inOut'
          }, 6)
          .fromTo(
            phase2TextRef.current,
            { opacity: 0, y: 50, filter: 'blur(10px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 2.2, ease: 'power2.out' },
            6.2
          )
          .to(phase2TextRef.current, { opacity: 0, y: -40, duration: 1.8 }, 8.5);

        // --------------------------------------------------
        // STAGE 4 -> STAGE 5 (80% to 100% Scroll)
        // Final transition: Car floats slightly upward with depth fade; "FIZZ / MOTION / FORM / SPACE" climax
        // --------------------------------------------------
        scrollTl
          .to(carWrapperRef.current, {
            yPercent: -12,
            scale: 0.82,
            opacity: 0.25,
            rotateX: -12,
            filter: 'blur(4px)',
            duration: 3
          }, 8.5)
          .fromTo(
            phase3TextRef.current,
            { opacity: 0, scale: 0.88, filter: 'blur(10px)' },
            { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 2.5, ease: 'power2.out' },
            8.8
          );
      });

      // Mobile Screens (< 768px)
      mm.add('(max-width: 767px)', () => {
        const scrollTlMobile = gsap.timeline({
          scrollTrigger: {
            trigger: pinSectionRef.current,
            start: 'top top',
            end: '+=2600',
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          }
        });

        scrollTlMobile
          .to(headlineRef.current, { y: -80, opacity: 0, duration: 2 }, 0)
          .to([brandSubRef.current, motionFormSpaceRef.current], { opacity: 0, duration: 1.5 }, 0)
          .to(carWrapperRef.current, {
            yPercent: -10,
            scale: 0.9,
            rotateY: -10,
            duration: 2.5
          }, 0)
          .fromTo(phase1TextRef.current, { opacity: 0 }, { opacity: 1, duration: 2 }, 2)
          .to(phase1TextRef.current, { opacity: 0, duration: 1.5 }, 4.5)
          .fromTo(phase2TextRef.current, { opacity: 0 }, { opacity: 1, duration: 2 }, 4.8)
          .to(phase2TextRef.current, { opacity: 0, duration: 1.5 }, 7)
          .to(carWrapperRef.current, { opacity: 0.2, scale: 0.75, duration: 2 }, 7)
          .fromTo(phase3TextRef.current, { opacity: 0 }, { opacity: 1, duration: 2 }, 7.5);
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const headlineText = "WELCOME ITZ FIZZ";

  return (
    <section ref={containerRef} className="relative bg-[#040406] text-white overflow-hidden select-none">
      {/* Subtle Background Lighting & Grid */}
      <div className="absolute inset-0 bg-hero-radial pointer-events-none z-0 opacity-40"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none z-0"></div>

      {/* Pinned Stage Container */}
      <div 
        ref={pinSectionRef}
        className="relative w-full h-screen min-h-[700px] flex flex-col items-center justify-between pt-24 pb-12 px-6 sm:px-12 z-10 overflow-hidden"
      >
        {/* ========================================================================= */}
        {/* INITIAL TOP HEADLINE & BRANDING (0% SCROLL) */}
        {/* ========================================================================= */}
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center text-center z-20 mt-4 pointer-events-none">
          {/* Subtle Top Brand Tag */}
          <div 
            ref={brandSubRef}
            className="font-subheading text-xs sm:text-sm tracking-[0.4em] text-cyan-400 uppercase font-semibold mb-4"
          >
            FIZZ — DIGITAL MOTION STUDY
          </div>

          {/* Main Spaced Headline */}
          <h1 
            ref={headlineRef}
            className="font-heading text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-[0.3em] sm:tracking-[0.5em] text-white uppercase drop-shadow-[0_10px_35px_rgba(0,240,255,0.2)]"
            aria-label="WELCOME ITZ FIZZ"
          >
            {headlineText.split('').map((char, index) => (
              <span key={index} className="letter inline-block whitespace-pre">
                {char}
              </span>
            ))}
          </h1>
        </div>

        {/* ========================================================================= */}
        {/* 3D PERSPECTIVE STAGE & FLOATING CAR VISUAL */}
        {/* ========================================================================= */}
        <div 
          ref={perspectiveStageRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 px-4"
          style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
        >
          {/* Volumetric Backlight Glow */}
          <div 
            ref={ambientGlowRef}
            className="absolute w-[500px] h-[300px] bg-cyan-500/20 rounded-full blur-[130px] transform -translate-y-6 pointer-events-none"
          ></div>

          {/* 3D Transform Wrapper */}
          <div 
            ref={carWrapperRef}
            className="relative w-full max-w-5xl aspect-[16/9] flex items-center justify-center transition-shadow duration-500"
            style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
          >
            <img 
              src={carImage} 
              alt="FIZZ Visual Motion Object" 
              className="w-full h-auto object-contain drop-shadow-[0_30px_45px_rgba(0,0,0,0.95)]"
            />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* INTERMEDIATE SPATIAL TEXT COMPOSITIONS */}
        {/* ========================================================================= */}
        {/* Phase 1 Text (30-55% scroll): FORM */}
        <div 
          ref={phase1TextRef}
          className="absolute left-8 sm:left-20 lg:left-32 top-1/2 -translate-y-1/2 z-30 pointer-events-none opacity-0"
        >
          <span className="font-mono text-xs text-cyan-400 tracking-[0.4em] uppercase block mb-3">
            // PHASE 01
          </span>
          <h2 className="font-heading text-5xl sm:text-7xl lg:text-9xl font-bold tracking-[0.25em] text-white uppercase opacity-90 leading-none">
            FORM
          </h2>
          <p className="font-subheading text-xs sm:text-sm text-gray-400 tracking-[0.3em] uppercase mt-4 max-w-xs">
            A visual exploration of geometry, contour, and spatial light.
          </p>
        </div>

        {/* Phase 2 Text (55-80% scroll): MOTION */}
        <div 
          ref={phase2TextRef}
          className="absolute right-8 sm:right-20 lg:right-32 top-1/2 -translate-y-1/2 text-right z-30 pointer-events-none opacity-0"
        >
          <span className="font-mono text-xs text-cyan-400 tracking-[0.4em] uppercase block mb-3">
            // PHASE 02
          </span>
          <h2 className="font-heading text-5xl sm:text-7xl lg:text-9xl font-bold tracking-[0.25em] text-white uppercase opacity-90 leading-none">
            MOTION
          </h2>
          <p className="font-subheading text-xs sm:text-sm text-gray-400 tracking-[0.3em] uppercase mt-4 max-w-xs ml-auto">
            Dynamic momentum captured in fluid scroll-driven interaction.
          </p>
        </div>

        {/* Phase 3 Final Climax (80-100% scroll): FIZZ / MOTION / FORM / SPACE */}
        <div 
          ref={phase3TextRef}
          className="absolute inset-0 flex flex-col items-center justify-center text-center z-30 px-6 pointer-events-none opacity-0"
        >
          <h2 className="font-heading text-3xl sm:text-6xl lg:text-8xl font-bold tracking-[0.3em] uppercase text-white mb-6">
            FIZZ
          </h2>
          <div className="font-subheading text-xs sm:text-base tracking-[0.5em] text-cyan-400 uppercase font-light">
            MOTION &nbsp; / &nbsp; FORM &nbsp; / &nbsp; SPACE
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM INITIAL SUBTITLE (0% SCROLL) */}
        {/* ========================================================================= */}
        <div 
          ref={motionFormSpaceRef}
          className="w-full max-w-5xl mx-auto flex flex-col items-center z-20 pointer-events-none"
        >
          <div className="font-subheading text-xs sm:text-sm tracking-[0.5em] text-gray-400 uppercase font-light border-t border-white/10 pt-4 px-8">
            MOTION &nbsp; / &nbsp; FORM &nbsp; / &nbsp; SPACE
          </div>
        </div>
      </div>
    </section>
  );
}
