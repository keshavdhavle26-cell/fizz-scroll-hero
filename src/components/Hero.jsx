import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StatCard from './StatCard';
import carImage from '../assets/orange-concept-car.svg';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const pinContainerRef = useRef(null);
  
  // Masked sliding element refs
  const textSlideRef = useRef(null);
  const carSlideRef = useRef(null);

  // Stat Card refs for synchronized scroll animation
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const card4Ref = useRef(null);

  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // ----------------------------------------------------
      // PINNED HERO SCROLL TIMELINE (scrub: 1)
      // Controls Headline, Orange Car, AND all 4 Stat Cards synchronously
      // ----------------------------------------------------
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: pinContainerRef.current,
          start: 'top top',
          end: '+=2400',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // ----------------------------------------------------
      // 1. HEADLINE REVEAL: "WELCOME ITZ FIZZ" SLIDES INTO VIEW
      // Initial state: xPercent: -105 (completely hidden outside overflow:hidden mask)
      // Final state: xPercent: 0 (completely readable & aligned!)
      // ----------------------------------------------------
      scrollTl.fromTo(
        textSlideRef.current,
        { xPercent: -105 },
        { xPercent: 0, ease: 'power1.out', duration: 10 },
        0
      );

      // ----------------------------------------------------
      // 2. ORANGE CONCEPT CAR MOVEMENT (36vw desktop)
      // Moves horizontally across right portion of navy band
      // ----------------------------------------------------
      scrollTl.fromTo(
        carSlideRef.current,
        { xPercent: 75 },
        { xPercent: -20, ease: 'power1.out', duration: 10 },
        0
      );

      // ----------------------------------------------------
      // 3. STAT CARDS SLIDING SCROLL ANIMATION (SYNCHRONIZED!)
      // 0% -> 40% scroll: Cards slide smoothly from offsets into final positions
      // ----------------------------------------------------
      // Top-Left Card (58% Pickup usage)
      scrollTl.fromTo(
        card1Ref.current,
        { x: -80, y: -25, opacity: 0.5, scale: 0.95 },
        { x: 0, y: 0, opacity: 1, scale: 1, ease: 'power2.out', duration: 8 },
        0
      );

      // Top-Right Card (40% Reduced wait time)
      scrollTl.fromTo(
        card2Ref.current,
        { x: 80, y: -25, opacity: 0.5, scale: 0.95 },
        { x: 0, y: 0, opacity: 1, scale: 1, ease: 'power2.out', duration: 8 },
        0.5
      );

      // Bottom-Left Card (27% Faster response)
      scrollTl.fromTo(
        card3Ref.current,
        { x: -80, y: 25, opacity: 0.5, scale: 0.95 },
        { x: 0, y: 0, opacity: 1, scale: 1, ease: 'power2.out', duration: 8 },
        1.0
      );

      // Bottom-Right Card (23% Improved experience)
      scrollTl.fromTo(
        card4Ref.current,
        { x: 80, y: 25, opacity: 0.5, scale: 0.95 },
        { x: 0, y: 0, opacity: 1, scale: 1, ease: 'power2.out', duration: 8 },
        1.5
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="relative w-full bg-[#F7F8FA] text-[#071B35] overflow-hidden select-none">
      {/* Pinned Viewport Container */}
      <div 
        ref={pinContainerRef}
        className="relative w-full h-screen min-h-[700px] flex flex-col justify-between items-center py-6 sm:py-10 px-4 sm:px-8 overflow-hidden"
      >
        {/* Subtle Light-Blue Decorative Corner Arcs & Dots on White Background */}
        <div className="absolute top-10 right-10 w-36 h-36 rounded-full border border-blue-200/50 pointer-events-none"></div>
        <div className="absolute bottom-10 left-10 w-44 h-44 rounded-full border border-blue-200/50 pointer-events-none"></div>
        <div className="absolute top-12 left-12 w-2.5 h-2.5 rounded-full bg-[#3B82F6]/40 pointer-events-none"></div>
        <div className="absolute bottom-12 left-16 w-2 h-2 rounded-full bg-[#3B82F6]/40 pointer-events-none"></div>
        <div className="absolute top-1/2 left-6 w-[1px] h-20 bg-gradient-to-b from-transparent via-[#3B82F6]/30 to-transparent pointer-events-none"></div>
        <div className="absolute top-1/2 right-6 w-[1px] h-20 bg-gradient-to-b from-transparent via-[#3B82F6]/30 to-transparent pointer-events-none"></div>

        {/* ========================================================================= */}
        {/* TOP REGION: STAT CARDS 1 & 2 (ABOVE HERO BAND) */}
        {/* ========================================================================= */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-12 flex justify-between items-start h-28 sm:h-36 z-30 pointer-events-none">
          {/* Card 1: Top Left (58% Pickup usage) */}
          <div ref={card1Ref} className="pointer-events-auto">
            <StatCard 
              percentage="58%" 
              description="Pickup usage" 
            />
          </div>

          {/* Card 2: Top Right (40% Reduced wait time) */}
          <div ref={card2Ref} className="pointer-events-auto hidden sm:block">
            <StatCard 
              percentage="40%" 
              description="Reduced wait time" 
            />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CENTRAL HERO BAND (DEEP NAVY HORIZONTAL BAND WITH DIAGONAL STRIPES) */}
        {/* ========================================================================= */}
        <div className="relative w-[94vw] max-w-7xl h-[30vh] min-h-[220px] max-h-[340px] bg-[#071B35] rounded-[2.5rem] shadow-2xl shadow-blue-950/20 flex items-center z-10 hero-band-mask border border-blue-900/40 px-6 sm:px-12">
          {/* Background Gradient & Geometric Blue Stripe Details */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#071B35] via-[#0A2342] to-[#071B35] rounded-[2.5rem] pointer-events-none"></div>
          
          {/* Diagonal Blue Stripe Accents (Reference Image Detail) */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none opacity-30 overflow-hidden">
            <div className="absolute right-20 -top-20 w-16 h-[500px] bg-[#2563eb] transform rotate-[35deg]"></div>
            <div className="absolute right-48 -top-20 w-8 h-[500px] bg-[#3b82f6] transform rotate-[35deg]"></div>
            <div className="absolute right-72 -top-20 w-24 h-[500px] bg-[#1d4ed8] transform rotate-[35deg]"></div>
          </div>

          {/* Masked Typography Wrapper (overflow: hidden) */}
          <div className="absolute inset-0 hero-text-mask z-10 pointer-events-none px-6 sm:px-12 w-full flex items-center">
            {/* Sliding Full Headline: "WELCOME ITZ FIZZ" */}
            <h1 
              ref={textSlideRef}
              className="whitespace-nowrap font-display text-[clamp(2.8rem,5.5vw,6.2rem)] font-black text-white uppercase tracking-normal leading-none drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)]"
              aria-label="WELCOME ITZ FIZZ"
            >
              WELCOME ITZ FIZZ
            </h1>
          </div>

          {/* Masked Orange Concept Hypercar (36vw wide, sitting towards right) */}
          <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-end w-full pr-4 sm:pr-8">
            <div 
              ref={carSlideRef}
              className="w-[36vw] max-w-2xl aspect-[2.6/1] flex items-center justify-center shrink-0"
            >
              <img 
                src={carImage} 
                alt="FIZZ Orange Concept Hypercar Top-Down Render" 
                className="w-full h-auto object-contain filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.95)]"
              />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM REGION: STAT CARDS 3 & 4 (BELOW HERO BAND) */}
        {/* ========================================================================= */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-12 flex justify-between items-end h-28 sm:h-36 z-30 pointer-events-none">
          {/* Card 3: Bottom Left (27% Faster response) */}
          <div ref={card3Ref} className="pointer-events-auto">
            <StatCard 
              percentage="27%" 
              description="Faster response" 
            />
          </div>

          {/* Card 4: Bottom Right (23% Improved experience) */}
          <div ref={card4Ref} className="pointer-events-auto">
            <StatCard 
              percentage="23%" 
              description="Improved experience" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
