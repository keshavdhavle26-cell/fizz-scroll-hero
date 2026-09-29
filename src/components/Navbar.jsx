import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-12 py-6 mix-blend-difference">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <a 
          href="#" 
          className="font-heading font-bold text-xl sm:text-2xl tracking-[0.3em] text-white hover:text-cyan-400 transition-colors uppercase flex items-center gap-3"
        >
          <span>FIZZ</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#00f0ff]"></span>
        </a>

        {/* Editorial Navigation Links */}
        <nav className="hidden md:flex items-center gap-12 font-subheading text-xs uppercase tracking-[0.35em] text-gray-400">
          <button 
            onClick={() => scrollToSection('motion')}
            className="hover:text-white transition-colors cursor-pointer py-1 relative group"
          >
            MOTION
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
          </button>
          <button 
            onClick={() => scrollToSection('form')}
            className="hover:text-white transition-colors cursor-pointer py-1 relative group"
          >
            FORM
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
          </button>
          <button 
            onClick={() => scrollToSection('space')}
            className="hover:text-white transition-colors cursor-pointer py-1 relative group"
          >
            SPACE
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
          </button>
        </nav>

        {/* Status / Index Indicator */}
        <div className="hidden md:flex items-center font-mono text-[10px] tracking-[0.25em] text-gray-400 border border-white/10 px-4 py-2 rounded-full uppercase">
          <span className="text-cyan-400 mr-2">●</span> EXP_01 // 2026
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gray-300 hover:text-white p-2"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Editorial Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 mx-auto max-w-7xl glass-panel rounded-2xl p-8 flex flex-col gap-6 backdrop-blur-2xl bg-black/90 border border-white/10">
          <button 
            onClick={() => scrollToSection('motion')}
            className="text-left font-heading text-lg tracking-[0.3em] uppercase text-gray-200 hover:text-cyan-400"
          >
            01 / MOTION
          </button>
          <button 
            onClick={() => scrollToSection('form')}
            className="text-left font-heading text-lg tracking-[0.3em] uppercase text-gray-200 hover:text-cyan-400"
          >
            02 / FORM
          </button>
          <button 
            onClick={() => scrollToSection('space')}
            className="text-left font-heading text-lg tracking-[0.3em] uppercase text-gray-200 hover:text-cyan-400"
          >
            03 / SPACE
          </button>
        </div>
      )}
    </header>
  );
}
