import React from 'react';

export default function Footer() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#020204] py-16 px-6 sm:px-12 border-t border-white/10 text-gray-500 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
          <a href="#" className="font-heading font-bold text-xl tracking-[0.3em] text-white flex items-center gap-3">
            <span>FIZZ</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
          </a>
          <span className="font-subheading text-[10px] tracking-[0.3em] text-gray-500 uppercase">
            MOTION / FORM / SPACE
          </span>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-10 font-subheading text-xs uppercase tracking-[0.3em] text-gray-400">
          <button onClick={() => scrollToSection('motion')} className="hover:text-cyan-400 transition-colors cursor-pointer">
            Motion
          </button>
          <button onClick={() => scrollToSection('form')} className="hover:text-cyan-400 transition-colors cursor-pointer">
            Form
          </button>
          <button onClick={() => scrollToSection('space')} className="hover:text-cyan-400 transition-colors cursor-pointer">
            Space
          </button>
        </div>

        {/* Copyright */}
        <div className="font-mono text-[10px] tracking-[0.25em] text-gray-600">
          © 2026 FIZZ EXPERIMENTAL.
        </div>
      </div>
    </footer>
  );
}
